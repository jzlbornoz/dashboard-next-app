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

- Para poder escuchar los cambios se agrega la configuracione en purge, posteriormente se agrega la paleta de colores en theme.

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

== Integracion de components ==

1. Se traen los componentes del siguiente repositorio: https://github.com/GNDX/NEXTJS-UI .
2. Se integran en la carpeta src.

== Creación del layout principal e integración de los Page Components ==

1. Se crea la carpeta 'layout' en src, con el archivo 'MainLayout.js':

```
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <>
            <div className="min-h-full">
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>

            </div>
        </>
    );
};

export { MainLayout };


```

2. Se importan los componentes a utilizar

```
import Header from '@components/Header';
import Nav from '@common/Nav';
```

3. Se agregan los alias en el archivo 'jsconfig.json'.
4. Se agrega el MainLayout en el '\_app.js'.

```
import '@styles/tailwind.css';
import { MainLayout } from '@layout/MainLayout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}

export default MyApp;

```

== Lógica del componente login ==

1. Se agrega la pagina login.

```
import React from 'react';
import LoginPage from '@components/LoginPage';

const Login = () => {
    return (
        <>
            <LoginPage />
        </>
    );
};

export default Login;

```

2.  Se agrega la siguiente logica al archivo 'LoginPage':

```
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userRef.current.value;
    const password = passwordRef.current.value;
    //console.log(user + password);
  }


```
== Presentación de la API ==
1. Se crea la carpeta 'services'.
2. Se crea la carpeta 'api' y se agrega el index.js
3. se agrega lo siguiente al ".env.local": 
```
NEXT_PUBLIC_API_URL=https://api.escuelajs.co
NEXT_PUBLIC_API_VERSION=v1
```
4. Se crea la estrucutra que permite organizar y trabajar los puntos de entrada, heciendo asi la app mas rapida.
```
const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const endPoints = {
    auth: {
        login: `${API}/api/${VERSION}/auth/login`,
        profile: `${API}/api/${VERSION}/auth/profile`,
    },
    products: {
        getAllProducts: `${API}/api/${VERSION}/products`,
        getProduct: (id) => `${API}/api/${VERSION}/products/${id}`
    },
    users: {
        getUsers : `${API}/api/${VERSION}/users?limit=10`,
        getUserAvailable: `${API}/api/${VERSION}/users/is-available`
    },
    files: {
        getFile: (filename) =>  `${API}/api/${VERSION}/files/${filename}`
    }
}
```
