# Florida Theranostics

A modern, minimal medical website built with Next.js and Sanity CMS.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Sanity CMS** (to be integrated in Phase 2)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
florida-theranostics/
├── app/                    # Next.js App Router
│   ├── (site)/            # Site pages (to be organized)
│   ├── about-us/          # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   ├── Section.tsx
│   └── Button.tsx
├── lib/                   # Utilities and types
│   └── types.ts           # TypeScript types
└── public/                # Static assets
```

## Development Phases

- ✅ **Phase 1**: Project setup and basic structure (CURRENT)
- ⏳ **Phase 2**: Sanity CMS integration
- ⏳ **Phase 3**: Data fetching and rendering
- ⏳ **Phase 4**: MD2-style UI polish
- ⏳ **Phase 5**: SEO and performance
- ⏳ **Phase 6**: Deployment
- ⏳ **Phase 7**: Client editing guide

## Notes

- All content marked with `[PLACEHOLDER]` needs to be provided by the client
- Design follows MD2.com aesthetic: minimal, typography-focused, high whitespace
- No authentication, databases, or patient data storage
