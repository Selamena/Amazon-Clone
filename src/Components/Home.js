import React from "react";
import "./Home.css";
import Product from "./Product";
const Home = () => {
	return (
		<div className="home">
			<div className="home__container">
				<img
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
					alt=""
				/>
			</div>
			<div className="home__row">
				<Product
					id="1"
					title="Forgiving What You Can't Forget: Discover How to Move On, Make Peace with Painful Memories, and Create a Life That’s Beautiful Again Hardcover"
					price={16.19}
					image="https://images-na.ssl-images-amazon.com/images/I/41MR-FAI7JL._SX326_BO1,204,203,200_.jpg"
					rating={5}
				/>

				<Product
					id="11"
					title="Girls Can Do Anything Hardcover – Picture Book, August 1, 2018
                          by Caryl Hart  (Author), Ali Pye (Illustrator)"
					price={11.5}
					image="https://images-na.ssl-images-amazon.com/images/I/61O2DLzWKdL._SX258_BO1,204,203,200_.jpg"
					rating={5}
				/>
			</div>
			<div className="home__row">
				<Product
					id="2"
					title="Ethiopian/Eritrean Coffee Cups with Rékébot. Tilet Edition. Full Set. ጥለት ረከቦት & ስኒ."
					price={109}
					image="https://images-na.ssl-images-amazon.com/images/I/61nnISKAuDL._AC_SL1000_.jpg"
					rating={5}
				/>
				<Product
					id="22"
					title="Yamaha YDP103 Arius Series Piano with Bench, Black Walnut
Visit the Yamaha Store."
					price={899.99}
					image="https://images-na.ssl-images-amazon.com/images/I/612RQf%2BUHOL._AC_SX355_.jpg"
					rating={4}
				/>
				<Product
					id="222"
					title="LETSCOM Smart Watch Fitness Tracker Heart Rate Monitor Step Calorie Counter Sleep Monitor Music Control IP68 Water Resistant 1.3 Inch Color Touch Screen Activity Tracking Pedometer for Women Men"
					price={35.99}
					image="https://images-na.ssl-images-amazon.com/images/I/61Ri7SF6OIL._AC_SX425_.jpg"
					rating={4}
				/>
			</div>
			<div className="home__row">
				<Product
					id="3"
					title="Flowerbomb by Viktor & Rolf for Women, Eau de Parfum, 3.4 Ounce Spray"
					price={120}
					image="https://images-na.ssl-images-amazon.com/images/I/5135r%2BNLi9L._SX425_.jpg"
					rating={5}
				/>
			</div>
		</div>
	);
};

export default Home;
