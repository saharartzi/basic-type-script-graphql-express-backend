import { getModelForClass, prop, pre, ReturnModelType, queryMethod, index } from "@typegoose/typegoose";
import bcrypt from 'bcrypt'
import { Field, ObjectType } from "type-graphql";
import { AsQueryMethod } from  "@typegoose/typegoose/lib/types";


function findByEmail(
    this: ReturnModelType<typeof User, QueryHelpers>,
    email: User['email']
    ) {
    return this.findOne({ email })
}

interface QueryHelpers {
    findByEmail: AsQueryMethod<typeof findByEmail>
}

@pre<User>('save', async function (){
    // checking that password is modified
    if(!this.isModified('password')){
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(this.password, salt)

    this.password = hash;
})

@index({email: 1})
@queryMethod(findByEmail)
@ObjectType()
export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({required: true})
    name: string

    @Field(() => String)
    @prop({required: true})
    email: string

    @prop({required: true})
    password: string
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

