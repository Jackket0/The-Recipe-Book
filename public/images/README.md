# Recipe Images

This directory contains images for the recipe cards and detail pages.

## Image Guidelines

### File Naming
- Use the recipe slug as the filename (e.g., `caesar-salad.jpg` for the Caesar Salad recipe)
- Keep filenames lowercase with hyphens instead of spaces

### Image Specifications
- **Recommended size**: 800x600px (4:3 aspect ratio)
- **Format**: JPG or WebP for photos, PNG for graphics with transparency
- **File size**: Keep under 500KB for optimal loading

### Current Image Files Needed
- `caesar-salad.jpg`
- `beef-stir-fry.jpg` 
- `creamy-tomato-soup.jpg`
- `fluffy-pancakes.jpg`
- `lemon-bars.jpg`

## Adding New Images

1. Add your image file to this directory
2. Update the recipe's markdown file with the correct image path:
   ```yaml
   image: "/images/your-recipe-name.jpg"
   ```

## Image Optimization

For best performance, consider:
- Using WebP format when possible
- Compressing images using tools like TinyPNG
- Using Next.js Image component (already implemented)
