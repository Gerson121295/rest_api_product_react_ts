import { array, boolean, number, object, string, type InferOutput } from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
})


export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean(),
})

//crea un array de ProductSchema(objeto singular) (debido a que la data viene en array de objetos(plural)) 
export const ProductsSchema = array(ProductSchema) 
//Type Product  -Output(InferOutput) toma el schema y lo convierte a Type
export type Product = InferOutput<typeof ProductSchema>

