# Video Directory

Place your background video file here with the name: `alkmi.mp4`

## Video Requirements:
- Format: MP4
- Recommended resolution: 1920x1080 or higher
- The video should be optimized for web playback
- Keep file size reasonable for web performance (consider compression)

The video will play on scroll, syncing with the user's scroll position.

## Important for Smooth Scroll Scrubbing
Scroll-driven playback works best when the browser can seek accurately. If your scrub feels jumpy after re-exporting, it's usually because the MP4 has:
- Variable frame rate (VFR), or
- Very infrequent keyframes (long GOP), which makes seeking snap to distant keyframes.

**Recommended export**:
- Constant frame rate (CFR): 30 fps is fine
- Frequent keyframes: every 0.5–1.0s (keyint 15–30 at 30fps)
- H.264 (Baseline/Main/High) and `+faststart`

Example (ffmpeg):

```bash
ffmpeg -i input.mp4 \
  -vf "scale=1920:1080,fps=30,format=yuv420p" \
  -c:v libx264 -crf 20 -preset medium \
  -x264-params "keyint=30:min-keyint=30:scenecut=0" \
  -movflags +faststart -an \
  public/video/alkmi.mp4
```
