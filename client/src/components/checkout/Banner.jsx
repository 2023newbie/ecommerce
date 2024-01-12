import { NavLink } from "react-router-dom";
import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <header className={classes.header}>
      <div className={classes.big}>CHECKOUT</div>
      <div className={classes.small}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          HOME
        </NavLink>
        /
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          CART
        </NavLink>
        /
        <NavLink
          to="/checkout"
          className={({ isActive }) => (isActive ? classes.active : "")}
        >
          CHECKOUT
        </NavLink>
      </div>
    </header>
  );
};

export default Banner;
