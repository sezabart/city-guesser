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
  },
  {
    city: "Reykjavík",
    image: "images/17-reykjavik.jpg",
    fact: "Corrugated steel painted in primary colours. There is no timber in Iceland and imports were always dear, so the houses are clad in galvanised sheet.",
    choices: ["Reykjavík", "Tromsø", "Tórshavn", "Nuuk", "Akureyri", "Ålesund", "Bodø"],
    credit: { author: "Christine Zenino from Chicago, US", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Reykjav%C3%ADk_(3841483984).jpg" }
  },
  {
    city: "Genoa",
    image: "images/18-genoa.jpg",
    fact: "The caruggi: alleys three metres wide in the old port town, the walls painted in bright plaster and fake columns to catch what little light gets down there.",
    choices: ["Genoa", "Naples", "Trieste", "Livorno", "Marseille", "Barcelona", "Palermo"],
    credit: { author: "Ralf Steinberger from Milan, Berlin + Munich, Italy + Germany", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Colourful_facade_in_the_old_town_of_Genova,_Italy_(25260951038).jpg" }
  },
  {
    city: "Kraków",
    image: "images/19-krakow.jpg",
    fact: "Steep attic roofs, copper spires and brick chimneys stacked up behind the market square, with the twin towers of the Mariacki church over the top of them.",
    choices: ["Kraków", "Lviv", "Warsaw", "Prague", "Wrocław", "Vilnius", "Poznań"],
    credit: { author: "J Doll", license: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Krakow_Rooftops_(140469463).jpeg" }
  },
  {
    city: "Bangkok",
    image: "images/20-bangkok.jpg",
    fact: "Concrete, glass towers and an elevated railway threaded between them. The city grew upward first and the Skytrain followed the money.",
    choices: ["Bangkok", "Jakarta", "Manila", "Kuala Lumpur", "Ho Chi Minh City", "Taipei", "Singapore"],
    credit: { author: "Vyacheslav Argenberg", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Bangkok_skyline,_BTS_Skytrain,_Bangkok,_Thailand.jpg" }
  },
  {
    city: "Taipei",
    image: "images/21-taipei.jpg",
    fact: "Boulevards with a scooter lane down each side, tiled apartment blocks, glass towers, and green hills closing off the end of every street.",
    choices: ["Taipei", "Kaohsiung", "Taichung", "Seoul", "Osaka", "Xiamen", "Hong Kong"],
    credit: { author: "Lord Koxinga", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:2010_07_22470_6992_Xinyi_District,_Taipei,_Buildings,_Streets_in_Taipei,_Taiwan.JPG" }
  },
  {
    city: "Mexico City",
    image: "images/22-mexicocity.jpg",
    fact: "Signs painted straight onto the walls — dance school, baldeadoras, lonchería — with graffiti sprayed over the top and a 1950s department store on the corner.",
    choices: ["Mexico City", "Guadalajara", "Puebla", "Bogotá", "Lima", "Buenos Aires", "Medellín"],
    credit: { author: "Keizers", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Ex-Salinas_y_Rocha_Dept_Store,_Roma_Norte,_Av._Insurgentes_Sur_171,_December_2014.jpg" }
  },
  {
    city: "Jerusalem",
    image: "images/23-jerusalem.jpg",
    fact: "Every wall, roof and dome is the same pale limestone — by law, new buildings have to be faced in it — so the whole city reads as one colour.",
    choices: ["Jerusalem", "Amman", "Safed", "Nablus", "Bethlehem", "Damascus", "Beirut"],
    credit: { author: "Maarten van der Bent", license: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Jerusalem_rooftops_(32213734996).jpg" }
  },
  {
    city: "Valparaíso",
    image: "images/24-valparaiso.jpg",
    fact: "Tin-clad houses painted in whatever colour was cheap, stacked up the hills above the container port, with staircases instead of streets between them.",
    choices: ["Valparaíso", "Viña del Mar", "Concepción", "Santiago", "Callao", "Guayaquil", "Cartagena"],
    credit: { author: "Alex Proimos from Sydney, Australia", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Coloured_Fronts_(3927272807).jpg" }
  },
  {
    city: "Zanzibar City",
    image: "images/25-zanzibar.jpg",
    fact: "Coral-rag walls washed white, carved Indian-style balconies, air-conditioning boxes and corrugated iron. The alleys of Stone Town are barely wide enough for a cart.",
    choices: ["Zanzibar City", "Mombasa", "Lamu", "Dar es Salaam", "Moroni", "Antananarivo", "Maputo"],
    credit: { author: "Timothy A. Gonsalves", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Narrow_Street_Stone_Town_Zanzibar_Oct26_A7CR_14422.jpg" }
  },
  {
    city: "Buenos Aires",
    image: "images/26-buenosaires.jpg",
    fact: "Colectivos nose-to-tail on a wide avenue of plane trees and 1970s apartment slabs — Avenida Cabildo, far out in Belgrano.",
    choices: ["Buenos Aires", "Montevideo", "Rosario", "Córdoba", "Santiago", "Lima", "Asunción"],
    credit: { author: "Lombardia1", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Cabildo_Avenue_in_Buenos_Aires.jpg" }
  },
  {
    city: "Montreal",
    image: "images/27-montreal.jpg",
    fact: "Brick triplexes with the staircase on the outside, twisting up to the second floor. Narrow lots and cheap ironwork made Montreal build its stairs where nobody else does.",
    choices: ["Montreal", "Quebec City", "Ottawa", "Toronto", "Boston", "Halifax", "Winnipeg"],
    credit: { author: "Andre Carrotflower", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:20181013_-_42_-_Montreal_(Plateau).jpg" }
  },
  {
    city: "Melbourne",
    image: "images/28-melbourne.jpg",
    fact: "Bluestone cobbles, wheelie bins and every wall repainted by someone new: Melbourne treats its laneways as a free gallery.",
    choices: ["Melbourne", "Sydney", "Auckland", "Wellington", "Adelaide", "Brisbane", "Perth"],
    credit: { author: "Bernard Spragg. NZ from Christchurch, New Zealand", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Hosier_Lane_Melbourne._(25242293926).jpg" }
  },
  {
    city: "Athens",
    image: "images/29-athens.jpg",
    fact: "Polykatoikia: concrete apartment blocks with a balcony on every floor, canvas awnings against the sun, and the top floor often left unfinished in case the family builds upward.",
    choices: ["Athens", "Thessaloniki", "Patras", "Pyraeus", "Heraklion", "Nicosia", "Izmir"],
    credit: { author: "macrolepis", license: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Kolonaki,_Athens_-_panoramio_-_macrolepis_(3).jpg" }
  },
  {
    city: "Moscow",
    image: "images/30-moscow.jpg",
    fact: "A courtyard in the old centre: a whitewashed brick wing with yellow gas pipes running along the wall, ventilation grilles, and cars on the asphalt by the door.",
    choices: ["Moscow", "Saint Petersburg", "Kyiv", "Minsk", "Kharkiv", "Nizhny Novgorod", "Kazan"],
    credit: { author: "Retired electrician", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Moscow,_B_Kharitonyevsky_14_yard_Aug_2024_10.jpg" }
  },
  {
    city: "Lisbon",
    image: "images/31-lisbon.jpg",
    fact: "Azulejo tiles across the whole facade. They keep the rain out and the summer sun off, and each street has its own pattern.",
    choices: ["Lisbon", "Porto", "Setubal", "Coimbra", "Aveiro", "Malaga", "Seville"],
    credit: { author: "NorbertNagel", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Azulejo_facade_in_Rua_de_S%C3%A3o_Bento_-_Lisbon_-_Portugal.jpg" }
  },
  {
    city: "Berlin",
    image: "images/32-berlin.jpg",
    fact: "Plattenbau: precast concrete slabs craned into place floor by floor, one balcony pattern repeated to the horizon, cars parked on the grass.",
    choices: ["Berlin", "Hamburg", "Leipzig", "Dresden", "Frankfurt", "Hanover", "Vienna"],
    credit: { author: "Sludge G", license: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Plattenbau,_Berlin_Friedrichsfelde._(5037290202).jpg" }
  },
  {
    city: "Riga",
    image: "images/33-riga.jpg",
    fact: "Art nouveau with every stop out: atlantes holding up the balconies, peacocks and sphinxes. A third of the old centre went up in about fifteen years before 1914.",
    choices: ["Riga", "Tallinn", "Vilnius", "Helsinki", "Saint Petersburg", "Gdansk", "Gothenburg"],
    credit: { author: "Scotch Mist", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Art_Nouveau_Riga_46.jpg" }
  },
  {
    city: "Bucharest",
    image: "images/34-bucharest.jpg",
    fact: "Panel blocks in six colours behind the tram wires: the same four-storey system-built walk-up repeated for kilometre after kilometre.",
    choices: ["Bucharest", "Cluj-Napoca", "Timisoara", "Sofia", "Belgrade", "Chisinau", "Skopje"],
    credit: { author: "Daniele Napolitano", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Colored_blocks_in_Bucharest_in_Pia%C8%9Ba_Eroii_Revolu%C8%9Biei.jpg" }
  },
  {
    city: "Bogota",
    image: "images/35-bogota.jpg",
    fact: "Red brick towers, brick paving, and a 3,000-metre green ridge closing the end of every street.",
    choices: ["Bogota", "Medellin", "Cali", "Quito", "Pereira", "Barranquilla", "Caracas"],
    credit: { author: "Felipe Restrepo Acosta", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Bogot%C3%A1_calle_52_oriente_de_la_ciudad,_Chapinero.jpg" }
  },
  {
    city: "Busan",
    image: "images/36-busan.jpg",
    fact: "Painted houses stacked up a hillside with staircases instead of streets, the port and the apartment towers below.",
    choices: ["Busan", "Incheon", "Daegu", "Ulsan", "Pohang", "Seoul", "Fukuoka"],
    credit: { author: "Sergiy Galyonkin", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Colorful_hillside_homes_in_Busan_(55618802222).jpg" }
  },
  {
    city: "Auckland",
    image: "images/37-auckland.jpg",
    fact: "Wooden villas with a veranda across the front, fretwork at the gable and a picket fence: the Auckland house, built in kauri and rimu.",
    choices: ["Auckland", "Wellington", "Christchurch", "Dunedin", "Hamilton", "Adelaide", "Hobart"],
    credit: { author: "DB Thats-Me", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Return_veranda_villa._c.1920_-_panoramio.jpg" }
  },
  {
    city: "Accra",
    image: "images/38-accra.jpg",
    fact: "Colonial-era arcades and balustraded flat roofs in ochre and yellow, with traders set up along the pavement of the old quarter.",
    choices: ["Accra", "Lagos", "Abidjan", "Lome", "Cotonou", "Kumasi", "Dakar"],
    credit: { author: "Matti Blume", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Jamestown,_Accra_(P1100265).jpg" }
  },
  {
    city: "Kolkata",
    image: "images/39-kolkata.jpg",
    fact: "Stucco over brick gone grey, awnings out to the kerb, shop signs stacked three storeys up and the whole street under a web of cable.",
    choices: ["Kolkata", "Mumbai", "Delhi", "Dhaka", "Patna", "Lucknow", "Colombo"],
    credit: { author: "Billjones94", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:The_New_Market_seen_from_far,_and_Kolkata_Municipal_Corporation_building_in_right,_in_Kolkata,_West_Bengal.jpg" }
  }
];
