function filterItems(category){
let cards = document.querySelectorAll(".card")
let buttons = document.querySelectorAll('#filter_btns>button')
console.log(buttons)
cards.forEach((card)=>{
    if(category=='all'){
        card.style.display='block' //flex
    }else{
        if(card.classList.contains(category)){
            card.style.display='block' //flex
        }else{
            card.style.display='none'
        }
    }
})
buttons.forEach((btn)=>{
    btn.classList.remove('active') //initially it removes the active class to the button
})
event.target.classList.add('active') //whenever the button is clicked then only the active class is affected to the respective button 
}


//todo. Add to cart functionality
let cart = [];
let cards = document.querySelectorAll(".card")
cards.forEach((card)=>{
    let name = card.querySelector(".card_one>.card_info>h2").innerText
    // console.log(name)
    let price = Number(card.querySelector(".card_one>.card_info>p").innerText.replace("₹",''))
    // console.log(price)
    let quantity = card.querySelector(".card_two>.card_quantity>.quantity")
    // console.log(quantity)

    let plusBtn = card.querySelector(".plus")
    plusBtn.addEventListener("click",()=>{
        quantity.innerText = Number(quantity.innerText)+1
    })

    let minusBtn = card.querySelector(".minus")
    minusBtn.addEventListener("click",()=>{
        let current = Number(quantity.innerText)
        if(current>0){
            quantity.innerText = current - 1
        }
    })

    //! Add to Cart BUTTON
    let addBtn = card.querySelector(".addToCart>button")
    addBtn.addEventListener("click",()=>{
        let qty = Number(quantity.innerText)
        if(qty>0){
            let existingItem = cart.find(item=>item.name==name)
            if(existingItem){
                existingItem.qty = qty
            }else{
                cart.push({name,qty,price})
            }
            // Reset button color after 500ms, runs every click (not only first click)
            addBtn.style.background='green'
            setTimeout(() => {
                addBtn.style.background = 'chocolate'
            }, 500)
            updateCart()
        }else{
            alert("Please add atleast 1 item")
        }
    })
})

//! Update Cart Function
function updateCart() {
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalQty += item.qty
    totalPrice += item.price * item.qty
  })

  let cart_qty = document.getElementById("cart_quantity")
  let cart_price = document.getElementById("cart_price")

  cart_qty.innerText = totalQty
  cart_price.innerText = `₹${totalPrice.toFixed(2)}`

  let sidebar_items = document.querySelector("#sidebar_items")
  sidebar_items.innerHTML = ""
  cart.forEach((item, index) => {
    sidebar_items.innerHTML += `
      <div class='items_info'>
        <h1>${item.name}</h1>
        <p>Quantity: ${item.qty}</p>
        <p>Price: ₹${item.price} x ${item.qty} = <b>₹${(item.price * item.qty).toFixed(2)}</b></p>
        <button class="removeBtn" item_index="${index}">Remove</button>
      </div>
      <hr>
    `
  })


  if (cart.length > 0) {
    sidebar_items.innerHTML += `
      <div class='cart_summary'>
        <h2>Total Quantity: ${totalQty}</h2>
        <h2>Total Price: ₹${totalPrice.toFixed(2)}</h2>
      </div>
    `
  }

  //! Delete Item Functionality
  let removeButtons = document.querySelectorAll(".removeBtn")
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("item_index")
      cart.splice(index, 1)
      updateCart() 
    })
  })
}

//! Buy Now button logic
let buyBtn = document.getElementById("buyBtn")
buyBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!")
  } else {
    alert("Thank you for your purchase!")
    cart = [] 
    updateCart()
  }
})

// todo. Sidebar Functionality
let cart_icon = document.getElementById("cart_icon")
let sidebar = document.getElementById("sidebar")
cart_icon.addEventListener("click",()=>{
    sidebar.style.right="0px"
})

let close_sidebar = document.getElementById("close_sidebar")
close_sidebar.addEventListener("click",()=>{
    sidebar.style.right="-350px"
})

function toggleMobileMenu() {
    const nav = document.getElementById('nav_two');
    nav.classList.toggle('mobile-active');
}

function closeMobileMenu() {
    const nav = document.getElementById('nav_two');
    nav.classList.remove('mobile-active');
}

//! Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('nav_two');
    const button = document.querySelector('.mobile-menu-btn');
    
    if (!nav.contains(event.target) && !button.contains(event.target) && nav.classList.contains('mobile-active')) {
        nav.classList.remove('mobile-active');
    }
});