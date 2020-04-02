const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const should = chai.should();
const URL =  "http://localhost:4000";

chai.use(chaiHttp);
let product_id = "";
const product = {
    "name":"name",
    "description":["description"],
    "shortDescription":"shortDescription",
    "priceStarting":123,
    "availability":5,
    "photos":["photos"],
    "additionalInfo":["additionalInfo"],
    "variants":["variants"],
    "deliveryDetails":["Description"],
    "ytVideoLink":"ytVideoLink",
    "tags":["hello","world"]
}
describe("POST /product/add", () => {
    it("It Should Add New Product", done => {
      chai
        .request(URL)
        .post("/product/add")
        .send(product)
        .end((err, res) => {
          expect(res).to.have.status(200);
          product_id = res.body.id;
          done();
        });
    });
  });

  describe("POST /product/edit/:id", () => {
    it("It Should Edit A Product", done => {
      chai
        .request(URL)
        .put(`/product/edit/${product_id}`)
        .send(product)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("POST /product/fetch", () => {
    it("It Should Fetch All Products", done => {
      chai
        .request(URL)
        .get(`/product/fetch`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("POST /product/fetch_by_tags", () => {
    it("It Should Fetch All Products By Tags", done => {
      chai
        .request(URL)
        .get(`/product/fetch_by_tags?tags='hello'`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("POST /product/fetchone/:id", () => {
    it("It Should Fetch All Products By Id", done => {
      chai
        .request(URL)
        .get(`/product/fetchone/${product_id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });


  describe("POST /product/delete/:id", () => {
    it("It Should delete A Product ", done => {
      chai
        .request(URL)
        .delete(`/product/delete/${product_id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });