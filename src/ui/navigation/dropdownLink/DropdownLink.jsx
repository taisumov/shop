import React from 'react';
import classes from "../Navigation.module.css";
import {Link} from "react-router-dom";
import Error from "../../../components/Error";

const DropdownLink = ({to, value, icon, click}) => {
    return (
        <Link
            to={to}
            onClick={click}
            className={classes.dropdownLink}
        >
            {icon !== null &&
                <img src={icon} alt=""/>
            }
            <span>{value}</span>
        </Link>
    );
};

export default DropdownLink;