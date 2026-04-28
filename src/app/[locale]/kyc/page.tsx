"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoNavy } from "@/components/Logo";
import Footer from "@/components/Footer";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy:"#1A2E4A",sable:"#D4884A",sableL:"#FFF7ED",creme:"#F8F6F1",
  grisBord:"#E8E2D6",texte:"#1A2E4A",texteSec:"#4A5568",texteTert:"#9CA3AF",
  blanc:"#FFFFFF",vert:"#0F6E56",vertL:"#E1F5EE",rouge:"#DC2626",rougeL:"#FEE2E2",
};

const LOCALES = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {LOCALES.map(l => (
        <button key={l.code} onClick={() => switchLocale(l.code)} style={{
          background: locale === l.code ? C.navy : "transparent",
          color: locale === l.code ? "white" : C.texteSec,
          border: locale === l.code ? "none" : `1px solid ${C.grisBord}`,
          borderRadius: "4px", padding: "3px 8px", fontSize: "10px",
          fontWeight: 700, cursor: "pointer", fontFamily: "system-ui",
        }}>{l.flag} {l.label}</button>
      ))}
    </div>
  );
}

export default function KYCPage() {
  const t = useTranslations("kyc");
  const locale = useLocale();
  const [form, setForm] = useState({
    prenom:"",nom:"",email:"",telephone:"",
    pays:"",actif_interet:"",montant_envisage:"",
    statut_investisseur:"",message:"",consentement:false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const { isMobile } = useBreakpoint();

  const PAYS_EU = t.raw("pays_liste") as string[];
  const MONTANTS = t.raw("montants") as string[];
  const STATUTS = t.raw("statuts") as string[];
  const ACTIFS = [
    { val: "rhum", label: `🥃 ${t("actif_rhum")}` },
    { val: "immobilier", label: `🏠 ${t("actif_immo")}` },
    { val: "agriculture", label: `🌿 ${t("actif_agri")}` },
    { val: "art", label: `🎨 ${t("actif_art")}` },
    { val: "tous", label: `📊 ${t("actif_tous")}` },
  ];
  const ETAPES = [t("etape1"), t("etape2"), t("etape3")];
  const RECAPITULATIF_LABELS = [t("recap_nom"), t("recap_email"), t("recap_pays"), t("recap_actif"), t("recap_montant"), t("recap_statut")];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) { setSuccess(true); }
      else { setError(data.error || t("erreur_generique")); }
    } catch {
      setError(t("erreur_connexion"));
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width:"100%",padding:"11px 14px",border:`1px solid ${C.grisBord}`,
    borderRadius:"8px",fontSize:"13px",color:C.texte,background:"white",
    outline:"none",boxSizing:"border-box" as const,fontFamily:"system-ui",
  };
  const labelStyle = {
    display:"block",color:C.texteSec,fontSize:"11px",fontWeight:600,
    marginBottom:"6px",letterSpacing:".02em",
  };

  if (success) {
    return (
      <main style={{ fontFamily:"system-ui",background:C.creme,minHeight:"100vh" }}>
        <nav style={{ background:C.blanc,borderBottom:`0.5px solid ${C.grisBord}`,padding:"0 16px",position:"sticky",top:0,zIndex:100 }}>
          <div style={{ maxWidth:"800px",margin:"0 auto",display:"flex",alignItems:"center",height:"64px" }}>
            <Link href={`/${locale}`} style={{ textDecoration:"none" }}><LogoNavy size={0.8} /></Link>
          </div>
        </nav>
        <div style={{ maxWidth:"560px",margin:isMobile?"40px auto":"80px auto",padding:"0 16px",textAlign:"center" }}>
          <div style={{ background:"white",borderRadius:"16px",border:`0.5px solid ${C.grisBord}`,padding:isMobile?"32px 20px":"48px 32px" }}>
            <div style={{ width:"64px",height:"64px",background:C.vertL,borderRadius:"50%",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px" }}>✓</div>
            <h1 style={{ color:C.texte,fontSize:isMobile?"20px":"24px",fontWeight:800,margin:"0 0 12px" }}>{t("succes_titre")}</h1>
            <p style={{ color:C.texteSec,fontSize:"14px",lineHeight:1.8,margin:"0 0 24px" }}>{t("succes_desc")}</p>
            <div style={{ background:C.sableL,borderRadius:"10px",padding:"14px",marginBottom:"20px",textAlign:"left" }}>
              <div style={{ color:C.sable,fontSize:"11px",fontWeight:700,marginBottom:"8px" }}>{t("prochaines_etapes")}</div>
              {[t("succes_step1"),t("succes_step2"),t("succes_step3"),t("succes_step4")].map((s,i) => (
                <div key={i} style={{ display:"flex",gap:"8px",fontSize:"12px",color:C.texteSec,marginBottom:"6px" }}>
                  <span style={{ color:C.sable,fontWeight:700 }}>{i+1}.</span><span>{s}</span>
                </div>
              ))}
            </div>
            <Link href={`/${locale}`} style={{ display:"block",background:C.navy,color:"white",padding:"12px 24px",borderRadius:"8px",fontSize:"13px",fontWeight:600,textDecoration:"none" }}>
              {t("retour_accueil")}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ fontFamily:"system-ui, -apple-system, sans-serif",background:C.creme,minHeight:"100vh" }}>
      <nav style={{ background:C.blanc,borderBottom:`0.5px solid ${C.grisBord}`,padding:"0 16px",position:"sticky",top:0,zIndex:100 }}>
        <div style={{ maxWidth:"800px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:isMobile?"60px":"72px" }}>
          <Link href={`/${locale}`} style={{ textDecoration:"none" }}>
            <LogoNavy size={isMobile?0.7:0.85} />
          </Link>
          <div style={{ display:"flex",gap:"12px",alignItems:"center" }}>
            <LanguageSwitcher />
            <Link href={`/${locale}`} style={{ color:C.texteSec,fontSize:"12px",textDecoration:"none" }}>
              {isMobile?`← ${t("accueil")}`:`← ${t("retour_accueil")}`}
            </Link>
          </div>
        </div>
      </nav>

      <section style={{ background:C.navy,padding:isMobile?"32px 16px 28px":"48px 24px 40px",textAlign:"center" }}>
        <div style={{ maxWidth:"600px",margin:"0 auto" }}>
          <div style={{ display:"inline-flex",alignItems:"center",background:"rgba(212,136,74,.15)",border:"0.5px solid rgba(212,136,74,.3)",borderRadius:"20px",padding:"4px 12px",marginBottom:"14px" }}>
            <span style={{ color:C.sable,fontSize:"10px",fontWeight:600 }}>{t("badge")}</span>
          </div>
          <h1 style={{ color:"white",fontSize:isMobile?"22px":"clamp(22px, 4vw, 36px)",fontWeight:800,lineHeight:1.2,margin:"0 0 10px" }}>
            {t("titre")}
          </h1>
          <p style={{ color:"rgba(255,255,255,.7)",fontSize:"13px",lineHeight:1.8,margin:0 }}>
            {t("sous_titre")}
          </p>
        </div>
      </section>

      <div style={{ maxWidth:"680px",margin:"0 auto",padding:isMobile?"24px 16px":"40px 24px" }}>
        {/* Indicateur étapes */}
        <div style={{ display:"flex",marginBottom:"28px" }}>
          {ETAPES.map((s,i) => (
            <div key={i} style={{ flex:1,textAlign:"center" }}>
              <div style={{ display:"flex",alignItems:"center" }}>
                {i>0&&<div style={{ flex:1,height:"2px",background:step>i?C.sable:C.grisBord }} />}
                <div style={{ width:"28px",height:"28px",borderRadius:"50%",background:step>i+1?C.vert:step===i+1?C.navy:C.grisBord,color:step>=i+1?"white":C.texteTert,fontSize:"11px",fontWeight:700,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  {step>i+1?"✓":i+1}
                </div>
                {i<2&&<div style={{ flex:1,height:"2px",background:step>i+1?C.sable:C.grisBord }} />}
              </div>
              <div style={{ color:step===i+1?C.navy:C.texteTert,fontSize:isMobile?"9px":"10px",marginTop:"6px",fontWeight:step===i+1?600:400 }}>{s}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ background:"white",borderRadius:"16px",border:`0.5px solid ${C.grisBord}`,padding:isMobile?"20px 16px":"32px",marginBottom:"14px" }}>

            {/* ÉTAPE 1 */}
            {step===1&&(
              <div>
                <h2 style={{ color:C.texte,fontSize:isMobile?"16px":"18px",fontWeight:700,margin:"0 0 20px" }}>{t("etape1_titre")}</h2>
                <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"14px",marginBottom:"14px" }}>
                  <div>
                    <label style={labelStyle}>{t("prenom")} *</label>
                    <input name="prenom" value={form.prenom} onChange={handleChange} required placeholder="Jean" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("nom")} *</label>
                    <input name="nom" value={form.nom} onChange={handleChange} required placeholder="Dupont" style={inputStyle} />
                  </div>
                </div>
                <div style={{ marginBottom:"14px" }}>
                  <label style={labelStyle}>{t("email")} *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jean.dupont@email.com" style={inputStyle} />
                </div>
                <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"14px",marginBottom:"14px" }}>
                  <div>
                    <label style={labelStyle}>{t("telephone")}</label>
                    <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="+33 6 12 34 56 78" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t("pays")} *</label>
                    <select name="pays" value={form.pays} onChange={handleChange} required style={inputStyle}>
                      <option value="">{t("selectionnez")}</option>
                      {PAYS_EU.map(p=><option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <button type="button" onClick={()=>{if(form.prenom&&form.nom&&form.email&&form.pays)setStep(2);}}
                  style={{ width:"100%",background:C.navy,color:"white",border:"none",padding:"13px",borderRadius:"8px",fontSize:"14px",fontWeight:700,cursor:"pointer",marginTop:"8px" }}>
                  {t("continuer")} →
                </button>
              </div>
            )}

            {/* ÉTAPE 2 */}
            {step===2&&(
              <div>
                <h2 style={{ color:C.texte,fontSize:isMobile?"16px":"18px",fontWeight:700,margin:"0 0 20px" }}>{t("etape2_titre")}</h2>
                <div style={{ marginBottom:"16px" }}>
                  <label style={labelStyle}>{t("actif_interet")} *</label>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px" }}>
                    {ACTIFS.map(a=>(
                      <button key={a.val} type="button" onClick={()=>setForm(f=>({...f,actif_interet:a.val}))} style={{
                        padding:"10px 12px",borderRadius:"8px",cursor:"pointer",
                        border:form.actif_interet===a.val?`2px solid ${C.navy}`:`1px solid ${C.grisBord}`,
                        background:form.actif_interet===a.val?"#EEF2FF":"white",
                        color:form.actif_interet===a.val?C.navy:C.texteSec,
                        fontSize:isMobile?"11px":"12px",fontWeight:form.actif_interet===a.val?700:400,textAlign:"left",
                      }}>{a.label}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom:"14px" }}>
                  <label style={labelStyle}>{t("montant")} *</label>
                  <select name="montant_envisage" value={form.montant_envisage} onChange={handleChange} required style={inputStyle}>
                    <option value="">{t("selectionnez")}</option>
                    {MONTANTS.map(m=><option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:"14px" }}>
                  <label style={labelStyle}>{t("statut")} *</label>
                  <select name="statut_investisseur" value={form.statut_investisseur} onChange={handleChange} required style={inputStyle}>
                    <option value="">{t("selectionnez")}</option>
                    {STATUTS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:"16px" }}>
                  <label style={labelStyle}>{t("message_optionnel")}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder={t("message_placeholder")} rows={3}
                    style={{ ...inputStyle,resize:"vertical" as const }} />
                </div>
                <div style={{ display:"flex",gap:"10px" }}>
                  <button type="button" onClick={()=>setStep(1)} style={{ flex:1,background:C.creme,color:C.texteSec,border:`1px solid ${C.grisBord}`,padding:"13px",borderRadius:"8px",fontSize:"13px",fontWeight:600,cursor:"pointer" }}>
                    ← {t("retour")}
                  </button>
                  <button type="button" onClick={()=>{if(form.actif_interet&&form.montant_envisage&&form.statut_investisseur)setStep(3);}}
                    style={{ flex:2,background:C.navy,color:"white",border:"none",padding:"13px",borderRadius:"8px",fontSize:"13px",fontWeight:700,cursor:"pointer" }}>
                    {t("continuer")} →
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 */}
            {step===3&&(
              <div>
                <h2 style={{ color:C.texte,fontSize:isMobile?"16px":"18px",fontWeight:700,margin:"0 0 20px" }}>{t("etape3_titre")}</h2>
                <div style={{ background:C.creme,borderRadius:"10px",padding:"14px",marginBottom:"16px" }}>
                  <div style={{ color:C.texteTert,fontSize:"10px",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"10px" }}>{t("recapitulatif")}</div>
                  {[
                    {label:RECAPITULATIF_LABELS[0],val:`${form.prenom} ${form.nom}`},
                    {label:RECAPITULATIF_LABELS[1],val:form.email},
                    {label:RECAPITULATIF_LABELS[2],val:form.pays},
                    {label:RECAPITULATIF_LABELS[3],val:ACTIFS.find(a=>a.val===form.actif_interet)?.label||form.actif_interet},
                    {label:RECAPITULATIF_LABELS[4],val:form.montant_envisage},
                    {label:RECAPITULATIF_LABELS[5],val:form.statut_investisseur},
                  ].map((r,i)=>(
                    <div key={i} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<5?`0.5px solid ${C.grisBord}`:"none",flexWrap:"wrap",gap:"4px" }}>
                      <span style={{ color:C.texteTert,fontSize:"12px" }}>{r.label}</span>
                      <span style={{ color:C.texte,fontSize:"12px",fontWeight:600,maxWidth:isMobile?"200px":"none",textAlign:"right",wordBreak:"break-all" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:"#F0FDF4",borderRadius:"8px",padding:"14px",marginBottom:"16px",border:"1px solid #BBF7D0" }}>
                  <label style={{ display:"flex",gap:"10px",cursor:"pointer",alignItems:"flex-start" }}>
                    <input type="checkbox" name="consentement" checked={form.consentement} onChange={handleChange}
                      style={{ marginTop:"2px",accentColor:C.vert,flexShrink:0 }} />
                    <span style={{ color:C.texteSec,fontSize:"11px",lineHeight:1.6 }}>
                      {t("consentement_texte")}{" "}
                      <Link href={`/${locale}/confidentialite`} style={{ color:C.navy,fontWeight:600 }}>{t("politique_confidentialite")}</Link>
                      {" "}{t("consentement_suite")}{" "}
                      <a href="mailto:privacy@caribbeanvault.com" style={{ color:C.navy }}>privacy@caribbeanvault.com</a>. *
                    </span>
                  </label>
                </div>
                <div style={{ background:"#FFFBEB",borderRadius:"8px",padding:"12px",marginBottom:"16px",border:"1px solid #FCD34D44" }}>
                  <div style={{ color:"#92400E",fontSize:"11px",lineHeight:1.6 }}>
                    ⚠️ <strong>{t("avertissement_titre")}</strong> {t("avertissement_texte")}
                  </div>
                </div>
                {error&&(
                  <div style={{ background:C.rougeL,borderRadius:"8px",padding:"12px",marginBottom:"14px",color:C.rouge,fontSize:"12px" }}>
                    ❌ {error}
                  </div>
                )}
                <div style={{ display:"flex",gap:"10px" }}>
                  <button type="button" onClick={()=>setStep(2)} style={{ flex:1,background:C.creme,color:C.texteSec,border:`1px solid ${C.grisBord}`,padding:"13px",borderRadius:"8px",fontSize:"13px",fontWeight:600,cursor:"pointer" }}>
                    ← {t("retour")}
                  </button>
                  <button type="submit" disabled={!form.consentement||loading}
                    style={{ flex:2,background:form.consentement&&!loading?C.navy:C.grisBord,color:"white",border:"none",padding:"13px",borderRadius:"8px",fontSize:"13px",fontWeight:700,cursor:form.consentement&&!loading?"pointer":"not-allowed" }}>
                    {loading?t("envoi_cours"):t("envoyer")}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign:"center",color:C.texteTert,fontSize:"10px",lineHeight:1.6 }}>
            {t("securite")}
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}