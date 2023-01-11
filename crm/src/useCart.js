import React, { useState, useEffect } from "react";

export function useCart(id = undefined, name = undefined, price = undefined) {
  const [cart, setCart] = useState([]);
  console.log(cart, id, "UseCart:cart");

  function add(id, name, price) {
    const item = cart?.find((item) => item.id == id);
    //IN case cart hasn't the specipic item in the array
    if (item == undefined) {
      console.log("useCart: case 1 - new item added");
      setCart([...cart, { id: id, name: name, price: price, count: 1 }]);
      return;
    }
    //IN case cart has the specipic item in the array
    console.log("useCart: case 2 - exist item added");
    const currentItem = item;
    const next = cart.map((item) => {
      if (item.id == currentItem.id) {
        return {
          ...item,
          count: (item.count += 1),
        };
      }
      console.log(item, "UseCart:item");
      return item;
    });
    setCart(next);
  }
  function sub(id) {
    const index = cart.findIndex((item) => item.id == id);
    //IN case cart hasn't the specipic item in the array
    if (index == -1) console.log("case 1 - no item to drop");
    else {
      if (cart[index].count > 1) {
        console.log("case 2 - sub 1 from item.count");
        const currentItem = cart[index];
        const next = cart.map((item) => {
          if (item.id === currentItem.id) {
            return {
              ...currentItem,
              count: (currentItem.count -= 1),
            };
          }
          return item;
        });
        setCart(next);
        return;
      } else {
        console.log("case 2 - remove item from cart");
        // const next = cart;
        // next.splice(index, 1);
        // next = [...next];
        const currentItem = cart[index];
        const next = cart.filter((item) => item.id != currentItem.id);
        setCart(next);
        return;
      }
    }
  }
  function reset() {
    setCart([]);
  }
  return { add, sub, reset, cart };
}
