export const cartTotalPrice = (items) => {
  return items.reduce(
    (prev, item) => prev + item.quantity * item.price, 
    0
  );
}
