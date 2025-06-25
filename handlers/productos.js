const { ipcMain, app } = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const isDev = !app.isPackaged;
const dbFolder = isDev ? path.join(__dirname, '..', 'db') : app.getPath('userData');
const dbPath = path.join(dbFolder, 'ventas.db');

// Asegurarse que la base exista
if (!isDev && !fs.existsSync(dbPath)) {
  const sourcePath = path.join(process.resourcesPath, 'db', 'ventas.db');
  fs.copyFileSync(sourcePath, dbPath);
}

// Crear tabla si no existe
function crearTablaProductosSiNoExiste() {
  const db = new sqlite3.Database(dbPath);
  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL
    )`, (err) => {
    if (err) console.error('Error creando tabla productos:', err.message);
    else console.log('✅ Tabla productos verificada/creada correctamente.');
    db.close();
  });
}

crearTablaProductosSiNoExiste();

// Registrar producto
ipcMain.handle('registrar-producto', async (_event, producto) => {
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    const insertQuery = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    db.run(insertQuery, [producto.nombre, producto.descripcion, producto.precio, producto.stock], function (err) {
      if (err) {
        console.error('Error registrando producto:', err.message);
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
      db.close();
    });
  });
});

// Obtener productos
ipcMain.handle('obtener-productos', async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
    db.all('SELECT * FROM productos', (err, rows) => {
      if (err) {
        console.error('Error consultando DB:', err.message);
        reject(err.message);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
});

// 🗑️ Eliminar producto
ipcMain.handle('eliminar-producto', async (_event, id) => {
  const db = new sqlite3.Database(dbPath);
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM productos WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) {
        console.error('Error al eliminar producto:', err.message);
        reject(err);
      } else {
        resolve({ eliminado: this.changes > 0 });
      }
      db.close();
    });
  });
});

// ✏️ Editar producto
ipcMain.handle('editar-producto', async (_event, producto) => {
  const db = new sqlite3.Database(dbPath);
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?
      WHERE id = ?
    `;
    db.run(query, [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.id], function (err) {
      if (err) {
        console.error('Error actualizando producto:', err.message);
        reject(err);
      } else {
        resolve({ actualizado: this.changes > 0 });
      }
      db.close();
    });
  });
});

