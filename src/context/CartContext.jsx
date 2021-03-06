import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({children}) => {
    const [cartList, setCartList] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [shipping] = useState(20)
    const [taxes] = useState(0)

    useEffect(() => {
      getCartQuantity()
    },[cartList])

    const isInCart = (id) => { return cartList.some( item => item.id === id ) }

    const clearCart = () => { setCartList ([]) }

    const removeItemByID = (id) => { setCartList ( cartList.filter ( (item) => item.id !== id) ) }

    const getSubtotalPrice = (item) => { return item.quantity*item.price  }

    const getTaxes = () => { return 0.05*getTotalPrice()  }

    const getTotalPrice = () => { return cartList.reduce( (sum, item) => sum + getSubtotalPrice(item),0) }

    const getFinalPrice = () => { return (getTotalPrice() + getTaxes() + shipping) }

    const getCartQuantity = () => { setCartQuantity(cartList.reduce( (sum, item) => sum + item.quantity,0)) }

    const updateQuantity = (id, quantity) =>{ cartList.find(item => item.id === id).quantity += quantity }
    
    const addItem = (item, quantity) => {
        isInCart(item.id) ?
          updateQuantity(item.id,quantity)
          :
          setCartList([...cartList, {...item, quantity:quantity}])
          getCartQuantity()
    }

    return (
        <CartContext.Provider
          value={{
            cartList,
            cartQuantity,
            isInCart,
            addItem,
            removeItemByID,
            getSubtotalPrice,
            getTotalPrice,
            getFinalPrice,
            getTaxes,
            getCartQuantity,
            updateQuantity,
            clearCart,
            shipping,
            taxes
          }}>
          {children}
        </CartContext.Provider>
      );
    
}


export default CartContextProvider