import { Cancha } from '../../entities/cancha';

export class EstadisticasDTO {
    constructor(
        public fechaInicio?: any,
        public fechaFin?: any,
        public turnosAsistidos?: number,
        public turnosNoAsistidos?: number,
        public reservasTotales?: number,
        public gananciaTotal?: number,
        public perdidaTotal?: number,
        public cancha?: Cancha
    ) {
    }
}
