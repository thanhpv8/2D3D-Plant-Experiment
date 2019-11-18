    var express = require("express");
    var app = express();
    var mongoose = require("mongoose");
    var Answers = require("./public/user");
    var bodyParser = require("body-parser");
    var request = require("request");
    var XLSX = require('xlsx');
     mongoose.Promise = global.Promise;
   
   // mongoose.connect("mongodb://localhost/user_answer",{
    
   mongoose.connect("mongodb://thanh:passWord123!@ds125016.mlab.com:25016/plantexperiment",{

     useMongoClient: true,
   });
   var workbook = XLSX.readFile('./public/test.xlsx');
   var worksheet = workbook.Sheets['Design'];
   
    app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine", "ejs");
    
    app.get("/", function(req,res){
        res.render("firstpage");
    });
    app.get("/getId",function(req,res){
     var message1="";
     var message2="";
      res.render("getId",{message1:message1, message2:message2});
    });
    function shuffle(a) {
       for (let i = a.length; i; i--) {
           let j = Math.floor(Math.random() * i);
           [a[i - 1], a[j]] = [a[j], a[i - 1]];
       }
   }
   app.post("/getId/register", function(req,res){
    Answers.findOne({id:req.body.userId}, function(err,answers){
    if(err){
      console.log(err);
     } else {
      if(answers == null){
       var order=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
      shuffle(order);
      var newAnswer = new Answers({id:req.body.userId, questions:order});
      newAnswer.save(function(err,answers){
       if(err){
        console.log(err);
       } else {
        res.redirect("/3Dmodel/"+req.body.userId);
       }
      });
      } else{
       var message1="This user id is already in the database";
       var message2="";
       res.render("getId",{message1:message1, message2:message2});
      }
     }
    });
   });
   
   
   app.post("/getId/login", function(req,res){
    Answers.findOne({id:req.body.userId}, function(err,answers){
     if(err){
      console.log(err);
     } else {
      if(answers==null){
       var message1="";
       var message2="This user id does not exist in the database. Try again or create another user id";
       res.render("getId",{message1:message1, message2:message2});
      } else {
       res.redirect("/3Dmodel/"+req.body.userId);
      }
     }
    });
   });
   
     app.get("/2Dimages/:id", function(req,res){
      res.render("2Dimages",{id:req.params.id});
    });
    app.get("/3Dmodel/:id", function(req,res){
      res.render("3Dmodel",{id:req.params.id});
    });
    
      app.get("/questIntro/:id", function(req,res){
      res.render("questIntro",{id:req.params.id});
    });
    
       app.get("/question/:id"+"?", function(req,res){
        Answers.findOne({id:req.params.id}, function(err,answers){
         if(err){
          console.log(err);
         } else {
          if(answers.answers.length == 16){
           res.render("finishpage",{id:req.params.id});
          } else {
           var realorder=answers.questions[answers.answers.length];
           var type=worksheet['D'+(realorder+1).toString()].v;
           var visualtype=worksheet['C'+(realorder+1).toString()].v;
           if(type == 1){
            if(visualtype == 3){
             var option1= worksheet['I'+(realorder+1).toString()].v;
             var option2= worksheet['J'+(realorder+1).toString()].v;
             var option3= worksheet['K'+(realorder+1).toString()].v;
             var option4= worksheet['L'+(realorder+1).toString()].v;
             var folderName = worksheet['F'+(realorder+1).toString()].v;
             var objName = worksheet['H'+(realorder+1).toString()].v;
             var mtlName = worksheet['G'+(realorder+1).toString()].v;
              res.render("question",{
               id:req.params.id, 
               type:type, 
               visualtype:visualtype,
               folderName:folderName,
               objName:objName,
               mtlName:mtlName,
               option1:option1,
               option2:option2,
               option3,option3,
               option4:option4,
               realorder:realorder,
               order:answers.answers.length +1
              });
            } else if(visualtype ==2){
             var option1= worksheet['H'+(realorder+1).toString()].v;
             var option2= worksheet['I'+(realorder+1).toString()].v;
             var option3= worksheet['J'+(realorder+1).toString()].v;
             var option4= worksheet['K'+(realorder+1).toString()].v;
             var folderName = worksheet['F'+(realorder+1).toString()].v;
             var imageName = worksheet['G'+(realorder+1).toString()].v;
             
              res.render("question",{
               id:req.params.id, 
               type:type, 
               visualtype:visualtype,
               folderName:folderName,
               imageName:imageName,
               option1:option1,
               option2:option2,
               option3,option3,
               option4:option4,
               realorder:realorder,
               order:answers.answers.length +1
              });
            }
           } else if (type == 2){
            if(visualtype == 3){
             var option1= worksheet['I'+(realorder+1).toString()].v;
             var option2= worksheet['J'+(realorder+1).toString()].v;
             var option3= worksheet['K'+(realorder+1).toString()].v;
             var option4= worksheet['L'+(realorder+1).toString()].v;
             var folderName = worksheet['F'+(realorder+1).toString()].v;
             var objName = worksheet['H'+(realorder+1).toString()].v;
             var mtlName = worksheet['G'+(realorder+1).toString()].v;
              res.render("question",{
               id:req.params.id, 
               type:type, 
               visualtype:visualtype,
               folderName:folderName,
               objName:objName,
               mtlName:mtlName,
               option1:option1,
               option2:option2,
               option3,option3,
               option4:option4,
               realorder:realorder,
               order:answers.answers.length +1
              });
            } else if(visualtype ==2){
             var option1= worksheet['H'+(realorder+1).toString()].v;
             var option2= worksheet['I'+(realorder+1).toString()].v;
             var option3= worksheet['J'+(realorder+1).toString()].v;
             var option4= worksheet['K'+(realorder+1).toString()].v;
             var folderName = worksheet['F'+(realorder+1).toString()].v;
             var imageName = worksheet['G'+(realorder+1).toString()].v;
             
              res.render("question",{
               id:req.params.id, 
               type:type, 
               visualtype:visualtype,
               folderName:folderName,
               imageName:imageName,
               option1:option1,
               option2:option2,
               option3,option3,
               option4:option4,
               realorder:realorder,
               order:answers.answers.length +1
              });
            }
           } 
          }
         }
        })
    });
    
        app.post("/question/:id/:order/:realorder", function(req,res){
        Answers.findOne({id:req.params.id}, function(err,answers){
         if(err){
          console.log(err);
         } else {
          var nextQuest=parseInt(req.params.order)+1;
          var questID = req.params.realorder, 
              answer = req.body.answer , 
              duration = req.body.duration;
           if((req.params.order -1)==answers.answers.length){
           var newAnswer = {questID, answer, duration};
           answers.answers.push(newAnswer);
           answers.save();
            res.redirect("/question/"+req.params.id+"?");
           }else{
            res.redirect("/question/"+req.params.id+"?");
           }
          }
         })
        });

    app.get("/question", function(req,res){
     var type =2;
     res.render("question",{type:type})
    })
    app.get("/finishpage", function(req,res){
      res.render("finishpage",{id:req.params.id});
    });
    app.get("*",function(req, res) {
        res.render("firstpage");
    })
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Experiment area has started");
    });