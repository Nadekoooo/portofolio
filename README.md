# Academic & Data Science Portfolio

A high-performance, modern portfolio website designed for academics, researchers, and data scientists. Built with Next.js 16, this portfolio showcases Jupyter notebooks, research publications, professional experience, and personal projects with a clean, minimalist design.

##  Features

- ** Native Jupyter Notebook Renderer** - Display `.ipynb` files directly in the browser with full support for markdown, code blocks, outputs, and visualizations
- ** Publications Gallery** - Organize and showcase research papers by year with full metadata
- ** Professional Timeline** - Interactive experience section with company logos and skill tags
- ** Modern UI/UX** - Smooth page transitions, scroll-snap sections, and ambient background effects
- ** Dark/Light Mode** - Full theme support with system preference detection
- ** Performance Optimized** - Static site generation (SSG), Turbopack build system, and optimized images
- ** Fully Responsive** - Mobile-first design that works seamlessly across all devices
- ** SEO Ready** - Comprehensive metadata and Open Graph support

##  Tech Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components
- **Framer Motion** - Advanced animations and transitions
- **Lucide React** - Beautiful icon set

### Content Rendering
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown support
- **React Syntax Highlighter** - Code syntax highlighting
- **KaTeX** - Mathematical notation rendering
- **Remark & Rehype** - Markdown processing plugins

### Development Tools
- **Turbopack** - Next-generation bundler
- **ESLint** - Code linting
- **PostCSS** - CSS processing

##  Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd porto
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

##  Project Structure

```
porto/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── experience/               # Professional experience page
│   ├── notebooks/                # Notebooks listing & detail pages
│   │   └── [slug]/              # Dynamic notebook detail route
│   ├── publications/             # Research publications page
│   ├── layout.tsx               # Root layout with global providers
│   ├── page.tsx                 # Home page with scroll-snap sections
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── experience/              # Experience timeline components
│   ├── home/                    # Home page sections
│   ├── notebook/                # Jupyter notebook renderer
│   ├── research/                # Publication components
│   ├── shared/                  # Shared/global components
│   │   ├── BackgroundGlow.tsx  # Ambient background effect
│   │   ├── Footer.tsx          # Global footer
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── PageTransition.tsx  # Page entrance animations
│   │   └── ThemeProvider.tsx   # Dark/light mode provider
│   └── ui/                      # Shadcn UI components
├── data/                         # Mock/sample data
│   ├── experience.ts            # Work experience data
│   ├── menu.ts                  # Navigation menu items
│   ├── notebooks.ts             # Notebook metadata
│   ├── papers.ts                # Research papers
│   └── profile.ts               # Personal profile info
├── lib/                         # Utility functions
├── public/                      # Static assets
│   ├── images/                  # Images and logos
│   └── notebooks/               # Jupyter notebook files (.ipynb)
├── types/                       # TypeScript type definitions
└── package.json                 # Dependencies and scripts
```

##  Key Pages

### Home Page (`/`)
- **Hero Section** - Introduction with avatar and tagline
- **Featured Notebooks** - Showcase of top computational projects
- **Publications Highlights** - Recent research papers
- **Experience Preview** - Timeline of professional roles
- Full-screen scroll-snap layout with smooth transitions

### Notebooks (`/notebooks`)
- Gallery view with search functionality
- Filterable by tags and topics
- Click through to native Jupyter viewer
- Supports markdown cells, code blocks, outputs, and visualizations

### Publications (`/publications`)
- Papers grouped by year in descending order
- Full citation information
- Direct links to PDFs
- Clean, academic typography

### Experience (`/experience`)
- Visual timeline with company logos
- Role descriptions and skill tags
- Smooth animations on scroll

### About (`/about`)
- Personal bio and background
- Skills showcase
- Education history
- Social links and CV download

##  Customization

### Update Personal Information
Edit `data/profile.ts` to update your name, bio, avatar, skills, education, and social links.

### Add Notebooks
1. Place `.ipynb` files in `public/notebooks/`
2. Update `data/notebooks.ts` with metadata (title, description, tags, slug)

### Add Publications
Edit `data/papers.ts` to add your research papers with full citation details.

### Add Work Experience
Update `data/experience.ts` with your professional timeline.

### Modify Theme Colors
Edit `app/globals.css` to customize color schemes for light and dark modes.

##  Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Node.js

##  License

This project is open source and available under the MIT License.

##  Contributing

Contributions, issues, and feature requests are welcome!

##  Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---