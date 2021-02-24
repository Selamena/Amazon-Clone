import React, { useState } from "react";
import { useStateValue } from "./Components/StateProvider";
import { Link } from "react-router-dom";
import "./Payment.css";
import CheckoutProduct from "./Components/CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
const Payment = () => {
    const [{ basket, user }] = useStateValue();
    const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

	const stripe = useStripe(null);
    const Element = useElements();
    
    const [error, setError] = useState();
    const [disabled, setDisabled] = useState(true);
    
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('');

    const handleSubmit  = (event) => {
        event.preventDefault()
        setProcessing(true); 
    }
     
    const handleChange = (event) => {
        setDisabled( event.empty); 
        setError(event.error ? event.error.message : '');
    };

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/Checkout">{basket?.length}items</Link>)
				</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>

					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>MD,Silver Spring</p>
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payemnt__items">
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => <h3>Order Total:{value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
