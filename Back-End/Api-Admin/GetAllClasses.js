const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/GetAllClass", async (request, response) => {
    try {
      var ClassroomDetails = await Class.find({ collage_id: request.body.collage_id},{_id:1,collage_id:1,program:1,course:1,semester:1,year:1,classname:1}).exec();
       response.json(ClassroomDetails);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;