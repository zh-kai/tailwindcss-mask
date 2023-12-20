const path = require('path')
const twPlugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function run(config, css = '@tailwind utilities', plugin = tailwindcss) {
  let { currentTestName } = expect.getState()
  config = {
    ...{ plugins: [twPlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

it('addUtilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="mask-gradient-t"></div>` }],
  }

  return run(config).then((result) => {
    console.log(result.css)
    expect(result.css).toIncludeCss(String.raw`
      .mask-gradient-t {
        mask-image: linear-gradient(to top, rgba(0, 0, 0, 1.0) 0, transparent 100%);
      }
    `)
  })
})
