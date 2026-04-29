"use client";
import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoNuit } from "@/components/Logo";
import Footer from "@/components/Footer";
import NavbarAuth from "@/components/NavbarAuth";
import { OEUVRES, getOeuvre } from "@/lib/oeuvres";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { createBrowserClient } from "@supabase/ssr";

const C = {
  nuit:"#0D0518",violet:"#1A0A2E",prune:"#2D1A4A",mauve:"#C084FC",
  or:"#E8B86D",orPale:"#F5F0E8",texte:"#E8E0F0",texteSec:"#A899B8",texteTert:"#6B5E7A",
};

const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(
    <div style={{display:"flex",gap:"4px"}}>
      {LOCALES.map(l=>(
        <button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.or:"transparent",color:locale===l.code?C.nuit:C.texteSec,border:locale===l.code?"none":`1px solid ${C.prune}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

export default function OeuvrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations("art_slug");
  const locale = useLocale();
  const oeuvre = getOeuvre(slug);
  const [montant, setMontant] = useState(500);
  const [authChecked, setAuthChecked] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const risques = t.raw("risques") as string[];

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = `/${locale}/login`;
      else setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.nuit }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: C.texteSec, fontSize: "14px", fontFamily: "system-ui" }}>{t("verification")}</div>
        </div>
      </div>
    );
  }

  if (!oeuvre) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.nuit, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎨</div>
          <h1 style={{ color: C.orPale, fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>{t("introuvable_titre")}</h1>
          <p style={{ color: C.texteSec, fontSize: "14px", marginBottom: "20px" }}>{t("introuvable_desc")}</p>
          <Link href={`/${locale}/art`} style={{ background: C.mauve, color: C.nuit, padding: "12px 24px", borderRadius: "3px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
            {t("voir_galerie")}
          </Link>
        </div>
      </main>
    );
  }

  const pct = Math.round(((oeuvre.tokens - oeuvre.disponibles) / oeuvre.tokens) * 100);
  const complet = oeuvre.disponibles === 0;
  const tokensAchat = Math.floor(montant / oeuvre.prixToken);
  const royaltesEstimees = tokensAchat * oeuvre.prixToken * (parseFloat(oeuvre.rendementEst.split("-")[1]) / 100);
  const autresOeuvres = OEUVRES.filter(o => o.territoire === oeuvre.territoire && o.slug !== oeuvre.slug).slice(0, 3);

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: isMobile ? "20px" : "0" }}>
      <div style={{ background: complet ? C.prune : C.violet, borderRadius: "8px", padding: "20px", border: `0.5px solid ${complet ? C.texteTert : C.mauve}30` }}>
        {complet ? (
          <>
            <div style={{ color: C.texteSec, fontSize: "12px", fontWeight: 600, marginBottom: "10px", fontFamily: "system-ui" }}>{t("levee_terminee")}</div>
            <p style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui" }}>{t("liste_attente_desc")}</p>
            <Link href={`/${locale}/kyc`} style={{ display: "block", background: C.mauve, color: C.nuit, padding: "11px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              {t("liste_attente_btn")}
            </Link>
          </>
        ) : (
          <>
            <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>{t("investir_label")}</div>
            <div style={{ color: C.orPale, fontSize: "24px", fontWeight: 700, marginBottom: "2px" }}>{oeuvre.rendementEst}</div>
            <div style={{ color: C.texteSec, fontSize: "12px", marginBottom: "14px", fontFamily: "system-ui" }}>{t("rendement_label")}</div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>{t("tokens_leves")}</span>
                <span style={{ color: C.mauve, fontSize: "11px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}%</span>
              </div>
              <div style={{ background: C.prune, borderRadius: "20px", height: "5px" }}>
                <div style={{ background: pct >= 95 ? "#E24B4A" : C.mauve, height: "100%", borderRadius: "20px", width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>{oeuvre.tokens - oeuvre.disponibles} {t("vendus")}</span>
                <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>{oeuvre.disponibles} {t("restants")}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
              {[
                { label: t("prix_token"), val: `${oeuvre.prixToken}€` },
                { label: t("royalties"), val: oeuvre.royaltes },
                { label: t("estimation"), val: `${(oeuvre.estimation / 1000).toFixed(0)}k€` },
                { label: t("tokens_dispo"), val: String(oeuvre.disponibles) },
              ].map((m, i) => (
                <div key={i} style={{ background: C.prune, borderRadius: "4px", padding: "8px 10px" }}>
                  <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui", marginBottom: "2px" }}>{m.label}</div>
                  <div style={{ color: C.orPale, fontSize: "13px", fontWeight: 700, fontFamily: "system-ui" }}>{m.val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: C.prune, borderRadius: "6px", padding: "12px", marginBottom: "12px" }}>
              <div style={{ color: C.or, fontSize: "11px", fontWeight: 600, marginBottom: "8px", fontFamily: "system-ui" }}>{t("simuler")}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>{t("montant")}</span>
                <span style={{ color: C.or, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{montant}€</span>
              </div>
              <input type="range" min={oeuvre.prixToken} max={Math.min(oeuvre.disponibles * oeuvre.prixToken, 5000)} step={oeuvre.prixToken} value={montant}
                onChange={e => setMontant(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.mauve }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                <div style={{ background: C.violet, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui" }}>{t("tokens_acquis")}</div>
                  <div style={{ color: C.orPale, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{tokensAchat}</div>
                </div>
                <div style={{ background: C.violet, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui" }}>{t("royalties_est")}</div>
                  <div style={{ color: C.mauve, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{Math.round(royaltesEstimees)}€</div>
                </div>
              </div>
            </div>
            <Link href={`/${locale}/kyc`} style={{ display: "block", background: C.mauve, color: C.nuit, padding: "13px", borderRadius: "3px", fontSize: "13px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              {t("acquerir")}
            </Link>
            <p style={{ color: C.texteTert, fontSize: "10px", textAlign: "center", marginTop: "8px", fontFamily: "system-ui" }}>
              {t("kyc_requis")} {oeuvre.prixToken}€ · {t("risque")}
            </p>
          </>
        )}
      </div>

      <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: "18px" }}>
        <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "system-ui" }}>{t("certification")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { label: t("blockchain"), val: oeuvre.blockchain },
            { label: t("auditeur"), val: oeuvre.auditeur },
            { label: t("standard"), val: "XRP Ledger — ERC-1155" },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ color: C.texteTert, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "system-ui" }}>{r.label}</div>
              <div style={{ color: C.texte, fontSize: "11px", marginTop: "2px", fontFamily: "system-ui" }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.prune, borderRadius: "8px", padding: "18px", textAlign: "center" }}>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>📊</div>
        <div style={{ color: C.or, fontSize: "12px", fontWeight: 600, marginBottom: "6px", fontFamily: "system-ui" }}>{t("simulation_complete")}</div>
        <p style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui" }}>{t("simulation_desc")}</p>
        <Link href={`/${locale}/simulateur`} style={{ display: "block", background: C.violet, color: C.mauve, padding: "10px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, textDecoration: "none", fontFamily: "system-ui", border: `0.5px solid ${C.mauve}40` }}>
          {t("ouvrir_simulateur")}
        </Link>
      </div>
    </div>
  );

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.nuit, minHeight: "100vh" }}>
      <nav style={{ background: `${C.nuit}F0`, backdropFilter: "blur(8px)", borderBottom: `0.5px solid ${C.prune}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href={`/${locale}`} style={{ textDecoration: "none" }}>
            <LogoNuit size={isMobile ? 0.6 : 0.7} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <LanguageSwitcher />
            <Link href={`/${locale}/art`} style={{ color: C.texteSec, fontSize: "11px", textDecoration: "none", fontFamily: "system-ui" }}>
              {isMobile ? t("retour_court") : t("retour")}
            </Link>
            <NavbarAuth buttonBg="#E8B86D" buttonColor="#0D0518" textColor="#A899B8" borderColor="rgba(232,184,109,.3)" />
          </div>
        </div>
      </nav>

      <section style={{ position: "relative", height: isMobile ? "280px" : "480px", overflow: "hidden" }}>
        <Image src={oeuvre.photoBandeau} alt={oeuvre.titre} fill sizes="100vw" style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,5,24,.3) 0%, rgba(13,5,24,.7) 60%, rgba(13,5,24,.95) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "24px 16px" : "40px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Link href={`/${locale}/art`} style={{ color: C.texteSec, fontSize: "11px", textDecoration: "none", fontFamily: "system-ui" }}>{t("galerie_label")}</Link>
                <span style={{ color: C.texteSec, opacity: .4 }}>›</span>
                <span style={{ color: C.or, fontSize: "11px", fontFamily: "system-ui" }}>{oeuvre.titre}</span>
              </div>
            )}
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span style={{ background: oeuvre.tagColor, color: "white", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "20px", fontFamily: "system-ui" }}>{oeuvre.tag}</span>
              <span style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.85)", fontSize: "9px", padding: "3px 12px", borderRadius: "20px", fontFamily: "system-ui" }}>
                {oeuvre.medium} · {oeuvre.dimensions}
              </span>
              {!complet && <span style={{ background: `${C.mauve}25`, color: C.mauve, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "20px", border: `0.5px solid ${C.mauve}40`, fontFamily: "system-ui" }}>{oeuvre.disponibles} {t("tokens_disponibles")}</span>}
            </div>
            <h1 style={{ color: "white", fontSize: isMobile ? "24px" : "42px", fontWeight: 300, lineHeight: 1.15, margin: "0 0 6px" }}>{oeuvre.titre}</h1>
            <div style={{ color: C.or, fontSize: isMobile ? "14px" : "18px", fontFamily: "system-ui" }}>
              {oeuvre.artiste} · {oeuvre.origine} · {oeuvre.annee}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px 40px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div>
            {isMobile && <SidebarContent />}

            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>{t("l_oeuvre")}</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: 0, fontFamily: "system-ui" }}>{oeuvre.description}</p>
            </div>

            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>{t("histoire_oeuvre")}</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: 0, fontFamily: "system-ui" }}>{oeuvre.histoire}</p>
            </div>

            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("palette")}</div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {oeuvre.couleurs.map((c, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: isMobile ? "40px" : "56px", height: isMobile ? "40px" : "56px", borderRadius: "50%", background: c, border: `2px solid ${C.prune}`, boxShadow: `0 0 12px ${c}40` }} />
                    <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui" }}>{c}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("l_artiste")}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.mauve}40, ${C.or}40)`, border: `2px solid ${C.mauve}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: C.mauve, fontFamily: "system-ui", flexShrink: 0 }}>
                  {oeuvre.artisteInitiales}
                </div>
                <div>
                  <div style={{ color: C.orPale, fontSize: "16px", fontWeight: 600 }}>{oeuvre.artiste}</div>
                  <div style={{ color: C.texteSec, fontSize: "12px", fontFamily: "system-ui", marginTop: "2px" }}>{oeuvre.origine} · {oeuvre.style}</div>
                </div>
              </div>
              <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8, margin: "0 0 14px", fontFamily: "system-ui" }}>{oeuvre.artisteBio}</p>
              <div style={{ background: `${C.mauve}15`, border: `0.5px solid ${C.mauve}30`, borderRadius: "6px", padding: "10px 12px", marginBottom: "14px" }}>
                <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px", fontFamily: "system-ui" }}>{t("actualite")}</div>
                <div style={{ color: C.texte, fontSize: "12px", fontFamily: "system-ui" }}>{oeuvre.artisteActu}</div>
              </div>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>{t("expositions")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {oeuvre.artisteExpositions.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: C.or, fontSize: "12px", flexShrink: 0 }}>★</span>
                    <span style={{ color: C.texteSec, fontSize: "12px", fontFamily: "system-ui" }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>{t("expositions_oeuvre")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {oeuvre.expositionsOeuvre.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "10px 12px", background: C.prune, borderRadius: "4px" }}>
                    <span style={{ color: C.mauve, fontSize: "12px", flexShrink: 0 }}>◈</span>
                    <span style={{ color: C.texteSec, fontSize: "12px", fontFamily: "system-ui" }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>{t("droits")}</div>
              <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8, margin: 0, fontFamily: "system-ui" }}>{oeuvre.droits}</p>
            </div>

            <div style={{ background: "#FFFBEB", borderRadius: "8px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "20px", marginBottom: "16px" }}>
              <div style={{ color: "#92400E", fontSize: "12px", fontWeight: 700, marginBottom: "8px", fontFamily: "system-ui" }}>{t("avertissements")}</div>
              {risques.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "6px", fontSize: "11px", color: "#92400E", fontFamily: "system-ui", marginBottom: "4px" }}>
                  <span style={{ flexShrink: 0 }}>›</span><span>{r}</span>
                </div>
              ))}
            </div>

            {autresOeuvres.length > 0 && (
              <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px" }}>
                <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "system-ui" }}>{t("meme_territoire")}</div>
                <h3 style={{ color: C.orPale, fontSize: "16px", fontWeight: 600, margin: "0 0 14px", fontFamily: "system-ui" }}>{t("autres_oeuvres")}</h3>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(autresOeuvres.length, 3)}, 1fr)`, gap: "10px" }}>
                  {autresOeuvres.map(o => (
                    <Link key={o.slug} href={`/${locale}/art/${o.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ borderRadius: "6px", overflow: "hidden", border: `0.5px solid ${C.prune}`, transition: "transform .2s" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                      >
                        <div style={{ height: "80px", position: "relative", overflow: "hidden" }}>
                          <Image src={o.photo} alt={o.titre} fill sizes="200px" style={{ objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,5,24,.8) 0%, transparent 60%)" }} />
                          <div style={{ position: "absolute", bottom: "6px", left: "8px", right: "8px" }}>
                            <div style={{ color: "white", fontSize: "11px", fontWeight: 600, fontFamily: "system-ui" }}>{o.titre}</div>
                          </div>
                        </div>
                        <div style={{ background: C.prune, padding: "8px 10px" }}>
                          <div style={{ color: C.texteSec, fontSize: "10px", fontFamily: "system-ui" }}>{o.artiste}</div>
                          <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, fontFamily: "system-ui" }}>{o.rendementEst}</div>
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
              <SidebarContent />
            </div>
          )}
        </div>
      </div>

      {isMobile && !complet && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.violet, borderTop: `0.5px solid ${C.prune}`, padding: "12px 16px", zIndex: 150, display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>{t("royalties_mobile")}</div>
            <div style={{ color: C.mauve, fontSize: "18px", fontWeight: 800, fontFamily: "system-ui" }}>{oeuvre.rendementEst}</div>
          </div>
          <Link href={`/${locale}/kyc`} style={{ background: C.mauve, color: C.nuit, padding: "13px 24px", borderRadius: "3px", fontSize: "14px", fontWeight: 700, textDecoration: "none", flexShrink: 0, fontFamily: "system-ui" }}>
            {t("investir_mobile")}
          </Link>
        </div>
      )}

      <Footer />
    </main>
  );
}