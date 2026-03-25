import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

//action para eliminar un registro
export const action = async({ params }: ActionFunctionArgs) => {
    //console.log(`params -> ${params.id}`)

    if(params.id !== undefined){
        await deleteProduct(+params.id) //agregar signo  + permite convertir de tipo String a number
        
        return redirect('/');
    }

}

export const ProductDetails = ({ product } : ProductDetailsProps) => {

    // useFetcher sirve para interactuar con acciones (actions) y cargadores (loaders) del servidor, 
    // permitiendo cargar datos o enviar formularios en segundo plano sin cambiar la URL ni navegar a una nueva página.
    const fetcher = useFetcher();

    //Hook de useNavigate(); para redirigir a una ruta
    const navigate = useNavigate();

    const isAvailable = product.availability;

    return(
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>

            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form 
                    method="POST"
                >
                    <button
                        type="submit"
                        //name="availability"
                        //value={product.availability.toString()} //HTML no puede leer Booleans ni numeros, todo lo trata como string
                        
                        //F1-Obtener el id del producto seleccionado o clic en la disponibilidad
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} 
                        rounded-lg p-2 text-xs uppercase font-bold w-full
                        border border-black-100 hover:cursor-pointer
                        `}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                    {/* 
                    <input // F2-Obtener el id - Al enviar el form se tome en el input el id del producto seleccionado
                        type="hidden" 
                        name="id" 
                        value={product.id} 
                    />
                     */}
                </fetcher.Form>
            </td>

            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">

                    {/* Redirigir a ruta mediante Link */}
{/*                     <Link
                        to={`/productos/${product.id}/editar`}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >
                        Editar
                    </Link> 
*/}

                    {/* Redirigir a ruta mediante navigate: Hook useNavigate();*/}
                     <button
                        //to={`/productos/${product.id}/editar`}
                        onClick={() => navigate(`/productos/${product.id}/editar`
                            /* ,{ //Forma no apta si el usuario quiere compartir la url, da error ya que el state se genera desde el usuario
                            state:{ //pasa la informacion a la ruta editar products y se recupera la data con hook useLocation
                                product //product: product
                                }
                            }*/
                        )}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >
                        Editar
                    </button> 



                    <Form // Form de react router dom para definirle la accion de eliminar
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`} //al dar clic en el input eliminar redirige a esta url y ejecuta el action definido en el router de esta url
                        onSubmit={ (e) => {
                            if( !confirm('¿Eliminar?')){
                                e.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit" 
                            value='Eliminar'
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}


