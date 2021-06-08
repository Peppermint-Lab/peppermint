const plugin = require('tailwindcss/plugin')

const lineClamp = plugin(
  function ({ addUtilities, theme, variants, e }) {
    const values = theme('lineClamp')

    addUtilities(
      [
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`line-clamp-${key}`)}`]: {
              overflow: 'hidden',
              display: '-webkit-box',
              '-webkit-box-orient': 'vertical',
              '-webkit-line-clamp': `${value}`,
            },
          }
        }),
        {
          '.line-clamp-none': {
            '-webkit-line-clamp': 'unset',
          },
        },
      ],
      variants('lineClamp')
    )
  },
  {
    theme: {
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
    },
    variants: {
      lineClamp: ['responsive'],
    },
  }
)

module.exports = lineClamp
