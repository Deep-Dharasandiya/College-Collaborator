const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/GetMySubjectClasses", async (request, response) => {
    try {
        var Classes = await Class.find({collage_id:request.body.collage_id},{_id:1,classname:1,year:1,semester:1,program:1,course:1,subjects:1}).exec();
        var temp=[]      
        for(var i=0;i<Classes.length;i++){
                for(var j=0;j<Classes[i].subjects.length;j++){
                    if(Classes[i].subjects[j].subject==request.body.subject_id){
                        for(var k=0;k<Classes[i].subjects[j].facultys.length;k++){
                            if(Classes[i].subjects[j].facultys[k]==request.body.faculty_id){
                                temp.push(Classes[i]);
                            }
                        }
                    }
                }
              }
              response.json(temp)
   
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;