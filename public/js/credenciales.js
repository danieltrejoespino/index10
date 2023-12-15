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

    const columnsNames =Object.keys(data[0])

    const dataArray = data.map(item => [item.Ext, item.Usuario, item.Unidad]);
    console.log(columnsNames);
    new gridjs.Grid({
      search : true,
      columns: columnsNames,
      data:dataArray
    }).render(wrapper);

  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}
 

const grid = new Grid({
  columns: ['Title', 'Director', 'Producer'],
  server: {
    url: 'https://swapi.dev/api/films/',
    then: data => data.results.map(movie => 
      [movie.title, movie.director, movie.producer]
    )
  } 
});