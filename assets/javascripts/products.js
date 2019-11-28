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
  return `${this.name}, color ${this.color}, price: ${this.price}, image: ${this.imageHref}`;
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
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = accessory.name;

  const itemColor = document.createElement("em");
  itemColor.textContent = accessory.color;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.appendChild(document.createTextNode("Color: "));
  cardText.appendChild(itemColor);

  const cardButton = document.createElement("button");
  cardButton.className = "btn btn-outline-primary";
  cardButton.textContent = "Add to wishlist!";
  cardButton.addEventListener("click", () => addToWishlist(accessory));
  
  const cardBody = document.createElement("div");
  cardBody.className = "card-body text-center";
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardButton);

  const cardImage = document.createElement("img");
  cardImage.className = "card-img-top";
  cardImage.src = accessory.imageHref;
  cardImage.alt = `Image of ${accessory.color} ${accessory.name}`;

  const priceTag = document.createElement("div");
  priceTag.className = "currency btn btn-light disabled";
  priceTag.textContent = accessory.price;

  const card = document.createElement("div");
  card.className = "card my-3";
  card.appendChild(priceTag);
  card.appendChild(cardImage);
  card.appendChild(cardBody);

  const cardContainer = document.createElement("div");
  cardContainer.className = `accessory col-sm-4 ${accessory.color}`;
  cardContainer.appendChild(card);

  // Get the HTML element that contains the products
  // And append the new product to it
  document.getElementById("products").appendChild(cardContainer);
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
  this.classList.add("active");
};

// Function that perform the filtering of the accessories by color
const filterAccessoriesByColor = function() {
  // Check whether the sleceted filter is all
  // If true display all accessories
  // Otherwise filter the accessories
  if (this.textContent.toLowerCase() === "all") {
    document.querySelectorAll("#products .accessory")
      .forEach(accessory => accessory.style.display = "");
  } else {
    // If accessory has the filter button textContent color as class name -> display it
    // Otherwise hide it
    document.querySelectorAll("#products .accessory").forEach(accessory => {
      if (accessory.classList.contains(this.textContent.toLowerCase())) {
        accessory.style.display = "";
      } else {
        accessory.style.display = "none"
      }
    });
  }
};

// Bind highlightSelectedFilter() and filterAccessoriesByColor() function to filter buttons
// The function is runned upon click
document.getElementById("filters").addEventListener("click", e => {
  const target = e.target;
  highlightSelectedFilter.bind(target)();
  filterAccessoriesByColor.bind(target)();
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

// Function to reload hats content
const reloadHats = function() {
  // Remove all old accessories
  document.querySelectorAll("#products .accessory").forEach(oldAccessory => oldAccessory.remove());
  // Display hats
  hats.forEach(hat => displayAccessory(hat));
  // Highlight the All filter button
  highlightSelectedFilter.bind(document.querySelector("#filters .btn:first-child"))();
};

// Binding loadRemoteAccessories to socks and sunglasses links and reloadHats to hats link
document.querySelector(".navbar .navbar-nav").addEventListener("click", e => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    switch (target.textContent.toLowerCase()) {
      case "hats":
        reloadHats();
        break;
      default:
        loadRemoteAccessories.bind(target)();
        break;
    }
  }
});

// /************************************
//  * Socks and sunglasses tasks section
//  ************************************/

// Function to add accessory to the wishlist
// Save maximum 3 items
const addToWishlist = function(accessory) {
  if (localStorage.length > 2) {
    alert("You reached the maximal number of items in your wishlist.");
  } else {
    const accessoryJSON = JSON.stringify(accessory);
    if (!localStorage.getItem("accessory1")) {
      localStorage.setItem("accessory1", accessoryJSON);
    } else if (!localStorage.getItem("accessory2")) {
      localStorage.setItem("accessory2", accessoryJSON);
    } else if (!localStorage.getItem("accessory3")) {
      localStorage.setItem("accessory3", accessoryJSON);
    }
  }
};
