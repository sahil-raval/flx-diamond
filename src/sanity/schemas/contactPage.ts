import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "Begin the conversation.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "All enquiries are handled personally and under strict commercial confidence. There is no sales team — just a direct conversation with people who know the subject.",
    }),
    defineField({
      name: "stats",
      title: "Key Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Stat Value (e.g. 47)" },
            { name: "label", type: "string", title: "Stat Label (e.g. Years Experience)" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "enquiryTypes",
      title: "Enquiry Types",
      type: "array",
      of: [{ type: "string" }],
      description: "Options shown in the enquiry type dropdown",
    }),
    defineField({
      name: "formConfirmationHeading",
      title: "Form Confirmation Heading",
      type: "string",
      initialValue: "Enquiry received.",
    }),
    defineField({
      name: "formConfirmationBody",
      title: "Form Confirmation Body",
      type: "text",
      rows: 2,
      initialValue:
        "Thank you for reaching out. We will review your message and respond within 1–2 business days under strict commercial confidence.",
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
    prepare: () => ({ title: "Contact Page" }),
  },
});
