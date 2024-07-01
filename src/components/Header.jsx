import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const total = items.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  function showCartHandler() {
    showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt='A restaurant' />
        <h1> React Food Order App</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCartHandler}>Cart ({total})</Button>
      </nav>
    </header>
  )
}