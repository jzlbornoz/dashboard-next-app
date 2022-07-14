= Get Started =

1. Se inicia el proyecto de next.js `npx create-next-app@latest --use-npm`.
2. se crea la carpeta 'src' en la raiz del proyecto.

== Configuración de ESLint y Prettier ==

1. Se instala las siguiente dependencias: `npm i eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier prettier -D`.
2. Se crea el archivo de configuracion de eslint '.eslintsrc.js' en la raiz del proyecto.

```
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

```

3. Se crea el archivo de configuracion de Prettier 'prettier.config.js' en la raiz del proyecto.

```
module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 200,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
};
```

4. Se agrega el siguiente script `"link:fix": "eslint src/ --fix"`.

== Integracion de PostCSS y TailwindCSS ==

1. Se instalan las dependencias `npm i tailwindcss postcss autoprefixer`.
2. Se inicia Tailwind con `npx tailwindcss init -p`.
3. Se agrega la siguiente configuaracion a 'tailwind.config.js':

- La paleta de colores con:

```
const colors = require('tailwindcss/colors');
```

- Para poder escuchar los canbios se agrega la configuracione en purge, posteriormente se agrega la paleta de colores en theme.

```
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors
      }
    },
  },
  plugins: [],
};

```

4. Se crean las variables de entorno ".env.local" y se agrega lo siguiente: `TAILWIND_MODE=watch`.
5. Se crea el archivo 'tailwind.css' en estyles y se agrega lo siguiente:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

== Configuración del archivo jsconfig.json ==

1. Se crea el archivo 'jsconfig.json' y se agrega los path para las rutas:

```
{
    "compilerOptions": {
        "baseUrl": "src",
        "paths": {
            "@styles/*": [
                "styles/*"
            ]
        }
    }
}
```

== Integracion de componentes predefinidos con TailwindUI ==
1. Una vez leocalizado el template que se va utilizar se instala las dependencias correspondientes.
```
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
```
2. Se instalan los paquetes: `npm i @heroicons/react @headlessui/react`.
3. Se agrego el template en index.js
