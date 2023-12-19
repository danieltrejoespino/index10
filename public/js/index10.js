 document.addEventListener("DOMContentLoaded", function() {
  // getEXT()
  getData()
  
});

// const load_Data=document.querySelector('#load_Data')
const wrapper=document.querySelector('#wrapper')

  
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
    
    console.log(data);
    new gridjs.Grid({
      search : true,
      resizable: true,
      sort: true,
      pagination: {
        limit: 10,
      },
      // columns: Object.keys(data[0]),
      columns: ['clave', 'nombre'],
      data: data.map(item => [item.clave, item.nombre]),
      language: {
        'search': {
          'placeholder': 'Buscar...',
        },
        'pagination': {
          'previous': 'Anterior',
          'next': 'Siguiente',
          'showing': 'Mostrando',
          'results': () => 'Resultados',
        },
      }
    }).render(wrapper);

  

  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}
 