updateCartTotal();

document.getElementById("emptycart").addEventListener("click", emptyCart);
let btns = document.getElementsByClassName('addtocart');
for (const element of btns) {
    element.addEventListener('click', function() {addToCart(this);});
}

function addToCart(elem) {
    let sibs = [];
    let getprice;
    let getproductName;
    let cart = [];
    let stringCart;
    
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; 
        if(elem.className == "price"){
            getprice = elem.innerText.trim();
        }
        if (elem.classList.contains("productname")) {
            getproductName = elem.innerText.trim();
        }
        
        sibs.push(elem);
    }
    
    let product = {
      productname : getproductName,
      price : getprice
     };
     let stringProductObjetoJSON= JSON.stringify(product);
      
     if(!sessionStorage.getItem('cart')){
         cart.push(stringProductObjetoJSON);
         stringCart= JSON.stringify(cart);
         addedToCart(getproductName);
         updateCartTotal();
     } else{
          cart= JSON.parse(sessionStorage.getItem('cart'));
          cart.push(stringProductObjetoJSON);
          stringCart= JSON.stringify(cart);
          addedToCart(getproductName);
          updateCartTotal(); 
     }
     
     sessionStorage.setItem('cart', stringCart); //Guardando variable 'stringCarro' en sessionStorage.
}

function updateCartTotal(){
    let total = 0;
    let price = 0;
    let items = 0;
    let productname = "";
    let carttable = "";
    
    if(sessionStorage.getItem('cart')) {
        cart= JSON.parse(sessionStorage.getItem('cart'));
        items= cart.length;

        for (let i in cart){
            let x=JSON.parse(cart[i]);
            price=parseFloat(x.price.split('$')[1]);
            productname=x.productname;
            carttable += '<tr><td>' + productname + '</td><td>$' + price + '</td></tr>';          
            total+=price;  
        }        
   }
   
   document.getElementById("total").innerHTML="$"+total;
   document.getElementById("itemsquantity").innerHTML=items;
   document.getElementById("carttable").innerHTML = carttable;
}

function addedToCart(pname) {
  let message=pname+" ha sido agregado.";
  alerts.innerHTML=message;
  
  if(!alerts.classList.contains("message")){
      alerts.classList.add("message");
  }
}

function emptyCart() {
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
        if(alerts.classList.contains("message")){
            alerts.classList.remove("message");
       }
   }
}
const emptyCartButton = document.querySelector('#emptycart');
const checkoutButton = document.querySelector('#checkout');
emptyCartButton.addEventListener('click', function() {
  const confirmed = confirm('¿Está seguro que desea vaciar el carrito?');
  if (confirmed) {
    emptyCart();
    updateCartTotal();
    addedToCart("El carrito ha sido vaciado.");
    if(alerts.classList.contains("message")){
      alerts.classList.remove("message");
   }
  }
});
checkoutButton.addEventListener('click', function() {
  alert('¡Gracias por su compra!');
});