import frontendServer from "../environment";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../module/CartContext.jsx";
import { useContext } from "react";

export default function Home() {
    const[data,setData] = useState([]);
    const navigate = useNavigate();
    const{cart,addToCart} = useContext(CartContext);

    useEffect(()=>{
        axios
            .get(`${frontendServer}/api/items`)
            .then((result)=>{
             setData(result.data.dresses);
            })
            .catch((err)=>{
               console.log("Not data receive yet")
            });
    },[]);

    return (
        <>
            <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",padding: "10px" }}>
                <h1>Home Page</h1>
                <button style={{ height: "40px", width:"70px",display: "inline", marginRight:"0",alighItems: "center", backgroundColor: "rgb(178, 95, 237)" }} onClick={()=>navigate("/cart")}>cart({cart.length})</button>
            </div>

        <div className="grid-container">
            {data.map((item, index) => (
                <div className="card" key={index}>
                    <img src={item.loadableImageUrl} alt={item.name} className="card-image" onClick={() => navigate(`/item/${item.id}`)} />
                    <div className="card-content">
                        <h3>{item.name}</h3>
                        <p>Price: ₹{item.price}</p>
                        <button onClick={()=>addToCart(item)}>add to cart</button>
                    </div>
                </div>
            ))}
        </div>
        </>
    );

}
