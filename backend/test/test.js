var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('amazon test', function(){

    it('GET /studenrProfile - Get student Profile',function(done){
        agent.get('/api/account/getStudentDetails/17')
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /getAllEventsByStudentID - Get all events Student participated',function(done){
        agent.get('/api/event/getAllEventsByStudentID/17')
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('GET /getApplicantListByJobID - Get all aplicants for a job',function(done){
        agent.get('/api/job/getApplicantListByJobID/1')
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('POST /createEvent - Create a new event',function(done){ 
        const data = {
        companyID :1,
        description:"test",
        name:"name",
        time:"23:00:00",
        date:"01/01/2020",
        location: "San jose",
        majorsEligible: "0,1,2",
    }
        agent.post('/api/account/getStudentDetails/17', data)
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
    it('POST /changeApplicationStatus - Change JOB Application Status',function(done){
        const data = {
            studentID :1,
            jobID:"test",
            status:2,
        }
        agent.post('/api/account/changeApplicationStatus',data)
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})