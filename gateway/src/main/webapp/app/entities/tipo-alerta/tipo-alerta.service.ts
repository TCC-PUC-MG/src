import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoAlerta } from 'app/shared/model/tipo-alerta.model';

type EntityResponseType = HttpResponse<ITipoAlerta>;
type EntityArrayResponseType = HttpResponse<ITipoAlerta[]>;

@Injectable({ providedIn: 'root' })
export class TipoAlertaService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-alertas';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-alertas';

  constructor(protected http: HttpClient) {}

  create(tipoAlerta: ITipoAlerta): Observable<EntityResponseType> {
    return this.http.post<ITipoAlerta>(this.resourceUrl, tipoAlerta, { observe: 'response' });
  }

  update(tipoAlerta: ITipoAlerta): Observable<EntityResponseType> {
    return this.http.put<ITipoAlerta>(this.resourceUrl, tipoAlerta, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITipoAlerta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoAlerta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoAlerta[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
