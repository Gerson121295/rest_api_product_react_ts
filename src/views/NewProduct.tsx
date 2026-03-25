import { Form, Link, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

//P2: Crear function action para manejar la logica de guardar el producto en la DB, esta function se ejecuta cuando se envia el formulario definido en NewProduct.tsx, el action recibe como parametro un objeto con la propiedad request que es la solicitud que se hace al enviar el formulario, con request.formData() podemos obtener los datos del formulario y hacer la logica para guardar el producto en la DB
export async function action({ request }: ActionFunctionArgs) {

    //Forma 1 de Obtener los datos del formulario desde FormData
    //const formData = await request.formData() //obtenemos los datos del formulario
    //const name = formData.get("name") as string
    //const price = formData.get("price") as string
    //console.log({ name, price }) //aqui se haria la logica para guardar el producto en la base de datos

    //Forma 2 de Obtener los datos del formulario desde FormData y convertirlo a un objeto
    const data = Object.fromEntries(await request.formData()) //obtenemos los datos del formulario y los convertimos a un objeto desde FormData
    //console.log(data) //aqui se puede ver la solicitud que se hace al enviar el formulario, con request.formData() podemos obtener los datos del formulario

    let error = '';
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    if(error.length){ //si hay un error, se retorna el error para mostrarlo en la vista
        return  error 
    }
    //console.log(error )

    //Se crea el Producto
    await addProduct(data);

    return redirect('/');  //return {}   //Redirige al User a la pagina principal
}


const NewProduct = () => {

    //hook useActionData() se usa cuando se quiere obtener el resultado de un action
    const error = useActionData() as string;
    //console.log(error )

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
            Volver a Productos
        </Link>
      </div>

        {
            error && <ErrorMessage>{error}</ErrorMessage>
        }

      <Form     //P1 -Form de react-router-dom para usar Actions y no tener que usar un onSubmit con un handler, el Form se encarga de enviar los datos al Action definido en router.tsx
        className="mt-10"      
        method='POST'
        >
        
        <ProductForm />
{/*             <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                />
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                />
            </div>
             */}
            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
            />
        </Form>

    </>
  )
}

export default NewProduct


