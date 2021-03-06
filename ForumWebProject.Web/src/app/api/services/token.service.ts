/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

import { TokenRequest } from '../models/token-request';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root',
})
export class TokenService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTokenPost
   */
  static readonly ApiTokenPostPath = '/api/Token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTokenPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokenPost$Response(params?: {
    body?: TokenRequest
  }): Observable<StrictHttpResponse<TokenResponse>> {

    const rb = new RequestBuilder(this.rootUrl, TokenService.ApiTokenPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenResponse>;
      })
    );
  }

  apiTokenPost$ResponseWithError(params?: {
    body?: TokenRequest
  }): Observable<HttpErrorResponse> {

    const rb = new RequestBuilder(this.rootUrl, TokenService.ApiTokenPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpErrorResponse),
      // catchError((error: string) => {
      //   console.log("Error occured, plz help");
      //   console.log(error);
      //   return error;
      // }),
      map((r: any) => {
        return r as HttpErrorResponse;
      }),
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTokenPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTokenPost(params?: {
    body?: TokenRequest
  }): Observable<TokenResponse> {

    return this.apiTokenPost$Response(params).pipe(
      map((r: StrictHttpResponse<TokenResponse>) => r.body as TokenResponse)
    );
  }

}
