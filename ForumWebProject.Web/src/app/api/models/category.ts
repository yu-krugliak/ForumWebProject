import { TopicView } from './topic-view';
/* tslint:disable */
/* eslint-disable */
export interface Category {
  description?: null | string;
  id?: string;
  name?: null | string;
  parentCategoryId?: null | string;
  topics? : TopicView[];
}
