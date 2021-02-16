import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
const Subtotal = () => {
    const [{ basket }, dispatch] = useStateValue();
      const getBasketTotal = (basket) =>
        basket?.reduce((amount, item) => item.price + amount, 0);

    return (
        <div className = "subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <div>
                         <p>
                            Subtotal({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type = "checkbox"/> This order contains a gift
                        </small>
                    </div>
                )}
                decemalScale={2}  
                value={getBasketTotal(basket)}  
                displayType={"text"}
                thousendSeparetor={true}
                prefix={"$"}
            />
            <button>Proceed to Total</button>
        </div>
    )
}

export default Subtotal
