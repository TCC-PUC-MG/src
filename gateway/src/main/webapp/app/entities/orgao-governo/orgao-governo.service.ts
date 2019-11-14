import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrgaoGoverno } from 'app/shared/model/orgao-governo.model';

type EntityResponseType = HttpResponse<IOrgaoGoverno>;
type EntityArrayResponseType = HttpResponse<IOrgaoGoverno[]>;

@Injectable({ providedIn: 'root' })
export class OrgaoGovernoService {
  public resourceUrl = SERVER_API_URL + 'api/orgao-governos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/orgao-governos';

  constructor(protected http: HttpClient) {}

  create(orgaoGoverno: IOrgaoGoverno): Observable<EntityResponseType> {
    return this.http.post<IOrgaoGoverno>(this.resourceUrl, orgaoGoverno, { observe: 'response' });
  }

  update(orgaoGoverno: IOrgaoGoverno): Observable<EntityResponseType> {
    return this.http.put<IOrgaoGoverno>(this.resourceUrl, orgaoGoverno, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IOrgaoGoverno>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrgaoGoverno[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrgaoGoverno[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
