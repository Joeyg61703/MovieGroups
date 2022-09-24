const express = require("express");
const router = express.Router();
const {createGroup, getMyGroups, leaveGroup} = require("../controllers/groupController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, createGroup).get(protect, getMyGroups);
router.route("/:id").delete(protect, leaveGroup)

module.exports = router;