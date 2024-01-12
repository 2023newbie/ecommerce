import React from "react";
import classes from "./Products.module.css";

const Products = (props) => {
  return (
    <menu className={classes.menu}>
      {props.products.map((product) => (
        <div key={product._id}>
          <div
            className={classes.img}
            onClick={() => {
              if (props.show) props.show(product)
              if (props.action) props.action(product)
            }}
          >
            <img src={product.img1} alt={product.name} width="100%" />
          </div>
          <p className={classes.center}>
            <b><i>{product.name}</i></b>
          </p>
          <p className={`${classes.center} ${classes.blur}`}>
            <i>{product.price} VND</i>
          </p>
        </div>
      ))}
    </menu>
  );
};

export default Products;
