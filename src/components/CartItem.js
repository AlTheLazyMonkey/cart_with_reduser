import React from "react";
import { MdDelete } from "react-icons/md";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useGlobalContext } from "../context/context";

const CartItem = ({ _id, name, image, price, countInStock, qty }) => {
  const { deleteItem, diminuisciQty, aumentaQty } = useGlobalContext();

  const addQty = () => {
    if (qty + 1 > countInStock) return;
    else aumentaQty(_id)
  }

  const removeQty = () => {
    if (qty - 1 < 1) deleteItem(_id);
    else diminuisciQty(_id)
  }

  return <article className="cart-item">
    <div className="img-container">
      <img src={image} alt={name} className="img" />
    </div>
    <p className="prd-name">{name}</p>

    <div className="qty-selector">
      <button className="btn icon-btn">
        <BiPlus className="icon" onClick={() => addQty()}></BiPlus>
      </button>
      <p>{qty}</p>
      <button className="btn icon-btn">
        <BiMinus className="icon minus-icon" onClick={() => removeQty()}></BiMinus>
      </button>
    </div>
    <p>{price} €</p>
    <button className="btn icon btn">
      <MdDelete className="icon minus-icon" onClick={() => deleteItem(_id)}></MdDelete>
    </button>
  </article>;
};

export default CartItem;
