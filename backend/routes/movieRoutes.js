const express = require("express");
const router = express.Router();
const {addMovie, getMyMovies, deleteMovie} = require("../controllers/movieController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, addMovie).get(protect, getMyMovies);
router.route("/:id").delete(protect, deleteMovie)

module.exports = router;