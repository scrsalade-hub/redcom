import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  // ← Moved useContext INSIDE the component
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{getCartAmount().toFixed(2)}</p>  {/* Fixed: .toFixed(2) instead of .00 */}
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>  {/* Fixed typo */}
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{getCartAmount() === 0 ? 0 : (getCartAmount() + delivery_fee).toFixed(2)}</b>  {/* Fixed typo + added .toFixed(2) */}
        </div>
      </div>
    </div>
  )
}

export default CartTotal;