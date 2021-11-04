export interface DetalleComprobante {
    ok: boolean,
    detComprobante: {
        _id: string,
        productos: [
            {
                _id: string,
                titulo: string,
                descripcion: string,
                precio: number,
                isbn: number,
                formato: string,
                img: string,
                editorial: string,
                autor: string,
                subCategoria: string,
                idioma: string,
                edicion: string,
                stock: number,
                usuario: string,
                cantidad: number
            }
        ]
    }
}