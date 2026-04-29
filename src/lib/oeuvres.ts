export type LocaleStr = { fr: string; en: string; es: string };

export interface Oeuvre {
  slug: string;
  titre: string;
  artiste: string;
  artisteInitiales: string;
  artisteBio: LocaleStr;
  artisteExpositions: string[];
  artisteActu: LocaleStr;
  origine: string;
  territoire: string;
  annee: number;
  medium: string;
  dimensions: string;
  style: LocaleStr;
  tag: string;
  tagColor: string;
  couleurs: string[];
  couleurBg: string;
  photo: string;
  photoBandeau: string;
  description: LocaleStr;
  histoire: LocaleStr;
  estimation: number;
  tokens: number;
  disponibles: number;
  prixToken: number;
  royaltes: string;
  rendementEst: string;
  statut: string;
  blockchain: string;
  auditeur: string;
  expositionsOeuvre: string[];
  droits: LocaleStr;
}

export const OEUVRES: Oeuvre[] = [
  {
    slug: "femme-aux-flamboyants",
    titre: "Femme aux Flamboyants",
    artiste: "Marie-Hélène Caumont",
    artisteInitiales: "MH",
    artisteBio: {
      fr: "Née en 1978 à Fort-de-France, Marie-Hélène Caumont est l'une des figures les plus importantes de la peinture néo-créole contemporaine. Formée aux Beaux-Arts de Bordeaux puis de Paris, elle est revenue en Martinique en 2008 pour développer un langage pictural ancré dans la mémoire et le paysage caribéen.",
      en: "Born in 1978 in Fort-de-France, Marie-Hélène Caumont is one of the most important figures in contemporary neo-Creole painting. Trained at the Fine Arts schools of Bordeaux and Paris, she returned to Martinique in 2008 to develop a pictorial language rooted in Caribbean memory and landscape.",
      es: "Nacida en 1978 en Fort-de-France, Marie-Hélène Caumont es una de las figuras más importantes de la pintura neo-criolla contemporánea. Formada en las Bellas Artes de Burdeos y París, regresó a Martinica en 2008 para desarrollar un lenguaje pictórico arraigado en la memoria y el paisaje caribeño.",
    },
    artisteExpositions: [
      "Fondation Clément, Le François, Martinique (2022)",
      "FRAC Martinique, Fort-de-France (2021)",
      "Galerie Habitation Latouche, Martinique (2023)",
      "Salon Art Caraïbe, Paris (2019, 2021, 2023)",
    ],
    artisteActu: {
      fr: "Exposition personnelle prévue Fondation Clément — printemps 2026. Série Femmes-Flore en cours.",
      en: "Solo exhibition planned at Fondation Clément — spring 2026. Femmes-Flore series in progress.",
      es: "Exposición individual prevista en Fondation Clément — primavera 2026. Serie Femmes-Flore en curso.",
    },
    origine: "Martinique",
    territoire: "martinique",
    annee: 2023,
    medium: "Huile sur toile",
    dimensions: "120 x 90 cm",
    style: {
      fr: "Néo-créole expressionniste",
      en: "Neo-Creole expressionist",
      es: "Neo-criolla expresionista",
    },
    tag: "Martinique",
    tagColor: "#0A1A3E",
    couleurs: ["#C8192A", "#F5A623", "#1A6B5A", "#F0E6D2"],
    couleurBg: "#0A1A3E",
    photo: "https://images.unsplash.com/photo-1578926288207-32356a2e7671?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1578926288207-32356a2e7671?w=1200&q=80",
    description: {
      fr: "Femme aux Flamboyants est une œuvre majeure de la série Femmes-Flore de Marie-Hélène Caumont. Sur un fond de rouge écarlate rappelant les flamboyants en fleur, une silhouette féminine s'entrelace avec la végétation tropicale dans un mouvement de fusion et de libération.",
      en: "Femme aux Flamboyants is a major work from Marie-Hélène Caumont's Femmes-Flore series. Against a scarlet red background evoking the flamboyant trees in bloom, a feminine silhouette intertwines with tropical vegetation in a movement of fusion and liberation.",
      es: "Femme aux Flamboyants es una obra mayor de la serie Femmes-Flore de Marie-Hélène Caumont. Sobre un fondo de rojo escarlata que evoca los flamboyanes en flor, una silueta femenina se entrelaza con la vegetación tropical en un movimiento de fusión y liberación.",
    },
    histoire: {
      fr: "Cette toile est née d'un séjour de l'artiste dans le nord de la Martinique, au milieu des grands flamboyants de la saison sèche. Caumont souhaitait capturer ce moment précis où la femme caribéenne devient une avec son paysage — non pas soumise à la nature, mais constitutive de celle-ci.",
      en: "This canvas was born from the artist's stay in northern Martinique, amid the great flamboyant trees of the dry season. Caumont wanted to capture that precise moment when the Caribbean woman becomes one with her landscape — not subjected to nature, but constitutive of it.",
      es: "Este lienzo nació de una estancia de la artista en el norte de Martinica, en medio de los grandes flamboyanes de la estación seca. Caumont quería capturar ese momento preciso en que la mujer caribeña se funde con su paisaje — no sometida a la naturaleza, sino constituyéndola.",
    },
    estimation: 8500,
    tokens: 85,
    disponibles: 31,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "12-18%",
    statut: "En levee",
    blockchain: "XRP Ledger — Token ID #CV-ART-2023-001",
    auditeur: "Cabinet Dupont & Associés, Fort-de-France",
    expositionsOeuvre: [
      "Salon Art Caraïbe, Paris — mars 2024",
      "Galerie Habitation Latouche, Martinique — janvier 2024",
    ],
    droits: {
      fr: "L'artiste conserve 100% des droits moraux. Les token-holders perçoivent 5% de royalties sur chaque revente secondaire, automatiquement distribués via smart contract XRPL.",
      en: "The artist retains 100% of moral rights. Token-holders receive 5% royalties on each secondary resale, automatically distributed via XRPL smart contract.",
      es: "El artista conserva el 100% de los derechos morales. Los tenedores de tokens reciben el 5% de regalías en cada reventa secundaria, distribuidas automáticamente mediante smart contract XRPL.",
    },
  },
  {
    slug: "memoire-de-saint-domingue",
    titre: "Mémoire de Saint-Domingue",
    artiste: "Jean-Claude Fortune",
    artisteInitiales: "JC",
    artisteBio: {
      fr: "Jean-Claude Fortune (né en 1965 à Port-au-Prince) est l'un des plus importants représentants de l'art haïtien contemporain. Installé à Montréal depuis 1994, il continue de puiser son inspiration dans la mémoire historique et culturelle d'Haïti.",
      en: "Jean-Claude Fortune (born 1965 in Port-au-Prince) is one of the most important representatives of contemporary Haitian art. Based in Montreal since 1994, he continues to draw inspiration from Haiti's historical and cultural memory.",
      es: "Jean-Claude Fortune (nacido en 1965 en Puerto Príncipe) es uno de los representantes más importantes del arte haitiano contemporáneo. Establecido en Montreal desde 1994, sigue nutriéndose de la memoria histórica y cultural de Haití.",
    },
    artisteExpositions: [
      "Myriam Nader Gallery, New York (2023)",
      "Galerie de l'UQAM, Montréal (2022)",
      "Centre d'Art Port-au-Prince (2019)",
      "Salon haïtien de la diaspora, Montréal (2021, 2023)",
    ],
    artisteActu: {
      fr: "Nouvelle série sur la Révolution haïtienne en préparation — publication prévue 2026.",
      en: "New series on the Haitian Revolution in preparation — publication planned 2026.",
      es: "Nueva serie sobre la Revolución haitiana en preparación — publicación prevista 2026.",
    },
    origine: "Haiti",
    territoire: "haiti",
    annee: 2022,
    medium: "Acrylique sur toile",
    dimensions: "150 x 120 cm",
    style: { fr: "Art haïtien contemporain", en: "Contemporary Haitian art", es: "Arte haitiano contemporáneo" },
    tag: "Haiti",
    tagColor: "#1A0A0A",
    couleurs: ["#1A3A8A", "#C8992A", "#8B1A1A", "#F5E8C0"],
    couleurBg: "#1A0A0A",
    photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80",
    description: {
      fr: "Mémoire de Saint-Domingue est une fresque narrative qui retrace les grands moments de la Révolution haïtienne de 1791 à 1804. Fortune utilise la technique du tableau dans le tableau pour superposer les époques et les mémoires.",
      en: "Mémoire de Saint-Domingue is a narrative fresco tracing the great moments of the Haitian Revolution from 1791 to 1804. Fortune uses the painting-within-a-painting technique to overlay eras and memories.",
      es: "Mémoire de Saint-Domingue es un fresco narrativo que recorre los grandes momentos de la Revolución Haitiana de 1791 a 1804. Fortune usa la técnica del cuadro dentro del cuadro para superponer épocas y memorias.",
    },
    histoire: {
      fr: "Fortune a commencé cette œuvre en 2020, pendant la pandémie, comme une méditation sur la résistance et la survie. Les couleurs bleu et rouge rappellent le drapeau haïtien, tandis que l'or symbolise la richesse culturelle jamais détruite.",
      en: "Fortune began this work in 2020, during the pandemic, as a meditation on resistance and survival. The blue and red colors recall the Haitian flag, while gold symbolizes cultural richness that was never destroyed.",
      es: "Fortune comenzó esta obra en 2020, durante la pandemia, como una meditación sobre la resistencia y la supervivencia. Los colores azul y rojo recuerdan la bandera haitiana, mientras que el oro simboliza la riqueza cultural que nunca fue destruida.",
    },
    estimation: 14000,
    tokens: 140,
    disponibles: 8,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "15-22%",
    statut: "Dernieres places",
    blockchain: "XRP Ledger — Token ID #CV-ART-2022-002",
    auditeur: "Bureau d'expertise Caraïbe Art, Paris",
    expositionsOeuvre: [
      "Myriam Nader Gallery, New York — septembre 2023",
      "Salon haïtien de la diaspora, Montréal — novembre 2023",
    ],
    droits: {
      fr: "L'artiste conserve 100% des droits moraux. Les token-holders perçoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
      en: "The artist retains 100% of moral rights. Token-holders receive 5% royalties on each secondary resale via XRPL smart contract.",
      es: "El artista conserva el 100% de los derechos morales. Los tenedores de tokens reciben el 5% de regalías en cada reventa secundaria mediante smart contract XRPL.",
    },
  },
  {
    slug: "foret-amazonienne-3",
    titre: "Forêt Amazonienne 3",
    artiste: "Kali Maloum",
    artisteInitiales: "KM",
    artisteBio: {
      fr: "Kali Maloum (née en 1990 à Cayenne) est une artiste pluridisciplinaire guyanaise dont le travail explore les liens entre la forêt amazonienne, les communautés autochtones et les enjeux écologiques contemporains.",
      en: "Kali Maloum (born 1990 in Cayenne) is a multidisciplinary Guianese artist whose work explores the links between the Amazonian rainforest, indigenous communities and contemporary ecological issues.",
      es: "Kali Maloum (nacida en 1990 en Cayena) es una artista multidisciplinar guayanesa cuyo trabajo explora los vínculos entre el bosque amazónico, las comunidades indígenas y los desafíos ecológicos contemporáneos.",
    },
    artisteExpositions: [
      "Musée des cultures guyanaises, Cayenne (2023)",
      "FRAC Pays de la Loire, Nantes (2022)",
      "Biennale de l'art africain contemporain, Dakar (2022)",
      "Exposition Amazon — Centre Pompidou, Paris (2024)",
    ],
    artisteActu: {
      fr: "Résidence artistique en forêt primaire — série Amazonie #4 en cours. Collaboration avec l'ONF Guyane.",
      en: "Artistic residency in primary forest — Amazonie #4 series in progress. Collaboration with ONF Guiana.",
      es: "Residencia artística en bosque primario — serie Amazonie #4 en curso. Colaboración con ONF Guayana.",
    },
    origine: "Guyane française",
    territoire: "diaspora",
    annee: 2024,
    medium: "Techniques mixtes",
    dimensions: "200 x 140 cm",
    style: { fr: "Art contemporain guyanais", en: "Contemporary Guianese art", es: "Arte contemporáneo guayanés" },
    tag: "Guyane",
    tagColor: "#052A20",
    couleurs: ["#0D4A1A", "#5A8A3C", "#D4C07A", "#1A3D2E"],
    couleurBg: "#052A20",
    photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    description: {
      fr: "Troisième volet de la série Forêt Amazonienne, cette œuvre en techniques mixtes combine peinture acrylique, éléments végétaux séchés et pigments naturels prélevés en forêt guyanaise.",
      en: "Third installment of the Amazonian Forest series, this mixed-media work combines acrylic painting, dried plant elements and natural pigments collected in the Guianese forest.",
      es: "Tercer capítulo de la serie Bosque Amazónico, esta obra de técnica mixta combina pintura acrílica, elementos vegetales secos y pigmentos naturales recogidos en el bosque guayanés.",
    },
    histoire: {
      fr: "Maloum a réalisé cette œuvre après six mois passés en immersion dans la forêt primaire de Guyane, en collaboration avec les communautés Teko et Wayampi. Elle utilise des pigments naturels qu'elle a elle-même préparés — ocres, noirs de charbon, verts de plantes.",
      en: "Maloum created this work after six months of immersion in the primary forest of Guiana, in collaboration with Teko and Wayampi communities. She uses natural pigments she prepared herself — ochres, charcoal blacks, plant greens.",
      es: "Maloum realizó esta obra tras seis meses de inmersión en el bosque primario de Guayana, en colaboración con las comunidades Teko y Wayampi. Utiliza pigmentos naturales que ella misma preparó — ocres, negros de carbón, verdes de plantas.",
    },
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
      "Première mondiale prévue — Musée des cultures guyanaises, Cayenne — juin 2025",
    ],
    droits: {
      fr: "L'artiste conserve 100% des droits moraux. Les token-holders perçoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
      en: "The artist retains 100% of moral rights. Token-holders receive 5% royalties on each secondary resale via XRPL smart contract.",
      es: "El artista conserva el 100% de los derechos morales. Los tenedores de tokens reciben el 5% de regalías en cada reventa secundaria mediante smart contract XRPL.",
    },
  },
  {
    slug: "bele-nocturne",
    titre: "Bèlè Nocturne",
    artiste: "David Séjour",
    artisteInitiales: "DS",
    artisteBio: {
      fr: "David Séjour (né en 1985 à Pointe-à-Pitre) est un peintre guadeloupéen dont l'œuvre s'inscrit dans la tradition de l'abstraction lyrique caribéenne. Après des études aux Beaux-Arts de Paris, il développe un travail intimement lié aux sons et aux rythmes de la musique traditionnelle — gwoka, bèlè, gwo-ka.",
      en: "David Séjour (born 1985 in Pointe-à-Pitre) is a Guadeloupean painter whose work is part of the tradition of Caribbean lyrical abstraction. After studying at the Paris Fine Arts school, he develops work intimately linked to the sounds and rhythms of traditional music — gwoka, bèlè, gwo-ka.",
      es: "David Séjour (nacido en 1985 en Pointe-à-Pitre) es un pintor guadalupeño cuya obra se inscribe en la tradición de la abstracción lírica caribeña. Tras estudiar en las Bellas Artes de París, desarrolla un trabajo íntimamente ligado a los sonidos y ritmos de la música tradicional.",
    },
    artisteExpositions: [
      "Mémorial ACTe, Pointe-à-Pitre (2022)",
      "Galerie Art Caraïbe, Paris (2021)",
      "Biennale Martinique (2019)",
    ],
    artisteActu: {
      fr: "Série Nuit Caribéenne en cours. Collaboration avec musiciens gwoka pour installation sonore.",
      en: "Caribbean Night series in progress. Collaboration with gwoka musicians for sound installation.",
      es: "Serie Noche Caribeña en curso. Colaboración con músicos gwoka para instalación sonora.",
    },
    origine: "Guadeloupe",
    territoire: "guadeloupe",
    annee: 2023,
    medium: "Huile et or sur toile",
    dimensions: "100 x 80 cm",
    style: { fr: "Abstraction caribéenne", en: "Caribbean abstraction", es: "Abstracción caribeña" },
    tag: "Guadeloupe",
    tagColor: "#1A0A3E",
    couleurs: ["#0A0A1A", "#C8992A", "#4A2A6A", "#E8E0F0"],
    couleurBg: "#1A0A3E",
    photo: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80",
    description: {
      fr: "Bèlè Nocturne est une œuvre abstraite inspirée par les cérémonies de bèlè — danse rituelle guadeloupéenne pratiquée la nuit à la lueur des torches. La toile capture le mouvement, la transe et la spiritualité de ces rites.",
      en: "Bèlè Nocturne is an abstract work inspired by bèlè ceremonies — a Guadeloupean ritual dance practiced at night by torchlight. The canvas captures the movement, trance and spirituality of these rites.",
      es: "Bèlè Nocturne es una obra abstracta inspirada en las ceremonias de bèlè — danza ritual guadalupeña practicada de noche a la luz de las antorchas. El lienzo captura el movimiento, el trance y la espiritualidad de estos ritos.",
    },
    histoire: {
      fr: "Séjour a assisté pendant plusieurs années aux cérémonies de bèlè dans le nord de la Guadeloupe. Il a développé une méthode de peinture nocturne — travaillant uniquement la nuit, à la bougie — pour capter l'essence de ces moments. La feuille d'or appliquée en finition rappelle les ornements portés par les danseuses.",
      en: "Séjour attended bèlè ceremonies in northern Guadeloupe for several years. He developed a nocturnal painting method — working only at night, by candlelight — to capture the essence of these moments. The gold leaf applied as a finish recalls the ornaments worn by the dancers.",
      es: "Séjour asistió durante varios años a las ceremonias de bèlè en el norte de Guadalupe. Desarrolló un método de pintura nocturna — trabajando únicamente de noche, a la luz de las velas — para capturar la esencia de estos momentos. El pan de oro aplicado como acabado recuerda los ornamentos de las bailarinas.",
    },
    estimation: 6200,
    tokens: 62,
    disponibles: 0,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "10-15%",
    statut: "Complet",
    blockchain: "XRP Ledger — Token ID #CV-ART-2023-004",
    auditeur: "Cabinet Dupont & Associés, Fort-de-France",
    expositionsOeuvre: [
      "Mémorial ACTe, Pointe-à-Pitre — octobre 2023",
      "Galerie Art Caraïbe, Paris — janvier 2024",
    ],
    droits: {
      fr: "L'artiste conserve 100% des droits moraux. Les token-holders perçoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
      en: "The artist retains 100% of moral rights. Token-holders receive 5% royalties on each secondary resale via XRPL smart contract.",
      es: "El artista conserva el 100% de los derechos morales. Los tenedores de tokens reciben el 5% de regalías en cada reventa secundaria mediante smart contract XRPL.",
    },
  },
  {
    slug: "marche-de-jacmel",
    titre: "Marché de Jacmel",
    artiste: "Roseline Augustin",
    artisteInitiales: "RA",
    artisteBio: {
      fr: "Roseline Augustin (née en 1958 à Jacmel, Haïti) est une maîtresse du réalisme naïf haïtien, formée au Centre d'Art de Port-au-Prince dans la tradition d'Hector Hyppolite. Son œuvre documente la vie quotidienne haïtienne avec une précision ethnographique et une jubilation chromatique.",
      en: "Roseline Augustin (born 1958 in Jacmel, Haiti) is a master of Haitian naïve realism, trained at the Port-au-Prince Art Centre in the tradition of Hector Hyppolite. Her work documents Haitian daily life with ethnographic precision and chromatic exuberance.",
      es: "Roseline Augustin (nacida en 1958 en Jacmel, Haití) es una maestra del realismo naïf haitiano, formada en el Centro de Arte de Puerto Príncipe en la tradición de Hector Hyppolite. Su obra documenta la vida cotidiana haitiana con precisión etnográfica y júbilo cromático.",
    },
    artisteExpositions: [
      "Christie's New York — vente Haïtien Art (2022, 2024)",
      "Nader Gallery, New York (2020, 2022, 2024)",
      "Musée du Panthéon National, Port-au-Prince (2019)",
      "Galerie d'art haïtien, Montréal (2023)",
    ],
    artisteActu: {
      fr: "Collection privée new-yorkaise en cours d'acquisition. Prix moyen en hausse de 25% depuis 2022.",
      en: "New York private collection being acquired. Average price up 25% since 2022.",
      es: "Colección privada neoyorquina en proceso de adquisición. Precio medio al alza un 25% desde 2022.",
    },
    origine: "Haiti",
    territoire: "haiti",
    annee: 2021,
    medium: "Huile sur toile",
    dimensions: "180 x 130 cm",
    style: { fr: "Réalisme naïf haïtien", en: "Haitian naïve realism", es: "Realismo naïf haitiano" },
    tag: "Haiti Millésime",
    tagColor: "#8B1A1A",
    couleurs: ["#E83A2A", "#F5A020", "#2A8A3A", "#4A2ACA"],
    couleurBg: "#1A0A0A",
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    description: {
      fr: "Marché de Jacmel est une fresque fourmillante représentant le marché dominical de Jacmel — ville historique du sud d'Haïti, capitale culturelle du pays. En 180x130 cm, Augustin capture des dizaines de personnages, d'étals et de scènes de vie.",
      en: "Marché de Jacmel is a teeming fresco depicting the Sunday market of Jacmel — a historic city in southern Haiti, the country's cultural capital. Across 180x130 cm, Augustin captures dozens of characters, stalls and life scenes.",
      es: "Marché de Jacmel es un fresco hormigueante que representa el mercado dominical de Jacmel — ciudad histórica del sur de Haití, capital cultural del país. En 180x130 cm, Augustin captura docenas de personajes, puestos y escenas de vida.",
    },
    histoire: {
      fr: "Augustin a commencé à peindre le marché de Jacmel en 1985. Cette toile de 2021 est la plus grande et la plus aboutie de sa série — une synthèse de 36 ans d'observation et de peinture. Chaque personnage a été étudié d'après nature.",
      en: "Augustin began painting Jacmel's market in 1985. This 2021 canvas is the largest and most accomplished in her series — a synthesis of 36 years of observation and painting. Each character was studied from nature.",
      es: "Augustin comenzó a pintar el mercado de Jacmel en 1985. Este lienzo de 2021 es el más grande y acabado de su serie — una síntesis de 36 años de observación y pintura. Cada personaje fue estudiado del natural.",
    },
    estimation: 22000,
    tokens: 220,
    disponibles: 44,
    prixToken: 100,
    royaltes: "5%",
    rendementEst: "18-25%",
    statut: "En levee",
    blockchain: "XRP Ledger — Token ID #CV-ART-2021-005",
    auditeur: "Bureau d'expertise Caraïbe Art, Paris",
    expositionsOeuvre: [
      "Nader Gallery, New York — mars 2022",
      "Galerie d'art haïtien, Montréal — novembre 2023",
      "Estimation Christie's : 20 000 - 25 000 $ (2024)",
    ],
    droits: {
      fr: "L'artiste conserve 100% des droits moraux. Les token-holders perçoivent 5% de royalties sur chaque revente secondaire via smart contract XRPL.",
      en: "The artist retains 100% of moral rights. Token-holders receive 5% royalties on each secondary resale via XRPL smart contract.",
      es: "El artista conserva el 100% de los derechos morales. Los tenedores de tokens reciben el 5% de regalías en cada reventa secundaria mediante smart contract XRPL.",
    },
  },
  {
    slug: "droits-musicaux-kase-ko",
    titre: "Droits Musicaux — Kase Ko",
    artiste: "Collectif Zouk Numérique",
    artisteInitiales: "ZN",
    artisteBio: {
      fr: "Le Collectif Zouk Numérique est un groupement de 8 producteurs et compositeurs de Martinique et Guadeloupe, fondé en 2019 pour tokeniser et valoriser le patrimoine musical zouk caribéen.",
      en: "The Digital Zouk Collective is a group of 8 producers and composers from Martinique and Guadeloupe, founded in 2019 to tokenize and promote the Caribbean zouk musical heritage.",
      es: "El Colectivo Zouk Digital es un grupo de 8 productores y compositores de Martinica y Guadalupe, fundado en 2019 para tokenizar y valorizar el patrimonio musical zouk caribeño.",
    },
    artisteExpositions: [
      "Midem Cannes 2023 — showcase droits numériques",
      "Festival Créole Paris 2022",
      "Konser Zouk Guadeloupe 2023",
    ],
    artisteActu: {
      fr: "Catalogue en cours d'extension — 6 nouveaux titres prévus 2026. Streaming : +2M d'écoutes/mois.",
      en: "Catalogue being extended — 6 new tracks planned 2026. Streaming: +2M listens/month.",
      es: "Catálogo en expansión — 6 nuevos títulos previstos para 2026. Streaming: +2M escuchas/mes.",
    },
    origine: "Martinique & Guadeloupe",
    territoire: "diaspora",
    annee: 2024,
    medium: "Catalogue 12 titres — Droits numériques",
    dimensions: "Droits streaming + sync + édition",
    style: { fr: "Droits musicaux Zouk", en: "Zouk music rights", es: "Derechos musicales Zouk" },
    tag: "Droits musicaux",
    tagColor: "#7B2FBE",
    couleurs: ["#7B2FBE", "#E8B86D", "#1A0A2E", "#F5E8C0"],
    couleurBg: "#1A0A2E",
    photo: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    photoBandeau: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
    description: {
      fr: "Ce token représente une fraction des droits d'exploitation d'un catalogue de 12 titres zouk contemporain — streaming, synchronisation audiovisuelle et édition. Les royalties sont automatiquement distribuées aux token-holders à chaque utilisation commerciale.",
      en: "This token represents a fraction of the exploitation rights of a catalogue of 12 contemporary zouk tracks — streaming, audiovisual synchronization and publishing. Royalties are automatically distributed to token-holders on each commercial use.",
      es: "Este token representa una fracción de los derechos de explotación de un catálogo de 12 títulos zouk contemporáneo — streaming, sincronización audiovisual y edición. Las regalías se distribuyen automáticamente a los tenedores de tokens en cada uso comercial.",
    },
    histoire: {
      fr: "Le Collectif Zouk Numérique est né d'un constat : les musiciens caribéens perdent une grande partie de leurs revenus face aux intermédiaires traditionnels. En tokenisant leurs droits sur XRPL, ils permettent à leurs fans et investisseurs de partager directement leurs succès.",
      en: "The Digital Zouk Collective was born from an observation: Caribbean musicians lose a large part of their income to traditional intermediaries. By tokenizing their rights on XRPL, they allow their fans and investors to directly share in their success.",
      es: "El Colectivo Zouk Digital nació de una constatación: los músicos caribeños pierden gran parte de sus ingresos ante los intermediarios tradicionales. Al tokenizar sus derechos en XRPL, permiten a sus fans e inversores compartir directamente sus éxitos.",
    },
    estimation: 35000,
    tokens: 350,
    disponibles: 180,
    prixToken: 100,
    royaltes: "8%",
    rendementEst: "15-25%",
    statut: "En levee",
    blockchain: "XRP Ledger — Token ID #CV-MUSIC-2024-006",
    auditeur: "Cabinet juridique musique, Paris · SACEM enregistré",
    expositionsOeuvre: [
      "Midem Cannes 2023 — présentation catalogue",
      "Distribution : Spotify, Apple Music, Deezer, Tidal",
    ],
    droits: {
      fr: "Les token-holders perçoivent 8% des revenus nets générés par le catalogue (streaming, sync, édition) distribués trimestriellement via smart contract XRPL.",
      en: "Token-holders receive 8% of the net revenues generated by the catalogue (streaming, sync, publishing) distributed quarterly via XRPL smart contract.",
      es: "Los tenedores de tokens reciben el 8% de los ingresos netos generados por el catálogo (streaming, sync, edición) distribuidos trimestralmente mediante smart contract XRPL.",
    },
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