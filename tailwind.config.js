module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        // bulgarian-rose
        accent: "#501408",
        // warhammer underworlds logo red 
        accent2: "#920104",
        // frontend-masters red
        accent3: { 
          500: "#c02d28",
        }, 
        swirl: '#d0cec2',
      },
      minWidth: {
        '3/4': '75%',
      },
      width: {
        em: '1em',
      },
      height: {
        em: '1em',
      },
      flex: {
        '1/2': '0 1 50%',
        '1/3': '0 1 33%',   
      },
      gridTemplateColumns: {
        '1fr/auto/1fr': '1fr auto 1fr',
        'a/fr/a': 'auto 1fr auto',
      },  
    },
  },
  variants: {},
  plugins: [],
}
