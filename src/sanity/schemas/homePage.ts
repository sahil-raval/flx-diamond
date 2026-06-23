import { defineType, defineField } from "sanity";

// homePage.ts — adds all fields missing from the previous schema.
// Fields already present (seo, heroHeading, heroSubtext, heroCta,
// heroSecondaryCta, marqueeItems, featuredDiamonds*, faqs, ctaSection*)
// are kept exactly as-is. Only new fields are added.

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "seo",        title: "SEO"                  },
    { name: "hero",       title: "Hero"                 },
    { name: "trust",      title: "Trust Strip & Logos"  },
    { name: "qualifier",  title: "Qualifier"            },
    { name: "fourCs",     title: "4 C's"                },
    { name: "iftfl",      title: "IF→FL Conversion"     },
    { name: "services",   title: "Services"             },
    { name: "process",    title: "Manufacturing Story"  },
    { name: "inventory",  title: "Featured Inventory"   },
    { name: "why",        title: "Why FLX"              },
    { name: "trade",      title: "Trade Portal"         },
    { name: "investment", title: "Investment"           },
    { name: "social",     title: "Testimonials"         },
    { name: "nopitch",    title: "No-Pitch CTA"         },
    { name: "faq",        title: "FAQ"                  },
    { name: "closing",    title: "Closing Panorama"     },
  ],
  fields: [

    // ─── SEO (existing) ──────────────────────────────────────────────────────
    defineField({
      name: "seo", title: "SEO", type: "object", group: "seo",
      fields: [
        { name: "title",       type: "string", title: "Page Title" },
        { name: "description", type: "text",   title: "Meta Description", rows: 3 },
      ],
    }),

    // ─── HERO ────────────────────────────────────────────────────────────────
    defineField({
      name: "heroOverline", title: "Hero Overline", type: "string", group: "hero",
      description: "Small line above the heading. e.g. 'Geelong, Victoria, Australia · Est. 1978'",
      initialValue: "Geelong, Victoria, Australia · Est. 1978",
    }),
    defineField({
      name: "heroHeading", title: "Hero Heading", type: "string", group: "hero",
      initialValue: "The Stone Begins Here.",
    }),
    defineField({
      name: "heroSubtext", title: "Hero Subtext", type: "text", rows: 2, group: "hero",
      initialValue: "B2B diamond sourcing & IF→FL precision conversion. Natural, lab-grown, and custom — every stone GIA-certified.",
    }),
    defineField({
      name: "heroCta", title: "Hero CTA Label", type: "string", group: "hero",
      initialValue: "Source Diamonds",
    }),
    defineField({
      name: "heroCtaLink", title: "Hero CTA Link", type: "string", group: "hero",
      initialValue: "/diamonds",
    }),
    defineField({
      name: "heroSecondaryCta", title: "Hero Secondary CTA Label", type: "string", group: "hero",
      initialValue: "IF→FL Conversion",
    }),
    defineField({
      name: "heroSecondaryCtaLink", title: "Hero Secondary CTA Link", type: "string", group: "hero",
      initialValue: "/contact",
    }),
    defineField({
      name: "heroVideo", title: "Hero Background Video", type: "file", group: "hero",
      description: "Upload MP4 (4K or 1080p landscape). Replaces the hardcoded /hero-ocean-4k.mp4.",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "heroFallbackImage", title: "Hero Fallback Image", type: "image", group: "hero",
      description: "Shown while video loads or on low-power devices.",
      options: { hotspot: true },
    }),

    // ─── TRUST STRIP ─────────────────────────────────────────────────────────
    defineField({
      name: "trustStripItems", title: "Trust Strip Items", type: "array", group: "trust",
      description: "Items in the scrolling marquee below the hero. Replaces the legacy marqueeItems.",
      of: [{
        type: "object",
        fields: [
          { name: "text",        type: "string",  title: "Text" },
          { name: "showGiaLogo", type: "boolean", title: "Show GIA logo before this item?", initialValue: false },
        ],
        preview: { select: { title: "text" } },
      }],
      initialValue: [
        { text: "47 Years of Combined Expertise", showGiaLogo: false },
        { text: "GIA-Certified on Every Stone",   showGiaLogo: true  },
        { text: "B2B Trade Partners Only",         showGiaLogo: false },
        { text: "Geelong, Victoria, Australia",    showGiaLogo: false },
        { text: "IF→FL Precision Conversion",      showGiaLogo: false },
        { text: "Natural & Lab-Grown Diamonds",    showGiaLogo: false },
      ],
    }),
    // Legacy — keep so existing published docs don't lose data
    defineField({
      name: "marqueeItems", title: "Marquee Items (legacy)", type: "array", group: "trust",
      of: [{ type: "string" }],
      hidden: true,
    }),

    // ─── CLIENT LOGO STRIP ───────────────────────────────────────────────────
    defineField({
      name: "clientLogos", title: "Client Logo Strip", type: "array", group: "trust",
      description: "Partner names shown below the marquee. Upload a logo or leave blank to show the name as text.",
      of: [{
        type: "object",
        fields: [
          { name: "name", type: "string", title: "Company Name" },
          { name: "sub",  type: "string", title: "Sub-line (e.g. Jaipur · Dubai · Hong Kong)" },
          { name: "logo", type: "image",  title: "Logo Image (optional)" },
        ],
        preview: { select: { title: "name", subtitle: "sub" } },
      }],
      initialValue: [
        { name: "KGK Diamond",     sub: "Jaipur · Dubai · Hong Kong" },
        { name: "Venus Jewellery", sub: "Mumbai · Antwerp"            },
        { name: "Excell Overseas", sub: "Surat · Singapore"           },
      ],
    }),

    // ─── QUALIFIER ───────────────────────────────────────────────────────────
    defineField({ name: "qualifierOverline", title: "Qualifier Overline", type: "string", group: "qualifier", initialValue: "Find Your Answer" }),
    defineField({ name: "qualifierHeading",  title: "Qualifier Heading",  type: "string", group: "qualifier", initialValue: "What brings you here today?" }),
    defineField({ name: "qualifierSubtext",  title: "Qualifier Subtext",  type: "string", group: "qualifier", initialValue: "Select the situation that matches yours. We'll give you the exact answer." }),
    defineField({
      name: "qualifierCards", title: "Qualifier Cards", type: "array", group: "qualifier",
      of: [{
        type: "object",
        fields: [
          { name: "id",       type: "string", title: "ID (unique, e.g. upgrade)" },
          { name: "num",      type: "string", title: "Display Number (e.g. 01)" },
          { name: "headline", type: "string", title: "Card Headline" },
          { name: "subtext",  type: "text",   title: "Card Subtext", rows: 2 },
          {
            name: "answer", type: "object", title: "Answer Panel",
            fields: [
              { name: "title",  type: "string", title: "Answer Title" },
              { name: "points", type: "array",  title: "Bullet Points", of: [{ type: "string" }] },
              { name: "cta",    type: "string", title: "CTA Button Label" },
              { name: "href",   type: "string", title: "CTA Link" },
            ],
          },
        ],
        preview: { select: { title: "headline", subtitle: "num" } },
      }],
      initialValue: [
        { id: "upgrade", num: "01", headline: "I hold IF diamonds I want to upgrade", subtext: "Your GIA certificate may reveal a path to Flawless grade, same carat weight, measurable value uplift.", answer: { title: "Yes, this is precisely what we do.", points: ["Send us your GIA certificate number. We read the comments for surface-characteristic indicators.", "If the stone qualifies, our master craftsman precision-regrounds in micro-millimeters.", "The stone is resubmitted to GIA. FL grade achieved. Same carat weight bracket documented.", "Most partners see measurable value uplift without changing their inventory volume."], cta: "Discuss Your Stones", href: "/contact" } },
        { id: "supply",  num: "02", headline: "I need a reliable diamond supplier", subtext: "Natural and lab-grown, GIA certified, trade pricing. No retail. Sourced through 47 years of trusted relationships.", answer: { title: "We supply serious trade buyers, not retail.", points: ["Natural diamonds: D–K colour, VVS1–SI2 clarity, 0.30ct to 10ct+.", "Lab-grown: high-precision CVD and HPHT at competitive trade pricing.", "Pricing on application. No public catalogue, by design.", "47 years of relationships with cutters in Antwerp, Mumbai, and Surat."], cta: "Request Trade Access", href: "/trade" } },
        { id: "invest",  num: "03", headline: "I want investment-grade diamonds", subtext: "FL and IF clarity with complete GIA documentation. The IF→FL conversion creates a documented, verifiable uplift.", answer: { title: "Diamonds are tangible, portable, stateless assets.", points: ["FL and IF in D–F colour represent the top 1% of all GIA-graded stones globally.", "The IF→FL conversion creates a new GIA certificate with documented uplift.", "We advise on stone selection, market timing, and re-sale pathways.", "All stones carry full GIA certification, the global standard."], cta: "Explore Investment Stones", href: "/investment" } },
        { id: "partner", num: "04", headline: "I want a B2B partnership", subtext: "We operate as the quiet expert behind serious businesses, offering white-label sourcing with guaranteed discretion.", answer: { title: "We are the specialist behind your sourcing.", points: ["White-label sourcing: we find and verify, you present to your clients.", "IF→FL conversion offered on your client's existing stones.", "Trusted by KGK Diamond, Venus Jewellery, and Excell Overseas.", "All agreements under NDA by default. Discretion is not negotiable."], cta: "Discuss a Partnership", href: "/contact" } },
      ],
    }),

    // ─── 4 C'S ───────────────────────────────────────────────────────────────
    defineField({ name: "fourCsOverline",    title: "4 C's Overline",     type: "string", group: "fourCs", initialValue: "The 4 C's" }),
    defineField({ name: "fourCsHeading",     title: "4 C's Heading",      type: "string", group: "fourCs", initialValue: "Every stone judged by the same uncompromising criteria." }),
    defineField({ name: "fourCsVideoUrl",    title: "4 C's YouTube URL",  type: "url",    group: "fourCs", initialValue: "https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&controls=1" }),
    defineField({ name: "fourCsVideoCaption",title: "4 C's Video Caption",type: "text",   group: "fourCs", rows: 2, initialValue: "FLX Diamond sources natural and lab-grown stones graded to the highest standards — assessed across all four criteria before any stone is offered to a trade partner." }),
    defineField({
      name: "fourCsItems", title: "4 C's Cards", type: "array", group: "fourCs",
      description: "Icons are assigned by position in code: 1→Carat, 2→Color, 3→Clarity, 4→Cut",
      of: [{
        type: "object",
        fields: [
          { name: "title", type: "string", title: "Title" },
          { name: "body",  type: "text",   title: "Description", rows: 3 },
        ],
        preview: { select: { title: "title" } },
      }],
      initialValue: [
        { title: "Carat",   body: "The measure of a diamond's weight — 1 carat equals 0.2 grams. FLX supplies from 0.30ct melee through 10ct+ statement stones, sourced to exact brief." },
        { title: "Color",   body: "Graded D (colorless) through Z. We source primarily D–J range through 47 years of trusted cutter relationships in Antwerp, Mumbai and Surat." },
        { title: "Clarity", body: "FL and IF represent the pinnacle. Our proprietary IF→FL regrinding technique moves stones up this scale — documented by a new GIA Flawless certificate." },
        { title: "Cut",     body: "Determines brilliance, fire and scintillation. Excellent and Ideal cut grades are our benchmark — every stone assessed for maximum light performance." },
      ],
    }),

    // ─── IF→FL ───────────────────────────────────────────────────────────────
    defineField({ name: "iftflOverline",       title: "IF→FL Overline",        type: "string", group: "iftfl", initialValue: "IF→FL Conversion" }),
    defineField({ name: "iftflHeading",        title: "IF→FL Heading",         type: "string", group: "iftfl", initialValue: "Unlock hidden value in your IF stone." }),
    defineField({ name: "iftflBody",           title: "IF→FL Body",            type: "text",   group: "iftfl", rows: 3, initialValue: "When a GIA certificate notes specific surface characteristics on an Internally Flawless stone, there is often a viable path to Flawless grade — without leaving the same carat weight bracket." }),
    defineField({
      name: "iftflSteps", title: "IF→FL Process Steps", type: "array", group: "iftfl",
      of: [{
        type: "object",
        fields: [
          { name: "n",     type: "string", title: "Step Number (e.g. 01)" },
          { name: "label", type: "string", title: "Step Label" },
          { name: "body",  type: "text",   title: "Step Description", rows: 3 },
          { name: "tag",   type: "string", title: "Tag Line" },
        ],
        preview: { select: { title: "label", subtitle: "n" } },
      }],
      initialValue: [
        { n: "01", label: "GIA Cert Review",  tag: "No cost · 24h turnaround",  body: "Send the GIA certificate number. We read the comments for removable surface characteristic indicators. Roughly 15–20% of IF stones qualify." },
        { n: "02", label: "Feasibility",       tag: "Written assessment",         body: "We assess whether the characteristic is safely removable without touching carat weight. A clear yes or no — no ambiguity, no obligation." },
        { n: "03", label: "Craftsmanship",     tag: "47 years of judgment",       body: "Babu Vekariya executes a precision micro-regrind under 0.01mm. Hours per stone, no automation, no margin for error." },
        { n: "04", label: "Result",            tag: "New GIA FL certificate",     body: "The stone is resubmitted to GIA independently. A new FL certificate is issued — verifiable, permanent, globally recognised." },
      ],
    }),
    defineField({ name: "iftflCalloutHeading", title: "IF→FL 50/50 Callout Heading", type: "string", group: "iftfl", initialValue: "We only earn when you earn — 50/50 profit split." }),
    defineField({ name: "iftflCalloutBody",    title: "IF→FL 50/50 Callout Body",    type: "text",   group: "iftfl", rows: 3, initialValue: "No upfront cost. No conversion fee. We calculate the IF value, the projected FL value, document it in writing, then share the profit we create together. If we can't do it, we'll tell you that before touching the stone." }),
    defineField({ name: "iftflFootnote",       title: "IF→FL Footnote",              type: "string", group: "iftfl", initialValue: "Ask us about your stone's potential — assessment is always free." }),

    // ─── SERVICES ────────────────────────────────────────────────────────────
    defineField({ name: "servicesOverline", title: "Services Overline", type: "string", group: "services", initialValue: "Our Services" }),
    defineField({ name: "servicesHeading",  title: "Services Heading",  type: "string", group: "services", initialValue: "Three ways we work with you." }),
    defineField({
      name: "serviceCards", title: "Service Cards", type: "array", group: "services",
      of: [{
        type: "object",
        fields: [
          { name: "num",      type: "string", title: "Number (e.g. 01)" },
          { name: "title",    type: "string", title: "Service Title" },
          { name: "body",     type: "text",   title: "Description", rows: 3 },
          { name: "tags",     type: "array",  title: "Tags", of: [{ type: "string" }] },
          { name: "link",     type: "string", title: "Link Path" },
          { name: "linkText", type: "string", title: "Link Label" },
        ],
        preview: { select: { title: "title", subtitle: "num" } },
      }],
      initialValue: [
        { num: "01", title: "Diamond Sourcing",  body: "GIA-certified natural and lab-grown stones at trade pricing. Any shape, any size, any spec. No retail. Minimum order requirements apply.", tags: ["Natural", "Lab-Grown", "Melee"], link: "/diamonds", linkText: "View Diamond Inventory" },
        { num: "02", title: "IF→FL Conversion",  body: "Send any IF stone's GIA cert number. We analyse the comments, assess viability at no cost, and if the stone qualifies, execute the precision regrind. New GIA FL certificate issued.", tags: ["Assessment", "Regrinding", "New Certificate"], link: "/investment", linkText: "Learn About Conversion" },
        { num: "03", title: "B2B Advisory",      body: "White-label sourcing. Investment stone advisory. Custom specification briefs. Partnership structures for retailers, jewellers, private clients, and institutional buyers.", tags: ["White-Label", "Investment", "Bespoke"], link: "/trade", linkText: "Explore Partnership" },
      ],
    }),

    // ─── MANUFACTURING / PROCESS STORY ───────────────────────────────────────
    defineField({ name: "processOverline",    title: "Process Overline",    type: "string", group: "process", initialValue: "Our Process" }),
    defineField({ name: "processHeading",     title: "Process Heading",     type: "string", group: "process", initialValue: "We make them.\nWe don't just sell them." }),
    defineField({ name: "processBody",        title: "Process Body",        type: "text",   group: "process", rows: 3, initialValue: "Most diamond businesses source from wholesalers. We cut and polish in our own manufacturing lab. That's why we can stand behind every stone we sell — and offer services no retailer can." }),
    defineField({ name: "processVideoUrl",    title: "Process YouTube URL", type: "url",    group: "process", initialValue: "https://www.youtube.com/embed/pPMCz3DN7u4?autoplay=0&controls=1" }),
    defineField({ name: "processVideoCaption",title: "Process Video Caption",type: "string",group: "process", initialValue: "Manufacturing lab · Geelong, Victoria" }),
    defineField({
      name: "processStats", title: "Process Stat Tiles", type: "array", group: "process",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string", title: "Label (e.g. Factory direct)" },
          { name: "sub",   type: "string", title: "Sub-line (e.g. No middlemen)" },
        ],
        preview: { select: { title: "label" } },
      }],
      initialValue: [
        { label: "Factory direct", sub: "No middlemen"          },
        { label: "GIA / IGI",      sub: "Every stone certified" },
        { label: "Aus-wide",       sub: "Insured & tracked"     },
      ],
    }),

    // ─── FEATURED INVENTORY (existing fields kept + new label fields) ─────────
    defineField({ name: "featuredDiamondsSectionHeading", title: "Featured Diamonds Heading (legacy)", type: "string",  group: "inventory", initialValue: "Current inventory." }),
    defineField({ name: "featuredDiamondsSectionTagline", title: "Featured Diamonds Tagline (legacy)", type: "string",  group: "inventory", initialValue: "A Selection" }),
    defineField({ name: "featuredDiamondsSubtext",         title: "Featured Diamonds Subtext (legacy)", type: "text",   group: "inventory", rows: 2 }),
    defineField({ name: "featuredInventoryOverline",       title: "Featured Inventory Overline",       type: "string",  group: "inventory", initialValue: "By Application Only" }),
    defineField({ name: "featuredInventoryHeading",        title: "Featured Inventory Heading",        type: "string",  group: "inventory", initialValue: "Featured Inventory" }),
    defineField({ name: "featuredInventoryFootnote",       title: "Featured Inventory Footnote",       type: "string",  group: "inventory", initialValue: "Trade pricing disclosed by secure email · ABN verification required · All stones GIA-certified" }),

    // ─── WHY FLXDIAMONDS ─────────────────────────────────────────────────────
    defineField({ name: "whyOverline", title: "Why FLX Overline", type: "string", group: "why", initialValue: "Our Difference" }),
    defineField({ name: "whyHeading",  title: "Why FLX Heading",  type: "string", group: "why", initialValue: "Why FLXDIAMONDS." }),
    defineField({
      name: "whyCards", title: "Why FLX Cards", type: "array", group: "why",
      description: "Icons assigned in code by position: Expertise, Discretion, Custom Solutions, AI Precision",
      of: [{
        type: "object",
        fields: [
          { name: "title", type: "string", title: "Card Title" },
          { name: "body",  type: "text",   title: "Card Body", rows: 3 },
          { name: "tag",   type: "string", title: "Tag Line" },
        ],
        preview: { select: { title: "title" } },
      }],
      initialValue: [
        { title: "Expertise",        body: "47 years of diamond craftsmanship, from Surat to Geelong. Babu Vekariya's precision regrinding technique is the result of a lifetime dedicated to a single discipline.", tag: "Est. 1978" },
        { title: "Discretion",       body: "Every engagement is commercially confidential by default. NDAs available on request. Your clients, your stones, and your pricing structures remain yours alone.", tag: "NDA as standard" },
        { title: "Custom Solutions", body: "No off-the-shelf briefs. Every sourcing mandate is built to your exact specification — shape, carat, colour, clarity, and budget. No two engagements are the same.", tag: "Built to your brief" },
        { title: "AI Precision",     body: "Diamond grading analysis supported by AI-powered assessment tools. Human judgment refined over 47 years, combined with data-driven precision at every step.", tag: "Human + AI" },
      ],
    }),

    // ─── TRADE PORTAL ────────────────────────────────────────────────────────
    defineField({ name: "tradeOverline", title: "Trade Portal Overline", type: "string", group: "trade", initialValue: "Trade Portal" }),
    defineField({ name: "tradeHeading",  title: "Trade Portal Heading",  type: "string", group: "trade", initialValue: "Built for the trade." }),
    defineField({
      name: "tradePanels", title: "Trade Portal Panels", type: "array", group: "trade",
      of: [{
        type: "object",
        fields: [
          { name: "heading",    type: "string", title: "Panel Heading" },
          { name: "body",       type: "text",   title: "Panel Body", rows: 3 },
          { name: "ctaLabel",   type: "string", title: "CTA Label" },
          { name: "ctaLink",    type: "string", title: "CTA Link" },
          { name: "ctaVariant", type: "string", title: "CTA Style", options: { list: ["solid", "outline"] }, initialValue: "solid" },
        ],
        preview: { select: { title: "heading" } },
      }],
      initialValue: [
        { heading: "Jewellers and designers", body: "Melee sourcing, matched parcels, and memo requests. Register with your ABN — pricing always comes back to you personally by email. No retail pricing, no margins on top of margins.", ctaLabel: "Trade Enquiry →", ctaLink: "/trade", ctaVariant: "solid" },
        { heading: "How we work with jewellers", body: "If a retail customer mentions they're working with a jeweller, we loop that jeweller in rather than transact directly. Our customers without a jeweller stay ours to refer — once they have one, that relationship is theirs.", ctaLabel: "Create Trade Account →", ctaLink: "/trade", ctaVariant: "outline" },
      ],
    }),

    // ─── INVESTMENT ──────────────────────────────────────────────────────────
    defineField({ name: "investmentOverline",  title: "Investment Overline",  type: "string", group: "investment", initialValue: "Investment" }),
    defineField({ name: "investmentHeading",   title: "Investment Heading",   type: "string", group: "investment", initialValue: "Natural FL diamonds as a long-term asset." }),
    defineField({ name: "investmentBody",      title: "Investment Body",      type: "text",   group: "investment", rows: 3, initialValue: "Natural diamonds — particularly FL clarity in desirable cuts — have held and appreciated in value over time. We work with buyers who want a portable, certifiable hard asset outside the share market. Same honest conversation, no hype." }),
    defineField({ name: "investmentCtaLabel",  title: "Investment CTA Label", type: "string", group: "investment", initialValue: "Book a Consultation →" }),
    defineField({
      name: "investmentPoints", title: "Investment Numbered Points", type: "array", group: "investment",
      of: [{ type: "string" }],
      initialValue: [
        "FL and IF in D–F colour represent the top 1% of all GIA-graded stones globally.",
        "Tangible, portable, stateless — independent of any bank or financial system.",
        "The IF→FL conversion creates a new GIA certificate with fully documented and verifiable uplift.",
        "We advise on stone selection, market timing, and verified re-sale pathways. No salesmanship.",
      ],
    }),

    // ─── TESTIMONIALS ────────────────────────────────────────────────────────
    defineField({ name: "testimonialsOverline", title: "Testimonials Overline", type: "string", group: "social", initialValue: "From Our Partners" }),
    defineField({ name: "testimonialsHeading",  title: "Testimonials Heading",  type: "string", group: "social", initialValue: "What the trade says." }),
    defineField({
      name: "testimonials", title: "Testimonials", type: "array", group: "social",
      of: [{
        type: "object",
        fields: [
          { name: "quote",    type: "text",   title: "Quote",    rows: 3 },
          { name: "role",     type: "string", title: "Role (e.g. Senior Diamond Buyer)" },
          { name: "location", type: "string", title: "Location (e.g. Dubai)" },
        ],
        preview: { select: { title: "role", subtitle: "location" } },
      }],
      initialValue: [
        { quote: "Unlocked significant value from a 2.4ct IF stone we'd held for two years. The GIA FL certificate came back within the same carat bracket. Remarkable.", role: "Senior Diamond Buyer", location: "Dubai" },
        { quote: "We've used FLXDIAMONDS for white-label sourcing across three collections. Their discretion is absolute. Our clients never know the source, and the quality speaks for itself.", role: "Head of Procurement", location: "Mumbai" },
        { quote: "The assessment was free, the process was explained clearly, and the result exceeded expectations. For anyone holding IF stones, the conversation costs nothing.", role: "Private Investor", location: "Singapore" },
        { quote: "What impressed us most was the transparency — a clear yes or no on viability, no sales pressure, and a result that genuinely moved the value of our inventory.", role: "Jewellery Retailer", location: "Melbourne" },
      ],
    }),
    defineField({ name: "testimonialsFootnote", title: "Testimonials Footnote", type: "string", group: "social", initialValue: "All testimonials are anonymised by request. Full references available to verified trade partners." }),

    // ─── NO-PITCH CTA BAR ────────────────────────────────────────────────────
    defineField({ name: "noPitchHeading", title: "No-Pitch Heading", type: "string", group: "nopitch", initialValue: "No pitch. Just a conversation." }),
    defineField({ name: "noPitchBody",    title: "No-Pitch Body",    type: "string", group: "nopitch", initialValue: "Buying, upgrading, investing, or sourcing for trade — we're straightforward people. Start here." }),
    defineField({
      name: "noPitchCtaButtons", title: "CTA Buttons", type: "array", group: "nopitch",
      of: [{
        type: "object",
        fields: [
          { name: "label",   type: "string", title: "Button Label" },
          { name: "link",    type: "string", title: "Button Link" },
          { name: "variant", type: "string", title: "Style", options: { list: ["solid", "outline"] }, initialValue: "outline" },
        ],
        preview: { select: { title: "label" } },
      }],
      initialValue: [
        { label: "Browse Stones", link: "/diamonds", variant: "solid"   },
        { label: "Talk to Us",    link: "/contact",  variant: "outline" },
        { label: "Book a Call",   link: "/contact",  variant: "outline" },
        { label: "Trade Login",   link: "/trade",    variant: "outline" },
      ],
    }),

    // ─── FAQ ─────────────────────────────────────────────────────────────────
    defineField({ name: "faqOverline",  title: "FAQ Overline",  type: "string", group: "faq", initialValue: "Before You Reach Out" }),
    defineField({ name: "faqHeading",   title: "FAQ Heading",   type: "string", group: "faq", initialValue: "Common questions." }),
    defineField({ name: "faqCtaLabel",  title: "FAQ CTA Label", type: "string", group: "faq", initialValue: "Still have questions? Get in touch →" }),
    defineField({
      name: "faqs", title: "FAQs", type: "array", group: "faq",
      of: [{
        type: "object",
        fields: [
          { name: "q", type: "string", title: "Question" },
          { name: "a", type: "text",   title: "Answer", rows: 4 },
        ],
        preview: { select: { title: "q" } },
      }],
      initialValue: [
        { q: "Do you work with lab-grown diamonds?", a: "Yes. We supply both natural and lab-grown diamonds (CVD and HPHT) at competitive trade pricing. Lab-grown stones go through the same GIA grading process and are presented with full certification." },
        { q: "Is the IF→FL conversion process confidential?", a: "Absolutely. Every engagement is treated as commercially confidential by default. We do not disclose client details, stone specifications, or transaction structures to any third party. NDAs are available on request." },
        { q: "What carat sizes can you work with?", a: "We work primarily with stones from 0.50ct upward for IF→FL conversion. For diamond sourcing, we supply from 0.30ct melee through 10ct+ exceptional stones. Custom briefs welcome." },
        { q: "How long does the IF→FL conversion take?", a: "The free assessment typically takes 2–3 business days after receipt of the GIA certificate number. If the stone qualifies, the regrinding process itself takes 1–3 weeks depending on the stone's characteristics. A new GIA certificate is then issued, which takes an additional 2–4 weeks." },
        { q: "Do you work with retailers and jewellers directly?", a: "Yes, we operate as the quiet specialist behind serious businesses. We offer white-label sourcing and IF→FL conversion for retailers and jewellers who present our work under their own brand. Discretion is guaranteed." },
      ],
    }),
    // Legacy CTA section fields — keep for backward compat
    defineField({ name: "ctaSectionHeading", title: "CTA Section Heading (legacy)", type: "string", group: "faq", hidden: true }),
    defineField({ name: "ctaSectionBody",    title: "CTA Section Body (legacy)",    type: "text",   group: "faq", hidden: true }),

    // ─── CLOSING PANORAMA ────────────────────────────────────────────────────
    defineField({
      name: "closingImage", title: "Closing Background Image", type: "image", group: "closing",
      description: "Replaces the hardcoded /great-ocean-road_2.jpg. Wide landscape, min 2400px wide.",
      options: { hotspot: true },
    }),
    defineField({ name: "closingOverline",  title: "Closing Overline",  type: "string", group: "closing", initialValue: "Precision. Trust. Excellence." }),
    defineField({ name: "closingQuote",     title: "Closing Quote",     type: "text",   group: "closing", rows: 2, initialValue: '"The finest diamonds are not found.\nThey are understood."' }),
    defineField({ name: "closingCtaLabel",  title: "Closing CTA Label", type: "string", group: "closing", initialValue: "Begin the Conversation →" }),
    defineField({ name: "closingCtaLink",   title: "Closing CTA Link",  type: "string", group: "closing", initialValue: "/contact" }),

  ],

  preview: { prepare: () => ({ title: "Home Page" }) },
});