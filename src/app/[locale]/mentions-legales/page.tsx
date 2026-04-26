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

export default function MentionsLegalesPage() {
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
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Informations legales</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "28px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-.3px" }}>Mentions Legales</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>Derniere mise a jour : Avril 2026</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "20px 16px" : "40px 24px" }}>
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "20px 16px" : "32px 36px" }}>

          <Section titre="1. Editeur du site">
            <p><strong style={{ color: C.texte }}>Raison sociale :</strong> CaribbeanVault SAS</p>
            <p><strong style={{ color: C.texte }}>Forme juridique :</strong> Societe par Actions Simplifiee (SAS)</p>
            <p><strong style={{ color: C.texte }}>Capital social :</strong> En cours de constitution</p>
            <p><strong style={{ color: C.texte }}>Siege social :</strong> Guadeloupe, France (DOM)</p>
            <p><strong style={{ color: C.texte }}>Email :</strong> contact@geccostrategy.com</p>
            <p><strong style={{ color: C.texte }}>Site web :</strong> caribbeanvault.geccostrategy.com</p>
          </Section>

          <Section titre="2. Hebergement">
            <p><strong style={{ color: C.texte }}>Hebergeur :</strong> Vercel Inc.</p>
            <p><strong style={{ color: C.texte }}>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, Etats-Unis</p>
            <p><strong style={{ color: C.texte }}>Site :</strong> vercel.com</p>
          </Section>

          <Section titre="3. Statut reglementaire">
            <p>CaribbeanVault est une plateforme en cours d'enregistrement en tant que Prestataire de Services sur Actifs Numeriques (PSAN) aupres de l'Autorite des Marches Financiers (AMF) francaise.</p>
            <p style={{ marginTop: "10px" }}>Dans l'attente de cet enregistrement, CaribbeanVault opere en phase pilote limitee, dans le respect du cadre reglementaire MiCA (Markets in Crypto-Assets) applicable dans l'Union Europeenne depuis 2024.</p>
            <p style={{ marginTop: "10px" }}>Les tokens emis via la plateforme peuvent constituer des instruments financiers au sens de la reglementation MiFID II. Les investisseurs sont invites a consulter un conseiller financier avant tout investissement.</p>
          </Section>

          <Section titre="4. Propriete intellectuelle">
            <p>L'ensemble du contenu de ce site est la propriete exclusive de CaribbeanVault SAS et est protege par les lois francaises et internationales relatives a la propriete intellectuelle.</p>
            <p style={{ marginTop: "10px" }}>Toute reproduction, representation ou modification est interdite sauf autorisation ecrite prealable de CaribbeanVault SAS.</p>
          </Section>

          <Section titre="5. Responsabilite">
            <p>Les informations presentees sur ce site ont un caractere purement informatif et ne constituent en aucun cas un conseil en investissement ou une recommandation financiere.</p>
            <p style={{ marginTop: "10px" }}><strong style={{ color: C.texte }}>Investir dans des actifs numeriques ou reels tokenises comporte des risques, notamment la perte partielle ou totale du capital investi.</strong></p>
          </Section>

          <Section titre="6. Donnees personnelles">
            <p>Le traitement des donnees personnelles collectees sur ce site est regi par notre <Link href="/confidentialite" style={{ color: C.sable }}>Politique de Confidentialite</Link>.</p>
            <p style={{ marginTop: "10px" }}>Pour exercer vos droits, contactez-nous a : <strong style={{ color: C.texte }}>contact@geccostrategy.com</strong></p>
          </Section>

          <Section titre="7. Cookies">
            <p>Ce site utilise des cookies techniques necessaires a son fonctionnement. Aucun cookie de tracage publicitaire n'est utilise sans votre consentement prealable.</p>
          </Section>

          <Section titre="8. Droit applicable">
            <p>Le present site et les presentes mentions legales sont soumis au droit francais. En cas de litige, les tribunaux francais seront seuls competents.</p>
          </Section>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
          {[{ label: "CGU", href: "/cgu" }, { label: "Confidentialite", href: "/confidentialite" }, { label: "Contact", href: "/contact" }, { label: "Accueil", href: "/" }].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}