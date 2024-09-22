import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
    return (
    <li>
        { city }
    </li>
  );
}

export default CityItem;
