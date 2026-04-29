"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoNavy } from "@/components/Logo";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy:"#1A2E4A",sable:"#D4884A",creme:"#F8F6F1",grisBord:"#E8E2D6",
  texte:"#1A2E4A",texteSec:"#4A5568",texteTert:"#9CA3AF",blanc:"#FFFFFF",
  vert:"#0F6E56",vertL:"#E1F5EE",
};

const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(
    <div style={{display:"flex",gap:"4px"}}>
      {LOCALES.map(l=>(
        <button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.navy:"transparent",color:locale===l.code?"white":C.texteSec,border:locale===l.code?"none":`1px solid ${C.grisBord}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

export default function LoginPage(){
  const t=useTranslations("login");
  const locale=useLocale();
  const [email,setEmail]=useState("");
  const [sent,setSent]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const {isMobile}=useBreakpoint();

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    if(!email)return;
    setLoading(true);setError("");
    const supabase=createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const {error}=await supabase.auth.signInWithOtp({
      email,
      options:{emailRedirectTo:`${window.location.origin}/auth/callback`},
    });
    if(error){setError(t("erreur"));}
    else{setSent(true);}
    setLoading(false);
  }

  return(
    <main style={{fontFamily:"system-ui, -apple-system, sans-serif",background:C.creme,minHeight:"100vh",display:"flex",flexDirection:"column"}}>

      <nav style={{background:C.blanc,borderBottom:`0.5px solid ${C.grisBord}`,padding:"0 16px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:isMobile?"60px":"72px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoNavy size={isMobile?0.7:0.85}/>
          </Link>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <LanguageSwitcher/>
            <Link href={`/${locale}/kyc`} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>
              {isMobile?t("inscrire"):t("inscrire_long")}
            </Link>
          </div>
        </div>
      </nav>

      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:isMobile?"24px 16px":"40px 24px"}}>
        <div style={{width:"100%",maxWidth:"420px"}}>

          {!sent?(
            <div style={{background:"white",borderRadius:"16px",border:`0.5px solid ${C.grisBord}`,padding:isMobile?"28px 20px":"40px 32px"}}>
              <div style={{textAlign:"center",marginBottom:"24px"}}>
                <div style={{width:"52px",height:"52px",background:"#EEF2FF",borderRadius:"14px",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px"}}>
                  🔐
                </div>
                <h1 style={{color:C.texte,fontSize:isMobile?"20px":"22px",fontWeight:800,margin:"0 0 8px"}}>{t("titre")}</h1>
                <p style={{color:C.texteSec,fontSize:"13px",lineHeight:1.7,margin:0}}>{t("desc")}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{marginBottom:"14px"}}>
                  <label style={{display:"block",color:C.texteSec,fontSize:"11px",fontWeight:600,marginBottom:"6px"}}>
                    {t("label_email")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder={t("placeholder_email")}
                    required
                    style={{width:"100%",padding:"12px 14px",border:`1px solid ${C.grisBord}`,borderRadius:"8px",fontSize:"13px",color:C.texte,outline:"none",boxSizing:"border-box"}}
                  />
                </div>

                {error&&(
                  <div style={{background:"#FEE2E2",borderRadius:"8px",padding:"10px 14px",color:"#DC2626",fontSize:"12px",marginBottom:"14px"}}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading||!email}
                  style={{width:"100%",padding:"13px",background:loading||!email?C.texteTert:C.navy,color:"white",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:700,cursor:loading||!email?"not-allowed":"pointer",transition:"background .15s"}}
                >
                  {loading?t("btn_loading"):t("btn_submit")}
                </button>
              </form>

              <div style={{textAlign:"center",marginTop:"18px"}}>
                <p style={{color:C.texteTert,fontSize:"11px",lineHeight:1.6,margin:0}}>
                  {t("pas_compte")}
                  <Link href={`/${locale}/kyc`} style={{color:C.sable,fontWeight:600,textDecoration:"none"}}>
                    {t("rejoindre")}
                  </Link>
                </p>
              </div>

              <div style={{marginTop:"16px",padding:"10px 12px",background:C.creme,borderRadius:"8px",textAlign:"center"}}>
                <p style={{color:C.texteTert,fontSize:"10px",margin:0,lineHeight:1.6}}>{t("securite")}</p>
              </div>
            </div>

          ):(
            <div style={{background:"white",borderRadius:"16px",border:`0.5px solid ${C.grisBord}`,padding:isMobile?"28px 20px":"40px 32px",textAlign:"center"}}>
              <div style={{width:"60px",height:"60px",background:C.vertL,borderRadius:"50%",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"}}>
                ✉️
              </div>
              <h2 style={{color:C.texte,fontSize:isMobile?"18px":"20px",fontWeight:800,margin:"0 0 10px"}}>{t("succes_titre")}</h2>
              <p style={{color:C.texteSec,fontSize:"13px",lineHeight:1.8,margin:"0 0 6px"}}>{t("succes_desc1")}</p>
              <p style={{color:C.navy,fontSize:"14px",fontWeight:700,margin:"0 0 16px",wordBreak:"break-all"}}>{email}</p>
              <p style={{color:C.texteSec,fontSize:"12px",lineHeight:1.7,margin:"0 0 20px"}}>{t("succes_desc2")}</p>
              <div style={{background:"#FFFBEB",borderRadius:"8px",padding:"12px",marginBottom:"18px"}}>
                <p style={{color:"#92400E",fontSize:"11px",margin:0,lineHeight:1.6}}>
                  {t("spam")}
                  <button onClick={()=>setSent(false)} style={{color:C.sable,fontWeight:600,background:"none",border:"none",cursor:"pointer",fontSize:"11px",padding:0}}>
                    {t("reessayer")}
                  </button>.
                </p>
              </div>
              <Link href={`/${locale}`} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>
                {t("retour_accueil")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}