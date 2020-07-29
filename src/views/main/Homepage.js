import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);

export default function Homepage() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <div className={classes.navSize}>
                        <Header
                            brand="My home"
                            color="info"
                            rightLinks={
                                <List className={classes.list}>
                                    <ListItem className={classes.listItem}>
                                        <Button color="transparent" className={classes.navLink}>
                                            <Email className={classes.icons} />
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <Button color="transparent" className={classes.navLink}>
                                            <Face className={classes.icons} />
                                        </Button>
                                    </ListItem>
                                    <ListItem className={classes.listItem}>
                                        <CustomDropdown
                                            left
                                            hoverColor="info"
                                            dropdownHeader="Dropdown Header"
                                            buttonIcon="settings"
                                            buttonProps={{
                                                className: classes.navLink,
                                                color: "transparent"
                                            }}
                                            dropdownList={[
                                                "Action",
                                                "Another action",
                                                "Something else here",
                                                { divider: true },
                                                "Separated link",
                                                { divider: true },
                                                "One more separated link"
                                            ]}
                                        />
                                    </ListItem>
                                </List>
                            }
                        />
                    </div>
                    <Card>
                        <CardHeader color="primary" className={classes.cardHeader}>
                            <h4>Login</h4>
                        </CardHeader>
                        <CardBody>
                            <CustomInput
                                labelText="First Name..."
                                id="first"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <People className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <CustomInput
                                labelText="Email..."
                                id="email"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "email",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Email className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <CustomInput
                                labelText="Password"
                                id="pass"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "password",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon className={classes.inputIconsColor}>
                                                lock_outline
                            </Icon>
                                        </InputAdornment>
                                    ),
                                    autoComplete: "off"
                                }}
                            />
                        </CardBody>

                    </Card>
                    <Footer />
                </GridItem>
            </GridContainer>
        </div>
    );
}
