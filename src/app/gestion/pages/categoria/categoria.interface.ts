export interface Categoria {
    ok: boolean,
    _id: string,
    nombre: string,
    usuario: {
        _id: string,
        nombre: string
    }
}