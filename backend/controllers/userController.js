import user from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
   const {username} = req.params;
   try {
    const user = await user.findOne({username}).select("-password");
    if(!user) return res.status(404).json({message: "User not found"});
    res.status(200).json(user);
   } catch (error) {
    res.status(500).json({message: "Server error"})
   }
}


export const followUnfollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await user.findById(id);
		const currentUser = await user.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res.status(400).json({ error: "You can't follow/unfollow yourself" });
		}

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow the user
			await user.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await user.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow the user
			await user.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await user.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			// Send notification to the user

			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (error) {
		console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};