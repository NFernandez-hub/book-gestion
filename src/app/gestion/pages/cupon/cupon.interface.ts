export interface Cupon {

    ok: boolean,
    _id?: string,
    nombre?: string,
    codigo?: string,
    usos?: 1,
    valor?: number,
    porcentaje?: number,
    tipo?: TipoCupon,
    usuario?: {
        _id?: string,
        nombre?: string
    }
}

export enum TipoCupon {

    GIFT_CARD = "GIFT_CARD",
    VOUCHER = "VOUCHER"
}

export enum TiposBuscador {
    
}