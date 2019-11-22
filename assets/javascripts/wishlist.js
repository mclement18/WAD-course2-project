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
