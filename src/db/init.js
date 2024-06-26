import UserModel from "../model/user/index.js";
import CommentModel from "../model/comment/index.js";
import PostModel from "../model/post/index.js";
import UserFollwerModel from "../model/user/userFollowerModel.js";

const syncDb = async () => {
  await UserModel.sync({ force: false, alter: true });
  console.log("The table for the User model was (re)created!");
  await PostModel.sync({ force: false, alter: true });
  console.log("The table for the Post model was (re)created!");
  await CommentModel.sync({ force: false, alter: true });
  console.log("The table for the User model was (re)created!");
  await UserFollwerModel.sync({ force: false, alter: true });
  console.log("The table for the User Follower model was (re)created!");
};

export default syncDb;
