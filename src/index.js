const plugin = require('tailwindcss/plugin')

module.exports = plugin((addUtilities, matchUtilities) => {
  const directions = {
    t: 'top',
    tr: 'top right',
    r: 'right',
    br: 'bottom right',
    b: 'bottom',
    bl: 'bottom left',
    l: 'left',
    tl: 'top left',
  }

  // mask image linear gradient
  const maskLinearGradient = Object.fromEntries(
    Object.entries(directions).map(([shorthand, direction]) => {
      return [
        `.mask-gradient-${shorthand}`,
        {
          maskImage: `linear-gradient(to ${direction}, rgba(0, 0, 0, 1.0) 0, transparent 100%)`,
        },
      ]
    })
  )
  addUtilities(maskLinearGradient)

  // mask image radial gradient
  const maskRadialGradient = Object.fromEntries(
    Object.entries({ ...directions, c: 'center' }).map(([shorthand, direction]) => {
      return [
        `.mask-radial-gradient.mask-gradient-${shorthand}`, // class name
        {
          maskImage: `radial-gradient(circle at ${direction}, rgba(0, 0, 0, 1.0) 0, transparent 100%)`,
        },
      ]
    })
  )
  addUtilities(maskRadialGradient)

  // dynamic mask image
  matchUtilities({
    mask: (value) => ({
      maskImage: value,
    }),
  })
})
