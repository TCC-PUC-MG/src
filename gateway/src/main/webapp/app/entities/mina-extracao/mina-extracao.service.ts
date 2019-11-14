import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMinaExtracao } from 'app/shared/model/mina-extracao.model';

type EntityResponseType = HttpResponse<IMinaExtracao>;
type EntityArrayResponseType = HttpResponse<IMinaExtracao[]>;

@Injectable({ providedIn: 'root' })
export class MinaExtracaoService {
  public resourceUrl = SERVER_API_URL + 'api/mina-extracaos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/mina-extracaos';

  constructor(protected http: HttpClient) {}

  create(minaExtracao: IMinaExtracao): Observable<EntityResponseType> {
    return this.http.post<IMinaExtracao>(this.resourceUrl, minaExtracao, { observe: 'response' });
  }

  update(minaExtracao: IMinaExtracao): Observable<EntityResponseType> {
    return this.http.put<IMinaExtracao>(this.resourceUrl, minaExtracao, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IMinaExtracao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMinaExtracao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMinaExtracao[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
