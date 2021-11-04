export interface SubCategoria {
    ok: boolean,
    _id?: string,
    nombre: string,    
    categoria: {
        _id?: string,
        nombre: string
    }
}

export enum TiposBuscador {
    
    subcatxcat = 'subcatxcat', 
    nombre = 'nombre',
}