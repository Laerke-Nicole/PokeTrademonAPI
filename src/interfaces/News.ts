export interface News extends Document {
  id: string;
  title: string;
  subTitle: string;
  text: string;
  imageURL: string;
  date: string;
  theme: string;
  ishidden: boolean;
  userId: string;
}