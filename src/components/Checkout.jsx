import { useContext } from "react";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { cartTotalPrice, currencyFormatter } from "../util";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

let reqConfig = { 
  url: 'http://localhost:3000/orders', 
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}


export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp(reqConfig);

  const totalPrice = cartTotalPrice(items);
  function closeHandler() {
    hideCheckout();
  }

  function finishHandler() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest({ order: { items, customer: customerData } });
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={closeHandler}>Close</Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal open={progress === 'checkout'} onClose={closeHandler}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={finishHandler}>Okay</Button>
        </p>
      </Modal>
    )
  }
  
  return (
    <Modal open={progress === 'checkout'} onClose={closeHandler}>
      <form onSubmit={submitHandler}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal COde" type="text" id="postalCode" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title='Failed to submit order' message={error} /> }

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}