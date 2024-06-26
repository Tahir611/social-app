import CommentModel from "../../model/comment/index.js";
import PostModel from "../../model/post/index.js";
import UserModel from "../../model/user/index.js";

const CommentController = {
  create: async (req, res) => {
    try {
      const { description, PostId } = req.body;
      const userId = req.user.id;
      const comment = await CommentModel.create({
        description,
        UserId: userId,
        PostId,
      });
      res.json({ message: "Comment Created", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  get: async (req, res) => {
    try {
      const comment = await CommentModel.findAll({
        include: [UserModel, PostModel],
      });

      res.json({ message: "Got All Comments", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  getOne: async (req, res) => {
    try {
      const params = req.params;
      const comment = await CommentModel.findByPk(params.PostId, {
        include: [UserModel, PostModel],
      });

      res.json({ message: "Got a Comment", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  update: async (req, res) => {
    try {
      const { description } = req.body;
      const prams = req.params;
      const comment = await CommentModel.findByPk(prams.commentId);
      if (!comment) {
        return res.status(404).json({ message: "User Not Found" });
      }
      comment.description = description;
      await comment.save();
      res.json({ message: "Comment Updated", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },

  delete: async (req, res) => {
    try {
      const params = req.params;
      const comment = await CommentModel.findByPk(params.commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      } else {
        await comment.destroy();
        res.json({ message: "Comment deleted successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  // deleteAll: async (req, res) => {
  //   try {
  //     await CommentModel.destroy({
  //       where: {},
  //       truncate: true,
  //     });
  //     res.json({ message: "All comments deleted successfully" });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Server Error", error: error });
  //   }
  // },
};
export default CommentController;
