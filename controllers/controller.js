const fs = require('fs')
const csv = require('csv-parser');

const {menuItems,prueba} = require ('../models/menu')


const home = {
    main : (req,res) => {
        res.render('index',{menuItems})
    },
    index10 : (req,res) => {
        res.render('index10',{menuItems,prueba})
    },  
    index11 : (req,res) => {
        res.render('index11',{menuItems,prueba})
    },    
    extensiones : (req,res) => {
      res.render('extensiones',{menuItems,prueba})
    },
    extensiones_v2 : (req,res) => {
      res.render('extensiones_v2',{menuItems,prueba})
    },
    chat : (req,res) => {
      res.render('chat',{menuItems,prueba})
    },
    encriptar : (req,res) => {
      res.render('encriptar',{menuItems,prueba})
    },  
    uploads : (req,res) => {
      res.render('uploads',{menuItems,prueba})
    },
    games : (req,res) => {
      res.render('games',{menuItems,prueba})
    },
    caja_ahorro : (req,res) => {
      res.render('caja_ahorro',{menuItems,prueba})
    },
    libera_nomina : (req,res) => {
      res.render('libera_nomina',{menuItems,prueba})
    },
    buzonAmor : (req,res) => {
      res.render('buzonAmor',{menuItems,prueba})
    },
    retiroAhorro : (req,res) => {
      res.render('retiroAhorro',{menuItems,prueba})
    }      
}

const get_data = {
  extensiones : (req,res) => {
  //   const filePath = './public/uploads/json/ext.json';
  //   try {
  //   const jsonData = fs.readFileSync(filePath, 'utf8');
  //   const parsedData = JSON.parse(jsonData);
  //   console.log(parsedData);
  //   res.json(parsedData)      
  //   } catch (error) {
  //       console.error('Error al leer el archivo JSON:', error.message);
  //       res.json('Error')        
  //   }
    const filePath = './public/uploads/csv/extensiones.csv';
    const csvData = [];
    fs.createReadStream(filePath)
    .pipe(csv({ separator: '|' }))
    .on('data', (row) => {
      // Procesa cada fila del CSV y almacena los datos
      csvData.push(row);
    })
    .on('end', () => {
      // El evento 'end' se dispara cuando se ha completado la lectura del archivo CSV
      // console.log('Datos leídos:', csvData);
      res.json(csvData)      
    });

  } 
}

module.exports = {
    home,
    get_data
}
 
  