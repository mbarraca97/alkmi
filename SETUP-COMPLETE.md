# ✅ Alkmi Website Setup Complete!

Your Alkmi website is now ready! The development server is running at:
**http://localhost:3000**

## What's Been Set Up

### ✅ Project Structure
- Next.js 16 with TypeScript
- Tailwind CSS configured with custom theme
- GSAP with ScrollTrigger for animations
- Custom fonts: Aboreto (titles) and Lexend (content)

### ✅ Color Palette Configured
- **Sage** (#686C52) - Primary text
- **Mint** (#D9DFC6) - Backgrounds
- **Cream** (#F5EFE7) - Main background
- **Terracotta** (#BD7A52) - Accents

### ✅ Three Main Sections Created

1. **Video Scroll Section**
   - Scroll-triggered video background
   - Video scrubs with scroll position
   - Full-screen immersive experience

2. **Horizontal Scroll Section**
   - 4 panels with smooth horizontal scrolling
   - Triggered by vertical scroll
   - Contains title and content components

3. **Final Vertical Section**
   - Traditional vertical scroll
   - Animated content with GSAP
   - Feature cards and CTA button

## 📝 Next Steps

### 1. Add Your Video
Place your background video file here:
```
public/video/alkmi.mp4
```

**Video Requirements:**
- Format: MP4 (H.264 codec recommended)
- Resolution: 1920x1080 or higher
- Duration: 15-30 seconds works well
- Optimize for web (keep under 10MB if possible)

**Recommended Tools for Video Optimization:**
- HandBrake (free)
- Adobe Media Encoder
- FFmpeg command: 
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k alkmi.mp4
  ```

### 2. Customize Content

**Edit Horizontal Scroll Panels:**
`app/components/HorizontalScrollSection.tsx`
- Update the 4 panels with your content
- Change titles and descriptions

**Edit Final Section:**
`app/components/FinalSection.tsx`
- Update main heading and description
- Customize the 3 feature cards
- Update button text and functionality

### 3. Adjust Scroll Speeds (Optional)

If you want to adjust the scroll animation speeds:

**Video Scrub Speed:**
```typescript
// app/components/VideoScrollSection.tsx
scrub: 1, // Lower = faster, Higher = smoother
```

**Horizontal Scroll Speed:**
```typescript
// app/components/HorizontalScrollSection.tsx
scrub: 1, // Adjust this value
```

## 🚀 Running the Site

**Development:**
```bash
npm run dev
```
View at: http://localhost:3000

**Production Build:**
```bash
npm run build
npm start
```

## 📂 Key Files

```
alkmi/
├── app/
│   ├── components/
│   │   ├── VideoScrollSection.tsx
│   │   ├── HorizontalScrollSection.tsx
│   │   └── FinalSection.tsx
│   ├── globals.css              # Theme colors & fonts
│   ├── layout.tsx               # Font configuration
│   └── page.tsx                 # Main page layout
└── public/
    └── video/
        └── alkmi.mp4            # Add your video here
```

## 🎨 Customizing Colors

Edit `app/globals.css`:
```css
:root {
  --sage: #686C52;       /* Change main color */
  --mint: #D9DFC6;       /* Change accent color */
  --cream: #F5EFE7;      /* Change background */
  --terracotta: #BD7A52; /* Change highlight */
}
```

## 🔤 Using Fonts in Your Code

**For Titles:**
```tsx
<h1 className="font-title">Your Title</h1>
```

**For Content:**
```tsx
<p className="font-content">Your content text</p>
```

**Using Colors:**
```tsx
<div className="bg-sage text-cream">
<div className="bg-mint text-sage">
<div className="bg-cream text-terracotta">
```

## 🐛 Troubleshooting

**Video not loading?**
- Check file path: `public/video/alkmi.mp4`
- Check file format (MP4 works best)
- Check console for errors
- Clear browser cache

**Scroll animations not smooth?**
- Adjust `scrub` value in components
- Check if video file is too large
- Try a different browser (Chrome/Firefox recommended)

**Fonts not loading?**
- Check internet connection (fonts load from Google)
- Clear browser cache
- Check browser console for errors

## 📱 Responsive Design

The site is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎯 Performance Tips

1. **Optimize video file** - Keep under 10MB
2. **Use appropriate video resolution** - 1080p is usually enough
3. **Consider lazy loading** for below-the-fold content
4. **Compress images** if you add any
5. **Test on different devices** and browsers

## 📞 Need Help?

Check the main [README.md](README.md) for more detailed documentation.

---

**Status:** ✅ All systems ready!
**Port:** 3000
**URL:** http://localhost:3000

Happy building! 🚀
