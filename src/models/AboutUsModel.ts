import { Schema, model, Query } from 'mongoose';
import { AboutUs } from '../interfaces/AboutUs';

const aboutUsSchema = new Schema<AboutUs>({
    aboutUsTitle: { type: String, required: true, min: 2, max: 100 },
    aboutUsText: { type: String, required: true, min: 6, max: 255 },
    mission: { type: String, required: true, min: 2, max: 255 },
    vision: { type: String, required: true, min: 2, max: 255 },
    valuesSubTitle: { type: String, required: true, min: 2, max: 100 },
    valueOneTitle: { type: String, required: true, min: 2, max: 100 },
    valueOne: { type: String, required: true, min: 2, max: 255 },
    valueTwoTitle: { type: String, required: true, min: 2, max: 100 },
    valueTwo: { type: String, required: true, min: 2, max: 255 },
    valueThreeTitle: { type: String, required: true, min: 2, max: 100 },
    valueThree: { type: String, required: true, min: 2, max: 255 },
    imageURL: { type: String, required: true },
    userId: { type: String, required: true },
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


// define about us schema in mongoose  
aboutUsSchema.pre<Query<AboutUs, AboutUs>>('findOneAndUpdate', function () {
    const update = this.getUpdate() as UpdateQuery<AboutUs>;
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

export const aboutUsModel = model<AboutUs>("AboutUs", aboutUsSchema);