import React from "react";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2'
//redirecting
import { Redirect } from "react-router-dom";

const validEmailRegex = RegExp(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                password: ""
            },
            errors: {
                email: "",
                password: "",
            },
            loading: false,
            buttonDisabled: true,
            buttonText: "Login",
            redirect: false
        };
    }

    myChangeHandler = (event) => {
        let { name, value } = event.target;
        const data = this.state.data;
        const errors = this.state.errors;
        switch (name) {
            case 'email':
                data.email = value;
                if (value == "") {
                    errors.email = "Email is required.";
                }
                else if (!validEmailRegex.test(value)) {
                    errors.email = "Please enter a valid email address.";
                }
                else {
                    errors.email = "";
                }
                //this.setState({ errors, email: value, errors, emailMsg: value });
                break;
            case 'password':
                data.password = value;
                if (value == "") {
                    errors.password = "Password is required.";
                }
                else if (value.length < 8) {
                    errors.password = "Password must be at least 8 characters long";
                }
                else {
                    errors.password = "";
                }
                //this.setState({ errors, password: value, errors, passwordMsg: value });
                break;
            default:
                break;
        }
        this.setState({ data, [name]: value, errors, email: value, errors, password: value });

    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        const data = this.state.data;
        const errors = this.state.errors;
        let valid = false;

        if (data.email == "") {
            errors.email = "Email is required.";
            this.setState({ errors, email: "Email is required." });
            valid = false;
        }
        else if (!validEmailRegex.test(data.email)) {
            errors.email = "Please enter a valid email address.";
            this.setState({ errors, email: "Please enter a valid email address." });
            valid = false;
        }
        else {
            errors.email = "";
            this.setState({ errors, email: "" });
            valid = true;
        }

        if (data.password == "") {
            errors.password = "Password is required.";
            this.setState({ errors, password: "Password is required" });
            valid = false;
        }
        else if (data.password.length < 8) {
            errors.password = "Password must be at least 8 characters long";
            this.setState({ errors, password: "Password must be at least 8 characters long" });
            valid = false;
        }
        else {
            errors.password = "";
            this.setState({ errors, password: "" })
            valid = true;
        }
        //If form is valid
        if (valid) {
            this.whileSigningIn();
        }
    }

    whileSigningIn() {
        this.setState({ buttonText: "Loading..", loading: true });
        setTimeout(() => {
            const data = this.state.data;
            data.email = "";
            data.password = "";
            this.setState({ buttonText: "Login", loading: false, redirect: true, data, email: "", data, password: "" });
            /*
            Swal.fire(
                'Successfull!',
                'Account not found.',
                'success'
            )
            */
        }, 2000);
    }

    render() {
        const classes = {
            form: {
                margin: "0"
            },
            cardHeader: {
                width: "auto",
                textAlign: "center",
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "-40px",
                padding: "20px 0",
                marginBottom: "15px"
            },
            socialIcons: {
                maxWidth: "24px",
                marginTop: "0",
                width: "100%",
                transform: "none",
                left: "0",
                top: "0",
                height: "100%",
                lineHeight: "41px",
                fontSize: "20px"
            },
            cardFooter: {
                paddingTop: "0rem",
                border: "0",
                borderRadius: "6px",
                justifyContent: "center"
            },
            socialLine: {
                marginTop: "1rem",
                textAlign: "center",
                padding: "0"
            },
            inputIconsColor: {
                color: "#495057"
            },
            wrapper: {
                position: 'relative',
            },
            divider: {
                marginTop: "30px",
                marginBottom: "0px",
                textAlign: "center"
            },
            buttonProgress: {
                color: "#2886eb",
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
            }
        };

        const { data, errors } = this.state;
        if (this.state.redirect) {
            return <Redirect to={"/main"} />;
        }
        return (
            <form style={classes.form} onSubmit={this.mySubmitHandler}>
                <CardHeader color="info" style={classes.cardHeader}>
                    <h4>Login</h4>
                </CardHeader>
                <p style={classes.divider}>login to start your session</p>
                <CardBody>
                    <TextField
                        error={errors.email}
                        id="standard-error-helper-text"
                        label="Email..."
                        fullWidth
                        value={data.email}
                        disabled={this.state.loading}
                        name="email"
                        InputProps={{
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Email style={classes.inputIconsColor} />
                                </InputAdornment>
                            ),

                        }}
                        formControlProps={{
                            fullWidth: true
                        }}

                        onChange={this.myChangeHandler}
                        helperText={errors.email}
                    />
                    <TextField
                        error={errors.password}
                        id="standard-error-helper-text"
                        label="Password..."
                        fullWidth
                        value={data.password}
                        disabled={this.state.loading}
                        name="password"
                        InputProps={{
                            type: "password",
                            name: "password",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LockOutlined className={classes.inputIconsColor} />
                                </InputAdornment>
                            ),
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        onChange={this.myChangeHandler}
                        helperText={errors.password}
                    />
                </CardBody>
                <CardFooter style={classes.cardFooter}>
                    <div style={classes.wrapper}>
                        <Button simple color="info" size="lg" type='submit' disabled={this.state.loading}>
                            {this.state.buttonText}
                        </Button>
                        {this.state.loading && <CircularProgress size={24} style={classes.buttonProgress} />}
                    </div>
                </CardFooter>
            </form>
        );
    }
}