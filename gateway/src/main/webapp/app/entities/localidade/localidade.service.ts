import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalidade } from 'app/shared/model/localidade.model';

type EntityResponseType = HttpResponse<ILocalidade>;
type EntityArrayResponseType = HttpResponse<ILocalidade[]>;

@Injectable({ providedIn: 'root' })
export class LocalidadeService {
  public resourceUrl = SERVER_API_URL + 'api/localidades';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/localidades';

  constructor(protected http: HttpClient) {}

  create(localidade: ILocalidade): Observable<EntityResponseType> {
    return this.http.post<ILocalidade>(this.resourceUrl, localidade, { observe: 'response' });
  }

  update(localidade: ILocalidade): Observable<EntityResponseType> {
    return this.http.put<ILocalidade>(this.resourceUrl, localidade, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILocalidade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalidade[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalidade[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
