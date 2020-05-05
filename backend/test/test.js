var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('amazon test', function(){

    it('GET /getProductDetails - Get Product Details',function(done){
        const _id =  '5e967879668b061d392f4b7d';
        agent.get('/product/getProductDetails/', _id)
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getCustomerDetails - Get details of the customer',function(done){
        const _id = '5e9ecd3ed5359705519db18b'
        agent.get('/customer/getCustomerDetails', _id)
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getSellerDetails - Get details of the Seller',function(done){
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/seller/getSellerDetails', _id)
            .then(function(res){
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getSellerProducts - Get all products of the Seller',function(done){
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/seller/getSellerProducts', _id)
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