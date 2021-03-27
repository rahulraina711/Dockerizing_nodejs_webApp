const express = require("express");
const router = express.Router();
const story_controller = require('../controllers/story_controller');
const multer = require('multer');
const auth = require("../middleware/auth");

// defining storage params for multer

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/stories/');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post("/", auth,upload.single('story'),story_controller.add_story);

router.delete("/del", auth,story_controller.delete_story);

router.get("/:id",auth,story_controller.show_story);

module.exports = router;
