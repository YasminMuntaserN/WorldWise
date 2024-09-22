import {NavLink} from "react-router-dom";
import styles from "./PageNav.module.css"
function PageNav() {
  return (
    <nav className={styles.nav}>
      <O
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/">Product</NavLink>
        </li>
        <li>
          <NavLink to="/">Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PageNav
