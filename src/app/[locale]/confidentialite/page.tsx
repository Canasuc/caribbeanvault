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

export default function ConfidentialitePage() {
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
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Vos donnees personnelles</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "28px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-.3px" }}>Politique de Confidentialite</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>Derniere mise a jour : Avril 2026 — Conforme RGPD (UE 2016/679)</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: isMobile ? "20px 16px" : "40px 24px" }}>
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "20px 16px" : "32px 36px" }}>

          <Section titre="1. Responsable du traitement">
            <p><strong style={{ color: C.texte }}>CaribbeanVault SAS</strong> — Guadeloupe, France (DOM)</p>
            <p>Email DPO : <strong style={{ color: C.texte }}>contact@geccostrategy.com</strong></p>
            <p style={{ marginTop: "8px" }}>CaribbeanVault SAS s'engage a proteger la vie privee de ses utilisateurs conformement au RGPD (UE 2016/679) et a la loi Informatique et Libertes.</p>
          </Section>

          <Section titre="2. Donnees collectees">
            <p><strong style={{ color: C.texte }}>Donnees d'inscription :</strong> nom, prenom, email, date de naissance, pays de residence.</p>
            <p style={{ marginTop: "8px" }}><strong style={{ color: C.texte }}>Donnees KYC :</strong> piece d'identite officielle, justificatif de domicile, selfie de verification.</p>
            <p style={{ marginTop: "8px" }}><strong style={{ color: C.texte }}>Donnees d'utilisation :</strong> adresse IP, navigateur, pages visitees, historique des transactions.</p>
          </Section>

          <Section titre="3. Finalites du traitement">
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px", marginTop: "8px" }}>
              {[
                { fin: "Gestion du compte utilisateur", base: "Execution du contrat" },
                { fin: "Verification d'identite (KYC/AML)", base: "Obligation legale" },
                { fin: "Traitement des investissements", base: "Execution du contrat" },
                { fin: "Communications transactionnelles", base: "Execution du contrat" },
                { fin: "Newsletter et informations", base: "Consentement" },
                { fin: "Prevention de la fraude", base: "Obligation legale" },
                { fin: "Amelioration de la plateforme", base: "Interet legitime" },
                { fin: "Statistiques d'utilisation", base: "Interet legitime" },
              ].map((f, i) => (
                <div key={i} style={{ background: C.beige, borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ color: C.texte, fontSize: "12px", fontWeight: 500 }}>{f.fin}</div>
                  <div style={{ color: C.sable, fontSize: "10px", marginTop: "2px" }}>{f.base}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section titre="4. Destinataires des donnees">
            <p>Vos donnees peuvent etre transmises aux prestataires suivants dans le strict cadre de leurs missions :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Sumsub</strong> — Prestataire KYC/AML agree</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Stripe</strong> — Prestataire de paiement</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Supabase</strong> — Hebergement base de donnees (UE)</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Resend</strong> — Envoi d'emails transactionnels</li>
              <li><strong style={{ color: C.texte }}>Autorites competentes</strong> — AMF, Tracfin, sur requisition legale</li>
            </ul>
            <p style={{ marginTop: "10px" }}>Aucune donnee personnelle n'est vendue a des tiers a des fins commerciales.</p>
          </Section>

          <Section titre="5. Duree de conservation">
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Donnees de compte actif :</strong> Duree de la relation contractuelle</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Donnees KYC :</strong> 5 ans apres la fin de la relation (obligation LCB-FT)</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Donnees de transaction :</strong> 10 ans (obligation comptable)</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Logs de connexion :</strong> 12 mois</li>
              <li><strong style={{ color: C.texte }}>Donnees marketing :</strong> Jusqu'au desabonnement + 3 ans</li>
            </ul>
          </Section>

          <Section titre="6. Vos droits">
            <p>Conformement au RGPD, vous disposez des droits suivants :</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "8px", marginTop: "10px" }}>
              {[
                { droit: "Droit d'acces", desc: "Obtenir une copie de vos donnees" },
                { droit: "Droit de rectification", desc: "Corriger vos donnees inexactes" },
                { droit: "Droit a l'effacement", desc: "Supprimer vos donnees (sauf obligations legales)" },
                { droit: "Droit a la portabilite", desc: "Recevoir vos donnees dans un format structure" },
                { droit: "Droit d'opposition", desc: "Vous opposer au traitement marketing" },
                { droit: "Droit a la limitation", desc: "Restreindre le traitement de vos donnees" },
              ].map((d, i) => (
                <div key={i} style={{ border: `0.5px solid ${C.beigeB}`, borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ color: C.navy, fontSize: "12px", fontWeight: 600 }}>{d.droit}</div>
                  <div style={{ color: C.texteSec, fontSize: "11px", marginTop: "2px" }}>{d.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "12px" }}>Pour exercer vos droits : <strong style={{ color: C.texte }}>contact@geccostrategy.com</strong></p>
            <p style={{ marginTop: "6px" }}>Vous pouvez aussi introduire une reclamation aupres de la CNIL : <strong style={{ color: C.texte }}>www.cnil.fr</strong></p>
          </Section>

          <Section titre="7. Cookies">
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Cookies techniques :</strong> Necessaires au fonctionnement (session, authentification). Pas de consentement requis.</li>
              <li style={{ marginBottom: "5px" }}><strong style={{ color: C.texte }}>Cookies analytiques :</strong> Mesure d'audience anonymisee (Vercel Analytics). Avec consentement uniquement.</li>
              <li><strong style={{ color: C.texte }}>Cookies de preferences :</strong> Memorisation de vos choix. Avec consentement uniquement.</li>
            </ul>
            <p style={{ marginTop: "10px" }}>Aucun cookie publicitaire ou de tracage commercial n'est utilise sur ce site.</p>
          </Section>

          <Section titre="8. Securite des donnees">
            <p>CaribbeanVault met en oeuvre les mesures suivantes pour proteger vos donnees :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "5px" }}>Chiffrement SSL/TLS de toutes les communications</li>
              <li style={{ marginBottom: "5px" }}>Chiffrement AES-256 des donnees sensibles en base</li>
              <li style={{ marginBottom: "5px" }}>Acces restreint aux donnees par le personnel habilite</li>
              <li style={{ marginBottom: "5px" }}>Authentification multi-facteurs pour les acces administrateur</li>
              <li>Audits de securite reguliers et tests de penetration</li>
            </ul>
          </Section>
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
          {[{ label: "Mentions legales", href: "/mentions-legales" }, { label: "CGU", href: "/cgu" }, { label: "Contact", href: "/contact" }, { label: "Accueil", href: "/" }].map(l => (
            <Link key={l.label} href={l.href} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}