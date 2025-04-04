
let productCard = [];
try {
    const stored = JSON.parse(localStorage.getItem("productCard"));
    if (Array.isArray(stored)) {
        productCard = stored;
    }
} catch {
    productCard = [];
}

const accordionContainer = document.getElementById("accordion-container");
const productsForm = document.getElementById("productsForm");
const productImageInput = document.getElementById("productImage");
const productImagePreview = document.getElementById("productImagePreview");


const loadProducts = async () => {
    try {
        if (productCard.length === 0) { 
            const response = await fetch("productos.json");
            const data = await response.json();
            productCard = Array.isArray(data) ? data : [];

        }

        showProducts();
    } catch (error) {
        console.error("Error al obtener productos:", error);
        Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
};


const groupProducts = (key) => {
    return productCard.reduce((acc, product) => {
        (acc[product[key]] = acc[product[key]] || []).push(product);
        return acc;
    }, {});
};


const showProducts = (filterKey = "brand") => {
    accordionContainer.innerHTML = "";
    const groupedProducts = groupProducts(filterKey);

    Object.keys(groupedProducts).forEach(category => {
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");

        const header = document.createElement("h2");
        header.classList.add("accordion-header");
        header.innerText = category.toUpperCase();
        header.addEventListener("click", () => {
            content.classList.toggle("open");
        });

        const content = document.createElement("div");
        content.classList.add("accordion-content");
        
        groupedProducts[category].forEach(product => {
            content.appendChild(createCard(product));
        });

        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        accordionContainer.appendChild(accordionItem);
    });
};


const createCard = (product) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "cardImg";
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

    return card; 
};


productsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        imgUrl: productImagePreview.src || "img/default.png",
        brand: e.target[1].value,
        model: e.target[2].value,
        color: e.target[3].value,
        size: e.target[4].value,
        amount: e.target[5].value
    };

    productCard.push(newProduct);
    localStorage.setItem("productCard", JSON.stringify(productCard));
    showProducts();
    e.target.reset();
    productImagePreview.src = "img/default.png";
    Swal.fire("Éxito", "Producto agregado correctamente", "success");
});

const removeProduct = (productToRemove) => {
    const index = productCard.findIndex(product => 
        product.brand === productToRemove.brand &&
        product.model === productToRemove.model &&
        product.color === productToRemove.color &&
        product.size === productToRemove.size
    );

    if (index !== -1) {
        productCard.splice(index, 1);
        localStorage.setItem("productCard", JSON.stringify(productCard));
        showProducts();
    }
};

const modifyStock = (product) => {
    Swal.fire({
        title: "Modificar Stock",
        input: "number",
        inputLabel: `Cantidad actual: ${product.amount}`,
        inputValue: product.amount,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value || isNaN(value) || value < 0) {
                return "Ingrese un número válido.";
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const index = productCard.findIndex(p => 
                p.brand === product.brand &&
                p.model === product.model &&
                p.color === product.color &&
                p.size === product.size
            );

            if (index !== -1) {
                productCard[index].amount = parseInt(result.value);
                localStorage.setItem("productCard", JSON.stringify(productCard));
                showProducts();
            }
        }
    });
};


productImageInput.addEventListener("change", () => {
    if (productImageInput.files.length > 0) {
        productImagePreview.src = URL.createObjectURL(productImageInput.files[0]);
    }
});


loadProducts();
