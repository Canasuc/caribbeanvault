"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy: "#1A2E4A", sable: "#D4884A",
  beige: "#F8F6F1", beigeB: "#E8E2D6",
  texte: "#111827", texteSec: "#4A5568", texteTert: "#9CA3AF", blanc: "#FFFFFF",
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h2 style={{ color: C.navy, fontSize: "15px", fontWeight: 700, margin: "0 0 10px", paddingBottom: "8px", borderBottom: `1px solid ${C.beigeB}` }}>{titre}</h2>
      <div style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function CGUPage() {
  const { isMobile } = useBreakpoint();
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>
      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "64px" }}>
          <LogoNavy size={isMobile ? 0.7 : 0.85} />
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>← Retour</Link>
            <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
          </div>
        </div>
      </nav>

      <section style={{ background: C.navy, padding: isMobile ? "28px 16px" : "40px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "12px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Conditions d'utilisation</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "28px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-.3px" }}>{"Conditions Generales d'Utilisation"}</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>Derniere mise a jour : Avril 2026 — Version 1.0</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "20px 16px" : "40px 24px" }}>
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "20px 16px" : "32px 36px" }}>

          <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D44", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px" }}>
            <p style={{ color: "#92400E", fontSize: "12px", lineHeight: 1.7, margin: 0 }}>
              <strong>Important :</strong> En accedant a la plateforme CaribbeanVault et en utilisant ses services, vous acceptez sans reserve les presentes CGU.
            </p>
          </div>

          <Section titre="1. Objet">
            <p>Les presentes CGU definissent les modalites dans lesquelles CaribbeanVault SAS met a disposition de ses utilisateurs la plateforme caribbeanvault.geccostrategy.com, permettant l'acces a des informations relatives a la tokenisation d'actifs reels carribeens.</p>
          </Section>

          <Section titre="2. Acces a la plateforme">
            <p>L'acces a la plateforme est gratuit et ouvert a toute personne physique majeure ou personne morale. Certaines fonctionnalites (investissement, acces au portefeuille) necessitent la creation d'un compte et la validation d'un processus KYC.</p>
            <p style={{ marginTop: "10px" }}>L'utilisateur est responsable de la confidentialite de ses identifiants de connexion.</p>
          </Section>

          <Section titre="3. Description des services">
            <p>CaribbeanVault propose les services suivants :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}>Presentation d'actifs carribeens tokenises (rhum AOC, immobilier, agriculture, art)</li>
              <li style={{ marginBottom: "5px" }}>Simulateur de rendement indicatif</li>
              <li style={{ marginBottom: "5px" }}>Acces a un marche primaire de souscription de tokens</li>
              <li style={{ marginBottom: "5px" }}>Acces a un marche secondaire d'echange de tokens</li>
              <li style={{ marginBottom: "5px" }}>Tableau de bord investisseur</li>
              <li>Actualites sur les marches RWA et carribeens</li>
            </ul>
          </Section>

          <Section titre="4. Eligibilite et KYC">
            <p>Pour acceder aux fonctionnalites d'investissement, l'utilisateur doit :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}>Etre age d'au moins 18 ans</li>
              <li style={{ marginBottom: "5px" }}>Reussir le processus de verification d'identite (KYC)</li>
              <li style={{ marginBottom: "5px" }}>Ne pas resider dans un pays soumis a des sanctions internationales</li>
              <li style={{ marginBottom: "5px" }}>Accepter les presentes CGU et la politique de confidentialite</li>
              <li>Disposer d'un wallet compatible avec le reseau XRP Ledger (XRPL)</li>
            </ul>
          </Section>

          <Section titre="5. Risques lies a l'investissement">
            <p><strong style={{ color: C.texte }}>L'investissement dans des actifs tokenises comporte des risques significatifs :</strong></p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}>Risque de perte partielle ou totale du capital investi</li>
              <li style={{ marginBottom: "5px" }}>Risque de liquidite (difficulte a revendre les tokens)</li>
              <li style={{ marginBottom: "5px" }}>Risque reglementaire (evolution de la legislation)</li>
              <li style={{ marginBottom: "5px" }}>Risque technologique (faille blockchain, perte de wallet)</li>
              <li style={{ marginBottom: "5px" }}>Risque physique pour les actifs reels (cyclones, incendies)</li>
              <li>Risque de marche (fluctuation de la valeur des actifs)</li>
            </ul>
            <p style={{ marginTop: "12px" }}>Les projections de rendement sont indicatives et ne constituent pas une garantie de performance future.</p>
          </Section>

          <Section titre="6. Obligations de l'utilisateur">
            <p>L'utilisateur s'engage a :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}>Fournir des informations exactes et a jour lors de son inscription</li>
              <li style={{ marginBottom: "5px" }}>Ne pas utiliser la plateforme a des fins illicites ou frauduleuses</li>
              <li style={{ marginBottom: "5px" }}>Ne pas tenter de contourner les mesures de securite</li>
              <li style={{ marginBottom: "5px" }}>Respecter les droits de propriete intellectuelle de CaribbeanVault</li>
              <li>Signaler toute anomalie ou faille de securite detectee</li>
            </ul>
          </Section>

          <Section titre="7. Structure SPV et protection des actifs">
            <p>Chaque actif tokenise est detenu par une Societe a Objet Special (SPV) distincte garantissant que les actifs physiques sont isoles du patrimoine de CaribbeanVault SAS. Un audit annuel independant est realise pour chaque SPV.</p>
          </Section>

          <Section titre="8. Frais et commissions">
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Frais d'emission :</strong> 1,5 a 3% du montant leve</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Frais de gestion annuels :</strong> 0,5 a 1,5% des actifs sous gestion</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Frais de transaction marche secondaire :</strong> 0,3 a 1% par echange</li>
              <li><strong style={{ color: C.texte }}>Frais de sortie :</strong> 1 a 3% de la valeur de cession</li>
            </ul>
          </Section>

          <Section titre="9. Modification des CGU">
            <p>CaribbeanVault se reserve le droit de modifier les presentes CGU a tout moment. Les utilisateurs seront informes par email. L'utilisation continue de la plateforme apres notification vaut acceptation des nouvelles conditions.</p>
          </Section>

          <Section titre="10. Droit applicable et juridiction">
            <p>Les presentes CGU sont soumises au droit francais. Tout litige sera soumis aux tribunaux competents de Pointe-a-Pitre (Guadeloupe).</p>
          </Section>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
          {[{ label: "Mentions legales", href: "/mentions-legales" }, { label: "Confidentialite", href: "/confidentialite" }, { label: "Contact", href: "/contact" }, { label: "Accueil", href: "/" }].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}