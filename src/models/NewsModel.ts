import { Schema, model, Query } from 'mongoose';
import { News } from '../interfaces/news';

const newsSchema = new Schema<News>({
    title: { type: String, required: true, min: 6, max: 255 },
    subTitle: { type: String, required: true, min: 6, max: 255 },
    text: { type: String, required: true, min: 6, max: 1024 },
    imageURL: { type: String, required: true },
    ishidden: { type: Boolean, required: false }
});


// define how its being updated in mongoose
type UpdateQuery<T> = {
    [key: string]: unknown;
} & {
    __v?: number;
    $set?: Partial<T> & { __v?: number };
    $setOnInsert?: Partial<T> & { __v?: number };
    $inc?: { __v?: number };
};


// define news schema in mongoose  
newsSchema.pre<Query<News, News>>('findOneAndUpdate', function () {
    const update = this.getUpdate() as UpdateQuery<News>;
    if (update.__v != null) {
        delete update.__v;
    }
    const keys: Array<'$set' | '$setOnInsert'> = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key]!.__v != null) {
            delete update[key]!.__v;
            if (Object.keys(update[key]!).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});

export const newsModel = model<News>("News", newsSchema);