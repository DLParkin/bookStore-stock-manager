import * as express from "express";
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");

import DB from "./db";

const router = express.Router();

router.get("/api/books", async (req, res, next) => {
  try {
    let books = await DB.Books.all();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/updateSales", async (req, res, next) => {
  const isbn = req.query.isbn;
  try {
    let book = await DB.Books.updateSales(isbn);
    res.json(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/dailyStats", async (req, res, next) => {
  try {
    let stats = await DB.Books.dailyStats();
    res.json(stats);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/getSales/", async (req, res, next) => {
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;
  try {
    let sales = await DB.Books.getSales(dateFrom, dateTo);
    res.send(sales);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/count", async (req, res, next) => {
  try {
    let count = await DB.Books.count();
    res.json(count);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/find/", async (req, res, next) => {
  const isbn = req.query.id;
  try {
    let book = await DB.Books.find(isbn);
    res.send({ count: book });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.all("/api/filter/", async (req, res, next) => {
  const request = req.query.search;
  try {
    let books = await DB.Books.filter(request);
    res.json(books);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/insert", async (req, res, next) => {
  const book = req.query.book;
  try {
    let insert = await DB.Books.insert(book);
    res.json(insert);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/delete/", async (req, res, next) => {
  const deleteId = req.query.id;
  try {
    let book = await DB.Books.remove(deleteId);
    res.json(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/deleteISBN/", async (req, res, next) => {
  const deleteISBN = req.query.id;
  try {
    let book = await DB.Books.removeISBN(deleteISBN);
    res.json(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/find", async (req, res, next) => {
  const isbn = req.query.id;
  const url = `<ISBNDB a good choice>`;

  try {
    request(url, async function(error: any, response: any, html: any) {
      if (!error) {
        res.json(response.body);
      } else {
        res.sendStatus(500);
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/requestAdd", async (req, res, next) => {
  const request = req.query.request;
  try {
    let insertRequest = await DB.Books.requestAdd(request);
    res.json(insertRequest);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/requestCheck", async (req, res, next) => {
  const request = req.query.request;
  try {
    let requestCheck = await DB.Books.requestCheck(request);
    res.json(requestCheck);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/api/getAllRequests", async (req, res, next) => {
  try {
    let getAll = await DB.Books.getAllRequests();
    res.json(getAll);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.use("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/js/index.html"));
});

export default router;
