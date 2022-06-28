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

import { CategoryRequest } from '../models/category-request';
import { CategoryView } from '../models/category-view';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiCategoriesGet
   */
  static readonly ApiCategoriesGetPath = '/api/Categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CategoryView>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesGet$Plain(params?: {
  }): Observable<Array<CategoryView>> {

    return this.apiCategoriesGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryView>>) => r.body as Array<CategoryView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<Array<CategoryView>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesGet$Json(params?: {
  }): Observable<Array<CategoryView>> {

    return this.apiCategoriesGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryView>>) => r.body as Array<CategoryView>)
    );
  }

  /**
   * Path part for operation apiCategoriesPost
   */
  static readonly ApiCategoriesPostPath = '/api/Categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoriesPost$Plain$Response(params?: {
    body?: CategoryRequest
  }): Observable<StrictHttpResponse<CategoryView>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoriesPost$Plain(params?: {
    body?: CategoryRequest
  }): Observable<CategoryView> {

    return this.apiCategoriesPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryView>) => r.body as CategoryView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoriesPost$Json$Response(params?: {
    body?: CategoryRequest
  }): Observable<StrictHttpResponse<CategoryView>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoriesPost$Json(params?: {
    body?: CategoryRequest
  }): Observable<CategoryView> {

    return this.apiCategoriesPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryView>) => r.body as CategoryView)
    );
  }

  /**
   * Path part for operation apiCategoriesByparentIdGet
   */
  static readonly ApiCategoriesByparentIdGetPath = '/api/Categories/byparent/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesByparentIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesByparentIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<CategoryView>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesByparentIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesByparentIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesByparentIdGet$Plain(params: {
    id: string;
  }): Observable<Array<CategoryView>> {

    return this.apiCategoriesByparentIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryView>>) => r.body as Array<CategoryView>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesByparentIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesByparentIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<CategoryView>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesByparentIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryView>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesByparentIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesByparentIdGet$Json(params: {
    id: string;
  }): Observable<Array<CategoryView>> {

    return this.apiCategoriesByparentIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryView>>) => r.body as Array<CategoryView>)
    );
  }

  /**
   * Path part for operation apiCategoriesIdGet
   */
  static readonly ApiCategoriesIdGetPath = '/api/Categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesIdGet$Plain$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<CategoryView>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesIdGet$Plain(params: {
    id: string;
  }): Observable<CategoryView> {

    return this.apiCategoriesIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryView>) => r.body as CategoryView)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesIdGet$Json$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<CategoryView>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryView>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiCategoriesIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesIdGet$Json(params: {
    id: string;
  }): Observable<CategoryView> {

    return this.apiCategoriesIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryView>) => r.body as CategoryView)
    );
  }

  /**
   * Path part for operation apiCategoriesCategoryIdPut
   */
  static readonly ApiCategoriesCategoryIdPutPath = '/api/Categories/{categoryId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesCategoryIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoriesCategoryIdPut$Response(params: {
    categoryId: string;
    body?: CategoryRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesCategoryIdPutPath, 'put');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
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
   * To access the full response (for headers, for example), `apiCategoriesCategoryIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoriesCategoryIdPut(params: {
    categoryId: string;
    body?: CategoryRequest
  }): Observable<void> {

    return this.apiCategoriesCategoryIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiCategoriesCategoryIdDelete
   */
  static readonly ApiCategoriesCategoryIdDeletePath = '/api/Categories/{categoryId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoriesCategoryIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesCategoryIdDelete$Response(params: {
    categoryId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.ApiCategoriesCategoryIdDeletePath, 'delete');
    if (params) {
      rb.path('categoryId', params.categoryId, {});
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
   * To access the full response (for headers, for example), `apiCategoriesCategoryIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoriesCategoryIdDelete(params: {
    categoryId: string;
  }): Observable<void> {

    return this.apiCategoriesCategoryIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
