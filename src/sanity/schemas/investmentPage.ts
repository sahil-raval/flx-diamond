import { defineType, defineField } from "sanity";

export default defineType({
  name: "investmentPage",
  title: "Investment Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      initialValue: "IF → FL Conversion",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "The rarest clarity grade. Achieved, not discovered.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "GIA Flawless diamonds are not found — they are made. Our precision IF→FL conversion service transforms internally flawless stones into the most valuable clarity grade GIA certifies.",
    }),
    defineField({
      name: "pillars",
      title: "Investment Pillars",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", title: "Description", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "processTagline",
      title: "Process Section Tagline",
      type: "string",
      initialValue: "The Process",
    }),
    defineField({
      name: "processHeading",
      title: "Process Section Heading",
      type: "string",
      initialValue: "From IF to Flawless.",
    }),
    defineField({
      name: "processSteps",
      title: "Process Flow Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "n", type: "string", title: "Step Number / Icon (e.g. 01, ?, FL)" },
            { name: "title", type: "string", title: "Step Title" },
            { name: "body", type: "text", title: "Step Description", rows: 3 },
            { name: "tag", type: "string", title: "Step Tag (small label)" },
            {
              name: "type",
              type: "string",
              title: "Node Type",
              options: { list: ["start", "node", "decision", "end"], layout: "radio" },
            },
          ],
          preview: { select: { title: "title", subtitle: "n" } },
        },
      ],
    }),
    defineField({
      name: "casestudiesTagline",
      title: "Case Studies Section Tagline",
      type: "string",
      initialValue: "Verified Results",
    }),
    defineField({
      name: "casestudiesHeading",
      title: "Case Studies Section Heading",
      type: "string",
      initialValue: "Real stones. Real results.",
    }),
    defineField({
      name: "casestudiesSubtext",
      title: "Case Studies Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "Each result below represents a completed conversion — IF to FL — with verified GIA certificates at both stages. Carat weight and proportions are unchanged.",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      initialValue: "Is your IF stone a candidate?",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body",
      type: "text",
      rows: 2,
      initialValue:
        "Send us the GIA certificate number. We will assess conversion viability and provide a written report — at no cost and with no obligation to proceed.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Page Title" },
        { name: "description", type: "text", title: "Meta Description", rows: 3 },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Investment Page" }),
  },
});
