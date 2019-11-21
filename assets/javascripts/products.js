// /************************************
//  * Hats
//  ************************************/

// Defining a simple hat object with a .toString() method
let blueBaseballCap = {
  name: "Baseball cap",
  price: 11.99,
  color: "blue",
  imgRef: "./assets/images/blue/hats/1.png",
  toString: function() {
    return `${this.name}, color ${this.color}, price: ${this.price}, image: ${this.imgRef}`;
  }
};

// Check if the method works
console.log(blueBaseballCap.toString());
