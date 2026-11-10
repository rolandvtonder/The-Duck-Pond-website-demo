/**
 * Every business fact the site shows lives here, so a price or phone number
 * changes in one place. Sources: The Duck Pond's Facebook page and its own
 * flyers (Weekday Special, Duckpond Inn, Spring, Braai Day, Fishing) and
 * on-site signage, as of November 2026.
 */

export const site = {
  name: 'The Duckpond',
  legalName: 'The Duck Pond',
  tagline: 'Where families flock together',
  url: 'https://theduckpond.co.za',
  description:
    'The Duckpond is a family venue and guest inn on the R102 between Ballito and Tongaat, KwaZulu-Natal. Accommodation, venue hire for weddings, birthdays and conferences, a restaurant, fishing and kids play areas around a scenic duck pond.',
  address: {
    street: 'Greylands Road (R102)',
    area: 'Greylands, between Ballito and Tongaat',
    locality: 'Ballito',
    region: 'KwaZulu-Natal',
    postalCode: '4420',
    country: 'ZA',
    oneLine: 'R102, Greylands Road, between Ballito & Tongaat, KwaZulu-Natal',
  },
  mapQuery: 'The Duck Pond, Greylands Road, R102, Ballito',
  email: {bookings: 'bookings@theduckpond.co.za', accommodation: 'accommodation@theduckpond.co.za'},
  /** Main booking line; also used for the WhatsApp button. */
  phone: {display: '083 666 6565', tel: '+27836666565', whatsapp: '27836666565'},
  social: {
    facebook: 'https://www.facebook.com/theduckpondballito/',
    instagram: 'https://www.instagram.com/ballitoduckpond/',
  },
};

export const contacts = [
  {name: 'Ncami', role: 'Bookings & venue hire', display: '083 666 6565', tel: '+27836666565', wa: '27836666565'},
  {name: 'Thobe', role: 'Bookings & venue hire', display: '083 863 6014', tel: '+27838636014', wa: '27838636014'},
  {name: 'John', role: 'Bookings & venue hire', display: '083 666 6566', tel: '+27836666566', wa: '27836666566'},
  {name: 'Denny', role: 'The Duckpond Inn (accommodation)', display: '073 631 3045', tel: '+27736313045', wa: '27736313045'},
];

/** Venue hours from the Braai Day price list. */
export const hours = [
  {days: 'Friday & Saturday', time: '09:00 – 22:00', spec: {days: ['Friday', 'Saturday'], opens: '09:00', closes: '22:00'}},
  {days: 'Sunday to Thursday', time: '09:00 – 20:00', spec: {days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '20:00'}},
];

export type NavItem = {href: string; label: string; short?: string};

export const nav: NavItem[] = [
  {href: '/', label: 'Home'},
  {href: '/accommodation/', label: 'Accommodation', short: 'The Inn'},
  {href: '/venues/', label: 'Venues & events'},
  {href: '/restaurant/', label: 'Restaurant & food'},
  {href: '/fishing/', label: 'Fishing'},
  {href: '/kids-play/', label: 'Kids play'},
  {href: '/specials/', label: 'Specials'},
  {href: '/gallery/', label: 'Gallery'},
  {href: '/on-site-businesses/', label: 'On-site businesses'},
  {href: '/about/', label: 'About us'},
  {href: '/contact/', label: 'Contact'},
  {href: '/book/', label: 'Book now'},
];

export type Room = {id: string; name: string; sleeps: string; price: number; note: string};

export const rooms: Room[] = [
  {id: 'single', name: 'Single room', sleeps: '1 adult', price: 675, note: 'A quiet room for one, ideal for business trips and solo stays.'},
  {id: 'sharing', name: 'Sharing room', sleeps: '2 adults', price: 890, note: 'Double or twin set-up for couples, friends and colleagues.'},
  {id: 'family', name: 'Family room', sleeps: '4 adults & 2 kids', price: 2050, note: 'Room for the whole family under one roof.'},
  {id: 'six-sleeper', name: '6 Sleeper', sleeps: '6 guests', price: 2050, note: 'Space for six, ideal for wedding parties and groups.'},
];

export type Venue = {
  id: string;
  name: string;
  seats: number;
  price: number;
  weekday: number;
  note?: string;
};

/** Standard (weekend) price and the 50% Monday-to-Thursday special. */
export const venues: Venue[] = [
  {id: 'small-lapa-15', name: 'Small Lapa', seats: 15, price: 650, weekday: 325, note: 'Intimate thatched lapa for small family gatherings.'},
  {id: 'small-lapa-20', name: 'Small Lapa', seats: 20, price: 850, weekday: 425, note: 'A slightly larger lapa for birthdays and get-togethers.'},
  {id: 'kids-lapa', name: 'Kids Lapa', seats: 30, price: 1650, weekday: 825, note: 'Next to the play areas, made for children’s parties.'},
  {id: 'braai-shed', name: 'Braai Shed', seats: 50, price: 2250, weekday: 1125, note: 'Covered braai venue for big family days and team socials.'},
  {id: 'sams-tree-lapa', name: 'Sam’s Tree Lapa', seats: 50, price: 3250, weekday: 1625, note: 'Shaded lapa under the trees.'},
  {id: 'bar-shack', name: 'Bar Shack', seats: 70, price: 3500, weekday: 1750, note: 'Relaxed bar-style venue for parties and celebrations.'},
  {id: 'island-stage', name: 'Island Stage', seats: 80, price: 3250, weekday: 1625, note: 'Out on the water, for ceremonies, performances and parties.'},
  {
    id: 'wedding-conference-centre',
    name: 'Wedding / Conference Centre',
    seats: 100,
    price: 4500,
    weekday: 2250,
    note: 'Our largest hall. Includes the kitchen and double braai stand.',
  },
];

export const venueName = (v: Venue) => `${v.name} (${v.seats} seats)`;

export const weekdaySpecial = {
  from: '2026-08-01',
  to: '2026-11-30',
  label: '1 August – 30 November 2026',
  days: 'Monday to Thursday',
  terms: 'Only dates within this period can be booked. The special does not apply on public holidays. Terms and conditions apply, subject to availability.',
};

export const fishing = {price: 40, unit: 'per rod', species: ['Tilapia', 'Koi', 'The odd old largemouth bass']};

export const carWash = {
  phone: {display: '084 851 3708', tel: '+27848513708', wa: '27848513708'},
  prices: [
    {item: 'Wash & Go', car: 'R50', suv: 'R60'},
    {item: 'Vacuum only', car: 'R70', suv: 'R70'},
    {item: 'Full House', car: 'R80', suv: 'R100'},
  ],
  large: [
    {item: 'Horse box', price: 'R250'},
    {item: 'Truck engine only', price: 'R250'},
    {item: 'Truck, 4 ton & below', price: 'R300'},
    {item: 'Truck, above 4 ton', price: 'R400'},
    {item: 'Truck & trailer', price: 'R800'},
  ],
};

/** R4 500 style, with a non-breaking thousands space so prices never wrap. */
export const rand = (n: number) => `R${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;

/** WhatsApp link with a pre-filled message. */
export const waLink = (text: string, number = site.phone.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
