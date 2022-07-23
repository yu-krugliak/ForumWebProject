/* tslint:disable */
/* eslint-disable */
export interface PostView {
  datePosted?: string;
  id?: string;
  postNumber?: number;
  text?: null | string;

  topicId?: string;
  userIdCreated?: string;
  replyToPostId?: undefined | string;

  userName?: string;
  userFirstName?: string;
  userLastName?: string;
  userRegistrationDate?:  any;

  // replyToUser?: null | string;
  // replyToText?: null | string;
  replyTo?: PostView | null;
}
