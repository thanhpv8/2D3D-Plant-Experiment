var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({
    id: String,
    questions:[],
    answers:[
        {
            questID:String,
            answer:String,
            duration:String
        }
    ]
});

module.exports = mongoose.model("Answer", answerSchema);