import express from "express";
const router = express.Router();

import { getMessage } from "../controller/message.js";

import auth from "../middleware/Auth.js";

router.get("/:id", auth, getMessage);

export default router;
