"use client";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C={navy:"#1A2E4A",sable:"#D4884A",beige:"#F8F6F1",beigeB:"#E8E2D6",texte:"#111827",texteSec:"#4A5568",texteTert:"#9CA3AF",blanc:"#FFFFFF"};
const LOCALES=[{code:"fr",label:"FR",flag:"🇫🇷"},{code:"en",label:"EN",flag:"🇬🇧"},{code:"es",label:"ES",flag:"🇪🇸"}];

function LanguageSwitcher(){
  const locale=useLocale();const router=useRouter();const pathname=usePathname();
  function switchLocale(l:string){const s=pathname.split("/");s[1]=l;router.push(s.join("/"));}
  return(<div style={{display:"flex",gap:"4px"}}>{LOCALES.map(l=>(<button key={l.code} onClick={()=>switchLocale(l.code)} style={{background:locale===l.code?C.navy:"transparent",color:locale===l.code?"white":C.texteSec,border:locale===l.code?"none":`1px solid ${C.beigeB}`,borderRadius:"4px",padding:"3px 8px",fontSize:"10px",fontWeight:700,cursor:"pointer"}}>{l.flag} {l.label}</button>))}</div>);
}

function Section({titre,children}:{titre:string;children:React.ReactNode}){
  return(<div style={{marginBottom:"28px"}}><h2 style={{color:C.navy,fontSize:"15px",fontWeight:700,margin:"0 0 10px",paddingBottom:"8px",borderBottom:`1px solid ${C.beigeB}`}}>{titre}</h2><div style={{color:C.texteSec,fontSize:"13px",lineHeight:1.8}}>{children}</div></div>);
}

interface CguData {
  badge: string; titre: string; date: string; important: string;
  s1_titre: string; s1: string;
  s2_titre: string; s2: string;
  s3_titre: string; s3_intro: string; s3_items: string[];
  s4_titre: string; s4_intro: string; s4_items: string[];
  s5_titre: string; s5_intro: string; s5_items: string[]; s5_note: string;
  s6_titre: string; s6_intro: string; s6_items: string[];
  s7_titre: string; s7: string;
  s8_titre: string; s8_items: string[];
  s9_titre: string; s9: string;
  s10_titre: string; s10: string;
}
export default function CGUPage(){
  const t=useTranslations("legal");
  const locale=useLocale();
  const {isMobile}=useBreakpoint();
  const cgu = t.raw("cgu") as CguData;
  const NAV_LINKS=[{label:t("nav_mentions"),href:`/${locale}/mentions-legales`},{label:t("nav_confidentialite"),href:`/${locale}/confidentialite`},{label:t("nav_contact"),href:`/${locale}/contact`},{label:t("nav_accueil"),href:`/${locale}`}];
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
            <span style={{color:"white",fontSize:"10px",fontWeight:700,letterSpacing:".15em",textTransform:"uppercase"}}>{cgu.badge}</span>
          </div>
          <h1 style={{color:"white",fontSize:isMobile?"22px":"28px",fontWeight:800,margin:"0 0 6px",letterSpacing:"-.3px"}}>{cgu.titre}</h1>
          <p style={{color:"#B8C4D4",fontSize:"13px",margin:0}}>{cgu.date}</p>
        </div>
      </section>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:isMobile?"20px 16px":"40px 24px"}}>
        <div style={{background:C.blanc,borderRadius:"10px",border:`0.5px solid ${C.beigeB}`,padding:isMobile?"20px 16px":"32px 36px"}}>
          <div style={{background:"#FFFBEB",border:"1px solid #FCD34D44",borderRadius:"8px",padding:"12px 16px",marginBottom:"24px"}}>
            <p style={{color:"#92400E",fontSize:"12px",lineHeight:1.7,margin:0}}><strong>Important :</strong> {cgu.important}</p>
          </div>
          <Section titre={cgu.s1_titre}><p>{cgu.s1}</p></Section>
          <Section titre={cgu.s2_titre}><p>{cgu.s2}</p></Section>
          <Section titre={cgu.s3_titre}><p>{cgu.s3_intro}</p><ul style={{paddingLeft:"20px",marginTop:"8px"}}>{(cgu.s3_items as string[]).map((item:string,i:number)=><li key={i} style={{marginBottom:"5px"}}>{item}</li>)}</ul></Section>
          <Section titre={cgu.s4_titre}><p>{cgu.s4_intro}</p><ul style={{paddingLeft:"20px",marginTop:"8px"}}>{(cgu.s4_items as string[]).map((item:string,i:number)=><li key={i} style={{marginBottom:"5px"}}>{item}</li>)}</ul></Section>
          <Section titre={cgu.s5_titre}><p><strong style={{color:C.texte}}>{cgu.s5_intro}</strong></p><ul style={{paddingLeft:"20px",marginTop:"8px"}}>{(cgu.s5_items as string[]).map((item:string,i:number)=><li key={i} style={{marginBottom:"5px"}}>{item}</li>)}</ul><p style={{marginTop:"12px"}}>{cgu.s5_note}</p></Section>
          <Section titre={cgu.s6_titre}><p>{cgu.s6_intro}</p><ul style={{paddingLeft:"20px",marginTop:"8px"}}>{(cgu.s6_items as string[]).map((item:string,i:number)=><li key={i} style={{marginBottom:"5px"}}>{item}</li>)}</ul></Section>
          <Section titre={cgu.s7_titre}><p>{cgu.s7}</p></Section>
          <Section titre={cgu.s8_titre}><ul style={{paddingLeft:"20px",marginTop:"8px"}}>{(cgu.s8_items as string[]).map((item:string,i:number)=><li key={i} style={{marginBottom:"5px"}}>{item}</li>)}</ul></Section>
          <Section titre={cgu.s9_titre}><p>{cgu.s9}</p></Section>
          <Section titre={cgu.s10_titre}><p>{cgu.s10}</p></Section>
        </div>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"20px",flexWrap:"wrap"}}>
          {NAV_LINKS.map(l=>(<Link key={l.label} href={l.href} style={{color:C.texteSec,fontSize:"12px",textDecoration:"none"}}>{l.label}</Link>))}
        </div>
      </div>
      <Footer/>
    </main>
  );
}