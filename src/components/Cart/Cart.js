import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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

  const submitOrderHandler = async (formData) => {
    setIsSubmitting(true);

    await fetch(
      'https://pedidos-ya-f07cc-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          userData: formData,
          orderedItems: ctx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);

    ctx.clearCart();
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

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onHide={props.onHide} onSubmit={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order...</p>;

  const didSubmitModalContent = (
    <>
      <p>The order was sent successfully!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHide}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHide={props.onHide}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
