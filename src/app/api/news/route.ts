import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "CaribbeanVault Newsboard/1.0" },
});

// Sources RSS par thème
const SOURCES = [
  // Caraïbe & DOM français
  {
    url: "https://outremers360.com/feed",
    theme: "Immobilier",
    icon: "🏠",
    color: "#0891B2",
  },
  // RWA & Blockchain anglophone
  {
    url: "https://www.coindesk.com/arc/outboundfeeds/rss/",
    theme: "Blockchain",
    icon: "⛓️",
    color: "#7C3AED",
  },
  {
    url: "https://thedefiant.io/feed",
    theme: "RWA",
    icon: "🔗",
    color: "#0F5240",
  },
  {
    url: "https://decrypt.co/feed",
    theme: "Blockchain",
    icon: "⛓️",
    color: "#7C3AED",
  },
  // Immobilier international
  {
    url: "https://www.inman.com/feed/",
    theme: "Immobilier",
    icon: "🏠",
    color: "#0891B2",
  },
  // Agriculture & rhum Amériques
  {
    url: "https://www.agriculture.gouv.fr/RSS",
    theme: "Agriculture",
    icon: "🌿",
    color: "#2C3A1E",
  },
  {
    url: "https://www.distilledspirits.org/feed/",
    theme: "Rhum",
    icon: "🥃",
    color: "#C8992A",
  },
  // Amériques hispanophone
  {
    url: "https://www.eleconomista.es/rss/rss-mercado-inmobiliario.php",
    theme: "Immobilier",
    icon: "🏠",
    color: "#0891B2",
  },
  {
    url: "https://criptotendencia.com/feed/",
    theme: "Blockchain",
    icon: "⛓️",
    color: "#7C3AED",
  },
  // Caraïbe anglophone
  {
    url: "https://www.jamaicaobserver.com/feed/",
    theme: "Agriculture",
    icon: "🌿",
    color: "#2C3A1E",
  },
  {
    url: "https://www.caribbeannationalweekly.com/feed/",
    theme: "Immobilier",
    icon: "🏠",
    color: "#0891B2",
  },

];

export interface NewsItem {
  id: string;
  titre: string;
  resume: string;
  source: string;
  url: string;
  date: string;
  theme: string;
  icon: string;
  color: string;
  image?: string;
}

async function fetchRSS(source: typeof SOURCES[number]): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items = feed.items.slice(0, 5);
    return items.map((item, i) => ({
      id: `${source.theme}-${i}-${Date.now()}`,
      titre: item.title || "Sans titre",
      resume: item.contentSnippet?.slice(0, 200) || item.summary?.slice(0, 200) || "",
      source: feed.title || source.url,
      url: item.link || "#",
      date: item.pubDate || new Date().toISOString(),
      theme: source.theme,
      icon: source.icon,
      color: source.color,
      image: item.enclosure?.url || "",
    }));
  } catch {
    return [];
  }
}

async function resumeAvecClaude(articles: NewsItem[]): Promise<NewsItem[]> {
  if (articles.length === 0) return articles;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: `Tu es un assistant qui résume des articles de presse pour la plateforme CaribbeanVault, spécialisée dans les actifs réels caribéens tokenisés (rhum AOC, immobilier, agriculture, blockchain RWA). 

Les articles peuvent être en français, anglais ou espagnol. 
Pour chaque article, génère un résumé court (2-3 phrases, 80 mots max) en FRANÇAIS, percutant et orienté investisseur caribéen. 
Réponds UNIQUEMENT avec un JSON valide, sans markdown, sans backticks, format exact : {"resumes": ["résumé1", "résumé2", ...]}`,
        messages: [{
          role: "user",
          content: `Résume ces ${articles.length} articles :\n${articles.map((a, i) => `${i + 1}. Titre: ${a.titre}\nTexte: ${a.resume}`).join("\n\n")}`,
        }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const parsed = JSON.parse(text);

    return articles.map((a, i) => ({
      ...a,
      resume: parsed.resumes?.[i] || a.resume,
    }));
  } catch {
    return articles;
  }
}

// Cache simple en mémoire
let cache: { data: NewsItem[]; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get("theme");
  const limit = parseInt(searchParams.get("limit") || "20");

  // Vérifier le cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    let data = cache.data;
    if (theme && theme !== "tous") data = data.filter(n => n.theme === theme);
    return NextResponse.json({ articles: data.slice(0, limit), cached: true });
  }

  // Fetch tous les flux RSS en parallèle
  const allArticles = await Promise.all(SOURCES.map(fetchRSS));
  let articles = allArticles.flat();

  // Trier par date
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Résumer avec Claude (les 10 premiers)
  const top10 = articles.slice(0, 10);
  const rest = articles.slice(10);
  const resumés = await resumeAvecClaude(top10);
  articles = [...resumés, ...rest];

  // Mettre en cache
  cache = { data: articles, timestamp: Date.now() };

  // Filtrer si nécessaire
  if (theme && theme !== "tous") articles = articles.filter(n => n.theme === theme);

  return NextResponse.json({ articles: articles.slice(0, limit), cached: false });
}