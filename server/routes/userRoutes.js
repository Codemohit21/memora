import express from "express";
import {
  acceptConnectionRequest,
  discoverUsers,
  followUsers,
  getUserConnections,
  getUserData,
  getUserProfiles,
  sendConnectionRequest,
  unfollowUsers,
  UpdateUserData,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../configs/multer.js";
import { getUserRecentMessages } from "../controllers/messageController.js";

const userRouter = express.Router();
// userRouter.get('/data',requireAuth(), (req, res) => {
//   res.json({ userId: req.auth.userId });
// } ,getUserData)

userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
   
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
 
  UpdateUserData
);
userRouter.post("/discover", protect, discoverUsers);
userRouter.post("/follow", protect, followUsers);
userRouter.post("/unfollow", protect, unfollowUsers);
userRouter.post("/connect", protect, sendConnectionRequest);
userRouter.post("/accept", protect, acceptConnectionRequest);
userRouter.get("/connections", protect, getUserConnections);

userRouter.post("/profiles",getUserProfiles)
userRouter.get("/recent-messages",getUserRecentMessages)

export default userRouter;
