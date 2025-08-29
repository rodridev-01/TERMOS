export function generarSKU(marca, tamaño_oz, color, idVariante) {
  return `${marca.slice(0,2).toUpperCase()}-${tamaño_oz}-${color.slice(0,2).toUpperCase()}-${idVariante.toString().padStart(3,'0')}`;
}
