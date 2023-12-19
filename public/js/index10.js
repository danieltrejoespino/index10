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
    
    const objetoTransformado = data.map(item => {
      return {             
        "clave": item[0],
        "nombre": item[1], 
        "apellido_paterno": item[2], 
        "apellido_materno": item[3], 
        "fecha_nac": item[4], 
        "nombre_departamento": item[5], 
        "EMPRESA": item[6], 
        "equipo": item[7], 
        "hora": item[8], 
        "status_id": item[9],        
        "Foto": item[10],
      };
    });
    console.log(objetoTransformado);

    new gridjs.Grid({
      search : true,
      resizable: true,
      sort: true,
      pagination: {
        limit: 10,
      },
      columns: Object.keys(objetoTransformado[0]),
      data: objetoTransformado,
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
 