import { CreateStoryInput, GetStoryInput } from "../inputs/story.Input";
import { StoryModel } from "../schema/story.shcema";
import { User } from "../schema/user.shcema";


class StoryService {
    async createStory(input: CreateStoryInput & { user: User["_id"] }) {
      return StoryModel.create(input);
    }
  
    async findStories() {
      // Pagination login
      return StoryModel.find().lean();
    }
  
    async findSingleStory(input: GetStoryInput) {
      return StoryModel.findOne(input).lean();
    }
  }
  
  export default StoryService;