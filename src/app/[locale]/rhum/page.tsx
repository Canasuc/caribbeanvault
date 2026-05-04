"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type TFn = ReturnType<typeof useTranslations>;


const C = {
  noir:"#0D2018",foret:"#0F3D2A",emeraude:"#0F5240",vert:"#1A6B5A",
  or:"#C8992A",orClair:"#D4B96A",orPale:"#F0E6C8",creme:"#F7F5F0",
  texte:"#2C1810",gris:"#6B7280",menthe:"#9FE1CB",
};

const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(newLocale:string){const s=pathname.split("/");s[1]=newLocale;router.push(s.join("/"));}
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

const TERRITOIRES=[
  {id:"guadeloupe",nom:"Guadeloupe",pays:"France (DOM)",drapeau:"🇬🇵",couleur:"#0F5240",carteImg:"/images/carte-guadeloupe.jpg",surfaceCanne:"12 000 ha",productionHAP:"~70 000 HAP/an",nbDistilleries:6,rendementMoyen:"9-14%/an",aocDepuis:"1996",exportPrincipal:"France métropolitaine, Europe",subventions:"FEADER + POSEI UE",certification:"AOC Rhum Agricole Guadeloupe",histoire:"L'archipel guadeloupéen produit un rhum agricole AOC d'exception depuis 1996. La diversité de ses terroirs — sol volcanique de Basse-Terre, calcaire de Marie-Galante, terres plates de Grande-Terre — offre une palette aromatique unique au monde. Ses 6 distilleries partenaires, toutes familiales depuis 3 à 5 générations, maintiennent un savoir-faire artisanal incomparable.",atouts:["AOC Guadeloupe unique","Marie-Galante 59°+","Terroir volcanique","Distilleries familiales"],distilleries:["Damoiseau","Père Labat","Bologne","Bielle","Longueteau","Reimonenq"],particularites:"Marie-Galante produit des rhums à 59°+ sur terroir calcaire unique. Basse-Terre bénéficie des sols volcaniques de la Soufrière."},
  {id:"martinique",nom:"Martinique",pays:"France (DOM)",drapeau:"🇲🇶",couleur:"#1A2E4A",carteImg:"/images/carte-martinique.jpg",surfaceCanne:"4 500 ha",productionHAP:"~90 000 HAP/an",nbDistilleries:7,rendementMoyen:"10-18%/an",aocDepuis:"1996",exportPrincipal:"France, USA, Japon, UK",subventions:"FEADER + POSEI UE",certification:"AOC Rhum Agricole Martinique",histoire:"La Martinique est la référence mondiale du rhum agricole. Son AOC, la plus stricte de la Caraïbe, garantit une qualité supérieure à chaque millésime. Avec des distilleries fondées en 1660, 1749 et 1765, la Martinique produit des rhums vieux qui s'échangent jusqu'à 5 000€ la bouteille.",atouts:["AOC la plus stricte","Millésimes premium","Distilleries historiques 1660+","Marché mondial premium"],distilleries:["Clément","Trois Rivières","HSE","Saint James","La Mauny","Depaz","J.M."],particularites:"La Martinique est la référence mondiale. Ses millésimes s'échangent jusqu'à 5 000€ la bouteille. Finitions Sauternes, Cognac, Banyuls exclusives."},
];

const FUTS=[
  {id:1,distillerie:"Damoiseau",ile:"Guadeloupe",annee:2019,type:"Rhum Agricole AOC Blanc",baril:"Fût de chêne américain 180L",tokens:100,disponibles:34,prixToken:48,rendementEst:"9-12%/an",maturite:"2029",statut:"en_levee",millesime:false},
  {id:2,distillerie:"Père Labat",ile:"Guadeloupe",annee:2017,type:"Rhum Vieux AOC 6 ans",baril:"Fût de chêne français 220L",tokens:80,disponibles:12,prixToken:125,rendementEst:"11-15%/an",maturite:"2027",statut:"presque_complet",millesime:true},
  {id:3,distillerie:"Clément",ile:"Martinique",annee:2020,type:"Rhum Agricole AOC Ambré",baril:"Fût de bourbon américain 200L",tokens:120,disponibles:89,prixToken:35,rendementEst:"8-11%/an",maturite:"2030",statut:"en_levee",millesime:false},
  {id:4,distillerie:"HSE",ile:"Martinique",annee:2016,type:"Rhum Vieux AOC 8 ans",baril:"Fût de Sauternes 180L",tokens:60,disponibles:3,prixToken:280,rendementEst:"13-18%/an",maturite:"2026",statut:"dernieres_places",millesime:true},
  {id:5,distillerie:"Bologne",ile:"Guadeloupe",annee:2021,type:"Rhum Agricole AOC Blanc",baril:"Fût de chêne américain 160L",tokens:80,disponibles:80,prixToken:28,rendementEst:"8-10%/an",maturite:"2031",statut:"nouveau",millesime:false},
  {id:6,distillerie:"J.M.",ile:"Martinique",annee:2015,type:"Rhum Vieux AOC 10 ans",baril:"Fût de cognac Limousin 200L",tokens:50,disponibles:0,prixToken:420,rendementEst:"14-20%/an",maturite:"2025",statut:"complet",millesime:true},
];

const DISTILLERIES_GUADELOUPE=[
  {nom:"Damoiseau",annee:"1942",slug:"damoiseau",logo:"/images/logo-damoiseau.jpg",dispo:true},
  {nom:"Père Labat",annee:"1895",slug:"pere-labat",logo:"/images/logo-pere-labat.jpg",dispo:true},
  {nom:"Bologne",annee:"1887",slug:"bologne",logo:"/images/logo-bologne.jpg",dispo:true},
  {nom:"Bielle",annee:"1975",slug:"bielle",logo:"/images/logo-bielle.jpg",dispo:false},
  {nom:"Longueteau",annee:"1895",slug:"longueteau",logo:"/images/logo-longueteau.jpg",dispo:true},
  {nom:"Reimonenq",annee:"1916",slug:"reimonenq",logo:"/images/logo-reimonenq.jpg",dispo:false},
];

const DISTILLERIES_MARTINIQUE=[
  {nom:"Clément",annee:"1887",slug:"clement",logo:"/images/logo-clement.jpg",dispo:true},
  {nom:"Trois Rivières",annee:"1660",slug:"trois-rivieres",logo:"/images/logo-trois-rivieres.jpg",dispo:true},
  {nom:"HSE",annee:"1883",slug:"hse",logo:"/images/logo-hse.jpg",dispo:true},
  {nom:"Saint James",annee:"1765",slug:"saint-james",logo:"/images/logo-saint-james.jpg",dispo:false},
  {nom:"La Mauny",annee:"1749",slug:"la-mauny",logo:"/images/logo-la-mauny.jpg",dispo:false},
  {nom:"Depaz",annee:"1917",slug:"depaz",logo:"/images/logo-depaz.jpg",dispo:true},
  {nom:"J.M.",annee:"1845",slug:"jm",logo:"/images/logo-jm.jpg",dispo:true},
];

function DistillerieCard({d,ile}:{d:typeof DISTILLERIES_GUADELOUPE[0];ile:string}){
  return(
    <Link href={`/distilleries/${d.slug}`} style={{textDecoration:"none"}}>
      <div style={{background:C.foret,padding:"16px 8px",textAlign:"center",cursor:"pointer",borderBottom:"2px solid transparent",position:"relative",transition:"all .2s"}}
        onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.background=C.vert;(e.currentTarget as HTMLDivElement).style.borderBottom=`2px solid ${C.or}`;}}
        onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.background=C.foret;(e.currentTarget as HTMLDivElement).style.borderBottom="2px solid transparent";}}>
        {d.dispo&&<div style={{position:"absolute",top:"6px",right:"6px",width:"6px",height:"6px",borderRadius:"50%",background:C.or}}/>}
        <div style={{position:"relative",width:"60px",height:"40px",margin:"0 auto 6px"}}>
          <Image src={d.logo} alt={d.nom} fill sizes="80px" style={{objectFit:"contain",opacity:.9}}/>
        </div>
        <div style={{color:C.or,fontSize:"8px",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"2px",opacity:.7}}>{d.annee}</div>
        <div style={{color:C.menthe,fontSize:"8px",opacity:.5}}>{ile}</div>
      </div>
    </Link>
  );
}

function TerritoireCard({territoire,isOpen,onToggle,onFilter,isMobile,t}:{territoire:typeof TERRITOIRES[0];isOpen:boolean;onToggle:()=>void;onFilter:()=>void;isMobile:boolean;t:TFn}){
  const futsT=FUTS.filter(f=>f.ile===territoire.nom);
  const futsDispos=futsT.filter(f=>f.disponibles>0).length;
  return(
    <div style={{background:C.noir,borderRadius:"12px",overflow:"hidden",border:isOpen?`2px solid ${C.or}`:`0.5px solid ${C.or}30`,cursor:"pointer",transition:"all .2s"}}>
      <div onClick={onToggle} style={{background:territoire.couleur,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",overflow:"hidden",minHeight:"80px"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:"40%",overflow:"hidden"}}>
          <div style={{position:"relative",width:"100%",height:"100%"}}>
            <Image src={territoire.carteImg} alt={territoire.nom} fill sizes="200px" style={{objectFit:"cover",opacity:.35}}/>
          </div>
          <div style={{position:"absolute",inset:0,background:`linear-gradient(to right, transparent 0%, ${territoire.couleur} 70%)`}}/>
        </div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
            <span style={{fontSize:"22px"}}>{territoire.drapeau}</span>
            <div style={{color:"white",fontSize:isMobile?"16px":"18px",fontWeight:700}}>{territoire.nom}</div>
          </div>
          <div style={{color:"rgba(255,255,255,.65)",fontSize:"10px",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"system-ui"}}>{territoire.pays} · {territoire.certification}</div>
        </div>
        <div style={{textAlign:"right",position:"relative",zIndex:1}}>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:"10px",marginBottom:"2px",fontFamily:"system-ui"}}>{t("rendement_moyen")}</div>
          <div style={{color:C.or,fontSize:"18px",fontWeight:800}}>{territoire.rendementMoyen}</div>
        </div>
      </div>
      <div style={{padding:"10px 20px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px",borderBottom:`0.5px solid ${C.or}15`}}>
        {[{label:t("surface_canne"),val:territoire.surfaceCanne},{label:t("production"),val:territoire.productionHAP},{label:t("futs_dispos_court"),val:`${futsDispos}/${futsT.length}`}].map((m,j)=>(
          <div key={j}>
            <div style={{color:`${C.menthe}60`,fontSize:"9px",textTransform:"uppercase",fontFamily:"system-ui"}}>{m.label}</div>
            <div style={{color:C.orClair,fontSize:"11px",fontWeight:600,marginTop:"2px",fontFamily:"system-ui"}}>{m.val}</div>
          </div>
        ))}
      </div>
      {isOpen&&(
        <div style={{padding:"16px 20px"}}>
          <p style={{color:`${C.menthe}90`,fontSize:"13px",lineHeight:1.7,margin:"0 0 14px",fontFamily:"system-ui"}}>{territoire.histoire}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
            {territoire.atouts.map((a,k)=>(
              <span key={k} style={{background:`${C.or}20`,color:C.or,fontSize:"10px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,fontFamily:"system-ui"}}>{a}</span>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",marginBottom:"14px"}}>
            {[{label:"Distilleries partenaires",val:`${territoire.nbDistilleries}`},{label:"AOC depuis",val:territoire.aocDepuis},{label:"Export principal",val:territoire.exportPrincipal},{label:"Subventions",val:territoire.subventions}].map((s,i)=>(
              <div key={i} style={{background:`rgba(255,255,255,.04)`,borderRadius:"6px",padding:"8px 10px"}}>
                <div style={{color:`${C.menthe}60`,fontSize:"9px",textTransform:"uppercase",letterSpacing:".08em",marginBottom:"2px",fontFamily:"system-ui"}}>{s.label}</div>
                <div style={{color:C.orClair,fontSize:"11px",fontWeight:600,fontFamily:"system-ui"}}>{s.val}</div>
              </div>
            ))}
          </div>
          <div style={{background:`${C.or}10`,borderRadius:"6px",padding:"10px 14px",marginBottom:"14px",border:`0.5px solid ${C.or}25`}}>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:"4px",fontFamily:"system-ui"}}>{t("a_savoir")}</div>
            <div style={{color:C.menthe,fontSize:"12px",fontFamily:"system-ui",lineHeight:1.6}}>{territoire.particularites}</div>
          </div>
          <div style={{marginBottom:"14px"}}>
            <div style={{color:`${C.menthe}60`,fontSize:"9px",textTransform:"uppercase",letterSpacing:".08em",marginBottom:"8px",fontFamily:"system-ui"}}>{t("distilleries_label")}</div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
              {territoire.distilleries.map((d,i)=>(
                <span key={i} style={{background:`rgba(255,255,255,.06)`,color:C.menthe,fontSize:"10px",padding:"3px 10px",borderRadius:"2px",fontFamily:"system-ui",border:`0.5px solid ${C.or}20`}}>{d}</span>
              ))}
            </div>
          </div>
          <button onClick={(e)=>{e.stopPropagation();onFilter();}}
            style={{background:C.or,color:C.noir,border:"none",padding:"10px 18px",borderRadius:"4px",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
            {t("voir_futs")} {territoire.nom} →
          </button>
        </div>
      )}
      {!isOpen&&(
        <div onClick={onToggle} style={{padding:"10px 20px",color:C.or,fontSize:"11px",fontWeight:600,fontFamily:"system-ui"}}>
          {t("voir_contexte")}
        </div>
      )}
    </div>
  );
}

export default function RhumPage(){
  const t=useTranslations("rhum");
  const locale=useLocale();
  const [filtre,setFiltre]=useState<"tous"|"guadeloupe"|"martinique"|"millesime">("tous");
  const [territoireOuvert,setTerritoireOuvert]=useState<string|null>(null);
  const [hovered,setHovered]=useState<number|null>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const {isMobile,isTablet}=useBreakpoint();

  function toggleTerritoire(id:string){setTerritoireOuvert(territoireOuvert===id?null:id);}
  function handleFilter(id:string){setFiltre(id as typeof filtre);setTimeout(()=>{document.getElementById("selection")?.scrollIntoView({behavior:"smooth"});},100);}
  function handleFiltre(f:typeof filtre){setFiltre(f);}

  const STATUTS_STYLES:Record<string,{bg:string;color:string}>={
    "en_levee":{bg:"#E1F5EE",color:"#0F6E56"},
    "presque_complet":{bg:"#FAEEDA",color:"#854F0B"},
    "dernieres_places":{bg:"#FCEBEB",color:"#A32D2D"},
    "nouveau":{bg:"#E6F1FB",color:"#0C447C"},
    "complet":{bg:"#F1EFE8",color:"#444441"},
  };

  function StatutBadge({statut}:{statut:string}){
    const s=STATUTS_STYLES[statut]||STATUTS_STYLES["en_levee"];
    return(<span style={{background:s.bg,color:s.color,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"2px",letterSpacing:".08em",textTransform:"uppercase"}}>{t(`statuts.${statut}`)}</span>);
  }

  const futsFiltres=FUTS.filter(f=>{
    if(filtre==="guadeloupe")return f.ile==="Guadeloupe";
    if(filtre==="martinique")return f.ile==="Martinique";
    if(filtre==="millesime")return f.millesime;
    return true;
  });

  const colsFuts=isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(3, 1fr)";
  const colsGP=isMobile?"repeat(3, 1fr)":"repeat(6, 1fr)";
  const colsMQ=isMobile?"repeat(4, 1fr)":"repeat(7, 1fr)";

  const STATS_DATA=[
    {val:t("stats.val1"),label:t("stats.label1"),sub:t("stats.sub1")},
    {val:t("stats.val2"),label:t("stats.label2"),sub:t("stats.sub2")},
    {val:t("stats.val3"),label:t("stats.label3"),sub:t("stats.sub3")},
    {val:t("stats.val4"),label:t("stats.label4"),sub:t("stats.sub4")},
  ];

  const ETAPES_DATA=[
    {num:"01",titre:t("etape1_titre"),desc:t("etape1_desc")},
    {num:"02",titre:t("etape2_titre"),desc:t("etape2_desc")},
    {num:"03",titre:t("etape3_titre"),desc:t("etape3_desc")},
    {num:"04",titre:t("etape4_titre"),desc:t("etape4_desc")},
  ];

  const NAV_LINKS=[
    {label:t("nav_territoires"),href:"#territoires"},
    {label:t("nav_selection"),href:"#selection"},
    {label:t("nav_processus"),href:"#processus"},
    {label:t("nav_distilleries"),href:`/${locale}/distilleries`},
  ];

  return(
    <main style={{fontFamily:"system-ui, -apple-system, sans-serif",background:C.creme,minHeight:"100vh"}}>

      <nav style={{background:C.noir,borderBottom:`0.5px solid ${C.foret}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoEmeraude size={isMobile?0.6:0.7}/>
          </Link>
          {!isMobile&&(
            <div style={{display:"flex",gap:isTablet?"16px":"24px",alignItems:"center"}}>
              {NAV_LINKS.map(l=>(
                <a key={l.label} href={l.href} style={{color:C.menthe,fontSize:"11px",cursor:"pointer",opacity:.8,textDecoration:"none"}}>{l.label}</a>
              ))}
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)"/>
            </div>
          )}
          {isMobile&&(
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#C8992A" buttonColor="#0D2018" textColor="#9FE1CB" borderColor="rgba(200,153,42,.3)"/>
              <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",flexDirection:"column",gap:"5px"}}>
                {[0,1,2].map(i=><div key={i} style={{width:"22px",height:"2px",background:C.or,borderRadius:"2px"}}/>)}
              </button>
            </div>
          )}
        </div>
        {isMobile&&menuOpen&&(
          <div style={{background:C.foret,borderTop:`0.5px solid ${C.vert}30`,padding:"8px 16px"}}>
            {NAV_LINKS.map(l=>(
              <a key={l.label} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:"block",color:C.menthe,fontSize:"14px",textDecoration:"none",padding:"12px 0",borderBottom:`0.5px solid ${C.vert}30`}}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <section style={{background:C.noir,padding:"0",position:"relative",overflow:"hidden"}}>
        <Image src="/images/futs.jpg" alt="Chai de vieillissement rhum" fill style={{objectFit:"cover",opacity:0.15}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 70% 50%, ${C.or}18 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, ${C.vert}22 0%, transparent 50%)`}}/>
        {!isMobile&&[...Array(8)].map((_,i)=>(
          <div key={i} style={{position:"absolute",width:`${80+i*20}px`,height:`${80+i*20}px`,border:`1px solid ${C.or}${i%2===0?"18":"0C"}`,borderRadius:"50%",top:`${-20+i*15}%`,right:`${-5+i*3}%`,pointerEvents:"none"}}/>
        ))}
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:isMobile?"48px 16px 40px":"80px 24px 64px",position:"relative"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"16px",flexWrap:"wrap"}}>
            <span style={{background:C.or,color:C.noir,fontSize:"9px",fontWeight:700,padding:"3px 12px",borderRadius:"1px",letterSpacing:".2em",textTransform:"uppercase"}}>{t("hero_badge_aoc")}</span>
            <span style={{border:`0.5px solid ${C.vert}`,color:C.menthe,fontSize:"9px",padding:"3px 12px",borderRadius:"1px",letterSpacing:".15em",textTransform:"uppercase"}}>{t("hero_badge_geo")}</span>
          </div>
          <h1 style={{color:C.orPale,fontSize:isMobile?"30px":"clamp(28px, 5vw, 56px)",fontWeight:300,lineHeight:1.15,letterSpacing:"-1px",margin:"0 0 6px",fontFamily:"Georgia, 'Times New Roman', serif",maxWidth:"700px"}}>
            {t("hero_titre1")}
          </h1>
          <h1 style={{color:C.or,fontSize:isMobile?"30px":"clamp(28px, 5vw, 56px)",fontWeight:700,lineHeight:1.15,letterSpacing:"-1px",margin:"0 0 20px",fontFamily:"Georgia, 'Times New Roman', serif",maxWidth:"700px",fontStyle:"italic"}}>
            {t("hero_titre2")}
          </h1>
          <p style={{color:C.menthe,fontSize:isMobile?"14px":"15px",lineHeight:1.8,maxWidth:"520px",margin:"0 0 28px",opacity:.9}}>{t("hero_desc")}</p>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
            <a href="#territoires" style={{background:C.or,color:C.noir,padding:isMobile?"11px 20px":"13px 28px",borderRadius:"2px",fontSize:"13px",fontWeight:700,textDecoration:"none",letterSpacing:".08em"}}>{t("hero_cta1")}</a>
            <Link href={`/${locale}/simulateur`} style={{background:"transparent",color:C.orClair,border:`1px solid ${C.vert}`,padding:isMobile?"11px 20px":"13px 28px",borderRadius:"2px",fontSize:"13px",textDecoration:"none"}}>{t("hero_cta2")}</Link>
          </div>
        </div>
        <div style={{background:C.foret,borderTop:`1px solid ${C.vert}30`}}>
          <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4, 1fr)"}}>
            {STATS_DATA.map((s,i)=>(
              <div key={i} style={{textAlign:"center",padding:isMobile?"14px 8px":"20px 16px",borderRight:isMobile?(i%2===0?`0.5px solid ${C.vert}40`:"none"):(i<3?`0.5px solid ${C.vert}40`:"none"),borderBottom:isMobile&&i<2?`0.5px solid ${C.vert}40`:"none"}}>
                <div style={{color:C.or,fontSize:isMobile?"18px":"22px",fontWeight:700,fontFamily:"Georgia, serif"}}>{s.val}</div>
                <div style={{color:C.menthe,fontSize:"9px",letterSpacing:".08em",textTransform:"uppercase",marginTop:"2px"}}>{s.label}</div>
                <div style={{color:`${C.menthe}70`,fontSize:"8px",marginTop:"1px"}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.noir,padding:isMobile?"40px 16px":"56px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"28px"}}>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px"}}>{t("partenaires_label")}</div>
            <h2 style={{color:C.orPale,fontSize:isMobile?"20px":"26px",fontWeight:300,fontFamily:"Georgia, serif",margin:"0 0 8px"}}>{t("partenaires_titre")}</h2>
            {!isMobile&&<p style={{color:C.menthe,fontSize:"13px",opacity:.7,margin:0}}>{t("partenaires_desc")}</p>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
            <div style={{flex:1,height:"0.5px",background:`${C.or}30`}}/>
            <span style={{color:C.or,fontSize:"9px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase"}}>Guadeloupe</span>
            <div style={{flex:1,height:"0.5px",background:`${C.or}30`}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsGP,gap:"2px",marginBottom:"16px"}}>
            {DISTILLERIES_GUADELOUPE.map((d,i)=><DistillerieCard key={i} d={d} ile="Guadeloupe"/>)}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
            <div style={{flex:1,height:"0.5px",background:`${C.or}30`}}/>
            <span style={{color:C.or,fontSize:"9px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase"}}>Martinique</span>
            <div style={{flex:1,height:"0.5px",background:`${C.or}30`}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsMQ,gap:"2px",marginBottom:"28px"}}>
            {DISTILLERIES_MARTINIQUE.map((d,i)=><DistillerieCard key={i} d={d} ile="Martinique"/>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:C.or}}/>
              <span style={{color:C.menthe,fontSize:"11px",opacity:.7}}>{t("futs_dispos")}</span>
            </div>
            <Link href={`/${locale}/distilleries`} style={{background:"transparent",color:C.or,border:`0.5px solid ${C.or}`,padding:"10px 22px",borderRadius:"2px",fontSize:"12px",fontWeight:700,textDecoration:"none"}}>
              {t("decouvrir_distilleries")}
            </Link>
          </div>
        </div>
      </section>

      <section id="territoires" style={{padding:isMobile?"48px 16px":"64px 24px",background:C.noir}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"28px"}}>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("territoires_label")}</div>
            <h2 style={{color:C.orPale,fontSize:isMobile?"22px":"28px",fontWeight:300,fontFamily:"Georgia, serif",margin:"0 0 6px"}}>{t("territoires_titre")}</h2>
            {!isMobile&&<p style={{color:C.menthe,fontSize:"13px",opacity:.7,margin:0}}>{t("territoires_desc")}</p>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:"14px"}}>
            {TERRITOIRES.map(terr=>(
              <TerritoireCard key={terr.id} territoire={terr} isOpen={territoireOuvert===terr.id} onToggle={()=>toggleTerritoire(terr.id)} onFilter={()=>handleFilter(terr.id)} isMobile={isMobile} t={t}/>
            ))}
          </div>
          <div style={{marginTop:"20px",padding:"14px 20px",background:`${C.or}08`,borderRadius:"12px",border:`0.5px solid ${C.or}20`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px"}}>
            <div>
              <div style={{color:C.orClair,fontSize:"13px",fontWeight:600,marginBottom:"2px"}}>{t("expansion_titre")}</div>
              <div style={{color:C.menthe,fontSize:"12px",opacity:.7}}>{t("expansion_desc")}</div>
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              {["🇯🇲","🇹🇹","🇨🇺","🇩🇴","🇧🇧"].map((f,i)=><span key={i} style={{fontSize:"18px",opacity:.4}}>{f}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="selection" style={{padding:isMobile?"48px 16px":"72px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"28px"}}>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px"}}>{t("selection_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"22px":"28px",fontWeight:700,margin:"0 0 16px",fontFamily:"Georgia, serif"}}>{t("selection_titre")}</h2>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {([{key:"tous",label:t("filtre_tous")},{key:"guadeloupe",label:"🇬🇵 Guadeloupe"},{key:"martinique",label:"🇲🇶 Martinique"},{key:"millesime",label:t("filtre_millesime")}] as {key:typeof filtre;label:string}[]).map(f=>(
                <button key={f.key} onClick={()=>handleFiltre(f.key)} style={{padding:"7px 14px",borderRadius:"2px",cursor:"pointer",fontSize:"11px",fontWeight:600,border:filtre===f.key?`1.5px solid ${C.or}`:`1px solid #D1C5B0`,background:filtre===f.key?C.foret:"white",color:filtre===f.key?C.or:C.gris,transition:"all .15s"}}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsFuts,gap:"16px"}}>
            {futsFiltres.map(fut=>{
              const pct=Math.round(((fut.tokens-fut.disponibles)/fut.tokens)*100);
              const complet=fut.disponibles===0;
              return(
                <div key={fut.id} onMouseEnter={()=>setHovered(fut.id)} onMouseLeave={()=>setHovered(null)}
                  style={{background:"white",borderRadius:"6px",overflow:"hidden",border:hovered===fut.id?`1.5px solid ${C.or}`:"1px solid #E8E2D6",transition:"all .2s",opacity:complet?.65:1}}>
                  <div style={{background:fut.millesime?C.foret:C.emeraude,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{color:C.or,fontSize:"11px",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase"}}>{fut.distillerie}</div>
                      <div style={{color:C.menthe,fontSize:"10px",marginTop:"2px"}}>{fut.ile} · {fut.annee}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"}}>
                      <StatutBadge statut={fut.statut}/>
                      {fut.millesime&&<span style={{background:C.or,color:C.noir,fontSize:"8px",fontWeight:700,padding:"1px 6px",borderRadius:"1px",textTransform:"uppercase"}}>★ Millésime</span>}
                    </div>
                  </div>
                  <div style={{padding:"14px 16px"}}>
                    <div style={{color:C.texte,fontSize:"13px",fontWeight:600,marginBottom:"4px"}}>{fut.type}</div>
                    <div style={{color:C.gris,fontSize:"11px",marginBottom:"12px"}}>{fut.baril}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"12px"}}>
                      {[{label:t("prix_token"),val:`${fut.prixToken}€`},{label:t("rendement_est"),val:fut.rendementEst},{label:t("maturite"),val:fut.maturite},{label:t("tokens_dispo"),val:complet?t("complet"):`${fut.disponibles}/${fut.tokens}`}].map(info=>(
                        <div key={info.label}>
                          <div style={{color:"#9CA3AF",fontSize:"9px",textTransform:"uppercase",letterSpacing:".08em"}}>{info.label}</div>
                          <div style={{color:C.texte,fontSize:"13px",fontWeight:700,marginTop:"1px"}}>{info.val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:"14px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                        <span style={{color:C.gris,fontSize:"10px"}}>{t("progression")}</span>
                        <span style={{color:C.or,fontSize:"10px",fontWeight:700}}>{pct}%</span>
                      </div>
                      <div style={{background:"#F0EBE1",borderRadius:"2px",height:"4px"}}>
                        <div style={{background:pct>=90?"#A32D2D":C.or,height:"100%",borderRadius:"2px",width:`${pct}%`,transition:"width .5s"}}/>
                      </div>
                    </div>
                    {complet?(
                      <div style={{background:"#F1EFE8",color:"#888780",padding:"10px",borderRadius:"3px",fontSize:"12px",textAlign:"center"}}>{t("liste_attente")}</div>
                    ):(
                      <Link href="#portefeuille" style={{display:"block",background:C.foret,color:C.or,padding:"10px",borderRadius:"3px",fontSize:"12px",textAlign:"center",fontWeight:700,textDecoration:"none",border:`1px solid ${C.or}30`}}>
                        {t("investir")}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {futsFiltres.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",background:"white",borderRadius:"8px",border:"1px solid #E8E2D6"}}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>🥃</div>
              <div style={{color:C.texte,fontSize:"15px",fontWeight:600,marginBottom:"6px"}}>{t("aucun_fut")}</div>
              <button onClick={()=>setFiltre("tous")} style={{background:C.foret,color:C.or,border:"none",padding:"10px 20px",borderRadius:"4px",fontSize:"12px",cursor:"pointer",marginTop:"8px"}}>
                {t("voir_tous_futs")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="processus" style={{background:C.noir,padding:isMobile?"48px 16px":"72px 24px",position:"relative",overflow:"hidden"}}>
        <Image src="/images/canne.jpg" alt="Champs de canne à sucre" fill style={{objectFit:"cover",opacity:0.35}}/>
        <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px"}}>{t("processus_label")}</div>
            <h2 style={{color:C.orPale,fontSize:isMobile?"22px":"28px",fontWeight:300,fontFamily:"Georgia, serif",margin:0}}>{t("processus_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)",gap:"2px"}}>
            {ETAPES_DATA.map((e,i)=>(
              <div key={i} style={{background:i%2===0?C.foret:C.emeraude,padding:isMobile?"20px 14px":"28px 20px"}}>
                <div style={{color:C.or,fontSize:isMobile?"24px":"32px",fontFamily:"Georgia, serif",fontWeight:300,opacity:.5,marginBottom:"10px"}}>{e.num}</div>
                <div style={{color:C.or,fontSize:"11px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"8px"}}>{e.titre}</div>
                <div style={{color:C.menthe,fontSize:"11px",lineHeight:1.7,opacity:.85}}>{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portefeuille" style={{background:C.foret,padding:isMobile?"48px 16px":"72px 24px",position:"relative",overflow:"hidden"}}>
        <Image src="/images/recolte.jpg" alt="Récolte de canne à sucre" fill style={{objectFit:"cover",opacity:0.15}}/>
        <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center",position:"relative"}}>
          <div style={{position:"relative",marginBottom:"24px"}}>
            <div style={{width:"80px",height:"80px",borderRadius:"50%",border:`1px solid ${C.or}40`,margin:"0 auto 8px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{width:"56px",height:"56px",borderRadius:"50%",border:`1px solid ${C.or}70`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:"24px"}}>🥃</span>
              </div>
            </div>
          </div>
          <div style={{color:C.or,fontSize:"10px",fontWeight:700,letterSpacing:".25em",textTransform:"uppercase",marginBottom:"14px"}}>{t("rejoindre_label")}</div>
          <h2 style={{color:C.orPale,fontSize:isMobile?"22px":"28px",fontWeight:300,fontFamily:"Georgia, serif",lineHeight:1.3,margin:"0 0 14px"}}>{t("rejoindre_titre")}</h2>
          <p style={{color:C.menthe,fontSize:"14px",lineHeight:1.8,margin:"0 0 28px",opacity:.9}}>{t("rejoindre_desc")}</p>
          <Link href={`/${locale}/kyc`} style={{display:"inline-block",background:C.or,color:C.noir,padding:"14px 32px",borderRadius:"2px",fontSize:"13px",fontWeight:700,textDecoration:"none",letterSpacing:".1em",textTransform:"uppercase"}}>
            {t("rejoindre_btn")}
          </Link>
          <p style={{color:`${C.menthe}60`,fontSize:"10px",letterSpacing:".05em",marginTop:"16px"}}>{t("rejoindre_note")}</p>
        </div>
      </section>

      <Footer/>
    </main>
  );
}