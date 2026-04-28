"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoTurquoise } from "@/components/Logo";
import Footer from "@/components/Footer";
import { BIENS, getBien, getBienSlug } from "@/lib/biens";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const CarteLeaflet = dynamic(() => import("@/components/CarteLeaflet"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "220px", background: "#E0F7FA", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#0891B2", fontSize: "13px" }}>Chargement de la carte...</span>
    </div>
  ),
});

const C = {
  turquoise:"#0891B2",turqDark:"#0E7490",turqLight:"#F0FDFF",turqPale:"#E0F7FA",
  navy:"#0C2340",blanc:"#FFFFFF",gris:"#F9FAFB",grisBord:"#E5E7EB",
  texte:"#111827",texteSec:"#4B5563",texteTert:"#9CA3AF",
};

const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(
    <div style={{display:"flex",gap:"4px"}}>
      {LOCALES.map(l=>(
        <button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.turquoise:"transparent",color:locale===l.code?"white":C.texteSec,border:locale===l.code?"none":`1px solid ${C.grisBord}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

export default function BienPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations("immo_slug");
  const locale = useLocale();
  const bien = getBien(slug);
  const [montant, setMontant] = useState(1000);
  const [showInvest, setShowInvest] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const risques = t.raw("risques") as string[];

  useEffect(() => {
    const handleScroll = () => setShowInvest(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!bien) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.gris, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏠</div>
          <h1 style={{ color: C.texte, fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>{t("introuvable_titre")}</h1>
          <p style={{ color: C.texteSec, fontSize: "14px", marginBottom: "20px" }}>{t("introuvable_desc")}</p>
          <Link href={`/${locale}/immobilier`} style={{ background: C.turquoise, color: "white", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
            {t("voir_tous")}
          </Link>
        </div>
      </main>
    );
  }

  const pct = Math.round(((bien.tokensTotal - bien.tokensDispo) / bien.tokensTotal) * 100);
  const complet = bien.tokensDispo === 0;
  const tokensAchat = Math.floor(montant / bien.prixToken);
  const rendementAnnuel = tokensAchat * bien.prixToken * (parseFloat(bien.rendementBrut) / 100);
  const autresBiens = BIENS.filter(b => b.ile === bien.ile && b.id !== bien.id).slice(0, 3);

  const CarteInvestissement = () => (
    <div id="investir" style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, overflow: "hidden", marginBottom: "16px" }}>
      <div style={{ background: complet ? "#F1EFE8" : C.turquoise, padding: "18px 20px" }}>
        <div style={{ color: complet ? C.texteTert : "rgba(255,255,255,.8)", fontSize: "11px", marginBottom: "4px" }}>
          {complet ? t("levee_terminee") : t("levee_cours")}
        </div>
        <div style={{ color: complet ? C.texte : "white", fontSize: "26px", fontWeight: 800, marginBottom: "2px" }}>{bien.rendementBrut}</div>
        <div style={{ color: complet ? C.texteSec : "rgba(255,255,255,.8)", fontSize: "12px" }}>{t("rendement_brut_label")}</div>
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ color: C.texteSec, fontSize: "12px" }}>{t("progression")}</span>
            <span style={{ color: C.turquoise, fontSize: "12px", fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ background: C.grisBord, borderRadius: "4px", height: "7px" }}>
            <div style={{ background: pct >= 95 ? "#E24B4A" : C.turquoise, height: "100%", borderRadius: "4px", width: `${pct}%` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
            <span style={{ color: C.texteTert, fontSize: "10px" }}>{bien.tokensTotal - bien.tokensDispo} {t("vendus")}</span>
            <span style={{ color: C.texteTert, fontSize: "10px" }}>{bien.tokensDispo} {t("restants")}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
          {[
            { label: t("prix_token"), val: `${bien.prixToken}€` },
            { label: t("tokens_dispo"), val: String(bien.tokensDispo) },
            { label: t("occupation"), val: bien.occupation },
            { label: t("revenu_estime"), val: bien.revenuEstime },
          ].map((m, i) => (
            <div key={i} style={{ background: C.gris, borderRadius: "6px", padding: "10px" }}>
              <div style={{ color: C.texteTert, fontSize: "9px", marginBottom: "3px" }}>{m.label}</div>
              <div style={{ color: C.texte, fontSize: "13px", fontWeight: 700 }}>{m.val}</div>
            </div>
          ))}
        </div>
        {!complet && (
          <div style={{ background: C.turqLight, borderRadius: "8px", padding: "12px", marginBottom: "14px" }}>
            <div style={{ color: C.turqDark, fontSize: "11px", fontWeight: 600, marginBottom: "8px" }}>{t("simuler")}</div>
            <div style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.texteSec, fontSize: "11px" }}>{t("montant")}</span>
                <span style={{ color: C.turquoise, fontSize: "12px", fontWeight: 700 }}>{montant}€</span>
              </div>
              <input type="range" min={bien.prixToken} max={bien.tokensDispo * bien.prixToken} step={bien.prixToken} value={montant}
                onChange={e => setMontant(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.turquoise }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div style={{ background: "white", borderRadius: "6px", padding: "8px", textAlign: "center" }}>
                <div style={{ color: C.texteTert, fontSize: "9px" }}>{t("tokens_acquis")}</div>
                <div style={{ color: C.texte, fontSize: "14px", fontWeight: 700 }}>{tokensAchat}</div>
              </div>
              <div style={{ background: "white", borderRadius: "6px", padding: "8px", textAlign: "center" }}>
                <div style={{ color: C.texteTert, fontSize: "9px" }}>{t("revenu_annuel")}</div>
                <div style={{ color: C.turquoise, fontSize: "14px", fontWeight: 700 }}>{Math.round(rendementAnnuel)}€</div>
              </div>
            </div>
          </div>
        )}
        {complet ? (
          <div>
            <div style={{ background: C.gris, color: C.texteTert, padding: "12px", borderRadius: "8px", fontSize: "12px", textAlign: "center", marginBottom: "10px" }}>{t("bien_complet")}</div>
            <Link href={`/${locale}/kyc`} style={{ display: "block", background: C.turquoise, color: "white", padding: "12px", borderRadius: "8px", fontSize: "13px", textAlign: "center", fontWeight: 600, textDecoration: "none" }}>
              {t("liste_attente_btn")}
            </Link>
          </div>
        ) : (
          <Link href={`/${locale}/kyc`} style={{ display: "block", background: C.turquoise, color: "white", padding: "14px", borderRadius: "8px", fontSize: "14px", textAlign: "center", fontWeight: 700, textDecoration: "none" }}>
            {t("investir_btn")}
          </Link>
        )}
        <p style={{ color: C.texteTert, fontSize: "10px", textAlign: "center", marginTop: "10px", lineHeight: 1.5 }}>
          {t("kyc_requis")} {bien.prixToken}€ · {t("risque")}
        </p>
      </div>
    </div>
  );

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.gris, minHeight: "100vh" }}>
      <nav style={{ background: C.blanc, borderBottom: `0.5px solid ${C.grisBord}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? "60px" : "72px" }}>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <LogoTurquoise size={isMobile ? 0.7 : 0.85} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <LanguageSwitcher />
            <Link href={`/${locale}/immobilier`} style={{ color: C.texteSec, fontSize: "12px", textDecoration: "none" }}>
              {isMobile ? t("retour_court") : t("retour")}
            </Link>
            <NavbarAuth buttonBg="#0891B2" buttonColor="white" textColor="#4B5563" borderColor="#E5E7EB" />
          </div>
        </div>
      </nav>

      <section style={{ position: "relative", height: isMobile ? "280px" : "420px", overflow: "hidden" }}>
        <Image src={bien.photo} alt={bien.nom} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,.3) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "20px 16px" : "32px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Link href={`/${locale}/immobilier`} style={{ color: "rgba(255,255,255,.7)", fontSize: "11px", textDecoration: "none" }}>Immobilier</Link>
                <span style={{ color: "rgba(255,255,255,.4)" }}>›</span>
                <span style={{ color: "rgba(255,255,255,.7)", fontSize: "11px" }}>{bien.ile}</span>
                <span style={{ color: "rgba(255,255,255,.4)" }}>›</span>
                <span style={{ color: C.turquoise, fontSize: "11px" }}>{bien.nom}</span>
              </div>
            )}
            <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span style={{ background: bien.tagColor, color: "white", fontSize: "9px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{bien.tag}</span>
              <span style={{ background: complet ? "#444" : "#0F6E56", color: "white", fontSize: "9px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>{bien.statut}</span>
              {!isMobile && <span style={{ background: "rgba(255,255,255,.15)", color: "white", fontSize: "9px", padding: "3px 10px", borderRadius: "20px" }}>{bien.typeBail}</span>}
            </div>
            <h1 style={{ color: "white", fontSize: isMobile ? "22px" : "clamp(24px, 4vw, 40px)", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-.5px" }}>{bien.nom}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <span style={{ color: "rgba(255,255,255,.8)", fontSize: "12px" }}>📍 {bien.ile} · {bien.region}</span>
              <span style={{ color: C.turquoise, fontSize: isMobile ? "18px" : "22px", fontWeight: 800 }}>{bien.rendementBrut}</span>
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: "11px" }}>{t("rendement_brut_label")}</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px 100px" : "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "1fr 360px", gap: "24px", alignItems: "start" }}>
          <div>
            {isMobile && <CarteInvestissement />}

            <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "20px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>{t("a_propos")}</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: "0 0 16px" }}>{bien.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "10px" }}>
                {[
                  { label: t("surface"), val: bien.surface, icon: "📐" },
                  { label: t("caracteristiques"), val: bien.pieces, icon: "🏠" },
                  { label: t("type_bail"), val: bien.typeBail, icon: "📋" },
                  { label: t("construction"), val: String(bien.anneeConstruction), icon: "🏗️" },
                  { label: t("classe_energie"), val: bien.classEnergie, icon: "⚡" },
                  { label: t("gestionnaire"), val: bien.gestionnaire, icon: "👤" },
                ].map((c, i) => (
                  <div key={i} style={{ background: C.gris, borderRadius: "8px", padding: "10px" }}>
                    <div style={{ fontSize: "14px", marginBottom: "4px" }}>{c.icon}</div>
                    <div style={{ color: C.texteTert, fontSize: "9px", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "2px" }}>{c.label}</div>
                    <div style={{ color: C.texte, fontSize: "11px", fontWeight: 600 }}>{c.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "20px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>{t("performance")}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "16px" }}>
                {[
                  { label: t("rendement_brut"), val: bien.rendementBrut, color: C.turquoise },
                  { label: t("taux_occupation"), val: bien.occupation, color: "#0F6E56" },
                  { label: t("revenu_estime"), val: bien.revenuEstime, color: C.texte },
                  { label: t("mode_locatif"), val: bien.locatif, color: C.texte },
                ].map((p, i) => (
                  <div key={i} style={{ background: C.turqLight, borderRadius: "8px", padding: "12px" }}>
                    <div style={{ color: C.texteTert, fontSize: "10px", marginBottom: "4px" }}>{p.label}</div>
                    <div style={{ color: p.color, fontSize: "15px", fontWeight: 700 }}>{p.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: C.texte, fontSize: "12px", fontWeight: 600, marginBottom: "10px" }}>{t("distributions")}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                {[{ trim: "T1 2025", taux: "2,3%" }, { trim: "T2 2025", taux: "2,5%" }, { trim: "T3 2025", taux: "2,4%" }, { trim: "T4 2025", taux: "2,6%" }].map((d, i) => (
                  <div key={i} style={{ background: C.gris, borderRadius: "6px", padding: "8px", textAlign: "center" }}>
                    <div style={{ color: C.texteTert, fontSize: "9px", marginBottom: "3px" }}>{d.trim}</div>
                    <div style={{ color: C.turquoise, fontSize: "13px", fontWeight: 700 }}>{d.taux}</div>
                    <div style={{ color: "#0F6E56", fontSize: "9px", marginTop: "2px" }}>{t("verse")}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "20px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>{t("localisation")}</div>
              <p style={{ color: C.texteSec, fontSize: "13px", marginBottom: "12px" }}>{bien.adresse}</p>
              <CarteLeaflet biens={[bien]} onBienClick={() => {}} />
            </div>

            <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "20px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px" }}>{t("documents")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { nom: "Titre de propriété", disponible: true },
                  { nom: "Diagnostic technique", disponible: true },
                  { nom: "Bail en cours", disponible: true },
                  { nom: "Rapport de gestion", disponible: true },
                  { nom: "Smart contract audité", disponible: false },
                ].map((doc, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: C.gris, borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "14px" }}>📄</span>
                      <span style={{ color: C.texte, fontSize: "12px" }}>{doc.nom}</span>
                    </div>
                    {doc.disponible ? (
                      <span style={{ color: C.turquoise, fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>{t("telecharger")}</span>
                    ) : (
                      <span style={{ color: C.texteTert, fontSize: "11px" }}>{t("kyc_requis_court")}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#FFFBEB", borderRadius: "12px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "24px", marginBottom: "16px" }}>
              <div style={{ color: "#92400E", fontSize: "12px", fontWeight: 700, marginBottom: "10px" }}>{t("avertissements")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {risques.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", fontSize: "12px", color: "#92400E" }}>
                    <span style={{ flexShrink: 0 }}>›</span><span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {autresBiens.length > 0 && (
              <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: isMobile ? "20px" : "28px" }}>
                <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px" }}>{t("aussi_en")} {bien.ile}</div>
                <h3 style={{ color: C.texte, fontSize: "15px", fontWeight: 700, margin: "0 0 14px" }}>{t("autres_biens")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(autresBiens.length, 3)}, 1fr)`, gap: "10px" }}>
                  {autresBiens.map(b => (
                    <Link key={b.id} href={`/${locale}/immobilier/${getBienSlug(b)}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: C.gris, borderRadius: "8px", overflow: "hidden", border: `0.5px solid ${C.grisBord}` }}>
                        <div style={{ position: "relative", height: "70px" }}>
                          <Image src={b.photo} alt={b.nom} fill sizes="200px" style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "8px" }}>
                          <div style={{ color: C.texte, fontSize: "11px", fontWeight: 600, marginBottom: "3px" }}>{b.nom}</div>
                          <div style={{ color: C.turquoise, fontSize: "12px", fontWeight: 700 }}>{b.rendementBrut}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div style={{ position: "sticky", top: "88px" }}>
              <CarteInvestissement />
              <div style={{ background: "white", borderRadius: "12px", border: `0.5px solid ${C.grisBord}`, padding: "20px", marginBottom: "16px" }}>
                <div style={{ color: C.turquoise, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "12px" }}>{t("gestionnaire_label")}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ width: "38px", height: "38px", background: C.turqPale, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🏢</div>
                  <div>
                    <div style={{ color: C.texte, fontSize: "13px", fontWeight: 600 }}>{bien.gestionnaire}</div>
                    <div style={{ color: C.texteTert, fontSize: "11px" }}>{bien.ile}</div>
                  </div>
                </div>
                <div style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.6 }}>{t("gestionnaire_desc")}</div>
              </div>
              <div style={{ background: C.navy, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>📊</div>
                <div style={{ color: "white", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{t("simulation_complete")}</div>
                <p style={{ color: "rgba(255,255,255,.6)", fontSize: "11px", lineHeight: 1.6, margin: "0 0 12px" }}>{t("simulation_desc")}</p>
                <Link href={`/${locale}/simulateur`} style={{ display: "block", background: C.turquoise, color: "white", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                  {t("ouvrir_simulateur")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: `0.5px solid ${C.grisBord}`, padding: "12px 16px", zIndex: 150, display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.texteTert, fontSize: "10px" }}>{t("rendement_mobile")}</div>
            <div style={{ color: C.turquoise, fontSize: "18px", fontWeight: 800 }}>{bien.rendementBrut}</div>
          </div>
          <Link href={`/${locale}/kyc`} style={{ background: C.turquoise, color: "white", padding: "13px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>
            {complet ? t("liste_attente_mobile") : t("investir_mobile")}
          </Link>
        </div>
      )}

      <Footer />
    </main>
  );
}