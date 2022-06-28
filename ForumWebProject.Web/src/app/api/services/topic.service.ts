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

import { TopicRequest } from '../models/topic-request';
import { TopicView } from '../models/topic-view';

@Injectable({
  providedIn: 'root',
})
export class TopicService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiTopicGet
   */
  static readonly ApiTopicGetPath = '/api/Topic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<TopicView>>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TopicView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicGet$Plain(params?: {
  }): Observable<Array<TopicView>> {

    return this.apiTopicGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TopicView>>) => r.body as Array<TopicView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<TopicView>>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TopicView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicGet$Json(params?: {
  }): Observable<Array<TopicView>> {

    return this.apiTopicGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TopicView>>) => r.body as Array<TopicView>)
    );
  }

  /**
   * Path part for operation apiTopicPost
   */
  static readonly ApiTopicPostPath = '/api/Topic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTopicPost$Plain$Response(params?: {
    body?: TopicRequest
  }): Observable<StrictHttpResponse<TopicView>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopicView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTopicPost$Plain(params?: {
    body?: TopicRequest
  }): Observable<TopicView> {

    return this.apiTopicPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TopicView>) => r.body as TopicView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTopicPost$Json$Response(params?: {
    body?: TopicRequest
  }): Observable<StrictHttpResponse<TopicView>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopicView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTopicPost$Json(params?: {
    body?: TopicRequest
  }): Observable<TopicView> {

    return this.apiTopicPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TopicView>) => r.body as TopicView)
    );
  }

  /**
   * Path part for operation apiTopicBycategoryIdGet
   */
  static readonly ApiTopicBycategoryIdGetPath = '/api/Topic/bycategory/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicBycategoryIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicBycategoryIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<TopicView>>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicBycategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TopicView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicBycategoryIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicBycategoryIdGet$Plain(params: {
    id: string;
  }): Observable<Array<TopicView>> {

    return this.apiTopicBycategoryIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TopicView>>) => r.body as Array<TopicView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicBycategoryIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicBycategoryIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<TopicView>>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicBycategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TopicView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicBycategoryIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicBycategoryIdGet$Json(params: {
    id: string;
  }): Observable<Array<TopicView>> {

    return this.apiTopicBycategoryIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TopicView>>) => r.body as Array<TopicView>)
    );
  }

  /**
   * Path part for operation apiTopicIdGet
   */
  static readonly ApiTopicIdGetPath = '/api/Topic/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<TopicView>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopicView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicIdGet$Plain(params: {
    id: string;
  }): Observable<TopicView> {

    return this.apiTopicIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<TopicView>) => r.body as TopicView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<TopicView>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopicView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiTopicIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicIdGet$Json(params: {
    id: string;
  }): Observable<TopicView> {

    return this.apiTopicIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<TopicView>) => r.body as TopicView)
    );
  }

  /**
   * Path part for operation apiTopicTopicIdPut
   */
  static readonly ApiTopicTopicIdPutPath = '/api/Topic/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicTopicIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTopicTopicIdPut$Response(params: {
    topicId: string;
    body?: TopicRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicTopicIdPutPath, 'put');
    if (params) {
      rb.path('topicId', params.topicId, {});
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
   * To access the full response (for headers, for example), `apiTopicTopicIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiTopicTopicIdPut(params: {
    topicId: string;
    body?: TopicRequest
  }): Observable<void> {

    return this.apiTopicTopicIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiTopicTopicIdDelete
   */
  static readonly ApiTopicTopicIdDeletePath = '/api/Topic/{topicId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiTopicTopicIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicTopicIdDelete$Response(params: {
    topicId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TopicService.ApiTopicTopicIdDeletePath, 'delete');
    if (params) {
      rb.path('topicId', params.topicId, {});
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
   * To access the full response (for headers, for example), `apiTopicTopicIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiTopicTopicIdDelete(params: {
    topicId: string;
  }): Observable<void> {

    return this.apiTopicTopicIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
