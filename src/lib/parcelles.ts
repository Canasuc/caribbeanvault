export interface Parcelle {
  slug: string;
  nom: string;
  culture: string;
  producteur: string;
  ile: string;
  region: string;
  lieu: string;
  surface: string;
  fondee: number;
  statut: string;
  certification: string;
  icone: string;
  tag: string;
  tagColor: string;
  couleur: string;
  photo: string;
  photoBandeau: string;
  description: string;
  histoire: string;
  techniques: string[];
  certificationDetails: string[];
  recompenses: string[];
  tokens: number;
  disponibles: number;
  prixToken: number;
  rendementEst: string;
  duree: string;
  recolte: string;
  assurance: string;
  coordonnees: { lat: number; lng: number };
  adresse: string;
  site?: string;
}

export const PARCELLES: Parcelle[] = [
  {
    slug: "banane-igp-capesterre",
    nom: "Banane IGP Antilles — Capesterre",
    culture: "Banane IGP Antilles",
    producteur: "Cooperative GIPAM",
    ile: "Guadeloupe",
    region: "Basse-Terre",
    lieu: "Capesterre-Belle-Eau, Guadeloupe",
    surface: "18 hectares",
    fondee: 1978,
    statut: "Cooperative de 12 producteurs — 3eme generation",
    certification: "IGP Antilles · Agriculture Raisonnee",
    icone: "🍌",
    tag: "IGP Certifiee",
    tagColor: "#3B6D11",
    couleur: "#1E2D14",
    photo: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80",
    description: "La Cooperative GIPAM regroupe 12 producteurs de banane IGP sur 18 hectares a Capesterre-Belle-Eau, au coeur de la Basse-Terre volcanique. Une production tracable, certifiee et assurance recolte incluse.",
    histoire: "Fondee en 1978, la Cooperative GIPAM (Groupement Interprofessionnel pour la promotion des Productions Agricoles et Maraicheres) reunit des producteurs de banane de Capesterre-Belle-Eau depuis trois generations. Implantee sur les flancs fertiles du massif de la Soufriere, la cooperative beneficie d'un sol volcanique d'exception et d'une pluviometrie naturelle abondante qui elimine le besoin d'irrigation artificielle. Pionniere de l'agriculture raisonnee aux Antilles, GIPAM a reduit de 80% l'utilisation de produits phytosanitaires depuis 2010, en substituant des solutions biologiques innovantes. Ses bananes, reconnues IGP Antilles depuis 2009, sont exportees vers la metropole et l'Europe, ou elles jouissent d'une reputation d'excellence.",
    techniques: [
      "Plantation en courbes de niveau pour limiter l'erosion",
      "Desherbage mecanique — zero herbicide chimique",
      "Couverture du sol par mulching organique",
      "Filets anti-insectes sur chaque regime",
      "Irrigation gravitaire depuis les sources naturelles",
      "Compostage integre des residus de recolte",
    ],
    certificationDetails: [
      "IGP Antilles — certification europeenne depuis 2009",
      "Agriculture Raisonnee — renouvellement annuel",
      "Tracabilite parcelle par parcelle",
      "Audits terrain trimestriels par organisme agree",
    ],
    recompenses: [
      "Prix de l'Innovation Agricole — Salon de l'Agriculture 2022",
      "Label Terroir d'Excellence — Region Guadeloupe 2023",
      "Mention Speciale IGP — Commission Europeenne 2021",
    ],
    tokens: 160,
    disponibles: 72,
    prixToken: 250,
    rendementEst: "12-16%",
    duree: "12 mois",
    recolte: "Juillet 2026",
    assurance: "80% couverts en cas de cyclone ou catastrophe naturelle",
    coordonnees: { lat: 16.04, lng: -61.57 },
    adresse: "Zone agricole de Capesterre-Belle-Eau, 97130 Guadeloupe",
  },
  {
    slug: "cafe-bonifieur-vieux-habitants",
    nom: "Cafe Bonifieur Grand Cru — Domaine Vanibel",
    culture: "Cafe Bonifieur",
    producteur: "Domaine Vanibel",
    ile: "Guadeloupe",
    region: "Basse-Terre",
    lieu: "Vieux-Habitants, Guadeloupe",
    surface: "4 hectares",
    fondee: 1952,
    statut: "Famille Vanibel — 3eme generation",
    certification: "Grand Cru · Agriculture Biologique",
    icone: "☕",
    tag: "Grand Cru",
    tagColor: "#854F0B",
    couleur: "#3B2010",
    photo: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&q=80",
    description: "Le cafe Bonifieur de Vieux-Habitants est le tresor cache de la Guadeloupe. Cultive en altitude sur des terres volcaniques, certifie Bio et classe Grand Cru, c'est l'un des cafes les plus rares et les plus recherches de la Caraibe.",
    histoire: "Le Domaine Vanibel, fonde en 1952 par la famille du meme nom, perpetue depuis trois generations la tradition cafeicole de Vieux-Habitants. Cette commune de Basse-Terre est historiquement la capitale du cafe guadeloupeen, grace a son altitude (300 a 600m), son exposition nord et ses sols volcaniques riches. Le Bonifieur, variete locale derivee du Typica arabica, produit des cerises d'une rare complexite aromatique — notes de chocolat, fleurs, agrumes et noisette. Apres une decennie difficile liee a la crise du cafe des annees 1990, Marie-Claire Vanibel a relance le domaine en 2008 avec une conversion integrale en agriculture biologique et une demarche Grand Cru inspiree du modele viticole. Aujourd'hui, le Bonifieur Vanibel est servi dans les plus grands palaces parisiens et new-yorkais.",
    techniques: [
      "Cueillette selective a la main — cerises parfaitement mures uniquement",
      "Traitement par voie humide — depulpage et fermentation 48h",
      "Sechage solaire sur claies sureleves — 3 a 4 semaines",
      "Torrefaction artisanale sur place — profil clair a moyen",
      "Tri manuel grain par grain avant conditionnement",
      "Zero intrant chimique — fertilisation au compost vegetal",
    ],
    certificationDetails: [
      "Agriculture Biologique — certifie AB par Ecocert depuis 2011",
      "Grand Cru Guadeloupe — classification terroir depuis 2015",
      "Origine Controlee — commune de Vieux-Habitants uniquement",
      "Tracabilite lot par lot — du pied de cafeier a la tasse",
    ],
    recompenses: [
      "Medaille d'Or — Concours du Meilleur Cafe Francais 2023",
      "Best Caribbean Coffee — London Coffee Festival 2022",
      "Grand Prix du Terroir — Salon de l'Agriculture 2023",
    ],
    tokens: 80,
    disponibles: 18,
    prixToken: 400,
    rendementEst: "15-22%",
    duree: "14 mois",
    recolte: "Octobre 2026",
    assurance: "80% couverts en cas de cyclone, secheresse ou maladie fongique",
    coordonnees: { lat: 15.99, lng: -61.75 },
    adresse: "Domaine Vanibel, Vieux-Habitants, 97119 Guadeloupe",
    site: "https://www.cafe-bonifieur.com",
  },
  {
    slug: "cacao-fin-martinique",
    nom: "Cacao Fin de Martinique — Plantation Bellevue",
    culture: "Cacao Fin de Martinique",
    producteur: "Plantation Bellevue",
    ile: "Martinique",
    region: "Centre Atlantique",
    lieu: "Le Robert, Martinique",
    surface: "8 hectares",
    fondee: 1965,
    statut: "Famille Bellevue — 3eme generation",
    certification: "Cacao Fin · Bio certifie AB",
    icone: "🍫",
    tag: "Bio AB",
    tagColor: "#5A8A3C",
    couleur: "#2C1A0A",
    photo: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1548940740-204726a19be3?w=1200&q=80",
    description: "La Plantation Bellevue cultive des varietes de cacao fin (Trinitario et Criollo) certifiees Bio AB depuis 1999. Un cacao d'exception reconnu par les plus grands chocolatiers mondiaux, avec tracabilite complete de l'arbre a la feve.",
    histoire: "La Plantation Bellevue, fondee en 1965 par Edouard Bellevue, est l'une des rares exploitations de Martinique a perpetuer la culture du cacao fin a grande echelle. Situee au Robert, sur la cote atlantique de l'ile, elle beneficie d'un micro-climat humide et d'ombrages naturels formes par les arbres fruitiers environnants — annas, bananiers, manguiers — qui protegent les cacaoyers de l'ensoleillement direct et enrichissent le sol en matiere organique. La ferme cultive principalement le Trinitario, hybride entre le Criollo (le plus fin) et le Forastero (le plus robuste), qui developpe des notes florales, fruities et cacaotees d'une grande complexite. Certifiee Agriculture Biologique depuis 1999, la Plantation Bellevue fournit aujourd'hui des chocolatiers de renom dont Valrhona, Michel Cluizel et plusieurs artisans primados.",
    techniques: [
      "Culture en agroforesterie — cacaoyers sous couvert arboree",
      "Fermentation artisanale — 5 a 7 jours en caisses en bois",
      "Sechage solaire — 2 semaines sur claies traditionnelles",
      "Tri manual des feves — elimination des feves plates et germees",
      "Zero pesticide — protection biologique integree (fourmi coupe-feuille)",
      "Compostage des cabosses — economie circulaire totale",
    ],
    certificationDetails: [
      "Agriculture Biologique — certifie AB par Bureau Veritas depuis 1999",
      "Cacao Fin — classification ICCO (Organisation Internationale du Cacao)",
      "Rainforest Alliance — en cours de certification",
      "Origine Martinique — denomination geographique controlee",
    ],
    recompenses: [
      "Medaille d'Or — Salon du Chocolat Paris 2023",
      "Best Fine Cacao Caribbean — International Cocoa Awards 2022",
      "Fournisseur certifie Valrhona depuis 2015",
    ],
    tokens: 100,
    disponibles: 100,
    prixToken: 300,
    rendementEst: "13-18%",
    duree: "18 mois",
    recolte: "Decembre 2026",
    assurance: "80% couverts en cas de catastrophe climatique ou epidemie fongique",
    coordonnees: { lat: 14.68, lng: -60.93 },
    adresse: "Plantation Bellevue, Le Robert, 97231 Martinique",
  },
  {
    slug: "foret-fsc-guyane",
    nom: "Foret Certifiee FSC — Groupement Forestier Guyane",
    culture: "Bois Certifie FSC",
    producteur: "Groupement Forestier Guyane",
    ile: "Guyane",
    region: "Ouest Guyanais",
    lieu: "Saint-Laurent-du-Maroni, Guyane",
    surface: "2400 hectares",
    fondee: 2008,
    statut: "Groupement de 8 operateurs forestiers agrees",
    certification: "FSC Gestion Durable · Credits Carbone",
    icone: "🌳",
    tag: "FSC + Carbone",
    tagColor: "#085041",
    couleur: "#052A20",
    photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1200&q=80",
    description: "Un investissement forestier unique en Amazonie guyanaise — 2400 hectares de foret primaire geree durablement, certifiee FSC et generatrice de credits carbone. Rendement double : exploitation selective du bois + vente de credits carbone.",
    histoire: "Le Groupement Forestier Guyane, fonde en 2008, reunit huit operateurs forestiers agrees par l'Office National des Forets (ONF) pour gerer durablement une concession de 2400 hectares dans la foret amazonienne de Guyane francaise, pres de Saint-Laurent-du-Maroni. Cette foret tropicale humide, l'une des plus biodiverses de la planete, est geree selon les principes stricts de la certification FSC (Forest Stewardship Council), qui garantit la preservation de la biodiversite, la protection des droits des communautes autochtones Teko et Ndjuka, et la regeneration naturelle des zones exploitees. Chaque arbre preleve fait l'objet d'un marquage GPS et d'un suivi decennal. En parallele, le groupement vend des credits carbone certifies VCS (Verified Carbon Standard) sur le marche volontaire international, representant une source de revenus complementaire et croissante.",
    techniques: [
      "Coupe selective — uniquement les arbres matures de plus de 60cm de diametre",
      "Debardage a traction animale sur les zones sensibles",
      "Reboisement systematique — 3 plants pour chaque arbre preleve",
      "Suivi GPS de chaque arbre exploite pendant 10 ans",
      "Corridor biologique preserve — 40% de la surface non exploitee",
      "Monitoring carbone annuel par teledetection satellite",
    ],
    certificationDetails: [
      "FSC — Forest Stewardship Council, certification depuis 2010",
      "VCS — Verified Carbon Standard pour les credits carbone",
      "Agrement ONF — Office National des Forets de Guyane",
      "REDD+ eligible — programme ONU de reduction de la deforestation",
    ],
    recompenses: [
      "Prix de la Foret Tropicale Durable — PEFC 2022",
      "Certification Exemplaire FSC — rapport annuel 2023",
      "Mention speciale Biodiversite — WWF France 2021",
    ],
    tokens: 500,
    disponibles: 312,
    prixToken: 150,
    rendementEst: "10-14%",
    duree: "24 mois",
    recolte: "Mars 2027",
    assurance: "80% couverts en cas d'incendie ou catastrophe naturelle",
    coordonnees: { lat: 5.50, lng: -54.03 },
    adresse: "Concession forestiere Saint-Laurent-du-Maroni, 97320 Guyane",
  },
  {
    slug: "ananas-victoria-le-moule",
    nom: "Ananas Victoria — Famille Montout",
    culture: "Ananas Victoria",
    producteur: "Famille Montout",
    ile: "Guadeloupe",
    region: "Grande-Terre",
    lieu: "Le Moule, Guadeloupe",
    surface: "6 hectares",
    fondee: 1989,
    statut: "Exploitation familiale — 2eme generation",
    certification: "Agriculture Raisonnee · Sans pesticides",
    icone: "🍍",
    tag: "Sans pesticides",
    tagColor: "#5A8A3C",
    couleur: "#2A3A10",
    photo: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=1200&q=80",
    description: "L'Ananas Victoria de Guadeloupe — le plus sucre et aromatique du monde — cultive sans pesticides par la famille Montout depuis deux generations. Un fruit d'exception, reconnu par les chefs etoiles, accessible en token pour la premiere fois.",
    histoire: "Jean-Pierre Montout a repris en 1989 l'exploitation familiale de 6 hectares a Le Moule, en Grande-Terre, fondee par son pere en 1962. Specialise dans la culture de l'Ananas Victoria — variete exclusive a La Reunion et aux Antilles, repute pour sa chair jaune d'or, son acidite douce et ses aromes intenses de vanille et de miel — il a progressive elimine tous les intrants chimiques entre 1995 et 2002, en pionnier de l'agriculture raisonnee locale. L'Ananas Victoria de Montout est aujourd'hui reference par des chefs etoiles a Paris, Lyon et New York, et vendu jusqu'a 15 euros l'unite dans les epiceries fines europeennes. La tokenisation de sa recolte 2026 represente une premiere mondiale pour ce fruit d'exception.",
    techniques: [
      "Plantation sur buttes — drainage naturel optimise",
      "Paillage plastique biodegradable — suppression des adventices",
      "Pollinisation croisee manuelle — calibre et qualite uniformes",
      "Irrigation goutte-a-goutte — economie d'eau de 60%",
      "Protection mecanique des fruits contre l'ensoleillement",
      "Recolte a maturite optimale — controle refractometrique",
    ],
    certificationDetails: [
      "Agriculture Raisonnee — agree FARRE depuis 2003",
      "Zero Pesticide — engagement volontaire controle annuellement",
      "Haute Valeur Environnementale (HVE) — niveau 3",
      "Tracabilite complete — du plant au conditionnement",
    ],
    recompenses: [
      "Meilleur Ananas du Monde — Salon International de l'Agriculture 2022",
      "Choix des Chefs — Guide Lebey 2023",
      "Label Terroir Guadeloupe — Chambre d'Agriculture 2021",
    ],
    tokens: 60,
    disponibles: 60,
    prixToken: 200,
    rendementEst: "10-14%",
    duree: "10 mois",
    recolte: "Juin 2026",
    assurance: "80% couverts en cas de cyclone ou episode de secheresse",
    coordonnees: { lat: 16.33, lng: -61.35 },
    adresse: "Exploitation Montout, Le Moule, 97160 Guadeloupe",
  },
  {
    slug: "canne-aoc-longueteau",
    nom: "Canne a Sucre AOC — Distillerie Longueteau",
    culture: "Canne a Sucre AOC",
    producteur: "Distillerie Longueteau",
    ile: "Guadeloupe",
    region: "Basse-Terre",
    lieu: "Capesterre-Belle-Eau, Guadeloupe",
    surface: "45 hectares",
    fondee: 1895,
    statut: "Famille Longueteau — 5eme generation",
    certification: "AOC Rhum Agricole · Filiere selective",
    icone: "🌾",
    tag: "AOC",
    tagColor: "#C8A84B",
    couleur: "#3A2A08",
    photo: "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1559827291-72f3f0c7ecb3?w=1200&q=80",
    description: "45 hectares de canne a sucre AOC cultivee en agriculture biologique certifiee, sur les terres volcaniques de Capesterre. Acces a une filiere d'excellence unique — la seule AOC rhum agricole au monde.",
    histoire: "La distillerie Longueteau, fondee en 1895 a Capesterre-Belle-Eau, est l'une des rares distilleries guadeloupéennes a avoir converti l'integralite de ses 45 hectares de canne en agriculture biologique certifiee, une transition achevee en 2012. Les varietes de canne selectionnees — principalement la B69566 et la R570 — sont adaptees aux sols volcaniques profonds de Basse-Terre et developpent une concentration en sucres fermentescibles particulierement elevee, donnant des rhums d'une richesse aromatique exceptionnelle. La tokenisation de la parcelle de canne permet aux investisseurs d'entrer dans la filiere AOC Guadeloupe des le stade cultural, avant la distillation. Le produit de la recolte alimente directement la production des rhums Longueteau, dont la valeur ne cesse de croitre sur le marche des spiritueux premium.",
    techniques: [
      "Varietes selectives Bio adaptees au terroir volcanique",
      "Coupe manuelle et mecanique selon la pente",
      "Broyage et extraction en less de 24h apres coupe",
      "Fertilisation au compost de vinasse de distillerie",
      "Jacheres tournantes — parcelle reposee 1 an sur 5",
      "Suivi Brix hebdomadaire — recolte a maturite optimale",
    ],
    certificationDetails: [
      "AOC Rhum Agricole Guadeloupe — la seule AOC rhum au monde",
      "Agriculture Biologique — certifie AB par Ecocert depuis 2012",
      "Tracabilite parcelle — du champ au alambic",
      "Controles ONIVins — organisme officiel de certification AOC",
    ],
    recompenses: [
      "Medaille d'Or — Concours General Agricole 2023",
      "Best Organic Rum — RumFest 2022",
      "Certification Agriculture Biologique depuis 2012",
    ],
    tokens: 200,
    disponibles: 0,
    prixToken: 180,
    rendementEst: "11-15%",
    duree: "12 mois",
    recolte: "Mai 2026",
    assurance: "80% couverts en cas de cyclone ou epidemie de charbon de la canne",
    coordonnees: { lat: 16.04, lng: -61.58 },
    adresse: "Distillerie Longueteau, Capesterre-Belle-Eau, 97130 Guadeloupe",
    site: "https://www.longueteau.com",
  },
];

export function getParcelle(slug: string): Parcelle | undefined {
  return PARCELLES.find(p => p.slug === slug);
}

export function getParcellesByIle(ile: string): Parcelle[] {
  return PARCELLES.filter(p => p.ile === ile);
}

export function getParcelleSlug(parcelle: Parcelle): string {
  return parcelle.slug;
}