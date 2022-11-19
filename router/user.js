import express from "express";
const router = express.Router();

import {
  register,
  getUser,
  signin,
  updateUser,
  getUsers,
  passForget,
} from "../controller/user.js";
import auth from "../middleware/Auth.js";

router.post("/register", register);
router.post("/signin", signin);
router.post("/passForget", passForget);

router.patch("/updateUser", updateUser);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router;
