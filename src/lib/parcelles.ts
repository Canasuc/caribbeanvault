export type LocaleStr = { fr: string; en: string; es: string };

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
  statut: LocaleStr;
  certification: string;
  icone: string;
  tag: string;
  tagColor: string;
  couleur: string;
  photo: string;
  photoBandeau: string;
  description: LocaleStr;
  histoire: LocaleStr;
  techniques: LocaleStr[];
  certificationDetails: LocaleStr[];
  recompenses: string[];
  tokens: number;
  disponibles: number;
  prixToken: number;
  rendementEst: string;
  duree: string;
  recolte: string;
  assurance: LocaleStr;
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
    statut: {
      fr: "Coopérative de 12 producteurs — 3ème génération",
      en: "Cooperative of 12 producers — 3rd generation",
      es: "Cooperativa de 12 productores — 3ª generación",
    },
    certification: "IGP Antilles · Agriculture Raisonnée",
    icone: "🍌",
    tag: "IGP Certifiée",
    tagColor: "#3B6D11",
    couleur: "#1E2D14",
    photo: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1200&q=80",
    description: {
      fr: "La Coopérative GIPAM regroupe 12 producteurs de banane IGP sur 18 hectares à Capesterre-Belle-Eau, au cœur de la Basse-Terre volcanique. Une production traçable, certifiée et assurance récolte incluse.",
      en: "The GIPAM Cooperative brings together 12 IGP banana producers across 18 hectares in Capesterre-Belle-Eau, at the heart of volcanic Basse-Terre. Traceable, certified production with harvest insurance included.",
      es: "La Cooperativa GIPAM reúne a 12 productores de plátano IGP en 18 hectáreas en Capesterre-Belle-Eau, en el corazón de la Basse-Terre volcánica. Producción trazable, certificada y con seguro de cosecha incluido.",
    },
    histoire: {
      fr: "Fondée en 1978, la Coopérative GIPAM réunit des producteurs de banane de Capesterre-Belle-Eau depuis trois générations. Pionnière de l'agriculture raisonnée aux Antilles, GIPAM a réduit de 80% l'utilisation de produits phytosanitaires depuis 2010. Ses bananes, reconnues IGP Antilles depuis 2009, sont exportées vers la métropole et l'Europe.",
      en: "Founded in 1978, GIPAM Cooperative has united banana producers from Capesterre-Belle-Eau for three generations. A pioneer of responsible farming in the Caribbean, GIPAM has reduced phytosanitary product use by 80% since 2010. Its bananas, recognized as IGP Antilles since 2009, are exported to mainland France and Europe.",
      es: "Fundada en 1978, la Cooperativa GIPAM reúne productores de plátano de Capesterre-Belle-Eau desde tres generaciones. Pionera de la agricultura razonada en el Caribe, GIPAM ha reducido el uso de fitosanitarios en un 80% desde 2010. Sus plátanos, reconocidos como IGP Antillas desde 2009, se exportan a la metrópolis y Europa.",
    },
    techniques: [
      { fr: "Plantation en courbes de niveau pour limiter l'érosion", en: "Contour planting to limit erosion", es: "Plantación en curvas de nivel para limitar la erosión" },
      { fr: "Désherbage mécanique — zéro herbicide chimique", en: "Mechanical weeding — zero chemical herbicide", es: "Desherbado mecánico — cero herbicida químico" },
      { fr: "Couverture du sol par mulching organique", en: "Soil coverage with organic mulching", es: "Cobertura del suelo con mulching orgánico" },
      { fr: "Filets anti-insectes sur chaque régime", en: "Anti-insect nets on each bunch", es: "Redes anti-insectos en cada racimo" },
      { fr: "Irrigation gravitaire depuis les sources naturelles", en: "Gravity irrigation from natural springs", es: "Irrigación gravitacional desde fuentes naturales" },
      { fr: "Compostage intégré des résidus de récolte", en: "Integrated composting of harvest residues", es: "Compostaje integrado de residuos de cosecha" },
    ],
    certificationDetails: [
      { fr: "IGP Antilles — certification européenne depuis 2009", en: "IGP Antilles — European certification since 2009", es: "IGP Antillas — certificación europea desde 2009" },
      { fr: "Agriculture Raisonnée — renouvellement annuel", en: "Responsible Farming — annual renewal", es: "Agricultura Razonada — renovación anual" },
      { fr: "Traçabilité parcelle par parcelle", en: "Traceability plot by plot", es: "Trazabilidad parcela por parcela" },
      { fr: "Audits terrain trimestriels par organisme agréé", en: "Quarterly field audits by accredited body", es: "Auditorías de campo trimestrales por organismo acreditado" },
    ],
    recompenses: [
      "Prix de l'Innovation Agricole — Salon de l'Agriculture 2022",
      "Label Terroir d'Excellence — Région Guadeloupe 2023",
      "Mention Spéciale IGP — Commission Européenne 2021",
    ],
    tokens: 160,
    disponibles: 72,
    prixToken: 250,
    rendementEst: "12-16%",
    duree: "12 mois",
    recolte: "Juillet 2026",
    assurance: {
      fr: "80% couverts en cas de cyclone ou catastrophe naturelle",
      en: "80% covered in case of cyclone or natural disaster",
      es: "80% cubierto en caso de ciclón o catástrofe natural",
    },
    coordonnees: { lat: 16.04, lng: -61.57 },
    adresse: "Zone agricole de Capesterre-Belle-Eau, 97130 Guadeloupe",
  },
  {
    slug: "cafe-bonifieur-vieux-habitants",
    nom: "Café Bonifieur Grand Cru — Domaine Vanibel",
    culture: "Café Bonifieur",
    producteur: "Domaine Vanibel",
    ile: "Guadeloupe",
    region: "Basse-Terre",
    lieu: "Vieux-Habitants, Guadeloupe",
    surface: "4 hectares",
    fondee: 1952,
    statut: { fr: "Famille Vanibel — 3ème génération", en: "Vanibel family — 3rd generation", es: "Familia Vanibel — 3ª generación" },
    certification: "Grand Cru · Agriculture Biologique",
    icone: "☕",
    tag: "Grand Cru",
    tagColor: "#854F0B",
    couleur: "#3B2010",
    photo: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&q=80",
    description: {
      fr: "Le café Bonifieur de Vieux-Habitants est le trésor caché de la Guadeloupe. Cultivé en altitude sur des terres volcaniques, certifié Bio et classé Grand Cru, c'est l'un des cafés les plus rares et les plus recherchés de la Caraïbe.",
      en: "The Bonifieur coffee from Vieux-Habitants is Guadeloupe's hidden treasure. Grown at altitude on volcanic soil, certified Organic and classified Grand Cru, it is one of the rarest and most sought-after coffees in the Caribbean.",
      es: "El café Bonifieur de Vieux-Habitants es el tesoro oculto de Guadalupe. Cultivado en altura en tierras volcánicas, certificado Ecológico y clasificado Grand Cru, es uno de los cafés más raros y buscados del Caribe.",
    },
    histoire: {
      fr: "Le Domaine Vanibel, fondé en 1952, perpétue depuis trois générations la tradition caféicole de Vieux-Habitants. Après une décennie difficile dans les années 1990, Marie-Claire Vanibel a relancé le domaine en 2008 avec une conversion intégrale en agriculture biologique et une démarche Grand Cru. Aujourd'hui, le Bonifieur Vanibel est servi dans les plus grands palaces parisiens.",
      en: "The Vanibel Estate, founded in 1952, has perpetuated the coffee tradition of Vieux-Habitants for three generations. After a difficult decade in the 1990s, Marie-Claire Vanibel relaunched the estate in 2008 with full organic conversion and a Grand Cru approach. Today, Bonifieur Vanibel is served in the finest Parisian palaces.",
      es: "El Domaine Vanibel, fundado en 1952, perpetúa desde tres generaciones la tradición cafetera de Vieux-Habitants. Tras una difícil década en los años 90, Marie-Claire Vanibel relanzó la finca en 2008 con una conversión íntegra a la agricultura ecológica. Hoy, el Bonifieur Vanibel se sirve en los mejores palacios parisinos.",
    },
    techniques: [
      { fr: "Cueillette sélective à la main — cerises parfaitement mûres uniquement", en: "Selective hand-picking — perfectly ripe cherries only", es: "Recolección selectiva a mano — solo cerezas perfectamente maduras" },
      { fr: "Traitement par voie humide — dépulpage et fermentation 48h", en: "Wet processing — depulping and 48h fermentation", es: "Procesado por vía húmeda — despulpado y fermentación 48h" },
      { fr: "Séchage solaire sur claies surélevés — 3 à 4 semaines", en: "Solar drying on raised racks — 3 to 4 weeks", es: "Secado solar en estructuras elevadas — 3 a 4 semanas" },
      { fr: "Torréfaction artisanale sur place — profil clair à moyen", en: "Artisanal on-site roasting — light to medium profile", es: "Tostado artesanal in situ — perfil claro a medio" },
      { fr: "Tri manuel grain par grain avant conditionnement", en: "Manual grain-by-grain sorting before packaging", es: "Selección manual grano a grano antes del envasado" },
      { fr: "Zéro intrant chimique — fertilisation au compost végétal", en: "Zero chemical inputs — plant compost fertilization", es: "Cero insumos químicos — fertilización con compost vegetal" },
    ],
    certificationDetails: [
      { fr: "Agriculture Biologique — certifié AB par Ecocert depuis 2011", en: "Organic Agriculture — AB certified by Ecocert since 2011", es: "Agricultura Ecológica — certificado AB por Ecocert desde 2011" },
      { fr: "Grand Cru Guadeloupe — classification terroir depuis 2015", en: "Grand Cru Guadeloupe — terroir classification since 2015", es: "Grand Cru Guadalupe — clasificación de terroir desde 2015" },
      { fr: "Origine Contrôlée — commune de Vieux-Habitants uniquement", en: "Controlled Origin — Vieux-Habitants municipality only", es: "Origen Controlado — municipio de Vieux-Habitants únicamente" },
      { fr: "Traçabilité lot par lot — du pied de caféier à la tasse", en: "Batch-by-batch traceability — from tree to cup", es: "Trazabilidad lote a lote — del árbol a la taza" },
    ],
    recompenses: [
      "Médaille d'Or — Concours du Meilleur Café Français 2023",
      "Best Caribbean Coffee — London Coffee Festival 2022",
      "Grand Prix du Terroir — Salon de l'Agriculture 2023",
    ],
    tokens: 80,
    disponibles: 18,
    prixToken: 400,
    rendementEst: "15-22%",
    duree: "14 mois",
    recolte: "Octobre 2026",
    assurance: {
      fr: "80% couverts en cas de cyclone, sécheresse ou maladie fongique",
      en: "80% covered in case of cyclone, drought or fungal disease",
      es: "80% cubierto en caso de ciclón, sequía o enfermedad fúngica",
    },
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
    statut: { fr: "Famille Bellevue — 3ème génération", en: "Bellevue family — 3rd generation", es: "Familia Bellevue — 3ª generación" },
    certification: "Cacao Fin · Bio certifié AB",
    icone: "🍫",
    tag: "Bio AB",
    tagColor: "#5A8A3C",
    couleur: "#2C1A0A",
    photo: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1548940740-204726a19be3?w=1200&q=80",
    description: {
      fr: "La Plantation Bellevue cultive des variétés de cacao fin (Trinitario et Criollo) certifiées Bio AB depuis 1999. Un cacao d'exception reconnu par les plus grands chocolatiers mondiaux.",
      en: "Plantation Bellevue cultivates fine cocoa varieties (Trinitario and Criollo) certified Organic since 1999. An exceptional cocoa recognized by the world's greatest chocolatiers.",
      es: "La Plantation Bellevue cultiva variedades de cacao fino (Trinitario y Criollo) certificadas Ecológico desde 1999. Un cacao excepcional reconocido por los mejores chocolateros del mundo.",
    },
    histoire: {
      fr: "La Plantation Bellevue, fondée en 1965 par Édouard Bellevue, est l'une des rares exploitations de Martinique à perpétuer la culture du cacao fin à grande échelle. Certifiée Agriculture Biologique depuis 1999, elle fournit des chocolatiers de renom dont Valrhona, Michel Cluizel et plusieurs artisans primés.",
      en: "Plantation Bellevue, founded in 1965 by Édouard Bellevue, is one of the few farms in Martinique to perpetuate large-scale fine cocoa cultivation. Certified Organic since 1999, it supplies renowned chocolatiers including Valrhona, Michel Cluizel and several award-winning artisans.",
      es: "La Plantation Bellevue, fundada en 1965 por Édouard Bellevue, es una de las pocas explotaciones de Martinica que perpetúa el cultivo de cacao fino a gran escala. Certificada Agricultura Ecológica desde 1999, suministra a reconocidos chocolateros como Valrhona, Michel Cluizel y varios artesanos premiados.",
    },
    techniques: [
      { fr: "Culture en agroforesterie — cacaoyers sous couvert arboré", en: "Agroforestry cultivation — cocoa trees under tree cover", es: "Cultivo en agroforestería — cacaoteros bajo cubierta arbórea" },
      { fr: "Fermentation artisanale — 5 à 7 jours en caisses en bois", en: "Artisanal fermentation — 5 to 7 days in wooden boxes", es: "Fermentación artesanal — 5 a 7 días en cajas de madera" },
      { fr: "Séchage solaire — 2 semaines sur claies traditionnelles", en: "Solar drying — 2 weeks on traditional racks", es: "Secado solar — 2 semanas en estructuras tradicionales" },
      { fr: "Tri manuel des fèves — élimination des fèves plates et germées", en: "Manual bean sorting — flat and germinated beans removed", es: "Selección manual de granos — eliminación de granos planos y germinados" },
      { fr: "Zéro pesticide — protection biologique intégrée", en: "Zero pesticide — integrated biological protection", es: "Cero pesticidas — protección biológica integrada" },
      { fr: "Compostage des cabosses — économie circulaire totale", en: "Pod composting — total circular economy", es: "Compostaje de vainas — economía circular total" },
    ],
    certificationDetails: [
      { fr: "Agriculture Biologique — certifié AB par Bureau Veritas depuis 1999", en: "Organic Agriculture — AB certified by Bureau Veritas since 1999", es: "Agricultura Ecológica — certificado AB por Bureau Veritas desde 1999" },
      { fr: "Cacao Fin — classification ICCO (Organisation Internationale du Cacao)", en: "Fine Cacao — ICCO classification (International Cocoa Organization)", es: "Cacao Fino — clasificación ICCO (Organización Internacional del Cacao)" },
      { fr: "Rainforest Alliance — en cours de certification", en: "Rainforest Alliance — certification in progress", es: "Rainforest Alliance — certificación en curso" },
      { fr: "Origine Martinique — dénomination géographique contrôlée", en: "Martinique Origin — controlled geographical denomination", es: "Origen Martinica — denominación geográfica controlada" },
    ],
    recompenses: [
      "Médaille d'Or — Salon du Chocolat Paris 2023",
      "Best Fine Cacao Caribbean — International Cocoa Awards 2022",
      "Fournisseur certifié Valrhona depuis 2015",
    ],
    tokens: 100,
    disponibles: 100,
    prixToken: 300,
    rendementEst: "13-18%",
    duree: "18 mois",
    recolte: "Décembre 2026",
    assurance: {
      fr: "80% couverts en cas de catastrophe climatique ou épidémie fongique",
      en: "80% covered in case of climate disaster or fungal epidemic",
      es: "80% cubierto en caso de catástrofe climática o epidemia fúngica",
    },
    coordonnees: { lat: 14.68, lng: -60.93 },
    adresse: "Plantation Bellevue, Le Robert, 97231 Martinique",
  },
  {
    slug: "foret-fsc-guyane",
    nom: "Forêt Certifiée FSC — Groupement Forestier Guyane",
    culture: "Bois Certifié FSC",
    producteur: "Groupement Forestier Guyane",
    ile: "Guyane",
    region: "Ouest Guyanais",
    lieu: "Saint-Laurent-du-Maroni, Guyane",
    surface: "2400 hectares",
    fondee: 2008,
    statut: { fr: "Groupement de 8 opérateurs forestiers agréés", en: "Group of 8 accredited forestry operators", es: "Agrupación de 8 operadores forestales acreditados" },
    certification: "FSC Gestion Durable · Crédits Carbone",
    icone: "🌳",
    tag: "FSC + Carbone",
    tagColor: "#085041",
    couleur: "#052A20",
    photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=1200&q=80",
    description: {
      fr: "Un investissement forestier unique en Amazonie guyanaise — 2400 hectares de forêt primaire gérée durablement, certifiée FSC et génératrice de crédits carbone.",
      en: "A unique forestry investment in Guianese Amazonia — 2,400 hectares of sustainably managed primary forest, FSC-certified and generating carbon credits.",
      es: "Una inversión forestal única en la Amazonia guayanesa — 2.400 hectáreas de bosque primario gestionado sosteniblemente, certificado FSC y generador de créditos de carbono.",
    },
    histoire: {
      fr: "Le Groupement Forestier Guyane, fondé en 2008, réunit huit opérateurs forestiers agréés pour gérer durablement une concession de 2400 hectares dans la forêt amazonienne de Guyane française. Cette forêt tropicale humide est gérée selon les principes stricts de la certification FSC, garantissant la préservation de la biodiversité et les droits des communautés autochtones.",
      en: "The Guiana Forestry Group, founded in 2008, brings together eight accredited forestry operators to sustainably manage a 2,400-hectare concession in the Amazonian rainforest of French Guiana. This tropical rainforest is managed according to the strict principles of FSC certification, ensuring biodiversity preservation and indigenous community rights.",
      es: "El Agrupamiento Forestal de Guayana, fundado en 2008, reúne a ocho operadores forestales acreditados para gestionar sosteniblemente una concesión de 2.400 hectáreas en el bosque amazónico de la Guayana Francesa. Este bosque tropical húmedo se gestiona según los estrictos principios de la certificación FSC.",
    },
    techniques: [
      { fr: "Coupe sélective — uniquement les arbres matures de plus de 60cm de diamètre", en: "Selective logging — only mature trees over 60cm in diameter", es: "Tala selectiva — solo árboles maduros de más de 60cm de diámetro" },
      { fr: "Débardage à traction animale sur les zones sensibles", en: "Animal traction logging in sensitive areas", es: "Saca con tracción animal en zonas sensibles" },
      { fr: "Reboisement systématique — 3 plants pour chaque arbre prélevé", en: "Systematic reforestation — 3 seedlings per harvested tree", es: "Reforestación sistemática — 3 plántulas por árbol cortado" },
      { fr: "Suivi GPS de chaque arbre exploité pendant 10 ans", en: "GPS tracking of each harvested tree for 10 years", es: "Seguimiento GPS de cada árbol explotado durante 10 años" },
      { fr: "Corridor biologique préservé — 40% de la surface non exploitée", en: "Biological corridor preserved — 40% of area unharvested", es: "Corredor biológico preservado — 40% de la superficie sin explotar" },
      { fr: "Monitoring carbone annuel par télédétection satellite", en: "Annual carbon monitoring by satellite remote sensing", es: "Monitoreo de carbono anual por teledetección satelital" },
    ],
    certificationDetails: [
      { fr: "FSC — Forest Stewardship Council, certification depuis 2010", en: "FSC — Forest Stewardship Council, certified since 2010", es: "FSC — Forest Stewardship Council, certificado desde 2010" },
      { fr: "VCS — Verified Carbon Standard pour les crédits carbone", en: "VCS — Verified Carbon Standard for carbon credits", es: "VCS — Verified Carbon Standard para créditos de carbono" },
      { fr: "Agrément ONF — Office National des Forêts de Guyane", en: "ONF approval — National Forestry Office of Guiana", es: "Acreditación ONF — Oficina Nacional de Bosques de Guayana" },
      { fr: "REDD+ éligible — programme ONU de réduction de la déforestation", en: "REDD+ eligible — UN deforestation reduction programme", es: "REDD+ elegible — programa ONU de reducción de la deforestación" },
    ],
    recompenses: [
      "Prix de la Forêt Tropicale Durable — PEFC 2022",
      "Certification Exemplaire FSC — rapport annuel 2023",
      "Mention spéciale Biodiversité — WWF France 2021",
    ],
    tokens: 500,
    disponibles: 312,
    prixToken: 150,
    rendementEst: "10-14%",
    duree: "24 mois",
    recolte: "Mars 2027",
    assurance: {
      fr: "80% couverts en cas d'incendie ou catastrophe naturelle",
      en: "80% covered in case of fire or natural disaster",
      es: "80% cubierto en caso de incendio o catástrofe natural",
    },
    coordonnees: { lat: 5.50, lng: -54.03 },
    adresse: "Concession forestière Saint-Laurent-du-Maroni, 97320 Guyane",
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
    statut: { fr: "Exploitation familiale — 2ème génération", en: "Family farm — 2nd generation", es: "Explotación familiar — 2ª generación" },
    certification: "Agriculture Raisonnée · Sans pesticides",
    icone: "🍍",
    tag: "Sans pesticides",
    tagColor: "#5A8A3C",
    couleur: "#2A3A10",
    photo: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=1200&q=80",
    description: {
      fr: "L'Ananas Victoria de Guadeloupe — le plus sucré et aromatique du monde — cultivé sans pesticides par la famille Montout depuis deux générations.",
      en: "The Victoria Pineapple from Guadeloupe — the sweetest and most aromatic in the world — grown without pesticides by the Montout family for two generations.",
      es: "La Piña Victoria de Guadalupe — la más dulce y aromática del mundo — cultivada sin pesticidas por la familia Montout desde hace dos generaciones.",
    },
    histoire: {
      fr: "Jean-Pierre Montout a repris en 1989 l'exploitation familiale de 6 hectares à Le Moule. Spécialisé dans la culture de l'Ananas Victoria, il a progressivement éliminé tous les intrants chimiques entre 1995 et 2002. L'Ananas Victoria de Montout est aujourd'hui référencé par des chefs étoilés à Paris, Lyon et New York.",
      en: "Jean-Pierre Montout took over the 6-hectare family farm in Le Moule in 1989. Specialized in Victoria Pineapple cultivation, he progressively eliminated all chemical inputs between 1995 and 2002. Montout's Victoria Pineapple is now referenced by starred chefs in Paris, Lyon and New York.",
      es: "Jean-Pierre Montout asumió en 1989 la explotación familiar de 6 hectáreas en Le Moule. Especializado en el cultivo de la Piña Victoria, eliminó progresivamente todos los insumos químicos entre 1995 y 2002. La Piña Victoria de Montout es hoy referenciada por chefs con estrella en París, Lyon y Nueva York.",
    },
    techniques: [
      { fr: "Plantation sur buttes — drainage naturel optimisé", en: "Ridge planting — optimized natural drainage", es: "Plantación en caballones — drenaje natural optimizado" },
      { fr: "Paillage plastique biodégradable — suppression des adventices", en: "Biodegradable plastic mulching — weed suppression", es: "Acolchado plástico biodegradable — supresión de malas hierbas" },
      { fr: "Pollinisation croisée manuelle — calibre et qualité uniformes", en: "Manual cross-pollination — uniform size and quality", es: "Polinización cruzada manual — calibre y calidad uniformes" },
      { fr: "Irrigation goutte-à-goutte — économie d'eau de 60%", en: "Drip irrigation — 60% water saving", es: "Riego por goteo — ahorro de agua del 60%" },
      { fr: "Protection mécanique des fruits contre l'ensoleillement", en: "Mechanical fruit protection against sunlight", es: "Protección mecánica de los frutos contra el sol" },
      { fr: "Récolte à maturité optimale — contrôle réfractométrique", en: "Harvest at optimal maturity — refractometric control", es: "Cosecha en madurez óptima — control refractométrico" },
    ],
    certificationDetails: [
      { fr: "Agriculture Raisonnée — agréé FARRE depuis 2003", en: "Responsible Farming — FARRE accredited since 2003", es: "Agricultura Razonada — acreditado FARRE desde 2003" },
      { fr: "Zéro Pesticide — engagement volontaire contrôlé annuellement", en: "Zero Pesticide — voluntary commitment controlled annually", es: "Cero Pesticidas — compromiso voluntario controlado anualmente" },
      { fr: "Haute Valeur Environnementale (HVE) — niveau 3", en: "High Environmental Value (HVE) — level 3", es: "Alto Valor Ambiental (HVE) — nivel 3" },
      { fr: "Traçabilité complète — du plant au conditionnement", en: "Full traceability — from plant to packaging", es: "Trazabilidad completa — de la planta al envasado" },
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
    assurance: {
      fr: "80% couverts en cas de cyclone ou épisode de sécheresse",
      en: "80% covered in case of cyclone or drought episode",
      es: "80% cubierto en caso de ciclón o episodio de sequía",
    },
    coordonnees: { lat: 16.33, lng: -61.35 },
    adresse: "Exploitation Montout, Le Moule, 97160 Guadeloupe",
  },
  {
    slug: "canne-aoc-longueteau",
    nom: "Canne à Sucre AOC — Distillerie Longueteau",
    culture: "Canne à Sucre AOC",
    producteur: "Distillerie Longueteau",
    ile: "Guadeloupe",
    region: "Basse-Terre",
    lieu: "Capesterre-Belle-Eau, Guadeloupe",
    surface: "45 hectares",
    fondee: 1895,
    statut: { fr: "Famille Longueteau — 5ème génération", en: "Longueteau family — 5th generation", es: "Familia Longueteau — 5ª generación" },
    certification: "AOC Rhum Agricole · Filière sélective",
    icone: "🌾",
    tag: "AOC",
    tagColor: "#C8A84B",
    couleur: "#3A2A08",
    photo: "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1559827291-72f3f0c7ecb3?w=1200&q=80",
    description: {
      fr: "45 hectares de canne à sucre AOC cultivée en agriculture biologique certifiée, sur les terres volcaniques de Capesterre. Accès à une filière d'excellence unique — la seule AOC rhum agricole au monde.",
      en: "45 hectares of AOC sugarcane cultivated in certified organic farming, on the volcanic soils of Capesterre. Access to a unique excellence supply chain — the only AOC agricultural rum in the world.",
      es: "45 hectáreas de caña de azúcar AOC cultivada en agricultura ecológica certificada, en las tierras volcánicas de Capesterre. Acceso a una cadena de excelencia única — la única AOC de ron agrícola en el mundo.",
    },
    histoire: {
      fr: "La distillerie Longueteau, fondée en 1895 à Capesterre-Belle-Eau, est l'une des rares distilleries guadeloupéennes à avoir converti l'intégralité de ses 45 hectares de canne en agriculture biologique certifiée, une transition achevée en 2012. La tokenisation de la parcelle de canne permet aux investisseurs d'entrer dans la filière AOC Guadeloupe dès le stade cultural.",
      en: "Longueteau distillery, founded in 1895 in Capesterre-Belle-Eau, is one of the few Guadeloupean distilleries to have converted all 45 hectares of sugarcane to certified organic farming, completed in 2012. Tokenization of the sugarcane plot allows investors to enter the Guadeloupe AOC supply chain from the growing stage.",
      es: "La destilería Longueteau, fundada en 1895 en Capesterre-Belle-Eau, es una de las pocas destilerías guadalupeñas que ha convertido la totalidad de sus 45 hectáreas de caña a agricultura ecológica certificada, completada en 2012. La tokenización de la parcela de caña permite a los inversores entrar en la cadena AOC de Guadalupe desde la fase de cultivo.",
    },
    techniques: [
      { fr: "Variétés sélectives Bio adaptées au terroir volcanique", en: "Organic selective varieties adapted to volcanic terroir", es: "Variedades selectivas Ecológicas adaptadas al terroir volcánico" },
      { fr: "Coupe manuelle et mécanique selon la pente", en: "Manual and mechanical cutting depending on slope", es: "Corte manual y mecánico según la pendiente" },
      { fr: "Broyage et extraction en moins de 24h après coupe", en: "Crushing and extraction within 24h of cutting", es: "Molienda y extracción en menos de 24h tras el corte" },
      { fr: "Fertilisation au compost de vinasse de distillerie", en: "Fertilization with distillery vinasse compost", es: "Fertilización con compost de vinaza de destilería" },
      { fr: "Jachères tournantes — parcelle reposée 1 an sur 5", en: "Rotating fallows — plot rested 1 year in 5", es: "Barbechos rotativos — parcela en reposo 1 año de cada 5" },
      { fr: "Suivi Brix hebdomadaire — récolte à maturité optimale", en: "Weekly Brix monitoring — harvest at optimal maturity", es: "Seguimiento Brix semanal — cosecha en madurez óptima" },
    ],
    certificationDetails: [
      { fr: "AOC Rhum Agricole Guadeloupe — la seule AOC rhum au monde", en: "AOC Agricultural Rum Guadeloupe — the only rum AOC in the world", es: "AOC Ron Agrícola Guadalupe — la única AOC de ron en el mundo" },
      { fr: "Agriculture Biologique — certifié AB par Ecocert depuis 2012", en: "Organic Agriculture — AB certified by Ecocert since 2012", es: "Agricultura Ecológica — certificado AB por Ecocert desde 2012" },
      { fr: "Traçabilité parcelle — du champ à l'alambic", en: "Plot traceability — from field to still", es: "Trazabilidad de parcela — del campo al alambique" },
      { fr: "Contrôles ONIVins — organisme officiel de certification AOC", en: "ONIVins controls — official AOC certification body", es: "Controles ONIVins — organismo oficial de certificación AOC" },
    ],
    recompenses: [
      "Médaille d'Or — Concours Général Agricole 2023",
      "Best Organic Rum — RumFest 2022",
      "Certification Agriculture Biologique depuis 2012",
    ],
    tokens: 200,
    disponibles: 0,
    prixToken: 180,
    rendementEst: "11-15%",
    duree: "12 mois",
    recolte: "Mai 2026",
    assurance: {
      fr: "80% couverts en cas de cyclone ou épidémie de charbon de la canne",
      en: "80% covered in case of cyclone or sugarcane smut epidemic",
      es: "80% cubierto en caso de ciclón o epidemia de carbón de la caña",
    },
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