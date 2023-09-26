import { useContext, useState } from 'react';

import CartContext from '../../store/cart-content';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const cartHasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {ctx.items.map((item, index) => (
        <CartItem
          key={index}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      {cartHasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
      <button className={styles['button--alt']} onClick={props.onHide}>
        Close
      </button>
    </div>
  );

  return (
    <Modal onHide={props.onHide}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onHide={props.onHide} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
