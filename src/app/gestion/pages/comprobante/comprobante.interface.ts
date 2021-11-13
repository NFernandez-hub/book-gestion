export interface Comprobante {
    _id?: string,
    numero?: number,
    fecha?: string,
    detalleComprobante?: string,
    subTotal?: number,
    descuento?: number,
    total?: number,
    usuario: {
        _id: string,
        nombre: string,
    },
    cupon: {
        _id: string,
        nombre: string
    }
}