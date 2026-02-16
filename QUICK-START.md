# 🚀 Quick Start Guide

## Immediate Next Steps

### 1️⃣ View the Site (Already Running!)
Open your browser: **http://localhost:3000**

The site is currently running with placeholder content. You'll see a 404 error in the console for the video - this is expected.

### 2️⃣ Add Your Video
```bash
# Place your video file in:
public/video/alkmi.mp4
```

Once added, refresh your browser to see the video scroll effect.

### 3️⃣ Customize Content

**Quick edits you can make right now:**

**Horizontal Scroll Text:**
Edit: `app/components/HorizontalScrollSection.tsx`
Lines 33-68 contain the 4 panels

**Final Section Content:**
Edit: `app/components/FinalSection.tsx`
Lines 47-93 contain the main content and feature cards

**Colors:**
Edit: `app/globals.css`
Lines 3-8 contain all color definitions

## Commands Reference

```bash
# Start development server
npm run dev

# Stop development server
# Press Ctrl+C in the terminal

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npm run lint
```

## File Structure Quick Reference

```
📁 app/
  📁 components/
    📄 VideoScrollSection.tsx      ← Video scroll effect
    📄 HorizontalScrollSection.tsx ← Horizontal panels
    📄 FinalSection.tsx            ← Final section with cards
  📄 globals.css                   ← Colors & theme
  📄 layout.tsx                    ← Fonts setup
  📄 page.tsx                      ← Main page (uses all components)

📁 public/
  📁 video/
    📄 alkmi.mp4                   ← ADD YOUR VIDEO HERE
```

## Common Tasks

### Change a Color
1. Open `app/globals.css`
2. Find the color variable (e.g., `--sage: #686C52`)
3. Replace with your hex code
4. Save and refresh browser

### Change Text Content
1. Open the component file
2. Find the text you want to change
3. Replace it
4. Save (auto-reloads)

### Adjust Scroll Speed
1. Open the component file
2. Find `scrub: 1`
3. Increase for slower, decrease for faster
4. Save and test

### Change Fonts
1. Open `app/layout.tsx`
2. Import different Google Font
3. Update the font variable
4. Update `globals.css` font reference

## 🎥 Video Tips

**Best Practices:**
- Duration: 10-30 seconds
- Resolution: 1920x1080
- File size: Under 10MB
- Format: MP4 with H.264 codec
- Aspect ratio: 16:9

**Quick Compress with FFmpeg:**
```bash
ffmpeg -i your-video.mp4 -vcodec libx264 -crf 23 public/video/alkmi.mp4
```

## 🎨 Using Theme Colors in Code

```tsx
// Backgrounds
className="bg-sage"      // Dark green
className="bg-mint"      // Light green
className="bg-cream"     // Beige
className="bg-terracotta" // Orange-brown

// Text colors
className="text-sage"
className="text-mint"
className="text-cream"
className="text-terracotta"

// Fonts
className="font-title"   // Aboreto (for headings)
className="font-content" // Lexend (for body text)
```

## 📱 Testing

**Test on different screen sizes:**
- Desktop: Default view
- Tablet: Browser DevTools → Responsive mode
- Mobile: Browser DevTools → Device mode

**Test browsers:**
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Common Issues

**Issue:** Video not showing
**Fix:** Check file path is exactly: `public/video/alkmi.mp4`

**Issue:** Fonts look weird
**Fix:** Clear cache, check internet connection (fonts load from Google)

**Issue:** Scroll animations jumpy
**Fix:** 
1. Reduce video file size
2. Increase `scrub` value in component
3. Try different browser

**Issue:** Changes not showing
**Fix:** 
1. Save the file
2. Check terminal for errors
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

## 🎯 What Each Section Does

**VideoScrollSection:**
- Takes full viewport height
- Video plays as you scroll down
- Pinned while scrolling through video duration

**HorizontalScrollSection:**
- Normal vertical scroll triggers horizontal movement
- 4 panels slide left as you scroll down
- Each panel is full viewport width

**FinalSection:**
- Regular vertical scroll
- Content fades in as you scroll
- Contains feature cards and CTA

## Next Steps

1. ✅ Site is running
2. 📹 Add your video file
3. ✏️ Customize the content
4. 🎨 Adjust colors if needed
5. 🚀 Build and deploy!

---

**Currently Running:** ✅
**URL:** http://localhost:3000
**Stop Server:** Press Ctrl+C in terminal

Need more details? Check [SETUP-COMPLETE.md](SETUP-COMPLETE.md) or [README.md](README.md)
