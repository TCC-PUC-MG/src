import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEventoRisco } from 'app/shared/model/evento-risco.model';

type EntityResponseType = HttpResponse<IEventoRisco>;
type EntityArrayResponseType = HttpResponse<IEventoRisco[]>;

@Injectable({ providedIn: 'root' })
export class EventoRiscoService {
  public resourceUrl = SERVER_API_URL + 'api/evento-riscos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/evento-riscos';

  constructor(protected http: HttpClient) {}

  create(eventoRisco: IEventoRisco): Observable<EntityResponseType> {
    return this.http.post<IEventoRisco>(this.resourceUrl, eventoRisco, { observe: 'response' });
  }

  update(eventoRisco: IEventoRisco): Observable<EntityResponseType> {
    return this.http.put<IEventoRisco>(this.resourceUrl, eventoRisco, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEventoRisco>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventoRisco[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventoRisco[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
