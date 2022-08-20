
"use strict"
let Title =  document.getElementById("Title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById('tbody');
let deleteAll = document.getElementById("deleteAll")
let mood = "create";
let fake;
let search = document.getElementById("search")
function getTotal() {
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value  ;
        total.innerHTML = result;
        total.style.background = "#040";
    }else {
        total.innerHTML = "";
        total.style.cssText = ` background-color: #820e0e;`;
    }
}

let dataProduct;
if (localStorage.crudsProduct != null ) {
    dataProduct = JSON.parse(localStorage.getItem("crudsProduct"))
}else {
    dataProduct = [];
}
submit.addEventListener("click" , function() {
    let newProduct = {
        Title:Title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(mood === "create") {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count ; i++) {
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[ fake ] = newProduct;
        count.style.display = "block"
        submit.innerHTML = "create"
        mood = "create"
    }
    localStorage.setItem("crudsProduct" , JSON.stringify(dataProduct))
    displayProduct();
});
submit.addEventListener("click" , function() {
    Title.value = "";
    price.value = "";
    ads.value = "";
    taxes.value = "";
    Title.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
})
// read = display
function displayProduct() {
    getTotal();
    let table = ``
    for (let i = 0; i < dataProduct.length; i++) {
        table  += `              <tr>
        <td>${i}</td>
        <td>${dataProduct[i].Title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateProduct(${i})"  class="btn">update</button></td>
        <td><button onclick="deleteProduct(${i}) " class="btn"> delete </button></td>
    </tr>`
    }
    tbody.innerHTML = table;
    if (dataProduct.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAllProduct()" class="btn"> deleteAll(${dataProduct.length}) </button>`
    }else {
        deleteAll.innerHTML =``
    };

}
displayProduct();
function deleteProduct(index) {
    dataProduct.splice(index , 1);
    localStorage.setItem("crudsProduct" , JSON.stringify(dataProduct));
    displayProduct();
};
function deleteAllProduct() {
    dataProduct.splice(0);
    localStorage.setItem("crudsProduct" , JSON.stringify(dataProduct));
    displayProduct();
}

// x= [2,1,2,1,2,1,2];

// x[ 2 ] = 50

function updateProduct(index) {
    Title.value = dataProduct[index].Title ;
    price.value = dataProduct[index].price ;
    taxes.value = dataProduct[index].taxes ;
    ads.value = dataProduct[index].ads ;
    discount.value = dataProduct[index].discount;
    getTotal();
    count.style.display = "none"
    category.value = dataProduct[index].category ;
    submit.innerHTML = "update"
    mood = "updata"
    fake = index;
    window.scroll({
        top:0 , 
        left: 0 ,
        behavior: "smooth"
    })
}
let searchMood = "title";
function getSreachMood(id){
    if(id === "searchTitle") {
        searchMood = "title";
    }else {
        searchMood = "category";
    }
    search.placeholder = `search By ${searchMood}`;
    search.focus()
    console.log(searchMood)
    search.value = "";
    displayProduct();
}
function searchProduct(value) {
    let table = ``;
    for (let i = 0; i < dataProduct.length; i++) {
        if(searchMood == "title") {
            if (dataProduct[i].Title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                table  += `<tr>
                <td>${i}</td>
                <td>${dataProduct[i].Title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})"  class="btn">update</button></td>
                <td><button onclick="deleteProduct(${i}) " class="btn"> delete </button></td>
            </tr>`
            }
    }
    else{
            if (dataProduct[i].category.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                table  += `<tr>
                <td>${i}</td>
                <td>${dataProduct[i].Title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateProduct(${i})"  class="btn">update</button></td>
                <td><button onclick="deleteProduct(${i}) " class="btn"> delete </button></td>
            </tr>`
            }
    }
}
    tbody.innerHTML = table;
}
















