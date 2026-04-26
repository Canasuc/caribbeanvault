"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { LogoNavy } from "@/components/Logo";
import NavbarAuth from "@/components/NavbarAuth";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const C = {
  navy:      "#1A2E4A",
  navyMid:   "#253D5E",
  navyLight: "#3A4E6A",
  sable:     "#D4884A",
  sableC:    "#C07A3E",
  sablePale: "#F0EBE1",
  beige:     "#F8F6F1",
  beigeB:    "#E8E2D6",
  texte:     "#111827",
  texteSec:  "#4A5568",
  texteTert: "#9CA3AF",
  blanc:     "#FFFFFF",
  pessimiste: { main: "#854F0B", bg: "#FAEEDA", border: "#FAC775" },
  realiste:   { main: "#0F6E56", bg: "#E1F5EE", border: "#9FE1CB" },
  optimiste:  { main: "#0C447C", bg: "#E6F1FB", border: "#B5D4F4" },
};

type AssetKey = "rhum" | "villa" | "local" | "agriculture" | "art";

interface AssetConfig {
  label: string; icon: string; emoji: string; description: string; territory: string;
  minAmount: number; maxAmount: number; defaultAmount: number;
  minDuration: number; maxDuration: number; defaultDuration: number;
  entryFee: number; managementFee: number; exitFee: number;
  rates: { pessimiste: number; realiste: number; optimiste: number };
  note: string; color: string; href: string;
}

const ASSETS: Record<AssetKey, AssetConfig> = {
  rhum: { label: "Rhum Agricole AOC", icon: "🥃", emoji: "🥃", description: "Futs de rhum vieux en vieillissement en cave", territory: "Guadeloupe & Martinique", minAmount: 500, maxAmount: 50000, defaultAmount: 2000, minDuration: 5, maxDuration: 15, defaultDuration: 10, entryFee: 0.02, managementFee: 0.01, exitFee: 0.02, rates: { pessimiste: 0.05, realiste: 0.10, optimiste: 0.15 }, note: "Actif decorele des marches financiers. Rendement historique 8-15%/an.", color: "#0F5240", href: "/rhum" },
  villa: { label: "Villa Touristique", icon: "🏠", emoji: "🏠", description: "Revenus locatifs Airbnb distribues mensuellement", territory: "Guadeloupe, Martinique, Saint-Martin", minAmount: 100, maxAmount: 100000, defaultAmount: 5000, minDuration: 1, maxDuration: 15, defaultDuration: 5, entryFee: 0.02, managementFee: 0.015, exitFee: 0.02, rates: { pessimiste: 0.055, realiste: 0.085, optimiste: 0.11 }, note: "Revenus mensuels + plus-value immobiliere. Taux d'occupation moyen 75%.", color: "#0891B2", href: "/immobilier" },
  local: { label: "Local Commercial", icon: "🏢", emoji: "🏢", description: "Bail commercial signe — loyer mensuel garanti", territory: "Guadeloupe, Martinique, Guyane", minAmount: 100, maxAmount: 100000, defaultAmount: 5000, minDuration: 1, maxDuration: 9, defaultDuration: 3, entryFee: 0.02, managementFee: 0.01, exitFee: 0.015, rates: { pessimiste: 0.06, realiste: 0.08, optimiste: 0.10 }, note: "Profil de risque tres faible. Loyer contractuellement garanti.", color: "#0891B2", href: "/immobilier" },
  agriculture: { label: "Agriculture Caribeenne", icon: "🌿", emoji: "🌿", description: "Financement de recoltes — banane IGP, cafe, cacao, FSC", territory: "Guadeloupe, Martinique, Guyane", minAmount: 200, maxAmount: 30000, defaultAmount: 2000, minDuration: 1, maxDuration: 5, defaultDuration: 1, entryFee: 0.02, managementFee: 0.01, exitFee: 0.01, rates: { pessimiste: 0.08, realiste: 0.15, optimiste: 0.22 }, note: "Cycle de 12 mois. Assurance recolte 80%. Certifications Bio/IGP/FSC.", color: "#2C3A1E", href: "/agriculture" },
  art: { label: "Art Creole & Caribeen", icon: "🎨", emoji: "🎨", description: "Oeuvres d'artistes carribeens + royalties sur reventes", territory: "Haiti, Martinique, Guadeloupe, Guyane", minAmount: 100, maxAmount: 20000, defaultAmount: 500, minDuration: 2, maxDuration: 10, defaultDuration: 5, entryFee: 0.025, managementFee: 0.01, exitFee: 0.02, rates: { pessimiste: 0.02, realiste: 0.15, optimiste: 0.40 }, note: "Royalties 5-8% sur chaque revente secondaire. Potentiel de valorisation eleve.", color: "#1A0A2E", href: "/art" },
};

const COMPARAISONS = [
  { label: "Livret A", rate: 0.03, color: "#9CA3AF" },
  { label: "SCPI",     rate: 0.045, color: "#6B7280" },
  { label: "Actions",  rate: 0.08,  color: "#374151" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}
function fmtPct(n: number) { return (n * 100).toFixed(1) + "%" }

function calcReturn(amount: number, rate: number, years: number, entry: number, mgmt: number, exit: number) {
  let value = amount * (1 - entry);
  for (let i = 0; i < years; i++) value = value * (1 + rate) * (1 - mgmt);
  const final = Math.round(value * (1 - exit));
  const gain = final - amount;
  const annuel = Math.pow(final / amount, 1 / years) - 1;
  return { final, gain, annuel };
}

function calcYearly(amount: number, rate: number, years: number, entry: number, mgmt: number) {
  const pts: { yr: number; val: number }[] = [{ yr: 0, val: amount }];
  let v = amount * (1 - entry);
  for (let i = 1; i <= years; i++) { v = v * (1 + rate) * (1 - mgmt); pts.push({ yr: i, val: Math.round(v) }); }
  return pts;
}

function Chart({ amount, years, cfg }: { amount: number; years: number; cfg: AssetConfig }) {
  const series = [
    { key: "pessimiste" as const, color: "#EF9F27", pts: calcYearly(amount, cfg.rates.pessimiste, years, cfg.entryFee, cfg.managementFee) },
    { key: "realiste"   as const, color: "#1D9E75", pts: calcYearly(amount, cfg.rates.realiste,   years, cfg.entryFee, cfg.managementFee) },
    { key: "optimiste"  as const, color: "#378ADD", pts: calcYearly(amount, cfg.rates.optimiste,  years, cfg.entryFee, cfg.managementFee) },
  ];
  const compSeries = COMPARAISONS.map(c => {
    const pts: { yr: number; val: number }[] = [{ yr: 0, val: amount }];
    let v = amount;
    for (let i = 1; i <= years; i++) { v *= (1 + c.rate); pts.push({ yr: i, val: Math.round(v) }); }
    return { ...c, pts };
  });
  const allVals = [...series.flatMap(s => s.pts.map(p => p.val)), ...compSeries.flatMap(s => s.pts.map(p => p.val))];
  const maxV = Math.max(...allVals);
  const minV = amount * 0.92;
  const W = 580, H = 220, pL = 64, pR = 16, pT = 16, pB = 32;
  const cW = W - pL - pR, cH = H - pT - pB;
  const x = (i: number) => pL + (i / years) * cW;
  const y = (v: number) => pT + cH - ((v - minV) / (maxV - minV)) * cH;
  const path = (pts: { yr: number; val: number }[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.yr).toFixed(1)},${y(p.val).toFixed(1)}`).join(" ");
  const gridVals = Array.from({ length: 5 }, (_, i) => minV + ((maxV - minV) / 4) * i);
  const xTicks = Array.from({ length: years + 1 }, (_, i) => i).filter(i => i === 0 || i === years || (years <= 10 ? true : i % Math.ceil(years / 8) === 0));

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {gridVals.map((v, i) => (
        <g key={i}>
          <line x1={pL} y1={y(v)} x2={W - pR} y2={y(v)} stroke="#E8E2D6" strokeWidth="0.5" />
          <text x={pL - 6} y={y(v) + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{v >= 1000 ? `${Math.round(v / 1000)}k€` : `${Math.round(v)}€`}</text>
        </g>
      ))}
      {compSeries.map(c => <path key={c.label} d={path(c.pts)} fill="none" stroke={c.color} strokeWidth="1" strokeDasharray="5 3" opacity="0.5" />)}
      {series.map(s => <path key={s.key} d={path(s.pts)} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />)}
      {xTicks.map(i => <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#9CA3AF">{i === 0 ? "Auj." : `An ${i}`}</text>)}
      {[{ label: "Pessimiste", color: "#EF9F27" }, { label: "Realiste", color: "#1D9E75" }, { label: "Optimiste", color: "#378ADD" }].map((s, i) => (
        <g key={s.label} transform={`translate(${pL + i * 100}, ${pT})`}>
          <line x1="0" y1="6" x2="14" y2="6" stroke={s.color} strokeWidth="2" />
          <text x="18" y="10" fontSize="9" fill="#4A5568">{s.label}</text>
        </g>
      ))}
      {COMPARAISONS.map((c, i) => (
        <g key={c.label} transform={`translate(${pL + 300 + i * 75}, ${pT})`}>
          <line x1="0" y1="6" x2="14" y2="6" stroke={c.color} strokeWidth="1" strokeDasharray="5 3" opacity="0.6" />
          <text x="18" y="10" fontSize="9" fill="#9CA3AF">{c.label}</text>
        </g>
      ))}
    </svg>
  );
}

function TableauDetail({ amount, years, cfg }: { amount: number; years: number; cfg: AssetConfig }) {
  const rows = Array.from({ length: years + 1 }, (_, yr) => {
    const calc = (rate: number) => { let v = amount * (1 - cfg.entryFee); for (let i = 0; i < yr; i++) v = v * (1 + rate) * (1 - cfg.managementFee); return Math.round(yr === 0 ? amount : v); };
    return { yr, pess: calc(cfg.rates.pessimiste), real: calc(cfg.rates.realiste), opti: calc(cfg.rates.optimiste) };
  });
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
        <thead>
          <tr style={{ background: C.navy }}>
            <th style={{ padding: "10px 8px", textAlign: "left", color: "white", fontWeight: 600, fontSize: "11px" }}>Annee</th>
            <th style={{ padding: "10px 8px", textAlign: "right", color: "#FAC775", fontWeight: 600, fontSize: "11px" }}>Pessimiste</th>
            <th style={{ padding: "10px 8px", textAlign: "right", color: "#9FE1CB", fontWeight: 600, fontSize: "11px" }}>Realiste</th>
            <th style={{ padding: "10px 8px", textAlign: "right", color: "#B5D4F4", fontWeight: 600, fontSize: "11px" }}>Optimiste</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.yr} style={{ background: i % 2 === 0 ? C.blanc : C.beige }}>
              <td style={{ padding: "8px", color: C.texteSec }}>{r.yr === 0 ? "Aujourd'hui" : `An ${r.yr}`}</td>
              <td style={{ padding: "8px", textAlign: "right", color: r.yr === 0 ? C.texteSec : "#854F0B", fontWeight: r.yr > 0 ? 600 : 400 }}>{fmt(r.pess)}</td>
              <td style={{ padding: "8px", textAlign: "right", color: r.yr === 0 ? C.texteSec : "#0F6E56", fontWeight: r.yr > 0 ? 600 : 400 }}>{fmt(r.real)}</td>
              <td style={{ padding: "8px", textAlign: "right", color: r.yr === 0 ? C.texteSec : "#0C447C", fontWeight: r.yr > 0 ? 600 : 400 }}>{fmt(r.opti)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SimulateurPage() {
  const [asset, setAsset] = useState<AssetKey>("rhum");
  const [amount, setAmount] = useState(2000);
  const [inputAmount, setInputAmount] = useState("2000");
  const [duration, setDuration] = useState(10);
  const [showTable, setShowTable] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  const cfg = ASSETS[asset];

  useEffect(() => {
    const config = ASSETS[asset];
    setAmount(config.defaultAmount);
    setInputAmount(String(config.defaultAmount));
    setDuration(config.defaultDuration);
  }, [asset]);

  const results = {
    pessimiste: calcReturn(amount, cfg.rates.pessimiste, duration, cfg.entryFee, cfg.managementFee, cfg.exitFee),
    realiste:   calcReturn(amount, cfg.rates.realiste,   duration, cfg.entryFee, cfg.managementFee, cfg.exitFee),
    optimiste:  calcReturn(amount, cfg.rates.optimiste,  duration, cfg.entryFee, cfg.managementFee, cfg.exitFee),
  };

  const compResults = COMPARAISONS.map(c => {
    let v = amount;
    for (let i = 0; i < duration; i++) v *= (1 + c.rate);
    return { ...c, final: Math.round(v), gain: Math.round(v - amount) };
  });

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.beige, minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ background: C.beige, borderBottom: `0.5px solid ${C.beigeB}`, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <LogoNavy size={isMobile ? 0.7 : 0.85} />
          </Link>
          {/* Desktop: liens actifs */}
          {!isMobile && (
            <div style={{ display: "flex", gap: isTablet ? "10px" : "16px", alignItems: "center" }}>
              {(Object.entries(ASSETS) as [AssetKey, AssetConfig][]).map(([key, a]) => (
                <Link key={key} href={a.href} style={{ color: C.texteSec, fontSize: "11px", textDecoration: "none" }}>
                  {a.icon} {a.label.split(" ")[0]}
                </Link>
              ))}
              <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
            </div>
          )}
          {/* Mobile: juste NavbarAuth */}
          {isMobile && (
            <NavbarAuth buttonBg="#1A2E4A" buttonColor="white" textColor="#4A5568" borderColor="#E8E2D6" />
          )}
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ background: C.navy, padding: isMobile ? "32px 16px 24px" : "40px 24px 32px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: C.sable, padding: "3px 14px", borderRadius: "2px", marginBottom: "14px" }}>
            <span style={{ color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase" }}>Simulateur de rendement</span>
          </div>
          <h1 style={{ color: "white", fontSize: isMobile ? "24px" : "32px", fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 10px" }}>
            Calculez votre rendement
          </h1>
          <p style={{ color: "#B8C4D4", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
            Simulez votre investissement selon 3 scenarios — pessimiste, realiste et optimiste. Frais reels inclus.
          </p>
        </div>
      </section>

      {/* CONTENU */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 24px" }}>

        {/* Sélecteur actif */}
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "16px" : "20px", marginBottom: "12px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: C.texteTert, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "12px" }}>
            Choisissez un actif
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: "8px" }}>
            {(Object.entries(ASSETS) as [AssetKey, AssetConfig][]).map(([key, a]) => (
              <button key={key} onClick={() => setAsset(key)} style={{
                padding: isMobile ? "10px 8px" : "10px 14px", borderRadius: "6px", cursor: "pointer",
                border: asset === key ? `2px solid ${a.color}` : `1px solid ${C.beigeB}`,
                background: asset === key ? `${a.color}12` : C.blanc,
                color: asset === key ? a.color : C.texteSec,
                fontWeight: asset === key ? 700 : 400,
                fontSize: isMobile ? "12px" : "13px", transition: "all .15s",
                display: "flex", alignItems: "center", gap: "6px",
                textAlign: "left",
              }}>
                <span style={{ fontSize: "18px" }}>{a.icon}</span>
                <div>
                  <div>{isMobile ? a.label.split(" ")[0] : a.label}</div>
                  {!isMobile && <div style={{ fontSize: "10px", opacity: .7, fontWeight: 400 }}>{a.territory}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Paramètres */}
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "16px" : "20px", marginBottom: "12px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: C.texteTert, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "16px" }}>
            Parametres
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "20px" : "24px" }}>
            {/* Montant */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ color: C.texte, fontSize: "13px", fontWeight: 500 }}>Montant investi</label>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <input type="number" value={inputAmount} min={cfg.minAmount} max={cfg.maxAmount}
                    onChange={e => { setInputAmount(e.target.value); const v = parseInt(e.target.value); if (!isNaN(v) && v >= cfg.minAmount && v <= cfg.maxAmount) setAmount(v); }}
                    onBlur={() => { const v = parseInt(inputAmount); const clamped = isNaN(v) ? cfg.defaultAmount : Math.min(cfg.maxAmount, Math.max(cfg.minAmount, v)); setAmount(clamped); setInputAmount(String(clamped)); }}
                    style={{ width: "90px", padding: "5px 8px", border: `1px solid ${C.beigeB}`, borderRadius: "5px", fontSize: "15px", fontWeight: 700, color: C.navy, textAlign: "right", outline: "none" }}
                  />
                  <span style={{ color: C.texteSec, fontSize: "13px" }}>€</span>
                </div>
              </div>
              <input type="range" min={cfg.minAmount} max={cfg.maxAmount} step={100} value={amount}
                onChange={e => { const v = parseInt(e.target.value); setAmount(v); setInputAmount(String(v)); }}
                style={{ width: "100%", accentColor: C.navy }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: C.texteTert, marginTop: "3px" }}>
                <span>{fmt(cfg.minAmount)}</span><span>{fmt(cfg.maxAmount)}</span>
              </div>
            </div>
            {/* Durée */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ color: C.texte, fontSize: "13px", fontWeight: 500 }}>Duree de detention</label>
                <span style={{ color: C.navy, fontSize: "15px", fontWeight: 700 }}>{duration} an{duration > 1 ? "s" : ""}</span>
              </div>
              <input type="range" min={cfg.minDuration} max={cfg.maxDuration} step={1} value={duration}
                onChange={e => setDuration(parseInt(e.target.value))}
                style={{ width: "100%", accentColor: C.navy }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: C.texteTert, marginTop: "3px" }}>
                <span>{cfg.minDuration} an{cfg.minDuration > 1 ? "s" : ""}</span><span>{cfg.maxDuration} ans</span>
              </div>
            </div>
          </div>
          {/* Frais */}
          <div style={{ marginTop: "14px", padding: "10px 12px", background: C.beige, borderRadius: "6px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", color: C.texteSec }}>Entree : <strong>{fmtPct(cfg.entryFee)}</strong></span>
            <span style={{ fontSize: "11px", color: C.texteSec }}>Gestion : <strong>{fmtPct(cfg.managementFee)}</strong></span>
            <span style={{ fontSize: "11px", color: C.texteSec }}>Sortie : <strong>{fmtPct(cfg.exitFee)}</strong></span>
          </div>
        </div>

        {/* Résultats 3 scénarios */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "10px", marginBottom: "12px" }}>
          {(["pessimiste", "realiste", "optimiste"] as const).map(key => {
            const s = C[key];
            const r = results[key];
            const rate = cfg.rates[key];
            return (
              <div key={key} style={{ background: s.bg, borderRadius: "10px", padding: isMobile ? "16px" : "20px", border: `1px solid ${s.border}` }}>
                {isMobile ? (
                  /* Mobile: compact horizontal */
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: s.main, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "4px" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} · {fmtPct(rate)}/an
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: s.main }}>{fmt(r.final)}</div>
                      <div style={{ fontSize: "11px", color: s.main, opacity: .9 }}>{r.gain >= 0 ? "+" : ""}{fmt(r.gain)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "10px", color: s.main, opacity: .8 }}>Rendement net</div>
                      <div style={{ fontSize: "20px", fontWeight: 700, color: s.main }}>{fmtPct(r.annuel)}/an</div>
                    </div>
                  </div>
                ) : (
                  /* Desktop: vertical */
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: s.main, textTransform: "uppercase", letterSpacing: ".08em" }}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                      <div style={{ fontSize: "10px", color: s.main, opacity: .8 }}>{fmtPct(rate)}/an</div>
                    </div>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: s.main, letterSpacing: "-0.5px", marginBottom: "4px" }}>{fmt(r.final)}</div>
                    <div style={{ fontSize: "12px", color: s.main, opacity: .9, marginBottom: "12px" }}>{r.gain >= 0 ? "+" : ""}{fmt(r.gain)} de gain net</div>
                    <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: "10px" }}>
                      <div style={{ fontSize: "10px", color: s.main, opacity: .8, marginBottom: "2px" }}>Rendement net annualise</div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: s.main }}>{fmtPct(r.annuel)}/an</div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Graphique */}
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "16px" : "20px", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: C.texte }}>
              Evolution de {fmt(amount)} sur {duration} an{duration > 1 ? "s" : ""}
            </div>
            <button onClick={() => setShowTable(!showTable)} style={{ background: "transparent", border: `1px solid ${C.beigeB}`, padding: "5px 12px", borderRadius: "5px", fontSize: "11px", color: C.texteSec, cursor: "pointer" }}>
              {showTable ? "Voir le graphique" : "Voir le tableau"}
            </button>
          </div>
          {showTable
            ? <TableauDetail amount={amount} years={duration} cfg={cfg} />
            : <Chart amount={amount} years={duration} cfg={cfg} />
          }
          {!showTable && <div style={{ fontSize: "10px", color: C.texteTert, textAlign: "center", marginTop: "8px" }}>Lignes tirets = placements traditionnels (Livret A, SCPI, Actions)</div>}
        </div>

        {/* Comparaison */}
        <div style={{ background: C.blanc, borderRadius: "10px", border: `0.5px solid ${C.beigeB}`, padding: isMobile ? "16px" : "20px", marginBottom: "12px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: C.texte, marginBottom: "12px" }}>
            Comparaison avec les placements traditionnels — {duration} an{duration > 1 ? "s" : ""}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#E1F5EE", borderRadius: "8px", border: "1.5px solid #9FE1CB" }}>
              <span style={{ fontSize: "18px" }}>{cfg.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#0F6E56" }}>CaribbeanVault — {isMobile ? cfg.label.split(" ")[0] : cfg.label} (realiste)</div>
                <div style={{ fontSize: "10px", color: "#1D9E75", marginTop: "1px" }}>{fmtPct(cfg.rates.realiste)}/an · des {fmt(cfg.minAmount)}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: 800, color: "#0F6E56" }}>{fmt(results.realiste.final)}</div>
                <div style={{ fontSize: "11px", color: "#1D9E75" }}>+{fmt(results.realiste.gain)}</div>
              </div>
            </div>
            {compResults.map(c => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", background: C.beige, borderRadius: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: C.texte }}>{c.label}</div>
                  <div style={{ fontSize: "10px", color: C.texteTert }}>{fmtPct(c.rate)}/an</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: 700, color: C.texte }}>{fmt(c.final)}</div>
                  <div style={{ fontSize: "11px", color: C.texteTert }}>+{fmt(c.gain)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={{ padding: "12px 16px", background: "#FFFBEB", borderRadius: "8px", border: "1px solid #FCD34D44", fontSize: "11px", color: "#92400E", lineHeight: 1.7, marginBottom: "16px" }}>
          <strong>A noter :</strong> {cfg.note} Ces projections sont indicatives. Les performances passees ne garantissent pas les performances futures. Investir comporte des risques.
        </div>

        {/* Liens actifs */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(5, 1fr)" : "repeat(5, 1fr)", gap: "8px", marginBottom: "16px" }}>
          {(Object.entries(ASSETS) as [AssetKey, AssetConfig][]).map(([key, a]) => (
            <Link key={key} href={a.href} style={{ background: asset === key ? C.navy : C.blanc, border: `0.5px solid ${asset === key ? C.navy : C.beigeB}`, borderRadius: "8px", padding: isMobile ? "10px 4px" : "12px 10px", textAlign: "center", textDecoration: "none" }}>
              <div style={{ fontSize: isMobile ? "18px" : "20px", marginBottom: "4px" }}>{a.icon}</div>
              <div style={{ fontSize: "9px", fontWeight: 600, color: asset === key ? "white" : C.texte }}>{a.label.split(" ")[0]}</div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: C.navy, borderRadius: "10px", padding: isMobile ? "24px 16px" : "28px", textAlign: "center" }}>
          <div style={{ color: C.sable, fontSize: "10px", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "10px" }}>Pret a investir ?</div>
          <h2 style={{ color: "white", fontSize: isMobile ? "20px" : "22px", fontWeight: 800, margin: "0 0 10px" }}>Rejoignez la famille CaribbeanVault</h2>
          <p style={{ color: "#B8C4D4", fontSize: "13px", lineHeight: 1.7, margin: "0 0 20px" }}>
            {"Accedez en avant-premiere aux actifs disponibles des 100€, depuis n'importe ou dans le monde."}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/kyc" style={{ background: C.sable, color: "white", padding: "11px 24px", borderRadius: "4px", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              Rejoindre la famille →
            </Link>
            <Link href="/" style={{ background: "transparent", color: "#B8C4D4", border: "1px solid #3A4E6A", padding: "11px 24px", borderRadius: "4px", fontSize: "13px", textDecoration: "none" }}>
              {"Retour a l'accueil"}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}