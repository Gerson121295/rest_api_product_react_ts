import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { action as updateAvailabilityAction, loader as productLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";


//action(data/accion que el user escribe en el form) son escribir o modificar data para los formularios y 
// loader para cargar data en las rutas

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        //paginas que esten en children son hijos de Layout y se renderizan dentro del Outlet de Layout
        children: [ 
            {
                //path: "products", //ruta relativa a la ruta del padre, en este caso seria localhost:3000/products
                index: true, //ruta por defecto del padre, en este caso seria localhost:3000/  y se renderiza cuando se accede a la ruta del padre, el orden definido en Layout donde este Outlet
                element: <Products />,
                loader: productLoader, //Para la pagina Products el loader es productLoader(al ir a la pagina se carga el loader). Loader es como useEffect(que carga los data del store)
                action: updateAvailabilityAction
            },
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                //P3- action se ejecuta cuando se envia un formulario desde esta ruta, en este caso el Form definido en NewProduct.tsx, el action recibe como parametro un objeto con la propiedad request que es la solicitud que se hace al enviar el formulario, con request.formData() podemos obtener los datos del formulario y hacer la logica para guardar el producto en la DB
                action: newProductAction 
            },
            {
                path: 'productos/:id/editar', //ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader, //Carga la data del producto seleccionado para editar
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar', //ROA Pattern - Resource-oriented design
                action: deleteProductAction,
            }
        ],
    }

])



