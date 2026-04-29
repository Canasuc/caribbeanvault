export type LocaleStr = { fr: string; en: string; es: string };

export interface Bien {
  id: number;
  nom: string;
  type: LocaleStr;
  ile: string;
  region: string;
  pays: LocaleStr;
  adresse: string;
  coordonnees: { lat: number; lng: number };
  surface: string;
  pieces: LocaleStr;
  valeur: number;
  tokensTotal: number;
  tokensDispo: number;
  prixToken: number;
  rendementBrut: string;
  revenuEstime: string;
  occupation: string;
  statut: "En levée" | "Dernières places" | "Nouveau" | "Complet";
  locatif: LocaleStr;
  photo: string;
  tag: LocaleStr;
  tagColor: string;
  description: LocaleStr;
  gestionnaire: string;
  typeBail: LocaleStr;
  anneeConstruction: number;
  classEnergie: string;
}

export const BIENS: Bien[] = [
  {
    id: 1,
    nom: "Villa Karukera",
    type: { fr: "Villa Touristique", en: "Tourist Villa", es: "Villa Turística" },
    ile: "Guadeloupe",
    region: "Sainte-Anne",
    pays: { fr: "France (DOM)", en: "France (Overseas)", es: "Francia (DOM)" },
    adresse: "Sainte-Anne, Guadeloupe",
    coordonnees: { lat: 16.2268, lng: -61.3849 },
    surface: "180 m²",
    pieces: { fr: "5 chambres · Piscine · Vue mer", en: "5 bedrooms · Pool · Sea view", es: "5 habitaciones · Piscina · Vista al mar" },
    valeur: 420000,
    tokensTotal: 210,
    tokensDispo: 87,
    prixToken: 1000,
    rendementBrut: "9,8%",
    revenuEstime: "34 300 € / an",
    occupation: "72%",
    statut: "En levée",
    locatif: { fr: "Airbnb", en: "Airbnb", es: "Airbnb" },
    photo: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
    tag: { fr: "Tourisme", en: "Tourism", es: "Turismo" },
    tagColor: "#0891B2",
    description: {
      fr: "Villa d'exception face à la mer des Caraïbes, entièrement rénovée en 2022. Piscine à débordement, terrasse panoramique.",
      en: "Exceptional villa facing the Caribbean Sea, fully renovated in 2022. Infinity pool, panoramic terrace.",
      es: "Villa excepcional frente al mar Caribe, completamente renovada en 2022. Piscina desbordante, terraza panorámica.",
    },
    gestionnaire: "Antilles Gestion Immobilière",
    typeBail: { fr: "Saisonnier", en: "Seasonal", es: "De temporada" },
    anneeConstruction: 2008,
    classEnergie: "C",
  },
  {
    id: 2,
    nom: "Commerce Centre-Ville",
    type: { fr: "Local Commercial", en: "Commercial Premises", es: "Local Comercial" },
    ile: "Guadeloupe",
    region: "Pointe-à-Pitre",
    pays: { fr: "France (DOM)", en: "France (Overseas)", es: "Francia (DOM)" },
    adresse: "Pointe-à-Pitre, Guadeloupe",
    coordonnees: { lat: 16.2413, lng: -61.5336 },
    surface: "95 m²",
    pieces: { fr: "Bail 9 ans signé · Rez-de-chaussée", en: "9-year lease signed · Ground floor", es: "Arrendamiento 9 años firmado · Planta baja" },
    valeur: 180000,
    tokensTotal: 108,
    tokensDispo: 42,
    prixToken: 500,
    rendementBrut: "8,2%",
    revenuEstime: "1 240 € / mois",
    occupation: "100%",
    statut: "En levée",
    locatif: { fr: "Bail commercial", en: "Commercial lease", es: "Arrendamiento comercial" },
    photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    tag: { fr: "Bail garanti", en: "Guaranteed lease", es: "Arrendamiento garantizado" },
    tagColor: "#0F6E56",
    description: {
      fr: "Local commercial en rez-de-chaussée, bail commercial 9 ans signé avec locataire solvable. Loyer indexé INSEE.",
      en: "Ground floor commercial premises, 9-year commercial lease signed with solvent tenant. INSEE-indexed rent.",
      es: "Local comercial en planta baja, arrendamiento comercial de 9 años firmado con inquilino solvente. Alquiler indexado al IPC.",
    },
    gestionnaire: "Cabinet Martin Immobilier",
    typeBail: { fr: "Commercial", en: "Commercial", es: "Comercial" },
    anneeConstruction: 1995,
    classEnergie: "D",
  },
  {
    id: 3,
    nom: "Villa Anse Noire",
    type: { fr: "Villa Touristique", en: "Tourist Villa", es: "Villa Turística" },
    ile: "Martinique",
    region: "Trois-Îlets",
    pays: { fr: "France (DOM)", en: "France (Overseas)", es: "Francia (DOM)" },
    adresse: "Trois-Îlets, Martinique",
    coordonnees: { lat: 14.5344, lng: -61.0589 },
    surface: "220 m²",
    pieces: { fr: "6 chambres · Piscine · Plage privée", en: "6 bedrooms · Pool · Private beach", es: "6 habitaciones · Piscina · Playa privada" },
    valeur: 580000,
    tokensTotal: 290,
    tokensDispo: 15,
    prixToken: 1000,
    rendementBrut: "10,5%",
    revenuEstime: "51 200 € / an",
    occupation: "78%",
    statut: "Dernières places",
    locatif: { fr: "Airbnb + Booking", en: "Airbnb + Booking", es: "Airbnb + Booking" },
    photo: "https://images.unsplash.com/photo-1602343168117-bb8ced3a3b15?w=600&q=80",
    tag: { fr: "Premium", en: "Premium", es: "Premium" },
    tagColor: "#854F0B",
    description: {
      fr: "Villa de luxe avec accès direct à une plage privée. Décoration créole contemporaine, jacuzzi extérieur.",
      en: "Luxury villa with direct access to a private beach. Contemporary Creole décor, outdoor jacuzzi.",
      es: "Villa de lujo con acceso directo a una playa privada. Decoración criolla contemporánea, jacuzzi exterior.",
    },
    gestionnaire: "Martinique Luxury Rentals",
    typeBail: { fr: "Saisonnier", en: "Seasonal", es: "De temporada" },
    anneeConstruction: 2015,
    classEnergie: "B",
  },
  {
    id: 4,
    nom: "Résidence Cayenne Centre",
    type: { fr: "Appartement Meublé", en: "Furnished Apartment", es: "Apartamento Amueblado" },
    ile: "Guyane",
    region: "Cayenne",
    pays: { fr: "France (DOM)", en: "France (Overseas)", es: "Francia (DOM)" },
    adresse: "Cayenne, Guyane française",
    coordonnees: { lat: 4.9224, lng: -52.3135 },
    surface: "65 m²",
    pieces: { fr: "T3 meublé · Centre-ville · Parking", en: "3-room furnished · City centre · Parking", es: "3 habitaciones amueblado · Centro ciudad · Aparcamiento" },
    valeur: 145000,
    tokensTotal: 87,
    tokensDispo: 87,
    prixToken: 500,
    rendementBrut: "7,8%",
    revenuEstime: "950 € / mois",
    occupation: "95%",
    statut: "Nouveau",
    locatif: { fr: "Location longue durée", en: "Long-term rental", es: "Alquiler de larga duración" },
    photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    tag: { fr: "Guyane", en: "Guiana", es: "Guayana" },
    tagColor: "#3B6D11",
    description: {
      fr: "Appartement T3 meublé en centre-ville de Cayenne. Fort taux d'occupation grâce à la demande de fonctionnaires et expatriés.",
      en: "Furnished 3-room apartment in central Cayenne. High occupancy rate due to demand from civil servants and expats.",
      es: "Apartamento de 3 habitaciones amueblado en el centro de Cayena. Alta tasa de ocupación gracias a la demanda de funcionarios y expatriados.",
    },
    gestionnaire: "Guyane Patrimoine",
    typeBail: { fr: "Meublé", en: "Furnished", es: "Amueblado" },
    anneeConstruction: 2010,
    classEnergie: "C",
  },
  {
    id: 5,
    nom: "Le Pélican · Saint-Martin",
    type: { fr: "Boutique-Hôtel", en: "Boutique Hotel", es: "Boutique-Hotel" },
    ile: "Saint-Martin",
    region: "Marigot",
    pays: { fr: "France (COM)", en: "France (COM)", es: "Francia (COM)" },
    adresse: "Marigot, Saint-Martin",
    coordonnees: { lat: 18.0731, lng: -63.0822 },
    surface: "12 chambres",
    pieces: { fr: "Hôtel classé · Restaurant · Spa", en: "Rated hotel · Restaurant · Spa", es: "Hotel clasificado · Restaurante · Spa" },
    valeur: 1200000,
    tokensTotal: 600,
    tokensDispo: 240,
    prixToken: 1000,
    rendementBrut: "11,2%",
    revenuEstime: "112 000 € / an",
    occupation: "81%",
    statut: "En levée",
    locatif: { fr: "Hôtellerie", en: "Hotel management", es: "Hostelería" },
    photo: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
    tag: { fr: "Hôtellerie", en: "Hospitality", es: "Hostelería" },
    tagColor: "#534AB7",
    description: {
      fr: "Boutique-hôtel 4 étoiles en bord de mer à Marigot. Restaurant gastronomique créole, spa et piscine infinity.",
      en: "4-star boutique hotel by the sea in Marigot. Creole gastronomic restaurant, spa and infinity pool.",
      es: "Boutique-hotel de 4 estrellas a orillas del mar en Marigot. Restaurante gastronómico criollo, spa y piscina infinity.",
    },
    gestionnaire: "Saint-Martin Hospitality Group",
    typeBail: { fr: "Hôtellerie", en: "Hotel management", es: "Hostelería" },
    anneeConstruction: 2018,
    classEnergie: "B",
  },
  {
    id: 6,
    nom: "Espace Bureau Fort-de-France",
    type: { fr: "Bureau", en: "Office", es: "Oficina" },
    ile: "Martinique",
    region: "Fort-de-France",
    pays: { fr: "France (DOM)", en: "France (Overseas)", es: "Francia (DOM)" },
    adresse: "Fort-de-France, Martinique",
    coordonnees: { lat: 14.6037, lng: -61.0686 },
    surface: "140 m²",
    pieces: { fr: "Bail 6 ans · Open space · Fibre", en: "6-year lease · Open space · Fibre", es: "Arrendamiento 6 años · Open space · Fibra" },
    valeur: 260000,
    tokensTotal: 130,
    tokensDispo: 0,
    prixToken: 1000,
    rendementBrut: "8,8%",
    revenuEstime: "1 920 € / mois",
    occupation: "100%",
    statut: "Complet",
    locatif: { fr: "Bail commercial", en: "Commercial lease", es: "Arrendamiento comercial" },
    photo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    tag: { fr: "Complet", en: "Full", es: "Completo" },
    tagColor: "#444441",
    description: {
      fr: "Plateau de bureaux open space entièrement rénové, bail commercial 6 ans signé avec cabinet d'avocats.",
      en: "Fully renovated open space office floor, 6-year commercial lease signed with law firm.",
      es: "Planta de oficinas open space completamente renovada, arrendamiento comercial de 6 años firmado con bufete de abogados.",
    },
    gestionnaire: "Cabinet Martin Immobilier",
    typeBail: { fr: "Commercial", en: "Commercial", es: "Comercial" },
    anneeConstruction: 2000,
    classEnergie: "C",
  },
];

export const REGIONS = [
  {
    nom: "Guadeloupe",
    drapeau: "🇬🇵",
    pays: "France (DOM)",
    population: "395 000 habitants",
    superficie: "1 628 km²",
    pib: "9,2 Mds €",
    prixM2Moyen: "2 800 €/m²",
    rendementMoyen: "7–10%",
    touristes: "600 000/an",
    histoire: "Département français d'outre-mer depuis 1946, la Guadeloupe est un archipel de 9 îles principales. Son économie repose sur le tourisme, l'agriculture (banane, canne à sucre) et les services publics. Le marché immobilier bénéficie de la forte demande locative touristique et de la pénurie de logements.",
    atouts: ["Fiscalité Girardin avantageuse", "Fort taux d'occupation touristique", "Marché stable adossé à la France", "Croissance du tourisme de luxe"],
    couleur: "#0891B2",
  },
  {
    nom: "Martinique",
    drapeau: "🇲🇶",
    pays: "France (DOM)",
    population: "350 000 habitants",
    superficie: "1 128 km²",
    pib: "9,5 Mds €",
    prixM2Moyen: "3 100 €/m²",
    rendementMoyen: "8–11%",
    touristes: "500 000/an",
    histoire: "Île française des Antilles, la Martinique est réputée pour son économie diversifiée et son niveau de vie élevé dans la Caraïbe. Le marché immobilier est le plus mature des DOM, avec des prix en hausse constante depuis 2018. La demande de villas de luxe explose depuis la pandémie.",
    atouts: ["Marché premium en forte croissance", "Pinel Outre-Mer applicable", "Aéroport international moderne", "Clientèle européenne haut de gamme"],
    couleur: "#0F5240",
  },
  {
    nom: "Guyane",
    drapeau: "🇬🇫",
    pays: "France (DOM)",
    population: "300 000 habitants",
    superficie: "83 534 km²",
    pib: "4,5 Mds €",
    prixM2Moyen: "2 200 €/m²",
    rendementMoyen: "7–9%",
    touristes: "100 000/an",
    histoire: "Seul territoire français en Amérique du Sud, la Guyane connaît une croissance démographique exceptionnelle (+2,5%/an). La présence du Centre Spatial Guyanais génère une forte demande de logements pour les fonctionnaires et expatriés du secteur spatial.",
    atouts: ["Croissance démographique forte", "Demande locative soutenue (spatial, mines)", "Prix encore accessibles", "Défiscalisation DOM majorée"],
    couleur: "#2C3A1E",
  },
  {
    nom: "Saint-Martin",
    drapeau: "🇸🇽",
    pays: "France (COM)",
    population: "36 000 habitants",
    superficie: "53 km²",
    pib: "0,6 Mds €",
    prixM2Moyen: "4 500 €/m²",
    rendementMoyen: "9–13%",
    touristes: "450 000/an",
    histoire: "Île franco-néerlandaise, Saint-Martin est la plus petite île du monde partagée entre deux nations. Zone de libre-échange depuis 1995, elle attire une clientèle ultra-premium internationale. Après le cyclone Irma (2017), la reconstruction a modernisé l'offre hôtelière et résidentielle de luxe.",
    atouts: ["Zone franche — avantages fiscaux majeurs", "Marché du luxe en plein essor", "Double nationalité franco-néerlandaise", "Aéroport Princess Juliana (international)"],
    couleur: "#534AB7",
  },
];

export const PROCESSUS_ONBOARDING = [
  { num: "01", titre: "Sélection du bien", desc: "Notre équipe identifie et audite chaque bien : diagnostic technique, estimation indépendante, analyse du marché local et vérification juridique du titre de propriété.", icone: "🔍", duree: "2–4 semaines" },
  { num: "02", titre: "Structuration juridique", desc: "Création d'une SPV (Société à Objet Spécial) dédiée au bien. Le bien est transféré dans la SPV, isolant l'actif du patrimoine de CaribbeanVault.", icone: "⚖️", duree: "3–6 semaines" },
  { num: "03", titre: "Tokenisation XRPL", desc: "Émission des tokens sur XRP Ledger. Chaque token représente une fraction de la SPV. Smart contract audité par un cabinet indépendant.", icone: "⛓️", duree: "1–2 semaines" },
  { num: "04", titre: "Mise en ligne & levée", desc: "Publication sur CaribbeanVault avec fiche détaillée, photos, diagnostics, bail et projections. Ouverture de la levée de fonds aux investisseurs KYC validés.", icone: "🚀", duree: "Ouvert 30–90 jours" },
  { num: "05", titre: "Gestion locative", desc: "Un gestionnaire local partenaire prend en charge la gestion quotidienne : locataires, entretien, assurances. Rapport trimestriel aux token-holders.", icone: "🏠", duree: "Continu" },
  { num: "06", titre: "Distribution des revenus", desc: "Les loyers sont collectés, les charges déduites, et le solde distribué automatiquement sur les wallets XRPL des token-holders chaque trimestre.", icone: "💰", duree: "Trimestriel" },
];

export const TYPES_BAIL = [
  { nom: "Location Saisonnière", icone: "🌴", description: "Airbnb, Booking.com. Revenus variables selon la saison, fort potentiel en haute saison touristique.", rendement: "8–12%", risque: "Moyen", duree: "Court terme", avantages: ["Rendement potentiel élevé", "Flexibilité de gestion", "Plus-value locative estivale"], inconvenients: ["Revenus variables", "Gestion intensive", "Dépendance au tourisme"], couleur: "#0891B2" },
  { nom: "Bail Commercial 3-6-9", icone: "🏢", description: "Contrat de bail signé avec une entreprise. Loyer fixe garanti, renouvellement automatique.", rendement: "6–9%", risque: "Faible", duree: "3 à 9 ans", avantages: ["Revenus garantis et stables", "Locataire professionnel solvable", "Charges locatives récupérables"], inconvenients: ["Rendement plafonné", "Rigidité du contrat", "Risque de vacance à l'échéance"], couleur: "#0F5240" },
  { nom: "Location Meublée", icone: "🛋️", description: "LMNP (Loueur Meublé Non Professionnel). Régime fiscal avantageux, amortissement du bien possible.", rendement: "6–8%", risque: "Faible-Moyen", duree: "1 an renouvelable", avantages: ["Régime LMNP avantageux", "Amortissement fiscal", "Demande locative soutenue"], inconvenients: ["Turnover locataire plus élevé", "Charges de mobilier", "Gestion plus active"], couleur: "#854F0B" },
  { nom: "Hôtellerie", icone: "🏨", description: "Exploitation hôtelière avec gestionnaire professionnel. Revenus liés au taux d'occupation annuel.", rendement: "9–14%", risque: "Moyen-Élevé", duree: "Contrat de gestion", avantages: ["Rendement le plus élevé", "Gestion 100% déléguée", "Valorisation du bien par l'exploitation"], inconvenients: ["Dépendance au gestionnaire", "Risque saisonnier fort", "Investissement minimum élevé"], couleur: "#534AB7" },
];

export const FISCALITE = [
  { nom: "Girardin Immobilier", flag: "🇫🇷", reduction: "Jusqu'à 48%", description: "Dispositif de défiscalisation permettant une réduction d'impôt pouvant atteindre 48% du montant investi dans des logements locatifs neufs dans les DOM.", conditions: ["Logement neuf ou réhabilité", "Location non meublée 6 ans minimum", "Plafonds de loyers et de ressources du locataire", "Zones éligibles : Guadeloupe, Martinique, Guyane"], couleur: "#1A2E4A" },
  { nom: "Pinel Outre-Mer", flag: "🇫🇷", reduction: "Jusqu'à 32%", description: "Extension du dispositif Pinel aux DOM-TOM avec des taux de réduction d'impôt majorés par rapport à la métropole.", conditions: ["Bien neuf éligible BBC", "Engagement de location 6, 9 ou 12 ans", "Plafonds de loyers DOM spécifiques", "Réduction 23%, 29% ou 32% selon durée"], couleur: "#0891B2" },
  { nom: "LMNP Amortissement", flag: "🇪🇺", reduction: "Revenus quasi nets d'impôt", description: "Le statut LMNP permet d'amortir le bien immobilier et le mobilier, générant un déficit comptable qui neutralise fiscalement les revenus locatifs.", conditions: ["Location meublée uniquement", "Revenus < 23 000€ ou 50% des revenus globaux", "Régime réel obligatoire", "Applicable dans tous les DOM"], couleur: "#0F5240" },
  { nom: "Exonération de plus-value", flag: "🇫🇷", reduction: "Exonération totale après 22 ans", description: "La plus-value immobilière est progressivement exonérée d'impôt sur le revenu après 6 ans de détention, et totalement exonérée après 22 ans.", conditions: ["Abattement progressif dès 6 ans", "Exonération IR totale à 22 ans", "Exonération prélèvements sociaux à 30 ans", "Applicable résidence principale immédiate"], couleur: "#2C3A1E" },
];

export function getBien(slug: string) {
  return BIENS.find(b => b.nom.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") === slug
  ) || null;
}

export function getBienSlug(bien: typeof BIENS[number]) {
  return bien.nom.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}