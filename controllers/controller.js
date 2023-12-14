const menuItems = [
    { label: 'uploadv2', href: '/upload_crudv2' },
    { label: 'd-ecrypt', href: '/d-ecrypt' },
    { label: 'insert_mongo', href: '/test' },
    { label: 'ddd', href: '/test' }
  ];



const home = {
    main : (req,res) => {
        res.render('index',{menuItems})
    }
}

module.exports = {
    home
}