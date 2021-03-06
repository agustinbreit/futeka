import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Turno } from './turno.model';
import { createRequestOption } from '../../shared';
import { EstadisticasDTO } from '../../estadisticas/estadisticas/estadisticas.model';

export type EntityResponseType = HttpResponse<Turno>;
export type EntityResponseTypeEstadistica = HttpResponse<EstadisticasDTO>;

@Injectable()
export class TurnoService {

    private resourceUrl =  SERVER_API_URL + 'api/turnos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(turno: Turno): Observable<EntityResponseType> {
        const copy = this.convert(turno);
        return this.http.post<Turno>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(turno: Turno): Observable<EntityResponseType> {
        const copy = this.convert(turno);
        return this.http.put<Turno>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    cancelarTUrnosFuturos(turno: Turno): Observable<EntityResponseType> {
        const copy = this.convert(turno);
        return this.http.post<Turno>(this.resourceUrl + '/cancelarTUrnosFuturos', copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Turno>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByDate(turno: Turno): Observable<EntityResponseType> {
        const copy = this.convert(turno);
        return this.http.post<Turno>(`${this.resourceUrl}/findByDate/`, copy, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findEstadisticasByDates(estadisticas: EstadisticasDTO): Observable<EntityResponseTypeEstadistica> {
        return this.http.post<EstadisticasDTO>(`${this.resourceUrl}/findEstadisticasByDates/`, estadisticas, { observe: 'response'})
            .map((res: EntityResponseTypeEstadistica) => {
                const copy: EstadisticasDTO = Object.assign({}, res.body);
                copy.fechaInicio = this.dateUtils.convertDateTimeFromServer(copy.fechaInicio);
                copy.fechaFin = this.dateUtils.convertDateTimeFromServer(copy.fechaFin);
                const body: EstadisticasDTO = copy;
                return res.clone({body});
            });
    }

    query(req?: any): Observable<HttpResponse<Turno[]>> {
        const options = createRequestOption(req);
        return this.http.get<Turno[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Turno[]>) => this.convertArrayResponse(res));
    }

    findTurnosByCancha(cancha?: any): Observable<HttpResponse<Turno[]>> {
        return this.http.post<Turno[]>(this.resourceUrl + '/findTurnosByCancha', cancha, { observe: 'response' })
            .map((res: HttpResponse<Turno[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Turno = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Turno[]>): HttpResponse<Turno[]> {
        const jsonResponse: Turno[] = res.body;
        const body: Turno[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Turno.
     */
    private convertItemFromServer(turno: Turno): Turno {
        const copy: Turno = Object.assign({}, turno);
        copy.fechaTurno = this.dateUtils
            .convertDateTimeFromServer(turno.fechaTurno);
        return copy;
    }

    /**
     * Convert a Turno to a JSON which can be sent to the server.
     */
    private convert(turno: Turno): Turno {
        const copy: Turno = Object.assign({}, turno);

        //copy.fechaTurno = this.dateUtils.toDate(turno.fechaTurno);
        return copy;
    }
}
