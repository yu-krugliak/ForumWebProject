/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { RoleRequest } from '../models/role-request';
import { RoleView } from '../models/role-view';

@Injectable({
  providedIn: 'root',
})
export class RolesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiRolesGet
   */
  static readonly ApiRolesGetPath = '/api/Roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RoleView>>> {

    const rb = new RequestBuilder(this.rootUrl, RolesService.ApiRolesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RoleView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiRolesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Plain(params?: {
  }): Observable<Array<RoleView>> {

    return this.apiRolesGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RoleView>>) => r.body as Array<RoleView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RoleView>>> {

    const rb = new RequestBuilder(this.rootUrl, RolesService.ApiRolesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RoleView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiRolesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Json(params?: {
  }): Observable<Array<RoleView>> {

    return this.apiRolesGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RoleView>>) => r.body as Array<RoleView>)
    );
  }

  /**
   * Path part for operation apiRolesPost
   */
  static readonly ApiRolesPostPath = '/api/Roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRolesPost$Plain$Response(params?: {
    body?: RoleRequest
  }): Observable<StrictHttpResponse<RoleView>> {

    const rb = new RequestBuilder(this.rootUrl, RolesService.ApiRolesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiRolesPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRolesPost$Plain(params?: {
    body?: RoleRequest
  }): Observable<RoleView> {

    return this.apiRolesPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<RoleView>) => r.body as RoleView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRolesPost$Json$Response(params?: {
    body?: RoleRequest
  }): Observable<StrictHttpResponse<RoleView>> {

    const rb = new RequestBuilder(this.rootUrl, RolesService.ApiRolesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiRolesPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiRolesPost$Json(params?: {
    body?: RoleRequest
  }): Observable<RoleView> {

    return this.apiRolesPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<RoleView>) => r.body as RoleView)
    );
  }

  /**
   * Path part for operation apiRolesIdGet
   */
  static readonly ApiRolesIdGetPath = '/api/Roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<RoleView>> {

    const rb = new RequestBuilder(this.rootUrl, RolesService.ApiRolesIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiRolesIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesIdGet$Plain(params: {
    id: string;
  }): Observable<RoleView> {

    return this.apiRolesIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<RoleView>) => r.body as RoleView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<RoleView>> {

    const rb = new RequestBuilder(this.rootUrl, RolesService.ApiRolesIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RoleView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiRolesIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesIdGet$Json(params: {
    id: string;
  }): Observable<RoleView> {

    return this.apiRolesIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<RoleView>) => r.body as RoleView)
    );
  }

}
