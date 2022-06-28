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

import { PostRequest } from '../models/post-request';
import { PostView } from '../models/post-view';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPostsGet
   */
  static readonly ApiPostsGetPath = '/api/Posts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsGet$Plain(params?: {
  }): Observable<Array<PostView>> {

    return this.apiPostsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsGet$Json(params?: {
  }): Observable<Array<PostView>> {

    return this.apiPostsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * Path part for operation apiPostsPost
   */
  static readonly ApiPostsPostPath = '/api/Posts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPostsPost$Plain$Response(params?: {
    body?: PostRequest
  }): Observable<StrictHttpResponse<PostView>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PostView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPostsPost$Plain(params?: {
    body?: PostRequest
  }): Observable<PostView> {

    return this.apiPostsPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PostView>) => r.body as PostView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPostsPost$Json$Response(params?: {
    body?: PostRequest
  }): Observable<StrictHttpResponse<PostView>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PostView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPostsPost$Json(params?: {
    body?: PostRequest
  }): Observable<PostView> {

    return this.apiPostsPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PostView>) => r.body as PostView)
    );
  }

  /**
   * Path part for operation apiPostsBytopicIdGet
   */
  static readonly ApiPostsBytopicIdGetPath = '/api/Posts/bytopic/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsBytopicIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytopicIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsBytopicIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsBytopicIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytopicIdGet$Plain(params: {
    id: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsBytopicIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsBytopicIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytopicIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsBytopicIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsBytopicIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytopicIdGet$Json(params: {
    id: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsBytopicIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * Path part for operation apiPostsByuserIdGet
   */
  static readonly ApiPostsByuserIdGetPath = '/api/Posts/byuser/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsByuserIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsByuserIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsByuserIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsByuserIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsByuserIdGet$Plain(params: {
    id: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsByuserIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsByuserIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsByuserIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsByuserIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsByuserIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsByuserIdGet$Json(params: {
    id: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsByuserIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * Path part for operation apiPostsBytextmessageTextGet
   */
  static readonly ApiPostsBytextmessageTextGetPath = '/api/Posts/bytextmessage/{text}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsBytextmessageTextGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytextmessageTextGet$Plain$Response(params: {
    text: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsBytextmessageTextGetPath, 'get');
    if (params) {
      rb.path('text', params.text, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsBytextmessageTextGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytextmessageTextGet$Plain(params: {
    text: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsBytextmessageTextGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsBytextmessageTextGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytextmessageTextGet$Json$Response(params: {
    text: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsBytextmessageTextGetPath, 'get');
    if (params) {
      rb.path('text', params.text, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsBytextmessageTextGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsBytextmessageTextGet$Json(params: {
    text: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsBytextmessageTextGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * Path part for operation apiPostsFromdateStartDateTodateEndDateGet
   */
  static readonly ApiPostsFromdateStartDateTodateEndDateGetPath = '/api/Posts/fromdate/{startDate}/todate/{endDate}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsFromdateStartDateTodateEndDateGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsFromdateStartDateTodateEndDateGet$Plain$Response(params: {
    startDate: string;
    endDate: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsFromdateStartDateTodateEndDateGetPath, 'get');
    if (params) {
      rb.path('startDate', params.startDate, {});
      rb.path('endDate', params.endDate, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsFromdateStartDateTodateEndDateGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsFromdateStartDateTodateEndDateGet$Plain(params: {
    startDate: string;
    endDate: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsFromdateStartDateTodateEndDateGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsFromdateStartDateTodateEndDateGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsFromdateStartDateTodateEndDateGet$Json$Response(params: {
    startDate: string;
    endDate: string;
  }): Observable<StrictHttpResponse<Array<PostView>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsFromdateStartDateTodateEndDateGetPath, 'get');
    if (params) {
      rb.path('startDate', params.startDate, {});
      rb.path('endDate', params.endDate, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsFromdateStartDateTodateEndDateGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsFromdateStartDateTodateEndDateGet$Json(params: {
    startDate: string;
    endDate: string;
  }): Observable<Array<PostView>> {

    return this.apiPostsFromdateStartDateTodateEndDateGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostView>>) => r.body as Array<PostView>)
    );
  }

  /**
   * Path part for operation apiPostsIdGet
   */
  static readonly ApiPostsIdGetPath = '/api/Posts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<PostView>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PostView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsIdGet$Plain(params: {
    id: string;
  }): Observable<PostView> {

    return this.apiPostsIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PostView>) => r.body as PostView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<PostView>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PostView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPostsIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsIdGet$Json(params: {
    id: string;
  }): Observable<PostView> {

    return this.apiPostsIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PostView>) => r.body as PostView)
    );
  }

  /**
   * Path part for operation apiPostsPostIdPut
   */
  static readonly ApiPostsPostIdPutPath = '/api/Posts/{postId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsPostIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPostsPostIdPut$Response(params: {
    postId: string;
    body?: PostRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsPostIdPutPath, 'put');
    if (params) {
      rb.path('postId', params.postId, {});
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
   * To access the full response (for headers, for example), `apiPostsPostIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPostsPostIdPut(params: {
    postId: string;
    body?: PostRequest
  }): Observable<void> {

    return this.apiPostsPostIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPostsPostIdDelete
   */
  static readonly ApiPostsPostIdDeletePath = '/api/Posts/{postId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPostsPostIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsPostIdDelete$Response(params: {
    postId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.ApiPostsPostIdDeletePath, 'delete');
    if (params) {
      rb.path('postId', params.postId, {});
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
   * To access the full response (for headers, for example), `apiPostsPostIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPostsPostIdDelete(params: {
    postId: string;
  }): Observable<void> {

    return this.apiPostsPostIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
