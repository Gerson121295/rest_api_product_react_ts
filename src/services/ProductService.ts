import { safeParse, number, pipe, string, transform, parse} from "valibot";
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types";
import axios from "axios";
import { toBoolean } from '../utils/index';

type ProductData = {
     [k: string]: FormDataEntryValue;
}

//export async function addProduct(data){
export const addProduct = async(data : ProductData) => {
    
    try {
        const result = safeParse(
            DraftProductSchema, 
            //data  //Se envia la data pero price es string y se espera number en DraftProductSchema por lo tanto en consola retorna en success: False (error)
            { //Se envia el objeto con los tipos de datos esperado para cada atributo en DraftProductSchema y en consola retorna en success: True (exito)
                name: data.name,
                price: +data.price  //agregando + ya convierte price en un numero
            }
        )
        //console.log(result)

        if(result.success){ //si en consola retorna true en result.success de valibot

            //Envia la data a la API del backend en Node para guardar en la DB
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            
            //const { data } = await axios(url, {method: 'POST'}) //F1
            await axios.post(url, { //F2
                name: result.output.name,
                price: result.output.price
            }) 
            //console.log(data);
            
        }else{
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async () => { //export async function getProducts(){}
    try {
        //Obtener la data de la API del backend en Node para cargar
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        //console.log(data.data)
        const result = safeParse(ProductsSchema, data.data); //valida que la data obtenida de la peticion cumpla con el schema o data esperada definida en ProductSchema
        //console.log(result);
        if(result.success){
            return result.output //retorna la data products
        }else{
            throw new Error('Hubo un error...')
        }

    } catch (error) {
        console.log(error)
    }
}


export const getProductsById = async (id : Product['id']) => { //export async function getProductsById(id){}
    try {
        //Obtener la data de la API del backend en Node para cargar
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        //console.log(data.data)
        const result = safeParse(ProductSchema, data.data); //valida que la data obtenida de la peticion cumpla con el schema o data esperada definida en ProductSchema
        //console.log(result);

        if(result.success){
            return result.output //retorna la data products
        }else{
            throw new Error('Hubo un error...')
        }

    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async(data : ProductData, id: Product['id']) => {
    try {
        //La doc de valibot dice que se debe usar { pipe, string, transform y number } para crear el schema que convierte un string a número.
        const NumberSchema = pipe(string(), transform(Number), number());

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price), //convierte un string a número.
            availability: toBoolean(data.availability.toString())
        })
        //console.log(result);

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']){
    //console.log(id);
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)

    } catch (error) {
        console.log(error)
    }
}


export const updateProductAvailability = async(id: Product['id']) => {

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)

    } catch (error) {
        console.log(error)
    }
}

