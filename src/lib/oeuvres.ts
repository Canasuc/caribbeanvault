export interface Oeuvre {
  slug: string;
  titre: string;
  artiste: string;
  artisteInitiales: string;
  artisteBio: string;
  artisteExpositions: string[];
  artisteActu: string;
  origine: string;
  territoire: string;
  annee: number;
  medium: string;
  dimensions: string;
  style: string;
  tag: string;
  tagColor: string;
  couleurs: string[];
  couleurBg: string;
  // Photo de l'oeuvre (Unsplash)
  photo: string;
  photoBandeau: string;
  // Description & histoire
  description: string;
  histoire: string;
  // Investissement
  estimation: number;
  tokens: number;
  disponibles: number;
  prixToken: number;
  royaltes: string;
  rendementEst: string;
  statut: string;
  // Certification
  blockchain: string;
  auditeur: string;
  // Autres
  expositionsOeuvre: string[];
  droits: string;
}

export const OEUVRES: Oeuvre[] = [
  {
    slug: "femme-aux-flamboyants",
    titre: "Femme aux Flamboyants",
    artiste: "Marie-Helene Caumont",
    artisteInitiales: "MH",
    artisteBio: "Nee en 1978 a Fort-de-France, Marie-Helene Caumont est l'une des figures les plus importantes de la peinture neo-creole contemporaine. Formee aux Beaux-Arts de Bordeaux puis de Paris, elle est revenue en Martinique en 2008 pour developper un langage pictural ancre dans la memoire et le paysage caribeen. Son oeuvre explore l'identite feminine, la flore tropicale et les mythes fondateurs de la Caraibe.",
    artisteExpositions: [
      "Fondation Clement, Le Francois, Martinique (2022)",
      "FRAC Martinique, Fort-de-France (2021)",
      "Galerie Habitation Latouche, Martinique (2023)",
      "Salon Art Caraibe, Paris (2019, 2021, 2023)",
    ],
    artisteActu: "Exposition personnelle prevue Fondation Clement — printemps 2026. Serie Femmes-Flore en cours.",
    origine: "Martinique",
    territoire: "martinique",
    annee: 2023,
    medium: "Huile sur toile",
    dimensions: "120 x 90 cm",
    style: "Neo-creole expressionniste",
    tag: "Martinique",
    tagColor: "#0A1A3E",
    couleurs: ["#C8192A", "#F5A623", "#1A6B5A", "#F0E6D2"],
    couleurBg: "#0A1A3E",
    photo: "https://images.unsplash.com/photo-1578926288207-32356a2e7671?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1578926288207-32356a2e7671?w=1200&q=80",
    description: "Femme aux Flamboyants est une oeuvre majeure de la serie Femmes-Flore de Marie-Helene Caumont. Sur un fond de rouge ecarlate rappelant les flamboyants en fleur, une silhouette feminine s'entrelace avec la vegetation tropicale dans un mouvement de fusion et de liberation.",
    histoire: "Cette toile est nee d'un sejour de l'artiste dans le nord de la Martinique, au milieu des grands flamboyants de la saison seche. Caumont souhaitait capturer ce moment precis ou la femme caribeenne devient une avec son paysage — non pas soumise a la nature, mais constitutive de celle-ci. La palette de rouges et d'oranges brulants est tempere par le vert profond de la vegetation, creant une tension entre passion et equilibre qui est au coeur de l'identite martiniquaise.",
    estimation: 8500,
    tokens: 85,
    disponibles: 31,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "12-18%",
    statut: "En levee",
    blockchain: "XRP Ledger — Token ID #CV-ART-2023-001",
    auditeur: "Cabinet Dupont & Associes, Fort-de-France",
    expositionsOeuvre: [
      "Salon Art Caraibe, Paris — mars 2024",
      "Galerie Habitation Latouche, Martinique — janvier 2024",
    ],
    droits: "L'artiste conserve 100% des droits moraux. Les token-holders percoivent 5% de royalties sur chaque revente secondaire, automatiquement distribues via smart contract XRPL.",
  },
  {
    slug: "memoire-de-saint-domingue",
    titre: "Memoire de Saint-Domingue",
    artiste: "Jean-Claude Fortune",
    artisteInitiales: "JC",
    artisteBio: "Jean-Claude Fortune (ne en 1965 a Port-au-Prince) est l'un des plus importants representants de l'art haitien contemporain. Eleve du Centre d'Art de Port-au-Prince, il a developpe un style unique qui fusionne le realisme naif haitien avec une sensibilite conceptuelle contemporaine. Installe a Montreal depuis 1994, il continue de puiser son inspiration dans la memoire historique et culturelle d'Haiti.",
    artisteExpositions: [
      "Myriam Nader Gallery, New York (2023)",
      "Galerie de l'UQAM, Montreal (2022)",
      "Centre d'Art Port-au-Prince (2019)",
      "Salon haitian de la diaspora, Montreal (2021, 2023)",
    ],
    artisteActu: "Nouvelle serie sur la Revolution haitienne en preparation — publication prevue 2026.",
    origine: "Haiti",
    territoire: "haiti",
    annee: 2022,
    medium: "Acrylique sur toile",
    dimensions: "150 x 120 cm",
    style: "Art haitien contemporain",
    tag: "Haiti",
    tagColor: "#1A0A0A",
    couleurs: ["#1A3A8A", "#C8992A", "#8B1A1A", "#F5E8C0"],
    couleurBg: "#1A0A0A",
    photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80",
    description: "Memoire de Saint-Domingue est une fresque narrative qui retrace les grands moments de la Revolution haitienne de 1791 a 1804. Fortune utilise la technique du tableau dans le tableau pour superposer les epoques et les memoires, creant un dialogue entre passe colonial et identite contemporaine.",
    histoire: "Fortune a commence cette oeuvre en 2020, pendant la pandemie, comme une meditation sur la resistance et la survie. La toile s'organise autour d'une figure centrale — mi-historique, mi-mythologique — qui incarne la lutte pour l'independance. Les couleurs bleu et rouge rappellent le drapeau haitien, tandis que l'or symbolise la richesse culturelle jamais detruite. Cette oeuvre a ete saluee par la critique internationale comme l'une des plus importantes de sa generation.",
    estimation: 14000,
    tokens: 140,
    disponibles: 8,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "15-22%",
    statut: "Dernieres places",
    blockchain: "XRP Ledger — Token ID #CV-ART-2022-002",
    auditeur: "Bureau d'expertise Caraibe Art, Paris",
    expositionsOeuvre: [
      "Myriam Nader Gallery, New York — septembre 2023",
      "Salon haitien de la diaspora, Montreal — novembre 2023",
    ],
    droits: "L'artiste conserve 100% des droits moraux. Les token-holders percoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
  },
  {
    slug: "foret-amazonienne-3",
    titre: "Foret Amazonienne 3",
    artiste: "Kali Maloum",
    artisteInitiales: "KM",
    artisteBio: "Kali Maloum (nee en 1990 a Cayenne) est une artiste pluridisciplinaire guyanaise dont le travail explore les liens entre la foret amazonienne, les communautes autochtones et les enjeux ecologiques contemporains. Formee aux Beaux-Arts de Bordeaux, elle est revenue en Guyane en 2018 pour developper une pratique artistique en immersion totale avec la foret primaire.",
    artisteExpositions: [
      "Musee des cultures guyanaises, Cayenne (2023)",
      "FRAC Pays de la Loire, Nantes (2022)",
      "Biennale de l'art africain contemporain, Dakar (2022)",
      "Exposition Amazon — Centre Pompidou, Paris (2024)",
    ],
    artisteActu: "Residence artistique en foret primaire — serie Amazonie #4 en cours. Collaboration avec l'ONF Guyane.",
    origine: "Guyane francaise",
    territoire: "diaspora",
    annee: 2024,
    medium: "Techniques mixtes",
    dimensions: "200 x 140 cm",
    style: "Art contemporain guyanais",
    tag: "Guyane",
    tagColor: "#052A20",
    couleurs: ["#0D4A1A", "#5A8A3C", "#D4C07A", "#1A3D2E"],
    couleurBg: "#052A20",
    photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    description: "Troisieme volet de la serie Foret Amazonienne, cette oeuvre en techniques mixtes combine peinture acrylique, elements vegetaux seches et pigments naturels preleves en foret guyanaise. Elle represente la canopee amazonienne vue de l'interieur — une perspective rare et saisissante.",
    histoire: "Maloum a realise cette oeuvre apres six mois passes en immersion dans la foret primaire de Guyane, en collaboration avec les communautes Teko et Wayampi. Elle utilise des pigments naturels qu'elle a elle-meme prepares — ocres, noirs de charbon, verts de plantes — pour creer une oeuvre qui est litteralement faite de la foret qu'elle represente. Un manifeste ecologique autant qu'une oeuvre d'art.",
    estimation: 11000,
    tokens: 110,
    disponibles: 110,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "13-18%",
    statut: "Nouveau",
    blockchain: "XRP Ledger — Token ID #CV-ART-2024-003",
    auditeur: "Cabinet expertise art contemporain, Bordeaux",
    expositionsOeuvre: [
      "Premiere mondiale prevue — Musee des cultures guyanaises, Cayenne — juin 2025",
    ],
    droits: "L'artiste conserve 100% des droits moraux. Les token-holders percoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
  },
  {
    slug: "bele-nocturne",
    titre: "Bele Nocturne",
    artiste: "David Sejour",
    artisteInitiales: "DS",
    artisteBio: "David Sejour (ne en 1985 a Pointe-a-Pitre) est un peintre guadeloupeen dont l'oeuvre s'inscrit dans la tradition de l'abstraction lyrique caribeenne. Apres des etudes aux Beaux-Arts de Paris, il est retourne en Guadeloupe ou il developpe un travail intimement lie aux sons et aux rythmes de la musique traditionnelle — gwoka, bele, gwo-ka.",
    artisteExpositions: [
      "Memorial ACTe, Pointe-a-Pitre (2022)",
      "Galerie Art Caraibe, Paris (2021)",
      "Biennale Martinique (2019)",
    ],
    artisteActu: "Serie Nuit Caribeenne en cours. Collaboration avec musiciens gwoka pour installation sonore.",
    origine: "Guadeloupe",
    territoire: "guadeloupe",
    annee: 2023,
    medium: "Huile et or sur toile",
    dimensions: "100 x 80 cm",
    style: "Abstraction caribeenne",
    tag: "Guadeloupe",
    tagColor: "#1A0A3E",
    couleurs: ["#0A0A1A", "#C8992A", "#4A2A6A", "#E8E0F0"],
    couleurBg: "#1A0A3E",
    photo: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80",
    description: "Bele Nocturne est une oeuvre abstraite inspiree par les ceremonies de bele — danse rituelle guadeloupeenne pratiquee la nuit a la lueur des torches. La toile capture le mouvement, la transe et la spiritualite de ces rites a travers un jeu de noirs profonds, d'or et de violets.",
    histoire: "Sejour a assiste pendant plusieurs annees aux ceremonies de bele dans le nord de la Guadeloupe. Il a developpe une methode de peinture nocturne — travaillant uniquement la nuit, a la bougie — pour capter l'essence de ces moments. La feuille d'or appliquee en finition rappelle les ornements portes par les danseuses. Cette oeuvre est desormais consideree comme la piece maitresse de sa production.",
    estimation: 6200,
    tokens: 62,
    disponibles: 0,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "10-15%",
    statut: "Complet",
    blockchain: "XRP Ledger — Token ID #CV-ART-2023-004",
    auditeur: "Cabinet Dupont & Associes, Fort-de-France",
    expositionsOeuvre: [
      "Memorial ACTe, Pointe-a-Pitre — octobre 2023",
      "Galerie Art Caraibe, Paris — janvier 2024",
    ],
    droits: "L'artiste conserve 100% des droits moraux. Les token-holders percoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
  },
  {
    slug: "marche-de-jacmel",
    titre: "Marche de Jacmel",
    artiste: "Roseline Augustin",
    artisteInitiales: "RA",
    artisteBio: "Roseline Augustin (nee en 1958 a Jacmel, Haiti) est une maitresse du realisme naif haitien, formee au Centre d'Art de Port-au-Prince dans la tradition d'Hector Hyppolite. Son oeuvre documente la vie quotidienne haitienne avec une precision ethnographique et une jubilation chromatique qui en font l'une des artistes les plus recherchees du marche international.",
    artisteExpositions: [
      "Christie's New York — vente Haitien Art (2022, 2024)",
      "Nader Gallery, New York (2020, 2022, 2024)",
      "Musee du Pantheon National, Port-au-Prince (2019)",
      "Galerie d'art haitien, Montreal (2023)",
    ],
    artisteActu: "Collection privee new-yorkaise en cours d'acquisition. Prix moyen en hausse de 25% depuis 2022.",
    origine: "Haiti",
    territoire: "haiti",
    annee: 2021,
    medium: "Huile sur toile",
    dimensions: "180 x 130 cm",
    style: "Realisme naif haitien",
    tag: "Haiti Millesime",
    tagColor: "#8B1A1A",
    couleurs: ["#E83A2A", "#F5A020", "#2A8A3A", "#4A2ACA"],
    couleurBg: "#1A0A0A",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    description: "Marche de Jacmel est une fresque fourmillante representant le marche dominical de Jacmel — ville historique du sud d'Haiti, capitale culturelle du pays. En 180x130 cm, Augustin capture des dizaines de personnages, d'etals et de scenes de vie avec une precision et une vivacite chromatique saisissantes.",
    histoire: "Augustin a commence a peindre le marche de Jacmel en 1985. Cette toile de 2021 est la plus grande et la plus aboutie de sa serie — une synthese de 36 ans d'observation et de peinture. Chaque personnage a ete etudie d'apres nature, chaque couleur choisie pour evoquer la lumiere specifique des journees haitiennes. C'est une oeuvre testament qui documente un monde en train de disparaitre.",
    estimation: 22000,
    tokens: 220,
    disponibles: 44,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "18-25%",
    statut: "En levee",
    blockchain: "XRP Ledger — Token ID #CV-ART-2021-005",
    auditeur: "Bureau d'expertise Caraibe Art, Paris",
    expositionsOeuvre: [
      "Nader Gallery, New York — mars 2022",
      "Galerie d'art haitien, Montreal — novembre 2023",
      "Estimation Christie's : 20 000 - 25 000 $ (2024)",
    ],
    droits: "L'artiste conserve 100% des droits moraux. Les token-holders percoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
  },
  {
    slug: "droits-musicaux-kase-ko",
    titre: "Droits Musicaux — Kase Ko",
    artiste: "Collectif Zouk Numerique",
    artisteInitiales: "ZN",
    artisteBio: "Le Collectif Zouk Numerique est un groupement de 8 producteurs et compositeurs de Martinique et Guadeloupe, fonde en 2019 pour tokeniser et valoriser le patrimoine musical zouk caribeen. Le collectif reunit des artistes de la nouvelle generation qui souhaitent proteger leurs droits et acceder a de nouveaux modes de financement.",
    artisteExpositions: [
      "Midem Cannes 2023 — showcase droits numeriques",
      "Festival Creole Paris 2022",
      "Konser Zouk Guadeloupe 2023",
    ],
    artisteActu: "Catalogue en cours d'extension — 6 nouveaux titres prevus 2026. Streaming : +2M d'ecoutes/mois.",
    origine: "Martinique & Guadeloupe",
    territoire: "diaspora",
    annee: 2024,
    medium: "Catalogue 12 titres — Droits numeriques",
    dimensions: "Droits streaming + sync + edition",
    style: "Droits musicaux Zouk",
    tag: "Droits musicaux",
    tagColor: "#7B2FBE",
    couleurs: ["#7B2FBE", "#E8B86D", "#1A0A2E", "#F5E8C0"],
    couleurBg: "#1A0A2E",
    photo: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
    description: "Ce token represente une fraction des droits d'exploitation d'un catalogue de 12 titres zouk contemporain — streaming, synchronisation audiovisuelle et edition. Les royalties sont automatiquement distribuees aux token-holders a chaque utilisation commerciale.",
    histoire: "Le Collectif Zouk Numerique est ne d'un constat : les musiciens caribeens perdent une grande partie de leurs revenus face aux intermediaires traditionnels (labels, editeurs). En tokenisant leurs droits sur XRPL, ils permettent a leurs fans et investisseurs de partager directement leurs succes. Le catalogue inclut des titres joues dans plus de 50 pays et utilises dans des productions audiovisuelles europeennes et americaines.",
    estimation: 35000,
    tokens: 350,
    disponibles: 180,
    prixToken: 100,
    royaltes: "8%",
    rendementEst: "15-25%",
    statut: "En levee",
    blockchain: "XRP Ledger — Token ID #CV-MUSIC-2024-006",
    auditeur: "Cabinet juridique musique, Paris · SACEM enregistre",
    expositionsOeuvre: [
      "Midem Cannes 2023 — presentation catalogue",
      "Distribution : Spotify, Apple Music, Deezer, Tidal",
    ],
    droits: "Les token-holders percoivent 8% des revenus nets generes par le catalogue (streaming, sync, edition) distribues trimestriellement via smart contract XRPL.",
  },
];

export function getOeuvre(slug: string): Oeuvre | undefined {
  return OEUVRES.find(o => o.slug === slug);
}

export function getOeuvresByTerritoire(territoire: string): Oeuvre[] {
  return OEUVRES.filter(o => o.territoire === territoire);
}

export function getOeuvreSlug(oeuvre: Oeuvre): string {
  return oeuvre.slug;
}