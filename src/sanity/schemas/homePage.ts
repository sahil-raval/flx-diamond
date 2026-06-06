import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Page Title" },
        { name: "description", type: "text", title: "Meta Description", rows: 3 },
      ],
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "The Stone Begins Here.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "GIA-certified sourcing and IF→FL conversion for the trade. Geelong, Australia.",
    }),
    defineField({
      name: "heroCta",
      title: "Hero CTA Label",
      type: "string",
      initialValue: "View Current Stock",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero Secondary CTA Label",
      type: "string",
      initialValue: "Begin the Conversation",
    }),
    defineField({
      name: "marqueeItems",
      title: "Marquee Text Items",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "GIA Certified",
        "IF → FL Conversion",
        "Natural & Lab Grown",
        "Trade Only",
        "47 Years Mastery",
        "Geelong, Australia",
        "Discreet & Confidential",
        "Precision Regrinding",
      ],
    }),
    defineField({
      name: "featuredDiamondsSectionHeading",
      title: "Featured Diamonds Section Heading",
      type: "string",
      initialValue: "Current inventory.",
    }),
    defineField({
      name: "featuredDiamondsSectionTagline",
      title: "Featured Diamonds Section Tagline",
      type: "string",
      initialValue: "A Selection",
    }),
    defineField({
      name: "featuredDiamondsSubtext",
      title: "Featured Diamonds Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "A curated selection of GIA-certified natural and lab-grown diamonds. All stones are available for immediate enquiry.",
    }),
    defineField({
      name: "faqs",
      title: "Home Page FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", type: "string", title: "Question" },
            { name: "a", type: "text", title: "Answer", rows: 4 },
          ],
          preview: { select: { title: "q" } },
        },
      ],
    }),
    defineField({
      name: "ctaSectionHeading",
      title: "CTA Section Heading",
      type: "string",
      initialValue: "Enquiries handled with discretion.",
    }),
    defineField({
      name: "ctaSectionBody",
      title: "CTA Section Body",
      type: "text",
      rows: 2,
      initialValue:
        "We work exclusively with established trade partners — jewellers, retailers, and serious investors. All enquiries are treated as commercially confidential.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
