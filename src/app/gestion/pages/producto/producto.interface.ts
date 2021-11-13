export interface Producto {

    ok?: boolean,
    _id?: string,
    titulo: string,
    descripcion: string,
    precio?: number,
    isbn?: number,
    formato: string,
    img?: string,
    editorial: string,
    autor: string,
    subCategoria: string,
    idioma: string,
    edicion: string,
    stock?: number,
    usuario?: {
        _id: string,
        nombre: string
    }
}

export interface ProductoModificar {
    ok?: boolean,
    _id?: string,
    titulo: string,
    descripcion: string,
    precio: number,
    isbn: number,
    formato: string,
    img?: string,
    editorial: {
        _id: string,
        nombre: string,
    }
    autor: {
        _id: string,
        nombre: string,
    }
    subCategoria: {
        _id: string,
        nombre: string,
    }
    idioma: string,
    edicion: string,
    stock: number,
    usuario?: {
        _id: string,
        nombre: string
    }
}