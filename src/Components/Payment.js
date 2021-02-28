import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./Payment.css";
import { CardElement,useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from './axios'
import CheckoutProduct from "./CheckoutProduct";
import { db } from "./firebase";

const Payment = () => {
      const history = useHistory()
    const [{ basket, user },dispatch] = useStateValue();
    const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

	const stripe = useStripe(null);
    const elements = useElements();
    
    const [error, setError] = useState();
    const [disabled, setDisabled] = useState(true);
    
    const [succeeded, setSucceeded] = useState(false)
	const [processing, setProcessing] = useState('');
	
	const [clientSecret,setclientSecret ] = useState(true)
	useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({ method: "post", url: `/payments/create?total=${getBasketTotal(basket) * 100}`,});
		
			setclientSecret(response.data.clientSecret);
		}
		getClientSecret();
			
	}, [basket]);

	console.log("THE SECRET IS >>>", clientSecret);


    const handleSubmit  = async (event) => {
        event.preventDefault()
		setProcessing(true); 
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card:elements.getElement(CardElement)
			}
		}).then(({paymentIntent }) => {
			//paymentIntenet = paymentconfirmation

			db.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					created:paymentIntent.created,
				})
			
			setSucceeded(true);
			setError(null);
			setProcessing(false);

			dispatch({
				  type: "EMPTY_BASKET"
			   })

			        history.replace('/orders');

		})
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

