import { IsEmail, MaxLength, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";


@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @MinLength(6,  {
        message: 'password must be at least 6 charecters long'
    })
    @MaxLength(50, {
        message: 'password must be shorter then 50 characters long'
    })
    @Field(() => String)
    password: string;

}

@InputType()
export class LoginInput {

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}