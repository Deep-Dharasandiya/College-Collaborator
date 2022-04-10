const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');

router.post("/GetMySubjects", async (request, response) => {
    try {
        var Subjects = await Class.find({collage_id:request.body.collage_id,"subjects.facultys":request.body.faculty_id}).populate({ 
             path: 'subjects',
            populate: {
                path: 'subject',
                model:'subjects'
               }
              },).exec();
              var MySubject=[];
              for(var i=0;i<Subjects.length;i++){
                for(var j=0;j<Subjects[i].subjects.length;j++){
                    for(var k=0;k<Subjects[i].subjects[j].facultys.length;k++){
                        if(Subjects[i].subjects[j].facultys[k]==request.body.faculty_id){
                            var flag=0;
                            for(var d=0;d<MySubject.length;d++){
                                if(MySubject[d]._id==Subjects[i].subjects[j].subject._id){
                                    flag=1
                                }
                            }
                            if(flag==0){
                                MySubject.push(Subjects[i].subjects[j].subject)
                            }
                        }
                    }
                }
              }
              response.json(MySubject)
   
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;