document.addEventListener("DOMContentLoaded", function() {
  // getEXT()
  getEXT_gridjs()
  
});

// const showEXT=document.querySelector('#showEXT')
const wrapper=document.querySelector('#wrapper')


function __getEXT() {
  myGrid.innerHTML=''
  fetch('/data_extensiones') 
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
    
    const gridOptions = {
      rowData: data,
      columnDefs: Object.keys(data[0]).map((key) => ({ field: key })),
      defaultColDef: {
        filter: true,
        editable: true,
      },
      // Grid Options
      pagination: true,
    };

     
    const myGridElement = document.querySelector('#myGrid');
    agGrid.createGrid(myGridElement, gridOptions);

  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}

function getEXT() {
  showEXT.innerHTML=''
  fetch('/data_extensiones') 
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
    let newEXT=''    
    
    data.forEach(element => {              
    console.log(element.extension);
      newEXT+=`
        <tr>
          <td>
            ${element.extension}
          </td>
          <td>
            ${element.usuario}
          </td>
          <td>
            ${element.unidad}
          </td>
        </tr>` 
    });
    showEXT.innerHTML=newEXT
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}


function getEXT_gridjs() {
  wrapper.innerHTML=''
  fetch('/data_extensiones') 
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
      columns: Object.keys(data[0]),
      data: data.map(item => [item.Ext, item.Usuario, item.Unidad]),
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
 
