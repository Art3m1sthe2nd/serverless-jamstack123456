//start of get request to retrieve available coffees

const getInventory = async () => {
  let results = await axios.get('https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-eb69459a-3a69-4613-acc6-efe476189b9f/cloud/getCoffee');
results.data.forEach(item => {
  let pic = item.pic;
  let name = item.name;
  let description = item.description;
  let price = item.price;

  let table = document.getElementById("product-table");
  let newRow = table.insertRow(-1);
  let picCell = newRow.insertCell();
  let nameCell = newRow.insertCell();
  let priceCell = newRow.insertCell();
  
  let picLink = document.createElement("img");
  picLink.src = pic; 
  picLink.classList.add("product-image");

  let nameText = document.createElement("h2");
  nameText.innerHTML = name;

  let descriptionText = document.createTextNode(description);
  let priceText = document.createElement("h3");
  priceText.innerHTML = "$" + price;

  let addToCart = document.createElement("button");
  addToCart.classList.add("addToCart");
  addToCart.innerHTML = "Add to cart"
  addToCart.name = name;
  addToCart.value = price;

  picCell.appendChild(picLink);
  nameCell.appendChild(nameText);
  nameCell.appendChild(descriptionText);
  nameCell.appendChild(priceText);
  priceCell.appendChild(addToCart);

  let cartButtons = document.querySelectorAll(".addToCart");

  cartButtons.forEach(item => {
  item.addEventListener('click', cartHandler)
  })

})
}
getInventory();

// start of shopping cart handler
let order = [];
const cartHandler = function() {
  let addItem = {"name" : this.name, "price" : this.value};
  let currentQuantity = parseInt(document.getElementById("order-quantity").innerHTML);
  let updatedQuantity = currentQuantity + 1;
  document.getElementById("order-quantity").innerHTML = updatedQuantity;
  console.log(updatedQuantity);
  order.push(addItem);
  let stringOrder = JSON.stringify(order);
  localStorage.setItem("order", stringOrder);

  let total = Number(localStorage.getItem("total"));
  if (total) {
    let itemValue = Number(this.value)
    let newTotal = itemValue + total;
    localStorage.setItem("total", newTotal);
  } else {
    localStorage.setItem("total", this.value);
  }
}


const subscribeButton = document.getElementById("subscribe");

const subscribeHandler = async function() {
  const email = document.getElementById("email").value;
  const emailUrl = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-eb69459a-3a69-4613-acc6-efe476189b9f/cloud/postEmail" + "?email=" + email;

  try {
    const response = await axios.post(emailUrl);
    const inserted = response.data.inserted;
    console.log(inserted);
    console.log(response);
    localStorage.setItem("subscribe", email);
    document.getElementById("email").value = '';
    let emailForm = document.getElementById("email-form");
    const message = inserted ? "You have been successfully added to our email list." : "You are already subscribed.";
    const successMessage = document.createTextNode(message);
    console.log(inserted);
    emailForm.appendChild(successMessage);
    setTimeout(() => {
      emailForm.removeChild(successMessage);
    }, 5000);
  } catch (error) {
    console.error(error);
    // Handle the error here if necessary
  }
};

subscribeButton.addEventListener('click', subscribeHandler);




let contactButton = document.getElementById("send");
const contactHandler = async function() {
  const newName = document.getElementById("name").value;
  const newContactEmail = document.getElementById("contactEmail").value;
  const newAbteilung = document.getElementById("Abteilung").value;
  const newAnliegen = document.getElementById("anliegen").value;

  const contactUrl = "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-eb69459a-3a69-4613-acc6-efe476189b9f/cloud/checkEmail" +
    "?name=" + newName +
    "&contactEmail=" + newContactEmail +
    "&Abteilung=" + newAbteilung +
    "&anliegen=" + newAnliegen;
  try {
    const response = await axios.post(contactUrl);
    localStorage.setItem("send", email);
    document.getElementById("name").value = '';
    document.getElementById("contactEmail").value = '';
    document.getElementById("Abteilung").value = '';
    document.getElementById("anliegen").value = '';
    let emailForm = document.getElementById("email-form");
    const message = "The contact form was send sucsessfully.";
    const successMessage = document.createTextNode(message);
    emailForm.appendChild(successMessage);
    setTimeout(() => {
      emailForm.removeChild(successMessage);
    }, 5000);
  } catch (error) {
    console.error(error);
    // Handle the error here if necessary
  }
};

contactButton.addEventListener('click', contactHandler);


// start of shopping cart modal handler 

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

const container = document.getElementById("testModal");
const modal = new bootstrap.Modal(container);

document.getElementById("btnShow").addEventListener("click", function () {
  modal.show();
  $('#modal-table tr:not(:first)').remove();
  let orderData = JSON.parse(localStorage.getItem("order"));
  let table = document.getElementById("modal-table");

  orderData.forEach(item => {
  let name = item.name;
  let price = item.price;

  let newRow = table.insertRow(-1);
  let nameCell = newRow.insertCell();
  let priceCell = newRow.insertCell();

  let nameText = document.createElement("p");
  nameText.innerHTML = name;

  let priceText = document.createElement("p");
  priceText.innerHTML = "$" + price;

  nameCell.appendChild(nameText);
  priceCell.appendChild(priceText);
  })
  
  let grandTotal = localStorage.getItem("total");
  let newRow = table.insertRow(-1);
  let totalCell = newRow.insertCell();
  let grandTotalCell = newRow.insertCell();

  let totalText = document.createElement("h3");
  console.log(totalText); 
  totalText.innerHTML = "Grand total: "
  let grandTotalText = document.createElement("h3");
  grandTotalText.innerHTML = "$" + grandTotal;

  totalCell.appendChild(totalText);
  grandTotalCell.appendChild(grandTotalText);

});