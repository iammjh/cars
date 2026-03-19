# APEX — Drive the Impossible

Premium fullscreen car showcase with parallax animations, image carousels, and dynamic color theming for 6 high-performance vehicles.

## Quick Start

1. **Add Images** to `assets/` folder:
   - `gtr.jpeg`, `gtr1.jpeg`, `gtr2.jpeg` (GT-R)
   - `amg.jpeg` (Mercedes)
   - `porsche.jpeg`, `porsche1.jpeg`, `porsche2.jpeg`, `porsche3.jpeg` (Porsche)
   - `bmw.jpeg`, `bmw1.jpeg`, `bmw2.jpeg` (BMW)
   - `lamorgini.jpeg`, `lamorgini1.jpeg`, `lamorgini2.jpeg` (Lamborghini)
   - `ferarri.jpeg`, `ferarri1.jpeg`, `ferarri2.jpeg` (Ferrari)

2. **Open** `car-showcase.html` in browser

3. **Hard refresh** (Ctrl+F5) if images don't load

## Features

- Fullscreen parallax background with slow zoom
- Image carousel (5-sec cycles with fade transitions)
- Glassmorphic stats card
- Color palette per vehicle
- Multi-input nav: scroll, arrow keys, swipe, Home/End
- Animated ticker, corner brackets, nav bar

## Files

- `car-showcase.html` – Main entry point
- `styles.css` – All styling + animations
- `script.js` – Carousel + navigation logic
- `assets/` – Vehicle images

## Navigation

- **Scroll** or **Arrow Keys (← →)** – Next/Previous
- **Home/End** – First/Last vehicle  
- **Swipe** – Touch navigation
- **Mouse** – Parallax offset

## Notes

- No external dependencies (vanilla HTML/CSS/JS)
- Carousel auto-starts per slide, auto-stops on navigation
- Images enhanced with `brightness(1.05) contrast(1.15) saturate(1.2)` filter
- Mobile-friendly with touch support
