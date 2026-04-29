"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C={navy:"#1A2E4A",sable:"#D4884A",beige:"#F8F6F1",beigeB:"#E8E2D6",texte:"#111827",texteSec:"#4A5568",blanc:"#FFFFFF"};
const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(<div style={{display:"flex",gap:"4px"}}>{LOCALES.map(l=>(<button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.navy:"transparent",color:locale===l.code?"white":C.texteSec,border:locale===l.code?"none":`1px solid ${C.beigeB}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer"}}>{l.flag} {l.label}</button>))}</div>);
}

function Section({titre,children}:{titre:string;children:React.ReactNode}){
  return(<div style={{marginBottom:"28px"}}><h2 style={{color:C.navy,fontSize:"15px",fontWeight:700,margin:"0 0 10px",paddingBottom:"8px",borderBottom:`1px solid ${C.beigeB}`}}>{titre}</h2><div style={{color:C.texteSec,fontSize:"13px",lineHeight:1.8}}>{children}</div></div>);
}

export default function MentionsLegalesPage(){
  const t=useTranslations("legal");
  const locale=useLocale();
  const {isMobile}=useBreakpoint();
  const m=t.raw("mentions") as any;
  const NAV_LINKS=[{label:t("nav_cgu"),href:`/${locale}/cgu`},{label:t("nav_confidentialite"),href:`/${locale}/confidentialite`},{label:t("nav_contact"),href:`/${locale}/contact`},{label:t("nav_accueil"),href:`/${locale}`}];
  return(
    <main style={{fontFamily:"system-ui",background:C.beige,minHeight:"100vh"}}>
      <nav style={{background:C.beige,borderBottom:`0.5px solid ${C.beigeB}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:"900px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:isMobile?"60px":"64px"}}>
          <Link href={`/${locale}`} style={{textDecoration:"none"}}><LogoNavy size={isMobile?0.7:0.85}/></Link>
          <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
            <LanguageSwitcher/>
            <Link href={`/${locale}`} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>{t("retour")}</Link>
            <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6"/>
          </div>
        </div>
      </nav>
      <section style={{background:C.navy,padding:isMobile?"28px 16px":"40px 24px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{display:"inline-flex",background:C.sable,padding:"3px 14px",borderRadius:"2px",marginBottom:"12px"}}>
            <span style={{color:"white",fontSize:"10px",fontWeight:700,letterSpacing:".15em",textTransform:"uppercase"}}>{m.badge}</span>
          </div>
          <h1 style={{color:"white",fontSize:isMobile?"22px":"28px",fontWeight:800,margin:"0 0 6px",letterSpacing:"-.3px"}}>{m.titre}</h1>
          <p style={{color:"#B8C4D4",fontSize:"13px",margin:0}}>{m.date}</p>
        </div>
      </section>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:isMobile?"20px 16px":"40px 24px"}}>
        <div style={{background:C.blanc,borderRadius:"10px",border:`0.5px solid ${C.beigeB}`,padding:isMobile?"20px 16px":"32px 36px"}}>
          <Section titre={m.s1_titre}>
            <p><strong style={{color:C.texte}}>Raison sociale :</strong> CaribbeanVault SAS</p>
            <p><strong style={{color:C.texte}}>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
            <p><strong style={{color:C.texte}}>Capital social :</strong> En cours de constitution</p>
            <p><strong style={{color:C.texte}}>Siège social :</strong> Guadeloupe, France (DOM)</p>
            <p><strong style={{color:C.texte}}>Email :</strong> contact@geccostrategy.com</p>
            <p><strong style={{color:C.texte}}>Site web :</strong> caribbeanvault.geccostrategy.com</p>
          </Section>
          <Section titre={m.s2_titre}>
            <p><strong style={{color:C.texte}}>Hébergeur :</strong> Vercel Inc.</p>
            <p><strong style={{color:C.texte}}>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p><strong style={{color:C.texte}}>Site :</strong> vercel.com</p>
          </Section>
          <Section titre={m.s3_titre}>
            <p>CaribbeanVault est une plateforme en cours d'enregistrement en tant que Prestataire de Services sur Actifs Numériques (PSAN) auprès de l'Autorité des Marchés Financiers (AMF) française.</p>
            <p style={{marginTop:"10px"}}>Dans l'attente de cet enregistrement, CaribbeanVault opère en phase pilote limitée, dans le respect du cadre réglementaire MiCA applicable dans l'Union Européenne depuis 2024.</p>
            <p style={{marginTop:"10px"}}>Les tokens émis via la plateforme peuvent constituer des instruments financiers au sens de la réglementation MiFID II. Les investisseurs sont invités à consulter un conseiller financier avant tout investissement.</p>
          </Section>
          <Section titre={m.s4_titre}>
            <p>L'ensemble du contenu de ce site est la propriété exclusive de CaribbeanVault SAS et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
            <p style={{marginTop:"10px"}}>Toute reproduction, représentation ou modification est interdite sauf autorisation écrite préalable de CaribbeanVault SAS.</p>
          </Section>
          <Section titre={m.s5_titre}>
            <p>Les informations présentées sur ce site ont un caractère purement informatif et ne constituent en aucun cas un conseil en investissement ou une recommandation financière.</p>
            <p style={{marginTop:"10px"}}><strong style={{color:C.texte}}>Investir dans des actifs numériques ou réels tokenisés comporte des risques, notamment la perte partielle ou totale du capital investi.</strong></p>
          </Section>
          <Section titre={m.s6_titre}>
            <p>Le traitement des données personnelles collectées sur ce site est régi par notre <Link href={`/${locale}/confidentialite`} style={{color:C.sable}}>Politique de Confidentialité</Link>.</p>
            <p style={{marginTop:"10px"}}>Pour exercer vos droits, contactez-nous à : <strong style={{color:C.texte}}>contact@geccostrategy.com</strong></p>
          </Section>
          <Section titre={m.s7_titre}>
            <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie de traçage publicitaire n'est utilisé sans votre consentement préalable.</p>
          </Section>
          <Section titre={m.s8_titre}>
            <p>Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </Section>
        </div>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"20px",flexWrap:"wrap"}}>
          {NAV_LINKS.map(l=>(<Link key={l.label} href={l.href} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>{l.label}</Link>))}
        </div>
      </div>
      <Footer/>
    </main>
  );
}