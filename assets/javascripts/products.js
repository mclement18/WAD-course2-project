// /************************************
//  * Hats
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

// Create a Hat prototype
function Hat(name, price, color, imageHref) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.imageHref = imageHref;
}

// Hat prototype methods
// Method to return hat info as organised strings
Hat.prototype.toString = function() {
  return `${this.name}, color ${this.color}, price: ${this.price}, image: ${this.imageHref}`
};
