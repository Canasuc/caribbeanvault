"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";

const C = {
  navy: "#1A2E4A", sable: "#D4884A",
  beige: "#F8F6F1", beigeB: "#E8E2D6",
  texte: "#111827", texteSec: "#4A5568", texteTert: "#9CA3AF", blanc: "#FFFFFF",
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ color: C.navy, fontSize: "16px", fontWeight: 700, margin: "0 0 12px", paddingBottom: "8px", borderBottom: `1px solid ${C.beigeB}` }}>
        {titre}
      </h2>
      <div style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function CGUPage() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
<LogoNavy size={0.85} />
          <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>← Retour à l'accueil</Link>
        </div>
      </nav>

      <section style={{ background: C.navy, padding: "40px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "14px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Conditions d'utilisation</span>
          </div>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-.3px" }}>Conditions Générales d'Utilisation</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>Dernière mise à jour : Avril 2026 — Version 1.0</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: "32px 36px" }}>

          <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D44", borderRadius: "8px", padding: "14px 18px", marginBottom: "28px" }}>
            <p style={{ color: "#92400E", fontSize: "12px", lineHeight: 1.7, margin: 0 }}>
              <strong>Important :</strong> En accédant à la plateforme CaribbeanVault et en utilisant ses services, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.
            </p>
          </div>

          <Section titre="1. Objet">
            <p>Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles CaribbeanVault SAS met à disposition de ses utilisateurs la plateforme caribbeanvault.geccostrategy.com, permettant l'accès à des informations relatives à la tokenisation d'actifs réels caribéens.</p>
          </Section>

          <Section titre="2. Accès à la plateforme">
            <p>L'accès à la plateforme est gratuit et ouvert à toute personne physique majeure ou personne morale. Certaines fonctionnalités (investissement, accès au portefeuille) nécessitent la création d'un compte et la validation d'un processus de vérification d'identité (KYC).</p>
            <p style={{ marginTop: "10px" }}>L'utilisateur est responsable de la confidentialité de ses identifiants de connexion. Toute utilisation du compte sous sa responsabilité lui est imputable.</p>
          </Section>

          <Section titre="3. Description des services">
            <p>CaribbeanVault propose les services suivants :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}>Présentation et description d'actifs caribéens tokenisés (rhum AOC, immobilier, agriculture, art)</li>
              <li style={{ marginBottom: "6px" }}>Simulateur de rendement indicatif</li>
              <li style={{ marginBottom: "6px" }}>Accès à un marché primaire de souscription de tokens (sous réserve d'éligibilité)</li>
              <li style={{ marginBottom: "6px" }}>Accès à un marché secondaire d'échange de tokens</li>
              <li style={{ marginBottom: "6px" }}>Tableau de bord investisseur</li>
              <li>Informations et actualités sur les marchés RWA et caribéens</li>
            </ul>
          </Section>

          <Section titre="4. Éligibilité et KYC">
            <p>Pour accéder aux fonctionnalités d'investissement, l'utilisateur doit :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}>Être âgé d'au moins 18 ans</li>
              <li style={{ marginBottom: "6px" }}>Réussir le processus de vérification d'identité (KYC) via notre prestataire agréé</li>
              <li style={{ marginBottom: "6px" }}>Ne pas résider dans un pays soumis à des sanctions internationales</li>
              <li style={{ marginBottom: "6px" }}>Accepter les présentes CGU et la politique de confidentialité</li>
              <li>Disposer d'un wallet compatible avec le réseau XRP Ledger (XRPL)</li>
            </ul>
          </Section>

          <Section titre="5. Risques liés à l'investissement">
            <p><strong style={{ color: C.texte }}>L'investissement dans des actifs tokenisés comporte des risques significatifs, notamment :</strong></p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}>Risque de perte partielle ou totale du capital investi</li>
              <li style={{ marginBottom: "6px" }}>Risque de liquidité (difficulté à revendre les tokens)</li>
              <li style={{ marginBottom: "6px" }}>Risque réglementaire (évolution de la législation)</li>
              <li style={{ marginBottom: "6px" }}>Risque technologique (faille blockchain, perte de wallet)</li>
              <li style={{ marginBottom: "6px" }}>Risque physique pour les actifs réels (cyclones, incendies)</li>
              <li>Risque de marché (fluctuation de la valeur des actifs sous-jacents)</li>
            </ul>
            <p style={{ marginTop: "12px" }}>Les projections de rendement présentées sur la plateforme sont indicatives et basées sur des données historiques. Elles ne constituent pas une garantie de performance future.</p>
          </Section>

          <Section titre="6. Obligations de l'utilisateur">
            <p>L'utilisateur s'engage à :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}>Fournir des informations exactes et à jour lors de son inscription</li>
              <li style={{ marginBottom: "6px" }}>Ne pas utiliser la plateforme à des fins illicites, frauduleuses ou de blanchiment d'argent</li>
              <li style={{ marginBottom: "6px" }}>Ne pas tenter de contourner les mesures de sécurité de la plateforme</li>
              <li style={{ marginBottom: "6px" }}>Respecter les droits de propriété intellectuelle de CaribbeanVault</li>
              <li>Signaler toute anomalie ou faille de sécurité détectée</li>
            </ul>
          </Section>

          <Section titre="7. Structure SPV et protection des actifs">
            <p>Chaque actif tokenisé est détenu par une Société à Objet Spécial (SPV) distincte. Cette structure juridique garantit que :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}>Les actifs physiques sont isolés du patrimoine de CaribbeanVault SAS</li>
              <li style={{ marginBottom: "6px" }}>En cas de faillite de CaribbeanVault, les actifs des investisseurs sont protégés</li>
              <li>Un audit annuel indépendant est réalisé pour chaque SPV</li>
            </ul>
          </Section>

          <Section titre="8. Frais et commissions">
            <p>CaribbeanVault perçoit les frais suivants, clairement indiqués avant chaque transaction :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Frais d'émission :</strong> 1,5 à 3% du montant levé</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Frais de gestion annuels :</strong> 0,5 à 1,5% des actifs sous gestion</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Frais de transaction marché secondaire :</strong> 0,3 à 1% par échange</li>
              <li><strong style={{ color: C.texte }}>Frais de sortie :</strong> 1 à 3% de la valeur de cession</li>
            </ul>
          </Section>

          <Section titre="9. Modification des CGU">
            <p>CaribbeanVault se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification significative par email. L'utilisation continue de la plateforme après notification vaut acceptation des nouvelles conditions.</p>
          </Section>

          <Section titre="10. Droit applicable et juridiction">
            <p>Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents de Pointe-à-Pitre (Guadeloupe), sauf disposition légale impérative contraire.</p>
          </Section>

        </div>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Mentions légales", href: "/mentions-legales" },
            { label: "Politique de confidentialité", href: "/confidentialite" },
            { label: "Contact", href: "/contact" },
            { label: "Retour à l'accueil", href: "/" },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>

<Footer />
    </main>
  );
}