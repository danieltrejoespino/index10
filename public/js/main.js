const swtch_theme = document.getElementById('swtch_theme')

const preferedColorScheme = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme',theme)
  localStorage.setItem('theme',theme)
}

setTheme(localStorage.getItem('theme') || preferedColorScheme  )




swtch_theme.addEventListener('click', () => {
  let swtchToTheme = localStorage.getItem('theme') ===  'dark' ?  'light' : 'dark'
  setTheme(swtchToTheme)
  
})







console.log('importacion correcta del main');



function show_alert(tipo,texto) {
  let icon = tipo === 1 ? 'success' : 'error'

  Swal.fire({
    position: "center",
    icon: icon,
    title: texto,
    showConfirmButton: false,
    timer: 1500
  });
}


function show_confirm_alert(tipo,texto) {
  let icon = tipo === 1 ? 'success' : 'error'
  Swal.fire({
    position: "center",
    icon: icon,
    title: texto,
    showConfirmButton: false,
    timer: 1500
  });
  
}