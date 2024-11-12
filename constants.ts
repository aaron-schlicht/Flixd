import { Genre, Keyword, Service, WatchProvider } from "./types";

export const Colors = {
  background: "#15182D",
  primary: "#A3BBD3",
  secondary: "#252942",
};

export const getRatingColor = (rating: number) => {
  if (rating < 5) {
    return "#EE3535";
  } else if (rating < 7) {
    return "#EEA435";
  } else {
    return "#91EE35";
  }
};

export const MEDIUM_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500/";

export const Providers = [
  {
    provider_id: 8,
    provider_name: "Netflix",
    logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
  },
  {
    provider_id: 9,
    provider_name: "Prime Video",
    logo_path: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  },
  {
    provider_id: 337,
    provider_name: "Disney Plus",
    logo_path: "/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
  },
  {
    provider_id: 1899,
    provider_name: "Max",
    logo_path: "/6Q3ZYUNA9Hsgj6iWnVsw2gR5V6z.jpg",
  },
  {
    provider_id: 15,
    provider_name: "Hulu",
    logo_path: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
  },
  {
    provider_id: 386,
    provider_name: "Peacock",
    logo_path: "/8VCV78prwd9QzZnEm0ReO6bERDa.jpg",
  },
  {
    provider_id: 350,
    provider_name: "Apple TV Plus",
    logo_path: "/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
  },
  {
    provider_id: 531,
    provider_name: "Paramount Plus",
    logo_path: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
  },
  {
    provider_id: 526,
    provider_name: "AMC+",
    logo_path: "/xlonQMSmhtA2HHwK3JKF9ghx7M8.jpg",
  },
  {
    provider_id: 43,
    provider_name: "Starz",
    logo_path: "/eWp5LdR4p4uKL0wACBBXapDV2lB.jpg",
  },
  {
    provider_id: 37,
    provider_name: "Showtime",
    logo_path: "/4kL33LoKd99YFIaSOoOPMQOSw1A.jpg",
  },
  {
    provider_id: 73,
    provider_name: "Tubi TV",
    logo_path: "/w2TDH9TRI7pltf5LjN3vXzs7QbN.jpg",
  },
  {
    provider_id: 300,
    provider_name: "Pluto TV",
    logo_path: "/t6N57S17sdXRXmZDAkaGP0NHNG0.jpg",
  },
  {
    provider_id: 258,
    provider_name: "Criterion Channel",
    logo_path: "/scMgbnNpkzdvhhqlQV3EjmByBXF.jpg",
  },
  {
    provider_id: 191,
    provider_name: "Kanopy",
    logo_path: "/wbCleYwRFpUtWcNi7BLP3E1f6VI.jpg",
  },
];

export const MainProviders: Service[] = [
  {
    provider_id: 8,
    provider_name: "Netflix",
    logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
  },
  {
    provider_id: 9,
    provider_name: "Prime Video",
    logo_path: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  },
  {
    provider_id: 337,
    provider_name: "Disney Plus",
    logo_path: "/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
  },
  {
    provider_id: 1899,
    provider_name: "Max",
    logo_path: "/6Q3ZYUNA9Hsgj6iWnVsw2gR5V6z.jpg",
  },
  {
    provider_id: 15,
    provider_name: "Hulu",
    logo_path: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
  },
  {
    provider_id: 386,
    provider_name: "Peacock Premium",
    logo_path: "/8VCV78prwd9QzZnEm0ReO6bERDa.jpg",
  },
  {
    provider_id: 350,
    provider_name: "Apple TV Plus",
    logo_path: "/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
  },
  {
    provider_id: 531,
    provider_name: "Paramount Plus",
    logo_path: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
  },
  {
    provider_id: 526,
    provider_name: "AMC+",
    logo_path: "/xlonQMSmhtA2HHwK3JKF9ghx7M8.jpg",
  },
  {
    provider_id: 43,
    provider_name: "Starz",
    logo_path: "/eWp5LdR4p4uKL0wACBBXapDV2lB.jpg",
  },
  {
    provider_id: 37,
    provider_name: "Showtime",
    logo_path: "/4kL33LoKd99YFIaSOoOPMQOSw1A.jpg",
  },
  {
    provider_id: 73,
    provider_name: "Tubi TV",
    logo_path: "/w2TDH9TRI7pltf5LjN3vXzs7QbN.jpg",
  },
  {
    provider_id: 300,
    provider_name: "Pluto TV",
    logo_path: "/t6N57S17sdXRXmZDAkaGP0NHNG0.jpg",
  },
  {
    provider_id: 258,
    provider_name: "Criterion Channel",
    logo_path: "/scMgbnNpkzdvhhqlQV3EjmByBXF.jpg",
  },
  {
    provider_id: 191,
    provider_name: "Kanopy",
    logo_path: "/wbCleYwRFpUtWcNi7BLP3E1f6VI.jpg",
  },
  {
    logo_path: "/9BgaNQRMDvVlji1JBZi6tcfxpKx.jpg",
    provider_id: 257,
    provider_name: "fuboTV",
  },
  {
    logo_path: "/rMb93u1tBeErSYLv79zSTR07UdO.jpg",
    provider_id: 188,
    provider_name: "YouTube Premium",
  },
  {
    logo_path: "/iLjStQKQwzyxXJb3jyNpvDmW9mx.jpg",
    provider_id: 209,
    provider_name: "PBS",
  },
  {
    logo_path: "/m4KUe3UoTnLgN4g6txYMnBqeUI5.jpg",
    provider_id: 123,
    provider_name: "FXNow",
  },
  {
    logo_path: "/ctiRpS16dlaTXQBSsiFncMrgWmh.jpg",
    provider_id: 34,
    provider_name: "MGM Plus",
  },
  {
    logo_path: "/4cHGd32hhEHmFjDGJcjVEAwFQg0.jpg",
    provider_id: 211,
    provider_name: "Freeform",
  },
  {
    logo_path: "/vEtdiYRPRbDCp1Tcn3BEPF1Ni76.jpg",
    provider_id: 99,
    provider_name: "Shudder",
  },
  {
    logo_path: "/fj9Y8iIMFUC6952HwxbGixTQPb7.jpg",
    provider_id: 11,
    provider_name: "MUBI",
  },
];

export const imageBasePath = "https://image.tmdb.org/t/p/original/";

export const Genres: { [id: string]: Genre } = {
  28: {
    id: 28,
    name: "Action",
  },
  12: {
    id: 12,
    name: "Adventure",
  },
  16: {
    id: 16,
    name: "Animation",
  },
  35: {
    id: 35,
    name: "Comedy",
  },
  80: {
    id: 80,
    name: "Crime",
  },
  99: {
    id: 99,
    name: "Documentary",
  },
  18: {
    id: 18,
    name: "Drama",
  },
  14: {
    id: 14,
    name: "Fantasy",
  },
  36: {
    id: 36,
    name: "History",
  },
  27: {
    id: 27,
    name: "Horror",
  },
  9648: {
    id: 9648,
    name: "Mystery",
  },
  10749: {
    id: 10749,
    name: "Romance",
  },
  878: {
    id: 878,
    name: "Science Fiction",
  },
  53: {
    id: 53,
    name: "Thriller",
  },
  10752: {
    id: 10752,
    name: "War",
  },
  37: {
    id: 37,
    name: "Western",
  },
};

export const GenreIcons: { [key: number]: string } = {
  28: "⚔️",
  12: "🗺️",
  16: "✍️",
  35: "🤣",
  80: "💰",
  99: "🐘",
  18: "🎭",
  10751: "👨‍👩‍👧‍👦",
  14: "🏰",
  36: "📜",
  27: "👻",
  10402: "🎶",
  9648: "🔍",
  10749: "❤️",
  878: "👽",
  53: "💣",
  10752: "🪖",
  37: "🤠",
};

export const KeywordMap: { [genre: string]: Keyword[] } = {
  28: [
    {
      id: 9715,
      name: "superhero",
    },
    {
      id: 779,
      name: "martial arts",
    },
    {
      id: 10617,
      name: "disaster",
    },
    {
      id: 6149,
      name: "police",
    },
    {
      id: 162365,
      name: "military",
    },
    {
      id: 12371,
      name: "gunfight",
    },
    {
      id: 9748,
      name: "revenge",
    },
    {
      id: 3713,
      name: "chase",
    },
    {
      id: 1701,
      name: "hero",
    },
    {
      id: 470,
      name: "spy",
    },
    {
      id: 314730,
      name: "suspenseful",
    },
    {
      id: 9672,
      name: "based on true story",
    },
  ],
  12: [
    {
      id: 207372,
      name: "quest",
    },
    {
      id: 12988,
      name: "pirate",
    },
    {
      id: 1454,
      name: "treasure",
    },
    {
      id: 189092,
      name: "journey",
    },
    {
      id: 1701,
      name: "hero",
    },
    {
      id: 10084,
      name: "rescue",
    },
    {
      id: 9672,
      name: "based on true story",
    },
  ],
  16: [
    {
      id: 6513,
      name: "cartoon",
    },
    {
      id: 10121,
      name: "stop motion",
    },
    {
      id: 197065,
      name: "claymation",
    },
    {
      id: 210024,
      name: "anime",
    },
  ],
  35: [
    {
      id: 8201,
      name: "satire",
    },
    {
      id: 167541,
      name: "buddy comedy",
    },
    {
      id: 9253,
      name: "slapstick comedy",
    },
    {
      id: 10123,
      name: "dark comedy",
    },
    {
      id: 11800,
      name: "mockumentary",
    },
    {
      id: 7312,
      name: "road trip",
    },
    {
      id: 9755,
      name: "parody",
    },
    {
      id: 11860,
      name: "fish out of water",
    },
    {
      id: 10683,
      name: "coming of age",
    },
    {
      id: 6075,
      name: "sports",
    },
    {
      id: 9672,
      name: "based on true story",
    },
  ],
  80: [
    {
      id: 10051,
      name: "heist",
    },
    {
      id: 10391,
      name: "mafia",
    },
    {
      id: 10291,
      name: "organized crime",
    },
    {
      id: 9807,
      name: "film noir",
    },
    {
      id: 207268,
      name: "neo-noir",
    },
    {
      id: 5340,
      name: "investigation",
    },
    {
      id: 1568,
      name: "undercover",
    },
    {
      id: 3149,
      name: "gangster",
    },
    {
      id: 314730,
      name: "suspenseful",
    },
    {
      id: 703,
      name: "detective",
    },
    {
      id: 9672,
      name: "based on true story",
    },
  ],
  99: [
    {
      id: 272851,
      name: "environmental documentary",
    },
    {
      id: 161316,
      name: "social documentary",
    },
    {
      id: 239902,
      name: "political documentary",
    },
    {
      id: 195240,
      name: "investigative journalism",
    },
  ],
  18: [
    {
      id: 14534,
      name: "relationship",
    },
    {
      id: 15060,
      name: "period drama",
    },
    {
      id: 10614,
      name: "tragedy",
    },
    {
      id: 222517,
      name: "legal drama",
    },
    {
      id: 10683,
      name: "coming of age",
    },
    {
      id: 5565,
      name: "biography",
    },
    {
      id: 6075,
      name: "sports",
    },
    {
      id: 9672,
      name: "based on true story",
    },
  ],
  10751: [
    {
      id: 10683,
      name: "coming of age",
    },
    {
      id: 6075,
      name: "sports",
    },
    {
      id: 9672,
      name: "based on true story",
    },
    {
      id: 6513,
      name: "cartoon",
    },
    {
      id: 4344,
      name: "musical",
    },
  ],
  14: [
    {
      id: 2035,
      name: "mythology",
    },
    {
      id: 177912,
      name: "wizard",
    },
    {
      id: 234213,
      name: "sword and sorcery",
    },
    {
      id: 211227,
      name: "high fantasy",
    },
    {
      id: 177895,
      name: "dark fantasy",
    },
    {
      id: 3205,
      name: "fairy tale",
    },
  ],
  36: [
    {
      id: 12995,
      name: "historical fiction",
    },
    {
      id: 15060,
      name: "period drama",
    },
    {
      id: 282071,
      name: "biblical",
    },
    { id: 6917, name: "epic" },
    {
      id: 1405,
      name: "roman empire",
    },
  ],
  27: [
    {
      id: 6152,
      name: "supernatural",
    },
    {
      id: 10224,
      name: "haunting",
    },
    {
      id: 9853,
      name: "paranormal",
    },
    {
      id: 224636,
      name: "horror comedy",
    },
    {
      id: 314730,
      name: "suspenseful",
    },
    {
      id: 1299,
      name: "monster",
    },
    {
      id: 50009,
      name: "survival horror",
    },
    { id: 12339, name: "slasher" },
    { id: 3133, name: "vampire" },
    { id: 163053, name: "found footage" },
    { id: 162846, name: "ghost" },
    { id: 156174, name: "occult" },
    { id: 12377, name: "zombie" },
    { id: 6158, name: "cult" },
  ],
  10402: [
    {
      id: 4344,
      name: "musical",
    },
    {
      id: 4048,
      name: "musician",
    },
    {
      id: 18001,
      name: "rock band",
    },
  ],
  9648: [
    {
      id: 703,
      name: "detective",
    },
    {
      id: 12570,
      name: "whodunit",
    },
    {
      id: 207046,
      name: "murder mystery",
    },
    {
      id: 314730,
      name: "suspenseful",
    },
    {
      id: 9807,
      name: "film noir",
    },
    {
      id: 207268,
      name: "neo-noir",
    },
    {
      id: 12565,
      name: "psychological thriller",
    },
  ],
  10749: [
    {
      id: 9799,
      name: "romantic comedy",
    },
    {
      id: 128,
      name: "love triangle",
    },
    {
      id: 14534,
      name: "relationship",
    },
    {
      id: 15060,
      name: "period drama",
    },
    {
      id: 10614,
      name: "tragedy",
    },
    { id: 6917, name: "epic" },
  ],
  878: [
    {
      id: 161176,
      name: "space opera",
    },
    { id: 4565, name: "dystopia" },
    {
      id: 9951,
      name: "alien",
    },
    { id: 14544, name: "robot" },
    {
      id: 4379,
      name: "time travel",
    },
    {
      id: 1576,
      name: "technology",
    },
    { id: 310, name: "artificial intelligence (a.i.)" },
    { id: 12190, name: "cyberpunk" },
  ],
  53: [
    {
      id: 314730,
      name: "suspenseful",
    },
    {
      id: 12565,
      name: "psychological thriller",
    },
    {
      id: 314730,
      name: "suspenseful",
    },
    { id: 470, name: "spy" },
    {
      id: 10950,
      name: "shootout",
    },
    { id: 4776, name: "race against time" },
    {
      id: 9748,
      name: "revenge",
    },
    {
      id: 3713,
      name: "chase",
    },
  ],
  10752: [
    {
      id: 14643,
      name: "battle",
    },
    {
      id: 162365,
      name: "military",
    },
    {
      id: 195862,
      name: "naval warfare",
    },
    {
      id: 10237,
      name: "aerial combat",
    },
    {
      id: 9672,
      name: "based on true story",
    },
    { id: 6917, name: "epic" },
  ],
  37: [
    {
      id: 287603,
      name: "cowboys",
    },
    {
      id: 9454,
      name: "frontier",
    },
    {
      id: 156212,
      name: "spaghetti western",
    },
    { id: 1502, name: "marshal" },
    {
      id: 155573,
      name: "wild west",
    },
    { id: 9503, name: "outlaw" },
    { id: 6917, name: "epic" },
    {
      id: 10950,
      name: "shootout",
    },
  ],
};

export const Keywords = [
  {
    id: 9715,
    name: "superhero",
  },
  {
    id: 779,
    name: "martial arts",
  },
  {
    id: 10617,
    name: "disaster",
  },
  {
    id: 6149,
    name: "police",
  },
  {
    id: 162365,
    name: "military",
  },
  {
    id: 12371,
    name: "gunfight",
  },
  {
    id: 9748,
    name: "revenge",
  },
  {
    id: 3713,
    name: "chase",
  },
  {
    id: 470,
    name: "spy",
  },
  {
    id: 314730,
    name: "suspenseful",
  },
  {
    id: 9672,
    name: "based on true story",
  },
  {
    id: 207372,
    name: "quest",
  },
  {
    id: 12988,
    name: "pirate",
  },
  {
    id: 1454,
    name: "treasure",
  },
  {
    id: 189092,
    name: "journey",
  },
  {
    id: 1701,
    name: "hero",
  },
  {
    id: 10084,
    name: "rescue",
  },
  {
    id: 6513,
    name: "cartoon",
  },
  {
    id: 10121,
    name: "stop motion",
  },
  {
    id: 197065,
    name: "claymation",
  },
  {
    id: 210024,
    name: "anime",
  },
  {
    id: 8201,
    name: "satire",
  },
  {
    id: 167541,
    name: "buddy comedy",
  },
  {
    id: 9253,
    name: "slapstick comedy",
  },
  {
    id: 10123,
    name: "dark comedy",
  },
  {
    id: 11800,
    name: "mockumentary",
  },
  {
    id: 7312,
    name: "road trip",
  },
  {
    id: 9755,
    name: "parody",
  },
  {
    id: 11860,
    name: "fish out of water",
  },
  {
    id: 10683,
    name: "coming of age",
  },
  {
    id: 6075,
    name: "sports",
  },
  {
    id: 10051,
    name: "heist",
  },
  {
    id: 10391,
    name: "mafia",
  },
  {
    id: 10291,
    name: "organized crime",
  },
  {
    id: 9807,
    name: "film noir",
  },
  {
    id: 207268,
    name: "neo-noir",
  },
  {
    id: 5340,
    name: "investigation",
  },
  {
    id: 1568,
    name: "undercover",
  },
  {
    id: 3149,
    name: "gangster",
  },
  {
    id: 703,
    name: "detective",
  },
  {
    id: 272851,
    name: "environmental documentary",
  },
  {
    id: 161316,
    name: "social documentary",
  },
  {
    id: 239902,
    name: "political documentary",
  },
  {
    id: 195240,
    name: "investigative journalism",
  },
  {
    id: 14534,
    name: "relationship",
  },
  {
    id: 15060,
    name: "period drama",
  },
  {
    id: 10614,
    name: "tragedy",
  },
  {
    id: 222517,
    name: "legal drama",
  },
  {
    id: 5565,
    name: "biography",
  },
  {
    id: 4344,
    name: "musical",
  },
  {
    id: 2035,
    name: "mythology",
  },
  {
    id: 177912,
    name: "wizard",
  },
  {
    id: 234213,
    name: "sword and sorcery",
  },
  {
    id: 211227,
    name: "high fantasy",
  },
  {
    id: 177895,
    name: "dark fantasy",
  },
  {
    id: 3205,
    name: "fairy tale",
  },
  {
    id: 12995,
    name: "historical fiction",
  },
  {
    id: 282071,
    name: "biblical",
  },
  { id: 6917, name: "epic" },
  {
    id: 1405,
    name: "roman empire",
  },
  {
    id: 6152,
    name: "supernatural",
  },
  {
    id: 10224,
    name: "haunting",
  },
  {
    id: 9853,
    name: "paranormal",
  },
  {
    id: 224636,
    name: "horror comedy",
  },
  {
    id: 1299,
    name: "monster",
  },
  {
    id: 50009,
    name: "survival horror",
  },
  { id: 12339, name: "slasher" },
  { id: 3133, name: "vampire" },
  { id: 163053, name: "found footage" },
  { id: 162846, name: "ghost" },
  { id: 156174, name: "occult" },
  { id: 12377, name: "zombie" },
  { id: 6158, name: "cult" },
  {
    id: 4048,
    name: "musician",
  },
  {
    id: 18001,
    name: "rock band",
  },
  {
    id: 12570,
    name: "whodunit",
  },
  {
    id: 207046,
    name: "murder mystery",
  },
  {
    id: 12565,
    name: "psychological thriller",
  },
  {
    id: 9799,
    name: "romantic comedy",
  },
  {
    id: 128,
    name: "love triangle",
  },
  {
    id: 161176,
    name: "space opera",
  },
  { id: 4565, name: "dystopia" },
  {
    id: 9951,
    name: "alien",
  },
  { id: 14544, name: "robot" },
  {
    id: 4379,
    name: "time travel",
  },
  {
    id: 1576,
    name: "technology",
  },
  { id: 310, name: "artificial intelligence (a.i.)" },
  { id: 12190, name: "cyberpunk" },
  {
    id: 10950,
    name: "shootout",
  },
  { id: 4776, name: "race against time" },
  {
    id: 14643,
    name: "battle",
  },
  {
    id: 195862,
    name: "naval warfare",
  },
  {
    id: 10237,
    name: "aerial combat",
  },
  {
    id: 287603,
    name: "cowboys",
  },
  {
    id: 9454,
    name: "frontier",
  },
  {
    id: 156212,
    name: "spaghetti western",
  },
  { id: 1502, name: "marshal" },
  {
    id: 155573,
    name: "wild west",
  },
  { id: 9503, name: "outlaw" },
];
