import { BaseEntity } from './../../shared';

export enum EstadoTurnoEnum {
    'LIBRE',
    'RESERVADO',
    'CANCELADO',
    'ASISTIDO'
}

export class Turno implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public telefono?: string,
        public fechaTurno?: any,
        public diaDeSemana?: number,
        public turnoFijo?: boolean,
        public estado?: string,
        public cancha?: BaseEntity,
    ) {
        this.turnoFijo = false;
    }
}
