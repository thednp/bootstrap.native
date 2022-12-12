// @ts-check
const entries = require('./entries.cjs');

module.exports = {
  compilationOptions: {
    preferredConfigPath: './tsconfig.json',
  },
  entries,
};
