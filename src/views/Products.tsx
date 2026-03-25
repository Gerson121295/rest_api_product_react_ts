import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import { ProductDetails } from '../components/ProductDetails';
import type { Product } from "../types";



//loader de react-router es como usar useEffect para cargar data del store y poder usarla
//export async function loader(){
export const loader = async() => { 
  
  const products = await getProducts();
  //console.log(products);

  return products;  // {}  Loader como los actions deben retornar algo
}

//export async function action({ request } : ActionFunctionArgs){
export const action = async( { request } : ActionFunctionArgs ) => {
  
  const data = Object.fromEntries(await request.formData())
  //console.log(data);
  
  await updateProductAvailability(+data.id)
  
  return {}
}

const Products = () => {

  //hook useLoaderData para cargar los products retornados del loader 
  const products = useLoaderData() as Product[]; //hook useLoaderData obtiene el resultado o retorno de un loader
  //console.log(products);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
            Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <ProductDetails 
                key={product.id}
                  product={product}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products




