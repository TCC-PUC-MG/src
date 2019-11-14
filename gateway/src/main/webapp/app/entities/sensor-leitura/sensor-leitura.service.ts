import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISensorLeitura } from 'app/shared/model/sensor-leitura.model';

type EntityResponseType = HttpResponse<ISensorLeitura>;
type EntityArrayResponseType = HttpResponse<ISensorLeitura[]>;

@Injectable({ providedIn: 'root' })
export class SensorLeituraService {
  public resourceUrl = SERVER_API_URL + 'api/sensor-leituras';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/sensor-leituras';

  constructor(protected http: HttpClient) {}

  create(sensorLeitura: ISensorLeitura): Observable<EntityResponseType> {
    return this.http.post<ISensorLeitura>(this.resourceUrl, sensorLeitura, { observe: 'response' });
  }

  update(sensorLeitura: ISensorLeitura): Observable<EntityResponseType> {
    return this.http.put<ISensorLeitura>(this.resourceUrl, sensorLeitura, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISensorLeitura>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISensorLeitura[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISensorLeitura[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
