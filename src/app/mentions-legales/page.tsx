"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";

const C = {
  navy: "#1A2E4A", navyMid: "#253D5E", sable: "#D4884A",
  beige: "#F8F6F1", beigeB: "#E8E2D6", texte: "#111827",
  texteSec: "#4A5568", texteTert: "#9CA3AF", blanc: "#FFFFFF",
};

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ color: C.navy, fontSize: "16px", fontWeight: 700, margin: "0 0 12px", paddingBottom: "8px", borderBottom: `1px solid ${C.beigeB}` }}>
        {titre}
      </h2>
      <div style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
<LogoNavy size={0.85} />
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
  <Link href="/" style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>← Retour</Link>
  <NavbarAuth
    buttonBg="#1A2E4A"
    buttonColor="white"
    textColor="#4A5568"
    borderColor="#E8E2D6"
  />
</div>
        </div>
      </nav>

      {/* Header */}
      <section style={{ background: C.navy, padding: "40px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "14px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Informations légales</span>
          </div>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-.3px" }}>Mentions Légales</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>Dernière mise à jour : Avril 2026</p>
        </div>
      </section>

      {/* Contenu */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: "32px 36px" }}>

          <Section titre="1. Éditeur du site">
            <p><strong style={{ color: C.texte }}>Raison sociale :</strong> CaribbeanVault SAS</p>
            <p><strong style={{ color: C.texte }}>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
            <p><strong style={{ color: C.texte }}>Capital social :</strong> En cours de constitution</p>
            <p><strong style={{ color: C.texte }}>Siège social :</strong> Guadeloupe, France (DOM)</p>
            <p><strong style={{ color: C.texte }}>Email :</strong> contact@geccostrategy.com</p>
            <p><strong style={{ color: C.texte }}>Site web :</strong> caribbeanvault.geccostrategy.com</p>
          </Section>

          <Section titre="2. Hébergement">
            <p><strong style={{ color: C.texte }}>Hébergeur :</strong> Vercel Inc.</p>
            <p><strong style={{ color: C.texte }}>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p><strong style={{ color: C.texte }}>Site :</strong> vercel.com</p>
          </Section>

          <Section titre="3. Statut réglementaire">
            <p>CaribbeanVault est une plateforme en cours d'enregistrement en tant que Prestataire de Services sur Actifs Numériques (PSAN) auprès de l'Autorité des Marchés Financiers (AMF) française.</p>
            <p style={{ marginTop: "10px" }}>Dans l'attente de cet enregistrement, CaribbeanVault opère en phase pilote limitée, dans le respect du cadre réglementaire MiCA (Markets in Crypto-Assets) applicable dans l'Union Européenne depuis 2024.</p>
            <p style={{ marginTop: "10px" }}>Les tokens émis via la plateforme peuvent constituer des instruments financiers au sens de la réglementation MiFID II. Les investisseurs sont invités à consulter un conseiller financier avant tout investissement.</p>
          </Section>

          <Section titre="4. Propriété intellectuelle">
            <p>L'ensemble du contenu de ce site (textes, graphiques, logos, images, code source) est la propriété exclusive de CaribbeanVault SAS et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
            <p style={{ marginTop: "10px" }}>Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de CaribbeanVault SAS.</p>
          </Section>

          <Section titre="5. Responsabilité">
            <p>CaribbeanVault SAS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, CaribbeanVault SAS ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.</p>
            <p style={{ marginTop: "10px" }}>Les informations présentées sur ce site ont un caractère purement informatif et ne constituent en aucun cas un conseil en investissement, une recommandation financière ou une offre de souscription à des valeurs mobilières.</p>
            <p style={{ marginTop: "10px" }}><strong style={{ color: C.texte }}>Investir dans des actifs numériques ou réels tokenisés comporte des risques, notamment la perte partielle ou totale du capital investi.</strong></p>
          </Section>

          <Section titre="6. Données personnelles">
            <p>Le traitement des données personnelles collectées sur ce site est régi par notre <Link href="/confidentialite" style={{ color: C.sable }}>Politique de Confidentialité</Link>, disponible sur ce site.</p>
            <p style={{ marginTop: "10px" }}>Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.</p>
            <p style={{ marginTop: "10px" }}>Pour exercer ces droits, contactez-nous à : <strong style={{ color: C.texte }}>contact@geccostrategy.com</strong></p>
          </Section>

          <Section titre="7. Cookies">
            <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie de traçage publicitaire n'est utilisé sans votre consentement préalable.</p>
            <p style={{ marginTop: "10px" }}>En continuant à naviguer sur ce site, vous acceptez l'utilisation de ces cookies techniques.</p>
          </Section>

          <Section titre="8. Droit applicable">
            <p>Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </Section>

        </div>

        {/* Footer liens */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
          {[
            { label: "CGU", href: "/cgu" },
            { label: "Politique de confidentialité", href: "/confidentialite" },
            { label: "Contact", href: "/contact" },
            { label: "Retour à l'accueil", href: "/" },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
<Footer />

    </main>
  );
}