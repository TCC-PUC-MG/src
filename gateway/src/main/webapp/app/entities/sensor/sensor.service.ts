import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISensor } from 'app/shared/model/sensor.model';

type EntityResponseType = HttpResponse<ISensor>;
type EntityArrayResponseType = HttpResponse<ISensor[]>;

@Injectable({ providedIn: 'root' })
export class SensorService {
  public resourceUrl = SERVER_API_URL + 'api/sensors';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/sensors';

  constructor(protected http: HttpClient) {}

  create(sensor: ISensor): Observable<EntityResponseType> {
    return this.http.post<ISensor>(this.resourceUrl, sensor, { observe: 'response' });
  }

  update(sensor: ISensor): Observable<EntityResponseType> {
    return this.http.put<ISensor>(this.resourceUrl, sensor, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISensor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISensor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISensor[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
