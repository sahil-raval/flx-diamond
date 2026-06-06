import { defineType, defineField } from "sanity";

export default defineType({
  name: "tradePage",
  title: "Trade Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      initialValue: "Trade Partners",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "For the trade only.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "We work exclusively with established diamond and jewellery trade professionals. Apply for a trade account to access our full inventory, trade pricing, and sourcing services.",
    }),
    defineField({
      name: "whoQualifies",
      title: "Who Qualifies",
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
      name: "whatWeOffer",
      title: "What We Offer",
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
      initialValue: "How to become a trade partner.",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", type: "string", title: "Step Number (e.g. 01)" },
            { name: "title", type: "string", title: "Step Title" },
            { name: "body", type: "text", title: "Step Description", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "step" } },
        },
      ],
    }),
    defineField({
      name: "formHeading",
      title: "Application Form Heading",
      type: "string",
      initialValue: "Apply for a trade account.",
    }),
    defineField({
      name: "formSubtext",
      title: "Application Form Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "All applications are reviewed personally. We will respond within 2 business days.",
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
    prepare: () => ({ title: "Trade Page" }),
  },
});
