import { createContext } from "react"
import { useState,useEffect } from "react";
export const CartContext = createContext();

export const CartContextProvider = ({children})=>{
   const[cart,setCart] = useState(()=>
       {
         const savedCart = localStorage.getItem("cart");
         return savedCart?JSON.parse(savedCart):[];
       });

     const[totalPrice,setTotalPrice] = useState(0);

   const addToCart =(item)=>{
      setCart((prevCart) => {
         const existingItem = prevCart.find((i) => i.id === item.id);
         if (existingItem) {
            return prevCart.map((i) =>
               i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
         } else {
            return [...prevCart, { ...item, quantity: 1 }];
         }
      });
   }
   
   const reduceCountByOne = (item) =>{
      setCart((prevCart)=>{
         const prevdata = prevCart.find((e) => e.id === item.id);
         if(prevdata.quantity > 1){
             return prevCart.map((i)=>
               i.id === item.id ? {...i,quantity: i.quantity-1}:i
            );
          }else{
            return prevCart.filter((it=>it.id != item.id))
          }
        }
      );
   }


   const removeFromCart = (id) => {
       setCart((prevCart) => prevCart.filter((it) => it.id !== id))
   }

   const cleanCart=()=>{
    setCart([]);
   }

   useEffect(() => {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
   }, [cart]);

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   return(
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, cleanCart, reduceCountByOne, totalPrice }}>
          {children}
       </CartContext.Provider>
   );
}