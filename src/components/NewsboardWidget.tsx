"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { NewsItem } from "@/app/api/news/route";

const C = {
  navy:     "#1A2E4A",
  sable:    "#D4884A",
  creme:    "#F8F6F1",
  grisBord: "#E8E2D6",
  texte:    "#1A2E4A",
  texteSec: "#4A5568",
  texteTert:"#9CA3AF",
};

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000 / 60 / 60);
    if (diff < 1) return "A l'instant";
    if (diff < 24) return `Il y a ${diff}h`;
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

export default function NewsboardWidget() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news?limit=2")
      .then(r => r.json())
      .then(data => {
        setArticles(data.articles?.slice(0, 2) || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {[1, 2].map(i => (
          <div key={i} style={{ background: "white", borderRadius: "10px", border: `0.5px solid ${C.grisBord}`, overflow: "hidden" }}>
            <div style={{ height: "6px", background: "#E5E7EB" }} />
            <div style={{ padding: "14px" }}>
              <div style={{ height: "12px", background: "#F3F4F6", borderRadius: "3px", marginBottom: "8px" }} />
              <div style={{ height: "12px", background: "#F3F4F6", borderRadius: "3px", width: "70%" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
      {articles.map(a => (
        <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ background: "white", borderRadius: "10px", border: `0.5px solid ${C.grisBord}`, overflow: "hidden", transition: "all .2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = a.color; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.grisBord; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
          >
            {/* Barre colorée thème */}
            <div style={{ height: "4px", background: a.color }} />
            <div style={{ padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ background: `${a.color}15`, color: a.color, fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px" }}>
                  {a.icon} {a.theme}
                </span>
                <span style={{ color: C.texteTert, fontSize: "9px" }}>{formatDate(a.date)}</span>
              </div>
              <div style={{ color: C.texte, fontSize: "12px", fontWeight: 600, lineHeight: 1.5, marginBottom: "6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {a.titre}
              </div>
              <div style={{ color: a.color, fontSize: "10px", fontWeight: 600 }}>Lire l'article →</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}