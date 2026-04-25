"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";

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

export default function ConfidentialitePage() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

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

      <section style={{ background: C.navy, padding: "40px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "14px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Vos données personnelles</span>
          </div>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-.3px" }}>Politique de Confidentialité</h1>
          <p style={{ color: "#B8C4D4", fontSize: "13px", margin: 0 }}>Dernière mise à jour : Avril 2026 — Conforme RGPD (UE 2016/679)</p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: "32px 36px" }}>

          <Section titre="1. Responsable du traitement">
            <p><strong style={{ color: C.texte }}>CaribbeanVault SAS</strong></p>
            <p>Siège social : Guadeloupe, France (DOM)</p>
            <p>Email DPO : <strong style={{ color: C.texte }}>contact@geccostrategy.com</strong></p>
            <p style={{ marginTop: "10px" }}>CaribbeanVault SAS s'engage à protéger la vie privée de ses utilisateurs et à traiter leurs données personnelles conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés.</p>
          </Section>

          <Section titre="2. Données collectées">
            <p><strong style={{ color: C.texte }}>Données d'inscription :</strong></p>
            <ul style={{ paddingLeft: "20px", margin: "6px 0 12px" }}>
              <li style={{ marginBottom: "4px" }}>Nom, prénom</li>
              <li style={{ marginBottom: "4px" }}>Adresse email</li>
              <li style={{ marginBottom: "4px" }}>Date de naissance</li>
              <li>Nationalité et pays de résidence</li>
            </ul>
            <p><strong style={{ color: C.texte }}>Données KYC (vérification d'identité) :</strong></p>
            <ul style={{ paddingLeft: "20px", margin: "6px 0 12px" }}>
              <li style={{ marginBottom: "4px" }}>Pièce d'identité officielle (passeport, carte nationale d'identité)</li>
              <li style={{ marginBottom: "4px" }}>Justificatif de domicile</li>
              <li>Selfie de vérification (liveness check)</li>
            </ul>
            <p><strong style={{ color: C.texte }}>Données d'utilisation :</strong></p>
            <ul style={{ paddingLeft: "20px", margin: "6px 0" }}>
              <li style={{ marginBottom: "4px" }}>Adresse IP, type de navigateur</li>
              <li style={{ marginBottom: "4px" }}>Pages visitées, actions effectuées sur la plateforme</li>
              <li>Historique des transactions et des investissements</li>
            </ul>
          </Section>

          <Section titre="3. Finalités du traitement">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
              {[
                { fin: "Gestion du compte utilisateur", base: "Exécution du contrat" },
                { fin: "Vérification d'identité (KYC/AML)", base: "Obligation légale" },
                { fin: "Traitement des investissements", base: "Exécution du contrat" },
                { fin: "Communications transactionnelles", base: "Exécution du contrat" },
                { fin: "Newsletter et informations", base: "Consentement" },
                { fin: "Amélioration de la plateforme", base: "Intérêt légitime" },
                { fin: "Prévention de la fraude", base: "Obligation légale" },
                { fin: "Statistiques d'utilisation", base: "Intérêt légitime" },
              ].map((f, i) => (
                <div key={i} style={{ background: C.beige, borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ color: C.texte, fontSize: "12px", fontWeight: 500 }}>{f.fin}</div>
                  <div style={{ color: C.sable, fontSize: "10px", marginTop: "2px" }}>{f.base}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section titre="4. Destinataires des données">
            <p>Vos données peuvent être transmises aux prestataires suivants, dans le strict cadre de leurs missions :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Sumsub</strong> — Prestataire KYC/AML agréé (vérification d'identité)</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Stripe</strong> — Prestataire de paiement (transactions en euros)</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Supabase</strong> — Hébergement de la base de données (UE)</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Resend</strong> — Prestataire d'envoi d'emails transactionnels</li>
              <li><strong style={{ color: C.texte }}>Autorités compétentes</strong> — AMF, Tracfin, sur réquisition légale</li>
            </ul>
            <p style={{ marginTop: "10px" }}>Aucune donnée personnelle n'est vendue à des tiers à des fins commerciales.</p>
          </Section>

          <Section titre="5. Durée de conservation">
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Données de compte actif :</strong> Durée de la relation contractuelle</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Données KYC :</strong> 5 ans après la fin de la relation (obligation LCB-FT)</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Données de transaction :</strong> 10 ans (obligation comptable)</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Logs de connexion :</strong> 12 mois</li>
              <li><strong style={{ color: C.texte }}>Données marketing (newsletter) :</strong> Jusqu'au désabonnement + 3 ans</li>
            </ul>
          </Section>

          <Section titre="6. Vos droits">
            <p>Conformément au RGPD, vous disposez des droits suivants sur vos données :</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
              {[
                { droit: "Droit d'accès", desc: "Obtenir une copie de vos données" },
                { droit: "Droit de rectification", desc: "Corriger vos données inexactes" },
                { droit: "Droit à l'effacement", desc: "Supprimer vos données (sauf obligations légales)" },
                { droit: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré" },
                { droit: "Droit d'opposition", desc: "Vous opposer au traitement marketing" },
                { droit: "Droit à la limitation", desc: "Restreindre le traitement de vos données" },
              ].map((d, i) => (
                <div key={i} style={{ border: `0.5px solid ${C.beigeB}`, borderRadius: "6px", padding: "10px 12px" }}>
                  <div style={{ color: C.navy, fontSize: "12px", fontWeight: 600 }}>{d.droit}</div>
                  <div style={{ color: C.texteSec, fontSize: "11px", marginTop: "2px" }}>{d.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "14px" }}>Pour exercer vos droits, contactez-nous à : <strong style={{ color: C.texte }}>contact@geccostrategy.com</strong></p>
            <p style={{ marginTop: "8px" }}>Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <strong style={{ color: C.texte }}>www.cnil.fr</strong></p>
          </Section>

          <Section titre="7. Cookies">
            <p>Ce site utilise les types de cookies suivants :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Cookies techniques :</strong> Nécessaires au fonctionnement du site (session, authentification). Ne nécessitent pas de consentement.</li>
              <li style={{ marginBottom: "6px" }}><strong style={{ color: C.texte }}>Cookies analytiques :</strong> Mesure d'audience anonymisée (Vercel Analytics). Déposés uniquement avec votre consentement.</li>
              <li><strong style={{ color: C.texte }}>Cookies de préférences :</strong> Mémorisation de vos choix d'interface. Déposés uniquement avec votre consentement.</li>
            </ul>
            <p style={{ marginTop: "10px" }}>Aucun cookie publicitaire ou de traçage commercial n'est utilisé sur ce site.</p>
          </Section>

          <Section titre="8. Sécurité des données">
            <p>CaribbeanVault met en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données :</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li style={{ marginBottom: "6px" }}>Chiffrement SSL/TLS de toutes les communications</li>
              <li style={{ marginBottom: "6px" }}>Chiffrement AES-256 des données sensibles en base</li>
              <li style={{ marginBottom: "6px" }}>Accès restreint aux données par le personnel habilité</li>
              <li style={{ marginBottom: "6px" }}>Authentification multi-facteurs pour les accès administrateur</li>
              <li>Audits de sécurité réguliers et tests de pénétration</li>
            </ul>
          </Section>

        </div>

        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Mentions légales", href: "/mentions-legales" },
            { label: "CGU", href: "/cgu" },
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