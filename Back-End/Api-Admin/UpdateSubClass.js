const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/UpdateSubClass", async (request, response) => {
    try {
        var data = await Class.updateOne({_id:request.body._id,"subclasses._id":request.body.subclass_id}, {$push: {"subclasses.$.students":request.body.student_id}}).exec()
   
    response.json("1")
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;