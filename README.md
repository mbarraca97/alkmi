# Alkmi Website

A modern, scroll-driven website built with Next.js, Tailwind CSS, and GSAP animations.

## Features

- 🎥 **Scroll-Triggered Video**: Background video that plays in sync with scroll position
- ↔️ **Horizontal Scroll Section**: Smooth horizontal scrolling panels
- 🎨 **Custom Design System**: Carefully crafted color palette and typography
- ⚡ **Modern Tech Stack**: Next.js 16 with TypeScript and Tailwind CSS
- 🎭 **GSAP Animations**: Buttery smooth scroll-triggered animations

## Color Palette

- **Sage**: `#686C52` - Primary text and accents
- **Mint**: `#D9DFC6` - Section backgrounds
- **Cream**: `#F5EFE7` - Main background
- **Terracotta**: `#BD7A52` - Highlights and CTAs

## Typography

- **Titles**: Aboreto Regular (Google Fonts)
- **Content**: Lexend (all variations, Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your video file:
   - Place your background video in `public/video/`
   - Name it `alkmi.mp4`
   - See `public/video/README.md` for video requirements

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
alkmi/
├── app/
│   ├── components/
│   │   ├── VideoScrollSection.tsx    # Scroll-triggered video background
│   │   ├── HorizontalScrollSection.tsx # Horizontal scrolling panels
│   │   └── FinalSection.tsx          # Final vertical scroll section
│   ├── globals.css                   # Global styles and theme
│   ├── layout.tsx                    # Root layout with fonts
│   └── page.tsx                      # Main page
├── public/
│   └── video/
│       ├── README.md
│       └── alkmi.mp4                # Your video file (added)
└── package.json
```

## Sections

### 1. Video Scroll Section
- Full-screen video background
- Video playback controlled by scroll position
- Smooth scrubbing through video content

### 2. Horizontal Scroll Section
- Four panels with titles and content
- Horizontal scrolling triggered by vertical scroll
- Pinned during scroll animation

### 3. Final Vertical Section
- Traditional vertical scroll
- Fade-in animations for content
- Three-column feature grid
- Call-to-action button

## Customization

### Modifying Colors

Edit `app/globals.css` to change the color palette:

```css
:root {
  --sage: #686C52;
  --mint: #D9DFC6;
  --cream: #F5EFE7;
  --terracotta: #BD7A52;
}
```

### Adjusting Scroll Behavior

Edit the GSAP ScrollTrigger settings in each component:
- `VideoScrollSection.tsx` - Video scrub settings
- `HorizontalScrollSection.tsx` - Horizontal scroll speed
- `FinalSection.tsx` - Fade-in timing

### Adding Content

Update the content in:
- `HorizontalScrollSection.tsx` - Edit the four panels
- `FinalSection.tsx` - Update text and feature cards

## Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **GSAP** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animations

## License

Private project for Alkmi.

## Notes

- The video file is not included in the repository
- Add your own video file to `public/video/alkmi.mp4`
- Optimize your video for web to ensure smooth performance
- Consider video file size for better loading times
