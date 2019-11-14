import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRiscoBarragem } from 'app/shared/model/risco-barragem.model';

type EntityResponseType = HttpResponse<IRiscoBarragem>;
type EntityArrayResponseType = HttpResponse<IRiscoBarragem[]>;

@Injectable({ providedIn: 'root' })
export class RiscoBarragemService {
  public resourceUrl = SERVER_API_URL + 'api/risco-barragems';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/risco-barragems';

  constructor(protected http: HttpClient) {}

  create(riscoBarragem: IRiscoBarragem): Observable<EntityResponseType> {
    return this.http.post<IRiscoBarragem>(this.resourceUrl, riscoBarragem, { observe: 'response' });
  }

  update(riscoBarragem: IRiscoBarragem): Observable<EntityResponseType> {
    return this.http.put<IRiscoBarragem>(this.resourceUrl, riscoBarragem, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IRiscoBarragem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRiscoBarragem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRiscoBarragem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
