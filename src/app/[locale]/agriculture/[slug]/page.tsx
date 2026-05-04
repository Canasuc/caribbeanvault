"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoEmeraude } from "@/components/Logo";
import Footer from "@/components/Footer";
import NavbarAuth from "@/components/NavbarAuth";
import { PARCELLES, getParcelle, type Parcelle, type LocaleStr } from "@/lib/parcelles";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { createBrowserClient } from "@supabase/ssr";

const CarteLeaflet = dynamic(() => import("@/components/CarteLeaflet"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "220px", background: "#EAF3DE", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#5A8A3C", fontSize: "13px", fontFamily: "system-ui" }}>Chargement de la carte...</span>
    </div>
  ),
});

type L = "fr" | "en" | "es";

const C = {
  noir:"#0D1A08",foret:"#1E2D14",vert:"#2C3A1E",feuille:"#5A8A3C",menthe:"#8FBF6A",
  paille:"#D4C07A",pailleC:"#C8A84B",terre:"#F5F2EC",terreB:"#EDE8DE",cremeV:"#EAF3DE",
  texte:"#1E2010",texteSec:"#4A5940",texteTert:"#7A8A6A",blanc:"#FFFFFF",
};

const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(
    <div style={{display:"flex",gap:"4px"}}>
      {LOCALES.map(l=>(
        <button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.feuille:"transparent",color:locale===l.code?"white":C.menthe,border:locale===l.code?"none":`1px solid ${C.vert}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

// Type pour CarteLeaflet
interface BienLeaflet {
  id: number; nom: string; ile: string; region: string; photo: string;
  type: string; tag: string; tagColor: string; rendementBrut: string;
  occupation: string; revenuEstime: string; prixToken: number;
  tokensDispo: number; tokensTotal: number; statut: string;
  couleur: string; adresse: string; coordonnees: { lat: number; lng: number };
}

export default function ParcellePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations("agri_slug");
  const locale = useLocale();
  const parcelle = getParcelle(slug);
  const [montant, setMontant] = useState(1000);
  const [authChecked, setAuthChecked] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { window.location.href = `/${locale}/login`; }
      else { setAuthChecked(true); }
    });
  }, [locale]);

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.terre }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: C.texteSec, fontSize: "14px", fontFamily: "system-ui" }}>{t("verification")}</div>
        </div>
      </div>
    );
  }

  if (!parcelle) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.terre, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌿</div>
          <h1 style={{ color: C.texte, fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>{t("introuvable_titre")}</h1>
          <p style={{ color: C.texteSec, fontSize: "14px", marginBottom: "20px" }}>{t("introuvable_desc")}</p>
          <Link href={`/${locale}/agriculture`} style={{ background: C.feuille, color: "white", padding: "12px 24px", borderRadius: "3px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
            {t("voir_parcelles")}
          </Link>
        </div>
      </main>
    );
  }

  const pct = Math.round(((parcelle.tokens - parcelle.disponibles) / parcelle.tokens) * 100);
  const complet = parcelle.disponibles === 0;
  const tokensAchat = Math.floor(montant / parcelle.prixToken);
  const rendementAnnuel = tokensAchat * parcelle.prixToken * (parseFloat(parcelle.rendementEst.split("-")[1]) / 100);
  const autresParcelles = PARCELLES.filter(p => p.ile === parcelle.ile && p.slug !== parcelle.slug).slice(0, 3);

  const bienLeaflet: BienLeaflet[] = [{
    id: 1, nom: parcelle.nom, ile: parcelle.ile, region: parcelle.region,
    photo: parcelle.photo, type: parcelle.culture, tag: parcelle.tag,
    tagColor: parcelle.tagColor, rendementBrut: parcelle.rendementEst,
    occupation: "100%", revenuEstime: `Sur ${parcelle.duree}`,
    prixToken: parcelle.prixToken, tokensDispo: parcelle.disponibles,
    tokensTotal: parcelle.tokens, statut: parcelle.statut[locale as L] ?? parcelle.statut.fr,
    couleur: parcelle.couleur, adresse: parcelle.adresse,
    coordonnees: parcelle.coordonnees,
  }];

  const risques = t.raw("risques") as string[];

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: isMobile ? "20px" : "0" }}>
      <div style={{ background: complet ? C.terreB : C.foret, borderRadius: "8px", padding: "20px" }}>
        {complet ? (
          <>
            <div style={{ color: C.texteSec, fontSize: "12px", marginBottom: "10px", fontWeight: 600, fontFamily: "system-ui" }}>{t("levee_terminee")}</div>
            <p style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui" }}>{t("liste_attente_desc")}</p>
            <Link href={`/${locale}/kyc`} style={{ display: "block", background: C.feuille, color: "white", padding: "11px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              {t("liste_attente_btn")}
            </Link>
          </>
        ) : (
          <>
            <div style={{ color: C.paille, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>{t("investir_label")}</div>
            <div style={{ color: C.cremeV, fontSize: "26px", fontWeight: 700, marginBottom: "2px" }}>{parcelle.rendementEst}</div>
            <div style={{ color: C.menthe, fontSize: "12px", marginBottom: "14px", opacity: .8, fontFamily: "system-ui" }}>{t("rendement_estime")}</div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.menthe, fontSize: "11px", fontFamily: "system-ui" }}>{t("levee_cours")}</span>
                <span style={{ color: C.paille, fontSize: "11px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}%</span>
              </div>
              <div style={{ background: C.vert, borderRadius: "2px", height: "6px" }}>
                <div style={{ background: pct >= 95 ? "#A32D2D" : C.feuille, height: "100%", borderRadius: "2px", width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ color: `${C.menthe}80`, fontSize: "10px", fontFamily: "system-ui" }}>{parcelle.tokens - parcelle.disponibles} {t("tokens_vendus")}</span>
                <span style={{ color: `${C.menthe}80`, fontSize: "10px", fontFamily: "system-ui" }}>{parcelle.disponibles} {t("restants")}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
              {[
                { label: t("prix_token"), val: `${parcelle.prixToken}€` },
                { label: t("tokens_dispo"), val: String(parcelle.disponibles) },
                { label: t("duree"), val: parcelle.duree },
                { label: t("recolte"), val: parcelle.recolte },
              ].map((m, i) => (
                <div key={i} style={{ background: C.vert, borderRadius: "4px", padding: "8px 10px" }}>
                  <div style={{ color: `${C.menthe}80`, fontSize: "9px", marginBottom: "2px", fontFamily: "system-ui" }}>{m.label}</div>
                  <div style={{ color: C.cremeV, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{m.val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: C.vert, borderRadius: "6px", padding: "12px", marginBottom: "12px" }}>
              <div style={{ color: C.paille, fontSize: "11px", fontWeight: 600, marginBottom: "8px", fontFamily: "system-ui" }}>{t("simuler")}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.menthe, fontSize: "11px", fontFamily: "system-ui" }}>{t("montant")}</span>
                <span style={{ color: C.paille, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{montant}€</span>
              </div>
              <input type="range" min={parcelle.prixToken} max={parcelle.disponibles * parcelle.prixToken} step={parcelle.prixToken} value={montant}
                onChange={e => setMontant(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.feuille }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                <div style={{ background: C.foret, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: `${C.menthe}80`, fontSize: "9px", fontFamily: "system-ui" }}>{t("tokens_acquis")}</div>
                  <div style={{ color: C.cremeV, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{tokensAchat}</div>
                </div>
                <div style={{ background: C.foret, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: `${C.menthe}80`, fontSize: "9px", fontFamily: "system-ui" }}>{t("revenu_estime")}</div>
                  <div style={{ color: C.paille, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{Math.round(rendementAnnuel)}€</div>
                </div>
              </div>
            </div>
            <Link href={`/${locale}/kyc`} style={{ display: "block", background: C.feuille, color: "white", padding: "13px", borderRadius: "3px", fontSize: "13px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              {t("investir_btn")}
            </Link>
            <p style={{ color: `${C.menthe}60`, fontSize: "10px", textAlign: "center", marginTop: "8px", fontFamily: "system-ui" }}>
              {t("kyc_requis")} {parcelle.prixToken}€ · {t("risque")}
            </p>
          </>
        )}
      </div>

      <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: "18px" }}>
        <div style={{ color: C.pailleC, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "system-ui" }}>{t("infos")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { label: t("producteur"), val: parcelle.producteur },
            { label: t("surface"), val: parcelle.surface },
            { label: t("assurance"), val: parcelle.assurance[locale as L] ?? parcelle.assurance.fr },
            { label: t("adresse"), val: parcelle.adresse },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ color: C.texteTert, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "system-ui" }}>{r.label}</div>
              <div style={{ color: C.texte, fontSize: "12px", marginTop: "2px", fontFamily: "system-ui" }}>{r.val}</div>
            </div>
          ))}
          {parcelle.site && (
            <div>
              <div style={{ color: C.texteTert, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "system-ui" }}>{t("site_officiel")}</div>
              <a href={parcelle.site} target="_blank" rel="noopener noreferrer" style={{ color: C.feuille, fontSize: "12px", textDecoration: "none", fontFamily: "system-ui" }}>
                {parcelle.site.replace("https://", "")} →
              </a>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: C.foret, borderRadius: "8px", padding: "18px", textAlign: "center" }}>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>📊</div>
        <div style={{ color: C.paille, fontSize: "12px", fontWeight: 600, marginBottom: "6px", fontFamily: "system-ui" }}>{t("simulation_complete")}</div>
        <p style={{ color: C.menthe, fontSize: "11px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui", opacity: .8 }}>{t("simulation_desc")}</p>
        <Link href={`/${locale}/simulateur`} style={{ display: "block", background: C.feuille, color: "white", padding: "10px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, textDecoration: "none", fontFamily: "system-ui" }}>
          {t("ouvrir_simulateur")}
        </Link>
      </div>
    </div>
  );

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.terre, minHeight: "100vh" }}>
      <nav style={{ background: C.foret, borderBottom: `0.5px solid ${C.vert}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <LogoEmeraude size={isMobile ? 0.6 : 0.7} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <LanguageSwitcher />
            <Link href={`/${locale}/agriculture`} style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .8, fontFamily: "system-ui" }}>
              {isMobile ? t("retour_court") : t("retour")}
            </Link>
            <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)" />
          </div>
        </div>
      </nav>

      <section style={{ background: parcelle.couleur, padding: isMobile ? "36px 16px 28px" : "64px 24px 48px", position: "relative", overflow: "hidden" }}>
        {!isMobile && [300, 200, 120].map((size, i) => (
          <div key={i} style={{ position: "absolute", right: `-${size / 3}px`, top: "50%", transform: "translateY(-50%)", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `1px solid ${C.paille}${["15", "20", "30"][i]}` }} />
        ))}
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Link href={`/${locale}/agriculture`} style={{ color: C.menthe, fontSize: "11px", textDecoration: "none", opacity: .7, fontFamily: "system-ui" }}>Agriculture</Link>
              <span style={{ color: C.menthe, opacity: .4 }}>›</span>
              <span style={{ color: C.menthe, fontSize: "11px", opacity: .7, fontFamily: "system-ui" }}>{parcelle.ile}</span>
              <span style={{ color: C.menthe, opacity: .4 }}>›</span>
              <span style={{ color: C.paille, fontSize: "11px", fontFamily: "system-ui" }}>{parcelle.culture}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ background: parcelle.tagColor, color: "white", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", letterSpacing: ".2em", textTransform: "uppercase", fontFamily: "system-ui" }}>{parcelle.tag}</span>
            <span style={{ border: `0.5px solid ${C.menthe}`, color: C.menthe, fontSize: "9px", padding: "3px 12px", borderRadius: "1px", textTransform: "uppercase", fontFamily: "system-ui" }}>
              {parcelle.ile} · {parcelle.surface}
            </span>
            {complet && <span style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.8)", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "1px", fontFamily: "system-ui" }}>{t("complet")}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
            <span style={{ fontSize: isMobile ? "36px" : "48px" }}>{parcelle.icone}</span>
            <div>
              <h1 style={{ color: C.terreB, fontSize: isMobile ? "22px" : "clamp(22px, 3.5vw, 40px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 4px" }}>{parcelle.culture}</h1>
              <div style={{ color: C.paille, fontSize: isMobile ? "14px" : "16px", fontWeight: 400, fontFamily: "system-ui" }}>{parcelle.producteur} · {parcelle.region}</div>
            </div>
          </div>
          <p style={{ color: C.menthe, fontSize: isMobile ? "13px" : "15px", lineHeight: 1.8, maxWidth: "580px", margin: "0 0 20px", opacity: .9, fontFamily: "system-ui" }}>
            {parcelle.description[locale as L] ?? parcelle.description.fr}
          </p>
          <div style={{ display: "flex", gap: "0", flexWrap: "wrap", borderTop: `0.5px solid ${C.paille}30`, paddingTop: "18px" }}>
            {[
              { val: parcelle.rendementEst, label: t("rendement_label") },
              { val: parcelle.duree, label: t("duree_label") },
              { val: `${parcelle.prixToken}€`, label: t("prix_label") },
              { val: parcelle.recolte, label: t("recolte_label") },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: isMobile ? "14px" : "28px", marginRight: isMobile ? "14px" : "28px", borderRight: i < 3 ? `0.5px solid ${C.paille}20` : "none", marginBottom: "8px" }}>
                <div style={{ color: C.paille, fontSize: isMobile ? "14px" : "18px", fontWeight: 700, fontFamily: "system-ui" }}>{s.val}</div>
                <div style={{ color: C.menthe, fontSize: "9px", letterSpacing: ".07em", textTransform: "uppercase", marginTop: "2px", opacity: .7, fontFamily: "system-ui" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px 40px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div>
            {isMobile && SidebarContent()}

            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>{t("notre_histoire")}</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: 0, fontFamily: "system-ui" }}>
                {parcelle.histoire[locale as L] ?? parcelle.histoire.fr}
              </p>
            </div>

            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("techniques")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {parcelle.techniques.map((tech: LocaleStr, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", background: C.cremeV, borderRadius: "4px", borderLeft: `3px solid ${C.feuille}` }}>
                    <span style={{ color: C.feuille, fontSize: "14px", flexShrink: 0 }}>🌱</span>
                    <span style={{ color: C.texte, fontSize: "13px", fontFamily: "system-ui" }}>{tech[locale as L] ?? tech.fr}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("certifications")}</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "10px" }}>
                {parcelle.certificationDetails.map((c: LocaleStr, i: number) => (
                  <div key={i} style={{ padding: "12px", background: C.terre, borderRadius: "4px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: parcelle.tagColor, fontSize: "14px", flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.texte, fontSize: "12px", fontFamily: "system-ui" }}>{c[locale as L] ?? c.fr}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>{t("localisation")}</div>
              <p style={{ color: C.texteSec, fontSize: "13px", marginBottom: "12px", fontFamily: "system-ui" }}>{parcelle.adresse}</p>
              <CarteLeaflet biens={bienLeaflet as never} onBienClick={() => {}} />
            </div>

            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("distinctions")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {parcelle.recompenses.map((r: string, i: number) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: C.pailleC, fontSize: "14px", flexShrink: 0 }}>★</span>
                    <span style={{ color: C.texteSec, fontSize: "13px", fontFamily: "system-ui" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("documents")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { nom: "Titre de propriété / bail agricole", disponible: true },
                  { nom: "Certificat de certification", disponible: true },
                  { nom: "Rapport d'audit indépendant", disponible: true },
                  { nom: "Contrat d'assurance récolte", disponible: true },
                  { nom: "Smart contract audité XRPL", disponible: false },
                ].map((doc, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: C.terre, borderRadius: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "14px" }}>📄</span>
                      <span style={{ color: C.texte, fontSize: "12px", fontFamily: "system-ui" }}>{doc.nom}</span>
                    </div>
                    {doc.disponible ? (
                      <span style={{ color: C.feuille, fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "system-ui" }}>{t("telecharger")}</span>
                    ) : (
                      <span style={{ color: C.texteTert, fontSize: "11px", fontFamily: "system-ui" }}>{t("kyc_requis_court")}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#FFFBEB", borderRadius: "8px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "22px", marginBottom: "16px" }}>
              <div style={{ color: "#92400E", fontSize: "12px", fontWeight: 700, marginBottom: "10px", fontFamily: "system-ui" }}>{t("avertissements")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {risques.map((r: string, i: number) => (
                  <div key={i} style={{ display: "flex", gap: "6px", fontSize: "12px", color: "#92400E", fontFamily: "system-ui" }}>
                    <span style={{ flexShrink: 0 }}>›</span><span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {autresParcelles.length > 0 && (
              <div style={{ background: C.blanc, borderRadius: "8px", border: `1px solid #D5CCBA`, padding: isMobile ? "18px" : "28px" }}>
                <div style={{ color: C.feuille, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "system-ui" }}>{t("aussi_en")} {parcelle.ile}</div>
                <h3 style={{ color: C.texte, fontSize: "15px", fontWeight: 700, margin: "0 0 14px", fontFamily: "system-ui" }}>{t("autres_parcelles")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(autresParcelles.length, 3)}, 1fr)`, gap: "10px" }}>
                  {autresParcelles.map((p: Parcelle) => (
                    <Link key={p.slug} href={`/${locale}/agriculture/${p.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: p.couleur, borderRadius: "6px", padding: "14px", transition: "transform .2s" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                      >
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>{p.icone}</div>
                        <div style={{ color: C.paille, fontSize: "12px", fontWeight: 700, marginBottom: "3px", fontFamily: "system-ui" }}>{p.culture}</div>
                        <div style={{ color: C.menthe, fontSize: "10px", fontFamily: "system-ui", opacity: .8 }}>{p.rendementEst}</div>
                        <div style={{ color: C.paille, fontSize: "11px", fontWeight: 700, marginTop: "8px", fontFamily: "system-ui" }}>{t("decouvrir")}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div style={{ position: "sticky", top: "76px" }}>
             {SidebarContent()}
            </div>
          )}
        </div>
      </div>

      {isMobile && !complet && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.blanc, borderTop: `0.5px solid #D5CCBA`, padding: "12px 16px", zIndex: 150, display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>{t("rendement_label")}</div>
            <div style={{ color: C.feuille, fontSize: "18px", fontWeight: 800, fontFamily: "system-ui" }}>{parcelle.rendementEst}</div>
          </div>
          <Link href={`/${locale}/kyc`} style={{ background: C.feuille, color: "white", padding: "13px 24px", borderRadius: "3px", fontSize: "14px", fontWeight: 700, textDecoration: "none", flexShrink: 0, fontFamily: "system-ui" }}>
            {t("investir_btn").replace(" →", "")} →
          </Link>
        </div>
      )}

      <Footer />
    </main>
  );
}