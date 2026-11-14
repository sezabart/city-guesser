// Guess the City — the quiz.
//
// Each entry is one question. `choices` lists seven cities; the correct one is
// `city`, and may sit anywhere in that list — the game shuffles it every round.
// `fact` is shown on the verdict screen. Every photograph is from Wikimedia
// Commons; `credit` is the attribution shown on the credits screen.

window.QUIZ = [
  {
    city: "Paris",
    image: "images/01-paris.jpg",
    fact: "Grey zinc mansard roofs, a forest of chimney pots, and the same cream stone facade repeating for kilometres. Haussmann rebuilt the city in the 1860s and it never stopped looking like this.",
    choices: ["Paris", "Lyon", "Bordeaux", "Brussels", "Vienna", "Milan", "Barcelona"],
    credit: { author: "Pline", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:DSC_7161-toits-de-l%27ile-de-.jpg" }
  },
  {
    city: "Porto",
    image: "images/02-porto.jpg",
    fact: "Terracotta roofs stacked up a granite hillside, with staircases squeezed between the houses. Portugal's second city, on the Douro.",
    choices: ["Porto", "Lisbon", "Bilbao", "Málaga", "Vigo", "Cádiz", "A Coruña"],
    credit: { author: "Michael Gaylard from Horsham, UK", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:A_Bird%27s-Eye_View_of_Porto%27s_Ribeira_District_with_its_Iconic_Red-Tiled_Roofs_and_Extensive_Stairways_(55246883373).jpg" }
  },
  {
    city: "Istanbul",
    image: "images/03-istanbul.jpg",
    fact: "Painted timber bay windows — cumbalar — draped in vines. These are the old apartment hills above the Golden Horn.",
    choices: ["Istanbul", "İzmir", "Ankara", "Thessaloniki", "Baku", "Beirut", "Sofia"],
    credit: { author: "Maurice Flesier", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Colorful_apartment_buildings,_Istanbul,_Turkey.jpg" }
  },
  {
    city: "Tbilisi",
    image: "images/04-tbilisi.jpg",
    fact: "Whole floors hang out over the cliff on wooden balconies. Tbilisi's Old Town does not believe in straight walls.",
    choices: ["Tbilisi", "Yerevan", "Batumi", "Baku", "Trabzon", "Tehran", "Tashkent"],
    credit: { author: "Reda Kerbush", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Abanotubani,_Tbilisi_1.jpg" }
  },
  {
    city: "Chicago",
    image: "images/05-chicago.jpg",
    fact: "The skyscraper was invented here. The river runs through a canyon of steel and glass, with bascule bridges crossing it every block.",
    choices: ["Chicago", "Toronto", "Boston", "Philadelphia", "Minneapolis", "Cleveland", "Seattle"],
    credit: { author: "Mike Boehmer", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Chicago_River_from_Lake_Street_bridge.jpg" }
  },
  {
    city: "São Paulo",
    image: "images/06-saopaulo.jpg",
    fact: "No sea, no famous monument, no horizon — just an ocean of high-rises running past the haze in every direction.",
    choices: ["São Paulo", "Mexico City", "Bogotá", "Lima", "Rio de Janeiro", "Buenos Aires", "Santiago"],
    credit: { author: "Wilfredor", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_air_pollution_in_S%C3%A3o_Paulo_city,_Brazil.jpg" }
  },
  {
    city: "Seoul",
    image: "images/07-seoul.jpg",
    fact: "Rows of near-identical apartment blocks along the Han, with granite hills and a TV tower poking up behind them.",
    choices: ["Seoul", "Tokyo", "Busan", "Osaka", "Taipei", "Fukuoka", "Beijing"],
    credit: { author: "Matt Kieffer", license: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:N_Seoul_Tower_and_Raemian_Caelitus.jpg" }
  },
  {
    city: "Hong Kong",
    image: "images/08-hongkong.jpg",
    fact: "Red public minibuses and signboards stacked storey upon storey up a Mong Kok street.",
    choices: ["Hong Kong", "Singapore", "Shenzhen", "Macau", "Guangzhou", "Taipei", "Kuala Lumpur"],
    credit: { author: "David Kernan", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Red_Minibuses_and_Urban_Density_Mong_Kok_Hong_Kong.jpg" }
  },
  {
    city: "Valletta",
    image: "images/09-valletta.jpg",
    fact: "Enclosed wooden balconies — gallarija — painted green, white and blue on honey-coloured limestone. Malta's answer to the bay window.",
    choices: ["Valletta", "Mdina", "Catania", "Palermo", "Naples", "Split", "Cagliari"],
    credit: { author: "Oren Rozen", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Malta_230915_Valletta_05.jpg" }
  },
  {
    city: "Havana",
    image: "images/10-havana.jpg",
    fact: "Peeling colonial arcades, pastel paint, and a 1950s car still running down the middle of the street.",
    choices: ["Havana", "Santo Domingo", "San Juan", "Cartagena", "Mérida", "Veracruz", "Panama City"],
    credit: { author: "Eva Blue evablue", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Vintage_car_driving_in_Centro_Havana_(Unsplash).jpg" }
  },
  {
    city: "Hanoi",
    image: "images/11-hanoi.jpg",
    fact: "Shophouses barely three metres wide, motorbikes three deep, and a canopy of cables overhead.",
    choices: ["Hanoi", "Ho Chi Minh City", "Bangkok", "Phnom Penh", "Vientiane", "Yangon", "Kuala Lumpur"],
    credit: { author: "Richard Mortel from Riyadh, Saudi Arabia", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Old_Quarter_street_scene,_Hanoi_(7)_(24624495318).jpg" }
  },
  {
    city: "Marrakesh",
    image: "images/12-marrakesh.jpg",
    fact: "A covered souk in half-light: cedar beams, brass trays, leather and indigo djellabas.",
    choices: ["Marrakesh", "Fez", "Tunis", "Algiers", "Cairo", "Damascus", "Tangier"],
    credit: { author: "Dan Lundberg", license: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Souks_Marrakesh.jpeg" }
  },
  {
    city: "Naples",
    image: "images/13-naples.jpg",
    fact: "Terracotta roofs packed to the horizon, domes everywhere, and one dead-straight street cut through the middle of it.",
    choices: ["Naples", "Palermo", "Genoa", "Rome", "Bari", "Catania", "Marseille"],
    credit: { author: "DimiTalen", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:View_of_Spaccanapoli_and_the_Centro_Direzionale_from_Castel_Sant%27Elmo,_Naples,_2010.jpg" }
  },
  {
    city: "Rotterdam",
    image: "images/14-rotterdam.jpg",
    fact: "Almost nothing here is older than 1945, so the skyline is glass towers, rooftop walkways and bright plastic.",
    choices: ["Rotterdam", "Amsterdam", "Antwerp", "Hamburg", "Copenhagen", "The Hague", "Bremen"],
    credit: { author: "Spinarak", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Rotterdam_Rooftop_Walk_2022_with_World_Trade_Center_in_the_Background.jpg" }
  },
  {
    city: "Bergen",
    image: "images/15-bergen.jpg",
    fact: "Wooden houses in white, red and ochre, packed onto a hillside above a harbour, with a mountain behind.",
    choices: ["Bergen", "Oslo", "Trondheim", "Stavanger", "Reykjavík", "Gothenburg", "Aberdeen"],
    credit: { author: "AnneCN from Bergen, Norway", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Rooftops_in_Bergen_(3451274960).jpg" }
  },
  {
    city: "Cairo",
    image: "images/16-cairo.jpg",
    fact: "A sea of flat roofs and satellite dishes in the haze, with a thousand minarets poking through it.",
    choices: ["Cairo", "Alexandria", "Damascus", "Amman", "Baghdad", "Casablanca", "Tunis"],
    credit: { author: "Vyacheslav Argenberg", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Egypt,_Cairo,_Panorama_of_Islamic_Cairo,_also_Medieval_Cairo_or_Fatimid_Cairo.jpg" }
  }
];
