const express = require("express");
const router = express.Router();
const {addMovie, getMyMovies, deleteMovie, rateMovie} = require("../controllers/movieController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, addMovie).get(protect, getMyMovies);
router.route("/:id").delete(protect, deleteMovie)
router.route("/rate/:id/:rating").get(protect, rateMovie)
module.exports = router;