module.exports = {
  extends: ['airbnb-typescript-prettier'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
};
