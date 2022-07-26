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

import { RegisterRequest } from '../models/register-request';
import { UserView } from '../models/user-view';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiUsersPost
   */
  static readonly ApiUsersPostPath = '/api/Users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersPost$Response(params?: {
    body?: RegisterRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
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
   * To access the full response (for headers, for example), `apiUsersPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiUsersPost(params?: {
    body?: RegisterRequest
  }): Observable<void> {

    return this.apiUsersPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiUsersPermissionsGet
   */
  static readonly ApiUsersPermissionsGetPath = '/api/Users/permissions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersPermissionsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersPermissionsGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersPermissionsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersPermissionsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersPermissionsGet$Plain(params?: {
  }): Observable<Array<string>> {

    return this.apiUsersPermissionsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersPermissionsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersPermissionsGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersPermissionsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiUsersPermissionsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersPermissionsGet$Json(params?: {
  }): Observable<Array<string>> {

    return this.apiUsersPermissionsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation apiUsersUserIdAddroleRoleIdPut
   */
  static readonly ApiUsersUserIdAddroleRoleIdPutPath = '/api/Users/{userId}/addrole/{roleId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdAddroleRoleIdPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdAddroleRoleIdPut$Response(params: {
    userId: string;
    roleId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdAddroleRoleIdPutPath, 'put');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('roleId', params.roleId, {});
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
   * To access the full response (for headers, for example), `apiUsersUserIdAddroleRoleIdPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdAddroleRoleIdPut(params: {
    userId: string;
    roleId: string;
  }): Observable<void> {

    return this.apiUsersUserIdAddroleRoleIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiUsersUserIdRemoveroleRoleIdPut
   */
  static readonly ApiUsersUserIdRemoveroleRoleIdPutPath = '/api/Users/{userId}/removerole/{roleId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiUsersUserIdRemoveroleRoleIdPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdRemoveroleRoleIdPut$Response(params: {
    userId: string;
    roleId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersUserIdRemoveroleRoleIdPutPath, 'put');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.path('roleId', params.roleId, {});
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
   * To access the full response (for headers, for example), `apiUsersUserIdRemoveroleRoleIdPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiUsersUserIdRemoveroleRoleIdPut(params: {
    userId: string;
    roleId: string;
  }): Observable<void> {

    return this.apiUsersUserIdRemoveroleRoleIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


    /**
   * Path part for operation apiUsersEmailEmailGet
   */
     static readonly ApiUsersEmailEmailGetPath = '/api/Users/email/{email}';

     /**
      * This method provides access to the full `HttpResponse`, allowing access to response headers.
      * To access only the response body, use `apiUsersEmailEmailGet$Plain()` instead.
      *
      * This method doesn't expect any request body.
      */
     apiUsersEmailEmailGet$Plain$Response(params: {
       email: string;
     }): Observable<StrictHttpResponse<UserView>> {
   
       const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersEmailEmailGetPath, 'get');
       if (params) {
         rb.path('email', params.email, {});
       }
   
       return this.http.request(rb.build({
         responseType: 'text',
         accept: 'text/plain'
       })).pipe(
         filter((r: any) => r instanceof HttpResponse),
         map((r: HttpResponse<any>) => {
           return r as StrictHttpResponse<UserView>;
         })
       );
     }
   
     /**
      * This method provides access to only to the response body.
      * To access the full response (for headers, for example), `apiUsersEmailEmailGet$Plain$Response()` instead.
      *
      * This method doesn't expect any request body.
      */
     apiUsersEmailEmailGet$Plain(params: {
       email: string;
     }): Observable<UserView> {
   
       return this.apiUsersEmailEmailGet$Plain$Response(params).pipe(
         map((r: StrictHttpResponse<UserView>) => r.body as UserView)
       );
     }
   
     /**
      * This method provides access to the full `HttpResponse`, allowing access to response headers.
      * To access only the response body, use `apiUsersEmailEmailGet$Json()` instead.
      *
      * This method doesn't expect any request body.
      */
     apiUsersEmailEmailGet$Json$Response(params: {
       email: string;
     }): Observable<StrictHttpResponse<UserView>> {
   
       const rb = new RequestBuilder(this.rootUrl, UsersService.ApiUsersEmailEmailGetPath, 'get');
       if (params) {
         rb.path('email', params.email, {});
       }
   
       return this.http.request(rb.build({
         responseType: 'json',
         accept: 'text/json'
       })).pipe(
         filter((r: any) => r instanceof HttpResponse),
         map((r: HttpResponse<any>) => {
           return r as StrictHttpResponse<UserView>;
         })
       );
     }
   
     /**
      * This method provides access to only to the response body.
      * To access the full response (for headers, for example), `apiUsersEmailEmailGet$Json$Response()` instead.
      *
      * This method doesn't expect any request body.
      */
     apiUsersEmailEmailGet$Json(params: {
       email: string;
     }): Observable<UserView> {
   
       return this.apiUsersEmailEmailGet$Json$Response(params).pipe(
         map((r: StrictHttpResponse<UserView>) => r.body as UserView)
       );
     }

}


