import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * FROM books LIMIT 1000", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const dailyStats = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * FROM stats LIMIT 1000", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const count = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT count(*) AS totalCount FROM books",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const find = async (isbn: any) => {
  return new Promise((resolve, reject) => {
    let find = `SELECT * FROM books WHERE isbn = ? LIMIT 1`;
    Connection.query(find, [isbn], function(err, results) {
      if (err) {
        console.log(err);
      }
      resolve(results.length);
    });
  });
};

export const updateSales = async (isbn: any) => {
  return new Promise((resolve, reject) => {
    let find = `SELECT * FROM books WHERE isbn = ? LIMIT 1`;
    Connection.query(find, [isbn], function(err, results) {
      if (err) {
        console.log(err);
      }
      const isbn = results[0].isbn;
      const title = results[0].title;
      const author = results[0].author;

      if (isbn !== 0) {
        let addSale = `INSERT INTO dailySales (date, isbn, title, author) VALUES (CURDATE(),?,?,?)`;
        Connection.query(
          addSale,
          [isbn, title, author],
          (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          }
        );
      }
      resolve(results);
    });
  });
};

export const getSales = async (dateFrom: any, dateTo: any) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `SELECT * FROM dailySales WHERE date BETWEEN '${dateFrom}' AND '${dateTo}'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const filter = async (request: any) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `SELECT * FROM books WHERE author LIKE '%${request}%' UNION SELECT * FROM books WHERE title LIKE '%${request}%' UNION SELECT * FROM books WHERE year LIKE '%${request}%' UNION SELECT * FROM books WHERE isbn = '${request}' ORDER BY title ASC LIMIT 1000`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const insert = async (data: any) => {
  statCounter("booksadded");
  const book = JSON.parse(data);
  return new Promise((resolve, reject) => {
    Connection.query(
      "INSERT INTO books (`barcode`, `isbn`, `author`, `title`, `year`, `DateOfEntry`) VALUES (?,?,?,?,?,CURDATE())",
      [book.barcode, book.isbn, book.author, book.title, book.publisher],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const remove = async (id: any) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `DELETE FROM books WHERE id = ${id}`,
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const removeISBN = async (id: any) => {
  statCounter("booksremoved");
  return new Promise((resolve, reject) => {
    Connection.query(
      `DELETE FROM books WHERE isbn = "${id}" LIMIT 1`,
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

const statCounter = async (type: any) => {
  const dateExists = "SELECT 1 FROM stats WHERE date = CURDATE()";
  Connection.query(dateExists, (err, results) => {
    if (err) {
      console.log(err);
      return 0;
    }
    if (results.length === 0) {
      const addDate = "INSERT INTO stats VALUES ('NULL', CURDATE(), '0', '0')";
      Connection.query(addDate, (err, results) => {
        if (err) {
          console.log(err);
          return 0;
        }
        return new Promise((resolve, reject) => {
          Connection.query(
            `UPDATE stats SET ${type} = ${type} + 1 WHERE date = CURDATE()`,
            (err, results) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              resolve(results);
            }
          );
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        Connection.query(
          `UPDATE stats SET ${type} = ${type} + 1 WHERE date = CURDATE()`,
          (err, results) => {
            if (err) {
              console.log(err);
              return reject(err);
            }
            resolve(results);
          }
        );
      });
    }
  });
};

export const requestAdd = async (data: any) => {
  const request = JSON.parse(data);
  return new Promise((resolve, reject) => {
    Connection.query(
      "INSERT INTO requests (`name`, `date`, `mobile`, `request`) VALUES (?,?,?,?)",
      [request.name, request.date, request.mobile, request.request],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const requestCheck = async (request: any) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `SELECT * FROM requests WHERE request LIKE '%${request}%'`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const getAllRequests = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * FROM requests", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export default {
  all,
  dailyStats,
  count,
  find,
  updateSales,
  getSales,
  filter,
  insert,
  remove,
  removeISBN,
  requestAdd,
  requestCheck,
  getAllRequests
};
