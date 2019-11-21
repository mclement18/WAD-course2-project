// /************************************
//  * Hats tasks section
//  ************************************/

// Defining a simple hat object with a .toString() method
let blueBaseballCap = {
  name: "Baseball cap",
  price: 11.99,
  color: "blue",
  imageHref: "./assets/images/blue/hats/1.png",
  toString: function() {
    return `${this.name}, color ${this.color}, price: ${this.price}, image: ${this.imageHref}`;
  }
};

// Check if the method works
console.log(blueBaseballCap.toString());

// Create a Hat prototype now Accessory
function Accessory(name, price, color, imageHref) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.imageHref = imageHref;
}

// Accessory prototype methods
// Method to return accessory info as organised strings
Accessory.prototype.toString = function() {
  return `${this.name}, color ${this.color}, price: ${this.price}, image: ${this.imageHref}`
};

// define an array of Hats
let hats = [
  new Accessory("Baseball cap", 11.99, "red", "./assets/images/red/hats/1.png"),
  new Accessory("Baseball cap", 11.99, "blue", "./assets/images/blue/hats/1.png"),
  new Accessory("Baseball cap", 11.99, "yellow", "./assets/images/yellow/hats/1.png"),
  new Accessory("Baseball cap", 11.99, "green", "./assets/images/green/hats/1.png"),
  new Accessory("Beanie", 17.99, "red", "./assets/images/red/hats/2.png"),
  new Accessory("Beanie", 17.99, "blue", "./assets/images/blue/hats/2.png"),
  new Accessory("Beanie", 17.99, "green", "./assets/images/green/hats/2.png"),
  new Accessory("Straw hat", 10.99, "yellow", "./assets/images/yellow/hats/3.png"),
  new Accessory("Straw hat", 10.99, "blue", "./assets/images/blue/hats/3.png"),
  new Accessory("Trilby", 10.99, "red", "./assets/images/red/hats/4.png"),
  new Accessory("Trilby", 10.99, "blue", "./assets/images/blue/hats/4.png"),
  new Accessory("Trilby", 10.99, "yellow", "./assets/images/yellow/hats/4.png")
];

// Function to display an Accessory object as a card on the product.html page
const displayAccessory = function(accessory) {
  // Create first the HTML component piece by piece from the inner part
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = accessory.name;

  let itemColor = document.createElement("em");
  itemColor.textContent = accessory.color;

  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.appendChild(document.createTextNode("Color: "));
  cardText.appendChild(itemColor);

  let cardButton = document.createElement("button");
  cardButton.className = "btn btn-outline-primary";
  cardButton.textContent = "Add to wishlist!";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body text-center";
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardButton);

  let cardImage = document.createElement("img");
  cardImage.className = "card-img-top";
  cardImage.src = accessory.imageHref;
  cardImage.alt = `Image of a ${accessory.color} ${accessory.name}`;

  let priceTag = document.createElement("div");
  priceTag.className = "currency btn btn-light disabled";
  priceTag.textContent = accessory.price;

  let card = document.createElement("div");
  card.className = "card my-3";
  card.appendChild(priceTag);
  card.appendChild(cardImage);
  card.appendChild(cardBody);

  let cardContainer = document.createElement("div");
  cardContainer.className = `accessory col-sm-4 ${accessory.color}`;
  cardContainer.appendChild(card);

  // Get the HTML element that contains the products
  // And append the new product to it
  let productsList = document.getElementById("products");
  productsList.appendChild(cardContainer);
};

// Render all the hats from hats array
hats.forEach(hat => displayAccessory(hat));

// /************************************
//  * Filter by color tasks section
//  ************************************/

// Make filter buttons interactive
// Function that highlight the clicked filter
const highlightSelectedFilter = function() {
  
  // Remove active class to all filter buttons
  document.querySelectorAll("#filters .btn").forEach(filterButton => {
    if (filterButton.classList.contains("active")) {
      filterButton.classList.remove("active");
    }
  });

  // Add active class to clicked filter button
  console.log(this);
  this.classList.add("active");
};

// Function that perform the filtering of the accessories by color
const filterAccessoriesByColor = function() {
  // Check whether the sleceted filter is all
  // If true display all accessories
  // Otherwise filter the accessories
  if (this.textContent.toLowerCase() === "all") {
    document.querySelectorAll("#products .accessory").forEach(accessory => {
      accessory.style.display = "";
    });
  } else {
    // Hide all accessories
    document.querySelectorAll("#products .accessory").forEach(accessory => {
      accessory.style.display = "none";
    });
    // Select only accessories that have the filter button textContent color as class name
    // And unhide each of them
    document.querySelectorAll(`#products .accessory.${this.textContent.toLowerCase()}`).forEach(accessory => {
      accessory.style.display = "";
    });
  }
};

// Bind highlightSelectedFilter() function to filter buttons
// The function is runned upon click
document.querySelectorAll("#filters .btn").forEach(filter => {
  filter.addEventListener("click", highlightSelectedFilter);
  filter.addEventListener("click", filterAccessoriesByColor);
});

// /************************************
//  * Socks and sunglasses tasks section
//  ************************************/

// Function to load the remotly stored accessories in JSON format
// And remove old displayed accessories
const loadRemoteAccessories = function() {
  fetch(`./${this.textContent.toLowerCase()}.json`)
    // Parse response
    .then(response => response.json())
    .then(newAccessories => {
      // Remove all old accessories
      document.querySelectorAll("#products .accessory").forEach(oldAccessory => oldAccessory.remove());
      // Display the new remote ones
      newAccessories.forEach(newAccessory => displayAccessory(newAccessory));
      // Highlight the All filter button
      highlightSelectedFilter.bind(document.querySelector("#filters .btn:first-child"))();
    });
};

// Binding loadRemoteAccessories to socks and sunglasses links
document.querySelectorAll(".navbar .nav-link").forEach(link => {
  if (link.textContent.toLowerCase() !== "hats") {
    link.addEventListener("click", loadRemoteAccessories);
  }
});
