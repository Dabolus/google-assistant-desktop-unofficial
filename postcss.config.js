module.exports = ({file, options}) => ({
  parser: 'postcss-safe-parser',
  plugins: {
    'postcss-import': {root: file.dirname},
    'postcss-cssnext': {
      features: {
        autoprefixer: options.production,
      },
    },
    'cssnano': options.production ? {autoprefixer: false} : false,
  },
});
