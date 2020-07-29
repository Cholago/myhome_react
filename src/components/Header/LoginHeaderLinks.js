/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { PersonAdd, LockOutlined } from "@material-ui/icons";
// core components

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Link to="/sign_up" className={classes.navLink}>
                    <PersonAdd className={classes.icons} /> Sign up
                </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Link to="/forgot_password" className={classes.navLink}>
                    <LockOutlined className={classes.icons} /> Forgot password
                </Link>
            </ListItem>
        </List>
    );
}
