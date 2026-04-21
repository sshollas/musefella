import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { navn, epost, emne, melding } = req.body;

  if (!navn || !epost || !melding) {
    return res.status(400).json({ error: "Navn, e-post og melding er påkrevd." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(epost)) {
    return res.status(400).json({ error: "Ugyldig e-postadresse." });
  }

  try {
    await resend.emails.send({
      from: "Kontaktskjema <kontakt@musefella.no>",
      to: "hei@musefella.no",
      replyTo: epost,
      subject: emne ? `[Kontakt] ${emne}` : `[Kontakt] Ny henvendelse fra ${navn}`,
      text: `Navn: ${navn}\nE-post: ${epost}\nEmne: ${emne || "—"}\n\nMelding:\n${melding}`,
      html: `
        <p><strong>Navn:</strong> ${escapeHtml(navn)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(epost)}</p>
        <p><strong>Emne:</strong> ${escapeHtml(emne || "—")}</p>
        <hr>
        <p><strong>Melding:</strong></p>
        <p>${escapeHtml(melding).replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Kunne ikke sende meldingen. Prøv igjen senere." });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
