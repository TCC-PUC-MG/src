import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOcorrencias } from 'app/shared/model/ocorrencias.model';

type EntityResponseType = HttpResponse<IOcorrencias>;
type EntityArrayResponseType = HttpResponse<IOcorrencias[]>;

@Injectable({ providedIn: 'root' })
export class OcorrenciasService {
  public resourceUrl = SERVER_API_URL + 'api/ocorrencias';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/ocorrencias';

  constructor(protected http: HttpClient) {}

  create(ocorrencias: IOcorrencias): Observable<EntityResponseType> {
    return this.http.post<IOcorrencias>(this.resourceUrl, ocorrencias, { observe: 'response' });
  }

  update(ocorrencias: IOcorrencias): Observable<EntityResponseType> {
    return this.http.put<IOcorrencias>(this.resourceUrl, ocorrencias, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IOcorrencias>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOcorrencias[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOcorrencias[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
