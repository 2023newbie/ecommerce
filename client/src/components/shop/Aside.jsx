import { NavLink, useSearchParams } from 'react-router-dom'

import classes from './Aside.module.css'

const Aside = () => {
  const searchParams = useSearchParams()[0].get('type')

  return (
    <aside className={classes.side_nav}>
        <h3>CATEGORIES</h3>
        <ul>
          <h4>APPLE</h4>
          <li>
            <NavLink
              to="/shop?type=all"
              className={searchParams === 'all' ? classes.active : ""}
            >
              All
            </NavLink>
          </li>
          <ul>
            <h5>IPHONE & MAC</h5>
            <li>
              <NavLink
                to="/shop?type=iphone"
                className={searchParams === 'iphone' ? classes.active : ""}
              >
                Iphone
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop?type=ipad"
                className={searchParams === 'ipad' ? classes.active : ""}
              >
                Ipad
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop?type=macbook"
                className={searchParams === 'macbook' ? classes.active : ""}
              >
                Macbook
              </NavLink>
            </li>
          </ul>
          <ul>
            <h5>WIRELESS</h5>
            <li>
              <NavLink
                to="/shop?type=airpod"
                className={searchParams === 'airpod' ? classes.active : ""}
              >
                Airpod
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop?type=watch"
                className={searchParams === 'watch' ? classes.active : ""}
              >
                Watch
              </NavLink>
            </li>
          </ul>
          <ul>
            <h5>OTHER</h5>
            <li>
              <NavLink
                to="/shop?type=mouse"
                className={searchParams === 'mouse' ? classes.active : ""}
              >
                Mouse
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop?type=keyboard"
                className={searchParams === 'keyboard' ? classes.active : ""}
              >
                Keyboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop?type=other"
                className={searchParams === 'other' ? classes.active : ""}
              >
                Other
              </NavLink>
            </li>
          </ul>
        </ul>
      </aside>
  )
}

export default Aside