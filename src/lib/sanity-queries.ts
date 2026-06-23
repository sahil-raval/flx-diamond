// sanity-queries.ts
// ─────────────────────────────────────────────────────────────────────────────
// Preserves all existing queries. Updated queries add image/video fields and
// the homepage sections that were previously 100% hardcoded.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  seoDescription,
  ogImage,
  email,
  phones,
  address,
  googleMapsUrl
}`;

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  seo,
  heroOverline,
  heroHeading,
  heroSubtext,
  heroCta,
  heroCtaLink,
  heroSecondaryCta,
  heroSecondaryCtaLink,
  "heroVideoUrl": heroVideo.asset->url,
  heroFallbackImage{ "url": asset->url, alt },
  trustStripItems[]{ text, showGiaLogo },
  marqueeItems,
  clientLogos[]{ name, sub, logo{ "url": asset->url, alt } },
  qualifierOverline,
  qualifierHeading,
  qualifierSubtext,
  qualifierCards[]{
    id, num, headline, subtext,
    answer{ title, points, cta, href }
  },
  fourCsOverline,
  fourCsHeading,
  fourCsVideoUrl,
  fourCsVideoCaption,
  fourCsItems[]{ title, body },
  iftflOverline,
  iftflHeading,
  iftflBody,
  iftflSteps[]{ n, label, body, tag },
  iftflCalloutHeading,
  iftflCalloutBody,
  iftflFootnote,
  servicesOverline,
  servicesHeading,
  serviceCards[]{ num, title, body, tags, link, linkText },
  processOverline,
  processHeading,
  processBody,
  processVideoUrl,
  processVideoCaption,
  processStats[]{ label, sub },
  featuredDiamondsSectionHeading,
  featuredDiamondsSectionTagline,
  featuredDiamondsSubtext,
  featuredInventoryOverline,
  featuredInventoryHeading,
  featuredInventoryFootnote,
  whyOverline,
  whyHeading,
  whyCards[]{ title, body, tag },
  tradeOverline,
  tradeHeading,
  tradePanels[]{ heading, body, ctaLabel, ctaLink, ctaVariant },
  investmentOverline,
  investmentHeading,
  investmentBody,
  investmentCtaLabel,
  investmentPoints,
  testimonialsOverline,
  testimonialsHeading,
  testimonials[]{ quote, role, location },
  testimonialsFootnote,
  noPitchHeading,
  noPitchBody,
  noPitchCtaButtons[]{ label, link, variant },
  faqOverline,
  faqHeading,
  faqCtaLabel,
  faqs[]{ q, a },
  ctaSectionHeading,
  ctaSectionBody,
  closingImage{ "url": asset->url, alt },
  closingOverline,
  closingQuote,
  closingCtaLabel,
  closingCtaLink,
}`;

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  heroImage{ "url": asset->url, alt },
  craftsman{
    name,
    tagline,
    bio,
    "imageUrl": image.asset->url,
    stats[]{ value, label }
  },
  techniqueTagline,
  techniqueHeading,
  techniqueIntro,
  techniqueSteps[]{ n, label, body, tag },
  techniqueVideoUrl,
  techniqueImage{ "url": asset->url, alt },
  partnerships[]{ name, location, "logoUrl": logo.asset->url },
  pillars[]{ title, body, icon },
  galleryImages[]{ "url": asset->url, alt },
  ctaHeading,
  ctaBody,
  ctaLabel,
  ctaLink,
}`;

// ─── INVESTMENT PAGE ──────────────────────────────────────────────────────────
export const INVESTMENT_PAGE_QUERY = `*[_type == "investmentPage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  heroImage{ "url": asset->url, alt },
  pillars[]{ title, body, tag },
  processTagline,
  processHeading,
  processIntro,
  processSteps[]{ n, label, body, tag },
  processVideoUrl,
  splitHeading,
  splitBody,
  casestudiesTagline,
  casestudiesHeading,
  casestudiesSubtext,
  ctaHeading,
  ctaBody,
  ctaLabel,
  ctaLink,
}`;

// ─── TRADE PAGE ───────────────────────────────────────────────────────────────
export const TRADE_PAGE_QUERY = `*[_type == "tradePage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  heroImage{ "url": asset->url, alt },
  whoQualifies[]{ title, body, points },
  whatWeOffer[]{ num, title, body, tags },
  processTagline,
  processHeading,
  processSteps[]{ n, label, body },
  partnerLogos[]{ name, sub, "logoUrl": logo.asset->url },
  formHeading,
  formSubtext,
  enquiryTypes,
}`;

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  email,
  phone,
  address,
  stats[]{ value, label },
  enquiryTypes,
  formHeading,
  formSubtext,
  formConfirmationHeading,
  formConfirmationBody,
  formSuccessMessage,
  sidebarBlocks[]{ heading, body },
}`;

// ─── DIAMONDS (unchanged) ─────────────────────────────────────────────────────
export const DIAMONDS_QUERY = `*[_type == "diamond" && available != false] | order(carat desc){
  _id,
  stockId,
  type,
  shape,
  carat,
  color,
  clarity,
  cut,
  polish,
  symmetry,
  fluorescence,
  measurements,
  certification,
  certificateNumber,
  "imageUrl": image.asset->url,
  featured
}`;

export const FEATURED_DIAMONDS_QUERY = `*[_type == "diamond" && featured == true && available != false][0...6] | order(carat desc){
  _id,
  stockId,
  type,
  shape,
  carat,
  color,
  clarity,
  cut,
  "imageUrl": image.asset->url,
  certification
}`;

// ─── JOURNAL ──────────────────────────────────────────────────────────────────
export const JOURNAL_ARTICLES_QUERY = `*[_type == "journalArticle"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  coverImage{ "url": asset->url, alt },
  featured
}`;

export const FEATURED_ARTICLE_QUERY = `*[_type == "journalArticle" && featured == true] | order(publishedAt desc)[0]{
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  coverImage{ "url": asset->url, alt },
  body
}`;

export const ARTICLE_BY_SLUG_QUERY = `*[_type == "journalArticle" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  body,
  coverImage{ "url": asset->url, alt },
  seo
}`;

// ─── FAQ CATEGORIES (unchanged) ───────────────────────────────────────────────
export const FAQ_CATEGORIES_QUERY = `*[_type == "faqCategory"] | order(order asc){
  _id,
  label,
  shortLabel,
  order,
  faqs
}`;

// ─── SERVICES (added imageUrl) ────────────────────────────────────────────────
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc){
  _id,
  number,
  label,
  title,
  tagline,
  body,
  qualifies,
  delivers,
  turnaround,
  dark,
  signature,
  "imageUrl": image.asset->url
}`;

// ─── JEWELLERY (resolved image URL) ──────────────────────────────────────────
export const JEWELLERY_QUERY = `*[_type == "jewelleryCollection" && available != false] | order(order asc){
  _id,
  title,
  description,
  image{ "url": asset->url, alt },
  itemCount
}`;

// ─── CONVERSION STONES (unchanged) ───────────────────────────────────────────
export const CONVERSION_STONES_QUERY = `*[_type == "conversionStone"] | order(order asc){
  _id,
  stoneId,
  carat,
  colour,
  cut,
  shape,
  before,
  after,
  uplift,
  weeks,
  removed
}`;