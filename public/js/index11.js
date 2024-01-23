import {
  Grid,
  html,
  h
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
  fetch('/index_data') 
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
          "NOMINA", 
          "NOMBRE",           
          // "fecha_nac", 
          "EDAD",           
          "DEPARTAMENTO", 
          "EMPRESA", 
          "IP", 
          "FECHA", 
          // "status_id", 
          { 
          name: 'Foto',          
          formatter: (_, row) => html(`
          <img src="http://172.20.1.79/fotos/Fotos/${row.cells[0].data}.jpg" style="width: 50px;"
           class="image-clickable" data-id="${row.cells[0].data}"
          >`)
          },
          {
            name: 'prueba',
            formatter: (cell, row) => {
              return h('button', {
                className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                onClick: () => alert(`Editing`)
              }, 'Edit');
            }

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
 

