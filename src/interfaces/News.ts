import { IUser } from './User';

export interface News extends Document {
    id: string;
    title: string;
    subTitle: string;
    text: string;
    imageURL: string;
    ishidden: boolean;
    _createdBy: IUser["userId"];
}