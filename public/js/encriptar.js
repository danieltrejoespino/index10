const btn_next=document.querySelector('#btn_next')
const txt_new=document.querySelector('#txt_new')

const txt_encode=document.querySelector('#txt_encode')
const txt_decode=document.querySelector('#txt_decode')

const btn_copy=document.querySelectorAll('.btn_copy')

btn_next.addEventListener('click', function () {   
  if (valida()== true) {
    txt_encode.value=btoa(txt_new.value)
    txt_decode.value=atob(txt_new.value)

  } else {
    show_alert(2,'Agrega un texto para generar')
  }  
        
})

function valida() {
  if (!txt_new.value) {
    show_alert(2,'Agrega un texto para generar')
    return false
  } 
  return true
}

btn_copy.forEach(function(boton) {
  boton.addEventListener('click', function() {
    let dataInfoValue = boton.dataset.type;
    let opcion = dataInfoValue === 'decode' ? 'txt_decode' : 'txt_encode';
    let btn_temp = document.getElementById(opcion);
    btn_temp.select()
    document.execCommand("copy");
    btn_temp.setSelectionRange(0, 0);  

    show_confirm_alert(1,'Texto copiado!');
  });
});
 