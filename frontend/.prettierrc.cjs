/** @type {import("prettier").Options} */
module.exports = {
  arrowParens: 'always',
  bracketSameLine: true,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  singleAttributePerLine: true,
  vueIndentScriptAndStyle: false,
  proseWrap: 'preserve',
  insertPragma: false,
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 120,
  requirePragma: false,
  tabWidth: 2,
  useTabs: false,
  embeddedLanguageFormatting: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
};
