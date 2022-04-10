const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/UpdateSubjectStudent", async (request, response) => {
    try {
        var data = await Class.updateOne({_id:request.body._id,"subjects._id":request.body.subject_id}, {$push: {"subjects.$.students":request.body.student_id}}).exec()
        response.json("1")
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;