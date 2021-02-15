import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
const Subtotal = () => {
    return (
        <div className = "subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <div>
                        <p>
                            Subtotal({0} items): <strong>{0}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type = "checkbox"/> This order contains a gift
                        </small>
                    </div>
                )}
                decemalScale={2}  
                // value={0}  
                displayType={"text"}
                thousendSeparetor={true}
                prefix={"$"}
            />
            <button>Proceed to Total</button>
        </div>
    )
}

export default Subtotal
