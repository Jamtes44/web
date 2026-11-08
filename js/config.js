// js/config.js
// Paleta del Manual de Marca JamDev v2.0:
//   Negro Terminal #0A0A1A · Medianoche #1E1E5A · Índigo Commit #4F46E5 · Índigo Claro #818CF8
//   Naranja Claro #F97316 · Naranja Deploy #A54100 · Blanco Nube #F5F5FA
// Regla de contraste del manual: el texto índigo sobre oscuro usa Índigo Claro; Índigo Commit
// queda para fondos de botón, el logo y títulos grandes.
const SANS = ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"];
const MONO = ["JetBrains Mono", "ui-monospace", "monospace"];

tailwind.config = {
  theme: {
    extend: {
      colors: {
        "background": "#0A0A1A",
        "surface": "#0A0A1A",
        "surface-dim": "#0A0A1A",
        "surface-bright": "#1E1E5A",
        "surface-tint": "#818CF8",
        "surface-container-lowest": "#12122C",
        "surface-container-low": "#0F0F24",
        "surface-container": "#12122C",
        "surface-container-high": "#1E1E5A",
        "surface-container-highest": "#1E1E5A",
        "surface-variant": "#1E1E5A",
        "on-background": "#F5F5FA",
        "on-surface": "#F5F5FA",
        "on-surface-variant": "#AEB0CC",
        "outline": "#6B6B99",
        "outline-variant": "#2A2A55",
        "inverse-surface": "#1E1E5A",
        "inverse-on-surface": "#F5F5FA",
        "inverse-primary": "#4F46E5",

        "brand": "#4F46E5",
        "primary": "#818CF8",
        "on-primary": "#F5F5FA",
        "primary-container": "#4F46E5",
        "on-primary-container": "#F5F5FA",
        "primary-fixed": "#C7CBFC",
        "primary-fixed-dim": "#818CF8",
        "on-primary-fixed": "#0A0A1A",
        "on-primary-fixed-variant": "#1E1E5A",

        "secondary": "#4338CA",
        "on-secondary": "#F5F5FA",
        "secondary-container": "#1E1E5A",
        "on-secondary-container": "#C7CBFC",
        "secondary-fixed": "#C7CBFC",
        "secondary-fixed-dim": "#818CF8",
        "on-secondary-fixed": "#0A0A1A",
        "on-secondary-fixed-variant": "#1E1E5A",

        "tertiary": "#F97316",
        "on-tertiary": "#0A0A1A",
        "tertiary-container": "#F97316",
        "on-tertiary-container": "#0A0A1A",
        "tertiary-fixed": "#F97316",
        "tertiary-fixed-dim": "#A54100",
        "on-tertiary-fixed": "#0A0A1A",
        "on-tertiary-fixed-variant": "#A54100",

        "error": "#FCA5A5",
        "on-error": "#0A0A1A",
        "error-container": "#7F1D1D",
        "on-error-container": "#FEE2E2",

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
        "mono": MONO,
        "headline-lg-mobile": SANS,
        "label-md": MONO,
        "code": MONO,
        "body-lg": SANS,
        "body-md": SANS,
        "headline-lg": SANS,
        "headline-md": SANS,
        "headline-sm": SANS,
        "headline-xl": SANS
      },
      // Escala del manual: H1 Bold 48/52, H2 SemiBold 32/40, texto Regular 16/26, código Mono 14/22.
      fontSize: {
        "headline-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "700"}],
        "label-md": ["14px", {"lineHeight": "22px", "fontWeight": "500"}],
        "code": ["14px", {"lineHeight": "22px", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "29px", "fontWeight": "400"}],
        "body-md": ["16px", {"lineHeight": "26px", "fontWeight": "400"}],
        "headline-lg": ["48px", {"lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "headline-xl": ["64px", {"lineHeight": "1.05", "letterSpacing": "-0.03em", "fontWeight": "800"}]
      }
    },
  },
};
