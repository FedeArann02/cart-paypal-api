# Cart PayPal API

REST API desarrollada con Node.js y Express para la gestión de usuarios, productos, carritos, ventas y pagos mediante PayPal.

La API utiliza Supabase Auth para la autenticación de usuarios, PostgreSQL como sistema de persistencia de datos y PayPal Sandbox para la simulación de pagos.

El proyecto cuenta con autenticación mediante Bearer Token, autorización basada en roles, validación de datos, manejo centralizado de errores y documentación interactiva mediante Swagger.

---

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Supabase Auth
- PayPal REST SDK
- Swagger / OpenAPI
- express-validator
- Helmet
- CORS
- Morgan
- Nodemon

---

## Requisitos

- Node.js
- npm
- PostgreSQL
- Cuenta de Supabase
- Cuenta de PayPal Developer para utilizar PayPal Sandbox

---

## Instalación

Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al directorio del proyecto:
```bash
cd cart-paypal
```

Instalar las dependencias:
```bash
npm install
```

VARIABLES DE ETORNO
Crear un archivo .env en la raíz del proyecto tomando como referencia .env.example
```env
PORT=3000

DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=5432
DB_NAME=

SUPABASE_URL=
SUPABASE_ANON_KEY=

PAYPAL_MODE=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_RETURN_URL=
PAYPAL_CANCEL_URL=
```
---

## Ejecución
Para ejecutar el servidor en modo desarrollo:
```bash
npm run dev
```
Por defecto, la API estará disponible en: http://localhost:3000

---

## Swagger

La API cuenta con documentación interactiva mediante Swagger UI.
Una vez iniciado el servidor, puede accederse a la documentación desde: http://localhost:3000/api-docs
