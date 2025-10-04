import { useContext } from "react";
import { CartContext } from "../module/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import frontendServer from "../environment";

export default function Order() {
    const navigate = useNavigate();
    const { cart, totalPrice, cleanCart } = useContext(CartContext);

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        try{
            axios
                .post(`${frontendServer}/api/checkout`, {cart,totalPrice})
                .then((res) => {
                    alert(res.data.message);
                })
                cleanCart();
                navigate("/")
        }catch(err){
            console.log(err);
        };
    };

  
    return (
        <div className="card-container">
            <h1>Checkout</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                        {
                           cart.map((item, index) => (
                               <div key={index} className="cart-item">
                                <div style={{display:"inline-block"}}>
                                    <h3>{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Subtotal: ₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}

                    <h2>Total Amount: ₹{totalPrice}</h2>
                        <button className="btn" onClick={handlePlaceOrder} >
                        Place Order
                    </button>
                </>
            )}
            <>{
                cart.length === 0 ? <button className="btn" onClick={() => navigate("/")}>Home</button> :
                <button className="orderbtn" onClick={() => navigate("/cart")}>Back to Cart</button>
            }</>
        </div>
    );
}
