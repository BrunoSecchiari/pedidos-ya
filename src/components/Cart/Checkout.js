import styles from './Checkout.module.css';

const Checkout = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' />
      </div>
      <div className={styles.control}>
        <label htmlFor='street'>Street</label>
        <input id='street' type='text' />
      </div>
      <div className={styles.control}>
        <label htmlFor='postal-code'>Postal Code</label>
        <input id='postal-code' type='text' />
      </div>
      <div className={styles.control}>
        <label htmlFor='city'>City</label>
        <input id='city' type='text' />
      </div>
      <button>Confirm</button>
      <button type='button' onClick={props.onHide}>
        Cancel
      </button>
    </form>
  );
};

export default Checkout;
