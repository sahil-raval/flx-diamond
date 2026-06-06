import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Service Number", type: "string", description: 'e.g. "01"' }),
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", title: "Display Title", type: "string", description: "Can include \\n for line breaks", validation: (Rule) => Rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Each item is a separate paragraph",
    }),
    defineField({
      name: "qualifies",
      title: "Who Qualifies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "delivers",
      title: "What We Deliver",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "turnaround",
      title: "Typical Turnaround",
      type: "string",
    }),
    defineField({
      name: "dark",
      title: "Dark Background",
      type: "boolean",
      initialValue: false,
      description: "Uses navy background instead of light",
    }),
    defineField({
      name: "signature",
      title: "Signature Service",
      type: "boolean",
      initialValue: false,
      description: "Marks as the house signature service",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 10,
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
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "label", subtitle: "number" },
    prepare({ title, subtitle }) {
      return { title: `${subtitle}. ${title}` };
    },
  },
});
