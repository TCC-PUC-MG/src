import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEventoBarragem } from 'app/shared/model/evento-barragem.model';

type EntityResponseType = HttpResponse<IEventoBarragem>;
type EntityArrayResponseType = HttpResponse<IEventoBarragem[]>;

@Injectable({ providedIn: 'root' })
export class EventoBarragemService {
  public resourceUrl = SERVER_API_URL + 'api/evento-barragems';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/evento-barragems';

  constructor(protected http: HttpClient) {}

  create(eventoBarragem: IEventoBarragem): Observable<EntityResponseType> {
    return this.http.post<IEventoBarragem>(this.resourceUrl, eventoBarragem, { observe: 'response' });
  }

  update(eventoBarragem: IEventoBarragem): Observable<EntityResponseType> {
    return this.http.put<IEventoBarragem>(this.resourceUrl, eventoBarragem, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEventoBarragem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventoBarragem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEventoBarragem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
