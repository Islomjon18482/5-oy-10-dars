const block = document.querySelector(".block")

function creat(data){
    return `
    <div class="product-card">
    <div class="product-info">
      <h2 class="product-title">${data.name}</h2>
      <p class="product-description">${data.description}</p>
      <p class="product-price">$${data.price}</p>
      <button class="buy-button">Buy Now</button>
    </div>
    </div>
    `
}

document.addEventListener("DOMContentLoaded", function(){
    fetch(`https://auth-rg69.onrender.com/api/products/all`)
    .then(res => res.json())
    .then(data =>{
        data.forEach(element => {
            let card = creat(element)
            block.innerHTML += card
        });
    })
    .catch(err =>{
        console.log(err);
    })
})