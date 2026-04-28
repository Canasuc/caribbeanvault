"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LogoTurquoise } from "@/components/Logo";
import Footer from "@/components/Footer";
import { BIENS, REGIONS, PROCESSUS_ONBOARDING, TYPES_BAIL, FISCALITE, getBienSlug } from "@/lib/biens";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const CarteLeaflet = dynamic(() => import("@/components/CarteLeaflet"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "300px", background: "#E0F7FA", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid #E5E7EB" }}>
      <span style={{ color: "#0891B2", fontSize: "14px" }}>Chargement de la carte...</span>
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

function StatutBadge({statut}:{statut:string}){
  const map:Record<string,{bg:string;color:string}>={
    "En levée":{bg:"#E1F5EE",color:"#0F6E56"},
    "Dernières places":{bg:"#FCEBEB",color:"#A32D2D"},
    "Nouveau":{bg:"#E6F1FB",color:"#0C447C"},
    "Complet":{bg:"#F1EFE8",color:"#444441"},
  };
  const s=map[statut]||map["En levée"];
  return(<span style={{background:s.bg,color:s.color,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"20px",letterSpacing:".05em"}}>{statut}</span>);
}

function scrollToSelection(){setTimeout(()=>{document.getElementById("selection")?.scrollIntoView({behavior:"smooth"});},100);}

export default function ImmobilierPage(){
  const t=useTranslations("immo");
  const locale=useLocale();
  const [filtreType,setFiltreType]=useState<"tous"|"villa"|"hotel"|"commercial"|"meuble">("tous");
  const [filtreRegion,setFiltreRegion]=useState<"toutes"|"Guadeloupe"|"Martinique"|"Guyane"|"Saint-Martin">("toutes");
  const [hovered,setHovered]=useState<number|null>(null);
  const [regionActive,setRegionActive]=useState<string|null>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const {isMobile,isTablet}=useBreakpoint();

  useEffect(()=>{
    const handler=(e:CustomEvent)=>{
      const ile=e.detail;
      if(ile==="Guyane")setFiltreRegion("Guyane");
      else if(ile==="Martinique")setFiltreRegion("Martinique");
      else if(ile==="Guadeloupe")setFiltreRegion("Guadeloupe");
      else if(ile==="Saint-Martin")setFiltreRegion("Saint-Martin");
    };
    window.addEventListener("filtreRegion",handler as EventListener);
    return()=>window.removeEventListener("filtreRegion",handler as EventListener);
  },[]);

  const biensFiltres=BIENS.filter(b=>{
    const matchType=
      filtreType==="villa"?b.type.includes("Villa"):
      filtreType==="hotel"?(b.type.includes("Hotel")||b.type.includes("Hôtel")||b.type.includes("Boutique")):
      filtreType==="commercial"?(b.type.includes("Commercial")||b.type.includes("Bureau")):
      filtreType==="meuble"?b.type.includes("Meublé"):true;
    const matchRegion=filtreRegion==="toutes"?true:b.ile===filtreRegion;
    return matchType&&matchRegion;
  });

  function handleRegionFilter(region:string){setFiltreRegion(region as typeof filtreRegion);scrollToSelection();}
  function handleBailFilter(nomBail:string){
    if(nomBail==="Location Saisonnière")setFiltreType("villa");
    else if(nomBail==="Bail Commercial 3-6-9")setFiltreType("commercial");
    else if(nomBail==="Location Meublée")setFiltreType("meuble");
    else if(nomBail==="Hôtellerie")setFiltreType("hotel");
    else setFiltreType("tous");
    scrollToSelection();
  }

  const colsBiens=isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(3, 1fr)";

  const STATS_DATA=[
    {val:t("stats.val1"),label:t("stats.label1"),icon:t("stats.icon1")},
    {val:t("stats.val2"),label:t("stats.label2"),icon:t("stats.icon2")},
    {val:t("stats.val3"),label:t("stats.label3"),icon:t("stats.icon3")},
    {val:t("stats.val4"),label:t("stats.label4"),icon:t("stats.icon4")},
  ];

  const NAV_LINKS=[
    {label:t("nav_selection"),href:"#selection"},
    {label:t("nav_regions"),href:"#regions"},
    {label:t("nav_simulateur"),href:`/${locale}/simulateur`},
  ];

  return(
    <main style={{fontFamily:"system-ui, -apple-system, sans-serif",background:C.gris,minHeight:"100vh"}}>

      <nav style={{background:C.blanc,borderBottom:`0.5px solid ${C.grisBord}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:isMobile?"60px":"72px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoTurquoise size={isMobile?0.7:0.85}/>
          </Link>
          {!isMobile&&(
            <div style={{display:"flex",gap:isTablet?"16px":"24px",alignItems:"center"}}>
              {NAV_LINKS.map(l=>(
                <Link key={l.label} href={l.href} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>{l.label}</Link>
              ))}
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#0891B2" buttonColor="white" textColor="#4B5563" borderColor="#E5E7EB"/>
            </div>
          )}
          {isMobile&&(
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#0891B2" buttonColor="white" textColor="#4B5563" borderColor="#E5E7EB"/>
              <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",flexDirection:"column",gap:"5px"}}>
                {[0,1,2].map(i=><div key={i} style={{width:"22px",height:"2px",background:C.turquoise,borderRadius:"2px"}}/>)}
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

      <section style={{background:C.turqLight,borderBottom:"0.5px solid #BAE6FD",padding:isMobile?"40px 16px 32px":"72px 24px 56px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"32px",flexWrap:"wrap"}}>
            <div style={{maxWidth:"560px"}}>
              <div style={{display:"inline-flex",alignItems:"center",background:C.turqPale,border:"0.5px solid #67E8F9",borderRadius:"20px",padding:"4px 12px",marginBottom:"16px"}}>
                <span style={{color:C.turqDark,fontSize:"10px",fontWeight:600}}>{t("hero_badge")}</span>
              </div>
              <h1 style={{color:C.texte,fontSize:isMobile?"26px":"clamp(26px, 4vw, 46px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-1px",margin:"0 0 14px"}}>
                {t("hero_titre1")}<br/><span style={{color:C.turquoise}}>{t("hero_titre2")}</span>
              </h1>
              <p style={{color:C.texteSec,fontSize:isMobile?"14px":"15px",lineHeight:1.8,margin:"0 0 24px"}}>{t("hero_desc")}</p>
              <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                <Link href="#selection" style={{background:C.turquoise,color:"white",padding:"11px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:600,textDecoration:"none"}}>{t("hero_cta1")}</Link>
                <Link href={`/${locale}/simulateur`} style={{background:"white",color:C.turquoise,border:`1.5px solid ${C.turquoise}`,padding:"11px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:600,textDecoration:"none"}}>{t("hero_cta2")}</Link>
              </div>
            </div>
            {!isMobile&&(
              <div style={{background:"white",borderRadius:"16px",border:`0.5px solid ${C.grisBord}`,padding:"24px",minWidth:"240px"}}>
                <div style={{fontSize:"12px",color:C.texteTert,marginBottom:"16px",fontWeight:500}}>{t("perf_titre")}</div>
                {[
                  {label:t("perf_rendement"),val:"9,1%",color:C.turquoise},
                  {label:t("perf_occupation"),val:"84%",color:"#0F6E56"},
                  {label:t("perf_distributions"),val:"100%",color:C.turquoise},
                  {label:t("perf_biens"),val:"6",color:C.texte},
                ].map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<3?`0.5px solid ${C.grisBord}`:"none"}}>
                    <span style={{color:C.texteSec,fontSize:"12px"}}>{m.label}</span>
                    <span style={{color:m.color,fontSize:"15px",fontWeight:700}}>{m.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section style={{background:"white",borderBottom:`0.5px solid ${C.grisBord}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4, 1fr)"}}>
          {STATS_DATA.map((s,i)=>(
            <div key={i} style={{textAlign:"center",padding:isMobile?"14px 8px":"20px 16px",borderRight:isMobile?(i%2===0?`0.5px solid ${C.grisBord}`:"none"):(i<3?`0.5px solid ${C.grisBord}`:"none"),borderBottom:isMobile&&i<2?`0.5px solid ${C.grisBord}`:"none"}}>
              <div style={{fontSize:"18px",marginBottom:"4px"}}>{s.icon}</div>
              <div style={{color:C.turquoise,fontSize:isMobile?"16px":"20px",fontWeight:700}}>{s.val}</div>
              <div style={{color:C.texteTert,fontSize:"10px",marginTop:"3px"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:isMobile?"40px 16px":"64px 24px",background:"white",borderBottom:`0.5px solid ${C.grisBord}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"20px"}}>
            <div style={{color:C.turquoise,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("carte_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:800,margin:"0 0 6px"}}>{t("carte_titre")}</h2>
            {!isMobile&&<p style={{color:C.texteSec,fontSize:"13px",margin:0}}>{t("carte_desc")}</p>}
          </div>
          <CarteLeaflet biens={BIENS} onBienClick={()=>{scrollToSelection();}}/>
          <div style={{display:"flex",gap:"16px",marginTop:"10px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:C.texteSec}}>
              <div style={{width:"10px",height:"10px",borderRadius:"50%",background:C.turquoise}}/>{t("legende_dispo")}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:C.texteSec}}>
              <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#9CA3AF"}}/>{t("legende_complet")}
            </div>
          </div>
        </div>
      </section>

      <section id="regions" style={{padding:isMobile?"40px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"28px"}}>
            <div style={{color:C.turquoise,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("regions_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:800,margin:0}}>{t("regions_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:"14px"}}>
            {REGIONS.map((r,i)=>(
              <div key={i} onClick={()=>setRegionActive(regionActive===r.nom?null:r.nom)}
                style={{background:"white",borderRadius:"12px",overflow:"hidden",border:regionActive===r.nom?`2px solid ${r.couleur}`:`0.5px solid ${C.grisBord}`,cursor:"pointer",transition:"all .2s"}}>
                <div style={{background:r.couleur,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",overflow:"hidden",minHeight:"70px"}}>
                  <div style={{position:"absolute",left:0,top:0,bottom:0,width:"35%",overflow:"hidden"}}>
                    <div style={{position:"relative",width:"100%",height:"100%"}}>
                      <Image src={r.nom==="Guadeloupe"?"/images/carte-guadeloupe.jpg":r.nom==="Martinique"?"/images/carte-martinique.jpg":r.nom==="Guyane"?"/images/carte-guyane.jpg":"/images/carte-saintmartin.jpg"} alt={r.nom} fill sizes="200px" style={{objectFit:"cover",opacity:.35}}/>
                    </div>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, transparent 0%, "+r.couleur+" 70%)"}}/>
                  </div>
                  <div style={{position:"relative",zIndex:1}}>
                    <div style={{fontSize:"24px",marginBottom:"2px"}}>{r.drapeau}</div>
                    <div style={{color:"white",fontSize:"16px",fontWeight:700}}>{r.nom}</div>
                    <div style={{color:"rgba(255,255,255,.7)",fontSize:"10px",marginTop:"2px"}}>{r.pays}</div>
                  </div>
                  <div style={{textAlign:"right",position:"relative",zIndex:1}}>
                    <div style={{color:"rgba(255,255,255,.9)",fontSize:"10px",marginBottom:"2px"}}>{t("rendement_moyen")}</div>
                    <div style={{color:"white",fontSize:"18px",fontWeight:800}}>{r.rendementMoyen}</div>
                  </div>
                </div>
                <div style={{padding:"12px 20px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px",borderBottom:"0.5px solid #E5E7EB"}}>
                  {[{label:t("population"),val:r.population},{label:t("prix_m2"),val:r.prixM2Moyen},{label:t("touristes"),val:r.touristes}].map((m,j)=>(
                    <div key={j}>
                      <div style={{color:C.texteTert,fontSize:"9px",textTransform:"uppercase"}}>{m.label}</div>
                      <div style={{color:C.texte,fontSize:"12px",fontWeight:600,marginTop:"2px"}}>{m.val}</div>
                    </div>
                  ))}
                </div>
                {regionActive===r.nom?(
                  <div style={{padding:"14px 20px"}}>
                    <p style={{color:C.texteSec,fontSize:"13px",lineHeight:1.7,margin:"0 0 12px"}}>{r.histoire}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
                      {r.atouts.map((a,k)=>(
                        <span key={k} style={{background:C.turqLight,color:C.turqDark,fontSize:"10px",padding:"3px 10px",borderRadius:"20px",fontWeight:500}}>{a}</span>
                      ))}
                    </div>
                    <button onClick={(e)=>{e.stopPropagation();handleRegionFilter(r.nom);}} style={{background:r.couleur,color:"white",border:"none",padding:"10px 18px",borderRadius:"8px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>
                      {t("voir_biens")} {r.nom} →
                    </button>
                  </div>
                ):(
                  <div style={{padding:"10px 20px",color:C.turquoise,fontSize:"11px",fontWeight:600}}>{t("voir_contexte")}</div>
                )}
              </div>
            ))}
          </div>
          <div style={{marginTop:"14px",padding:"14px 20px",background:"white",borderRadius:"12px",border:`0.5px solid ${C.grisBord}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px"}}>
            <div>
              <div style={{color:C.texte,fontSize:"13px",fontWeight:600,marginBottom:"2px"}}>{t("expansion_titre")}</div>
              <div style={{color:C.texteSec,fontSize:"12px"}}>{t("expansion_desc")}</div>
            </div>
            <span style={{background:"#E6F1FB",color:"#0C447C",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"20px",whiteSpace:"nowrap"}}>{t("bientot")}</span>
          </div>
        </div>
      </section>

      <section style={{background:C.navy,padding:isMobile?"40px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{color:C.turquoise,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px"}}>{t("processus_label")}</div>
            <h2 style={{color:"white",fontSize:isMobile?"20px":"26px",fontWeight:800,margin:0}}>{t("processus_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3, 1fr)",gap:"14px"}}>
            {PROCESSUS_ONBOARDING.map((p,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.05)",borderRadius:"10px",padding:isMobile?"18px":"24px",border:"0.5px solid rgba(255,255,255,.08)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                  <div style={{fontSize:"22px"}}>{p.icone}</div>
                  <div style={{color:C.turquoise,fontSize:"20px",fontWeight:800,opacity:.5}}>{p.num}</div>
                </div>
                <div style={{color:"white",fontSize:"13px",fontWeight:700,marginBottom:"6px"}}>{p.titre}</div>
                <div style={{color:"rgba(255,255,255,.6)",fontSize:"12px",lineHeight:1.7,marginBottom:"10px"}}>{p.desc}</div>
                <div style={{display:"inline-flex",background:`${C.turquoise}20`,color:C.turquoise,fontSize:"10px",fontWeight:600,padding:"3px 10px",borderRadius:"20px"}}>{p.duree}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:isMobile?"40px 16px":"64px 24px",background:"white",borderBottom:`0.5px solid ${C.grisBord}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"28px"}}>
            <div style={{color:C.turquoise,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("bail_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:800,margin:"0 0 6px"}}>{t("bail_titre")}</h2>
            {!isMobile&&<p style={{color:C.texteSec,fontSize:"13px",margin:0}}>{t("bail_desc")}</p>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4, 1fr)",gap:"12px"}}>
            {TYPES_BAIL.map((tb,i)=>(
              <div key={i} onClick={()=>handleBailFilter(tb.nom)}
                style={{background:C.gris,borderRadius:"10px",padding:isMobile?"14px":"20px",borderTop:`3px solid ${tb.couleur}`,borderRight:`0.5px solid ${C.grisBord}`,borderBottom:`0.5px solid ${C.grisBord}`,borderLeft:`0.5px solid ${C.grisBord}`,cursor:"pointer",transition:"all .2s"}}>
                <div style={{fontSize:"22px",marginBottom:"8px"}}>{tb.icone}</div>
                <div style={{color:C.texte,fontSize:"12px",fontWeight:700,marginBottom:"4px"}}>{tb.nom}</div>
                <div style={{color:tb.couleur,fontSize:isMobile?"16px":"18px",fontWeight:800,marginBottom:"4px"}}>{tb.rendement}</div>
                {!isMobile&&<div style={{color:C.texteTert,fontSize:"10px",marginBottom:"8px"}}>{t("risque")} {tb.risque}</div>}
                {!isMobile&&<div style={{color:C.texteSec,fontSize:"11px",lineHeight:1.6,marginBottom:"10px"}}>{tb.description}</div>}
                <div style={{color:tb.couleur,fontSize:"11px",fontWeight:600}}>{t("voir_biens_btn")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:isMobile?"40px 16px":"64px 24px",background:C.gris}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"28px"}}>
            <div style={{color:C.turquoise,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("fiscalite_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:800,margin:"0 0 6px"}}>{t("fiscalite_titre")}</h2>
            {!isMobile&&<p style={{color:C.texteSec,fontSize:"13px",margin:0}}>{t("fiscalite_desc")}</p>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:"14px"}}>
            {FISCALITE.map((f,i)=>(
              <div key={i} style={{background:"white",borderRadius:"10px",padding:isMobile?"16px":"24px",borderTop:`0.5px solid ${C.grisBord}`,borderRight:`0.5px solid ${C.grisBord}`,borderBottom:`0.5px solid ${C.grisBord}`,borderLeft:`4px solid ${f.couleur}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                  <div>
                    <div style={{fontSize:"16px",marginBottom:"4px"}}>{f.flag}</div>
                    <div style={{color:C.texte,fontSize:"14px",fontWeight:700}}>{f.nom}</div>
                  </div>
                  <div style={{background:`${f.couleur}15`,color:f.couleur,fontSize:"12px",fontWeight:700,padding:"4px 12px",borderRadius:"20px",whiteSpace:"nowrap"}}>{f.reduction}</div>
                </div>
                <p style={{color:C.texteSec,fontSize:"12px",lineHeight:1.7,margin:"0 0 10px"}}>{f.description}</p>
                <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
                  {f.conditions.map((cond,j)=>(
                    <div key={j} style={{display:"flex",gap:"6px",fontSize:"11px",color:C.texteSec}}>
                      <span style={{color:f.couleur,flexShrink:0}}>›</span><span>{cond}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="selection" style={{padding:isMobile?"40px 16px":"64px 24px",background:"white"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <div style={{color:C.turquoise,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("selection_label")}</div>
              <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:800,margin:0}}>
                {filtreType==="tous"&&filtreRegion==="toutes"?t("selection_titre_tous"):`${t("selection_titre_region")} ${filtreRegion!=="toutes"?filtreRegion:""}`}
              </h2>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"18px"}}>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center"}}>
              <span style={{color:C.texteTert,fontSize:"11px",fontWeight:600,minWidth:"50px"}}>{t("filtre_type")}</span>
              {([{key:"tous",label:t("filtre_tous")},{key:"villa",label:t("filtre_villas")},{key:"hotel",label:t("filtre_hotels")},{key:"commercial",label:t("filtre_commercial")},{key:"meuble",label:t("filtre_meuble")}] as {key:typeof filtreType;label:string}[]).map(f=>(
                <button key={f.key} onClick={()=>setFiltreType(f.key)} style={{padding:"5px 12px",borderRadius:"20px",cursor:"pointer",fontSize:"11px",fontWeight:600,border:filtreType===f.key?`1.5px solid ${C.turquoise}`:`0.5px solid ${C.grisBord}`,background:filtreType===f.key?C.turqLight:"white",color:filtreType===f.key?C.turqDark:C.texteSec,transition:"all .15s"}}>{f.label}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center"}}>
              <span style={{color:C.texteTert,fontSize:"11px",fontWeight:600,minWidth:"50px"}}>{t("filtre_region")}</span>
              {([{key:"toutes",label:t("filtre_toutes")},{key:"Guadeloupe",label:"Guadeloupe"},{key:"Martinique",label:"Martinique"},{key:"Guyane",label:"Guyane"},{key:"Saint-Martin",label:"St-Martin"}] as {key:typeof filtreRegion;label:string}[]).map(f=>(
                <button key={f.key} onClick={()=>setFiltreRegion(f.key)} style={{padding:"5px 12px",borderRadius:"20px",cursor:"pointer",fontSize:"11px",fontWeight:600,border:filtreRegion===f.key?`1.5px solid ${C.turquoise}`:`0.5px solid ${C.grisBord}`,background:filtreRegion===f.key?C.turqLight:"white",color:filtreRegion===f.key?C.turqDark:C.texteSec,transition:"all .15s"}}>{f.label}</button>
              ))}
            </div>
            {(filtreType!=="tous"||filtreRegion!=="toutes")&&(
              <button onClick={()=>{setFiltreType("tous");setFiltreRegion("toutes");}} style={{alignSelf:"flex-start",padding:"4px 12px",borderRadius:"20px",cursor:"pointer",fontSize:"10px",background:"#FCEBEB",color:"#A32D2D",border:"none",fontWeight:600}}>
                {t("reinitialiser")}
              </button>
            )}
          </div>
          <div style={{color:C.texteSec,fontSize:"12px",marginBottom:"16px"}}>
            {biensFiltres.length} {biensFiltres.length>1?t("biens_disponibles_pl"):t("biens_disponibles")}
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsBiens,gap:"14px"}}>
            {biensFiltres.map(bien=>{
              const pct=Math.round(((bien.tokensTotal-bien.tokensDispo)/bien.tokensTotal)*100);
              const complet=bien.tokensDispo===0;
              return(
                <Link key={bien.id} href={`/${locale}/immobilier/${getBienSlug(bien)}`} style={{textDecoration:"none",display:"block"}}
                  onMouseEnter={()=>setHovered(bien.id)} onMouseLeave={()=>setHovered(null)}>
                  <div style={{background:"white",borderRadius:"12px",overflow:"hidden",border:hovered===bien.id?`1.5px solid ${C.turquoise}`:`0.5px solid ${C.grisBord}`,transition:"all .2s",opacity:complet?.65:1,transform:hovered===bien.id&&!complet?"translateY(-3px)":"none",boxShadow:hovered===bien.id&&!complet?"0 8px 24px rgba(8,145,178,.1)":"none"}}>
                    <div style={{position:"relative",height:"160px",overflow:"hidden"}}>
                      <Image src={bien.photo} alt={bien.nom} fill sizes="(max-width: 768px) 100vw, 33vw" style={{objectFit:"cover"}}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)"}}/>
                      <div style={{position:"absolute",top:"10px",left:"10px"}}>
                        <span style={{background:bien.tagColor,color:"white",fontSize:"8px",fontWeight:700,padding:"2px 8px",borderRadius:"20px"}}>{bien.tag}</span>
                      </div>
                      <div style={{position:"absolute",top:"10px",right:"10px"}}>
                        <StatutBadge statut={bien.statut}/>
                      </div>
                      <div style={{position:"absolute",bottom:"10px",left:"12px"}}>
                        <div style={{color:"rgba(255,255,255,.8)",fontSize:"9px",textTransform:"uppercase"}}>{bien.type}</div>
                        <div style={{color:"white",fontSize:"14px",fontWeight:700}}>{bien.nom}</div>
                      </div>
                    </div>
                    <div style={{padding:"12px 14px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"8px"}}>
                        <span style={{fontSize:"11px"}}>📍</span>
                        <span style={{color:C.texteSec,fontSize:"11px"}}>{bien.ile} · {bien.region}</span>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"6px",marginBottom:"8px"}}>
                        {[{label:t("rdt_brut"),val:bien.rendementBrut},{label:t("occupation"),val:bien.occupation},{label:t("token"),val:`${bien.prixToken}€`}].map(m=>(
                          <div key={m.label} style={{background:C.gris,borderRadius:"6px",padding:"6px",textAlign:"center"}}>
                            <div style={{color:C.texte,fontSize:"12px",fontWeight:700}}>{m.val}</div>
                            <div style={{color:C.texteTert,fontSize:"9px",marginTop:"1px"}}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{background:C.turqLight,borderRadius:"6px",padding:"6px 10px",marginBottom:"8px",display:"flex",justifyContent:"space-between"}}>
                        <span style={{color:C.turqDark,fontSize:"11px"}}>{t("revenu_estime")}</span>
                        <span style={{color:C.turqDark,fontSize:"12px",fontWeight:700}}>{bien.revenuEstime}</span>
                      </div>
                      <div style={{marginBottom:"10px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                          <span style={{color:C.texteTert,fontSize:"10px"}}>{t("levee")}</span>
                          <span style={{color:C.turquoise,fontSize:"10px",fontWeight:700}}>{pct}%</span>
                        </div>
                        <div style={{background:C.grisBord,borderRadius:"4px",height:"4px"}}>
                          <div style={{background:pct>=95?"#E24B4A":C.turquoise,height:"100%",borderRadius:"4px",width:`${pct}%`}}/>
                        </div>
                      </div>
                      <div style={{background:C.turquoise,color:"white",padding:"10px",borderRadius:"8px",fontSize:"12px",textAlign:"center",fontWeight:600}}>
                        {complet?t("liste_attente"):t("voir_bien")}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {biensFiltres.length===0&&(
            <div style={{textAlign:"center",padding:"40px",color:C.texteSec,fontSize:"14px"}}>
              {t("aucun_bien")}<br/>
              <button onClick={()=>{setFiltreType("tous");setFiltreRegion("toutes");}} style={{marginTop:"12px",background:C.turquoise,color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>
                {t("voir_tous")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section style={{background:C.turquoise,padding:isMobile?"48px 16px":"72px 24px",textAlign:"center"}}>
        <div style={{maxWidth:"580px",margin:"0 auto"}}>
          <div style={{width:"56px",height:"56px",background:"rgba(255,255,255,.15)",borderRadius:"14px",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:"24px"}}>🏠</span>
          </div>
          <h2 style={{color:"white",fontSize:isMobile?"22px":"28px",fontWeight:800,lineHeight:1.2,margin:"0 0 12px"}}>{t("rejoindre_titre")}</h2>
          <p style={{color:"rgba(255,255,255,.85)",fontSize:"14px",lineHeight:1.8,margin:"0 0 24px"}}>{t("rejoindre_desc")}</p>
          <Link href={`/${locale}/kyc`} style={{display:"inline-block",background:"white",color:C.turqDark,padding:"14px 32px",borderRadius:"8px",fontSize:"13px",fontWeight:700,textDecoration:"none"}}>
            {t("rejoindre_btn")}
          </Link>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:"11px",marginTop:"12px"}}>{t("rejoindre_note")}</p>
        </div>
      </section>

      <Footer/>
    </main>
  );
}