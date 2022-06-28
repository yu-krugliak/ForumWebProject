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


@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPermissionsGet
   */
  static readonly ApiPermissionsGetPath = '/api/Permissions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPermissionsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsGet$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.ApiPermissionsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPermissionsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsGet(params?: {
  }): Observable<void> {

    return this.apiPermissionsGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPermissionsIdGet
   */
  static readonly ApiPermissionsIdGetPath = '/api/Permissions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPermissionsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsIdGet$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.ApiPermissionsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPermissionsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsIdGet(params: {
    id: string;
  }): Observable<void> {

    return this.apiPermissionsIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPermissionsGrantPut
   */
  static readonly ApiPermissionsGrantPutPath = '/api/Permissions/grant';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPermissionsGrantPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsGrantPut$Response(params?: {
    roleId?: string;
    permissionId?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.ApiPermissionsGrantPutPath, 'put');
    if (params) {
      rb.query('roleId', params.roleId, {});
      rb.query('permissionId', params.permissionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPermissionsGrantPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsGrantPut(params?: {
    roleId?: string;
    permissionId?: string;
  }): Observable<void> {

    return this.apiPermissionsGrantPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPermissionsRevokePut
   */
  static readonly ApiPermissionsRevokePutPath = '/api/Permissions/revoke';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPermissionsRevokePut()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsRevokePut$Response(params?: {
    roleId?: string;
    permissionId?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.ApiPermissionsRevokePutPath, 'put');
    if (params) {
      rb.query('roleId', params.roleId, {});
      rb.query('permissionId', params.permissionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPermissionsRevokePut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPermissionsRevokePut(params?: {
    roleId?: string;
    permissionId?: string;
  }): Observable<void> {

    return this.apiPermissionsRevokePut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
