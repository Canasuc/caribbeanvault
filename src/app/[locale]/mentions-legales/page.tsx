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

interface S1Data {
  raison_label: string; raison_val: string;
  forme_label: string; forme_val: string;
  capital_label: string; capital_val: string;
  siege_label: string; siege_val: string;
  email_label: string; email_val: string;
  site_label: string; site_val: string;
}

interface S2Data {
  hebergeur_label: string; hebergeur_val: string;
  adresse_label: string; adresse_val: string;
  site_label: string; site_val: string;
}

interface MentionsData {
  badge: string; titre: string; date: string;
  s1_titre: string; s1: S1Data;
  s2_titre: string; s2: S2Data;
  s3_titre: string; s3_p1: string; s3_p2: string; s3_p3: string;
  s4_titre: string; s4_p1: string; s4_p2: string;
  s5_titre: string; s5_p1: string; s5_p2: string;
  s6_titre: string; s6_p1: string; s6_lien: string; s6_p2: string; s6_email: string;
  s7_titre: string; s7: string;
  s8_titre: string; s8: string;
}

export default function MentionsLegalesPage(){
  const t = useTranslations("legal");
  const locale = useLocale();
  const { isMobile } = useBreakpoint();
  const m = t.raw("mentions") as MentionsData;
  const s1 = m.s1; // ✅ déjà typé via MentionsData — pas besoin de as any
  const s2 = m.s2; // ✅ idem
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
            {[
              [s1.raison_label, s1.raison_val],
              [s1.forme_label, s1.forme_val],
              [s1.capital_label, s1.capital_val],
              [s1.siege_label, s1.siege_val],
              [s1.email_label, s1.email_val],
              [s1.site_label, s1.site_val],
            ].map(([label, val], i) => (
              <p key={i}><strong style={{color:C.texte}}>{label}</strong> {val}</p>
            ))}
          </Section>

          <Section titre={m.s2_titre}>
            {[
              [s2.hebergeur_label, s2.hebergeur_val],
              [s2.adresse_label, s2.adresse_val],
              [s2.site_label, s2.site_val],
            ].map(([label, val], i) => (
              <p key={i}><strong style={{color:C.texte}}>{label}</strong> {val}</p>
            ))}
          </Section>

          <Section titre={m.s3_titre}>
            <p>{m.s3_p1}</p>
            <p style={{marginTop:"10px"}}>{m.s3_p2}</p>
            <p style={{marginTop:"10px"}}>{m.s3_p3}</p>
          </Section>

          <Section titre={m.s4_titre}>
            <p>{m.s4_p1}</p>
            <p style={{marginTop:"10px"}}>{m.s4_p2}</p>
          </Section>

          <Section titre={m.s5_titre}>
            <p>{m.s5_p1}</p>
            <p style={{marginTop:"10px"}}><strong style={{color:C.texte}}>{m.s5_p2}</strong></p>
          </Section>

          <Section titre={m.s6_titre}>
            <p>{m.s6_p1} <Link href={`/${locale}/confidentialite`} style={{color:C.sable}}>{m.s6_lien}</Link>.</p>
            <p style={{marginTop:"10px"}}>{m.s6_p2} <strong style={{color:C.texte}}>{m.s6_email}</strong></p>
          </Section>

          <Section titre={m.s7_titre}>
            <p>{m.s7}</p>
          </Section>

          <Section titre={m.s8_titre}>
            <p>{m.s8}</p>
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