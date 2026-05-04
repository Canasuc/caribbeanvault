"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoNavy } from "@/components/Logo";
import Footer from "@/components/Footer";
import type { NewsItem } from "@/app/api/news/route";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy:"#1A2E4A",sable:"#D4884A",creme:"#F8F6F1",grisBord:"#E8E2D6",
  texte:"#1A2E4A",texteSec:"#4A5568",texteTert:"#9CA3AF",blanc:"#FFFFFF",
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

function formatDate(dateStr:string,locale:string){
  try{
    const d=new Date(dateStr);
    return d.toLocaleDateString(locale==="en"?"en-GB":locale==="es"?"es-ES":"fr-FR",{day:"numeric",month:"long",year:"numeric"});
  }catch{return dateStr;}
}

function NewsCard({article,featured=false,isMobile=false,lireLabel,locale}:{article:NewsItem;featured?:boolean;isMobile?:boolean;lireLabel:string;locale:string}){
  const [hovered,setHovered]=useState(false);
  return(
    <a href={article.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block",height:"100%"}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{background:"white",borderRadius:"12px",overflow:"hidden",border:hovered?`1.5px solid ${article.color}`:`0.5px solid ${C.grisBord}`,transition:"all .2s",transform:hovered?"translateY(-3px)":"none",boxShadow:hovered?"0 8px 24px rgba(0,0,0,.08)":"none",height:"100%"}}>
        <div style={{background:article.color,padding:featured&&!isMobile?"20px 20px 16px":"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
            <span style={{fontSize:featured&&!isMobile?"18px":"13px"}}>{article.icon}</span>
            <span style={{color:"rgba(255,255,255,.85)",fontSize:"10px",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>{article.theme}</span>
          </div>
          <span style={{color:"rgba(255,255,255,.6)",fontSize:"10px"}}>{formatDate(article.date,locale)}</span>
        </div>
        <div style={{padding:featured&&!isMobile?"18px":"12px 14px"}}>
          <h3 style={{color:C.texte,fontSize:featured&&!isMobile?"15px":"13px",fontWeight:700,lineHeight:1.4,margin:"0 0 8px",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
            {article.titre}
          </h3>
          {article.resume&&(
            <p style={{color:C.texteSec,fontSize:"12px",lineHeight:1.7,margin:"0 0 10px",display:"-webkit-box",WebkitLineClamp:isMobile?2:(featured?4:3),WebkitBoxOrient:"vertical",overflow:"hidden"}}>
              {article.resume}
            </p>
          )}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:C.texteTert,fontSize:"10px"}}>{article.source}</span>
            <span style={{color:article.color,fontSize:"11px",fontWeight:600}}>{lireLabel}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function NewsCardSkeleton(){
  return(
    <div style={{background:"white",borderRadius:"12px",border:`0.5px solid ${C.grisBord}`,overflow:"hidden"}}>
      <div style={{height:"40px",background:"#E5E7EB"}}/>
      <div style={{padding:"12px 14px"}}>
        <div style={{height:"13px",background:"#F3F4F6",borderRadius:"4px",marginBottom:"8px"}}/>
        <div style={{height:"13px",background:"#F3F4F6",borderRadius:"4px",width:"80%",marginBottom:"8px"}}/>
        <div style={{height:"10px",background:"#F3F4F6",borderRadius:"4px",width:"60%"}}/>
      </div>
    </div>
  );
}

export default function ActualitesPage(){
  const t=useTranslations("actu");
  const locale=useLocale();
  const [articles,setArticles]=useState<NewsItem[]>([]);
  const [loading,setLoading]=useState(true);
  const [theme,setTheme]=useState("tous");
  const [erreur,setErreur]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const {isMobile,isTablet}=useBreakpoint();

  const filtres=t.raw("filtres") as {key:string;label:string;icon:string}[];

useEffect(()=>{
  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/news?theme=${theme}&limit=30`);
      const data = await r.json();
      setArticles(data.articles || []);
    } catch {
      setErreur(true);
    } finally {
      setLoading(false);
    }
  };
  void load();
}, [theme]);

  const featured=articles.slice(0,2);
  const rest=articles.slice(2);
  const colsFeatured=isMobile?"1fr":"1fr 1fr";
  const colsGrid=isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(3, 1fr)";

  const NAV_LINKS=[
    {label:t("retour"),href:`/${locale}`},
    {label:t("nav_immobilier"),href:`/${locale}/immobilier`},
    {label:t("nav_rhum"),href:`/${locale}/rhum`},
  ];

  return(
    <main style={{fontFamily:"system-ui, -apple-system, sans-serif",background:C.creme,minHeight:"100vh"}}>

      <nav style={{background:C.blanc,borderBottom:`0.5px solid ${C.grisBord}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:isMobile?"60px":"72px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoNavy size={isMobile?0.7:0.85}/>
          </Link>
          {!isMobile&&(
            <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
              {NAV_LINKS.map(l=>(
                <Link key={l.label} href={l.href} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>{l.label}</Link>
              ))}
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6"/>
            </div>
          )}
          {isMobile&&(
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6"/>
              <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",flexDirection:"column",gap:"5px"}}>
                {[0,1,2].map(i=><div key={i} style={{width:"22px",height:"2px",background:C.navy,borderRadius:"2px"}}/>)}
              </button>
            </div>
          )}
        </div>
        {isMobile&&menuOpen&&(
          <div style={{background:C.blanc,borderTop:`0.5px solid ${C.grisBord}`,padding:"8px 16px"}}>
            {NAV_LINKS.map(l=>(
              <Link key={l.label} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:"block",color:C.texteSec,fontSize:"14px",textDecoration:"none",padding:"12px 0",borderBottom:`0.5px solid ${C.grisBord}`}}>{l.label}</Link>
            ))}
          </div>
        )}
      </nav>

      <section style={{background:C.navy,padding:isMobile?"36px 16px 28px":"56px 24px 48px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",background:"rgba(212,136,74,.15)",border:"0.5px solid rgba(212,136,74,.3)",borderRadius:"20px",padding:"4px 12px",marginBottom:"14px"}}>
            <span style={{color:C.sable,fontSize:"10px",fontWeight:600}}>{t("hero_badge")}</span>
          </div>
          <h1 style={{color:"white",fontSize:isMobile?"22px":"clamp(24px, 4vw, 42px)",fontWeight:800,lineHeight:1.2,margin:"0 0 10px",letterSpacing:"-.5px"}}>
            {t("hero_titre")}
          </h1>
          <p style={{color:"rgba(255,255,255,.7)",fontSize:"13px",lineHeight:1.8,margin:"0 0 20px",maxWidth:"560px"}}>
            {t("hero_desc")}
          </p>
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {filtres.map(f=>(
              <button key={f.key} onClick={()=>setTheme(f.key)} style={{padding:isMobile?"6px 12px":"7px 16px",borderRadius:"20px",cursor:"pointer",fontSize:"11px",fontWeight:600,border:"none",background:theme===f.key?C.sable:"rgba(255,255,255,.1)",color:theme===f.key?"white":"rgba(255,255,255,.7)",transition:"all .15s"}}>
                {f.icon}{isMobile?"":" "+f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:isMobile?"24px 16px":"48px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>

          {erreur&&(
            <div style={{textAlign:"center",padding:"48px 20px",background:"white",borderRadius:"12px",border:`0.5px solid ${C.grisBord}`}}>
              <div style={{fontSize:"36px",marginBottom:"12px"}}>📡</div>
              <div style={{color:C.texte,fontSize:"15px",fontWeight:600,marginBottom:"8px"}}>{t("erreur_titre")}</div>
              <p style={{color:C.texteSec,fontSize:"13px",marginBottom:"16px"}}>{t("erreur_desc")}</p>
              <button onClick={()=>window.location.reload()} style={{background:C.navy,color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>
                {t("reessayer")}
              </button>
            </div>
          )}

          {loading&&(
            <>
              <div style={{display:"grid",gridTemplateColumns:colsFeatured,gap:"14px",marginBottom:"14px"}}>
                {[1,2].map(i=><NewsCardSkeleton key={i}/>)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:colsGrid,gap:"12px"}}>
                {[1,2,3,4,5,6].map(i=><NewsCardSkeleton key={i}/>)}
              </div>
            </>
          )}

          {!loading&&!erreur&&articles.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",background:"white",borderRadius:"12px"}}>
              <div style={{fontSize:"36px",marginBottom:"12px"}}>📭</div>
              <div style={{color:C.texte,fontSize:"15px",fontWeight:600}}>{t("vide_titre")}</div>
              <p style={{color:C.texteSec,fontSize:"13px",marginTop:"8px"}}>{t("vide_desc")}</p>
            </div>
          )}

          {!loading&&!erreur&&articles.length>0&&(
            <>
              {featured.length>0&&(
                <div style={{display:"grid",gridTemplateColumns:colsFeatured,gap:"14px",marginBottom:"14px"}}>
                  {featured.map(a=><NewsCard key={a.id} article={a} featured isMobile={isMobile} lireLabel={t("lire")} locale={locale}/>)}
                </div>
              )}
              {rest.length>0&&(
                <div style={{display:"grid",gridTemplateColumns:colsGrid,gap:"12px"}}>
                  {rest.map(a=><NewsCard key={a.id} article={a} isMobile={isMobile} lireLabel={t("lire")} locale={locale}/>)}
                </div>
              )}
              <div style={{textAlign:"center",marginTop:"28px",color:C.texteTert,fontSize:"11px"}}>
                {t("info_bas")} {articles.length} {t("articles")}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer/>
    </main>
  );
}