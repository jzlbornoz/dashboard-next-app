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

== Creación del custom hook useAuth ==

1. Se crea la carpeta hooks con el archivo useAuth.js.
2. Se instala `npm install js-cookie axios`.
3. Se crea la carpeta context, en la cual se crea el context "AuthContext".
4. En el hook se crea el provider del context y se trabaja en el valor del mismo.

```
import React, { useContext, useState } from 'react';
import AuthContext from '@context/AuthContext';

export function ProviderAuth({ children }) {
    const auth = useProviderAuth();
    return (
        <AuthContext.Provider value={auth} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
   return useContext(AuthContext);
}

const useProviderAuth = () => {
    const [user, setUser] = useState(null);
    const signIn = async (email, password) => {
        setUser('landing')
    }

    return {
        user,
        signIn
    }
}

export default useAuth;
```

5. Se agrega el provider al '\_app.js' conectandolo asi con toda la aplicacion:

```
import '@styles/tailwind.css';
import { MainLayout } from '@layout/MainLayout';
import { ProviderAuth } from '@hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}

export default MyApp;

```

== Autenticándonos en la API usando Axios ==

1. Se agrega la lectura del access_token con axios para posteriormente agregarla a la cookie.

- Con axios.post se pueden pasar tres parametros principales:
  1er. La solicitud a la Api a consumir,
  2do. Los datos o parametros a enviar
  3ro. La configuracion de la solicitud.

2. En este caso se utilizan los services(auth.login) para la solicitud, Los datos a enviar son el email y el password, y para la configuracion de la solicitud se crea la siguiente constante:

```
const options = {
            headers: {
                accept: "*/*",
                'Content-Type': 'application/json',
            }
        }
```

3. /useAuth.js

```
const useProviderAuth = () => {
    const [user, setUser] = useState(null);
    const signIn = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };
        //==Lectura del AccessToken que viene desde la api, para posteriormente agregarla a una cookie
        const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
        console.log(access_token);
    };
```

4. Se importa 'useAuth' en el componente de login page para trabajar la logica.
5. Se agrega la logica al handleSubmit:

```
const handleSubmit = (event) => {
    event.preventDefault();
    const user = userRef.current.value;
    const password = passwordRef.current.value;
    auth.signIn(user, password).then(
      console.log("LoginSucces")
    );
  };
```

== Obteniendo el token de la API ==

1. Se hace la validacion si tenemos el access_token:
2. Agregamos la informacion obtenida a una cookie con `Cookies.set()`, en el cual le pasaremos 3 parametros, el primero sera el nombre (string), el segundo sera el valor (access_token) , y el tercero sera la duracion ({expire}).

- useAuth.js

```
function useProviderAuth() {
    const [user, setUser] = useState(null);

    const signIn = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };
        //==Lectura del AccessToken que viene desde la api, para posteriormente agregarla a una cookie
        const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
        if (access_token) {
            Cookies.set('token', access_token.access_token, { expires: 5 })
        }
    };
```

3. Se agrego la logica de error en el login, se creo un estado error en useAuth.js:

```
 const [error , setError] = useState(false);
```

4. Luego se agrego la logica en en handleSubmit del login page:

```
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userRef.current.value;
    const password = passwordRef.current.value;
    auth.signIn(user, password).then(() => {
      auth.setError(false);
      console.log("LoginSucces")
    },
      (err) => {
        console.log("Error Login");
        console.error(err);
        auth.setError(true);
      }
    );
  };
```

5. Luego se agrego un div al final del formulario con la logica al obtener el error:

```
 {auth.error ? (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span className="font-medium">Login Failed!</span> {auth.error}
              </div>
            ) : null}
```

== Guardado del token en una cookie para mantener la sesión ==

1. Se hace el llamado al servidor para obtener los datos del usuario mediante el envio del token en los headers del llamado:
2. Luego se guardan en el setUser.

```
  axios.defaults.headers.Authorization = `Bearer ${token}`;
            const { data: user} =  await axios.get(endPoints.auth.profile);
            //console.log(user);
            setUser(user);
```

== Uso de useAuth para el acceso a los datos de Usuario ==

1. Se usa useRouter en LoginPage para la redireccion a la pagina dashboard.js

```
auth.signIn(user, password).then(
      () => {
        auth.setError(false);
        console.log('LoginSucces');
        router.push('/dashboard');

      },
      (err) => {
        console.log('Error Login');
        console.error(err);
        auth.setError(true);
      }
    );
```

2. Se agrega el context en el Header:

```
import { useAuth } from '@hooks/useAuth';
```

```
const auth = useAuth();

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.mail,
    imageUrl: auth?.user?.avatar,
  };
```

== Obteniendo la lista de productos desde la API ==

1. Se crea el hook useFetch.js.

- ./hooks/useFetch.js

```
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);

    async function fetchData(params) {
        const response = await axios.get(endpoint);
        setData(response.data);
    }

    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return {
        data,
    };
};

export default useFetch;

```

2. Se hace el llamado a useFetch en el dasboard page.

```
export default function Dashboard() {
  const offset = 5;
  const limit = 5;
  const products = useFetch(endPoints.products.getProducts(offset, limit));
  console.log(products);
  return (
    ...
    )
```
