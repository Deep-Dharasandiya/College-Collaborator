const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/CreateClassroom", async (request, response) => {
    try {
      var check = await Class.find({ collage_id:request.body.collage_id, classname: request.body.classname,course:request.body.course,program:request.body.program,semester:request.body.semester,year:request.body.year},{_id:1}).exec()
      if(check==''){
        Class.insertMany(request.body, function(err, res) {
            if (err) throw err;
          });
        response.json('1');
      }else{
          response.json("2");
      }
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;