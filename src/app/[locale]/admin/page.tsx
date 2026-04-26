"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { LogoNavy } from "@/components/Logo";
import Link from "next/link";

const ADMIN_EMAIL = "contact@geccostrategy.com";

const C = {
  navy:    "#1A2E4A",
  navyD:   "#0F1E30",
  navyL:   "#253D5E",
  orange:  "#D4884A",
  gris:    "#F8F6F1",
  grisBord:"#E8E2D6",
  texte:   "#1A2E4A",
  texteSec:"#4A5568",
  texteTert:"#9CA3AF",
  blanc:   "#FFFFFF",
};

const STATUTS = [
  { val: "en_attente",  label: "En attente",  bg: "#FEF3C7", color: "#92400E" },
  { val: "en_cours",   label: "En cours",    bg: "#DBEAFE", color: "#1E40AF" },
  { val: "valide",     label: "Validé",      bg: "#D1FAE5", color: "#065F46" },
  { val: "rejete",     label: "Rejeté",      bg: "#FEE2E2", color: "#991B1B" },
];

function StatutBadge({ statut }: { statut: string }) {
  const s = STATUTS.find(s => s.val === statut) || STATUTS[0];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", letterSpacing: ".05em", whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

interface Investisseur {
  id: string;
  created_at: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  pays: string;
  actif_interet: string;
  montant_envisage: string;
  statut_investisseur: string;
  message: string;
  statut: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [investisseurs, setInvestisseurs] = useState<Investisseur[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [filtre, setFiltre] = useState<string>("tous");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Investisseur | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push("/fr/admin/login"); return; }
      if (session.user.email !== ADMIN_EMAIL) { router.push("/fr/dashboard"); return; }
      setAuthorized(true);
      fetchInvestisseurs();
    });
  }, []);

  async function fetchInvestisseurs() {
    setLoading(true);
    const { data, error } = await supabase
      .from("investisseurs")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setInvestisseurs(data);
    setLoading(false);
  }

  async function updateStatut(id: string, newStatut: string) {
    setUpdating(id);
    const { error } = await supabase
      .from("investisseurs")
      .update({ statut: newStatut })
      .eq("id", id);
    if (!error) {
      setInvestisseurs(prev => prev.map(inv => inv.id === id ? { ...inv, statut: newStatut } : inv));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, statut: newStatut } : null);
      showToast(`Statut mis à jour → ${STATUTS.find(s => s.val === newStatut)?.label}`);
    }
    setUpdating(null);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const filtres = [
    { key: "tous", label: "Tous", count: investisseurs.length },
    ...STATUTS.map(s => ({ key: s.val, label: s.label, count: investisseurs.filter(i => i.statut === s.val).length })),
  ];

  const filtrees = investisseurs.filter(inv => {
    const matchFiltre = filtre === "tous" || inv.statut === filtre;
    const matchSearch = !search || [inv.prenom, inv.nom, inv.email, inv.pays, inv.actif_interet]
      .some(f => f?.toLowerCase().includes(search.toLowerCase()));
    return matchFiltre && matchSearch;
  });

  const stats = {
    total: investisseurs.length,
    enAttente: investisseurs.filter(i => i.statut === "en_attente").length,
    valides: investisseurs.filter(i => i.statut === "valide").length,
    enCours: investisseurs.filter(i => i.statut === "en_cours").length,
  };

  if (!authorized) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.gris }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
        <div style={{ color: C.texteSec, fontSize: "14px" }}>Vérification des droits...</div>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: C.gris, minHeight: "100vh" }}>

      {/* NAVBAR ADMIN */}
      <nav style={{ background: C.navy, borderBottom: `1px solid ${C.navyL}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/fr" style={{ textDecoration: "none" }}>
              <LogoNavy size={0.6} />
            </Link>
            <div style={{ width: "1px", height: "24px", background: C.navyL }} />
            <div style={{ color: C.orange, fontSize: "12px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Admin
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "#6B8AAA", fontSize: "12px" }}>{ADMIN_EMAIL}</span>
            <button onClick={() => supabase.auth.signOut().then(() => router.push("/fr"))}
              style={{ background: "transparent", border: `1px solid ${C.navyL}`, color: "#6B8AAA", padding: "6px 14px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>
              Se déconnecter
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Total candidats", val: stats.total, icon: "👥", color: C.navy },
            { label: "En attente", val: stats.enAttente, icon: "⏳", color: "#92400E" },
            { label: "En cours", val: stats.enCours, icon: "🔄", color: "#1E40AF" },
            { label: "Validés", val: stats.valides, icon: "✅", color: "#065F46" },
          ].map((s, i) => (
            <div key={i} style={{ background: C.blanc, borderRadius: "8px", padding: "16px 20px", border: `0.5px solid ${C.grisBord}`, borderLeft: `4px solid ${s.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: C.texteTert, fontSize: "11px", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ color: s.color, fontSize: "28px", fontWeight: 800 }}>{s.val}</div>
                </div>
                <span style={{ fontSize: "28px", opacity: .6 }}>{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FILTRES + SEARCH */}
        <div style={{ background: C.blanc, borderRadius: "8px", border: `0.5px solid ${C.grisBord}`, padding: "16px 20px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {filtres.map(f => (
              <button key={f.key} onClick={() => setFiltre(f.key)}
                style={{ padding: "6px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: 600, border: filtre === f.key ? `1.5px solid ${C.navy}` : `1px solid ${C.grisBord}`, background: filtre === f.key ? C.navy : C.blanc, color: filtre === f.key ? "white" : C.texteSec, transition: "all .15s" }}>
                {f.label} <span style={{ opacity: .7, fontWeight: 400 }}>({f.count})</span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Rechercher nom, email, pays..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: "8px 14px", borderRadius: "6px", border: `1px solid ${C.grisBord}`, fontSize: "13px", color: C.texte, outline: "none", width: "260px", fontFamily: "system-ui" }}
          />
        </div>

        {/* TABLE + DETAIL */}
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: "16px", alignItems: "start" }}>

          {/* TABLE */}
          <div style={{ background: C.blanc, borderRadius: "8px", border: `0.5px solid ${C.grisBord}`, overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: "48px", textAlign: "center", color: C.texteTert }}>Chargement...</div>
            ) : filtrees.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center", color: C.texteTert }}>Aucun résultat</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.gris, borderBottom: `1px solid ${C.grisBord}` }}>
                    {["Date", "Nom", "Email", "Pays", "Actif", "Montant", "Statut", "Actions"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "10px", fontWeight: 700, color: C.texteTert, textTransform: "uppercase", letterSpacing: ".08em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtrees.map((inv, i) => (
                    <tr key={inv.id}
                      onClick={() => setSelected(selected?.id === inv.id ? null : inv)}
                      style={{ borderBottom: `0.5px solid ${C.grisBord}`, background: selected?.id === inv.id ? "#F0F4FF" : i % 2 === 0 ? C.blanc : C.gris, cursor: "pointer", transition: "background .15s" }}
                      onMouseEnter={e => { if (selected?.id !== inv.id) (e.currentTarget as HTMLTableRowElement).style.background = "#F5F7FA"; }}
                      onMouseLeave={e => { if (selected?.id !== inv.id) (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? C.blanc : C.gris; }}
                    >
                      <td style={{ padding: "10px 14px", fontSize: "11px", color: C.texteTert, whiteSpace: "nowrap" }}>
                        {new Date(inv.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "13px", fontWeight: 600, color: C.texte, whiteSpace: "nowrap" }}>
                        {inv.prenom} {inv.nom}
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "12px", color: C.texteSec }}>
                        {inv.email}
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "12px", color: C.texteSec }}>
                        {inv.pays}
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ background: "#F0F4FF", color: C.navy, fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px" }}>
                          {inv.actif_interet}
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "12px", color: C.texteSec, whiteSpace: "nowrap" }}>
                        {inv.montant_envisage}
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <StatutBadge statut={inv.statut} />
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: "4px" }} onClick={e => e.stopPropagation()}>
                          {STATUTS.filter(s => s.val !== inv.statut).slice(0, 2).map(s => (
                            <button key={s.val} onClick={() => updateStatut(inv.id, s.val)}
                              disabled={updating === inv.id}
                              style={{ background: s.bg, color: s.color, border: "none", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 600, cursor: "pointer", opacity: updating === inv.id ? .5 : 1, whiteSpace: "nowrap" }}>
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* DETAIL PANEL */}
          {selected && (
            <div style={{ background: C.blanc, borderRadius: "8px", border: `0.5px solid ${C.grisBord}`, padding: "20px", position: "sticky", top: "80px" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <div style={{ color: C.texte, fontSize: "16px", fontWeight: 700 }}>{selected.prenom} {selected.nom}</div>
                  <div style={{ color: C.texteSec, fontSize: "12px", marginTop: "2px" }}>{selected.email}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: C.texteTert, lineHeight: 1 }}>×</button>
              </div>

              <StatutBadge statut={selected.statut} />

              {/* Infos */}
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Date d'inscription", val: new Date(selected.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) },
                  { label: "Téléphone", val: selected.telephone || "—" },
                  { label: "Pays", val: selected.pays },
                  { label: "Actif d'intérêt", val: selected.actif_interet },
                  { label: "Montant envisagé", val: selected.montant_envisage },
                  { label: "Statut investisseur", val: selected.statut_investisseur },
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `0.5px solid ${C.grisBord}` }}>
                    <span style={{ color: C.texteTert, fontSize: "12px" }}>{r.label}</span>
                    <span style={{ color: C.texte, fontSize: "12px", fontWeight: 600, textAlign: "right", maxWidth: "180px" }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Message */}
              {selected.message && (
                <div style={{ marginTop: "14px" }}>
                  <div style={{ color: C.texteTert, fontSize: "11px", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "6px" }}>Message</div>
                  <div style={{ background: C.gris, borderRadius: "6px", padding: "10px 12px", color: C.texteSec, fontSize: "13px", lineHeight: 1.6 }}>
                    {selected.message}
                  </div>
                </div>
              )}

              {/* Changer statut */}
              <div style={{ marginTop: "16px" }}>
                <div style={{ color: C.texteTert, fontSize: "11px", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "8px" }}>Changer le statut</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {STATUTS.map(s => (
                    <button key={s.val} onClick={() => updateStatut(selected.id, s.val)}
                      disabled={selected.statut === s.val || updating === selected.id}
                      style={{ background: selected.statut === s.val ? s.bg : C.blanc, color: selected.statut === s.val ? s.color : C.texteSec, border: `1px solid ${selected.statut === s.val ? s.color : C.grisBord}`, padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: selected.statut === s.val ? 700 : 400, cursor: selected.statut === s.val ? "default" : "pointer", textAlign: "left", opacity: updating === selected.id ? .5 : 1, transition: "all .15s" }}>
                      {selected.statut === s.val ? "✓ " : ""}{s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions email */}
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `0.5px solid ${C.grisBord}` }}>
                <a href={`mailto:${selected.email}?subject=CaribbeanVault — Votre dossier`}
                  style={{ display: "block", background: C.navy, color: "white", padding: "10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                  ✉ Envoyer un email →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Refresh */}
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <button onClick={fetchInvestisseurs} style={{ background: C.blanc, border: `1px solid ${C.grisBord}`, color: C.texteSec, padding: "8px 16px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>
            🔄 Actualiser
          </button>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: C.navy, color: "white", padding: "12px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,.2)", zIndex: 999, animation: "fadeIn .2s ease" }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}