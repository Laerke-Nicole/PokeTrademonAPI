export interface News extends Document {
  id: string;
  title: string;
  subTitle: string;
  text: string;
  imageURL: string;
  date: string;
  theme: string;
  isHidden: boolean;
  userId: string;
}