import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INivelSeguranca } from 'app/shared/model/nivel-seguranca.model';

type EntityResponseType = HttpResponse<INivelSeguranca>;
type EntityArrayResponseType = HttpResponse<INivelSeguranca[]>;

@Injectable({ providedIn: 'root' })
export class NivelSegurancaService {
  public resourceUrl = SERVER_API_URL + 'api/nivel-segurancas';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/nivel-segurancas';

  constructor(protected http: HttpClient) {}

  create(nivelSeguranca: INivelSeguranca): Observable<EntityResponseType> {
    return this.http.post<INivelSeguranca>(this.resourceUrl, nivelSeguranca, { observe: 'response' });
  }

  update(nivelSeguranca: INivelSeguranca): Observable<EntityResponseType> {
    return this.http.put<INivelSeguranca>(this.resourceUrl, nivelSeguranca, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<INivelSeguranca>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INivelSeguranca[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INivelSeguranca[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
