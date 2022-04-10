const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');


router.post("/GetClassAllDetails", async (request, response) => {
    try {
      var ClassroomDetails = await Class.find({ _id: request.body._id}).exec()
      response.json(ClassroomDetails);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;