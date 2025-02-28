let productCard = JSON.parse(localStorage.getItem("productCard")) || [];

const stockContainer = document.getElementById("stockContainer");
const stockForm = document.getElementById("stockForm");

const createCard = (product) =>{

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "cardImg"
    img.src = product.imgUrl;

    const brand = document.createElement("p");
    brand.innerText = `Marca: ${product.brand}`;

    const model = document.createElement("p");
    model.innerText = `Modelo: ${product.model}`;

    const color = document.createElement("p");
    color.innerText = `Color: ${product.color}`;

    const size = document.createElement("p");
    size.innerText = `Talle: ${product.size}`;

    const amount = document.createElement("p");
    amount.innerText = `Cantidad: ${product.amount}`;

    const modifyButton = document.createElement("button");
    modifyButton.className = "cardButton";
    modifyButton.innerText = "Modificar Stock";
    modifyButton.onclick = () => modifyStock(product);

    const removeItem = document.createElement("button");
    removeItem.className = "cardButton";
    removeItem.innerText = "Eliminar";
    removeItem.onclick = () => removeProduct(product);

    card.appendChild(img);
    card.appendChild(brand);
    card.appendChild(model);
    card.appendChild(color);
    card.appendChild(size);
    card.appendChild(amount);
    card.appendChild(modifyButton);
    card.appendChild(removeItem);

    stockContainer.appendChild(card);
}

const addProduct = (product) =>{
    productCard.push(product);
    localStorage.setItem("productCard", JSON.stringify(productCard));
    stockContainer.innerText= ""
    showProducts();
}

const removeProduct = (productToRemove) =>{
    productCard = productCard.filter(product => product !== productToRemove);
    localStorage.setItem("productCard", JSON.stringify(productCard));
    stockContainer.innerHTML = "";
    showProducts();
}

const modifyStock = (product) =>{
    const newAmount = prompt("Ingrese la nueva cantidad:", product.amount);
    if(newAmount !==null && !isNaN(newAmount)){
        product.amount = parseInt(newAmount);
        localStorage.setItem("productCard", JSON.stringify(productCard));
        stockContainer.innerText="";
        showProducts();
    }
}

const showProducts = () => {
    if (productCard.length === 0) {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.innerText = "No hay productos en el stock.";
        stockContainer.appendChild(noProductsMessage);
    } else {
        productCard.forEach(product => {
            createCard(product); 
        });
    };
};


const productsForm = document.getElementById("productsForm");
productsForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const brand = e.target[1].value;
    const model = e.target[2].value;
    const color = e.target[3].value;
    const size = e.target[4].value;
    const amount = e.target[5].value;

    const cardImg = document.getElementById("productImage");
    const imgUrl = cardImg.files.length > 0 ? URL.createObjectURL(productImage.files[0]) : "";

    const newProduct ={
        imgUrl,
        brand,
        model,
        color,
        size,
        amount
    
    }

    addProduct(newProduct);

    e.target.reset();


});

showProducts();