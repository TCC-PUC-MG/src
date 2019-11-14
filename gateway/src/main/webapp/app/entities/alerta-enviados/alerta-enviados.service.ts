import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAlertaEnviados } from 'app/shared/model/alerta-enviados.model';

type EntityResponseType = HttpResponse<IAlertaEnviados>;
type EntityArrayResponseType = HttpResponse<IAlertaEnviados[]>;

@Injectable({ providedIn: 'root' })
export class AlertaEnviadosService {
  public resourceUrl = SERVER_API_URL + 'api/alerta-enviados';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/alerta-enviados';

  constructor(protected http: HttpClient) {}

  create(alertaEnviados: IAlertaEnviados): Observable<EntityResponseType> {
    return this.http.post<IAlertaEnviados>(this.resourceUrl, alertaEnviados, { observe: 'response' });
  }

  update(alertaEnviados: IAlertaEnviados): Observable<EntityResponseType> {
    return this.http.put<IAlertaEnviados>(this.resourceUrl, alertaEnviados, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IAlertaEnviados>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlertaEnviados[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlertaEnviados[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
