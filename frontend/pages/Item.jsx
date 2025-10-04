import { useParams } from "react-router-dom";
import { useState,useEffect } from "react"; 
import axios from "axios";
import frontendServer from "../environment";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../module/CartContext";
import { useContext } from "react";

const Item = () =>{
    const {id} = useParams();
    const navigate = useNavigate();
    const[item,setItem] = useState([]);
    const{addToCart} = useContext(CartContext)
    
    useEffect(()=>{
        axios.get(`${frontendServer}/api/items`)
        .then((result)=>{
            const found = result.data.dresses.find((it)=> it.id === parseInt(id));
            console.log(found);
            setItem(found);
        }) 
         .catch((err)=>{
            console.log("Not get correct data...");
         })
    },[id]);

    return(
        <>
           <div className="big-Container">
                <img src={item.loadableImageUrl} alt={item.name} className="img"/>
                <div className="data">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <div style={{display:"inline-block"}}>
                        <button style={{ margin:"4px" }} onClick={() => addToCart(item)}>add to cart</button>
                        <button style={{ margin: "4px" }} onClick={() => {navigate("/")}}>Home</button>
                    </div>
                </div>
           </div>   
        </>
    )
}

export default Item;