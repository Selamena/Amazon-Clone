import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import { auth } from './Components/firebase';
import { useEffect } from 'react';
import { useStateValue } from './Components/StateProvider';
import Payment from "./Components/Payment"
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from './Components/Orders';


const promise = loadStripe("pk_test_51IOFbiE4ZVbnxk0NJZnfgGXlwpOgTPQrwE6JIVzIbSDZIIgqkzuryM09FoMR4BRIyxZjVTxGM12uzZ0Lc5QYcdHp00DBxrOCKU"); 
function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	},[])
  return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/Orders">
						<Header />
						<Orders/>
					</Route>
					<Route path="/Payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/Checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
