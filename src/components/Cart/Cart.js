import { useContext } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-content";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const cartHasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {};

  const cartItemRemoveHandler = (id) => {};

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item, index) => (
        <CartItem
          key={index}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item.id)}
          onRemove={cartItemRemoveHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHide={props.onHide}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHide}>
          Close
        </button>
        {cartHasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
