import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import { auth } from './Components/firebase';
import { useEffect } from 'react';
import { useStateValue } from './Components/StateProvider';

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
