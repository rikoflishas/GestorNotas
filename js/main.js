/**
 * Objetivo
El objetivo es construir un programa en Node.js que administre notas personales utilizando el módulo `fs`. Los estudiantes practicarán leer, escribir, verificar y eliminar archivos, consolidando los conceptos aprendidos.

Problema: Gestor de Notas Personales
Hoy en día, muchas personas necesitan guardar notas rápidas o recordatorios. Crear una aplicación para gestionar estas notas en archivos puede ser una solución útil para practicar manejo de archivos y entender cómo interactuar con el sistema de archivos en Node.js. La aplicación debe permitir al usuario:

Crear una nueva nota y guardarla en un archivo.
Leer todas las notas existentes.
Eliminar una nota específica según su título.

Instrucciones para resolver el problema:
Crea un archivo `gestorNotas.js`.
- Usa el módulo `fs` para realizar las operaciones de manejo de archivos.
- Las notas deben almacenarse en un archivo JSON llamado `notas.json`. Usa el formato JSON para guardar la información en el archivo.
- Implementa la Funcionalidad del Programa descrita anteriormente:
- Crear una nota: Agrega una nueva nota con un título y contenido.
- Listar notas: Lee el archivo `notas.json` y muestra todas las notas en la consola.
- Eliminar una nota: Borra una nota específica según su título.
 */

const fs = require('fs');

// Ruta del archivo de notas
const filePath = './notas.json';

/**
 * Agrega una nueva nota al archivo.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */

function agregarNota(titulo, contenido) 
{
  let notas = [];
  if (fs.existsSync(filePath)) {
    // PISTA: Aquí debes leer las notas existentes antes de agregar la nueva.
    console.log(`El archivo en la ruta ${filePath} si existe`);
    // COMPLETAR: Usa fs.readFileSync para leer el archivo.
    fs.readFile( filePath, 'utf8', (error, datos) => {
      if(error){
        console.log(error);
        console.log(datos);
      }
    } );
  }
  else{
    console.log(`El archivo no existe`);
  }

  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  // PISTA: Ahora debes sobrescribir el archivo con las notas actualizadas.
  // COMPLETAR: Usa fs.writeFileSync para guardar las notas.
  console.log('Nota agregada con éxito.');
}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() 
{
  if (fs.existsSync(filePath)) {
    // PISTA: Debes leer y parsear el contenido del archivo.
    // COMPLETAR: Usa fs.readFileSync para leer y JSON.parse para convertir el contenido.
    fs.readFileSync( filePath, 'utf8', (error, datos) => {
      console.log(datos);
    } );
  } else {
    console.log('No hay notas guardadas.');
  }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) 
{
  if (fs.existsSync(filePath)) {
    // PISTA: Primero lee todas las notas.
    // COMPLETAR: Usa fs.readFileSync para leer el archivo.

    // PISTA: Filtra las notas y elimina la que coincida con el título.
    // COMPLETAR: Usa Array.filter para obtener las notas restantes.

    // PISTA: Sobrescribe el archivo con las notas actualizadas.
    // COMPLETAR: Usa fs.writeFileSync.
    console.log(`Nota con título "${titulo}" eliminada.`);
  } else {
    console.log('No hay notas para eliminar.');
  }
}

// Ejecución de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
listarNotas();
eliminarNota('Compras');

// ### Pistas para Resolver el Proyecto ###
// Formato del archivo `notas.json`:
[
  { "titulo": "Compras", "contenido": "Comprar leche y pan." },
  { "titulo": "Trabajo", "contenido": "Terminar reporte semanal." }
]

// #### Operaciones clave: ###
// 1. Para leer las notas existentes:
const data = fs.readFileSync(filePath, 'utf8');
const notas = JSON.parse(data);

// 2. Para guardar las notas actualizadas:
fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));

// 3. Filtrar notas para eliminar:
const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);