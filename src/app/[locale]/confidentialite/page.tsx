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
  const conf=t.raw("confidentialite") as any;
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
            <span style={{color:"white",fontSize:"10px",fontWeight:700,letterSpacing:".15em",textTransform:"uppercase"}}>{conf.badge}</span>
          </div>
          <h1 style={{color:"white",fontSize:isMobile?"22px":"28px",fontWeight:800,margin:"0 0 6px",letterSpacing:"-.3px"}}>{conf.titre}</h1>
          <p style={{color:"#B8C4D4",fontSize:"13px",margin:0}}>{conf.date}</p>
        </div>
      </section>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:isMobile?"20px 16px":"40px 24px"}}>
        <div style={{background:C.blanc,borderRadius:"10px",border:`0.5px solid ${C.beigeB}`,padding:isMobile?"20px 16px":"32px 36px"}}>
          <Section titre={conf.s1_titre}>
            <p><strong style={{color:C.texte}}>CaribbeanVault SAS</strong> — Guadeloupe, France (DOM)</p>
            <p>Email DPO : <strong style={{color:C.texte}}>contact@geccostrategy.com</strong></p>
            <p style={{marginTop:"8px"}}>CaribbeanVault SAS s'engage à protéger la vie privée de ses utilisateurs conformément au RGPD (UE 2016/679) et à la loi Informatique et Libertés.</p>
          </Section>
          <Section titre={conf.s2_titre}>
            <p><strong style={{color:C.texte}}>Données d'inscription :</strong> nom, prénom, email, date de naissance, pays de résidence.</p>
            <p style={{marginTop:"8px"}}><strong style={{color:C.texte}}>Données KYC :</strong> pièce d'identité officielle, justificatif de domicile, selfie de vérification.</p>
            <p style={{marginTop:"8px"}}><strong style={{color:C.texte}}>Données d'utilisation :</strong> adresse IP, navigateur, pages visitées, historique des transactions.</p>
          </Section>
          <Section titre={conf.s3_titre}>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"10px",marginTop:"8px"}}>
              {[["Gestion du compte utilisateur","Exécution du contrat"],["Vérification d'identité (KYC/AML)","Obligation légale"],["Traitement des investissements","Exécution du contrat"],["Communications transactionnelles","Exécution du contrat"],["Newsletter et informations","Consentement"],["Prévention de la fraude","Obligation légale"],["Amélioration de la plateforme","Intérêt légitime"],["Statistiques d'utilisation","Intérêt légitime"]].map(([fin,base],i)=>(
                <div key={i} style={{background:C.beige,borderRadius:"6px",padding:"10px 12px"}}>
                  <div style={{color:C.texte,fontSize:"12px",fontWeight:500}}>{fin}</div>
                  <div style={{color:C.sable,fontSize:"10px",marginTop:"2px"}}>{base}</div>
                </div>
              ))}
            </div>
          </Section>
          <Section titre={conf.s4_titre}>
            <p>Vos données peuvent être transmises aux prestataires suivants dans le strict cadre de leurs missions :</p>
            <ul style={{paddingLeft:"20px",marginTop:"8px"}}>
              {[["Sumsub","Prestataire KYC/AML agréé"],["Stripe","Prestataire de paiement"],["Supabase","Hébergement base de données (UE)"],["Resend","Envoi d'emails transactionnels"],["Autorités compétentes","AMF, Tracfin, sur réquisition légale"]].map(([nom,desc],i)=>(
                <li key={i} style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>{nom}</strong> — {desc}</li>
              ))}
            </ul>
            <p style={{marginTop:"10px"}}>Aucune donnée personnelle n'est vendue à des tiers à des fins commerciales.</p>
          </Section>
          <Section titre={conf.s5_titre}>
            <ul style={{paddingLeft:"20px"}}>
              {[["Données de compte actif","Durée de la relation contractuelle"],["Données KYC","5 ans après la fin de la relation (obligation LCB-FT)"],["Données de transaction","10 ans (obligation comptable)"],["Logs de connexion","12 mois"],["Données marketing","Jusqu'au désabonnement + 3 ans"]].map(([type,duree],i)=>(
                <li key={i} style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>{type} :</strong> {duree}</li>
              ))}
            </ul>
          </Section>
          <Section titre={conf.s6_titre}>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"8px",marginTop:"10px"}}>
              {[["Droit d'accès","Obtenir une copie de vos données"],["Droit de rectification","Corriger vos données inexactes"],["Droit à l'effacement","Supprimer vos données (sauf obligations légales)"],["Droit à la portabilité","Recevoir vos données dans un format structuré"],["Droit d'opposition","Vous opposer au traitement marketing"],["Droit à la limitation","Restreindre le traitement de vos données"]].map(([droit,desc],i)=>(
                <div key={i} style={{border:`0.5px solid ${C.beigeB}`,borderRadius:"6px",padding:"10px 12px"}}>
                  <div style={{color:C.navy,fontSize:"12px",fontWeight:600}}>{droit}</div>
                  <div style={{color:C.texteSec,fontSize:"11px",marginTop:"2px"}}>{desc}</div>
                </div>
              ))}
            </div>
            <p style={{marginTop:"12px"}}>Pour exercer vos droits : <strong style={{color:C.texte}}>contact@geccostrategy.com</strong></p>
            <p style={{marginTop:"6px"}}>Vous pouvez aussi introduire une réclamation auprès de la CNIL : <strong style={{color:C.texte}}>www.cnil.fr</strong></p>
          </Section>
          <Section titre={conf.s7_titre}>
            <ul style={{paddingLeft:"20px"}}>
              <li style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>Cookies techniques :</strong> Nécessaires au fonctionnement. Pas de consentement requis.</li>
              <li style={{marginBottom:"5px"}}><strong style={{color:C.texte}}>Cookies analytiques :</strong> Mesure d'audience anonymisée (Vercel Analytics). Avec consentement uniquement.</li>
              <li><strong style={{color:C.texte}}>Cookies de préférences :</strong> Mémorisation de vos choix. Avec consentement uniquement.</li>
            </ul>
            <p style={{marginTop:"10px"}}>Aucun cookie publicitaire ou de traçage commercial n'est utilisé sur ce site.</p>
          </Section>
          <Section titre={conf.s8_titre}>
            <p>CaribbeanVault met en œuvre les mesures suivantes :</p>
            <ul style={{paddingLeft:"20px",marginTop:"8px"}}>
              {["Chiffrement SSL/TLS de toutes les communications","Chiffrement AES-256 des données sensibles en base","Accès restreint aux données par le personnel habilité","Authentification multi-facteurs pour les accès administrateur","Audits de sécurité réguliers et tests de pénétration"].map((item,i)=>(
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