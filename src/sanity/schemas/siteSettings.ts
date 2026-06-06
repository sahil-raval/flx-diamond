import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "FLX Diamonds",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Precision Sourcing & IF→FL Conversion",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      initialValue:
        "FLX Diamonds specialises in GIA-certified diamond sourcing and precision IF→FL conversion. Trade-only. Based in Geelong, Australia.",
    }),
    defineField({
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      initialValue: "info@flxdiamond.com",
    }),
    defineField({
      name: "phones",
      title: "Phone Numbers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Number" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      initialValue: [
        { label: "Australia", value: "0474 817 548" },
        { label: "India", value: "+91 99982 17496" },
      ],
    }),
    defineField({
      name: "address",
      title: "Business Address",
      type: "string",
      initialValue: "Geelong, VIC, Australia",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "siteName" },
  },
});
