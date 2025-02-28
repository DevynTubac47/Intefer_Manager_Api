# Intefer_Manager_Api
Esta API permitirá a las empresas registrar sus datos, incluyendo información crucial como su nivel de impacto, años de trayectoria y categoría empresarial. Además, se busca que esta API genere automáticamente un reporte en formato Excel.

## 📌 Características principales

- Autenticación de usuarios (login con JWT).
- Registro y gestión de empresas (crear, actualizar, listar por trayectorias, categorías y orden).
- Generación de reportes en formato Excel de las empresas registradas.
  
## 📋 Requisitos previos

- Node.js (v18 o superior).
- MongoDB (en local o en la nube).
- Postman (para probar las rutas, opcional).

## 🔹 **Usuario Administrador por Defecto**

```json
  "username": "Admin",
  "email": "admin@gmail.com",
  "password": "123456789",
  "role": "ADMIN_ROLE"
```


## 🚀 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/interfer-manager.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   MONGO_URI=tu_conexion_de_mongodb
   JWT_SECRET=tu_secreto_para_tokens
   PORT=3001
   ```

4. Ejecuta el servidor:

   ```bash
   npm start
   ```

   El servidor estará disponible en: `http://localhost:3001`

## 📊 Endpoints disponibles

### 🔒 Autenticación

1. **Iniciar sesión (Login Admin)**

   **POST** `/interferManager/v1/auth/login`

   **Body (JSON):**

   ```json
   {
     "username": "Dev_vyn",
     "password": "123456789"
   }
   ```

### 🏢 Empresa

1. **Registrar empresa**

   **POST** `/interferManager/v1/company/registerCompany`

   **Body (JSON):**

   ```json
   {
     "nameCompany": "Pepsi Cola",
     "descriptionCompany": "Kinal el Trabajo bien hecho",
     "addressCompany": "6Avenida Zona 7",
     "phoneCompany": "12345279",
     "emailCompany": "pepsi@kinal.edu.gt",
     "impactLevel": "HIGH",
     "yearFoundation": "2020-01-15",
     "category": "Tecnología"
   }
   ```

2. **Listar empresas**

   **GET** `/interferManager/v1/company/companies`

3. **Listar empresas por trayectorias**

   **GET** `/interferManager/v1/company/companiesByTrayectory/:trayectoryId`

4. **Listar empresas por categoría**

   **GET** `/interferManager/v1/company/companiesByCategory/:category`

5. **Listar empresas por orden**

   **GET** `/interferManager/v1/company/companies/order?order=:order`

   Ejemplo:

   ```text
   order=Z-A
   ```

6. **Actualizar empresa**

   **PUT** `/interferManager/v1/company/updateCompany/:companyId`

   **Body (JSON):**

   ```json
   {
     "nameCompany": "Coca Cola Lite",
     "descriptionCompany": "Kinal rabajo bien hecho",
     "addressCompany": "s Zona 7",
     "phoneCompany": "098765432",
     "emailCompany": "pepsiLite@kinal.edu.gt",
     "impactLevel": "LOW",
     "yearFoundation": "2019-01-15",
     "category": "Tecnología"
   }
   ```

7. **Generar reporte de empresas**

   **GET** `/interferManager/v1/company/companies/report`

   (Este endpoint devuelve un archivo de reporte en formato Excel)

### 🧪 Pruebas con Postman

1. Importa la colección de Postman proporcionada.
2. Asegúrate de incluir el token de autenticación en las rutas protegidas (Bearer Token).

## 📌 Notas adicionales

- El sistema incluye autenticación basada en JWT.
- Los endpoints de empresa requieren autenticación con token de administrador para funciones de creación y actualización.
- El archivo de reporte se genera automáticamente como un archivo Excel.

