document.addEventListener("DOMContentLoaded", function() {
  getEXT()
});

const showEXT=document.querySelector('#showEXT')


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
