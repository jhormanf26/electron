const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

const isDev = !app.isPackaged;
const dbFolder = isDev ? path.join(__dirname, '..', 'db') : app.getPath('userData');
const dbPath = path.join(dbFolder, 'ventas.db');

function openDb() {
  return new sqlite3.Database(dbPath);
}

function crearTablasSiNoExisten() {
  const db = openDb();

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          precio REAL NOT NULL CHECK(precio >= 0),
          stock INTEGER NOT NULL CHECK(stock >= 0)
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          documento TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          rol TEXT
        )
      `);

      // Puedes agregar más tablas aquí...

      db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

module.exports = { crearTablasSiNoExisten };
