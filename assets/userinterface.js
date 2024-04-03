$(document).ready(function () {
  // var hashes = window.location.href.slice(window.location.href.indexOf('?'))
  // var i=hashes.indexOf(":")+1
  // var j=hashes.indexOf(",")
  // var pid=hashes.slice(i,j)


  $.getJSON('/fetch_cart', function (data) {
    //alert(data.data)
    var cart = JSON.parse(data.data)
    var key = Object.keys(cart)
    $('#shoppingcart').html(`${ key.length }`)
  })
  $('#qtycomponent').hide()
  $("#user-menu-button").click(function () {
    $('#dropdown').toggle()
  })




  $.getJSON('http://localhost:8000/fetch_all_user_category', function (data) {
    var htm = ''
    data.data.map((item) => {
      htm += `<li><a href="#">${ item.categoryname }</a></li>`
    })

    $('.mainmenu').html(htm)

  })

  $.getJSON('http://localhost:8000/fetch_all_products', function (data) {
    htm = ''
    data.data.map(item => {
      var price
      var offerprice
      var discount
      if (item.offerprice > 0) {
        price = "<s >" + item.price + "</s>"
        offerprice = item.offerprice
        discount = Math.floor(((item.price - item.offerprice) * 100) / item.price)
      }
      else {
        offerprice = item.price
        price = "<div></div>"
        discount = "<div></div>"
      }

      var data = JSON.stringify(item)
      htm +=
        `<a href='http://localhost:8000/buy_product?product=${ data }'>
          <div style=" border-radius:10px; margin:10px;display: flex; flex-direction: column;align-items: center; width:220px;height:320px;padding: 5px;border:1px solid #bdc3c7;box-shadow: 2px 2px #ecf0f1;elevation: below;">
            <div>
              <img src="http://localhost:8000/static/${ item.productimage }" style='width:130px; height: 130px;'/> 
            </div>
            <div style="padding:5px;">
              <div style="width:200px; color:grey ;font-size:10px;text-align: left;">
                <i>${ item.bname }</i>
              </div>
              <div style="width:200px;font-weight:normal;color: black; text-align: left;">
                ${ item.productname } ${ item.scname }
              </div>
              <div>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star "></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </div>

              <div style="width:200px;text-align: left; display: flex;flex-direction: row;">
                <div style="font-weight: bolder;color: black;">
                  ₹${ offerprice }&nbsp;&nbsp;
                </div>
                <div style="font-weight: normal;font-size:14px;color: grey;vertical-align: text-bottom;">
                  ₹${ price }&nbsp;&nbsp;&nbsp;
                </div>
                <div style="font-weight:bold;color:green;font-size:14px;vertical-align: text-bottom;">
                  ${ discount }% off
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center;justify-content:center;margin-top:auto;padding-bottom: 10px;">
              <button class="btn wave-light wave-effect" style="background-image: linear-gradient(to right,#15c196,hsl(165, 99%, 31%));margin-right: 10px;width: 180px;height:90%;"><b>Add To Cart</b></button>
            </div>
          </div>
      </a>`
    })

    $('#productlist').html(htm)

  });

  $.getJSON('http://localhost:8000/fetch_all_subcategory_json', function (data) {
    var htm = ''
    data.data.map((item) => {

      htm += `<div style="margin:4px;padding:10px;width:130px;background: #f5f6fa; height: 120px; border-radius: 10px; display: flex;flex-direction: column; align-items: center;">`
      htm += `<div style="padding: 5px"><img src='/static/${ item.subcategoryicon }' width="50"></div>`
      htm += `<div style="display:flex; flex-direction: column;"><div style="font-weight:bold; font-size: 10px; padding: 5px">${ item.subcategoryname }</div><div style="color: green;"></div></div>`
      htm += `</div>`

    })
    htm += ""

    $('#subcategorylist').html(htm)

  })

  $('.plus').click(function () {

    var v = $('#qty').html()
    if (v <= 4)
      v++
    $('#qty').html(v)
    cartContainer($(this).attr('product'), $('#qty').html())
  })
  $('.minus').click(function () {

    var v = $('#qty').html()
    if (v > 0)
      v--
    if (v == 0) {
      $('.addtocart').show()
      $('#qtycomponent').hide()
      alert($(this).attr('productid'))
      $.getJSON('/remove_from_cart', { 'productid': $(this).attr('productid') }, function (data) {
        alert('removed')
      })
    }
    $('#qty').html(v)
    cartContainer($(this).attr('product'), $('#qty').html())

  })
  $('.addtocart').click(function () {
    $('.addtocart').hide()
    $('#qtycomponent').show()
    $('#qty').html(1)
    cartContainer($(this).attr('product'), $('#qty').html())

  })

  function cartContainer(product, qty) {

    $.getJSON('/add_to_cart', { 'product': product, 'qty': qty }, function (data) {
      //alert(data.data)
      var cart = JSON.parse(data.data)
      var key = Object.keys(cart)
      $('#shoppingcart').html(`${ key.length }`)
    })

  }
  function removeCartContainer(productid) {
    $.getJSON('/remove_from_cart', {'productid':productid}, function (data) {
               alert('removed')
        var cart=JSON.parse(data.data)
        var key=Object.keys(cart)
          $('#shoppingcart').html(`(${key.length} Articals)&nbsp;&nbsp;&nbsp;`)
   
           })
   }
})