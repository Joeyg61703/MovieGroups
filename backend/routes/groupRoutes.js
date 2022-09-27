const express = require("express");
const router = express.Router();
const {createGroup, getMyGroups, leaveGroup, getGroupData, getAllGroups} = require("../controllers/groupController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, createGroup).get(protect, getMyGroups);
router.route("/:name").delete(protect, leaveGroup).get(protect, getGroupData);
router.route("/all").get(protect, getAllGroups);


module.exports = router;