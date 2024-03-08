import {
  Grid,
  html
} from "https://unpkg.com/gridjs?module"; 
 
 
 document.addEventListener("DOMContentLoaded", function() {
  // getEXT()
  getData()
  
});

// const load_Data=document.querySelector('#load_Data')
const wrapper=document.querySelector('#wrapper')


 function show_img(data) {
      alert(data)
    }

  
function getData() {
  wrapper.innerHTML=''
  fetch('/buzonAmorData') 
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud.');
    }
    return response.json(); // Si esperas una respuesta JSON
  })
  .then(data => {    
    if (data.length === 0) {
      // alert('sin datos')
      return false
    }
    
    // console.log(data);
     
    const objetoTransformado = data.map(item => {
      return {             
        TOP : item[0],
        "NOMINA": item[1], 
        "NOMBRE": item[2], 
        "HASTA_CORTE": item[3],
        "AHORRO_S_Q": item[4],
        "AHORRO_TOTAL": item[4],
        

         
      };
    });
    console.log(Object.keys(objetoTransformado[0]));

    const grid = new Grid({
      search : true,
      resizable: true,
      sort: true,
      fixedHeader: true,
      height: '600px',
      pagination: {
        limit: 30,
        options: [5, 20, -1],
      },
      // columns: Object.keys(objetoTransformado[0]),
      columns: 
      [
        "ID",
        "DE",
        "PARA", 
        "NOMBRE",                  
        "MENSAJE",                  
        "ENTREGADO",                  
        "VISIBLE",                  
        { 
        name: 'Foto',          
        formatter: (_, row) => html(`
        <img src="http://172.20.1.79/fotos/Fotos/${row.cells[2].data}.jpg" style="width: 80px;"
         class="image-clickable" data-id="${row.cells[2].data}"
        >`)
        }          
    ],
      
      style: {
        table: {
          border: '3px solid #ccc'
        },
        th: {
          'background-color': 'rgb(189, 215, 202)',
          color: '#000',
          'border-bottom': '3px solid #ccc',
          'text-align': 'center'
        },
        td: {
          'text-align': 'center'
        }      
      },
      
      data: data,
      language: {
        'search': {
          'placeholder': 'Buscar...',
        },
        'pagination': {
          'previous': 'Anterior',
          'next': 'Siguiente',
          'showing': 'Mostrando',
          'results': () => 'Resultados',
          'of': 'de',
          'to': 'a',
        },
      }
    });
    
    grid.render(wrapper);

   
  

  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}
 

