// scripts/seed-sanity.ts
//
// One-time migration script — reads all existing projects from src/data/projects.ts
// and uploads them to Sanity so you can edit everything from the Studio.
//
// HOW TO RUN (after npm install is complete):
//   npx tsx scripts/seed-sanity.ts
//
// This script is safe to re-run: it uses createOrReplace(), so it won't create
// duplicates. Running it again just overwrites with the same data.
//
// After seeding, you can discard projects.ts — Sanity is the source of truth.

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local so we can read Sanity credentials
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

// ── Sanity client (write access) ──────────────────────────────
// useCdn: false — we need the live API endpoint for writes, not the cache
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_TOKEN,
  useCdn:    false,
})

// ── Helper: convert plain text to Portable Text ───────────────
// Sanity stores rich text as an array of "block" objects.
// Plain text paragraphs (separated by blank lines) become separate blocks.
// This is the simplest format that @portabletext/react can render.
function toPortableText(text: string) {
  return text
    .split(/\n\n+/)               // split on blank lines
    .map((paragraph, index) => ({
      _type: 'block',
      _key:  `block_${index}`,
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key:  `span_${index}_0`,
          text:  paragraph.trim(),
          marks: [],
        },
      ],
      markDefs: [],
    }))
    .filter((block) => block.children[0].text.length > 0) // skip empty blocks
}

// ── All existing projects ─────────────────────────────────────
// Copied directly from src/data/projects.ts.
// Note: image paths (/images/...) are kept as-is.
// Sanity won't host these local images, but they'll still show up
// from /public — you can upload proper images via Studio later.

const projects = [
  {
    id: 'duke-energy-badge-access',
    title: 'Badge Access Center',
    client: 'Duke Energy',
    description: 'Redesigned an internal enterprise tool used by nearly 40,000 employees to manage physical badge access across facilities. Reduced task completion time significantly through simplified workflows and clearer navigation.',
    tags: ['Enterprise UX', 'User Research', 'Information Architecture'],
    year: '2024',
    featured: true,
    imageSrc: '/images/bac_badgerequest_01-copy-370x370.png',
    imageAlt: 'Duke Energy Badge Access Center interface',
    role: 'Lead UX Designer',
    overview: `The Badge Access Center is a crucial tool used by nearly 40,000 employees and around 10 super users to request badges and manage access to facilities. The existing system had significant usability issues, leading to confusion and inefficiencies. I was tasked with redesigning the platform to improve the user experience, streamline workflows, and enhance overall functionality.`,
    challenge: `The existing Badge Access Center was outdated, with a cluttered interface and poor navigation that frustrated users, particularly the super users who manage badge approvals. Our goal was to create a more intuitive and efficient platform that meets the needs of all users while improving the approval process for super users.`,
    process: `To understand the needs of our users, I conducted market research, competitive analysis, and in-depth user research sessions. I interviewed both general users and super users to gather insights into their challenges and needs. Key findings included the need for a simplified request process, better visibility of request statuses, and enhanced filtering options for super users.

Based on the research, I mapped out new user flows that streamlined the badge request process. I developed wireframes to visualize these flows and tested them with users to ensure they addressed the identified pain points. With the wireframes validated, I moved on to creating medium-fidelity screens focused on clear navigation, simplified workflows, and an accessible design language that caters to both general employees and super users. This stage involved iterative testing and feedback loops with key stakeholders.`,
    outcome: `The redesign has been well-received in initial feedback sessions, with users reporting a more intuitive and efficient experience. We are now preparing for a broader rollout and will continue to gather feedback to refine the platform further. Future plans include enhancing the analytics dashboard for super users and exploring integrations with other company tools.

This project reinforced the importance of user research in identifying critical pain points and validating design decisions. Collaborating closely with super users allowed us to tailor solutions that genuinely meet their needs.`,
  },
  {
    id: 'integrations-marketplace',
    title: 'Integrations Marketplace',
    client: 'Network Optix',
    description: 'Designed a dark mode version of an enterprise integrations marketplace, synthesizing market research and stakeholder input into a compelling, well-informed design solution.',
    tags: ['Product Design', 'B2B SaaS', 'Systems Design'],
    year: '2023',
    featured: true,
    imageSrc: '/images/Integrations-All-370x370.png',
    imageAlt: 'Integrations marketplace interface showing available connectors',
    role: 'Senior Product Designer',
    overview: `I had the opportunity to work on a design test for Network Optix, where I was tasked with designing a dark mode version of an existing integration marketplace. Although this project didn't involve formal user research, I leveraged market research and conversations with company stakeholders to create a well-informed design solution.`,
    process: `To tackle this challenge, I followed a thorough design process that encompassed several key steps:

Understanding the Context: I delved into the company's objectives, target audience, and market trends through in-depth market research. This step allowed me to grasp the bigger picture and identify opportunities for a strategic design approach.

Collaboration: I engaged in meaningful discussions within Network Optix. By tapping into their insights and domain expertise, I gained valuable perspectives that informed the direction of the design.

Conceptualization and Iteration: With a solid foundation of information, I embarked on the design journey, exploring various concepts and iterating on them. I ensured that each iteration aligned with the company's vision and goals.

Visual Design and Presentation: The final design solution was brought to life through meticulous attention to visual design elements, creating a compelling and engaging visual representation that effectively communicated the intended message.`,
    outcome: `Although no formal user research was conducted due to the nature of the project, the design test showcased my ability to synthesize information from multiple sources and translate it into a thoughtful design. The resulting solution not only met the project's objectives but also demonstrated my dedication to delivering impactful design work.`,
  },
  {
    id: 'pay-tv-app-ux',
    title: 'Elevating Pay TV UX',
    client: 'MobiTV',
    description: 'Led UX for a next-generation app-based TV experience, spanning mobile, tablet, and living-room form factors. Shipped across multiple carrier partners globally.',
    tags: ['Streaming UX', 'Mobile', 'Multi-platform'],
    year: '2021',
    featured: true,
    imageSrc: '/images/AndroidTV-screen-2-1-370x370.png',
    imageAlt: 'Android TV app-based pay TV experience',
    role: 'Senior Visual Design Manager & UX',
    overview: `In 2015, I played a pivotal role at MobiTV in developing a groundbreaking streaming Pay TV service, ushering operators from around the globe into the realm of app-based television. By leaving behind the outdated and burdensome set-top boxes, the Pay TV service revolutionized user experiences, placing customers at the forefront of this exciting new territory.

As the Senior Visual Design Manager and UX specialist, I led a talented team consisting of two product designers and a skilled UX engineer. Collaborating closely with designers, engineering, and our product team, I provided valuable feedback and ideas that drove the project's success. My passion for UX extended to donning my UX engineering hat, assuming sole responsibility for UI development work within Android Studio.

Our relentless pursuit of excellence, fueled by continuous user feedback and a focus on business and client needs, drove the app's evolution. The dynamic nature of this project, with multiple stakeholders both internal and external, did not hinder our efforts to craft an intuitive user interface that catered to both older, legacy customers and the younger generation.

The user flow and experience were thoughtfully replicated across various platforms, including Android TV, Fire TV, tvOS, and Roku. This project remains a testament to our commitment to delivering exceptional user experiences and staying at the forefront of the streaming television industry.`,
  },
  {
    id: 'duke-energy-gis-audit',
    title: 'GIS UX Audit & User Research',
    client: 'Duke Energy',
    description: 'Conducted a comprehensive UX audit for an internal GIS application, presenting actionable findings to key stakeholders and demonstrating the measurable value of UX investment.',
    tags: ['UX Audit', 'User Research', 'Enterprise'],
    year: '2023',
    featured: false,
    imageSrc: '/images/argus-ux_audit_02-370x370.png',
    imageAlt: 'GIS UX audit findings and user research documentation',
    overview: `I was tasked with conducting a UX audit for an upcoming internal GIS application. The objective was to demonstrate the power and value of enhancing the UX, and provide them actionable feedback they could immediately start to roll into their product.

I engaged in in-depth discussions with users from diverse roles, addressing their primary challenges and exploring their usage patterns within the application. My findings were then presented to the key stakeholders and decision-makers for the product. They were extremely happy with my findings and feedback, and are looking forward to engaging our internal UX team more formally.`,
  },
  {
    id: 'duke-energy-internal-apps',
    title: 'Internal Applications & Enterprise Software',
    client: 'Duke Energy',
    description: 'Drove the full UX lifecycle (research, ideation, and execution) for a suite of internal productivity tools across the Duke Energy enterprise.',
    tags: ['Enterprise UX', 'Design Systems'],
    year: '2023',
    featured: false,
    imageSrc: '/images/duke_morecast_charts_02-370x370.png',
    imageAlt: 'Duke Energy internal application dashboard',
    role: 'Senior UX Designer',
    overview: `As a Senior UX Designer at Duke Energy, I'm driven by crafting seamless, user-centric experiences for our internal applications. From research, to ideation and execution, I'm fully immersed in the entire UX journey.

Understanding user needs is at the core of my work. Through collaborative research, I empathize with their goals and pain points, translating insights into thoughtful wireframes. User groups and feedback sessions are vital to ensuring our apps meet user needs. I thrive on facilitating these sessions and making iterative improvements based on invaluable input.

Collaborating with developers, I ensure smooth implementation, resulting in applications that truly resonate with users. Contributing to Duke Energy's mission of reliable, sustainable energy solutions fills me with immense pride, driving me to push the boundaries of exceptional UX design.`,
  },
  {
    id: 'tv-ux-desktop',
    title: 'TV UX: Desktop Concept',
    client: 'Personal Project',
    description: 'Envisioned and designed a desktop TV client for macOS, rethinking the conventional 10-foot interface for a 2-foot, cursor-driven context.',
    tags: ['Concept', 'Desktop UI', 'Streaming'],
    year: '2023',
    featured: false,
    imageSrc: '/images/cspiretv_macos_02-2-370x370.png',
    imageAlt: 'TV UX desktop concept on macOS',
    overview: `As a passionate macOS user, I envisioned and designed C Spire TV's desktop client with a focus on seamless integration, visual appeal, and user delight. Every aspect of this project, from concept to execution, reflects my dedication to crafting meaningful user experiences.

Through iterative refinement and user feedback, I ensured the interface exceeded expectations and resonated with potential users. This personal project showcases my passion for UX design and creating remarkable digital interactions.`,
  },
  {
    id: 'sitemap-flow-ia',
    title: 'Site Map / Flow: Internal Tool',
    client: 'Duke Energy',
    description: "Revamped an internal tool's user flow and hierarchy, applying a \"3 click rule\" to restructure the sitemap and improve overall navigation and usability.",
    tags: ['IA', 'Flows', 'Enterprise'],
    year: '2023',
    featured: false,
    imageSrc: '/images/usermap-370x370.jpg',
    imageAlt: 'Information architecture site map and user flow diagram',
    overview: `Revamped an internal tool's user flow and hierarchy, adhering to a '3 click rule' to enhance user experience. Prioritizing seamless navigation, I restructured the sitemap, improving overall usability.`,
  },
  {
    id: 'tv-ux-side-menu',
    title: 'TV UX: Side Menu Concept',
    client: 'Personal Project',
    description: "Reimagined C Spire TV's navigation with a side menu pattern, plus a dedicated kids' interface with larger icons and a word-free design.",
    tags: ['Streaming UX', 'Navigation', 'Concept'],
    year: '2021',
    featured: false,
    imageSrc: '/images/featured-1-370x370.png',
    imageAlt: 'TV side menu navigation concept',
    overview: `Immersing myself in the world of app-based TV streaming solutions, I embarked on an exciting journey to revolutionize C Spire TV's user interface. While the legacy top and bottom menus have served their purpose, I saw an opportunity to enhance the user experience by adopting the trending side menu approach.

With careful consideration of our users' preferences, I reimagined the app's navigation, introducing a sleek side menu that provided effortless access to all essential features. Seamlessly integrating recently watched and favorite channels into this menu allowed users to quickly discover and enjoy their preferred content.

In addition to the primary redesign, I undertook the challenge of creating a version tailored specifically for kids, using a blend of creativity and usability to craft a playful interface featuring larger icons and a word-free design. This child-friendly edition empowered young users to explore their favorite shows and movies independently.

Throughout this process, I embraced iterative design principles, incorporating valuable feedback and user insights to optimize the final outcomes.`,
  },
  {
    id: 'pay-tv-mobile',
    title: 'App-Based Pay TV: Mobile UX',
    client: 'MobiTV',
    description: 'Led the full mobile UX for a carrier-grade streaming TV app, covering home, guide, browse, and detail screens across iPhone and Android.',
    tags: ['Mobile UX', 'Streaming', 'iOS / Android'],
    year: '2021',
    featured: false,
    imageSrc: '/images/iPhone-6.5-screen-0-1-370x370.png',
    imageAlt: 'Pay TV mobile app on iPhone',
    role: 'Senior Visual Design Manager & UX',
    overview: `In 2015, I had the privilege of leading an innovative project as the Senior Visual Design Manager and UX at MobiTV. We embarked on the ambitious mission of revolutionizing the television experience by creating a streaming Pay TV service that transitioned operators from conventional set-top boxes to the world of app-based television.

As a key player in this venture, I managed a talented team of two product designers and a skilled UX engineer. Collaborating closely with engineering and product teams, as well as stakeholders across the company, I provided invaluable feedback and ideas that shaped the project's direction. Taking on a hands-on role, I exclusively handled UI development work within Android Studio, pushing the boundaries of what was possible and delivering a cutting-edge user experience.

The app's journey was an evolving one, driven by user feedback, business insights, and client requirements. Despite catering to multiple stakeholders both internal and external, we succeeded in crafting an intuitive user interface that catered to the diverse needs of our customers, from legacy users to the younger generation.

The home, guide, browse, and detail screens showcase the seamless user flow and experiences thoughtfully replicated across both iPhone and Android platforms.`,
  },
  {
    id: 'live-tv-portrait',
    title: 'Live TV: Portrait / TikTok Concept',
    client: 'XUMO',
    description: 'Designed a portrait-orientation live TV experience during a design sprint, inspired by TikTok and Instagram Reels, using pre-fetched streams to minimize buffering.',
    tags: ['Concept', 'Mobile', 'Streaming'],
    year: '2021',
    featured: false,
    imageSrc: '/images/featured2-370x370.png',
    imageAlt: 'Portrait-orientation live TV concept',
    overview: `Assigned with the exciting task of reimagining a Live TV interface, I collaborated closely with a Product Manager during a design sprint, drawing inspiration from TikTok and Instagram Reels to envision a more contemporary portrait format.

Through intense brainstorming and meticulous requirement gathering, we developed a compelling mock-up that aimed to deliver a buffer-free, snappy user experience. To achieve this, we introduced pre-fetched video streams at lower bitrates above and below the main focus, minimizing buffering and maximizing performance.

Taking into account engineering constraints during phase 1 implementation, we made adjustments from the initial concept. Additionally, we recognized contractual obligations from advertisers, particularly in consideration of XUMO's business model reliant on ad revenue. The result is an interface that optimizes the user experience while respecting the practicalities of development and contractual considerations.`,
  },
  {
    id: 'highlight-markers',
    title: 'Highlight Markers: TV Concept',
    client: 'MobiTV',
    description: 'Designed a system of navigable markers in a TV scrub bar, surfacing highlights and key moments within live streams to enrich the viewing experience.',
    tags: ['Concept', 'TV UX', 'Sports'],
    year: '2021',
    featured: false,
    imageSrc: '/images/tvconcept6-370x370.png',
    imageAlt: 'TV highlight markers concept in the guide timeline',
    overview: `Assigned with the exciting challenge of devising a concept for navigable markers in a TV scrub bar, I collaborated closely with a product manager to craft a compelling solution. Our main goal was to highlight content within a live stream, enhancing the user experience and making navigation more intuitive.

Through productive discussions and brainstorming sessions, we meticulously defined the details and explored various features to include. Our focus was on understanding the requirements and dependencies necessary to bring this concept to life, including determining the source of metadata for the markers and identifying the best methods to display them seamlessly.

This collaborative effort allowed us to lay a solid foundation for the concept, making sure all essential aspects were considered. Our concept for navigable markers in the TV scrub bar aims to enrich the viewers' experience, enabling them to discover and engage with highlighted content effortlessly.`,
  },
  {
    id: 'pay-tv-mobile-concepts',
    title: 'Pay TV Mobile Concepts',
    client: 'MobiTV',
    description: "Early explorations and concept work for MobiTV's app-based Pay TV service, pushing the boundaries of what the mobile TV experience could be.",
    tags: ['Concepts', 'Mobile', 'Streaming'],
    year: '2021',
    featured: false,
    imageSrc: '/images/cspiretv_mobile_home-3-370x370.png',
    imageAlt: 'Pay TV mobile home screen concepts',
    overview: `In 2016, I played a pivotal role in MobiTV's groundbreaking project: a streaming Pay TV service that revolutionized the television industry. Working tirelessly, we embarked on a mission to transition operators from traditional, hard-to-maintain set-top boxes to the cutting-edge world of app-based television.

Our vision was clear: empower customers with seamless and modern user experiences that pushed the boundaries of what Pay TV could offer. As the driving force behind these transformative concepts, I took immense pride in leading the charge of bringing operators from around the country and the globe into this new era of app-based television.

Each concept was thoughtfully and meticulously crafted with an unwavering focus on elevating the television viewing experience. Embracing innovation and user-centric design, we set the stage for a dynamic and immersive journey through the world of app-based television.`,
  },
  {
    id: 'pay-tv-concepts',
    title: 'Pay TV Concepts',
    client: 'MobiTV',
    description: "Connected TV UI explorations for MobiTV's streaming Pay TV platform, crafting experiences for a new era of app-based television.",
    tags: ['Concepts', 'TV UX', 'Connected TV'],
    year: '2021',
    featured: false,
    imageSrc: '/images/cspiretv_menu-1-370x370.png',
    imageAlt: 'Pay TV menu interface concepts',
    overview: `In 2016, I played a pivotal role in MobiTV's groundbreaking project: a streaming Pay TV service that revolutionized the television industry. We embarked on a mission to transition operators from traditional, hard-to-maintain set-top boxes to the cutting-edge world of app-based television.

Our vision was clear: empower customers with seamless and modern user experiences that pushed the boundaries of what Pay TV could offer. By discarding legacy set-top boxes, we embraced the future of television with app-based solutions that provided unparalleled convenience and interactivity.

This project stands as a testament to my passion for design and my dedication to creating visionary concepts that make a difference. I cherish the opportunity to have contributed to MobiTV's groundbreaking streaming Pay TV service, and I'm thrilled to have been a part of reshaping the future of television.`,
  },
  {
    id: 'ipsh-freelance',
    title: 'ipsh! Freelance',
    client: 'ipsh! (Omnicom)',
    description: 'Eight years of freelance design and development for an Omnicom-owned mobile marketing agency, spanning branded websites, Flash apps, and interactive campaigns for household names.',
    tags: ['Freelance', 'Mobile Marketing', 'Interactive'],
    year: '2013',
    featured: false,
    imageSrc: '/images/ipshsite-mock3-370x370.jpg',
    imageAlt: 'ipsh! freelance project mockup',
    overview: `During my tenure as a freelance web and mobile designer/developer at ipsh! (an Omnicom-owned mobile marketing company) from 2005 to 2013, I had the privilege of collaborating on diverse projects that left an indelible mark on their digital presence.

Redesigning their website was a pivotal undertaking, where I crafted engaging featured sections showcasing compelling case studies, the latest news, and curated content. Additionally, I conceptualized and implemented their interactive texting widget, elevating their user engagement to new heights.

Among my accomplishments, I designed and developed multiple Flash-based websites and apps, as well as sleek mobile websites for prominent clients including Bud Light, Axe Body Spray, Oberto Beef Jerky, Victoria Secret, GameStop, and the Dallas Cowboys, among others.

This enriching experience nurtured my passion for innovation and cultivated my expertise in crafting captivating user experiences across diverse platforms.`,
  },
  {
    id: 'dallas-cowboys-text2screen',
    title: 'Dallas Cowboys: Text-2-Screen',
    client: 'Dallas Cowboys / ipsh!',
    description: "Designed and developed a real-time text-to-screen fan activation app that ran live on the Cowboys' stadium HD screens during games.",
    tags: ['Interactive', 'Live Events', 'Mobile'],
    year: '2014',
    featured: false,
    imageSrc: '/images/large_509347_5gm2xrixnb0zdkkjn8sxeiond-370x370.jpg',
    imageAlt: 'Dallas Cowboys Text-2-Screen jumbotron activation',
    overview: `As a part of ipsh!, a proud subsidiary of Omnicom and The Marketing Arm, I had the privilege of collaborating with the Dallas Cowboys to create an exhilarating text-2-screen application. This application ran during games on the team's massive HD screens at the center of the field, fostering real-time interactions between fans and the game.

Using my expertise in the Adobe Creative Suite, I meticulously designed and developed this cutting-edge application, employing Adobe Flash and ActionScript to craft a standalone app that seamlessly integrated with the game experience. Fans actively participated by sending in texts and images, which were then displayed in real-time on the grand screens, magnifying their engagement and fostering a profound sense of connection with the team.

To facilitate this dynamic interaction, I utilized APIs to transmit the incoming texts and images to the application in an instant, ensuring smooth and swift display on the HD screens. This project showcases my ability to merge creativity and technical prowess to create unforgettable fan experiences.`,
  },
  {
    id: 'mobitv-ng',
    title: 'MobiTV NG: Evolutionary TV',
    client: 'MobiTV / AT&T / Verizon',
    description: "Served as principal product designer on MobiTV's next-generation mobile TV platform, shipped with AT&T, Verizon, T-Mobile, and US Cellular.",
    tags: ['Product Design', 'TV UX', 'Mobile'],
    year: '2017',
    featured: false,
    imageSrc: '/images/landing4-370x370.png',
    imageAlt: 'MobiTV next-generation TV concept',
    role: 'Principal Product Designer',
    overview: `As part of MobiTV's pioneering journey in the streaming television industry, we embarked on a groundbreaking project known as 'NG', a revolutionary application that redefined the mobile television experience. Our vision was clear: create an application that set new standards for intuitiveness, ease of use, and innovation in mobile television.

By blending user experience and design expertise, I played a vital role as the principal product designer in shaping the application's interface, tailored to the unique branding requirements of our esteemed clients. Collaborating with industry giants such as AT&T, Verizon, Dyle, T-Mobile, and US Cellular, we elevated the mobile television landscape.

'NG' was a testament to MobiTV's commitment to pushing the boundaries of mobile entertainment and delivering exceptional user experiences.`,
  },
  {
    id: 'doritos-flavor-shots',
    title: 'Doritos: Flavor Shots',
    client: 'Doritos / ipsh!',
    description: 'Designed and developed a Flash-based campaign landing page for the Doritos Flavor Shots product launch, featuring immersive graphics, animations, and interactive engagement.',
    tags: ['Interactive', 'Campaign', 'Web'],
    year: '2014',
    featured: false,
    imageSrc: '/images/509347_s_zn_dixwouejvy67ylgart4y-370x370.jpg',
    imageAlt: 'Doritos Flavor Shots mobile campaign experience',
    overview: `Crafted with expertise and creativity, I designed and developed a captivating landing page using Adobe Creative Suite and Adobe Flash to support the exciting product launch of Doritos' Flavor Shots. With a focus on visual appeal and user engagement, the landing page served as a dynamic gateway to introduce customers to this thrilling new product.

Leveraging Adobe Creative Suite's powerful tools, I crafted stunning graphics, captivating imagery, and eye-catching animations that conveyed the essence of Flavor Shots. Using Adobe Flash, I brought the landing page to life with seamless interactivity and engaging elements that immersed visitors in the world of Doritos' Flavor Shots.

Throughout the design and development process, I maintained a strong emphasis on aligning the landing page with Doritos' brand identity and product messaging, ensuring a cohesive and compelling user journey.`,
  },
]

// ── Seed siteSettings ─────────────────────────────────────────
// This document has all the site-wide content: name, hero text, about bio,
// contact info, and the portfolio password.
// Edit any of these values in Sanity Studio after seeding.

async function seedSiteSettings() {
  console.log('Seeding siteSettings...')

  const doc = {
    _type: 'siteSettings',
    _id:   'siteSettings', // Fixed ID — Sanity Studio pins this as a singleton

    brandName:         'Curtis Calhoun',
    heroTitle:         'Senior Product Designer',
    heroTagline:       'Designing products people love.\nLeading teams that build them.',
    heroStatusLabel:   'Open to opportunities',

    aboutHeadline:     'I design with both craft\nand context in mind.',
    aboutBio: toPortableText(
      `I'm a Senior Product Designer with over a decade of experience spanning enterprise software, streaming TV, and mobile. My background in design management means I think about systems, teams, and outcomes — not just screens.\n\nI've led design for products used by millions, built and mentored design teams, and partnered closely with engineering and product to ship work that actually moves the needle.`
    ),
    specializations:   ['Enterprise UX', 'Streaming & TV', 'Mobile', 'Design Leadership'],
    industries:        ['Energy & Utilities', 'Media & Entertainment', 'B2B SaaS', 'Marketing & Brand'],

    footerHeadline:    "Let's work together.",
    footerDescription: 'Open to full-time roles, contract work, and design leadership opportunities. Reach out and let\'s start a conversation.',
    contactEmail:      'hello@curtiscalhoun.com',
    linkedInUrl:       'https://www.linkedin.com/in/curtiscalhoun',

    // Change this password anytime in Studio → Site Settings → Portfolio Access
    portfolioPassword: 'portfolio2024',
  }

  await client.createOrReplace(doc)
  console.log('  ✓ siteSettings seeded')
}

// ── Seed projects ─────────────────────────────────────────────
// Converts each project's plain-text fields to Portable Text,
// then uploads to Sanity using createOrReplace (safe to re-run).

async function seedProjects() {
  console.log(`\nSeeding ${projects.length} projects...`)

  for (const project of projects) {
    const doc = {
      _type: 'project',
      _id:   `project-${project.id}`,  // Stable ID so re-running doesn't create duplicates
      id:    { _type: 'slug', current: project.id },
      title:       project.title,
      client:      project.client,
      description: project.description,
      tags:        project.tags,
      year:        project.year,
      featured:    project.featured,
      role:        project.role,

      // Convert plain text → Portable Text blocks
      ...(project.overview  && { overview:  toPortableText(project.overview)  }),
      ...(project.challenge && { challenge: toPortableText(project.challenge) }),
      ...(project.process   && { process:   toPortableText(project.process)   }),
      ...(project.outcome   && { outcome:   toPortableText(project.outcome)   }),

      // Note: images are NOT uploaded here — they're still served from /public/images/.
      // To host them on Sanity's CDN, upload each image via Studio → Projects → [project] → Image.
      // This is optional but recommended for performance.
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${project.title}`)
  }
}

// ── Run ───────────────────────────────────────────────────────

async function main() {
  console.log('─────────────────────────────────────')
  console.log('Sanity Seed Script')
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}`)
  console.log('─────────────────────────────────────\n')

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('Missing env vars. Make sure .env.local has:')
    console.error('  NEXT_PUBLIC_SANITY_PROJECT_ID')
    console.error('  SANITY_API_TOKEN')
    process.exit(1)
  }

  await seedSiteSettings()
  await seedProjects()

  console.log('\n─────────────────────────────────────')
  console.log('All done! Visit /studio to review and edit your content.')
  console.log('─────────────────────────────────────')
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message)
  process.exit(1)
})
