import { Router } from "express";
import {
  getShortLinks,
  postShortLinks,
  redirectToLink,
} from "../controllers/postShort.controller.js";

const router = Router();

router.get("/", getShortLinks);
router.post("/", postShortLinks);
router.get("/:shortCode", redirectToLink);

// default export
// export default router;

//Named export
export const urlShortenerRoutes = router;
