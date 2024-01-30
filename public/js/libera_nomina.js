// alert('ddd')

const liberar= document.querySelector('#btn_liberar');
const campana= document.querySelector('#sel_campana');
const nomina= document.querySelector('#inp_nomina');


liberar.addEventListener('click',(event)=>{   
  if (campana.value && nomina.value) {
    alert('con datos');   
    lib_nomina(campana.value,nomina.value) 
  }
}) 


async function lib_nomina (campana,nomina) {
  try {
    const resultado = await fetchData();
    console.log(resultado);
  } catch (error) {
    console.error(error);
  }
 }

 

 function fetchData() {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}