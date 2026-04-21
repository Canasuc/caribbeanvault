

// ─── Logo 5C — Marine & Sable (page d'accueil, courriers, mails) ──────────────
export function LogoNavy({ size = 1 }: { size?: number }) {
  const s = size;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${14 * s}px` }}>
      {/* Monogramme CV */}
      <div style={{ display: "flex", alignItems: "center", gap: `${3 * s}px` }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${52 * s}px`,
          fontWeight: 700,
          color: "#D4884A",
          lineHeight: 1,
        }}>C</span>

        {/* Silhouette antillaise miniature */}
<div style={{
  width: `${6 * s}px`,
  height: `${6 * s}px`,
  borderRadius: "50%",
  background: "#D4884A",
  opacity: 0.8,
  flexShrink: 0,
}} />

        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${52 * s}px`,
          fontWeight: 400,
          color: "#1A2E4A",
          lineHeight: 1,
          opacity: 0.9,
        }}>V</span>
      </div>

{/* Filet séparateur */}
      <div style={{ width: "0.5px", height: `${40 * s}px`, background: "#D4884A", opacity: 0.3 }} />

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: `${12 * s}px`, letterSpacing: `${0.25 * s}em`, color: "#1A2E4A", fontWeight: 400, lineHeight: 1.2 }}>CARIBBEAN</div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: `${12 * s}px`, letterSpacing: `${0.25 * s}em`, color: "#D4884A", fontWeight: 600, lineHeight: 1.2 }}>VAULT</div>
        <div style={{ fontSize: `${6 * s}px`, letterSpacing: `${0.15 * s}em`, color: "#4A5568", opacity: 0.6, fontFamily: "system-ui", marginTop: `${2 * s}px` }}>ACTIFS REELS - CARAIBE</div>
      </div>
    </div>
  );

}

// ─── Logo 5D — Émeraude & Or (Rhum, Distilleries, Agriculture) ────────────────
export function LogoEmeraude({ size = 1 }: { size?: number }) {
  const s = size;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${10 * s}px` }}>
      {/* C avec feuilles de canne */}
      <div style={{ position: "relative" }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${48 * s}px`,
          fontWeight: 700,
          color: "#C8992A",
          lineHeight: 1,
          display: "block",
        }}>C</span>
        {/* Feuilles de canne miniatures */}
        <svg
          style={{ position: "absolute", bottom: `${-6 * s}px`, left: `${-4 * s}px` }}
          width={`${32 * s}`} height={`${36 * s}`}
          viewBox="0 0 32 36"
        >
          <path d="M16 32 Q13 24 10 15 Q8 8 11 3" fill="none" stroke="#4A7A2E" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 15 Q2 9 0 1 Q4 6 9 11 Q11 14 11 15Z" fill="#4A7A2E"/>
          <path d="M11 9 Q18 4 19 -1 Q14 3 11 9Z" fill="#5A8A3C" opacity=".8"/>
          <path d="M10 20 Q4 15 2 8 Q6 12 10 20Z" fill="#5A8A3C" opacity=".7"/>
          <circle cx="11" cy="15" r="2" fill="#D4C07A"/>
          <circle cx="11" cy="9" r="1.5" fill="#C8992A"/>
          <path d="M9 2 Q8 -1 6 -3" fill="none" stroke="#D4C07A" strokeWidth="1" strokeLinecap="round"/>
          <path d="M11 1 Q11 -2 10 -4" fill="none" stroke="#E8B86D" strokeWidth="1" strokeLinecap="round"/>
          <path d="M13 2 Q15 -1 16 -3" fill="none" stroke="#D4C07A" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Silhouette antillaise */}
      <svg width={`${22 * s}`} height={`${54 * s}`} viewBox="0 0 22 54" style={{ flexShrink: 0 }}>
        <ellipse cx="11" cy="9" rx="6.5" ry="7" fill="#2C1A0E"/>
        <rect x="8" y="15" width="7" height="6" fill="#2C1A0E" rx="1"/>
        <path d="M3 21 Q9 18 19 18 Q22 20 22 23 L22 46 L0 46 Z" fill="#2C1A0E"/>
        <path d="M3 26 Q9 23 19 23 Q22 25 22 27 L22 46 L0 46 Z" fill="#F5F0E8" opacity=".9"/>
        {/* Madras */}
        <path d="M5 8 Q8 1 11 0 Q14 1 17 8 Q14 4 11 3 Q8 4 5 8Z" fill="#C8992A"/>
        <path d="M5 8 Q8 2 11 0" fill="none" stroke="#1A4A1A" strokeWidth="1.2" strokeLinecap="round" opacity=".8"/>
        <path d="M11 8 Q14 2 16 1" fill="none" stroke="#1A4A1A" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
        <path d="M6 8 Q9 3 11 1" fill="none" stroke="#6B1111" strokeWidth="0.8" strokeLinecap="round" opacity=".6"/>
        <path d="M17 5 Q20 1 21 4 Q20 7 17 8Z" fill="#C8992A"/>
        {/* Boucles créoles */}
        <circle cx="2" cy="17" r="3" fill="none" stroke="#C8992A" strokeWidth="1.2"/>
        <circle cx="20" cy="17" r="3" fill="none" stroke="#C8992A" strokeWidth="1.2"/>
        {/* Collier */}
        <path d="M5 26 Q11 30 17 26" fill="none" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="27" r="1.2" fill="#F5F0E8"/>
        <circle cx="11" cy="28" r="1.2" fill="#F5F0E8"/>
        <circle cx="14" cy="27" r="1.2" fill="#F5F0E8"/>
      </svg>

      {/* V */}
      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: "italic",
        fontSize: `${48 * s}px`,
        fontWeight: 400,
        color: "#F0E6C8",
        lineHeight: 1,
        opacity: 0.88,
      }}>V</span>

      {/* Filet */}
      <div style={{ width: "0.5px", height: `${38 * s}px`, background: "#C8992A", opacity: 0.3 }} />

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: `${11 * s}px`,
          letterSpacing: ".22em",
          color: "#F0E6C8",
          fontWeight: 400,
          lineHeight: 1.2,
        }}>CARIBBEAN</div>
        <div style={{
          fontFamily: "'Cinzel', Georgia, serif",
          fontSize: `${11 * s}px`,
          letterSpacing: ".22em",
          color: "#C8992A",
          fontWeight: 600,
          lineHeight: 1.2,
        }}>VAULT</div>
        <div style={{
          fontSize: `${6 * s}px`,
          letterSpacing: ".15em",
          color: "#9FE1CB",
          opacity: 0.55,
          fontFamily: "system-ui",
          marginTop: "2px",
        }}>{"EST. 2026 - GUADELOUPE & MARTINIQUE"}</div>
      </div>
    </div>
  );
}

// ─── Logo 5A — Nuit Caribéenne (Art Créole, Simulateur) ───────────────────────
export function LogoNuit({ size = 1 }: { size?: number }) {
  const s = size;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: `${6 * s}px` }}>
      {/* Filet décoratif haut */}
      <div style={{ display: "flex", alignItems: "center", gap: `${8 * s}px`, width: `${220 * s}px` }}>
        <div style={{ flex: 1, height: "0.5px", background: "#E8B86D", opacity: 0.3 }} />
        <span style={{ color: "#E8B86D", fontSize: `${7 * s}px`, opacity: 0.5 }}>✦</span>
        <div style={{ flex: 1, height: "0.5px", background: "#E8B86D", opacity: 0.3 }} />
      </div>

      {/* C · V */}
      <div style={{ display: "flex", alignItems: "center", gap: `${6 * s}px` }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${72 * s}px`,
          fontWeight: 700,
          color: "#E8B86D",
          lineHeight: 1,
        }}>C</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: `${4 * s}px` }}>
          <div style={{ width: `${4 * s}px`, height: `${4 * s}px`, borderRadius: "50%", background: "#E8B86D", opacity: 0.7 }} />
          <div style={{ width: "0.5px", height: `${32 * s}px`, background: "#E8B86D", opacity: 0.2 }} />
          <div style={{ width: `${4 * s}px`, height: `${4 * s}px`, borderRadius: "50%", background: "#E8B86D", opacity: 0.7 }} />
        </div>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${72 * s}px`,
          fontWeight: 400,
          color: "#F5F0FF",
          lineHeight: 1,
          opacity: 0.9,
        }}>V</span>
      </div>

      {/* Wordmark */}
      <div style={{
        fontFamily: "'Cinzel', Georgia, serif",
        fontSize: `${11 * s}px`,
        letterSpacing: `${0.4 * s}em`,
        color: "#F5F0FF",
        opacity: 0.75,
        marginTop: `${-4 * s}px`,
      }}>CaribbeanVault</div>

      {/* Tagline */}
      <div style={{
        fontSize: `${6.5 * s}px`,
        letterSpacing: `${0.22 * s}em`,
        color: "#C084FC",
        opacity: 0.6,
        fontFamily: "system-ui",
      }}>{"ACTIFS REELS - CARAIBE - BLOCKCHAIN"}</div>

      {/* Filet décoratif bas */}
      <div style={{ display: "flex", alignItems: "center", gap: `${8 * s}px`, width: `${220 * s}px` }}>
        <div style={{ flex: 1, height: "0.5px", background: "#E8B86D", opacity: 0.3 }} />
        <span style={{ color: "#E8B86D", fontSize: `${7 * s}px`, opacity: 0.5 }}>✦</span>
        <div style={{ flex: 1, height: "0.5px", background: "#E8B86D", opacity: 0.3 }} />
      </div>
    </div>
  );
}
// ─── Logo Turquoise (page Immobilier) ─────────────────────────────────────────
export function LogoTurquoise({ size = 1 }: { size?: number }) {
  const s = size;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${14 * s}px` }}>
      {/* Monogramme CV */}
      <div style={{ display: "flex", alignItems: "center", gap: `${3 * s}px` }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${52 * s}px`,
          fontWeight: 700,
          color: "#0891B2",
          lineHeight: 1,
        }}>C</span>
        <div style={{
          width: `${6 * s}px`,
          height: `${6 * s}px`,
          borderRadius: "50%",
          background: "#0891B2",
          opacity: 0.7,
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: `${52 * s}px`,
          fontWeight: 400,
          color: "#111827",
          lineHeight: 1,
          opacity: 0.9,
        }}>V</span>
      </div>

      {/* Filet séparateur */}
      <div style={{ width: "0.5px", height: `${40 * s}px`, background: "#0891B2", opacity: 0.3 }} />

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: `${12 * s}px`, letterSpacing: `${0.25 * s}em`, color: "#111827", fontWeight: 400, lineHeight: 1.2 }}>CARIBBEAN</div>
        <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: `${12 * s}px`, letterSpacing: `${0.25 * s}em`, color: "#0891B2", fontWeight: 600, lineHeight: 1.2 }}>VAULT</div>
        <div style={{ fontSize: `${6 * s}px`, letterSpacing: `${0.15 * s}em`, color: "#4B5563", opacity: 0.6, fontFamily: "system-ui", marginTop: `${2 * s}px` }}>ACTIFS REELS - CARAIBE</div>
      </div>
    </div>
  );
}