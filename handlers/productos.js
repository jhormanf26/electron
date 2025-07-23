const { ipcMain, app } = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const isDev = !app.isPackaged;
const dbFolder = isDev ? path.join(__dirname, '..', 'db') : app.getPath('userData');
const dbPath = path.join(dbFolder, 'ventas.db');

function openDb() {
  return new sqlite3.Database(dbPath);
}

// Asegurarse que la base exista
if (!isDev && !fs.existsSync(dbPath)) {
  const sourcePath = path.join(process.resourcesPath, 'db', 'ventas.db');
  fs.copyFileSync(sourcePath, dbPath);
}

// Crear tabla si no existe
function crearTablaProductosSiNoExiste() {
  const db = openDb();
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

//crearTablaProductosSiNoExiste();
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
      db.close();
    });
  });
}

// Registrar producto
ipcMain.handle('registrar-producto', async (_event, producto) => {
   try {    
    const insertQuery = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    const result = await runQuery(insertQuery, [producto.nombre, producto.descripcion, producto.precio, producto.stock]);
    return { id: result.lastID };
  } catch (err) {
    console.error('Error registrando producto:', err.message);
    throw err;
  }
});

function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = openDb();
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
}

// Obtener productos
ipcMain.handle('obtener-productos', async () => {
  try {
    const rows = await allQuery('SELECT * FROM productos');
    return rows;
  } catch (err) {
    console.error('Error consultando DB:', err.message);
    throw err;
  }
});

// 🗑️ Eliminar producto
ipcMain.handle('eliminar-producto', async (_event, id) => {
  try {
    const query = 'DELETE FROM productos WHERE id = ?';
    const result = await runQuery(query, [id]);
    return { eliminado: result.changes > 0 };
  } catch (err) {
    console.error('Error al eliminar producto:', err.message);
    throw err;
  }
});

// ✏️ Editar producto
ipcMain.handle('editar-producto', async (_event, producto) => {
  try {
    const query = `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?
      WHERE id = ?
    `;
    const result = await runQuery(query, [producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.id]);
    return { actualizado: result.changes > 0 };
  } catch (err) {
    console.error('Error actualizando producto:', err.message);
    throw err;
  }
});

