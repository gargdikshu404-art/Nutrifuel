---
name: NutriFuel
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#ffb1c4'
  on-secondary: '#65002e'
  secondary-container: '#ff4a8d'
  on-secondary-container: '#590028'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#000000'
  on-tertiary-container: '#747576'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c4'
  on-secondary-fixed: '#3f001a'
  on-secondary-fixed-variant: '#8f0044'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 2px
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 1px
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
  headline-md:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 1.5px
  stat-lg:
    fontFamily: Anton
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 40px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-lg: 48px
  stack-md: 24px
  stack-sm: 12px
---

## Brand & Style

The design system for this platform is built on an **Athletic High-Contrast** aesthetic, designed to evoke immediate action, intensity, and precision. It targets high-performance individuals who view nutrition as fuel for their ambitions. 

The visual language rejects the soft, muted tones common in wellness apps in favor of a **Bold/Editorial** approach. It utilizes deep blacks to create a void-like depth, allowing the hot pink accents to "glow" with energy. The style is unapologetically aggressive, using massive typography and sharp geometry to command attention and instill a sense of urgency and power.

## Colors

The palette is strictly high-contrast to maintain an aggressive, energetic feel.

- **Primary (Background):** A deep, matte black (#000000) serves as the foundation for all screens.
- **Secondary (Accent):** Hot Pink (#FF007F) is used exclusively for calls to action, progress indicators, and interactive highlights.
- **Tertiary (Surface):** A dark charcoal (#1A1A1A) is used for card backgrounds and section containers to provide subtle separation from the primary background.
- **Text:** Pure white (#FFFFFF) for maximum legibility against the dark void, with secondary text utilizing a 70% opacity white.
- **Gradients:** Actionable elements should use a linear gradient from #FF007F to #B30059 (top-left to bottom-right) to add metallic depth without losing saturation.

## Typography

Typography is the primary driver of the brand's voice. 

- **Headlines:** Use **Anton** in all-caps. This font provides a dense, impactful verticality that mirrors the strength of the user's goals.
- **Body:** Use **Hanken Grotesk** for long-form content and diet details. It provides a clean, contemporary contrast to the heavy headings.
- **Data/Technical:** Use **JetBrains Mono** for nutritional data, calorie counts, and technical labels. The monospaced nature emphasizes precision and "data-driven" nutrition.
- **Hero Sections:** Do not be afraid to overlap large display type with photography, using "multiply" or "overlay" blending modes to integrate text and image.

## Layout & Spacing

The layout follows a **Rigid Grid** system that emphasizes structural integrity.

- **Grid:** Use a 12-column grid for desktop and a 4-column grid for mobile. Gutters are kept wide (24px) to ensure breathing room between high-intensity elements.
- **Rhythm:** All spacing must be multiples of 4px. Use larger "stack" values (48px+) between distinct content modules to prevent the dark UI from feeling cluttered.
- **Asymmetry:** Occasionally break the grid with offset images or text boxes to create a more dynamic, editorial feel similar to a high-end sports magazine.

## Elevation & Depth

This design system avoids traditional soft shadows in favor of **Luminous Depth**.

- **Tonal Layering:** Depth is achieved by placing #1A1A1A containers on #000000 backgrounds. 
- **Glowing Highlights:** Instead of shadows, use inner glows or outer "bloom" effects on active elements. A primary CTA should have a 15px blurred drop shadow of #FF007F at 30% opacity to simulate a neon glow.
- **Hard Borders:** Use 1px or 2px solid borders in Hot Pink or White (at 20% opacity) to define boundaries. Avoid soft, diffused elevations; keep edges sharp and "cut."

## Shapes

The shape language is primarily **Geometric and Sharp**.

- **Corners:** Use "Soft" (0.25rem) for cards and secondary buttons to prevent the UI from feeling too hostile, while maintaining a precise, technical edge.
- **Hard Edges:** Large sections and hero containers should remain perfectly sharp (0px) to maintain the editorial look.
- **Interactive Elements:** Checkboxes and radio buttons must be perfectly square or utilize a distinctive diamond-cut corner.

## Components

- **Buttons:** Primary buttons use the Hot Pink gradient. They should be wide and use uppercase Anton labels. On hover, apply a white 2px stroke and an outer pink glow.
- **Cards:** Use #1A1A1A backgrounds with a 1px top-border of white at 10% opacity. For "featured" diet plans, use a 2px Hot Pink left-border.
- **Input Fields:** Bottom-border only (2px white) with a Hot Pink glow when focused. Labels should use the `label-caps` typography style.
- **Progress Bars:** Thick, 12px height bars. The background is #1A1A1A, and the progress fill is the Hot Pink gradient.
- **Photography:** All imagery should use high-contrast, low-key lighting (dark backgrounds, bright highlights). Apply a subtle pink tint to shadows in editorial overlays to align with the brand color.
- **Chips/Badges:** Small, square-edged containers with `label-caps` text. Use Hot Pink backgrounds for "Urgent" or "High Protein" and Black backgrounds with White borders for standard categories.