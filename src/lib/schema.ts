import {hours, rooms, site, venues, venueName} from '../data/site';

/**
 * Structured data (JSON-LD) so Google can show The Duckpond as a local
 * business with its address, hours, prices and FAQs. Every page includes the
 * business; pages add their own pieces (rooms, venues, FAQs, breadcrumbs).
 */

export const BUSINESS_ID = `${site.url}/#business`;

const address = {
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LodgingBusiness', 'EventVenue'],
    '@id': BUSINESS_ID,
    name: site.name,
    alternateName: [site.legalName, 'The Duckpond Inn', 'The Duck Pond Ballito'],
    slogan: site.tagline,
    description: site.description,
    url: `${site.url}/`,
    logo: `${site.url}/apple-touch-icon.png`,
    image: `${site.url}/og-image.jpg`,
    telephone: site.phone.tel,
    email: site.email.bookings,
    priceRange: 'R40 – R4 500',
    currenciesAccepted: 'ZAR',
    address,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    areaServed: ['Ballito', 'Tongaat', 'Salt Rock', 'Umhlali', 'Shakaskraal', 'KwaDukuza', 'Umhlanga', 'Durban North', 'KwaZulu-Natal North Coast'],
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.spec.days,
      opens: h.spec.opens,
      closes: h.spec.closes,
    })),
    amenityFeature: [
      'Scenic duck pond',
      'Indoor kids play area',
      'Outdoor kids play area',
      'Braai facilities',
      'On-site accommodation',
      'Restaurant',
      'Fishing',
      'Car wash',
    ].map((name) => ({'@type': 'LocationFeatureSpecification', name, value: true})),
    sameAs: [site.social.facebook, site.social.instagram],
  };
}

export function breadcrumbSchema(crumbs: {name: string; href: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href}`,
    })),
  };
}

export type Faq = {q: string; a: string};

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {'@type': 'Answer', text: f.a},
    })),
  };
}

export function roomsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${site.url}/accommodation/#inn`,
    name: 'The Duckpond Inn',
    url: `${site.url}/accommodation/`,
    parentOrganization: {'@id': BUSINESS_ID},
    address,
    telephone: '+27736313045',
    email: site.email.accommodation,
    priceRange: 'R675 – R2 050 per night',
    makesOffer: rooms.map((r) => ({
      '@type': 'Offer',
      name: `${r.name} (${r.sleeps})`,
      price: r.price,
      priceCurrency: 'ZAR',
      unitText: 'per night',
      itemOffered: {'@type': 'HotelRoom', name: r.name, occupancy: {'@type': 'QuantitativeValue', description: r.sleeps}},
    })),
  };
}

export function venuesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': `${site.url}/venues/#venues`,
    name: 'The Duckpond venues',
    url: `${site.url}/venues/`,
    parentOrganization: {'@id': BUSINESS_ID},
    address,
    maximumAttendeeCapacity: 100,
    containsPlace: venues.map((v) => ({
      '@type': 'EventVenue',
      name: venueName(v),
      maximumAttendeeCapacity: v.seats,
      description: v.note,
    })),
    makesOffer: venues.map((v) => ({
      '@type': 'Offer',
      name: `${venueName(v)} venue hire`,
      price: v.price,
      priceCurrency: 'ZAR',
    })),
  };
}

export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${site.url}/restaurant/#restaurant`,
    name: 'The Duckpond Restaurant',
    url: `${site.url}/restaurant/`,
    parentOrganization: {'@id': BUSINESS_ID},
    address,
    telephone: site.phone.tel,
    servesCuisine: ['South African', 'Braai', 'Traditional Zulu', 'Indian'],
  };
}
