import { BaseEntity } from './../../shared';
import { Turno } from '../turno';

export enum TipoCanchaEnum {
    'CINCO',
    'SEIS',
    'SIETE'
}

export class Cancha implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipo?: TipoCanchaEnum,
        public precio?: number,
        public turnos?: Turno[],
    ) {
    }
}
