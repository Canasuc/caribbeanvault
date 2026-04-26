"use client";
import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { LogoNuit } from "@/components/Logo";
import Footer from "@/components/Footer";
import NavbarAuth from "@/components/NavbarAuth";
import { OEUVRES, getOeuvre } from "@/lib/oeuvres";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { createBrowserClient } from "@supabase/ssr";

const C = {
  nuit:     "#0D0518",
  violet:   "#1A0A2E",
  prune:    "#2D1A4A",
  mauve:    "#C084FC",
  or:       "#E8B86D",
  orPale:   "#F5F0E8",
  texte:    "#E8E0F0",
  texteSec: "#A899B8",
  texteTert:"#6B5E7A",
};

export default function OeuvrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const oeuvre = getOeuvre(slug);
  const [montant, setMontant] = useState(500);
  const [authChecked, setAuthChecked] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  // Protection — redirection si non connecté
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = "/login";
      else setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.nuit }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>⏳</div>
          <div style={{ color: C.texteSec, fontSize: "14px", fontFamily: "system-ui" }}>Verification de votre acces...</div>
        </div>
      </div>
    );
  }

  if (!oeuvre) {
    return (
      <main style={{ fontFamily: "system-ui", background: C.nuit, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎨</div>
          <h1 style={{ color: C.orPale, fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Oeuvre introuvable</h1>
          <p style={{ color: C.texteSec, fontSize: "14px", marginBottom: "20px" }}>Cette oeuvre n'existe pas dans notre galerie.</p>
          <Link href="/art" style={{ background: C.mauve, color: C.nuit, padding: "12px 24px", borderRadius: "3px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
            Voir la galerie
          </Link>
        </div>
      </main>
    );
  }

  const pct = Math.round(((oeuvre.tokens - oeuvre.disponibles) / oeuvre.tokens) * 100);
  const complet = oeuvre.disponibles === 0;
  const tokensAchat = Math.floor(montant / oeuvre.prixToken);
  const royaltesEstimees = tokensAchat * oeuvre.prixToken * (parseFloat(oeuvre.rendementEst.split("-")[1]) / 100);

  const autresOeuvres = OEUVRES.filter(o => o.territoire === oeuvre.territoire && o.slug !== oeuvre.slug).slice(0, 3);

  // Sidebar partagée mobile/desktop
  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: isMobile ? "20px" : "0" }}>

      {/* Investissement */}
      <div style={{ background: complet ? C.prune : C.violet, borderRadius: "8px", padding: "20px", border: `0.5px solid ${complet ? C.texteTert : C.mauve}30` }}>
        {complet ? (
          <>
            <div style={{ color: C.texteSec, fontSize: "12px", fontWeight: 600, marginBottom: "10px", fontFamily: "system-ui" }}>Levee terminee</div>
            <p style={{ color: C.texteSec, fontSize: "12px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui" }}>{"Rejoignez la liste d'attente."}</p>
            <Link href="/kyc" style={{ display: "block", background: C.mauve, color: C.nuit, padding: "11px", borderRadius: "3px", fontSize: "12px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              {"Rejoindre la liste d'attente"}
            </Link>
          </>
        ) : (
          <>
            <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>
              Investir dans cette oeuvre
            </div>
            <div style={{ color: C.orPale, fontSize: "24px", fontWeight: 700, marginBottom: "2px" }}>{oeuvre.rendementEst}</div>
            <div style={{ color: C.texteSec, fontSize: "12px", marginBottom: "14px", fontFamily: "system-ui" }}>rendement estime (royalties)</div>

            {/* Progression */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>Tokens leves</span>
                <span style={{ color: C.mauve, fontSize: "11px", fontWeight: 700, fontFamily: "system-ui" }}>{pct}%</span>
              </div>
              <div style={{ background: C.prune, borderRadius: "20px", height: "5px" }}>
                <div style={{ background: pct >= 95 ? "#E24B4A" : C.mauve, height: "100%", borderRadius: "20px", width: `${pct}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>{oeuvre.tokens - oeuvre.disponibles} vendus</span>
                <span style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>{oeuvre.disponibles} restants</span>
              </div>
            </div>

            {/* Métriques */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
              {[
                { label: "Prix/token", val: `${oeuvre.prixToken}€` },
                { label: "Royalties", val: oeuvre.royaltes },
                { label: "Estimation", val: `${(oeuvre.estimation / 1000).toFixed(0)}k€` },
                { label: "Tokens dispo.", val: String(oeuvre.disponibles) },
              ].map((m, i) => (
                <div key={i} style={{ background: C.prune, borderRadius: "4px", padding: "8px 10px" }}>
                  <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui", marginBottom: "2px" }}>{m.label}</div>
                  <div style={{ color: C.orPale, fontSize: "13px", fontWeight: 700, fontFamily: "system-ui" }}>{m.val}</div>
                </div>
              ))}
            </div>

            {/* Simulateur */}
            <div style={{ background: C.prune, borderRadius: "6px", padding: "12px", marginBottom: "12px" }}>
              <div style={{ color: C.or, fontSize: "11px", fontWeight: 600, marginBottom: "8px", fontFamily: "system-ui" }}>Simulez vos royalties</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: C.texteSec, fontSize: "11px", fontFamily: "system-ui" }}>Montant investi</span>
                <span style={{ color: C.or, fontSize: "12px", fontWeight: 700, fontFamily: "system-ui" }}>{montant}€</span>
              </div>
              <input type="range" min={oeuvre.prixToken} max={Math.min(oeuvre.disponibles * oeuvre.prixToken, 5000)} step={oeuvre.prixToken} value={montant}
                onChange={e => setMontant(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.mauve }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                <div style={{ background: C.violet, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui" }}>Tokens acquis</div>
                  <div style={{ color: C.orPale, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{tokensAchat}</div>
                </div>
                <div style={{ background: C.violet, borderRadius: "4px", padding: "8px", textAlign: "center" }}>
                  <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui" }}>Royalties est.</div>
                  <div style={{ color: C.mauve, fontSize: "14px", fontWeight: 700, fontFamily: "system-ui" }}>{Math.round(royaltesEstimees)}€</div>
                </div>
              </div>
            </div>

            <Link href="/kyc" style={{ display: "block", background: C.mauve, color: C.nuit, padding: "13px", borderRadius: "3px", fontSize: "13px", textAlign: "center", fontWeight: 700, textDecoration: "none", fontFamily: "system-ui" }}>
              Acquerir des fractions →
            </Link>
            <p style={{ color: C.texteTert, fontSize: "10px", textAlign: "center", marginTop: "8px", fontFamily: "system-ui" }}>
              KYC requis · Min {oeuvre.prixToken}€ · Risque de perte en capital
            </p>
          </>
        )}
      </div>

      {/* Certification blockchain */}
      <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: "18px" }}>
        <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "system-ui" }}>Certification</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { label: "Blockchain", val: oeuvre.blockchain },
            { label: "Auditeur", val: oeuvre.auditeur },
            { label: "Standard", val: "XRP Ledger — ERC-1155" },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ color: C.texteTert, fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "system-ui" }}>{r.label}</div>
              <div style={{ color: C.texte, fontSize: "11px", marginTop: "2px", fontFamily: "system-ui" }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulateur complet */}
      <div style={{ background: C.prune, borderRadius: "8px", padding: "18px", textAlign: "center" }}>
        <div style={{ fontSize: "20px", marginBottom: "8px" }}>📊</div>
        <div style={{ color: C.or, fontSize: "12px", fontWeight: 600, marginBottom: "6px", fontFamily: "system-ui" }}>Simulation complete</div>
        <p style={{ color: C.texteSec, fontSize: "11px", lineHeight: 1.6, margin: "0 0 12px", fontFamily: "system-ui" }}>
          Calculez vos projections sur 1, 3 ou 5 ans.
        </p>
        <Link href="/simulateur" style={{ display: "block", background: C.violet, color: C.mauve, padding: "10px", borderRadius: "3px", fontSize: "12px", fontWeight: 600, textDecoration: "none", fontFamily: "system-ui", border: `0.5px solid ${C.mauve}40` }}>
          Ouvrir le simulateur →
        </Link>
      </div>
    </div>
  );

  return (
    <main style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: C.nuit, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: `${C.nuit}F0`, backdropFilter: "blur(8px)", borderBottom: `0.5px solid ${C.prune}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNuit size={isMobile ? 0.6 : 0.7} />
          </Link>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/art" style={{ color: C.texteSec, fontSize: "11px", textDecoration: "none", fontFamily: "system-ui" }}>
              {isMobile ? "← Galerie" : "← Toutes les oeuvres"}
            </Link>
            <NavbarAuth buttonBg="#E8B86D" buttonColor="#0D0518" textColor="#A899B8" borderColor="rgba(232,184,109,.3)" />
          </div>
        </div>
      </nav>

      {/* PHOTO DE L'OEUVRE — hero plein écran */}
      <section style={{ position: "relative", height: isMobile ? "280px" : "480px", overflow: "hidden" }}>
        <Image
          src={oeuvre.photoBandeau}
          alt={oeuvre.titre}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,5,24,.3) 0%, rgba(13,5,24,.7) 60%, rgba(13,5,24,.95) 100%)" }} />
        {/* Contenu sur la photo */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "24px 16px" : "40px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Link href="/art" style={{ color: C.texteSec, fontSize: "11px", textDecoration: "none", fontFamily: "system-ui" }}>Galerie</Link>
                <span style={{ color: C.texteSec, opacity: .4 }}>›</span>
                <span style={{ color: C.or, fontSize: "11px", fontFamily: "system-ui" }}>{oeuvre.titre}</span>
              </div>
            )}
            {/* Badges */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span style={{ background: oeuvre.tagColor, color: "white", fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "20px", fontFamily: "system-ui" }}>{oeuvre.tag}</span>
              <span style={{ background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.85)", fontSize: "9px", padding: "3px 12px", borderRadius: "20px", fontFamily: "system-ui" }}>
                {oeuvre.medium} · {oeuvre.dimensions}
              </span>
              {!complet && <span style={{ background: `${C.mauve}25`, color: C.mauve, fontSize: "9px", fontWeight: 700, padding: "3px 12px", borderRadius: "20px", border: `0.5px solid ${C.mauve}40`, fontFamily: "system-ui" }}>{oeuvre.disponibles} tokens disponibles</span>}
            </div>
            <h1 style={{ color: "white", fontSize: isMobile ? "24px" : "42px", fontWeight: 300, lineHeight: 1.15, margin: "0 0 6px" }}>
              {oeuvre.titre}
            </h1>
            <div style={{ color: C.or, fontSize: isMobile ? "14px" : "18px", fontFamily: "system-ui" }}>
              {oeuvre.artiste} · {oeuvre.origine} · {oeuvre.annee}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px 40px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "2fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* COLONNE PRINCIPALE */}
          <div>

            {/* Sidebar mobile en haut */}
            {isMobile && <SidebarContent />}

            {/* Description */}
            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>L'oeuvre</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: 0, fontFamily: "system-ui" }}>{oeuvre.description}</p>
            </div>

            {/* Histoire */}
            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Histoire de l'oeuvre</div>
              <p style={{ color: C.texteSec, fontSize: "14px", lineHeight: 1.9, margin: 0, fontFamily: "system-ui" }}>{oeuvre.histoire}</p>
            </div>

            {/* Palette */}
            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>Palette chromatique</div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {oeuvre.couleurs.map((c, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: isMobile ? "40px" : "56px", height: isMobile ? "40px" : "56px", borderRadius: "50%", background: c, border: `2px solid ${C.prune}`, boxShadow: `0 0 12px ${c}40` }} />
                    <div style={{ color: C.texteTert, fontSize: "9px", fontFamily: "system-ui" }}>{c}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fiche artiste */}
            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>L'artiste</div>
              {/* Avatar + nom */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.mauve}40, ${C.or}40)`, border: `2px solid ${C.mauve}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 700, color: C.mauve, fontFamily: "system-ui", flexShrink: 0 }}>
                  {oeuvre.artisteInitiales}
                </div>
                <div>
                  <div style={{ color: C.orPale, fontSize: "16px", fontWeight: 600 }}>{oeuvre.artiste}</div>
                  <div style={{ color: C.texteSec, fontSize: "12px", fontFamily: "system-ui", marginTop: "2px" }}>{oeuvre.origine} · {oeuvre.style}</div>
                </div>
              </div>
              <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8, margin: "0 0 14px", fontFamily: "system-ui" }}>{oeuvre.artisteBio}</p>
              {/* Actualité */}
              <div style={{ background: `${C.mauve}15`, border: `0.5px solid ${C.mauve}30`, borderRadius: "6px", padding: "10px 12px", marginBottom: "14px" }}>
                <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: "4px", fontFamily: "system-ui" }}>Actualite</div>
                <div style={{ color: C.texte, fontSize: "12px", fontFamily: "system-ui" }}>{oeuvre.artisteActu}</div>
              </div>
              {/* Expositions */}
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "system-ui" }}>Expositions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {oeuvre.artisteExpositions.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: C.or, fontSize: "12px", flexShrink: 0 }}>★</span>
                    <span style={{ color: C.texteSec, fontSize: "12px", fontFamily: "system-ui" }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expositions de l'œuvre */}
            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "14px", fontFamily: "system-ui" }}>Expositions & estimations</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {oeuvre.expositionsOeuvre.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "10px 12px", background: C.prune, borderRadius: "4px" }}>
                    <span style={{ color: C.mauve, fontSize: "12px", flexShrink: 0 }}>◈</span>
                    <span style={{ color: C.texteSec, fontSize: "12px", fontFamily: "system-ui" }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Droits */}
            <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px", marginBottom: "16px" }}>
              <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "system-ui" }}>Droits & royalties</div>
              <p style={{ color: C.texteSec, fontSize: "13px", lineHeight: 1.8, margin: 0, fontFamily: "system-ui" }}>{oeuvre.droits}</p>
            </div>

            {/* Avertissement */}
            <div style={{ background: "#FFFBEB", borderRadius: "8px", border: "1px solid #FCD34D44", padding: isMobile ? "16px" : "20px", marginBottom: "16px" }}>
              <div style={{ color: "#92400E", fontSize: "12px", fontWeight: 700, marginBottom: "8px", fontFamily: "system-ui" }}>⚠️ Avertissements</div>
              {["L'investissement dans des oeuvres d'art tokenisees comporte des risques de perte en capital.", "Les rendements passes ne prejudgent pas des rendements futurs.", "CaribbeanVault ne fournit pas de conseil en investissement.", "La valeur des royalties depend des reventes secondaires, qui ne sont pas garanties."].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "6px", fontSize: "11px", color: "#92400E", fontFamily: "system-ui", marginBottom: "4px" }}>
                  <span style={{ flexShrink: 0 }}>›</span><span>{r}</span>
                </div>
              ))}
            </div>

            {/* Autres œuvres */}
            {autresOeuvres.length > 0 && (
              <div style={{ background: C.violet, borderRadius: "8px", border: `0.5px solid ${C.prune}`, padding: isMobile ? "18px" : "28px" }}>
                <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "system-ui" }}>Meme territoire</div>
                <h3 style={{ color: C.orPale, fontSize: "16px", fontWeight: 600, margin: "0 0 14px", fontFamily: "system-ui" }}>Autres oeuvres disponibles</h3>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(autresOeuvres.length, 3)}, 1fr)`, gap: "10px" }}>
                  {autresOeuvres.map(o => (
                    <Link key={o.slug} href={`/art/${o.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ borderRadius: "6px", overflow: "hidden", border: `0.5px solid ${C.prune}`, transition: "transform .2s" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                      >
                        <div style={{ height: "80px", position: "relative", overflow: "hidden" }}>
                          <Image src={o.photo} alt={o.titre} fill sizes="200px" style={{ objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,5,24,.8) 0%, transparent 60%)" }} />
                          <div style={{ position: "absolute", bottom: "6px", left: "8px", right: "8px" }}>
                            <div style={{ color: "white", fontSize: "11px", fontWeight: 600, fontFamily: "system-ui" }}>{o.titre}</div>
                          </div>
                        </div>
                        <div style={{ background: C.prune, padding: "8px 10px" }}>
                          <div style={{ color: C.texteSec, fontSize: "10px", fontFamily: "system-ui" }}>{o.artiste}</div>
                          <div style={{ color: C.mauve, fontSize: "10px", fontWeight: 700, fontFamily: "system-ui" }}>{o.rendementEst}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR DESKTOP */}
          {!isMobile && (
            <div style={{ position: "sticky", top: "88px" }}>
              <SidebarContent />
            </div>
          )}
        </div>
      </div>

      {/* BARRE FIXE MOBILE */}
      {isMobile && !complet && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.violet, borderTop: `0.5px solid ${C.prune}`, padding: "12px 16px", zIndex: 150, display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.texteTert, fontSize: "10px", fontFamily: "system-ui" }}>Royalties estimees</div>
            <div style={{ color: C.mauve, fontSize: "18px", fontWeight: 800, fontFamily: "system-ui" }}>{oeuvre.rendementEst}</div>
          </div>
          <Link href="/kyc" style={{ background: C.mauve, color: C.nuit, padding: "13px 24px", borderRadius: "3px", fontSize: "14px", fontWeight: 700, textDecoration: "none", flexShrink: 0, fontFamily: "system-ui" }}>
            Investir →
          </Link>
        </div>
      )}

      <Footer />
    </main>
  );
}