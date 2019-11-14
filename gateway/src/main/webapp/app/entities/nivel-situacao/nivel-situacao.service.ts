import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INivelSituacao } from 'app/shared/model/nivel-situacao.model';

type EntityResponseType = HttpResponse<INivelSituacao>;
type EntityArrayResponseType = HttpResponse<INivelSituacao[]>;

@Injectable({ providedIn: 'root' })
export class NivelSituacaoService {
  public resourceUrl = SERVER_API_URL + 'api/nivel-situacaos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/nivel-situacaos';

  constructor(protected http: HttpClient) {}

  create(nivelSituacao: INivelSituacao): Observable<EntityResponseType> {
    return this.http.post<INivelSituacao>(this.resourceUrl, nivelSituacao, { observe: 'response' });
  }

  update(nivelSituacao: INivelSituacao): Observable<EntityResponseType> {
    return this.http.put<INivelSituacao>(this.resourceUrl, nivelSituacao, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<INivelSituacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INivelSituacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INivelSituacao[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
