# REST API React TS Cliente

## Descripción

Esta es una aplicación frontend desarrollada en **React** y **TypeScript** que implementa un sistema completo de gestión de productos (CRUD: Crear, Leer, Actualizar, Eliminar). La aplicación consume una API REST desarrollada en **Node.js**, **Express** y **TypeScript**, utilizando una base de datos **PostgreSQL** para el almacenamiento de datos.

El proyecto permite a los usuarios realizar operaciones básicas sobre productos, incluyendo la visualización de una lista de productos, la creación de nuevos productos, la edición de productos existentes y la eliminación de productos. La interfaz de usuario está diseñada con **Tailwind CSS** para un aspecto moderno y responsivo.

## Tecnologías y Librerías Utilizadas

### Frontend
- **React 19.2.4**: Biblioteca principal para la construcción de la interfaz de usuario.
- **TypeScript 5.9.3**: Lenguaje de programación que añade tipado estático a JavaScript.
- **Vite 7.3.1**: Herramienta de construcción rápida para desarrollo y producción.
- **React Router DOM 7.13.0**: Para el manejo de rutas y navegación en la aplicación de una sola página (SPA).
- **Axios 1.13.6**: Cliente HTTP para realizar peticiones a la API backend.
- **Tailwind CSS 4.2.1**: Framework de CSS utilitario para el diseño de la interfaz.
- **Valibot 1.3.0**: Librería para validación de formularios y datos.
- **ESLint**: Herramienta de linting para mantener la calidad del código.

### Backend (Referenciado)
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **TypeScript**: Para tipado en el backend.
- **PostgreSQL**: Sistema de gestión de base de datos relacional.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd rest_api_react_ts_cliente
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Asegúrate de que la API backend esté corriendo en el puerto correspondiente (generalmente 4000 o similar). Consulta la documentación del backend para más detalles.

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

## Uso

Una vez iniciada la aplicación, podrás:

- **Ver productos**: Navega a la página principal para ver la lista de productos disponibles.
- **Crear producto**: Usa el formulario en la página "Nuevo Producto" para añadir un nuevo producto.
- **Editar producto**: Selecciona un producto de la lista y edita sus detalles en la página correspondiente.
- **Eliminar producto**: Elimina productos directamente desde la lista o la vista de detalles.

La aplicación incluye validación de formularios para asegurar la integridad de los datos enviados a la API.

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables (ErrorMessage, ProductDetails, ProductForm)
├── layouts/             # Layouts de la aplicación
├── services/            # Servicios para consumir la API (ProductService)
├── types/               # Definiciones de tipos TypeScript
├── utils/               # Utilidades auxiliares
├── views/               # Vistas principales (EditProduct, NewProduct, Products)
├── assets/              # Recursos estáticos
├── main.tsx             # Punto de entrada de la aplicación
└── router.tsx           # Configuración de rutas
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con hot reload.
- `npm run build`: Construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar la calidad del código.
- `npm run preview`: Previsualiza la aplicación construida.

## Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
