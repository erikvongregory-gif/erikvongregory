import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/legal";
import {
  NeuLegalPage,
  neuLegalH2,
  neuLegalH3,
  neuLegalLink,
} from "@/components/neu/NeuLegalPage";

export const metadata: Metadata = {
  title: "Impressum · Preview",
  robots: { index: false, follow: false },
};

export default function NeuImpressumPage() {
  return (
    <NeuLegalPage
      title="Impressum"
      related={[
        { href: "/datenschutz", label: "Datenschutz" },
        { href: "/agb", label: "AGB" },
      ]}
    >
      <section>
        <h2 className={neuLegalH2}>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
        <p>
          {LEGAL.name}
          <br />
          {LEGAL.street}
          <br />
          {LEGAL.city}
          <br />
          {LEGAL.legalForm}
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href={`mailto:${LEGAL.email}`} className={neuLegalLink}>
            {LEGAL.email}
          </a>
          {LEGAL.phone.includes("[") ? null : (
            <>
              <br />
              Telefon: {LEGAL.phone}
            </>
          )}
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>Umsatzsteuer-Identifikationsnummer</h2>
        <p>
          {LEGAL.ustId.includes("[")
            ? "Kleinunternehmer gemäß § 19 UStG (keine Umsatzsteuer-Identifikationsnummer)"
            : LEGAL.ustId}
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>Verantwortlich für den Inhalt nach § 5 Abs. 1 DDG</h2>
        <p>
          {LEGAL.name}
          <br />
          {LEGAL.street}
          <br />
          {LEGAL.city}
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>Verbraucherschlichtung</h2>
        <p>
          Die frühere EU-Online-Streitbeilegungsplattform (OS) ist seit dem 20. Juli 2025 eingestellt.
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <p className="mt-3">
          Bei Fragen oder Beschwerden erreichen Sie uns unter{" "}
          <a href={`mailto:${LEGAL.email}`} className={neuLegalLink}>
            {LEGAL.email}
          </a>
          . Informationen zum Widerruf:{" "}
          <Link href="/widerruf" className={neuLegalLink}>
            /widerruf
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className={neuLegalH2}>Haftungsausschluss</h2>

        <h3 className={neuLegalH3}>Haftung für Inhalte</h3>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG bzw. den allgemeinen Gesetzen für eigene
          Inhalte auf diesen Seiten verantwortlich. Nach den §§ 8 bis 10 TMG (bzw. den entsprechenden
          Nachfolgeregelungen) sind wir als Diensteanbieter nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
          eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p className="mt-3">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
          allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
          ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <h3 className={neuLegalH3}>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
          erkennbar.
        </p>
        <p className="mt-3">
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Links umgehend entfernen.
        </p>

        <h3 className={neuLegalH3}>Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
          privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p className="mt-3">
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
          Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
          umgehend entfernen.
        </p>
      </section>
    </NeuLegalPage>
  );
}
