export interface Evento {
    ok: boolean,
    _id?: string,
    nombre: string,
    descripcion: string,
    lugar: string,
    fechaHora: Date,
    usuario?: {
        _id?: string,
        nombre?: string
    },
    img?: string
}

export enum TiposBuscador {
    
    nombre = 'nombre',
    lugar = 'lugar', 
}