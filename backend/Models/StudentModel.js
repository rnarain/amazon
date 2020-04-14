const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentSchema = new Schema({
        email : {type: String, required: true},
        phone : String,
        password : {type: String, required: true},
        fname : {type: String, required: true},
        lname : {type: String, required: true},
        dob : Date,
        skills : String,
        careerObjective : String,
        profilePicURL : String,
        education : 
            [{
                college : String,
                major : Number,
                yearOfStarting : String,
                yearOfPassing : Date,
                gpa : String,
                degreeType : Number
            }],
        experience : 
            [{
                company : String,
                location : String,
                startDate : Date,
                endDate : Date,
                title : String,
                description :String 
            }]
    }
    ,
{
    versionKey: false
});


module.exports = mongoose.model('student', studentSchema);