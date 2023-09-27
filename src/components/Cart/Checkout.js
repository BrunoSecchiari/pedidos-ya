import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim().length === 0;
const isValidPostalCode = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsAreValid, setFormInputsAreValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid =
      !isEmpty(enteredPostalCode) && isValidPostalCode(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsAreValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const inputClassesHandler = (value) => {
    let classes = styles.control;

    if (!value) {
      classes += ` ${styles.invalid}`;
    }

    return classes;
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={inputClassesHandler(formInputsAreValid.name)}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsAreValid.name && <p>Please enter a valid name</p>}
      </div>
      <div className={inputClassesHandler(formInputsAreValid.street)}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsAreValid.street && <p>Please enter a valid street</p>}
      </div>
      <div className={inputClassesHandler(formInputsAreValid.postalCode)}>
        <label htmlFor='postal-code'>Postal Code</label>
        <input type='text' id='postal-code' ref={postalCodeInputRef} />
        {!formInputsAreValid.postalCode && (
          <p>Please enter a valid postal code (5 characters)</p>
        )}
      </div>
      <div className={inputClassesHandler(formInputsAreValid.city)}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsAreValid.city && <p>Please enter a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Confirm</button>
        <button type='button' onClick={props.onHide}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
