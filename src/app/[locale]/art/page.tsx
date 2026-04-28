"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { LogoNuit } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Image from "next/image";

const C = {
  nuit:"#0D0518",violet:"#1A0A2E",prune:"#2D1A4A",mauve:"#C084FC",mauveC:"#A855F7",
  or:"#E8B86D",orC:"#D4A04A",orPale:"#F5F0E8",lavande:"#F5F0FF",
  texte:"#E8E0F0",texteSec:"#A899B8",texteTert:"#6B5E7A",blanc:"#FFFFFF",
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

const TERRITOIRES_ART=[
  {id:"guadeloupe",carteImg:"/images/carte-guadeloupe.jpg",nom:"Guadeloupe",pays:"France (DOM)",drapeau:"🇬🇵",couleur:"#1A0A3E",accentColor:"#C084FC",region:"Antilles françaises",ventesRecord:"80 000 $",venteRecordDetail:"Kelly Sinnapah Mary — Art Basel Miami Beach, déc. 2025",nbArtistes:"~120 artistes professionnels",galeries:"Fondation CGPA, Galerie Raoul, La Distillerie",styles:["Art créole contemporain","Installations","Peinture narrative"],marche:"En forte croissance — +40% de visibilité internationale depuis 2023",subventions:"DRAC Guadeloupe + Région",evenements:"Biennale des arts de la Caraïbe (Fort-de-France / Pointe-à-Pitre)",particularites:"En décembre 2025, Kelly Sinnapah Mary a remporté le Prix CPGA–Villa Albertine à Art Basel Miami Beach. Son œuvre \"The Book of Violette: Marie-Anne\" s'est vendue 80 000 $ à une fondation américaine — un record pour une artiste guadeloupéenne.",avantages:["Kelly Sinnapah Mary — Prix Art Basel Miami Beach 2025","Exposition au MoMA New York et Centre Pompidou 2025","Accès DRAC pour aides à la création","Scène émergente très active — nouvelle génération"],artistes:[{nom:"Kelly Sinnapah Mary",style:"Peinture & installations",actu:"Prix CPGA Art Basel 2025 · Vendu 80 000$",initiales:"KS"},{nom:"Michel Rovelas",style:"Peinture & sculpture",actu:"Collection CTM Martinique · ~15 oeuvres",initiales:"MR"},{nom:"Ernest Breleur",style:"Art conceptuel",actu:"Representant Caraibes Art contemporain",initiales:"EB"}]},
  {id:"martinique",carteImg:"/images/carte-martinique.jpg",nom:"Martinique",pays:"France (DOM)",drapeau:"🇲🇶",couleur:"#0A1A3E",accentColor:"#E8B86D",region:"Antilles françaises",ventesRecord:"Prix Art Basel 2022",venteRecordDetail:"Julien Creuzet — Étant donnés Prize, Art Basel Miami 2022",nbArtistes:"~200 artistes professionnels",galeries:"Fondation Clément, Galerie Habitation Latouche, FRAC Martinique",styles:["Néo-créole","Installation multimédia","Sculpture hybride"],marche:"Référence régionale — collection CTM exposée MoMA et Centre Pompidou 2025",subventions:"CTM + DRAC Martinique + FRAC",evenements:"Art Caraïbe Fort-de-France, Nuit des musées, Biennale",particularites:"La Martinique est la référence de l'art caribéen contemporain. Julien Creuzet a représenté la France à la Biennale de Venise 2024. En 2025, des œuvres de la collection CTM ont été exposées au MoMA.",avantages:["Julien Creuzet — Pavillon France Biennale Venise 2024","Collection CTM exposée MoMA NY & Pompidou 2025","FRAC Martinique — soutien institutionnel fort","Fondation Clément — résidences d'artistes internationales"],artistes:[{nom:"Julien Creuzet",style:"Sculpture, vidéo, poésie",actu:"Pavillon France Venise 2024 · MOMENTA Biennale 2025",initiales:"JC"},{nom:"Hervé Télémaque",style:"Peinture narrative (Haiti/Martinique)",actu:"Collection CTM · Dérives n°2 (1985)",initiales:"HT"},{nom:"Marielle Plaisir",style:"Art engagé, installations",actu:"Art Basel Miami Beach 2025 — sélection",initiales:"MP"}]},
  {id:"haiti",carteImg:"/images/carte-haiti.jpg",nom:"Haiti",pays:"République d'Haïti",drapeau:"🇭🇹",couleur:"#1A0A0A",accentColor:"#E8B86D",region:"Grandes Antilles",ventesRecord:"45 000 $",venteRecordDetail:"Frantz Zéphirin — Christie's New York, 2024",nbArtistes:"~800 artistes actifs (diaspora incluse)",galeries:"Nader Gallery (NY), Myriam Nader Art, Centre d'Art Port-au-Prince",styles:["Naïf haïtien","Vodou art","Contemporain diaspora","Réalisme magique"],marche:"Marché diaspora très actif — New York, Montréal, Paris · Prix en hausse constante",subventions:"Fondations privées, diaspora, UNESCO",evenements:"Salon haïtien de la diaspora (Montréal), expositions communautaires (Miami, NY)",particularites:"L'art haïtien est le marché d'art caribéen le plus mature et le plus liquide. La diaspora (NY, Montréal, Paris, Miami) est le moteur principal des ventes.",avantages:["Marché le plus liquide de la Caraïbe — forte demande diaspora","Prix en hausse constante depuis 2020 (+25%/an)","Style naïf haïtien — reconnaissance internationale","Accès direct aux collectionneurs américains et canadiens"],artistes:[{nom:"Frantz Zéphirin",style:"Naïf contemporain, vodou symbolique",actu:"Record 45 000$ Christie's 2024 · Expositions Paris & NY",initiales:"FZ"},{nom:"Didier William",style:"Peinture diaspora contemporaine",actu:"Collection MoMA · Expositions institutionnelles USA",initiales:"DW"},{nom:"Didier Sylvain",style:"Sculpture & installations",actu:"Foires art contemporain Europe & Amériques",initiales:"DS"}]},
  {id:"diaspora",carteImg:"/images/carte-diaspora.jpg",nom:"Art caribéen diaspora",pays:"International",drapeau:"🌍",couleur:"#0A1A0A",accentColor:"#C084FC",region:"NYC · Paris · Montréal · Miami",ventesRecord:"120 000 $",venteRecordDetail:"Roméo Mivekannin (Bénin/Caraïbes) — Foire internationale 2025",nbArtistes:"~500 artistes caribéens en diaspora active",galeries:"Galerie Cecile Fakhoury, Perrotin, James Cohan (NY), mor charpentier",styles:["Afro-caribéen contemporain","Art conceptuel","Art politique","Multimédia"],marche:"Segment le plus dynamique — représentation dans les plus grandes foires mondiales",subventions:"Fondations privées USA/Canada/France, Villa Albertine, Institut Français",evenements:"Frieze London, Art Basel Basel, Art Basel Miami Beach, FIAC Paris",particularites:"La diaspora caribéenne dans les grandes villes mondiales génère le segment le plus premium du marché.",avantages:["Accès aux grandes foires mondiales (Frieze, Art Basel)","Galeries de rang mondial (Perrotin, James Cohan)","Royalties tokenisées — revenu passif sur chaque revente","Segment premium avec plus-values les plus élevées"],artistes:[{nom:"Roméo Mivekannin",style:"Peinture afro-caribéenne",actu:"Art Basel Miami 2025 sélection · Galerie Cécile Fakhoury",initiales:"RM"},{nom:"Iván Argote",style:"Art politique & vidéo",actu:"Perrotin Gallery · Expositions mondiales 2025",initiales:"IA"},{nom:"Kapwani Kiwanga",style:"Art conceptuel caribéen",actu:"Prix Étant donnés 2019 · Collections publiques Europe",initiales:"KK"}]},
];

const OEUVRES=[
  {id:1,slug:"femme-aux-flamboyants",titre:"Femme aux Flamboyants",artiste:"Marie-Hélène Caumont",origine:"Martinique",annee:2023,medium:"Huile sur toile 120x90 cm",estimation:8500,tokens:85,disponibles:31,prixToken:100,royaltes:"5%",statut:"En levee",style:"Néo-créole expressionniste",couleurs:["#C8192A","#F5A623","#1A6B5A","#F0E6D2"],tag:"Martinique",territoire:"martinique"},
  {id:2,slug:"memoire-de-saint-domingue",titre:"Mémoire de Saint-Domingue",artiste:"Jean-Claude Fortune",origine:"Haiti",annee:2022,medium:"Acrylique sur toile 150x120 cm",estimation:14000,tokens:140,disponibles:8,prixToken:100,royaltes:"5%",statut:"Dernieres places",style:"Art haïtien contemporain",couleurs:["#1A3A8A","#C8992A","#8B1A1A","#F5E8C0"],tag:"Haiti",territoire:"haiti"},
  {id:3,slug:"foret-amazonienne-3",titre:"Forêt Amazonienne 3",artiste:"Kali Maloum",origine:"Guyane française",annee:2024,medium:"Techniques mixtes 200x140 cm",estimation:11000,tokens:110,disponibles:110,prixToken:100,royaltes:"5%",statut:"Nouveau",style:"Art contemporain guyanais",couleurs:["#0D4A1A","#5A8A3C","#D4C07A","#1A3D2E"],tag:"Guyane",territoire:"diaspora"},
  {id:4,slug:"bele-nocturne",titre:"Bèlè Nocturne",artiste:"David Séjour",origine:"Guadeloupe",annee:2023,medium:"Huile et or sur toile 100x80 cm",estimation:6200,tokens:62,disponibles:0,prixToken:100,royaltes:"5%",statut:"Complet",style:"Abstraction caribéenne",couleurs:["#0A0A1A","#C8992A","#4A2A6A","#E8E0F0"],tag:"Guadeloupe",territoire:"guadeloupe"},
  {id:5,slug:"marche-de-jacmel",titre:"Marché de Jacmel",artiste:"Roseline Augustin",origine:"Haiti",annee:2021,medium:"Huile sur toile 180x130 cm",estimation:22000,tokens:220,disponibles:44,prixToken:100,royaltes:"5%",statut:"En levee",style:"Réalisme naïf haïtien",couleurs:["#E83A2A","#F5A020","#2A8A3A","#4A2ACA"],tag:"Haiti Millésime",territoire:"haiti"},
  {id:6,slug:"droits-musicaux-kase-ko",titre:"Droits Musicaux - Kase Ko",artiste:"Collectif Zouk Numérique",origine:"Martinique & Guadeloupe",annee:2024,medium:"Catalogue 12 titres Droits numériques",estimation:35000,tokens:350,disponibles:180,prixToken:100,royaltes:"8%",statut:"En levee",style:"Droits musicaux Zouk",couleurs:["#7B2FBE","#E8B86D","#1A0A2E","#F5E8C0"],tag:"Droits musicaux",territoire:"diaspora"},
];

const ARTISTES_SECTION=[
  {nom:"Kelly Sinnapah Mary",origine:"Guadeloupe",style:"Peinture & installations",expositions:"Art Basel Miami Beach (2025), MoMA NY, Centre Pompidou, Bienal São Paulo",actu:"🏆 Prix CPGA–Villa Albertine Art Basel Miami Beach 4 déc. 2025. \"The Book of Violette: Marie-Anne\" vendu 80 000 $ à une fondation américaine.",initiales:"KS",couleur:C.mauve},
  {nom:"Julien Creuzet",origine:"Martinique",style:"Sculpture, vidéo, poésie",expositions:"Biennale de Venise 2024 (Pavillon France), MOMENTA Biennale 2025, Instituto Tomie Ohtake",actu:"Représentant officiel de la France à la 60e Biennale de Venise (2024). Prix Étant donnés Art Basel Miami 2022.",initiales:"JC",couleur:C.or},
  {nom:"Frantz Zéphirin",origine:"Haiti",style:"Naïf contemporain, vodou symbolique",expositions:"Christie's New York, galeries Paris & New York, expositions internationales",actu:"Record de vente 45 000 $ chez Christie's New York (2024). Figure internationale du naïf haïtien contemporain.",initiales:"FZ",couleur:"#E83A2A"},
  {nom:"Roméo Mivekannin",origine:"Diaspora Bénin/Caraïbes",style:"Peinture afro-caribéenne",expositions:"Art Basel Miami Beach 2025 (Galerie Cécile Fakhoury), expositions mondiales",actu:"Sélectionné Art Basel Miami Beach 2025 dans la compétition CPGA. Représente la diaspora afro-caribéenne.",initiales:"RM",couleur:C.mauve},
];

function PaletteOeuvre({couleurs}:{couleurs:string[]}){
  return(<div style={{display:"flex",gap:"3px"}}>{couleurs.map((c,i)=>(<div key={i} style={{width:"12px",height:"12px",borderRadius:"50%",background:c,border:"1px solid rgba(255,255,255,.15)"}}/>))}</div>);
}

function StatutBadge({statut}:{statut:string}){
  const map:Record<string,{bg:string;color:string}>={
    "En levee":{bg:"rgba(192,132,252,.15)",color:C.mauve},
    "Dernieres places":{bg:"rgba(232,184,109,.15)",color:C.or},
    "Nouveau":{bg:"rgba(56,189,248,.15)",color:"#38BDF8"},
    "Complet":{bg:"rgba(255,255,255,.08)",color:C.texteSec},
  };
  const s=map[statut]||map["En levee"];
  return(<span style={{background:s.bg,color:s.color,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"20px",letterSpacing:".08em",border:`0.5px solid ${s.color}40`}}>{statut}</span>);
}

export default function ArtPage(){
  const t=useTranslations("art");
  const locale=useLocale();
  const [filtre,setFiltre]=useState<"tous"|"peinture"|"haiti"|"martinique"|"guadeloupe"|"musique">("tous");
  const [territoireOuvert,setTerritoireOuvert]=useState<string|null>(null);
  const [hovered,setHovered]=useState<number|null>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const {isMobile,isTablet}=useBreakpoint();

  const pourquoi=t.raw("pourquoi") as {num:string;titre:string;desc:string;icone:string}[];

  const filtrees=OEUVRES.filter(o=>{
    if(filtre==="peinture")return o.medium.includes("toile");
    if(filtre==="haiti")return o.territoire==="haiti";
    if(filtre==="martinique")return o.territoire==="martinique";
    if(filtre==="guadeloupe")return o.territoire==="guadeloupe";
    if(filtre==="musique")return o.medium.includes("Droits");
    return true;
  });

  function handleTerritoireFilter(id:string){
    if(id==="guadeloupe")setFiltre("guadeloupe");
    else if(id==="martinique")setFiltre("martinique");
    else if(id==="haiti")setFiltre("haiti");
    else setFiltre("tous");
    setTimeout(()=>{document.getElementById("oeuvres")?.scrollIntoView({behavior:"smooth"});},100);
  }

  function toggleTerritoire(id:string){setTerritoireOuvert(territoireOuvert===id?null:id);}

  const colsOeuvres=isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(3, 1fr)";
  const colsTerritoires=isMobile?"1fr":"repeat(2, 1fr)";

  const NAV_LINKS=[
    {label:t("nav_territoires"),href:"#territoires"},
    {label:t("nav_oeuvres"),href:"#oeuvres"},
    {label:t("nav_artistes"),href:"#artistes"},
    {label:t("nav_cercle"),href:"#cercle"},
  ];

  const STATS_DATA=[
    {val:t("stats.val1"),label:t("stats.label1"),sub:t("stats.sub1")},
    {val:t("stats.val2"),label:t("stats.label2"),sub:t("stats.sub2")},
    {val:t("stats.val3"),label:t("stats.label3"),sub:t("stats.sub3")},
    {val:t("stats.val4"),label:t("stats.label4"),sub:t("stats.sub4")},
  ];

  return(
    <main style={{fontFamily:"Georgia, 'Times New Roman', serif",background:C.nuit,minHeight:"100vh",color:C.texte}}>

      <nav style={{background:`${C.nuit}F0`,backdropFilter:"blur(8px)",borderBottom:`0.5px solid ${C.prune}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoNuit size={isMobile?0.6:0.7}/>
          </Link>
          {!isMobile&&(
            <div style={{display:"flex",gap:"24px",alignItems:"center"}}>
              {NAV_LINKS.map(l=>(
                <a key={l.label} href={l.href} style={{color:C.texteSec,fontSize:"11px",cursor:"pointer",fontFamily:"system-ui",textDecoration:"none"}}>{l.label}</a>
              ))}
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#E8B86D" buttonColor="#0D0518" textColor="#A899B8" borderColor="rgba(232,184,109,.3)"/>
            </div>
          )}
          {isMobile&&(
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <LanguageSwitcher/>
              <NavbarAuth buttonBg="#E8B86D" buttonColor="#0D0518" textColor="#A899B8" borderColor="rgba(232,184,109,.3)"/>
              <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",flexDirection:"column",gap:"5px"}}>
                {[0,1,2].map(i=><div key={i} style={{width:"20px",height:"2px",background:C.or,borderRadius:"2px"}}/>)}
              </button>
            </div>
          )}
        </div>
        {isMobile&&menuOpen&&(
          <div style={{background:C.violet,borderTop:`0.5px solid ${C.prune}`,padding:"8px 16px"}}>
            {NAV_LINKS.map(l=>(
              <a key={l.label} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:"block",color:C.texteSec,fontSize:"14px",fontFamily:"system-ui",textDecoration:"none",padding:"12px 0",borderBottom:`0.5px solid ${C.prune}`}}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <section style={{position:"relative",overflow:"hidden",padding:isMobile?"48px 16px 36px":"80px 24px 56px"}}>
        <div style={{position:"absolute",inset:0,background:C.nuit}}/>
        {!isMobile&&[300,220,150,90].map((size,i)=>(
          <div key={i} style={{position:"absolute",right:"-40px",top:"50%",transform:"translateY(-50%)",width:`${size}px`,height:`${size}px`,borderRadius:"50%",border:`0.5px solid ${i%2===0?C.mauve:C.or}${["18","10","0C","08"][i]}`}}/>
        ))}
        <div style={{maxWidth:"1100px",margin:"0 auto",position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
            <div style={{width:"24px",height:"0.5px",background:C.mauve}}/>
            <span style={{color:C.mauve,fontSize:"10px",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"system-ui"}}>{t("hero_badge")}</span>
          </div>
          <h1 style={{color:C.orPale,fontSize:isMobile?"26px":"clamp(26px, 4.5vw, 54px)",fontWeight:300,lineHeight:1.2,margin:"0 0 6px",maxWidth:"700px"}}>{t("hero_titre1")}</h1>
          <h1 style={{color:C.or,fontSize:isMobile?"26px":"clamp(26px, 4.5vw, 54px)",fontWeight:700,lineHeight:1.2,margin:"0 0 20px",maxWidth:"700px",fontStyle:"italic"}}>{t("hero_titre2")}</h1>
          <p style={{color:C.texteSec,fontSize:isMobile?"13px":"15px",lineHeight:1.9,maxWidth:"520px",margin:"0 0 28px",fontFamily:"system-ui"}}>{t("hero_desc")}</p>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:`${C.or}15`,border:`0.5px solid ${C.or}40`,borderRadius:"20px",padding:"6px 14px",marginBottom:"20px"}}>
            <span style={{color:C.or,fontSize:"10px",fontWeight:700,fontFamily:"system-ui"}}>{t("hero_actu")}</span>
          </div>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <a href="#territoires" style={{background:C.or,color:C.nuit,padding:isMobile?"11px 20px":"13px 28px",borderRadius:"2px",fontSize:"13px",fontWeight:700,textDecoration:"none",fontFamily:"system-ui"}}>{t("hero_cta1")}</a>
            <a href="#cercle" style={{background:"transparent",color:C.mauve,border:`0.5px solid ${C.mauve}`,padding:isMobile?"11px 20px":"13px 28px",borderRadius:"2px",fontSize:"13px",fontFamily:"system-ui",textDecoration:"none"}}>{t("hero_cta2")}</a>
          </div>
        </div>
        <div style={{maxWidth:"1100px",margin:isMobile?"32px auto 0":"48px auto 0",display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4, 1fr)",borderTop:`0.5px solid ${C.prune}`,paddingTop:"24px",position:"relative"}}>
          {STATS_DATA.map((s,i)=>(
            <div key={i} style={{textAlign:"center",padding:isMobile?"12px 8px":"0 16px",borderRight:isMobile?(i%2===0?`0.5px solid ${C.prune}`:"none"):(i<3?`0.5px solid ${C.prune}`:"none"),borderBottom:isMobile&&i<2?`0.5px solid ${C.prune}`:"none",paddingBottom:isMobile&&i<2?"12px":"0"}}>
              <div style={{color:C.or,fontSize:isMobile?"18px":"22px",fontWeight:700}}>{s.val}</div>
              <div style={{color:C.texteSec,fontSize:"10px",letterSpacing:".08em",textTransform:"uppercase",marginTop:"4px",fontFamily:"system-ui"}}>{s.label}</div>
              {!isMobile&&<div style={{color:C.texteTert,fontSize:"9px",marginTop:"2px",fontFamily:"system-ui"}}>{s.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      <section id="territoires" style={{padding:isMobile?"48px 16px":"72px 24px",borderTop:`0.5px solid ${C.prune}`,background:C.violet}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{color:C.mauve,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("territoires_label")}</div>
            <h2 style={{color:C.orPale,fontSize:isMobile?"22px":"28px",fontWeight:300,margin:"0 0 10px"}}>{t("territoires_titre")}</h2>
            <p style={{color:C.texteSec,fontSize:"13px",margin:0,fontFamily:"system-ui"}}>{t("territoires_desc")}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsTerritoires,gap:"14px",marginBottom:"24px"}}>
            {TERRITOIRES_ART.map(terr=>{
              const oeuvresTerritoire=OEUVRES.filter(o=>o.territoire===terr.id);
              const oeuvresDispos=oeuvresTerritoire.filter(o=>o.disponibles>0).length;
              const isOpen=territoireOuvert===terr.id;
              return(
                <div key={terr.id} style={{background:C.violet,borderRadius:"12px",overflow:"hidden",border:isOpen?`2px solid ${terr.accentColor}`:`0.5px solid ${C.prune}`,cursor:"pointer",transition:"all .2s"}}>
                  <div onClick={()=>toggleTerritoire(terr.id)} style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",overflow:"hidden",minHeight:"80px"}}>
                    <div style={{position:"absolute",left:0,top:0,bottom:0,width:"35%",overflow:"hidden"}}>
                      <div style={{position:"relative",width:"100%",height:"100%"}}>
                        <Image src={terr.carteImg} alt={terr.nom} fill sizes="200px" style={{objectFit:"cover",opacity:.35}}/>
                      </div>
                      <div style={{position:"absolute",inset:0,background:`linear-gradient(to right, transparent 0%, ${terr.couleur} 70%)`}}/>
                    </div>
                    <div style={{position:"absolute",inset:0,background:`linear-gradient(to right, ${terr.couleur}60 0%, ${terr.couleur} 50%)`}}/>
                    <div style={{position:"relative",zIndex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                        <span style={{fontSize:"22px"}}>{terr.drapeau}</span>
                        <div style={{color:"white",fontSize:isMobile?"16px":"18px",fontWeight:700}}>{terr.nom}</div>
                      </div>
                      <div style={{color:"rgba(255,255,255,.65)",fontSize:"10px",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"system-ui"}}>{terr.pays} · {terr.region}</div>
                    </div>
                    <div style={{textAlign:"right",position:"relative",zIndex:1}}>
                      <div style={{color:"rgba(255,255,255,.7)",fontSize:"10px",marginBottom:"2px",fontFamily:"system-ui"}}>{t("vente_record")}</div>
                      <div style={{color:terr.accentColor,fontSize:"16px",fontWeight:800}}>{terr.ventesRecord}</div>
                    </div>
                  </div>
                  <div style={{padding:"10px 20px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px",borderBottom:`0.5px solid ${C.prune}`}}>
                    {[{label:t("artistes_label"),val:terr.nbArtistes.split("~")[1]?.split(" ")[0]||terr.nbArtistes},{label:t("oeuvres_dispos"),val:`${oeuvresDispos}/${oeuvresTerritoire.length}`},{label:t("marche"),val:terr.marche.split("—")[0].trim()}].map((m,j)=>(
                      <div key={j}>
                        <div style={{color:C.texteTert,fontSize:"9px",textTransform:"uppercase",fontFamily:"system-ui"}}>{m.label}</div>
                        <div style={{color:C.texte,fontSize:"11px",fontWeight:600,marginTop:"2px",fontFamily:"system-ui"}}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                  {isOpen&&(
                    <div style={{padding:"16px 20px"}}>
                      <div style={{background:`${terr.accentColor}15`,borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",border:`0.5px solid ${terr.accentColor}30`}}>
                        <div style={{color:terr.accentColor,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:"4px",fontFamily:"system-ui"}}>{t("vente_record")}</div>
                        <div style={{color:C.texte,fontSize:"12px",fontFamily:"system-ui"}}>{terr.venteRecordDetail}</div>
                      </div>
                      <p style={{color:C.texteSec,fontSize:"13px",lineHeight:1.7,margin:"0 0 14px",fontFamily:"system-ui"}}>{terr.particularites}</p>
                      <div style={{marginBottom:"14px"}}>
                        {terr.avantages.map((a,i)=>(
                          <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"6px",marginBottom:"5px"}}>
                            <span style={{color:terr.accentColor,fontSize:"12px",flexShrink:0}}>✓</span>
                            <span style={{color:C.texteSec,fontSize:"12px",fontFamily:"system-ui"}}>{a}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{marginBottom:"14px"}}>
                        <div style={{color:terr.accentColor,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:"10px",fontFamily:"system-ui"}}>{t("artistes_phares")}</div>
                        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                          {terr.artistes.map((a,i)=>(
                            <div key={i} style={{background:"rgba(0,0,0,.2)",borderRadius:"6px",padding:"10px 12px",display:"flex",alignItems:"center",gap:"10px"}}>
                              <div style={{width:"36px",height:"36px",borderRadius:"50%",background:`linear-gradient(135deg, ${terr.accentColor}40, ${C.mauve}40)`,border:`0.5px solid ${terr.accentColor}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:terr.accentColor,fontFamily:"system-ui",flexShrink:0}}>{a.initiales}</div>
                              <div style={{flex:1}}>
                                <div style={{color:C.orPale,fontSize:"12px",fontWeight:600}}>{a.nom}</div>
                                <div style={{color:C.texteSec,fontSize:"10px",fontFamily:"system-ui",marginTop:"1px"}}>{a.style}</div>
                                <div style={{color:terr.accentColor,fontSize:"10px",fontFamily:"system-ui",marginTop:"2px",opacity:.8}}>{a.actu}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"10px",marginBottom:"14px"}}>
                        <div style={{background:"rgba(0,0,0,.2)",borderRadius:"6px",padding:"10px 12px"}}>
                          <div style={{color:C.texteTert,fontSize:"9px",textTransform:"uppercase",letterSpacing:".08em",marginBottom:"4px",fontFamily:"system-ui"}}>{t("galeries")}</div>
                          <div style={{color:C.texteSec,fontSize:"11px",fontFamily:"system-ui",lineHeight:1.6}}>{terr.galeries}</div>
                        </div>
                        <div style={{background:"rgba(0,0,0,.2)",borderRadius:"6px",padding:"10px 12px"}}>
                          <div style={{color:C.texteTert,fontSize:"9px",textTransform:"uppercase",letterSpacing:".08em",marginBottom:"4px",fontFamily:"system-ui"}}>{t("evenements")}</div>
                          <div style={{color:C.texteSec,fontSize:"11px",fontFamily:"system-ui",lineHeight:1.6}}>{terr.evenements}</div>
                        </div>
                      </div>
                      <button onClick={(e)=>{e.stopPropagation();handleTerritoireFilter(terr.id);}}
                        style={{background:terr.accentColor,color:"#0D0518",border:"none",padding:"10px 18px",borderRadius:"8px",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
                        {t("voir_oeuvres")}
                      </button>
                    </div>
                  )}
                  {!isOpen&&(
                    <div onClick={()=>toggleTerritoire(terr.id)} style={{padding:"10px 20px",color:terr.accentColor,fontSize:"11px",fontWeight:600,fontFamily:"system-ui"}}>
                      {t("voir_artistes")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{color:C.texteSec,fontSize:"11px",opacity:.5,marginRight:"8px",lineHeight:"28px",fontFamily:"system-ui"}}>{t("prochainement")}</div>
            {[{flag:"🇨🇺",nom:"Cuba"},{flag:"🇩🇴",nom:"Rep. Dom."},{flag:"🇯🇲",nom:"Jamaica"},{flag:"🇧🇧",nom:"Barbados"},{flag:"🇹🇹",nom:"Trinidad"}].map((pays,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.04)",border:`0.5px solid ${C.prune}`,borderRadius:"20px",padding:"4px 12px",fontSize:"11px",color:`${C.texteSec}60`,display:"flex",alignItems:"center",gap:"6px",fontFamily:"system-ui"}}>
                <span>{pays.flag}</span><span>{pays.nom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="oeuvres" style={{padding:isMobile?"40px 16px":"64px 24px",borderTop:`0.5px solid ${C.prune}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"24px",flexWrap:"wrap",gap:"14px"}}>
            <div>
              <div style={{color:C.mauve,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px",fontFamily:"system-ui"}}>{t("galerie_label")}</div>
              <h2 style={{color:C.orPale,fontSize:isMobile?"20px":"26px",fontWeight:300,margin:0}}>{t("oeuvres_titre")}</h2>
            </div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",fontFamily:"system-ui"}}>
              {([{key:"tous",label:t("filtre_tous")},{key:"guadeloupe",label:"🇬🇵 Guadeloupe"},{key:"martinique",label:"🇲🇶 Martinique"},{key:"haiti",label:"🇭🇹 Haiti"},{key:"musique",label:t("filtre_musique")}] as {key:typeof filtre;label:string}[]).map(f=>(
                <button key={f.key} onClick={()=>setFiltre(f.key)} style={{padding:"5px 12px",borderRadius:"20px",cursor:"pointer",fontSize:"11px",fontWeight:500,border:filtre===f.key?`0.5px solid ${C.mauve}`:`0.5px solid ${C.prune}`,background:filtre===f.key?`${C.mauve}18`:"transparent",color:filtre===f.key?C.mauve:C.texteSec,transition:"all .15s"}}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsOeuvres,gap:"14px"}}>
            {filtrees.map(oe=>{
              const pct=Math.round(((oe.tokens-oe.disponibles)/oe.tokens)*100);
              const complet=oe.disponibles===0;
              return(
                <div key={oe.id} onMouseEnter={()=>setHovered(oe.id)} onMouseLeave={()=>setHovered(null)}
                  style={{background:C.violet,borderRadius:"4px",overflow:"hidden",border:hovered===oe.id?`0.5px solid ${C.or}`:`0.5px solid ${C.prune}`,transition:"all .25s",opacity:complet?.6:1,transform:hovered===oe.id&&!complet?"translateY(-4px)":"none"}}>
                  <div style={{height:"110px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg, ${oe.couleurs[0]} 0%, ${oe.couleurs[1]} 40%, ${oe.couleurs[2]} 70%, ${oe.couleurs[3]||oe.couleurs[0]} 100%)`,opacity:.85}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,3,24,.8) 0%, transparent 60%)"}}/>
                    <div style={{position:"absolute",top:"8px",left:"8px"}}>
                      <span style={{background:C.or,color:C.nuit,fontSize:"8px",fontWeight:700,padding:"2px 8px",borderRadius:"20px",fontFamily:"system-ui"}}>{oe.tag}</span>
                    </div>
                    <div style={{position:"absolute",top:"8px",right:"8px"}}>
                      <StatutBadge statut={oe.statut}/>
                    </div>
                    <div style={{position:"absolute",bottom:"8px",left:"10px",right:"10px"}}>
                      <div style={{color:"rgba(255,255,255,.7)",fontSize:"9px",fontFamily:"system-ui",marginBottom:"2px"}}>{oe.artiste}</div>
                      <div style={{color:"white",fontSize:"13px",fontWeight:400}}>{oe.titre}</div>
                    </div>
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                      <div style={{color:C.texteSec,fontSize:"10px",fontFamily:"system-ui",fontStyle:"italic"}}>{oe.style}</div>
                      <PaletteOeuvre couleurs={oe.couleurs}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"6px",marginBottom:"10px"}}>
                      {[{label:t("estimation"),val:`${(oe.estimation/1000).toFixed(0)}k€`},{label:t("royalties"),val:oe.royaltes},{label:t("token"),val:`${oe.prixToken}€`}].map(m=>(
                        <div key={m.label} style={{background:C.prune,borderRadius:"3px",padding:"6px 4px",textAlign:"center"}}>
                          <div style={{color:C.or,fontSize:"12px",fontWeight:700}}>{m.val}</div>
                          <div style={{color:C.texteTert,fontSize:"9px",fontFamily:"system-ui",marginTop:"1px"}}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:"10px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
                        <span style={{color:C.texteTert,fontSize:"10px",fontFamily:"system-ui"}}>{t("tokens_leves")}</span>
                        <span style={{color:C.mauve,fontSize:"10px",fontWeight:700,fontFamily:"system-ui"}}>{pct}%</span>
                      </div>
                      <div style={{background:C.prune,borderRadius:"20px",height:"3px"}}>
                        <div style={{background:pct>=95?"#E24B4A":C.mauve,height:"100%",borderRadius:"20px",width:`${pct}%`}}/>
                      </div>
                    </div>
                    {complet?(
                      <div style={{background:C.prune,color:C.texteTert,padding:"9px",borderRadius:"3px",fontSize:"11px",textAlign:"center",fontFamily:"system-ui"}}>{t("complet_label")}</div>
                    ):(
                      <Link href={`/${locale}/art/${oe.slug}`} style={{display:"block",background:"transparent",color:C.or,border:`0.5px solid ${C.or}60`,padding:"9px",borderRadius:"3px",fontSize:"12px",textAlign:"center",fontWeight:700,textDecoration:"none",fontFamily:"system-ui"}}>
                        {t("decouvrir")}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {filtrees.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",background:C.violet,borderRadius:"8px",border:`0.5px solid ${C.prune}`}}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>🎨</div>
              <div style={{color:C.orPale,fontSize:"15px",fontWeight:600,marginBottom:"6px"}}>{t("aucune_oeuvre")}</div>
              <button onClick={()=>setFiltre("tous")} style={{background:C.mauve,color:C.nuit,border:"none",padding:"10px 20px",borderRadius:"4px",fontSize:"12px",cursor:"pointer",marginTop:"8px",fontFamily:"system-ui"}}>
                {t("voir_toutes")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="artistes" style={{background:C.violet,padding:isMobile?"40px 16px":"64px 24px",borderTop:`0.5px solid ${C.prune}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{color:C.mauve,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("artistes_section_label")}</div>
            <h2 style={{color:C.orPale,fontSize:isMobile?"20px":"26px",fontWeight:300,margin:0}}>{t("artistes_section_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:"12px"}}>
            {ARTISTES_SECTION.map((a,i)=>(
              <div key={i} style={{background:C.prune,borderRadius:"4px",padding:isMobile?"16px":"20px",border:`0.5px solid ${C.mauve}20`}}>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                  <div style={{width:"44px",height:"44px",borderRadius:"50%",background:`linear-gradient(135deg, ${a.couleur}40, ${C.or}40)`,border:`0.5px solid ${a.couleur}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:700,color:a.couleur,fontFamily:"system-ui",flexShrink:0}}>{a.initiales}</div>
                  <div>
                    <div style={{color:C.orPale,fontSize:"13px",fontWeight:600}}>{a.nom}</div>
                    <div style={{color:a.couleur,fontSize:"11px",fontFamily:"system-ui",marginTop:"2px"}}>{a.origine} · {a.style}</div>
                  </div>
                </div>
                <div style={{background:`${a.couleur}15`,border:`0.5px solid ${a.couleur}30`,borderRadius:"6px",padding:"8px 12px",marginBottom:"10px"}}>
                  <div style={{color:a.couleur,fontSize:"11px",fontFamily:"system-ui",lineHeight:1.6}}>{a.actu}</div>
                </div>
                {!isMobile&&<div style={{color:C.texteTert,fontSize:"11px",fontFamily:"system-ui",lineHeight:1.6}}>{t("expositions")} : {a.expositions}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:isMobile?"40px 16px":"64px 24px",borderTop:`0.5px solid ${C.prune}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{color:C.mauve,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("pourquoi_label")}</div>
            <h2 style={{color:C.orPale,fontSize:isMobile?"20px":"26px",fontWeight:300,margin:0}}>{t("pourquoi_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)",gap:"2px"}}>
            {pourquoi.map((p,i)=>(
              <div key={i} style={{background:i%2===0?C.violet:C.prune,padding:isMobile?"20px 14px":"28px 20px"}}>
                <div style={{color:C.or,fontSize:"24px",opacity:.6,marginBottom:"10px",fontFamily:"system-ui"}}>{p.icone}</div>
                <div style={{color:C.mauve,fontSize:"10px",fontWeight:700,letterSpacing:".1em",marginBottom:"6px",fontFamily:"system-ui",textTransform:"uppercase"}}>{p.num}</div>
                <div style={{color:C.orPale,fontSize:"12px",fontWeight:400,marginBottom:"6px"}}>{p.titre}</div>
                {!isMobile&&<div style={{color:C.texteSec,fontSize:"11px",lineHeight:1.7,fontFamily:"system-ui"}}>{p.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.violet,padding:isMobile?"36px 16px":"48px 24px",borderTop:`0.5px solid ${C.prune}`}}>
        <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",gap:"12px",marginBottom:"20px"}}>
            <div style={{width:"32px",height:"0.5px",background:C.or,marginTop:"12px"}}/>
            <span style={{color:C.or,fontSize:"28px",fontWeight:300}}>"</span>
            <div style={{width:"32px",height:"0.5px",background:C.or,marginTop:"12px"}}/>
          </div>
          <p style={{color:C.lavande,fontSize:isMobile?"15px":"18px",fontWeight:300,lineHeight:1.7,fontStyle:"italic",margin:"0 0 16px"}}>{t("citation_texte")}</p>
          <div style={{color:C.or,fontSize:"10px",fontFamily:"system-ui",letterSpacing:".2em",textTransform:"uppercase"}}>{t("citation_auteur")}</div>
        </div>
      </section>

      <section id="cercle" style={{padding:isMobile?"48px 16px":"72px 24px",borderTop:`0.5px solid ${C.prune}`}}>
        <div style={{maxWidth:"580px",margin:"0 auto",textAlign:"center"}}>
          <div style={{position:"relative",width:"70px",height:"70px",margin:"0 auto 24px"}}>
            {[70,52,36].map((size,i)=>(
              <div key={i} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:`${size}px`,height:`${size}px`,borderRadius:"50%",border:`0.5px solid ${i===0?C.mauve:C.or}${["30","50","80"][i]}`}}/>
            ))}
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:"18px"}}>✦</div>
          </div>
          <div style={{color:C.mauve,fontSize:"10px",fontWeight:700,letterSpacing:".25em",textTransform:"uppercase",marginBottom:"14px",fontFamily:"system-ui"}}>{t("cercle_label")}</div>
          <h2 style={{color:C.orPale,fontSize:isMobile?"22px":"26px",fontWeight:300,lineHeight:1.3,margin:"0 0 12px"}}>{t("cercle_titre")}</h2>
          <p style={{color:C.texteSec,fontSize:"14px",lineHeight:1.8,margin:"0 0 28px",fontFamily:"system-ui"}}>{t("cercle_desc")}</p>
          <Link href={`/${locale}/kyc`} style={{display:"inline-block",background:C.or,color:C.nuit,padding:"14px 32px",borderRadius:"2px",fontSize:"13px",fontWeight:700,textDecoration:"none",fontFamily:"system-ui",textTransform:"uppercase"}}>
            {t("cercle_btn")}
          </Link>
          <p style={{color:C.texteTert,fontSize:"10px",fontFamily:"system-ui",marginTop:"14px"}}>{t("cercle_note")}</p>
        </div>
      </section>

      <Footer/>
    </main>
  );
}