export interface News extends Document {
    id: string;
    title: string;
    subTitle: string;
    text: string;
    imageURL: string;
    ishidden: boolean;
}