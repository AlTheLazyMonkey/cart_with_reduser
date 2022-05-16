import React from "react";
import CartItem from './CartItem';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useGlobalContext } from "../context/context";

const Cart = () => {
  const { products, deleteAll } = useGlobalContext();

  if (products.length > 0) { 
    console.log(products)
  }

  return <section className="section-center" style={{ marginTop: "2em" }}>
    <div className="cart-info">
      <h6>Item</h6>
      <h6 className="prd-name">Nome</h6>
      <h6>Qty</h6>
      <h6>Prezzo</h6>
      <button className="btn icon-btn" onClick={deleteAll}>
        <MdRemoveShoppingCart className="icon minus-icon"></MdRemoveShoppingCart>
      </button>
    </div>
    <hr />
    <section className="cart-section">
      {
        products.map(el => {
          return <CartItem key={el._id} {...el}></CartItem>
        })
      }
    </section>
  </section>
};

export default Cart;
