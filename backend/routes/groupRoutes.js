const express = require("express");
const router = express.Router();
const {createGroup, joinGroup, getMyGroups, leaveGroup, getGroupData, getAllGroups, kickUser, makeOwner, calculateGroupMovies} = require("../controllers/groupController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, createGroup).get(protect, getMyGroups);
router.route("/join").post(protect, joinGroup);
router.route("/:name").delete(protect, leaveGroup).get(protect, getGroupData);
router.route("/all").get(protect, getAllGroups);

router.route("/:groupName/:userName").delete(kickUser).put(makeOwner);
router.route("/:groupName/movies").get(protect, calculateGroupMovies);



module.exports = router;