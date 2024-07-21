const packageJson = require("./package.json");

const getPackageName = () => {
  return (packageJson.name.includes('@') ? packageJson.name.split('/')[1] : packageJson.name).replace('.', '-');
};

const components = ['alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'offcanvas', 'popover', 'scrollspy', 'tab', 'toast', 'tooltip'];

/** @param {string} component */
const componentName = (component) => {
  if (component === 'scrollspy') return 'ScrollSpy';
  return component[0].toUpperCase() + component.slice(1);
}

const config = {
  compilationOptions: {
		preferredConfigPath: './tsconfig.json',
	},
  entries: [
    {
      filePath: "src/index.ts",
      outFile: `dist/${getPackageName()}.d.ts`,
      // noCheck: false,
      output: {
        umdModuleName: 'BSN',
        noBanner: true,
      }
    },
    ...components.map((component) => ({
      filePath: `src/components/${component}.ts`,
      outFile: `dist/components/${component}.d.ts`,
      noCheck: false,
      output: {
        umdModuleName: componentName(component),
        noBanner: true,
      }
    })),
  ],
};

module.exports = config;
