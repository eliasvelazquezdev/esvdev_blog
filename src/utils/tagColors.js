export const colorClassesForTags = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    hover: 'hover:bg-blue-200',
    badge: 'bg-blue-200 text-blue-700'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    hover: 'hover:bg-green-200',
    badge: 'bg-green-200 text-green-700'
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    hover: 'hover:bg-red-200',
    badge: 'bg-red-200 text-red-700'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    hover: 'hover:bg-yellow-200',
    badge: 'bg-yellow-200 text-yellow-700'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    hover: 'hover:bg-purple-200',
    badge: 'bg-purple-200 text-purple-700'
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-800',
    hover: 'hover:bg-pink-200',
    badge: 'bg-pink-200 text-pink-700'
  },
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    hover: 'hover:bg-indigo-200',
    badge: 'bg-indigo-200 text-indigo-700'
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    hover: 'hover:bg-gray-200',
    badge: 'bg-gray-200 text-gray-700'
  }
};

// Helper function to get color classes with fallback
export function getTagColorClasses(color) {
  return colorClassesForTags[color] || colorClassesForTags.blue;
}