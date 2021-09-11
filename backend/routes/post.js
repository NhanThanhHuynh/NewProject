const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Post = require("../models/Post");

//@Router GET api/posts
//@Des GET post
//@Access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@Router POST api/posts
//@Des Creat post
//@Access private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    const newPost = new Post({
      title: title,
      description: description,
      url: url,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@Router PUT api/posts
//@Des PUT post
//@Access private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status, user } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  try {
    let updatepPost = {
      title: title,
      description: description || "",
      url: url || "",
      status: status || "TO LEARN",
      user: req.userId,
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatepPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatepPost,
      { new: true }
    ); //Post exsist and user confirm

    if (!updatepPost) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found or user not found" });
    }
    res.json({ success: true, message: "Success post", post: updatepPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@Router PUT api/posts
//@Des PUT post
//@Access private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router;
