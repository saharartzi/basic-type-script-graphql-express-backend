import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
import { customAlphabet } from "nanoid";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.shcema";

const nanoid = customAlphabet('abcdefghijkmnlopqrstuvwxyz123456789', 10)

@ObjectType()
@index({ storyId : 1})
export class Story {
    @Field(()=>String)
    _id: string

    @Field(()=>String)
    @prop({required: true, ref: ()=> User})
    user: Ref<User>;

    @Field(()=>String)
    @prop({required: true})
    name: string;

    @Field(()=>String)
    @prop({required: true})
    content: string;

    @Field(()=>String)
    @prop({required: true})
    extrainfo: string;

    @Field(()=>String)
    @prop({required: true, default: ()=> `product_${nanoid()}, unique: true`,})
    storyId: string;
}


export const StoryModel = getModelForClass<typeof Story>(Story);