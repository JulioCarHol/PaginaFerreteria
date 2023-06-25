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
        
        // Se agregó una validación para verificar la clase del elemento.
        if (elem.classList.contains("productname")) {
            getproductName = elem.innerText.trim();
        }
        
        sibs.push(elem);
    }
    
    let product = {
      productname : getproductName,
      price : getprice
     };
     
     // Se eliminó esta línea, ya que no era necesaria.
     // También se cambió el nombre de la variable para evitar confusiones con otros nombres similares.
     let stringProductObjetoJSON= JSON.stringify(product);
      
     if(!sessionStorage.getItem('cart')){
         cart.push(stringProductObjetoJSON);//Se agrega objeto a array y luego se convierte en un JSON String. 
         stringCart= JSON.stringify(cart);//Se guarda el Array como un objeto JSON String en sessionStorage
         addedToCart(getproductName);//Mensaje de éxito al agregar producto al carrito
         updateCartTotal();//Actualiza los valores totales del carrito
         
     } else{
          cart= JSON.parse(sessionStorage.getItem('cart'));
          cart.push(stringProductObjetoJSON);//Se agrega objeto a array y luego se convierte en un JSON String. 
          stringCart= JSON.stringify(cart);//Se guarda el Array como un objeto JSON String en sessionStorage
          addedToCart(getproductName);//Mensaje de éxito al agregar producto al carrito
          updateCartTotal();//Actualiza los valores totales del carrito   
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
            price=parseFloat(x.price.split('$')[1]);//Extrae el valor numérico del precio a partir de la cadena que incluye $.
            productname=x.productname;//Asigna nombre de producto.

            // Se agregó una fila por cada elemento encontrado en el carrito.
            carttable += '<tr><td>' + productname + '</td><td>$' + price + '</td></tr>';
            
            total+=price;  
        }        
   }
   
   document.getElementById("total").innerHTML="$"+total;
   document.getElementById("itemsquantity").innerHTML=items;
   document.getElementById("carttable").innerHTML = carttable;//se agrega todo lo almacenado en la variable 'carritotabla'
}

function addedToCart(pname) {
  let message=pname+" ha sido agregado.";
  alerts.innerHTML=message;//en lugar de crear una nueva variable se utiliza directamente la creada previamente sin definir: "alerts"
  
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