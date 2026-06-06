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

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  seo,
  heroHeading,
  heroSubtext,
  heroCta,
  heroSecondaryCta,
  marqueeItems,
  featuredDiamondsSectionHeading,
  featuredDiamondsSectionTagline,
  featuredDiamondsSubtext,
  faqs,
  ctaSectionHeading,
  ctaSectionBody
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  craftsman,
  techniqueTagline,
  techniqueHeading,
  techniqueIntro,
  techniqueSteps,
  partnerships,
  pillars,
  ctaHeading,
  ctaBody
}`;

export const INVESTMENT_PAGE_QUERY = `*[_type == "investmentPage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  pillars,
  processTagline,
  processHeading,
  processSteps,
  casestudiesTagline,
  casestudiesHeading,
  casestudiesSubtext,
  ctaHeading,
  ctaBody
}`;

export const TRADE_PAGE_QUERY = `*[_type == "tradePage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  whoQualifies,
  whatWeOffer,
  processTagline,
  processHeading,
  processSteps,
  formHeading,
  formSubtext
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0]{
  seo,
  heroTagline,
  heroHeading,
  heroSubtext,
  stats,
  enquiryTypes,
  formConfirmationHeading,
  formConfirmationBody
}`;

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

export const JOURNAL_ARTICLES_QUERY = `*[_type == "journalArticle"] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  coverImage,
  featured
}`;

export const FEATURED_ARTICLE_QUERY = `*[_type == "journalArticle" && featured == true] | order(publishedAt desc)[0]{
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  coverImage,
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
  coverImage,
  seo
}`;

export const FAQ_CATEGORIES_QUERY = `*[_type == "faqCategory"] | order(order asc){
  _id,
  label,
  shortLabel,
  order,
  faqs
}`;

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
  signature
}`;

export const JEWELLERY_QUERY = `*[_type == "jewelleryCollection" && available != false] | order(order asc){
  _id,
  title,
  description,
  image,
  itemCount
}`;

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
