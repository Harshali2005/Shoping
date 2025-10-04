import { useContext } from "react";
import { CartContext } from "../module/CartContext";
import { useNavigate } from "react-router-dom";
export default function Cart(){
    const navigate = useNavigate();
    const { cart, removeFromCart, addToCart, reduceCountByOne, totalPrice } = useContext(CartContext);
    ;
   return(
    <>
      <div className="card-container">
            {
               cart.length === 0?(
                <>
                    <div>No Item Yet In cart</div>
                    <button className="btn" onClick={()=>navigate("/")}>Add To cart Now...</button>
                </>
             ):( 
                 <>
                    {
                       cart.map((item, index) => (
                         <div key={index} className="cart-item">
                          <img className="cart-img" src={item.loadableImageUrl} alt={item.name} />
                          <div>
                                   <h2>{item.name}</h2>
                                   <p>₹{item.price}</p>
                          </div>
                            <button className="btn" onClick={() => removeFromCart(item.id)}>
                                Remove from cart
                            </button>
                            <div className="quantity">
                                <button onClick={()=>addToCart(item)}>+</button>
                                   <div className="count">{item.quantity}</div>
                                <button onClick={()=>reduceCountByOne(item)}>-</button>
                            </div>
                            </div>
                        ))
                        }
                         <div>
                                   <h2>Total Amount : ₹{totalPrice}</h2>
                         </div>
                         <button className="btn" onClick={() => navigate("/")}>Add More</button>
                         <button className="orderbtn"onClick={() => navigate("/order")}>Order Now</button>
                </>
            )}
      </div>
    </>
   )
}