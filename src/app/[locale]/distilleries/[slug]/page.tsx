"use client";
import Link from "next/link";
import { use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { DISTILLERIES, getDistillerie } from "@/lib/distilleries";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  noir:"#0D2018",foret:"#0F3D2A",emeraude:"#0F5240",vert:"#1A6B5A",
  or:"#C8992A",orClair:"#D4B96A",orPale:"#F0E6C8",creme:"#F7F5F0",
  texte:"#2C1810",gris:"#6B7280",menthe:"#9FE1CB",
};
const locale = useLocale(); // "fr" | "en" | "es"
type L = "fr" | "en" | "es";

const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(
    <div style={{display:"flex",gap:"4px"}}>
      {LOCALES.map(l=>(
        <button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.or:"transparent",color:locale===l.code?C.noir:C.menthe,border:locale===l.code?"none":`1px solid ${C.vert}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
          {l.flag} {l.label}
        </button>
      ))}
    </div>
  );
}

function SidebarContent({d,isMobile,locale,t}:{d:any;isMobile:boolean;locale:string;t:any}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"14px",marginBottom:isMobile?"20px":"0"}}>
      <div style={{background:d.futsDisponibles>0?C.foret:"#F1EFE8",borderRadius:"8px",padding:"20px"}}>
        {d.futsDisponibles>0?(
          <>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",marginBottom:"8px"}}>{t("investir_label")}</div>
            <div style={{color:C.orPale,fontSize:"26px",fontWeight:700,marginBottom:"4px"}}>
              {d.futsDisponibles} {d.futsDisponibles>1?t("futs_label_pl"):t("futs_label")}
            </div>
            <div style={{color:C.menthe,fontSize:"12px",marginBottom:"14px",opacity:.8}}>
              {d.futsDisponibles>1?t("dispo_label_pl"):t("dispo_label")}
            </div>
            <Link href={`/${locale}/rhum#selection`} style={{display:"block",background:C.or,color:C.noir,padding:"12px",borderRadius:"3px",fontSize:"13px",textAlign:"center",fontWeight:700,textDecoration:"none"}}>
              {t("voir_futs")}
            </Link>
          </>
        ):(
          <>
            <div style={{color:C.gris,fontSize:"12px",marginBottom:"10px",fontWeight:600}}>{t("aucun_fut")}</div>
            <p style={{color:C.gris,fontSize:"12px",lineHeight:1.6,margin:"0 0 12px"}}>{t("liste_attente_desc")}</p>
            <Link href={`/${locale}/rhum#portefeuille`} style={{display:"block",background:C.foret,color:C.or,padding:"10px",borderRadius:"3px",fontSize:"12px",textAlign:"center",fontWeight:700,textDecoration:"none",border:`1px solid ${C.or}40`}}>
              {t("liste_attente_btn")}
            </Link>
          </>
        )}
      </div>

      <div style={{background:"white",borderRadius:"8px",border:"1px solid #E8E2D6",padding:"18px"}}>
        <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",marginBottom:"12px"}}>{t("infos")}</div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <div>
            <div style={{color:C.gris,fontSize:"10px",textTransform:"uppercase",letterSpacing:".08em"}}>{t("adresse")}</div>
            <div style={{color:C.texte,fontSize:"12px",marginTop:"2px"}}>{d.adresse}</div>
          </div>
          <div>
            <div style={{color:C.gris,fontSize:"10px",textTransform:"uppercase",letterSpacing:".08em"}}>{t("statut")}</div>
            <div style={{color:C.texte,fontSize:"12px",marginTop:"2px"}}>{d.statut[locale as L] ?? d.statut.fr}</div>
          </div>
          {d.site&&(
            <div>
              <div style={{color:C.gris,fontSize:"10px",textTransform:"uppercase",letterSpacing:".08em"}}>{t("site_officiel")}</div>
              <a href={d.site} target="_blank" rel="noopener noreferrer" style={{color:C.or,fontSize:"12px",textDecoration:"none",marginTop:"2px",display:"block"}}>
                {d.site.replace("https://","")} →
              </a>
            </div>
          )}
        </div>
      </div>

      <div style={{background:"#F0EBE1",borderRadius:"8px",padding:"18px",border:"1px solid #D5CCBA"}}>
        <div style={{color:C.texte,fontSize:"13px",fontWeight:600,marginBottom:"6px"}}>{t("simuler")}</div>
        <p style={{color:C.gris,fontSize:"12px",lineHeight:1.6,margin:"0 0 12px"}}>{t("simuler_desc")}</p>
        <Link href={`/${locale}/simulateur`} style={{display:"block",background:C.texte,color:C.orPale,padding:"10px",borderRadius:"3px",fontSize:"12px",textAlign:"center",fontWeight:600,textDecoration:"none"}}>
          {t("ouvrir_simulateur")}
        </Link>
      </div>

      <div style={{background:C.foret,borderRadius:"8px",padding:"18px",textAlign:"center"}}>
        <div style={{fontSize:"22px",marginBottom:"8px"}}>🥃</div>
        <div style={{color:C.or,fontSize:"12px",fontWeight:700,marginBottom:"6px"}}>{t("rejoindre_titre")}</div>
        <p style={{color:C.menthe,fontSize:"11px",lineHeight:1.6,margin:"0 0 12px",opacity:.8}}>{t("rejoindre_desc")}</p>
        <Link href={`/${locale}/kyc`} style={{display:"block",background:C.or,color:C.noir,padding:"10px",borderRadius:"3px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>
          {t("rejoindre_btn")}
        </Link>
      </div>
    </div>
  );
}

export default function DistilleriePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params);
  const t=useTranslations("dist_slug");
  const locale=useLocale();
  const d=getDistillerie(slug);
  const {isMobile,isTablet}=useBreakpoint();

  if(!d){
    return(
      <main style={{fontFamily:"system-ui",background:C.creme,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{textAlign:"center",padding:"24px"}}>
          <div style={{fontSize:"48px",marginBottom:"16px"}}>🥃</div>
          <h1 style={{color:C.texte,fontSize:"24px",fontWeight:700,marginBottom:"8px"}}>{t("introuvable_titre")}</h1>
          <p style={{color:C.gris,fontSize:"14px",marginBottom:"20px"}}>{t("introuvable_desc")}</p>
          <Link href={`/${locale}/distilleries`} style={{background:C.foret,color:C.or,padding:"12px 24px",borderRadius:"3px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>
            {t("voir_toutes")}
          </Link>
        </div>
      </main>
    );
  }

  const memeIle=DISTILLERIES.filter(x=>x.ile===d.ile&&x.slug!==d.slug).slice(0,3);

  const STATS_DATA=[
    {val:String(d.fondee),label:t("fondation")},
    {val:d.acreage,label:t("superficie")},
    {val:d.production,label:t("production")},
    {val:d.region,label:t("localisation")},
  ];

  return(
    <main style={{fontFamily:"system-ui, -apple-system, sans-serif",background:C.creme,minHeight:"100vh"}}>

      <nav style={{background:C.noir,borderBottom:`0.5px solid ${C.foret}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoEmeraude size={isMobile?0.6:0.7}/>
          </Link>
          <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
            <LanguageSwitcher/>
            <Link href={`/${locale}/distilleries`} style={{color:C.menthe,fontSize:"11px",textDecoration:"none",opacity:.8}}>
              {isMobile?t("retour_court"):t("retour")}
            </Link>
            <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)"/>
          </div>
        </div>
      </nav>

      <section style={{background:d.couleur,padding:isMobile?"36px 16px 28px":"64px 24px 48px",position:"relative",overflow:"hidden"}}>
        {!isMobile&&[300,200,120].map((size,i)=>(
          <div key={i} style={{position:"absolute",right:`-${size/3}px`,top:"50%",transform:"translateY(-50%)",width:`${size}px`,height:`${size}px`,borderRadius:"50%",border:`1px solid ${C.or}${["15","20","30"][i]}`}}/>
        ))}
        <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative"}}>
          {!isMobile&&(
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <Link href={`/${locale}/rhum`} style={{color:C.menthe,fontSize:"11px",textDecoration:"none",opacity:.7}}>Rhum AOC</Link>
              <span style={{color:C.menthe,opacity:.4}}>›</span>
              <Link href={`/${locale}/distilleries`} style={{color:C.menthe,fontSize:"11px",textDecoration:"none",opacity:.7}}>Distilleries</Link>
              <span style={{color:C.menthe,opacity:.4}}>›</span>
              <span style={{color:C.or,fontSize:"11px"}}>{d.nom}</span>
            </div>
          )}
          <div style={{display:"flex",gap:"8px",marginBottom:"14px",flexWrap:"wrap"}}>
            <span style={{background:C.or,color:C.noir,fontSize:"9px",fontWeight:700,padding:"3px 12px",borderRadius:"1px",letterSpacing:".2em",textTransform:"uppercase"}}>{t("aoc_badge")}</span>
            <span style={{border:`0.5px solid ${C.menthe}`,color:C.menthe,fontSize:"9px",padding:"3px 12px",borderRadius:"1px",textTransform:"uppercase"}}>
              {d.ile} · {t("fondee")} {d.fondee}
            </span>
            {d.futsDisponibles>0&&(
              <span style={{background:"rgba(200,153,42,.2)",color:C.or,fontSize:"9px",fontWeight:700,padding:"3px 12px",borderRadius:"1px"}}>
                {d.futsDisponibles} {d.futsDisponibles>1?t("futs_dispos_badge"):t("futs_dispo_badge")}
              </span>
            )}
          </div>
          <h1 style={{color:C.orPale,fontSize:isMobile?"26px":"clamp(26px, 4vw, 48px)",fontWeight:300,lineHeight:1.15,margin:"0 0 10px",fontFamily:"Georgia, serif"}}>{d.nom}</h1>
          <p style={{color:C.menthe,fontSize:isMobile?"13px":"15px",lineHeight:1.7,maxWidth:"580px",margin:"0 0 20px",opacity:.9}}>{d.description[locale as L] ?? d.description.fr}</p>
          <div style={{display:"flex",gap:"0",flexWrap:"wrap",borderTop:`0.5px solid ${C.or}30`,paddingTop:"20px"}}>
            {STATS_DATA.map((s,i)=>(
              <div key={i} style={{paddingRight:isMobile?"16px":"32px",marginRight:isMobile?"16px":"32px",borderRight:i<3?`0.5px solid ${C.or}20`:"none",marginBottom:"8px"}}>
                <div style={{color:C.or,fontSize:isMobile?"13px":"16px",fontWeight:700}}>{s.val}</div>
                <div style={{color:C.menthe,fontSize:"9px",letterSpacing:".07em",textTransform:"uppercase",marginTop:"2px",opacity:.7}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{maxWidth:"1100px",margin:"0 auto",padding:isMobile?"20px 16px":"48px 24px"}}>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr":"2fr 1fr",gap:"24px",alignItems:"start"}}>
          <div>
            {isMobile&&<SidebarContent d={d} isMobile={isMobile} locale={locale} t={t}/>}

            <div style={{background:"white",borderRadius:"8px",border:"1px solid #E8E2D6",padding:isMobile?"18px":"28px",marginBottom:"16px"}}>
              <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px"}}>{t("notre_histoire")}</div>
              <p style={{color:C.gris,fontSize:"14px",lineHeight:1.9,margin:0}}>{d.histoire[locale as L] ?? d.histoire.fr}</p>
            </div>

            <div style={{background:"white",borderRadius:"8px",border:"1px solid #E8E2D6",padding:isMobile?"18px":"28px",marginBottom:"16px"}}>
              <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"14px"}}>{t("nos_rhums")}</div>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                {d.specialites.map(s => s[locale as L] ?? s.fr)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",background:C.creme,borderRadius:"4px",borderLeft:`3px solid ${d.couleur}`}}>
                    <span style={{color:C.or,fontSize:"14px"}}>🥃</span>
                    <span style={{color:C.texte,fontSize:"13px"}}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:"white",borderRadius:"8px",border:"1px solid #E8E2D6",padding:isMobile?"18px":"28px",marginBottom:"16px"}}>
              <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"14px"}}>{t("nos_futs")}</div>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(auto-fit, minmax(200px, 1fr))",gap:"10px"}}>
                {d.barriques.map(b => b[locale as L] ?? b.fr)=>(
                  <div key={i} style={{padding:"12px",background:C.foret,borderRadius:"4px",textAlign:"center"}}>
                    <div style={{fontSize:"18px",marginBottom:"6px"}}>🪵</div>
                    <div style={{color:C.orClair,fontSize:"11px",fontWeight:500}}>{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:"white",borderRadius:"8px",border:"1px solid #E8E2D6",padding:isMobile?"18px":"28px"}}>
              <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"14px"}}>{t("distinctions")}</div>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                {d.recompenses.map((r:string,i:number)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    <span style={{color:C.or,fontSize:"14px",flexShrink:0}}>★</span>
                    <span style={{color:C.gris,fontSize:"13px"}}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!isMobile&&(
            <div style={{position:"sticky",top:"76px"}}>
              <SidebarContent d={d} isMobile={isMobile} locale={locale} t={t}/>
            </div>
          )}
        </div>

        {memeIle.length>0&&(
          <div style={{marginTop:"40px"}}>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>
              {t("aussi_en")} {d.ile}
            </div>
            <h2 style={{color:C.texte,fontSize:isMobile?"18px":"22px",fontWeight:600,margin:"0 0 16px",fontFamily:"Georgia, serif"}}>
              {t("autres_distilleries")}
            </h2>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":`repeat(${Math.min(memeIle.length,3)}, 1fr)`,gap:"12px"}}>
              {memeIle.map((autre:any)=>(
                <Link key={autre.slug} href={`/${locale}/distilleries/${autre.slug}`} style={{textDecoration:"none"}}>
                  <div style={{background:autre.couleur,borderRadius:"6px",padding:isMobile?"16px":"20px",transition:"transform .2s"}}
                    onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="none")}
                  >
                    <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"4px"}}>{t("fondee_en")} {autre.fondee}</div>
                    <div style={{color:"white",fontSize:"15px",fontWeight:600,marginBottom:"4px"}}>{autre.nom}</div>
                    <div style={{color:C.menthe,fontSize:"11px",opacity:.8,marginBottom:"10px"}}>{autre.region}</div>
                    <div style={{color:C.or,fontSize:"11px",fontWeight:700}}>{t("decouvrir")}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer/>
    </main>
  );
}