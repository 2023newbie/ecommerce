import React from "react";
import classes from "./OtherInfo.module.css";

const OtherInfo = () => {
  return (
    <div className={classes.container}>
      <section className={classes.advantage}>
        <div>
          <h3 className={classes.head}>
            <i>FREE SHIPPING</i>
          </h3>
          <p className={classes.para}>
            <i>Free shipping worldwide</i>
          </p>
        </div>
        <div>
          <h3 className={classes.head}>
            <i>24 X 7 SERVICE</i>
          </h3>
          <p className={classes.para}>
            <i>Free shipping worldwide</i>
          </p>
        </div>
        <div>
          <h3 className={classes.head}>
            <i>FESTIVAL OFFER</i>
          </h3>
          <p className={classes.para}>
            <i>Free shipping worldwide</i>
          </p>
        </div>
      </section>
      <section className={classes.email}>
        <div>
          <h3 className={classes.head}>
            <i>LET'S BE FRIENDS!</i>
          </h3>
          <p className={classes.para}>
            <i>Nisi nisi tempor consequat laboris nisi.</i>
          </p>
        </div>
        <form action="" className={classes.form}>
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </form> 
      </section>
    </div>
  );
};

export default OtherInfo;
