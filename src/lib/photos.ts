import type {ImageMetadata} from 'astro';

/**
 * All photos come from The Duck Pond's own Facebook page and live in
 * src/assets/photos, so Astro can resize them and serve WebP at build time.
 * Alt text lives here so every use of a photo is described the same way.
 */
const files = import.meta.glob<{default: ImageMetadata}>('../assets/photos/*.jpg', {eager: true});

export const alts = {
  'lapa-deck-fairy-lights': 'Wooden lapa deck at The Duckpond lit with fairy lights in the evening',
  'white-ducks-on-the-pond': 'White ducks swimming across the pond at The Duckpond',
  'sunset-pond-reflection': 'Pink sunset reflected in the duck pond with the lapas glowing along the water',
  'sunset-over-the-duck-pond': 'Sunset over the duck pond with a thatched venue lit up on the water’s edge',
  'conference-centre-function-tables': 'Round function tables with white linen and floral centrepieces in the conference centre',
  'garden-wedding-ceremony': 'Garden wedding ceremony set up on the lawn with white chairs and a floral arch',
  'garden-wedding-aisle': 'White wedding aisle and chairs on the green lawn under a blue sky',
  'baby-shower-decor-chair': 'Baby shower décor with a white arched backdrop and a velvet throne chair',
  'wedding-reception-hall': 'Wedding reception hall with chandeliers, draped ceiling and round tables',
  'outdoor-wedding-guests': 'Guests seated at an outdoor wedding ceremony on the lawn',
  'reception-table-setting': 'Reception table set with gold chargers, glassware and flowers',
  'inn-double-room': 'Double room at The Duckpond Inn with crisp white linen and cushions',
  'draped-function-marquee': 'Function venue draped in white with fairy lights and set tables',
  'garden-ceremony-red-carpet': 'Red carpet leading to a garden ceremony set-up on the lawn',
  'reception-hall-draping-lights': 'Reception hall with white draping, string lights and round tables',
  'function-hall-tables': 'Function hall with rattan chairs, white linen and floral centrepieces',
  'flyer-weekday-special': 'The Duckpond Weekday Special flyer: 50% off venue hire Monday to Thursday',
  'gender-reveal-balloon-wall': 'Gender reveal party with a pink and blue balloon wall',
  'bridal-table-floral': 'Bridal table with gold chairs, roses and greenery',
  'first-birthday-balloon-decor': 'First birthday party décor with blue balloons and a hot-air balloon theme',
  'long-table-pond-view': 'Long celebration table with gold chairs and white flowers beside the pond',
  'birthday-celebration-balloons': 'Birthday celebration with gold, black and pink balloons',
  'flyer-duckpond-inn': 'The Duckpond Inn flyer with nightly room rates',
  'flyer-spring-venues': 'The Duckpond spring flyer with venue hire prices',
  'flyer-braai-day': 'The Duckpond National Braai Day flyer',
  'flyer-braai-day-prices': 'The Duckpond venue hire prices and capacities flyer',
  'kzn-safety-and-gear-sign': 'KZN Safety and Gear sign at The Duck Pond on the R102',
  'indoor-play-area': 'Covered indoor play area with slides, swings and a wooden jungle gym',
  'kzn-safety-and-gear-store': 'KZN Safety and Gear store front at The Duck Pond',
  'curry-corner-sign': 'Curry Corner sign: authentic Indian flavours',
  'sitting-duck-shisa-nyama-car-wash-sign': 'Signs for The Sitting Duck, the Shisa Nyama and the Duckpond Car Wash price list',
  'flyer-fishing': 'Fishing at The Duckpond flyer: R40 per rod entry',
  'inn-guest-lounge': 'Guest lounge at The Duckpond Inn with sofas and a coffee table',
  'inn-queen-room-en-suite': 'Queen room at The Duckpond Inn with an en-suite bathroom and vanity mirror',
  'inn-twin-room': 'Twin room at The Duckpond Inn with two single beds',
  'outdoor-jungle-gym': 'Outdoor wooden jungle gym with slides on a wide green lawn',
  'inn-double-room-green': 'Double room at The Duckpond Inn with a green throw and folded towels',
  'ducks-on-the-pond-at-dusk': 'Ducks on the pond at dusk, silhouetted against the evening sky',
  'inn-balcony-dining-table': 'Balcony dining table with views over the green hills',
  'outdoor-play-lawn': 'Children’s outdoor play area on the lawn on a sunny day',
  'housekeeping-team': 'Duckpond Inn housekeeping team preparing a guest room',
  'indoor-play-area-wide': 'Wide view of the covered indoor play area with slides and swings',
  'inn-room-balcony-view': 'Inn room with a balcony door looking out over the countryside',
  'guests-on-the-balcony': 'Guests relaxing around a table on the Inn balcony',
} as const;

export type PhotoName = keyof typeof alts;

export function photo(name: PhotoName): ImageMetadata {
  const m = files[`../assets/photos/${name}.jpg`];
  if (!m) throw new Error(`Missing photo: ${name}`);
  return m.default;
}

export const pic = (name: PhotoName) => ({src: photo(name), alt: alts[name]});
