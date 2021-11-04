export interface Editorial {
    ok: boolean,
    _id: string,
    nombre: string,
    usuario: {
        _id: string,
        nombre: string,
    }
}