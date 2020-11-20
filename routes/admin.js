var express = require('express');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')



/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    res.render('admin/view-products', { admin: true, products })
  })

});

router.get('/all-products', (req, res, next) => {
  productHelper.getAllProducts().then((products) => {
    res.render('admin/all-products', { admin: true, products })
  })
})

router.get('/add-product', (req, res) => {
  res.render('admin/add-products')
})

router.post('/add-product', (req, res) => {
  productHelper.addProduct(req.body, (id) => {
    let image = req.files.image
    image.mv('./public/product-images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.render('admin/add-products')
      } else {
        console.log(err)
      }
    })
    
  })
})

router.get('/all-orders', (req, res) => {
  res.send('all orders')
})

router.get('/all-users', (req, res) => {
  res.send('all users')
})




module.exports = router;
