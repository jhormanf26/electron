const { ipcRenderer } = window.electron;

export const getProductos = async () => {
  try {
    return await ipcRenderer.invoke('obtener-productos');
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const registerProducto = async (producto) => {
  try {
    return await ipcRenderer.invoke('registrar-producto', producto);
  } catch (error) {
    console.error('Error al registrar producto:', error);
    return false;
  }
};
// 🗑️ Eliminar
export const deleteProducto = async (id) => {
  try {
    const result = await ipcRenderer.invoke('eliminar-producto', id);
    return result;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return false;
  }
};

// ✏️ Modificar
export const updateProducto = async (producto) => {
  try {
    const result = await ipcRenderer.invoke('editar-producto', producto);
    return result;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return false;
  }
};
