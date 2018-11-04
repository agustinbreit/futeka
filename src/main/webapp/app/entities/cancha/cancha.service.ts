import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Cancha } from './cancha.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Cancha>;

@Injectable()
export class CanchaService {

    private resourceUrl =  SERVER_API_URL + 'api/canchas';

    constructor(private http: HttpClient) { }

    create(cancha: Cancha): Observable<EntityResponseType> {
        const copy = this.convert(cancha);
        return this.http.post<Cancha>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cancha: Cancha): Observable<EntityResponseType> {
        const copy = this.convert(cancha);
        return this.http.put<Cancha>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Cancha>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Cancha[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cancha[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Cancha[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Cancha = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Cancha[]>): HttpResponse<Cancha[]> {
        const jsonResponse: Cancha[] = res.body;
        const body: Cancha[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Cancha.
     */
    private convertItemFromServer(cancha: Cancha): Cancha {
        const copy: Cancha = Object.assign({}, cancha);
        return copy;
    }

    /**
     * Convert a Cancha to a JSON which can be sent to the server.
     */
    private convert(cancha: Cancha): Cancha {
        const copy: Cancha = Object.assign({}, cancha);
        return copy;
    }
}
