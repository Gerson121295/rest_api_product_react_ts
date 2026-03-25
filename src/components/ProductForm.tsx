import type { Product } from "../types"


type ProductFormProps = {
    product? : Product  //agregar ? significa que puede o no haber un producto es opcional
}

const ProductForm = ({ product } : ProductFormProps) => {
  return (
    <>
       <div className="mb-4">
            <label
                    className="text-gray-800"
                    htmlFor="name"
            >
                Nombre Producto:
            </label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    //cuando se usa el data Router de react router dom no se usa value y onchange. se usa defaultValue
                    //defaultValue={state.product.name}
                    defaultValue={product?.name} //obtiene la data del loader mediante el hook useLoaderData() usando product
                />
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >
                    Precio:
                </label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    //cuando se usa el data Router de react router dom no se usa value y onchange. se usa defaultValue
                    //defaultValue={state.product.price}
                    defaultValue={product?.price} //obtiene la data del loader mediante el hook useLoaderData() usando product
                />
            </div>
    </>
  )
}

export default ProductForm
