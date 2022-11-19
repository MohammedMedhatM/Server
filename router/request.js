import express from "express";
const router = express.Router();

import {
  postRequest,
  getRequests,
  getRequest,
  updateRequest,
} from "../controller/request.js";
import { register, getUser, signin, updateUser } from "../controller/user.js";

import auth from "../middleware/Auth.js";

router.post("/", auth, postRequest);
router.patch("/:id", auth, updateRequest);
router.get("/", auth, getRequests);
router.get("/:id", auth, getRequest);

export default router;
