export interface Autor {
    ok: boolean ;
    _id: string;
    nombre: string;
    usuario: {
        _id: string,
        nombre: string
    }
}