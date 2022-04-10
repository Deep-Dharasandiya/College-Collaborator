const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/UpdateShedual", async (request, response) => {
    try {
            var data = await Class.updateOne({_id:request.body._id}, {$push: {shedual:request.body}}).exec()
            response.json("1")
           
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;