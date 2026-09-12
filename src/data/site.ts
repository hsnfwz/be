/**
 * Single source of truth for restaurant details.
 * Rendered in the footer and, where verified, emitted as JSON-LD.
 */

/**
 * The address, phone and email below are still the placeholders that shipped
 * with the original build. While this is `true` they are rendered visually but
 * deliberately withheld from structured data — publishing a fake address as
 * machine-readable `LocalBusiness` data is worse for search than publishing
 * none, and can mismatch the real Google Business Profile.
 *
 * Replace the values, then set this to `false`.
 */
export const CONTACT_IS_PLACEHOLDER = true;

export const site = {
  name: 'bé by Benjam Papp',
  shortName: 'bé',
  chef: 'Benjam Papp',
  cuisine: 'Nordic-Asian',
  url: 'https://bebybenjampapp.vercel.app',
  description:
    'bé by Benjam Papp brings a unique Nordic-Asian fine dining concept to the heart of Vancouver.',
  // No longer linked in the footer; kept for the JSON-LD `sameAs` claim, which
  // ties the site to the restaurant's social profile for search engines.
  instagram: 'https://www.instagram.com/pappbenjam',

  hours: {
    open: 'SUN-SAT 10am-10pm',
    closed: 'Holidays',
  },

  // TODO: replace placeholders, then flip CONTACT_IS_PLACEHOLDER to false.
  address: {
    street: '1234 Main Street',
    locality: 'Vancouver',
    region: 'BC',
    postalCode: 'A1B 2C3',
    country: 'CA',
  },
  phone: '604.123.4567',
  phoneHref: '+16041234567',
  email: 'be@restaurant.com',
} as const;

export const formattedAddress = [
  site.address.street,
  site.address.locality,
  site.address.region,
  site.address.postalCode,
].join(', ');
