import React from "react";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";
import People from "@material-ui/icons/People";
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2'

const validEmailRegex = RegExp(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            errors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            loading: false,
            buttonDisabled: true,
            buttonText: "Sign up"
        };
    }

    myChangeHandler = (event) => {
        let { name, value } = event.target;
        const data = this.state.data;
        const errors = this.state.errors;
        switch (name) {
            case 'firstName':
                data.firstName = value;
                if (value == "") {
                    errors.firstName = "First name is required.";
                }
                else if (value.length < 2) {
                    errors.firstName = "First name must be at least 2 characters long";
                }
                else {
                    errors.firstName = "";
                }
                //this.setState({ errors, password: value, errors, passwordMsg: value });
                break;
            case 'lastName':
                data.lastName = value;
                if (value == "") {
                    errors.lastName = "Last name is required.";
                }
                else if (value.length < 2) {
                    errors.lastName = "Last name must be at least 2 characters long";
                }
                else {
                    errors.lastName = "";
                }
                //this.setState({ errors, password: value, errors, passwordMsg: value });
                break;
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
            case 'confirmPassword':
                data.confirmPassword = value;
                if (value == "") {
                    errors.confirmPassword = "Retype your password";
                }
                else if (!(value == data.password)) {
                    errors.confirmPassword = "Password did not match!";
                }
                else {
                    errors.confirmPassword = "";
                }
                //this.setState({ errors, password: value, errors, passwordMsg: value });
                break;

            default:
                break;
        }
        this.setState({ data, [name]: value, errors, firstName: value, errors, lastName: value, errors, email: value, errors, password: value, errors, confirmPassword: value });

    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        const data = this.state.data;
        const errors = this.state.errors;
        let valid = false;

        if (data.firstName == "") {
            errors.firstName = "First name is required.";
            this.setState({ errors, firstName: "First name is required." });
            valid = false;
        }
        else if (data.firstName.length < 2) {
            errors.firstName = "First name must be at least 2 characters long";
            this.setState({ errors, firstName: "First name must be at least 2 characters long" });
            valid = false;
        }
        else {
            errors.firstName = "";
            this.setState({ errors, firstName: "" });
            valid = true;
        }

        if (data.lastName == "") {
            errors.lastName = "Last name is required";
            this.setState({ errors, lastName: "Last name is required" });
            valid = false;
        }
        else if (data.lastName.length < 2) {
            errors.lastName = "Last name must be at least 2 characters long";
            this.setState({ errors, lastName: "Last name must be at least 2 characters long" });
            valid = false;
        }
        else {
            errors.lastName = "";
            this.setState({ errors, lastName: "" });
            valid = true;
        }

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
            this.setState({ errors, password: "" });
            valid = true;
        }

        if (data.confirmPassword == "") {
            errors.confirmPassword = "Retype your password";
            this.setState({ errors, confirmPassword: "Retype your password" });
            valid = false;
        }
        else if (!(data.confirmPassword == data.password)) {
            errors.confirmPassword = "Password did not match!";
            this.setState({ errors, confirmPassword: "Password did not match!" });
            valid = false;
        }
        else {
            errors.confirmPassword = "";
            this.setState({ errors, confirmPassword: "" });
            valid = true;
        }
        //If form is valid
        if (valid) {
            this.whileSigningUp();
        }
    }

    whileSigningUp() {
        this.setState({ buttonText: "Signing up..", loading: true });
        setTimeout(() => {
            const data = this.state.data;
            data.firstName = "";
            data.lastName = "";
            data.email = "";
            data.password = "";
            data.confirmPassword = "";
            this.setState({ buttonText: "Sign up", loading: false, data, firstName: "", data, lastName: "", data, email: "", data, password: "", data, confirmPassword: "" });
            Swal.fire(
                'Successfull!',
                'Check on your email inbox we sent a varification link.',
                'success'
            )
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
        return (
            <form style={classes.form} onSubmit={this.mySubmitHandler}>
                <CardHeader color="info" style={classes.cardHeader}>
                    <h4>Sign up</h4>
                </CardHeader>
                <p style={classes.divider}>A new way to be in control</p>
                <CardBody>
                    <TextField
                        error={errors.firstName}
                        id="standard-error-helper-text"
                        label="First Name..."
                        fullWidth
                        value={data.firstName}
                        disabled={this.state.loading}
                        name="firstName"
                        InputProps={{
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                            ),
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        onChange={this.myChangeHandler}
                        helperText={errors.firstName}
                    />
                    <TextField
                        error={errors.lastName}
                        id="standard-error-helper-text"
                        label="Last Name..."
                        fullWidth
                        value={data.lastName}
                        disabled={this.state.loading}
                        name="lastName"
                        InputProps={{
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                            ),
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        onChange={this.myChangeHandler}
                        helperText={errors.lastName}
                    />
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
                    <TextField
                        error={errors.confirmPassword}
                        id="standard-error-helper-text"
                        label="Confirm Password..."
                        fullWidth
                        value={data.confirmPassword}
                        disabled={this.state.loading}
                        name="confirmPassword"
                        InputProps={{
                            type: "password",
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
                        helperText={errors.confirmPassword}
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