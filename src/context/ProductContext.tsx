"use client"
import React,{createContext, useContext, useState, useEffect} from 'react'

const ProductContext = createContext({})
const ProductProvider = ({children}:{children:React.ReactNode}) => {

    const [cart, setCart] = useState([]);

  return (
    <ProductContext.Provider value={{
        cart, setCart
    }}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider;

export const useProductContext =()=>{
    return useContext(ProductContext);
}

