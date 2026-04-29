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

export default function ConfidentialitePage(){
  const t=useTranslations("legal");
  const locale=useLocale();
  const {isMobile}=useBreakpoint();
  const c=t.raw("confidentialite") as any;
  const NAV_LINKS=[{label:t("nav_mentions"),href:`/${locale}/mentions-legales`},{label:t("nav_cgu"),href:`/${locale}/cgu`},{label:t("nav_contact"),href:`/${locale}/contact`},{label:t("nav_accueil"),href:`/${locale}`}];

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
            <span style={{color:"white",fontSize:"10px",fontWeight:700,letterSpacing:".15em",textTransform:"uppercase"}}>{c.badge}</span>
          </div>
          <h1 style={{color:"white",fontSize:isMobile?"22px":"28px",fontWeight:800,margin:"0 0 6px",letterSpacing:"-.3px"}}>{c.titre}</h1>
          <p style={{color:"#B8C4D4",fontSize:"13px",margin:0}}>{c.date}</p>
        </div>
      </section>

      <div style={{maxWidth:"900px",margin:"0 auto",padding:isMobile?"20px 16px":"40px 24px"}}>
        <div style={{background:C.blanc,borderRadius:"10px",border:`0.5px solid ${C.beigeB}`,padding:isMobile?"20px 16px":"32px 36px"}}>

          <Section titre={c.s1_titre}>
            <p><strong style={{color:C.texte}}>{c.s1_societe}</strong> — {c.s1_lieu}</p>
            <p>{c.s1_dpo_label} <strong style={{color:C.texte}}>{c.s1_dpo}</strong></p>
            <p style={{marginTop:"8px"}}>{c.s1_engagement}</p>
          </Section>

          <Section titre={c.s2_titre}>
            <p><strong style={{color:C.texte}}>{c.s2_inscription_label}</strong> {c.s2_inscription}</p>
            <p style={{marginTop:"8px"}}><strong style={{color:C.texte}}>{c.s2_kyc_label}</strong> {c.s2_kyc}</p>
            <p style={{marginTop:"8px"}}><strong style={{color:C.texte}}>{c.s2_usage_label}</strong> {c.s2_usage}</p>
          </Section>

          <Section titre={c.s3_titre}>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"10px",marginTop:"8px"}}>
              {(c.s3_finalites as {fin:string;base:string}[]).map((f,i)=>(
                <div key={i} style={{background:C.beige,borderRadius:"6px",padding:"10px 12px"}}>
                  <div style={{color:C.texte,fontSize:"12px",fontWeight:500}}>{f.fin}</div>
                  <div style={{color:C.sable,fontSize:"10px",marginTop:"2px"}}>{f.base}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section titre={c.s4_titre}>
            <p>{c.s4_intro}</p>
            <ul style={{paddingLeft:"20px",marginTop:"8px"}}>
              {(c.s4_prestataires as {nom:string;desc:string}[]).map((p,i)=>(
                <li key={i} style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>{p.nom}</strong> — {p.desc}</li>
              ))}
            </ul>
            <p style={{marginTop:"10px"}}>{c.s4_note}</p>
          </Section>

          <Section titre={c.s5_titre}>
            <ul style={{paddingLeft:"20px"}}>
              {(c.s5_items as {type:string;duree:string}[]).map((item,i)=>(
                <li key={i} style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>{item.type} :</strong> {item.duree}</li>
              ))}
            </ul>
          </Section>

          <Section titre={c.s6_titre}>
            <p>{c.s6_intro}</p>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"8px",marginTop:"10px"}}>
              {(c.s6_droits as {droit:string;desc:string}[]).map((d,i)=>(
                <div key={i} style={{border:`0.5px solid ${C.beigeB}`,borderRadius:"6px",padding:"10px 12px"}}>
                  <div style={{color:C.navy,fontSize:"12px",fontWeight:600}}>{d.droit}</div>
                  <div style={{color:C.texteSec,fontSize:"11px",marginTop:"2px"}}>{d.desc}</div>
                </div>
              ))}
            </div>
            <p style={{marginTop:"12px"}}>{c.s6_contact} <strong style={{color:C.texte}}>{c.s6_email}</strong></p>
            <p style={{marginTop:"6px"}}>{c.s6_cnil} <strong style={{color:C.texte}}>{c.s6_cnil_url}</strong></p>
          </Section>

          <Section titre={c.s7_titre}>
            <ul style={{paddingLeft:"20px"}}>
              {(c.s7_items as {type:string;desc:string}[]).map((item,i)=>(
                <li key={i} style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>{item.type} :</strong> {item.desc}</li>
              ))}
            </ul>
            <p style={{marginTop:"10px"}}>{c.s7_note}</p>
          </Section>

          <Section titre={c.s8_titre}>
            <p>{c.s8_intro}</p>
            <ul style={{paddingLeft:"20px",marginTop:"8px"}}>
              {(c.s8_items as string[]).map((item,i)=>(
                <li key={i} style={{marginBottom:"5px"}}>{item}</li>
              ))}
            </ul>
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