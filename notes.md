== Get Started ==
1. Se inicia el proyecto de next.js `npx create-next-app@latest --use-npm`.
2. se crea la carpeta 'src' en la raiz del proyecto.

== Configuración de ESLint y Prettier ==
1. Se instala las siguiente dependencias: `npm i eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier prettier -D`.
2. Se crea el archivo de configuracion de eslint '.eslintsrc.js' en la raiz del proyecto.
~~~
module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    semi: ["error", "alwals"],
  },
};

~~~
3. Se crea el archivo de configuracion de Prettier 'prettier.config.js' en la raiz del proyecto.
~~~
module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 200,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
};
~~~
4. Se agrega el siguiente script `"link:fix": "eslint src/ --fix"`.