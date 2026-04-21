# Forbedringsbacklog

Sist oppdatert: 2026-04-21

Denne backloggen er basert på gjennomgang av funksjon, innhold, SEO og GEO/AI-synlighet i prosjektet.

## Må fikses nå

### 2. Legg inn manglende bilder og delingsassets
- Opprett eller legg inn alle refererte bilder under `src/assets/`.
- Sørg spesielt for:
  - `assets/img/*` for skadedyr- og produktkort
  - `assets/og/default.jpg`
  - `assets/og/skjeggkre.jpg`
  - `assets/logo.png`
  - `assets/img/placeholder.jpg`
- Verifiser at passthrough-copy faktisk publiserer filene til `_site/assets/`.

Berørte filer:
- `src/_includes/layouts/base.njk`
- `src/_includes/layouts/pest.njk`
- `src/_data/pests.json`
- `src/_data/products.json`

Akseptansekriterier:
- Ingen `img`, `og:image`, `twitter:image` eller logo-URL-er peker til manglende filer.
- Forside, produktsider og delingskort viser faktiske bilder.

### 3. Klargjør siden for innsending til Google Search Console
- Kjør en siste teknisk sjekk før innsending:
  - verifiser at `robots.txt` er bevisst og riktig
  - verifiser at `sitemap.xml` kun inneholder sider som faktisk skal kunne indekseres
  - verifiser at kanoniske URL-er peker til indeksbare sider
  - verifiser at avpubliserte eller midlertidige seksjoner ikke sender blandede signaler
- Bruk GSC til å inspisere:
  - `/`
  - `/skjeggkre/`
  - `/mus/`
  - `/guider/bli-kvitt-skjeggkre/`
- Dokumenter hvilke URL-er som er ment å være:
  - indekserbare
  - `noindex`
  - helt avpublisert

Problemsteder og løsning:
- [src/robots.txt](/Users/sondre/Documents/GitHub/musefella/src/robots.txt:1)
  Problem: `Disallow: /personvern/` er satt uten at det er åpenbart hvorfor.
  Løsning: fjern dette hvis personvernsiden skal være offentlig og lesbar for søkemotorer.
- [src/sitemap.xml.njk](/Users/sondre/Documents/GitHub/musefella/src/sitemap.xml.njk:1)
  Problem: sitemapen er ryddig nå, men bør kontrolleres mot endelig indeksstrategi før innsending.
  Løsning: hold kun sider dere faktisk vil ha indeksert i sitemapen.
- [src/pages/produkter.njk](/Users/sondre/Documents/GitHub/musefella/src/pages/produkter.njk:1) og `src/produkter/*.njk`
  Problem: produktsidene er fortsatt publisert, men med `noindex`.
  Løsning: bestem om disse skal forbli tilgjengelige med `noindex`, eller om de skal tas helt ut av builden mens siden er ren innholdsside.

Akseptansekriterier:
- `robots.txt`, sitemap og canonical-strategi er bevisst avklart.
- Det finnes ingen tvetydighet om hvilke URL-er Google skal og ikke skal indeksere.
- De viktigste URL-ene kan inspiseres i GSC uten å avdekke grunnleggende tekniske feil.

### 4. Rydd bort produktrester hvis siden skal være ren innholdsside
- Fjern eller parker rester av produktsystemet som fortsatt ligger i data, schema og templates.
- Vurder to mulige retninger:
  - behold produktfilene internt, men stopp publisering helt
  - behold dem publisert med `noindex`, men fjern produktsignaler som `Product`-schema og affiliate-UI

Problemsteder og løsning:
- [src/_includes/layouts/product.njk](/Users/sondre/Documents/GitHub/musefella/src/_includes/layouts/product.njk:4)
  Problem: siden rendrer fortsatt `Product`-schema, produktmetadata og affiliate-knapp.
  Løsning: fjern `Product`-schema og CTA-er hvis produktsidene bare skal være parkert.
- [src/_data/products.json](/Users/sondre/Documents/GitHub/musefella/src/_data/products.json:1)
  Problem: inneholder fortsatt placeholder-affiliate-URL-er, pris, rating og produktpåstander.
  Løsning: flytt ut av aktiv dataflyt eller merk tydelig som inaktivt innhold.
- [src/_data/pests.json](/Users/sondre/Documents/GitHub/musefella/src/_data/pests.json:1)
  Problem: `recommendedProduct` ligger fortsatt igjen på flere arter.
  Løsning: fjern feltet hvis produktsystemet ikke skal brukes nå.

Akseptansekriterier:
- Siden fremstår konsekvent som en innholdsside uten skjulte rester av affiliate-/produktsystemet.
- Ingen datafiler eller templates sender kommersielle signaler som ikke brukes offentlig.

## Bør fikses snart

### 5. Bygg E-E-A-T grunnmur
- Legg til byline på artikler og guider.
- Legg til "Faglig gjennomgått av" dersom dere faktisk har faglig reviewer.
- Lag en tydelig redaksjonsside med:
  - hvem som skriver
  - hvordan innholdet oppdateres
  - hvordan produkter vurderes
  - hvordan affiliate påvirker eller ikke påvirker rangering
- Legg til kildeliste nederst på de viktigste sidene.

Berørte filer:
- `src/_includes/layouts/pest.njk`
- `src/_includes/layouts/guide.njk`
- `src/_includes/layouts/product.njk`
- `src/pages/om.njk`

Akseptansekriterier:
- Leseren kan se hvem som står bak innholdet, hvordan det er laget og hva det bygger på.

### 6. Dokumenter testmetodikk for produkter
- Lag en standard seksjon for produktsider:
  - hvordan produktet er vurdert
  - om det er praktisk test, skrivebordsvurdering eller produsent-/butikkdata
  - hva som er kriteriene for anbefaling
- Fjern ord som "testet", "vi bruker", "standardvalget" og lignende der dere ikke kan dokumentere det.

Berørte filer:
- `src/produkter/*.njk`
- `src/_includes/layouts/product.njk`
- `src/pages/om.njk`

Akseptansekriterier:
- Alle produktpåstander om test eller erfaring kan spores til faktisk metode.

### 7. Lag enkel kvalitetskontroll før publisering
- Legg inn en sjekk for brutte interne lenker.
- Legg inn en sjekk for manglende assets referert fra HTML/datafiler.
- Legg inn en sjekk for tomme affiliate-URL-er eller placeholder-lenker.

Mulig implementering:
- eget Node-script under `scripts/`
- egen npm-kommando som kjøres før deploy

Akseptansekriterier:
- Nye 404-er og manglende bilder fanges før publisering.

### 8. Forbedre GEO/AI-readiness på riktig måte
- Ikke bruk tid på gamle geo-metaer som ikke gir tydelig verdi.
- Prioriter i stedet:
  - tydelige definisjoner tidlig i artikkelen
  - direkte svar på brukerens spørsmål i første avsnitt
  - korte oppsummeringer før detaljer
  - tydelige kilder
  - bedre internlenking mellom problem, årsak, tiltak og produkt
- Gjør svarseksjoner mer presise og mindre fluffy.

Akseptansekriterier:
- Artiklene fungerer godt både som klassiske søkeresultater og som kilder i AI-baserte søkeresultater.

### 9. Rydd opp i metadata og oppdateringssignaler
- Standardiser `title`, `metaDescription`, `date` og `updated`.
- Unngå "Oppdatert 2025" hvis innholdet ikke faktisk er revidert.
- Vurder om `(2025)` i mange titler fortsatt gir mening nå som datoen er 2026.

Berørte filer:
- `src/skadedyr/*.njk`
- `src/guider/*.njk`
- `src/produkter/*.njk`
- `src/_data/site.json`

Akseptansekriterier:
- Metadata og synlige datoer er konsistente og troverdige.

Problemsteder som allerede er identifisert:
- [bli-kvitt-skjeggkre.njk](/Users/sondre/Documents/GitHub/musefella/src/guider/bli-kvitt-skjeggkre.njk:3)
- [bli-kvitt-maur.njk](/Users/sondre/Documents/GitHub/musefella/src/guider/bli-kvitt-maur.njk:3)
- [solvkre.njk](/Users/sondre/Documents/GitHub/musefella/src/skadedyr/solvkre.njk:3)
- [maur.njk](/Users/sondre/Documents/GitHub/musefella/src/skadedyr/maur.njk:3)
- [veps.njk](/Users/sondre/Documents/GitHub/musefella/src/skadedyr/veps.njk:3)

### 10. Fjern foreldede eller svake SEO-metaer
- Fjern gamle geo-metaer som ikke gir tydelig SEO-verdi.
- Behold heller ryddige standardmetaer, canonicals og tydelig språk.

Problemsteder og løsning:
- [src/_includes/layouts/base.njk](/Users/sondre/Documents/GitHub/musefella/src/_includes/layouts/base.njk:26)
  Problem: `geo.region` og `language` ligger fortsatt i base-layouten.
  Løsning: fjern disse meta-tagene og fokuser på innhold, språk på `<html>` og ryddige canonicals.

Akseptansekriterier:
- `<head>` inneholder bare metadata dere faktisk har en tydelig grunn til å sende ut.
- Ingen gamle “SEO-triks” står igjen uten dokumentert verdi.

## Kan vente

### 11. Utvid sitemap og crawl-signaler
- Legg eventuelt til sitemap-index hvis innholdsmengden vokser.
- Vurder `lastmod`-kvalitet per side når oppdateringsrutinen er på plass.
- Vurder om noen sider bør `noindex`-es hvis de er tynne eller overlapper sterkt.

### 12. Bedre kategori- og hub-sider
- Bygg ut indeksidene som faktiske hubs, ikke bare lister.
- Lag intro, valg-guider og internlenking fra kategori til beste undersider.

### 13. Konsolider overlappende innhold
- Gå gjennom artikler om skjeggkre og sølvkre for overlapp.
- Vurder canonical-strategi eller tydeligere differensiering der flere sider konkurrerer om samme søk.

### 14. Legg inn mer robuste organisasjonssignaler
- Når dere har avklart identitet og drift:
  - utvid `Organization` med logo, kontaktpunkt og eventuelt `sameAs`
  - vurder fysisk adresse bare hvis den faktisk skal vises offentlig

### 15. Opprett vedlikeholdsrytme
- Kvartalsvis revisjon av toppsidene.
- Egen liste over sider som må faktasjekkes ved sesongskifte.
- Oppdateringslogg for større innholdsrevisjoner.

## Anbefalt rekkefølge

1. Fiks manglende assets.
2. Avklar GSC-klargjøring: `robots.txt`, sitemap, canonical og indeksstrategi.
3. Rydd bort produktrester eller ta produktsidene helt ut.
4. Standardiser resterende metadata og fjern gamle geo-metaer.
5. Bygg E-E-A-T og kvalitetskontroller.

## Definisjon av ferdig for fase 1

Fase 1 er ferdig når:
- alle refererte hovedbilder finnes
- structured data ikke peker til døde URL-er
- forsiden og `Om oss` ikke lover ting dere ikke dokumenterer
- toppsidene er språkvasket for de mest risikable fag- og tillitspåstandene
- produkter enten er reelt parkert eller bevisst håndtert som `noindex`
- `robots.txt`, sitemap og canonicals er kontrollert før GSC-innsending
