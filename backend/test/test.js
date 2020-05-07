var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('amazon test', function () {

    it('GET /getProductDetails - Get Product Details', function (done) {
        const _id = '5e967879668b061d392f4b7d';
        agent.get('/product/getProductDetails/', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getCustomerDetails - Get details of the customer', function (done) {
        const _id = '5e9ecd3ed5359705519db18b'
        agent.get('/customer/getCustomerDetails', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getSellerDetails - Get details of the Seller', function (done) {
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/seller/getSellerDetails', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getSellerProducts - Get all products of the Seller', function (done) {
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/seller/getSellerProducts', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET /getAllCategories - Get all product categories', function (done) {
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/category/getAllCategories', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });

    it('GET /getUserdetails - Get user details', function (done) {
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/user/getUserDetails/'+_id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


  

    it('GET /getAllSellers - Get all product categories', function (done) {
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/seller/getAllSellers', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('GET /user/getAdminAnalytics - Get all product categories', function (done) {
        const _id = '5ea4c57c89f77fce1106f251'
        agent.get('/user/getAdminAnalytics', _id)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    it('PUT /updatesellerproduct - Update the Seller Product', function (done) {
        const data = {
            name: "bread",
            description: "Honey Bread",
            id: "5eb4645941ec51849fb7a75b",
            seller_name: "Great Value",
            price: 13,
            category: "All",
        }
        agent.put('/sellerinventory/updatesellerproduct', data)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });



    it('POST /removeproduct - Update the  Product', function (done) {
        const data = {
            id: "5eb4645941ec51849fb7a75b"
          }
        agent.post('/sellerinventory/removeproduct', data)
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });



   

    it('GET /getSellerMonthlySales - Get Monthly Sales', function (done) {

        agent.get('/seller/getSellerMonthlySales/' + "5ea4c57c89f77fce1106f251")
            .then(function (res) {
                expect(res.body.success).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });


    // it('POST /login - User Login', function (done) {
    //     const data = {
    //         email: "greatvalue@gmail.com",
    //         password: "gv123"
    //     }
    //     agent.post('/login', data)
    //         .then(function (res) {
    //             expect(res.body.success).to.equal(1);
    //             done();
    //         })
    //         .catch((e) => {
    //             done(e);
    //         });
    // });

    // it('POST /orders/changeOrderStatus -Change Order Status', function (done) {
    //     const data = {
    //         productorderid: "37",
    //         deliverystatus: "Pending",
    //         updatedtime: new Date().toISOString()
    //     }
    //     agent.post('/orders/changeOrderStatus', data)
    //         .then(function (res) {
    //             expect(res.body.success).to.equal(1);
    //             done();
    //         })
    //         .catch((e) => {
    //             done(e);
    //         });
    // });
})