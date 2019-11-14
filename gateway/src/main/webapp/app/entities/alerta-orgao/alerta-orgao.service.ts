import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAlertaOrgao } from 'app/shared/model/alerta-orgao.model';

type EntityResponseType = HttpResponse<IAlertaOrgao>;
type EntityArrayResponseType = HttpResponse<IAlertaOrgao[]>;

@Injectable({ providedIn: 'root' })
export class AlertaOrgaoService {
  public resourceUrl = SERVER_API_URL + 'api/alerta-orgaos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/alerta-orgaos';

  constructor(protected http: HttpClient) {}

  create(alertaOrgao: IAlertaOrgao): Observable<EntityResponseType> {
    return this.http.post<IAlertaOrgao>(this.resourceUrl, alertaOrgao, { observe: 'response' });
  }

  update(alertaOrgao: IAlertaOrgao): Observable<EntityResponseType> {
    return this.http.put<IAlertaOrgao>(this.resourceUrl, alertaOrgao, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IAlertaOrgao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlertaOrgao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlertaOrgao[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
