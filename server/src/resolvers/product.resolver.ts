import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { CreateStoryInput } from "../inputs/story.Input";
import { Story } from "../schema/story.shcema";
import ProductService from "../service/story.service";
import Context from "../types/context";


@Resolver()
export default class ProductResolver {
    constructor(private productService: ProductService){
     this.productService = new ProductService();
    }
    @Authorized()
    @Mutation(() => Story)
    createStory(@Arg('input') input: CreateStoryInput, @Ctx() context: Context){
        const user = context.user!;
        return this.productService.createStory({...input, user: user?._id});
    }
}