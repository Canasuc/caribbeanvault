"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { LogoEmeraude } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C={
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

const CarteLeaflet=dynamic(()=>import("@/components/CarteLeaflet"),{ssr:false,loading:()=>(
  <div style={{height:"360px",background:C.cremeV,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",border:`0.5px solid ${C.menthe}40`}}>
    <span style={{color:C.feuille,fontSize:"14px",fontFamily:"system-ui"}}>Chargement de la carte...</span>
  </div>
)});

const TERRITOIRES_AGRI=[
  {id:"guadeloupe",nom:"Guadeloupe",pays:"France (DOM)",drapeau:"🇬🇵",couleur:"#1E2D14",carteImg:"/images/carte-guadeloupe.jpg",sau:"32 000 ha",nbExploitations:"~5 800",certificationsBio:"12% des surfaces",subventions:"FEADER + POSEI UE",eligibiliteBio:"Oui — aides MAE Bio",rendementMoyen:"10-16%",histoire:"La Guadeloupe bénéficie d'un écosystème agricole exceptionnel grâce à la diversité de ses terroirs : sols volcaniques de Basse-Terre pour le café et la banane, plaines fertiles de Grande-Terre pour la canne et l'ananas. Le programme POSEI offre un soutien direct sans équivalent en Europe métropolitaine.",atouts:["Banane IGP protégée depuis 1993","POSEI — soutien DOM exclusif","Café Bonifieur Grand Cru","Aides bio 900€/ha/an"],cultures:["Banane IGP 🍌","Ananas Victoria 🍍","Café Bonifieur ☕","Canne AOC 🌾"],particularites:"La Banane IGP représente 50% des exportations agricoles. Le Café Bonifieur de Vieux-Habitants est l'un des rares grands crus tropicaux reconnus en France.",avantages:["POSEI — soutien direct aux productions traditionnelles","FEADER — cofinancement UE pour agriculture durable","IGP Banane des Antilles — label protégé depuis 1993","Aides à la conversion bio jusqu'à 900€/ha/an"]},
  {id:"martinique",nom:"Martinique",pays:"France (DOM)",drapeau:"🇲🇶",couleur:"#2C1A0A",carteImg:"/images/carte-martinique.jpg",sau:"22 000 ha",nbExploitations:"~3 200",certificationsBio:"9% des surfaces",subventions:"FEADER + POSEI UE",eligibiliteBio:"Oui — aides MAE Bio",rendementMoyen:"13-18%",histoire:"La Martinique est pionnière du cacao fin certifié ICCO. Son cacao Trinitario, cultivé sur les flancs du volcan de la Montagne Pelée, est reconnu par les plus grands chocolatiers mondiaux.",atouts:["Cacao 'Fine Flavour' ICCO","POSEI Martinique dédié","Filière premium en essor","Marché chocolatiers premium"],cultures:["Cacao Fin 🍫","Canne AOC 🌾","Ananas 🍍","Maraîchage 🥬"],particularites:"Le cacao fin de Martinique est classé 'Fine Flavour' par l'ICCO — distinction restreinte à moins de 8% de la production mondiale.",avantages:["Cacao classé 'Fine Flavour' par l'ICCO","POSEI Martinique — enveloppe dédiée hors UE","Filière cacao en pleine structuration","Marché premium — prix 3x supérieur au cacao standard"]},
  {id:"guyane",nom:"Guyane",pays:"France (DOM)",drapeau:"🇬🇫",carteImg:"/images/carte-guyane.jpg",couleur:"#052A20",sau:"8 000 ha cultivés",nbExploitations:"~1 400",certificationsBio:"FSC + REDD+",subventions:"FEADER + REDD+ ONU",eligibiliteBio:"FSC — éligible crédits carbone VCS",rendementMoyen:"10-14% + carbone",histoire:"La Guyane abrite 96% de forêt primaire amazonienne — le plus grand massif forestier tropical d'Europe. La gestion FSC génère un double revenu unique : bois certifié sur marchés premium + crédits carbone REDD+.",atouts:["96% forêt primaire amazonie","Crédits carbone REDD+ ONU","FSC — certification mondiale","FEADER forêt tropicale"],cultures:["Forêt FSC 🌳","Crédits Carbone 🌿","Agroforesterie 🌱","Agriculture vivrière 🌽"],particularites:"Statut unique en Europe : seul territoire français éligible aux crédits carbone REDD+ de l'ONU.",avantages:["96% du territoire en forêt primaire — biodiversité unique","Crédits carbone REDD+ — marché mondial en forte croissance","FSC — certification la plus exigeante au monde","FEADER Guyane — enveloppe spéciale forêt tropicale"]},
];

const PARCELLES=[
  {id:1,slug:"banane-igp-capesterre",culture:"Banane IGP Antilles",producteur:"Coopérative GIPAM",lieu:"Capesterre-Belle-Eau, Guadeloupe",surface:"18 hectares",certification:"IGP Antilles · Agriculture Raisonnée",tokens:160,disponibles:72,rendementEst:"12-16%",duree:"12 mois",recolte:"Juillet 2026",icone:"🍌",tag:"IGP Certifiée",nom:"Banane IGP — Capesterre",ile:"Guadeloupe",region:"Basse-Terre",photo:"https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80",rendementBrut:"12-16%",occupation:"100%",revenuEstime:"Sur 12 mois",prixToken:250,tokensDispo:72,tokensTotal:160,statut:"En levee",tagColor:"#3B6D11",couleur:"#1E2D14",lat:16.04,lng:-61.57},
  {id:2,slug:"cafe-bonifieur-vieux-habitants",culture:"Café Bonifieur",producteur:"Domaine Vanibel",lieu:"Vieux-Habitants, Guadeloupe",surface:"4 hectares",certification:"Grand Cru · Agriculture Biologique",tokens:80,disponibles:18,rendementEst:"15-22%",duree:"14 mois",recolte:"Octobre 2026",icone:"☕",tag:"Grand Cru",nom:"Café Bonifieur — Vieux-Habitants",ile:"Guadeloupe",region:"Basse-Terre",photo:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",rendementBrut:"15-22%",occupation:"100%",revenuEstime:"Sur 14 mois",prixToken:400,tokensDispo:18,tokensTotal:80,statut:"Presque complet",tagColor:"#854F0B",couleur:"#3B2010",lat:15.99,lng:-61.75},
  {id:3,slug:"cacao-fin-martinique",culture:"Cacao Fin de Martinique",producteur:"Plantation Bellevue",lieu:"Le Robert, Martinique",surface:"8 hectares",certification:"Cacao Fin · Bio certifié AB",tokens:100,disponibles:100,rendementEst:"13-18%",duree:"18 mois",recolte:"Décembre 2026",icone:"🍫",tag:"Bio AB",nom:"Cacao Fin — Le Robert",ile:"Martinique",region:"Centre Atlantique",photo:"https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80",rendementBrut:"13-18%",occupation:"100%",revenuEstime:"Sur 18 mois",prixToken:300,tokensDispo:100,tokensTotal:100,statut:"Nouveau",tagColor:"#5A8A3C",couleur:"#2C1A0A",lat:14.68,lng:-60.93},
  {id:4,slug:"foret-fsc-guyane",culture:"Bois Certifié FSC",producteur:"Groupement Forestier Guyane",lieu:"Saint-Laurent-du-Maroni, Guyane",surface:"2400 hectares",certification:"FSC Gestion Durable · Crédits Carbone",tokens:500,disponibles:312,rendementEst:"10-14%",duree:"24 mois",recolte:"Mars 2027",icone:"🌳",tag:"FSC + Carbone",nom:"Forêt FSC — Saint-Laurent",ile:"Guyane",region:"Ouest Guyanais",photo:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",rendementBrut:"10-14%",occupation:"100%",revenuEstime:"Sur 24 mois",prixToken:150,tokensDispo:312,tokensTotal:500,statut:"En levee",tagColor:"#085041",couleur:"#052A20",lat:5.50,lng:-54.03},
  {id:5,slug:"ananas-victoria-le-moule",culture:"Ananas Victoria",producteur:"Famille Montout",lieu:"Le Moule, Guadeloupe",surface:"6 hectares",certification:"Agriculture Raisonnée · Sans pesticides",tokens:60,disponibles:60,rendementEst:"10-14%",duree:"10 mois",recolte:"Juin 2026",icone:"🍍",tag:"Sans pesticides",nom:"Ananas Victoria — Le Moule",ile:"Guadeloupe",region:"Grande-Terre",photo:"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80",rendementBrut:"10-14%",occupation:"100%",revenuEstime:"Sur 10 mois",prixToken:200,tokensDispo:60,tokensTotal:60,statut:"Nouveau",tagColor:"#5A8A3C",couleur:"#2A3A10",lat:16.33,lng:-61.35},
  {id:6,slug:"canne-aoc-longueteau",culture:"Canne à Sucre AOC",producteur:"Distillerie Longueteau",lieu:"Capesterre, Guadeloupe",surface:"45 hectares",certification:"AOC Rhum Agricole · Filière sélective",tokens:200,disponibles:0,rendementEst:"11-15%",duree:"12 mois",recolte:"Mai 2026",icone:"🌾",tag:"AOC",nom:"Canne AOC — Capesterre",ile:"Guadeloupe",region:"Basse-Terre",photo:"https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=400&q=80",rendementBrut:"11-15%",occupation:"100%",revenuEstime:"Sur 12 mois",prixToken:180,tokensDispo:0,tokensTotal:200,statut:"Complet",tagColor:"#C8A84B",couleur:"#3A2A08",lat:16.04,lng:-61.58},
];

const CERTIFICATIONS=[
  {code:"IGP",nom:"Indication Géographique Protégée",desc:"Label européen garantissant l'origine géographique et les méthodes de production traditionnelles des Antilles françaises.",cultures:["Banane des Antilles","Canne à sucre"],color:"#3B6D11",icon:"🇪🇺"},
  {code:"AB",nom:"Agriculture Biologique",desc:"Certification française exigeant l'absence totale de pesticides et engrais chimiques de synthèse. Contrôles annuels par organisme agréé.",cultures:["Café Bonifieur","Cacao Fin"],color:"#5A8A3C",icon:"🌿"},
  {code:"FSC",nom:"Forest Stewardship Council",desc:"Standard international de gestion forestière responsable. Garantit la préservation de la biodiversité et des droits des communautés locales en Guyane.",cultures:["Bois Guyanais"],color:"#085041",icon:"🌳"},
  {code:"AOC",nom:"Appellation d'Origine Contrôlée",desc:"Label le plus strict du droit français. Lie la production à un terroir précis et à des méthodes ancestrales. Seule AOC rhum agricole au monde.",cultures:["Canne à sucre Guadeloupe","Canne à sucre Martinique"],color:"#C8A84B",icon:"⚜️"},
];

const PROCESSUS=[
  {num:"01",titre:"Sélection de la parcelle",desc:"Notre équipe agronome visite chaque exploitation, analyse les sols, évalue les pratiques culturales et vérifie les certifications.",duree:"2-4 semaines",icon:"🔍"},
  {num:"02",titre:"Audit indépendant",desc:"Un expert certifié indépendant réalise un audit complet : état sanitaire des cultures, conformité des certifications, évaluation des risques.",duree:"1-2 semaines",icon:"📋"},
  {num:"03",titre:"Structuration juridique",desc:"Création d'une SPV dédiée pour la récolte. Contrat de financement signé avec le producteur. Mise en place de l'assurance récolte (80%).",duree:"2-3 semaines",icon:"⚖️"},
  {num:"04",titre:"Tokenisation XRPL",desc:"Émission des tokens sur le XRP Ledger. Chaque token représente une fraction de la récolte, avec une valeur de rachat garantie.",duree:"3-5 jours",icon:"⛓️"},
  {num:"05",titre:"Levée de fonds",desc:"Ouverture de la souscription aux investisseurs qualifiés. Suivi en temps réel de l'avancement. Clôture à 100% ou à échéance.",duree:"4-8 semaines",icon:"💰"},
  {num:"06",titre:"Suivi & récolte",desc:"Rapports mensuels avec photos et données de terrain. À maturité, la récolte est vendue aux meilleurs acheteurs et distribuée.",duree:"10-24 mois",icon:"🌾"},
];

const TEMOIGNAGES=[
  {nom:"Jean-Pierre Montout",role:"Producteur d'ananas Victoria",lieu:"Le Moule, Guadeloupe",texte:"CaribbeanVault m'a permis de financer mon expansion sans passer par la banque. Le processus est transparent, l'équipe comprend nos réalités agricoles.",icone:"🍍",couleur:C.foret},
  {nom:"Marie-Claire Vanibel",role:"Maîtresse de cave, Domaine Vanibel",lieu:"Vieux-Habitants, Guadeloupe",texte:"Le café Bonifieur est le trésor caché de la Guadeloupe. Grâce à la tokenisation, j'ai pu rénover mes séchoirs et payer mes cueilleurs au juste prix.",icone:"☕",couleur:"#3B2010"},
  {nom:"Édouard Bellevue",role:"Cacaoculteur, 3ème génération",lieu:"Le Robert, Martinique",texte:"On luttait depuis des années pour faire connaître notre cacao fin. CaribbeanVault nous a apporté la visibilité internationale que nous cherchions.",icone:"🍫",couleur:"#2C1A0A"},
];

const VALEURS=[
  {icone:"🌱",titre:"Traçabilité totale",desc:"Chaque token est lié à une parcelle géolocalisée. Photos, rapports de récolte et analyses de sol disponibles dans votre espace."},
  {icone:"🤝",titre:"Impact direct",desc:"Vous financez directement des producteurs caribéens indépendants, sans intermédiaire bancaire."},
  {icone:"🌿",titre:"Agriculture durable",desc:"Seules les exploitations certifiées Bio, IGP, FSC ou Agriculture Raisonnée sont acceptées sur la plateforme."},
  {icone:"💧",titre:"Force majeure protégée",desc:"En cas de catastrophe climatique, une assurance récolte couvre jusqu'à 80% de la valeur des tokens concernés."},
];

const CALENDRIER=[
  {mois:"Jan-Fév",label:"Sélection des parcelles",color:C.foret},
  {mois:"Mar-Avr",label:"Levée de fonds",color:C.vert},
  {mois:"Mai-Nov",label:"Croissance & suivi",color:C.feuille},
  {mois:"Déc",label:"Récolte & distribution",color:C.pailleC},
];

const BIENS_LEAFLET=PARCELLES.map(p=>({
  id:p.id,nom:p.nom,ile:p.ile,region:p.region,photo:p.photo,type:p.culture,
  tag:p.tag,tagColor:p.tagColor,rendementBrut:p.rendementBrut,occupation:p.occupation,
  revenuEstime:p.revenuEstime,prixToken:p.prixToken,tokensDispo:p.tokensDispo,
  tokensTotal:p.tokensTotal,statut:p.statut,couleur:p.couleur,adresse:p.lieu,
  coordonnees:{lat:p.lat,lng:p.lng},
}));

export default function AgriculturePage(){
  const t=useTranslations("agri");
  const locale=useLocale();
  const [filtre,setFiltre]=useState<"tous"|"guadeloupe"|"martinique"|"guyane"|"bio">("tous");
  const [territoireOuvert,setTerritoireOuvert]=useState<string|null>(null);
  const [hovered,setHovered]=useState<number|null>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const {isMobile,isTablet}=useBreakpoint();

  function toggleTerritoire(id:string){setTerritoireOuvert(territoireOuvert===id?null:id);}
  function handleFilter(id:string){setFiltre(id as typeof filtre);setTimeout(()=>{document.getElementById("parcelles")?.scrollIntoView({behavior:"smooth"});},100);}

  const STATUTS_STYLES:Record<string,{bg:string;color:string}>={
    "En levee":{bg:C.cremeV,color:"#3B6D11"},
    "Presque complet":{bg:"#FAEEDA",color:"#854F0B"},
    "Nouveau":{bg:"#E6F1FB",color:"#0C447C"},
    "Complet":{bg:"#F1EFE8",color:"#444441"},
  };

function StatutBadge({statut}:{statut:string}){
  const s=STATUTS_STYLES[statut]||STATUTS_STYLES["En levee"];
  const key = `statuts.${statut}` as Parameters<typeof t>[0];
  return(<span style={{background:s.bg,color:s.color,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"2px",letterSpacing:".08em",textTransform:"uppercase"}}>{t(key)}</span>);
}

  function TerritoireCard({territoire,isOpen,onToggle,onFilter,parcellesCount,parcellesDispos}:{territoire:typeof TERRITOIRES_AGRI[0];isOpen:boolean;onToggle:()=>void;onFilter:()=>void;parcellesCount:number;parcellesDispos:number}){
    return(
      <div style={{background:"white",borderRadius:"12px",overflow:"hidden",border:isOpen?`2px solid ${C.pailleC}`:`0.5px solid #D5CCBA`,cursor:"pointer",transition:"all .2s"}}>
        <div onClick={onToggle} style={{background:territoire.couleur,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",overflow:"hidden",minHeight:"80px"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:"35%",overflow:"hidden"}}>
            <div style={{position:"relative",width:"100%",height:"100%"}}>
              <Image src={territoire.carteImg} alt={territoire.nom} fill sizes="200px" style={{objectFit:"cover",opacity:.35}}/>
            </div>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(to right, transparent 0%, ${territoire.couleur} 70%)`}}/>
          </div>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontSize:"22px",marginBottom:"4px"}}>{territoire.drapeau}</div>
            <div style={{color:"white",fontSize:isMobile?"16px":"18px",fontWeight:700}}>{territoire.nom}</div>
            <div style={{color:"rgba(255,255,255,.65)",fontSize:"10px",marginTop:"2px",fontFamily:"system-ui"}}>{territoire.pays}</div>
          </div>
          <div style={{textAlign:"right",position:"relative",zIndex:1}}>
            <div style={{color:"rgba(255,255,255,.75)",fontSize:"10px",marginBottom:"2px",fontFamily:"system-ui"}}>{t("rendement_moyen")}</div>
            <div style={{color:C.paille,fontSize:"18px",fontWeight:800}}>{territoire.rendementMoyen}</div>
          </div>
        </div>
        <div style={{padding:"10px 20px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px",borderBottom:"0.5px solid #E8E2D6"}}>
          {[{label:t("surface_agri"),val:territoire.sau},{label:t("exploitations"),val:territoire.nbExploitations},{label:t("parcelles_dispos"),val:`${parcellesDispos}/${parcellesCount}`}].map((m,j)=>(
            <div key={j}>
              <div style={{color:C.texteTert,fontSize:"9px",textTransform:"uppercase",fontFamily:"system-ui"}}>{m.label}</div>
              <div style={{color:C.texte,fontSize:"11px",fontWeight:600,marginTop:"2px",fontFamily:"system-ui"}}>{m.val}</div>
            </div>
          ))}
        </div>
        {isOpen&&(
          <div style={{padding:"16px 20px"}}>
            <p style={{color:C.texteSec,fontSize:"13px",lineHeight:1.7,margin:"0 0 14px",fontFamily:"system-ui"}}>{territoire.histoire}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
              {territoire.atouts.map((a,k)=>(
                <span key={k} style={{background:C.cremeV,color:C.feuille,fontSize:"10px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,fontFamily:"system-ui"}}>{a}</span>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",marginBottom:"14px"}}>
              {[{label:t("subventions"),val:territoire.subventions},{label:t("eligibilite_bio"),val:territoire.eligibiliteBio},{label:t("bio_fsc"),val:territoire.certificationsBio},{label:t("rendement"),val:territoire.rendementMoyen}].map((s,i)=>(
                <div key={i} style={{background:C.terre,borderRadius:"6px",padding:"8px 10px"}}>
                  <div style={{color:C.texteTert,fontSize:"9px",textTransform:"uppercase",letterSpacing:".08em",marginBottom:"2px",fontFamily:"system-ui"}}>{s.label}</div>
                  <div style={{color:C.texte,fontSize:"11px",fontWeight:600,fontFamily:"system-ui"}}>{s.val}</div>
                </div>
              ))}
            </div>
            <div style={{background:C.cremeV,borderRadius:"6px",padding:"10px 14px",marginBottom:"14px",border:`0.5px solid ${C.feuille}30`}}>
              <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:"4px",fontFamily:"system-ui"}}>{t("a_savoir")}</div>
              <div style={{color:C.texteSec,fontSize:"12px",fontFamily:"system-ui",lineHeight:1.6}}>{territoire.particularites}</div>
            </div>
            <div style={{marginBottom:"14px"}}>
              {territoire.avantages.map((a,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"6px",marginBottom:"5px"}}>
                  <span style={{color:C.feuille,fontSize:"12px",flexShrink:0}}>✓</span>
                  <span style={{color:C.texteSec,fontSize:"12px",fontFamily:"system-ui"}}>{a}</span>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"14px"}}>
              {territoire.cultures.map((c,i)=>(
                <span key={i} style={{background:C.terreB,color:C.texteSec,fontSize:"11px",padding:"4px 10px",borderRadius:"20px",fontFamily:"system-ui"}}>{c}</span>
              ))}
            </div>
            <button onClick={(e)=>{e.stopPropagation();onFilter();}}
              style={{background:territoire.couleur,color:C.paille,border:"none",padding:"10px 18px",borderRadius:"4px",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
              {t("voir_parcelles")} {territoire.nom} →
            </button>
          </div>
        )}
        {!isOpen&&(
          <div onClick={onToggle} style={{padding:"10px 20px",color:C.feuille,fontSize:"11px",fontWeight:600,fontFamily:"system-ui"}}>
            {t("voir_contexte")}
          </div>
        )}
      </div>
    );
  }

  const filtrees=PARCELLES.filter(p=>{
    if(filtre==="guadeloupe")return p.lieu.includes("Guadeloupe");
    if(filtre==="martinique")return p.lieu.includes("Martinique");
    if(filtre==="guyane")return p.lieu.includes("Guyane");
    if(filtre==="bio")return p.certification.includes("Bio")||p.certification.includes("FSC");
    return true;
  });

  const cols=isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(3, 1fr)";

  const NAV_LINKS=[
    {label:t("nav_territoires"),href:"#territoires"},
    {label:t("nav_parcelles"),href:"#parcelles"},
    {label:t("nav_certifications"),href:"#certifications"},
    {label:t("nav_processus"),href:"#processus"},
  ];

  const STATS_DATA=[
    {val:t("stats.val1"),label:t("stats.label1")},
    {val:t("stats.val2"),label:t("stats.label2")},
    {val:t("stats.val3"),label:t("stats.label3")},
    {val:t("stats.val4"),label:t("stats.label4")},
  ];

  return(
    <main style={{fontFamily:"Georgia, 'Times New Roman', serif",background:C.terre,minHeight:"100vh"}}>

      <nav style={{background:C.foret,borderBottom:`0.5px solid ${C.vert}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}>
            <LogoEmeraude size={isMobile?0.6:0.7}/>
          </Link>
          {!isMobile&&(
            <div style={{display:"flex",gap:"24px",alignItems:"center"}}>
              {NAV_LINKS.map(l=>(
                <a key={l.label} href={l.href} style={{color:C.menthe,fontSize:"11px",cursor:"pointer",fontFamily:"system-ui",opacity:.8,textDecoration:"none"}}>{l.label}</a>
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
                {[0,1,2].map(i=><div key={i} style={{width:"20px",height:"2px",background:C.paille,borderRadius:"2px"}}/>)}
              </button>
            </div>
          )}
        </div>
        {isMobile&&menuOpen&&(
          <div style={{background:C.foret,borderTop:`0.5px solid ${C.vert}`,padding:"8px 16px"}}>
            {NAV_LINKS.map(l=>(
              <a key={l.label} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:"block",color:C.menthe,fontSize:"14px",fontFamily:"system-ui",textDecoration:"none",padding:"12px 0",borderBottom:`0.5px solid ${C.vert}50`}}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <section style={{background:C.noir,padding:"0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 30% 60%, ${C.feuille}20 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, ${C.paille}15 0%, transparent 45%)`}}/>
        <div style={{maxWidth:"1100px",margin:"0 auto",padding:isMobile?"48px 16px 36px":"80px 24px 56px",position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",border:`0.5px solid ${C.feuille}`,padding:"4px 14px",borderRadius:"1px",marginBottom:"16px"}}>
            <span style={{color:C.menthe,fontSize:"10px",letterSpacing:".15em",textTransform:"uppercase",fontFamily:"system-ui"}}>{t("hero_badge")}</span>
          </div>
          <h1 style={{color:C.terreB,fontSize:isMobile?"28px":"clamp(28px, 4.5vw, 54px)",fontWeight:300,lineHeight:1.2,margin:"0 0 6px"}}>{t("hero_titre1")}</h1>
          <h1 style={{color:C.paille,fontSize:isMobile?"28px":"clamp(28px, 4.5vw, 54px)",fontWeight:400,lineHeight:1.2,margin:"0 0 20px",fontStyle:"italic"}}>{t("hero_titre2")}</h1>
          <p style={{color:C.menthe,fontSize:isMobile?"13px":"15px",lineHeight:1.9,maxWidth:"540px",margin:"0 0 28px",fontFamily:"system-ui",opacity:.9}}>{t("hero_desc")}</p>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
            <a href="#territoires" style={{background:C.feuille,color:"white",padding:isMobile?"11px 20px":"13px 28px",borderRadius:"2px",fontSize:"13px",fontWeight:700,textDecoration:"none",fontFamily:"system-ui"}}>{t("hero_cta1")}</a>
            <a href="#processus" style={{background:"transparent",color:C.paille,border:`1px solid ${C.feuille}`,padding:isMobile?"11px 20px":"13px 28px",borderRadius:"2px",fontSize:"13px",fontFamily:"system-ui",textDecoration:"none"}}>{t("hero_cta2")}</a>
          </div>
        </div>
        <div style={{background:C.foret,borderTop:`1px solid ${C.vert}50`}}>
          <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"repeat(2, 1fr)":"repeat(4, 1fr)"}}>
            {STATS_DATA.map((s,i)=>(
              <div key={i} style={{textAlign:"center",padding:isMobile?"12px 8px":"18px 12px",borderRight:isMobile?(i%2===0?`0.5px solid ${C.vert}40`:"none"):(i<3?`0.5px solid ${C.vert}40`:"none"),borderBottom:isMobile&&i<2?`0.5px solid ${C.vert}40`:"none"}}>
                <div style={{color:C.paille,fontSize:isMobile?"16px":"20px",fontWeight:700}}>{s.val}</div>
                <div style={{color:C.menthe,fontSize:"9px",letterSpacing:".07em",textTransform:"uppercase",marginTop:"2px",fontFamily:"system-ui"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.blanc,padding:isMobile?"40px 16px":"64px 24px",borderBottom:`0.5px solid ${C.terreB}`}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"24px"}}>
            <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px",fontFamily:"system-ui"}}>{t("carte_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:400,margin:"0 0 8px"}}>{t("carte_titre")}</h2>
          </div>
          <CarteLeaflet biens={BIENS_LEAFLET as never} onBienClick={()=>{document.getElementById("parcelles")?.scrollIntoView({behavior:"smooth"});}}/>
          <div style={{display:"flex",gap:"16px",marginTop:"12px",flexWrap:"wrap"}}>
            {[{color:C.feuille,label:t("legende_dispo")},{color:"#9CA3AF",label:t("legende_complet")}].map((l,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",color:C.texteSec,fontFamily:"system-ui"}}>
                <div style={{width:"10px",height:"10px",borderRadius:"50%",background:l.color}}/>{l.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="territoires" style={{padding:isMobile?"48px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"28px"}}>
            <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px",fontFamily:"system-ui"}}>{t("territoires_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"22px":"28px",fontWeight:400,margin:"0 0 6px"}}>{t("territoires_titre")}</h2>
            {!isMobile&&<p style={{color:C.texteSec,fontSize:"13px",fontFamily:"system-ui",margin:0}}>{t("territoires_desc")}</p>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2, 1fr)",gap:"14px"}}>
            {TERRITOIRES_AGRI.map(terr=>{
              const pT=PARCELLES.filter(p=>p.lieu.includes(terr.nom));
              const pD=pT.filter(p=>p.disponibles>0).length;
              return(<TerritoireCard key={terr.id} territoire={terr} isOpen={territoireOuvert===terr.id} onToggle={()=>toggleTerritoire(terr.id)} onFilter={()=>handleFilter(terr.id)} parcellesCount={pT.length} parcellesDispos={pD}/>);
            })}
          </div>
          <div style={{marginTop:"14px",padding:"14px 20px",background:"white",borderRadius:"12px",border:`0.5px solid #D5CCBA`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"10px"}}>
            <div>
              <div style={{color:C.texte,fontSize:"13px",fontWeight:600,marginBottom:"2px",fontFamily:"system-ui"}}>{t("expansion_titre")}</div>
              <div style={{color:C.texteSec,fontSize:"12px",fontFamily:"system-ui"}}>{t("expansion_desc")}</div>
            </div>
            <span style={{background:C.cremeV,color:C.feuille,fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"20px",whiteSpace:"nowrap",fontFamily:"system-ui"}}>{t("bientot")}</span>
          </div>
        </div>
      </section>

      <section id="parcelles" style={{padding:isMobile?"40px 16px":"64px 24px",background:C.terreB}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{marginBottom:"24px"}}>
            <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px",fontFamily:"system-ui"}}>{t("parcelles_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:400,margin:"0 0 16px"}}>{t("parcelles_titre")}</h2>
            <div style={{display:"flex",gap:"6px",flexWrap:"wrap",fontFamily:"system-ui"}}>
              {([{key:"tous",label:t("filtre_tous")},{key:"guadeloupe",label:"🇬🇵 Guadeloupe"},{key:"martinique",label:"🇲🇶 Martinique"},{key:"guyane",label:"🇬🇫 Guyane"},{key:"bio",label:t("filtre_bio")}] as {key:typeof filtre;label:string}[]).map(f=>(
                <button key={f.key} onClick={()=>setFiltre(f.key)} style={{padding:"5px 12px",borderRadius:"2px",cursor:"pointer",fontSize:"11px",fontWeight:600,border:filtre===f.key?`1.5px solid ${C.feuille}`:`1px solid #C5BB9C`,background:filtre===f.key?C.foret:C.blanc,color:filtre===f.key?C.menthe:C.texteSec,transition:"all .15s"}}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:cols,gap:"14px"}}>
            {filtrees.map(p=>{
              const pct=Math.round(((p.tokens-p.disponibles)/p.tokens)*100);
              const complet=p.disponibles===0;
              return(
                <div key={p.id} onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
                  style={{background:C.blanc,borderRadius:"4px",overflow:"hidden",borderTop:hovered===p.id?`1.5px solid ${C.feuille}`:`1px solid #D5CCBA`,borderRight:hovered===p.id?`1.5px solid ${C.feuille}`:`1px solid #D5CCBA`,borderBottom:hovered===p.id?`1.5px solid ${C.feuille}`:`1px solid #D5CCBA`,borderLeft:`3px solid ${p.tagColor}`,transition:"all .2s",opacity:complet?.65:1,transform:hovered===p.id&&!complet?"translateY(-3px)":"none"}}>
                  <div style={{background:C.foret,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontSize:"20px"}}>{p.icone}</span>
                      <div>
                        <div style={{color:C.paille,fontSize:"12px",fontWeight:700,fontFamily:"system-ui"}}>{p.culture}</div>
                        <div style={{color:C.menthe,fontSize:"10px",fontFamily:"system-ui",opacity:.8}}>{p.producteur}</div>
                      </div>
                    </div>
                    <StatutBadge statut={p.statut}/>
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"4px",marginBottom:"6px"}}>
                      <span style={{fontSize:"10px"}}>📍</span>
                      <span style={{color:C.texteSec,fontSize:"10px",fontFamily:"system-ui"}}>{p.lieu}</span>
                    </div>
                    <div style={{display:"flex",gap:"6px",marginBottom:"8px",flexWrap:"wrap"}}>
                      <span style={{background:C.cremeV,color:p.tagColor,fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"2px",fontFamily:"system-ui"}}>{p.tag}</span>
                      <span style={{background:C.terreB,color:C.texteSec,fontSize:"9px",padding:"2px 8px",borderRadius:"2px",fontFamily:"system-ui"}}>{p.surface}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"6px",marginBottom:"10px"}}>
                      {[{label:t("rendement_label"),val:p.rendementEst},{label:t("duree_label"),val:p.duree},{label:t("token_label"),val:`${p.prixToken}€`}].map(m=>(
                        <div key={m.label} style={{background:C.terre,borderRadius:"3px",padding:"6px 4px",textAlign:"center"}}>
                          <div style={{color:C.texte,fontSize:"12px",fontWeight:700,fontFamily:"system-ui"}}>{m.val}</div>
                          <div style={{color:C.texteTert,fontSize:"9px",fontFamily:"system-ui",marginTop:"1px"}}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{background:C.cremeV,borderRadius:"3px",padding:"7px 10px",marginBottom:"10px",display:"flex",justifyContent:"space-between"}}>
                      <span style={{color:C.texteSec,fontSize:"11px",fontFamily:"system-ui"}}>{t("recolte_label")}</span>
                      <span style={{color:C.feuille,fontSize:"11px",fontWeight:700,fontFamily:"system-ui"}}>{p.recolte}</span>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
                        <span style={{color:C.texteTert,fontSize:"10px",fontFamily:"system-ui"}}>{t("levee_label")}</span>
                        <span style={{color:C.feuille,fontSize:"10px",fontWeight:700,fontFamily:"system-ui"}}>{pct}%</span>
                      </div>
                      <div style={{background:C.terreB,borderRadius:"2px",height:"4px"}}>
                        <div style={{background:pct>=95?"#A32D2D":C.feuille,height:"100%",borderRadius:"2px",width:`${pct}%`}}/>
                      </div>
                    </div>
                    {complet?(
                      <div style={{background:C.terre,color:C.texteTert,padding:"9px",borderRadius:"2px",fontSize:"11px",textAlign:"center",fontFamily:"system-ui"}}>{t("complet_label")}</div>
                    ):(
                      <Link href={`/${locale}/agriculture/${p.slug}`} style={{display:"block",background:C.foret,color:C.paille,padding:"9px",borderRadius:"2px",fontSize:"12px",textAlign:"center",fontWeight:700,textDecoration:"none",fontFamily:"system-ui",border:`1px solid ${C.paille}30`}}>
                        {t("decouvrir")}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {filtrees.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",background:C.blanc,borderRadius:"8px",border:`1px solid #D5CCBA`}}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>🌿</div>
              <div style={{color:C.texte,fontSize:"15px",fontWeight:600,marginBottom:"6px",fontFamily:"system-ui"}}>{t("aucune_parcelle")}</div>
              <button onClick={()=>setFiltre("tous")} style={{background:C.feuille,color:"white",border:"none",padding:"10px 20px",borderRadius:"4px",fontSize:"12px",cursor:"pointer",marginTop:"8px",fontFamily:"system-ui"}}>
                {t("voir_toutes")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="certifications" style={{background:C.blanc,padding:isMobile?"40px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("certif_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:300,margin:"0 0 8px"}}>{t("certif_titre")}</h2>
            {!isMobile&&<p style={{color:C.texteSec,fontSize:"13px",fontFamily:"system-ui"}}>{t("certif_desc")}</p>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(4, 1fr)",gap:"14px"}}>
            {CERTIFICATIONS.map((c,i)=>(
              <div key={i} style={{background:C.terre,borderRadius:"6px",padding:isMobile?"18px":"24px",borderTop:`3px solid ${c.color}`,border:`0.5px solid #D5CCBA`,borderTopWidth:"3px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                  <span style={{fontSize:"28px"}}>{c.icon}</span>
                  <div>
                    <div style={{background:c.color,color:"white",fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"2px",fontFamily:"system-ui",letterSpacing:".1em",display:"inline-block",marginBottom:"4px"}}>{c.code}</div>
                    <div style={{color:C.texte,fontSize:"12px",fontWeight:700,fontFamily:"system-ui"}}>{c.nom}</div>
                  </div>
                </div>
                <p style={{color:C.texteSec,fontSize:"12px",lineHeight:1.7,margin:"0 0 12px",fontFamily:"system-ui"}}>{c.desc}</p>
                <div style={{borderTop:`0.5px solid ${C.terreB}`,paddingTop:"10px"}}>
                  <div style={{color:C.texteTert,fontSize:"10px",textTransform:"uppercase",letterSpacing:".08em",marginBottom:"4px",fontFamily:"system-ui"}}>{t("cultures_certif")}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>
                    {c.cultures.map((cult,j)=>(
                      <span key={j} style={{background:`${c.color}15`,color:c.color,fontSize:"9px",padding:"2px 8px",borderRadius:"2px",fontFamily:"system-ui",fontWeight:600}}>{cult}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="processus" style={{background:C.vert,padding:isMobile?"40px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{color:C.paille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("processus_label")}</div>
            <h2 style={{color:C.terreB,fontSize:isMobile?"20px":"26px",fontWeight:300,margin:0}}>{t("processus_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"repeat(2, 1fr)":"repeat(3, 1fr)",gap:"14px"}}>
            {PROCESSUS.map((p,i)=>(
              <div key={i} style={{background:i%2===0?C.foret:C.noir,borderRadius:"4px",padding:isMobile?"18px":"24px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                  <span style={{fontSize:"24px"}}>{p.icon}</span>
                  <div style={{color:C.paille,fontSize:"22px",fontWeight:700,opacity:.4,fontFamily:"Georgia, serif"}}>{p.num}</div>
                </div>
                <div style={{color:C.paille,fontSize:"12px",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:"8px",fontFamily:"system-ui"}}>{p.titre}</div>
                <div style={{color:C.menthe,fontSize:"12px",lineHeight:1.7,opacity:.9,marginBottom:"12px",fontFamily:"system-ui"}}>{p.desc}</div>
                <div style={{display:"inline-flex",background:`${C.feuille}30`,color:C.menthe,fontSize:"10px",fontWeight:600,padding:"3px 10px",borderRadius:"2px",fontFamily:"system-ui"}}>⏱ {p.duree}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.foret,padding:isMobile?"36px 16px":"48px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"24px"}}>
            <div style={{color:C.paille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"8px",fontFamily:"system-ui"}}>{t("calendrier_label")}</div>
            <h2 style={{color:C.terreB,fontSize:isMobile?"18px":"22px",fontWeight:300,margin:0}}>{t("calendrier_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)",gap:"2px"}}>
            {CALENDRIER.map((c,i)=>(
              <div key={i} style={{background:c.color,padding:isMobile?"16px 12px":"22px 18px"}}>
                <div style={{color:C.paille,fontSize:"11px",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",marginBottom:"6px",fontFamily:"system-ui"}}>{c.mois}</div>
                <div style={{color:C.terreB,fontSize:isMobile?"12px":"14px",fontWeight:300}}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.terre,padding:isMobile?"40px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"36px"}}>
            <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("temoignages_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"26px",fontWeight:300,margin:0}}>{t("temoignages_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3, 1fr)",gap:"16px"}}>
            {TEMOIGNAGES.map((tm,i)=>(
              <div key={i} style={{background:C.blanc,borderRadius:"6px",overflow:"hidden",border:`0.5px solid #D5CCBA`}}>
                <div style={{background:tm.couleur,padding:"16px",display:"flex",alignItems:"center",gap:"12px"}}>
                  <span style={{fontSize:"28px"}}>{tm.icone}</span>
                  <div>
                    <div style={{color:C.paille,fontSize:"13px",fontWeight:700}}>{tm.nom}</div>
                    <div style={{color:C.menthe,fontSize:"10px",fontFamily:"system-ui",opacity:.8}}>{tm.role}</div>
                    <div style={{color:C.menthe,fontSize:"9px",fontFamily:"system-ui",opacity:.6,marginTop:"2px"}}>📍 {tm.lieu}</div>
                  </div>
                </div>
                <div style={{padding:"18px"}}>
                  <div style={{color:C.feuille,fontSize:"20px",marginBottom:"8px",lineHeight:1}}>{'"'}</div>
                  <p style={{color:C.texteSec,fontSize:"13px",lineHeight:1.8,margin:0,fontFamily:"system-ui",fontStyle:"italic"}}>{tm.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{background:C.terreB,padding:isMobile?"40px 16px":"64px 24px"}}>
        <div style={{maxWidth:"1100px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <div style={{color:C.feuille,fontSize:"10px",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",marginBottom:"10px",fontFamily:"system-ui"}}>{t("valeurs_label")}</div>
            <h2 style={{color:C.texte,fontSize:isMobile?"20px":"24px",fontWeight:300,margin:0}}>{t("valeurs_titre")}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)",gap:"12px"}}>
            {VALEURS.map((v,i)=>(
              <div key={i} style={{background:C.blanc,borderRadius:"4px",padding:isMobile?"16px":"22px 18px",border:`0.5px solid #D5CCBA`,borderTop:`2px solid ${C.feuille}`}}>
                <div style={{fontSize:"20px",marginBottom:"10px"}}>{v.icone}</div>
                <div style={{color:C.texte,fontSize:"12px",fontWeight:700,marginBottom:"6px",fontFamily:"system-ui"}}>{v.titre}</div>
                {!isMobile&&<div style={{color:C.texteSec,fontSize:"11px",lineHeight:1.7,fontFamily:"system-ui"}}>{v.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="famille" style={{background:C.foret,padding:isMobile?"48px 16px":"72px 24px"}}>
        <div style={{maxWidth:"640px",margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"20px"}}>
            {["🌿","🍃","🌾","🍃","🌿"].map((e,i)=>(
              <span key={i} style={{fontSize:"18px",opacity:.6+i*.08}}>{e}</span>
            ))}
          </div>
          <div style={{color:C.paille,fontSize:"10px",fontWeight:700,letterSpacing:".25em",textTransform:"uppercase",marginBottom:"14px",fontFamily:"system-ui"}}>{t("rejoindre_label")}</div>
          <h2 style={{color:C.terreB,fontSize:isMobile?"22px":"26px",fontWeight:300,lineHeight:1.3,margin:"0 0 12px"}}>{t("rejoindre_titre")}</h2>
          <p style={{color:C.menthe,fontSize:"14px",lineHeight:1.8,margin:"0 0 28px",fontFamily:"system-ui",opacity:.9}}>{t("rejoindre_desc")}</p>
          <Link href={`/${locale}/kyc`} style={{display:"inline-block",background:C.feuille,color:"white",padding:"14px 32px",borderRadius:"2px",fontSize:"13px",fontWeight:700,textDecoration:"none",fontFamily:"system-ui"}}>
            {t("rejoindre_btn")}
          </Link>
          <p style={{color:`${C.menthe}50`,fontSize:"10px",fontFamily:"system-ui",marginTop:"14px"}}>{t("rejoindre_note")}</p>
        </div>
      </section>

      <Footer/>
    </main>
  );
}