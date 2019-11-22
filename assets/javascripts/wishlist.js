// /************************************
//  * The wishlist tasks section
//  ************************************/

// Function that retrieve wishlist from localStorage
const getWishlist = function() {
  if (localStorage.length > 0) {
    let wishlist = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = {
        storageKey: key,
        accessory: JSON.parse(localStorage.getItem(key))
      };
      wishlist.push(item);
    }
    return wishlist;
  }
};

// Function that render wishlist's item (essentitally the same as the displayAccessory function)
const renderWishlistItem = function(item) {
  const accessory = item.accessory;

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
  cardButton.className = "btn btn-outline-danger";
  cardButton.textContent = "Remove";
  cardButton.addEventListener("click", () => removeFromWishlist(item.storageKey, cardContainer));
  
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
  cardContainer.className = "col-sm-4";
  cardContainer.appendChild(card);

  // Get the HTML element that contains the products
  // And append the new product to it
  let productsList = document.getElementById("products");
  productsList.appendChild(cardContainer);
};

// Function that render warning message to inform user about his empty wishlist
const noWishlistFound = function() {
  // Create warning message
  let warningMessage = document.createElement("p");
  warningMessage.textContent = "No saved item in your wishlist. Go add some on the accessories page!";
  warningMessage.style.color = "red";
  // Render warning messeage
  let productsList = document.getElementById("products");
  productsList.appendChild(warningMessage);
  productsList.style.justifyContent = "center";
  productsList.style.padding = "3em";
};

// Function that display the wishlist
const displayWishlist = function() {
  const wishlist = getWishlist();
  if (wishlist) {
    wishlist.forEach(item => renderWishlistItem(item));
  } else {
    noWishlistFound();
  }
};

// Call the displayWishlist function
displayWishlist();

// Function that remove item from wishlist
// Remove from the page and localStorage
const removeFromWishlist = function(key, htmlComponent) {
  // If item really exist, remove it from localStorage
  console.log(key);
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
  // Remove corresponding HTML component
  htmlComponent.remove();
  // If no more items in wishlist display warning message
  if (localStorage.length === 0) {
    noWishlistFound();
  }
};
