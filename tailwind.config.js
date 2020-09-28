module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        accent: "#501408", // bulgarian-rose
        accent2: "#920104",
        swirl: '#d0cec2',
      },
      minWidth: {
        '3/4': '75%',
      },
      flex: {
        '1/2': '0 1 50%',
        '1/3': '0 1 33%',   
      },
      gridTemplateColumns: {
        '1fr/auto/1fr': '1fr auto 1fr'
      },  
    },
  },
  variants: {},
  plugins: [],
}
