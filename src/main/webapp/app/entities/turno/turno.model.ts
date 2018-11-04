import { BaseEntity } from './../../shared';

export const enum EstadoTurnoEnum {
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
        public estado?: EstadoTurnoEnum,
        public cancha?: BaseEntity,
    ) {
        this.turnoFijo = false;
    }
}
