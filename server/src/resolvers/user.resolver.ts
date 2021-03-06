import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../schema/user.shcema";
import { CreateUserInput, LoginInput } from "../inputs/userInput";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
   constructor(private userService: UserService){
    this.userService = new UserService();
   }

   @Mutation(() => User)
   createUser(@Arg('input') input: CreateUserInput) {
       return this.userService.createUser(input)
   }

   @Mutation(() => String) // returns the jwt token
   login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
       return this.userService.login(input, context)
   }

   @Query(() => User)
   me(@Ctx() context: Context){
       return context.user;
   } 
}