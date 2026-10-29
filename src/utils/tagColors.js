// Variantes de color para los tags en tema oscuro.
// El color se usa como acento (punto, borde y texto) sobre el fondo navy,
// para que convivan con la paleta naranja de la marca.
export const colorClassesForTags = {
  blue: {
    bg: 'bg-sky-400/[0.08] border border-sky-400/40',
    text: 'text-sky-300',
    hover: 'hover:border-sky-300 hover:bg-sky-400/15',
    badge: 'bg-sky-400/15 text-sky-200',
    dot: 'bg-sky-400',
  },
  green: {
    bg: 'bg-emerald-400/[0.08] border border-emerald-400/40',
    text: 'text-emerald-300',
    hover: 'hover:border-emerald-300 hover:bg-emerald-400/15',
    badge: 'bg-emerald-400/15 text-emerald-200',
    dot: 'bg-emerald-400',
  },
  red: {
    bg: 'bg-rose-400/[0.08] border border-rose-400/40',
    text: 'text-rose-300',
    hover: 'hover:border-rose-300 hover:bg-rose-400/15',
    badge: 'bg-rose-400/15 text-rose-200',
    dot: 'bg-rose-400',
  },
  yellow: {
    bg: 'bg-amber-400/[0.08] border border-amber-400/40',
    text: 'text-amber-300',
    hover: 'hover:border-amber-300 hover:bg-amber-400/15',
    badge: 'bg-amber-400/15 text-amber-200',
    dot: 'bg-amber-400',
  },
  purple: {
    bg: 'bg-violet-400/[0.08] border border-violet-400/40',
    text: 'text-violet-300',
    hover: 'hover:border-violet-300 hover:bg-violet-400/15',
    badge: 'bg-violet-400/15 text-violet-200',
    dot: 'bg-violet-400',
  },
  pink: {
    bg: 'bg-pink-400/[0.08] border border-pink-400/40',
    text: 'text-pink-300',
    hover: 'hover:border-pink-300 hover:bg-pink-400/15',
    badge: 'bg-pink-400/15 text-pink-200',
    dot: 'bg-pink-400',
  },
  indigo: {
    bg: 'bg-indigo-400/[0.08] border border-indigo-400/40',
    text: 'text-indigo-300',
    hover: 'hover:border-indigo-300 hover:bg-indigo-400/15',
    badge: 'bg-indigo-400/15 text-indigo-200',
    dot: 'bg-indigo-400',
  },
  gray: {
    bg: 'bg-slate-400/[0.08] border border-slate-400/40',
    text: 'text-slate-300',
    hover: 'hover:border-slate-300 hover:bg-slate-400/15',
    badge: 'bg-slate-400/15 text-slate-200',
    dot: 'bg-slate-400',
  },
};

// Helper function to get color classes with fallback
export function getTagColorClasses(color) {
  return colorClassesForTags[color] || colorClassesForTags.blue;
}
