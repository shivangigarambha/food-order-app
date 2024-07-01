import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter, cartTotalPrice } from "../util";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  const totalPrice = cartTotalPrice(items);
  function closeHandler() {
    hideCart();
  }

  return (
    <Modal 
      className="cart" 
      open={progress === 'cart'} 
      onClose={progress === 'cart' ? closeHandler : null}
    >
      <h2>Your cart data</h2>
      <ul>
        {items.map(item => (
          <CartItem 
            key={item.id} 
            {...item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)} 
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={closeHandler}>Close</Button>
        {items.length > 0 && <Button onClick={() => showCheckout()}>Go to Checkout</Button>}
      </p>
    </Modal>
  )
}