import { Form, Link, redirect, useActionData, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { getProductsById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";


export const loader = async({params} : LoaderFunctionArgs) => { //extrae params(:id de la url - productos/:id/editar)
    //console.log(params.id)
    if(params.id !== undefined){
        const product = await getProductsById(+params.id); //el signo + convierte el tipo string a tipo number
        if(!product){ //si no existe product
            //throw new Response('', {status:404, statusText: 'No Encontrado'})
            return redirect('/') //redirige a la pagina principal de products si no existe el product
        }
        return product
    }
}

//P2: Crear function action para manejar la logica de guardar el producto en la DB, esta function se ejecuta cuando se envia el formulario definido en NewProduct.tsx, el action recibe como parametro un objeto con la propiedad request que es la solicitud que se hace al enviar el formulario, con request.formData() podemos obtener los datos del formulario y hacer la logica para guardar el producto en la DB
export async function action({ request, params }: ActionFunctionArgs) {  //extrae params(:id de la url - productos/:id/editar)

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
    //console.log(params.id); return {} //al enviar el form se muestra el id en consola
    
    if(params.id !== undefined){
        //Se actualiza el Product se envia la data y el id(recuperado de params)
        await updateProduct(data, +params.id); //El signo + convierte el tipo de dato string a number
    }

    return redirect('/');  //return {}   //Redirige al User a la pagina principal
}


const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]

const EditProduct = () => {

    //El Hook useLoaderData() Obtiene la data que retorna el loader
    const product = useLoaderData() as Product; 

    //hook useActionData() se usa cuando se quiere obtener el resultado de un action
    const error = useActionData() as string;
    //console.log(error )

    //se desestructura location y se Recupera la data enviada desde el state del navigate de ProductDetails
    //const {state} = useLocation(); //const location = useLocation(); //Forma no apta si el usuario quiere compartir la url, da error ya que el state se genera desde el usuario
    //console.log(state)  //console.log(location.state)

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
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
        
           <ProductForm 
            product = {product}
           />
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Disponibilidad:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>

            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Actualizar Producto"
            />
        </Form>

    </>
  )
}

export default EditProduct



