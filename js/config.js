// js/config.js
const SANS = ["Bricolage Grotesque", "ui-sans-serif", "system-ui", "sans-serif"];

tailwind.config = {
  theme: {
    extend: {
      // Tema claro: papel lavanda, tinta índigo, índigo de marca y amarillo solo para precios.
      colors: {
        "background": "#F7F7FB",
        "surface": "#F7F7FB",
        "surface-dim": "#EEEDF6",
        "surface-bright": "#FFFFFF",
        "surface-tint": "#4F46E5",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F1F0F8",
        "surface-container": "#FFFFFF",
        "surface-container-high": "#E9E8F4",
        "surface-container-highest": "#E4E3F0",
        "surface-variant": "#E9E8F4",
        "on-background": "#17153A",
        "on-surface": "#17153A",
        "on-surface-variant": "#55536F",
        "outline": "#8A88A3",
        "outline-variant": "#CFCDE0",
        "inverse-surface": "#17153A",
        "inverse-on-surface": "#F7F7FB",
        "inverse-primary": "#C3C0FF",

        "primary": "#4F46E5",
        "on-primary": "#FFFFFF",
        "primary-container": "#4F46E5",
        "on-primary-container": "#FFFFFF",
        "primary-fixed": "#E2DFFF",
        "primary-fixed-dim": "#C3C0FF",
        "on-primary-fixed": "#0F0069",
        "on-primary-fixed-variant": "#3323CC",

        "secondary": "#3F3A9E",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#C9C6FF",
        "on-secondary-container": "#2A2670",
        "secondary-fixed": "#E1DFFF",
        "secondary-fixed-dim": "#C1C1FF",
        "on-secondary-fixed": "#13124F",
        "on-secondary-fixed-variant": "#3F407D",

        "tertiary": "#9A4A00",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#FFC93C",
        "on-tertiary-container": "#17153A",
        "tertiary-fixed": "#FFE7A8",
        "tertiary-fixed-dim": "#FFC93C",
        "on-tertiary-fixed": "#17153A",
        "on-tertiary-fixed-variant": "#5C3A00",

        "error": "#B3261E",
        "on-error": "#FFFFFF",
        "error-container": "#F9DEDC",
        "on-error-container": "#410E0B",

        "whatsapp": "#1FAF54"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "container-max": "1200px",
        "unit": "4px",
        "gutter": "24px"
      },
      fontFamily: {
        "sans": SANS,
        "headline-lg-mobile": SANS,
        "label-md": SANS,
        "code": ["ui-monospace", "monospace"],
        "body-lg": SANS,
        "body-md": SANS,
        "headline-lg": SANS,
        "headline-md": SANS,
        "headline-sm": SANS,
        "headline-xl": SANS
      },
      fontSize: {
        "headline-lg-mobile": ["32px", {"lineHeight": "1.15", "fontWeight": "700"}],
        "label-md": ["14px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "code": ["14px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-lg": ["48px", {"lineHeight": "1.08", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "650"}],
        "headline-sm": ["24px", {"lineHeight": "1.3", "fontWeight": "650"}],
        "headline-xl": ["64px", {"lineHeight": "1.02", "letterSpacing": "-0.03em", "fontWeight": "750"}]
      }
    },
  },
};
