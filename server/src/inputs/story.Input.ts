import { IsNumber, MaxLength, Min, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class CreateStoryInput {
    @Field()
    name: string;
    
    @MinLength(50, {
        message: "Description must be at least 50 charecters"
    })
    @MaxLength(1000, {
        message: "Description must be shorter then 1000 characters"
    })
    @Field()
    content: string;
   
    @IsNumber()
    @Min(1)
    @Field()
    extrainfo: number;
}

@InputType()
export class GetStoryInput {
    @Field()
    productId: string;
}