import React from "react";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2'

const validEmailRegex = RegExp(/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
export default class ForgotPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: "",
            errorMessage: "",
            loading: false,
            buttonDisabled: true,
            buttonText: "Reset password"
        };
    }

    myChangeHandler = (event) => {
        let email = event.target.value;
        this.setState({ email: email });
        if (email == "") {
            this.setState({ error: "error", errorMessage: "Email is required.", buttonDisabled: true });
        }
        else if (!validEmailRegex.test(email)) {
            this.setState({ error: "error", errorMessage: "Please enter a valid email address.", buttonDisabled: true });
        }
        else {
            this.setState({ error: "", errorMessage: "", buttonDisabled: false });
        }

    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.email == "") {
            this.setState({ error: "error", errorMessage: "Email is required." });
        }
        else if (!validEmailRegex.test(this.state.email)) {
            this.setState({ error: "error", errorMessage: "Please enter a valid email address." });
        }
        else {
            this.whileResetting();
        }

    }

    whileResetting() {
        this.setState({ buttonText: "Resetting..", loading: true });
        setTimeout(() => {
            this.setState({ buttonText: "Reset password", loading: false, email: "" });
            Swal.fire(
                'Successfull!',
                'Sent a password reset link to your email.',
                'success'
            )
        }, 2000);
        //alert("Created account with this email: " + this.state.email);
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
            buttonProgress: {
                color: "#2886eb",
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
            }
        };

        return (
            <form style={classes.form} onSubmit={this.mySubmitHandler}>
                <CardHeader color="info" style={classes.cardHeader}>
                    <h4>Forgot password</h4>
                </CardHeader>
                <CardBody>
                    <TextField
                        error={this.state.error}
                        id="standard-error-helper-text"
                        label="Email..."
                        fullWidth
                        value={this.state.email}
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
                        helperText={this.state.errorMessage}

                    />
                </CardBody>
                <CardFooter style={classes.cardFooter}>
                    <div style={classes.wrapper}>
                        <Button simple color="info" size="lg" type='submit' disabled={this.state.buttonDisabled}>
                            {this.state.buttonText}
                        </Button>
                        {this.state.loading && <CircularProgress size={24} style={classes.buttonProgress} />}
                    </div>
                </CardFooter>
            </form>
        );
    }
}