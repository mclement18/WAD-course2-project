// /************************************
//  * The wishlist tasks section
//  ************************************/

// Calculate total price of wishlist
// Define variable for the total price
// Not asked but it is written on the page that the total price will be calculated
let totalPrice = 0;

// Function that render the total price
const renderTotalPrice = function() {
  const total = document.createElement("span");
  total.textContent = totalPrice.toFixed(2);

  const priceInfo = document.createElement("p");
  priceInfo.id = "total-price";
  priceInfo.className = "text-center";
  priceInfo.appendChild(document.createTextNode("Total price: €"));
  priceInfo.appendChild(total);
  
  const headerContainer = document.querySelector("h2").parentElement;
  headerContainer.appendChild(priceInfo);
};

// Function that update total price
const updateTotalPrice = function(amountToRemove) {
  totalPrice -= amountToRemove;
  document.querySelector("#total-price span").textContent = totalPrice.toFixed(2);
};


// Function that retrieve wishlist from localStorage
const getWishlist = function() {
  const keys = ["accessory1", "accessory2", "accessory3"];
  let wishlist = [];
  keys.forEach(key => {
    const accessoryJSON = localStorage.getItem(key);
    if (accessoryJSON !== null) {
      const item = {
        storageKey: key,
        accessory: JSON.parse(accessoryJSON)
      };
      wishlist.push(item);
    }
  });
  return wishlist;
};

// Function that render wishlist's item (essentitally the same as the displayAccessory function)
const renderWishlistItem = function(item) {
  const accessory = item.accessory;

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
  cardButton.className = "btn btn-outline-danger";
  cardButton.textContent = "Remove";
  cardButton.addEventListener("click", () => removeFromWishlist(item.storageKey, cardContainer, accessory.price));
  
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
  // Add the price to totalPrice
  totalPrice += accessory.price;

  const card = document.createElement("div");
  card.className = "card my-3";
  card.appendChild(priceTag);
  card.appendChild(cardImage);
  card.appendChild(cardBody);

  const cardContainer = document.createElement("div");
  cardContainer.className = "col-sm-4";
  cardContainer.appendChild(card);

  // Get the HTML element that contains the products
  // And append the new product to it
  document.getElementById("products").appendChild(cardContainer);
};

// Function that render warning message to inform user about his empty wishlist
const noWishlistFound = function() {
  // Create warning message
  const warningMessage = document.createElement("p");
  warningMessage.textContent = "No saved item in your wishlist. Go on the accessories page to add some!";
  warningMessage.style.color = "red";
  // Render warning messeage
  const productsList = document.getElementById("products");
  productsList.appendChild(warningMessage);
  productsList.style.justifyContent = "center";
  productsList.style.padding = "3em";
};

// Function that display the wishlist
const displayWishlist = function() {
  const wishlist = getWishlist();
  if (wishlist.length > 0) {
    wishlist.forEach(item => renderWishlistItem(item));
    renderTotalPrice();
  } else {
    noWishlistFound();
  }
};

// Call the displayWishlist function
displayWishlist();

// Function that remove item from wishlist
// Remove from the page and localStorage
const removeFromWishlist = function(key, htmlComponent, price) {
  // If item really exist, remove it from localStorage
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
  // Remove corresponding HTML component
  htmlComponent.remove();
  // If no more items in wishlist display warning message
  // And remove total price
  // Otherwise update total price
  if (getWishlist().length === 0) {
    noWishlistFound();
    // Remove total price
    document.getElementById("total-price").remove();
  } else {
    updateTotalPrice(price);
  }
};
