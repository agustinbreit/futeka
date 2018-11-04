import { Component, OnInit } from '@angular/core';
import { Cancha, CanchaService } from '../../entities/cancha';
import { HttpResponse } from '@angular/common/http';
import { Turno, TurnoService } from '../../entities/turno';

@Component({
  selector: 'jhi-turnos-custom',
  templateUrl: './turnos-custom.component.html',
  styles: []
})
export class TurnosCustomComponent implements OnInit {
    canchas: Cancha[];
    now: any;
    constructor(private canchaService: CanchaService, private turnosService: TurnoService) { }

    ngOnInit() {
        this.findCanchasAndTurnos(new Date());
    }

    findCanchasAndTurnos(date?: Date) {
        const now = date;
        now.setHours(13);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);

        this.canchaService.query()
            .subscribe((res: HttpResponse<Cancha[]>) => {
                    this.canchas = res.body;
                    for(const cancha of this.canchas) {
                        const turno = new Turno();
                        turno.cancha = cancha;
                        turno.diaDeSemana = now.getDay();
                        turno.fechaTurno = now;
                        this.turnosService.query();
                    }
                },
            );
    }

}
