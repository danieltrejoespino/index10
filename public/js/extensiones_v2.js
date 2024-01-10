const input_search= document.getElementById('input_search')
const titulosRow=document.querySelector('#tablaTitulosRow')
const datosBody=document.querySelector('#tablaDatosBody')

document.addEventListener("DOMContentLoaded", function() {
     modelar_datos()
    
  });


function modelar_datos() {
    
    
    fetch('/get_extensions')
    .then((result) => {
        if (!result.ok) {
            throw new Error(`Error al obtener los datos. Código de estado: ${rspta.status}`); 
        }
        return result.json();
    })
    .then((datos) => {
        // Hacer algo con los datos obtenidos (en este caso, simplemente imprimirlos)
        console.log(datos);
        titulos = Object.keys(datos[0])
        console.log(titulos);
        titulos.shift();
        titulos.forEach((element, indice) => {                        
            const tituloColumna  = document.createElement('th')
            tituloColumna.textContent = element;
            titulosRow.appendChild(tituloColumna);
        });

        titulosRow.classList.add('table-primary');



        datos.forEach((element,indice) => {
            console.log(element._id);
            const fila = document.createElement('tr');

            const idColumna = document.createElement('td');
            idColumna.textContent = element._id;
            idColumna.classList.add('hide_table');
            fila.appendChild(idColumna);

            const ext = document.createElement('td');
            ext.textContent = element.ext;
            fila.appendChild(ext);

            const usuario = document.createElement('td');
            usuario.textContent = element.usuario;
            fila.appendChild(usuario);     
            
            const departamento = document.createElement('td');
            departamento.textContent = element.departamento;
            fila.appendChild(departamento);
            
 
            

            if (indice % 2 === 0) {
                fila.classList.add('table-warning');
              } else {
                fila.classList.add('table-light');
              }

            datosBody.appendChild(fila);

        });
      })
    .catch((err) => {
        console.log(err);
    });
}



input_search.addEventListener('input',(e) => {
    e.preventDefault();
    // console.log(input_search.value);
    let txt_search =input_search.value.toLowerCase()
    let tbl_body = datosBody
    let tbl_rows = tbl_body.getElementsByTagName('tr')
    // console.log(tblRows);
    for (let i = 0; i < tbl_rows.length; i++) {
        const element = tbl_rows[i].textContent.toString().toLowerCase();
        // console.log(element);
        if (element.indexOf(txt_search) === -1 ) {
            tbl_rows[i].style.visibility = 'collapse'
        }else {
            tbl_rows[i].style.visibility = ''
        }
        
    }
})


function actions_ext(opcion,data) {
    
}