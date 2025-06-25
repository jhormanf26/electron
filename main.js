
const fs = require('fs');
const path1 = require('path');
const logPath = path1.join(__dirname, 'log.txt');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

process.stdout.write = process.stderr.write = logStream.write.bind(logStream);

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// 🔁 Recarga automática en desarrollo (ignora errores si no se usa en producción)
try {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
} catch (err) {
  console.warn('electron-reload no disponible');
}

// 📦 Importar handlers
  require('./handlers/productos'); // <-- Aquí sí estará todo listo

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  // Cargar la app React build (ajusta según tu estructura)
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Abrir herramientas de desarrollador
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});


