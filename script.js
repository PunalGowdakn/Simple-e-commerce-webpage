const products = [
  {id:1,name:"Studio Wireless Headphones",category:"Tech",price:2499,emoji:"🎧",bg:"#e8edf5",tag:"BESTSELLER"},
  {id:2,name:"Everyday Canvas Backpack",category:"Fashion",price:1599,emoji:"🎒",bg:"#f4e9dc",tag:"POPULAR"},
  {id:3,name:"Minimal Ceramic Mug",category:"Home",price:499,emoji:"☕",bg:"#f4eee4"},
  {id:4,name:"Smart Fitness Watch",category:"Tech",price:3299,emoji:"⌚",bg:"#e7eee9",tag:"NEW"},
  {id:5,name:"Classic Street Sneakers",category:"Fashion",price:2199,emoji:"👟",bg:"#f1e9e9"},
  {id:6,name:"Nordic Desk Lamp",category:"Home",price:899,emoji:"💡",bg:"#f4f0df"},
  {id:7,name:"Portable Bluetooth Speaker",category:"Tech",price:1799,emoji:"🔊",bg:"#e8e9f4"},
  {id:8,name:"Retro Sunglasses",category:"Fashion",price:799,emoji:"🕶️",bg:"#e6efed"},
  {id:9,name:"Mechanical Keyboard",category:"Tech",price:2899,emoji:"⌨️",bg:"#eee9f5",tag:"TRENDING"},
  {id:10,name:"Everyday Water Bottle",category:"Home",price:649,emoji:"🧴",bg:"#e4f0ed"},
  {id:11,name:"Classic Wrist Watch",category:"Fashion",price:1899,emoji:"⌚",bg:"#f3e9df"},
  {id:12,name:"Soft Throw Cushion",category:"Home",price:749,emoji:"🛋️",bg:"#f1e9e5"},
  {id:13,name:"Wireless Mouse",category:"Tech",price:999,emoji:"🖱️",bg:"#e9edf1"},
  {id:14,name:"Travel Duffle Bag",category:"Fashion",price:1399,emoji:"🧳",bg:"#f0e9df"},
  {id:15,name:"Indoor Planter Set",category:"Home",price:599,emoji:"🪴",bg:"#e8f0e5"},
  {id:16,name:"Instant Film Camera",category:"Tech",price:4599,emoji:"📷",bg:"#f2e9ed"}
];
let cart = [];
let activeCategory = "All";
const grid = document.getElementById("productGrid");
const money = amount => "₹" + amount.toLocaleString("en-IN");

function renderProducts(){
  const term = document.getElementById("searchInput").value.toLowerCase();
  const shown = products.filter(p => (activeCategory==="All" || p.category===activeCategory) && p.name.toLowerCase().includes(term));
  grid.innerHTML = shown.length ? shown.map(p => `
    <article class="product-card">
      <div class="product-image" style="background:${p.bg}">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
        <span class="product-emoji">${p.emoji}</span>
      </div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
        <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" onclick="addToCart(${p.id})">＋ Add</button></div>
      </div>
    </article>`).join("") : "<p class='no-results'>No products found. Try another search.</p>";
  document.getElementById("resultCount").textContent = `${shown.length} products`;
}
function addToCart(id){const item=cart.find(p=>p.id===id);if(item)item.qty++;else cart.push({...products.find(p=>p.id===id),qty:1});renderCart();}
function removeFromCart(id){cart=cart.filter(p=>p.id!==id);renderCart();}
function renderCart(){
  const count=cart.reduce((sum,p)=>sum+p.qty,0),total=cart.reduce((sum,p)=>sum+p.price*p.qty,0);
  document.getElementById("cartCount").textContent=count;
  document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><div><strong>${p.emoji} ${p.name}</strong><small>${money(p.price)} × ${p.qty}</small></div><div><strong>${money(p.price*p.qty)}</strong><br><button class="remove-item" onclick="removeFromCart(${p.id})">Remove</button></div></div>`).join(""):'<p class="empty-cart">Your cart is empty.</p>';
}
document.getElementById("filters").addEventListener("click",e=>{if(!e.target.matches(".filter"))return;document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");activeCategory=e.target.dataset.category;renderProducts();});
document.getElementById("searchInput").addEventListener("input",renderProducts);
const panel=document.getElementById("cartPanel"),overlay=document.getElementById("overlay");
function openCart(){panel.classList.add("open");overlay.classList.add("show");}
function closeCart(){panel.classList.remove("open");overlay.classList.remove("show");}
document.getElementById("cartButton").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>{if(!cart.length){alert("Your cart is empty!");return;}alert("Demo checkout successful! No real payment was made.");cart=[];renderCart();closeCart();});
renderProducts();
