// alert('ddd')

const liberar= document.querySelector('#btn_liberar');
const campana= document.querySelector('#sel_campana');
const nomina= document.querySelector('#inp_nomina');


liberar.addEventListener('click',(event)=>{   
  if (campana.value && nomina.value) {    
    // lib_nomina(campana.value,nomina.value) 
    getEXT()
  }
}) 


// async function lib_nomina (campana,nomina) {
//   const data = {nomina: nomina, campana:campana}
//   try {
//     const resultado = await fetchData(data);
//     console.log(resultado);
//   } catch (error) {
//     console.error(error);
//   }
//  }

 

//  function fetchData(data) {
//   console.log(data);
//   return new Promise((resolve, reject) => {
//     const ruta= '/libera_nomina_data'    
//     fetch(ruta,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     })
//       .then(response => response.json())
//       .then(data => resolve(data))
//       .catch(error => reject(error));
//   });
// }


function getEXT() {  
  const data = { nomina : 577242, campana: 'citi'}
  fetch('/libera_nomina_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })


  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo completar la solicitud.');
    }
    return response.json(); // Si esperas una respuesta JSON
  })
  .then(data => {    
    console.log(data);
  })
  .catch(error => {
    console.error('Ocurrió un error:', error);
  });

}