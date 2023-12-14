const fs = require('fs')
const {menuItems,prueba} = require ('../models/menu')


const home = {
    main : (req,res) => {
        res.render('index',{menuItems})
    },
    index10 : (req,res) => {
        res.render('index10',{menuItems,prueba})
    },    
    extensiones : (req,res) => {
      res.render('extensiones',{menuItems,prueba})
    }      
}

const get_data = {
  extensiones : (req,res) => {
    const filePath = './public/uploads/json/ext.json';
     try {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(jsonData);
      console.log(typeof parsedData);
      res.json(parsedData)      
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error.message);
        res.json('Error')        
    }
} 
}

module.exports = {
    home,
    get_data
}
 
  