import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { csvImportPlugin } from "./src/sanity/plugins/csvImports";
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string) || "production";

export default defineConfig({
  projectId: projectId || "placeholder",
  dataset: dataset,
  title: "FLX Diamonds CMS",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document().schemaType("aboutPage").documentId("aboutPage")
              ),
            S.listItem()
              .title("Investment Page")
              .id("investmentPage")
              .child(
                S.document().schemaType("investmentPage").documentId("investmentPage")
              ),
            S.listItem()
              .title("Trade Page")
              .id("tradePage")
              .child(
                S.document().schemaType("tradePage").documentId("tradePage")
              ),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .child(
                S.document().schemaType("contactPage").documentId("contactPage")
              ),
            S.divider(),
            S.documentTypeListItem("diamond").title("Diamonds"),
            S.documentTypeListItem("journalArticle").title("Journal Articles"),
            S.documentTypeListItem("faqCategory").title("FAQ Categories"),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("conversionStone").title("IF→FL Case Studies"),
            S.documentTypeListItem("jewelleryCollection").title(
              "Jewellery Collections"
            ),
          ]),
    }),
    visionTool(),
    csvImportPlugin(),
  ],
  schema: {
    types: schemaTypes,
  },
});
