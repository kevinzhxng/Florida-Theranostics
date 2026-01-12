# Adding Videos and Images to the Project

## Next.js Public Folder Structure

In Next.js, all static assets (images, videos, fonts) go in the `public/` folder at the root of your project. Files in `public/` are served from the root URL.

For example:
- `public/videos/hero.mp4` → accessible at `/videos/hero.mp4`
- `public/images/photo.jpg` → accessible at `/images/photo.jpg`

## Recommended Structure

```
public/
├── videos/
│   └── hero-video.mp4 (or whatever your hero video is named)
├── images/
│   ├── promise-image.jpg
│   ├── difference-image.jpg
│   └── principles-image.jpg
└── ... (other assets)
```

## Methods to Add Files

### Option 1: Using Terminal Commands (Recommended)

If your videos/images are in a folder on your computer, use these commands:

```bash
# Navigate to your project
cd /Users/kevinzhang/Desktop/florida-theranostics

# Copy all videos from your folder to public/videos/
# Replace "/path/to/your/videos" with your actual folder path
cp -r /path/to/your/videos/* public/videos/

# Copy all images from your folder to public/images/
# Replace "/path/to/your/images" with your actual folder path
cp -r /path/to/your/images/* public/images/
```

### Option 2: Using Finder (Mac)

1. Open Finder
2. Navigate to your videos/images folder
3. Select all files (Cmd+A)
4. Copy them (Cmd+C)
5. Navigate to `/Users/kevinzhang/Desktop/florida-theranostics/public/videos/` or `/public/images/`
6. Paste them (Cmd+V)

### Option 3: Drag and Drop in VS Code/Cursor

1. Open the `public` folder in your editor's file explorer
2. Drag your files directly into the `videos/` or `images/` folders

## After Adding Files

Once you've added your files, update `app/page.tsx` to use them:

```tsx
<HeroSection
  videoSrc="/videos/your-hero-video.mp4"  // Replace with your actual filename
  headline="Unlocking medicine in the ideal"
  ctaText="Get in touch"
/>

<ImageTextSection
  title="Our Promise"
  content={...}
  imageSrc="/images/your-promise-image.jpg"  // Replace with your actual filename
  imagePosition="right"
/>
```

## File Naming Best Practices

- Use lowercase with hyphens: `hero-video.mp4`, `promise-image.jpg`
- Keep filenames descriptive but concise
- For videos: Use `.mp4` format (most compatible)
- For images: Use `.jpg`, `.png`, or `.webp` formats

## Checking Your Files

After copying, verify they're in the right place:

```bash
# List videos
ls -la public/videos/

# List images
ls -la public/images/
```
