import { TopicView } from './../api/models/topic-view';

export interface DialogData {
   topic: TopicView;
   addTopicFlag: boolean;
   confirmPost: boolean;
}