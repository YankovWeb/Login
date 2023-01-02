import React, {useEffect, useReducer, useState, useContext} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

import AuthContext from "../../store/auth-context";

import Input from "../UI/Input/Input";
//reducer function for email state and validatio

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes("@")};
  }
  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value: null, isValid: false};
};
// reducer function for password state and validatio

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_INPUT") {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }

  if (action.type === "PASSWORD_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }

  return {value: null, isValid: false};
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [passState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log("Effect Running");

    return () => {
      console.log("Efect_Clean_Up");
    };
  }, []);

  const {isValid: emailIsValid} = emailState;
  const {isValid: PasswordIsValid} = passState;

  useEffect(() => {
    const indentifier = setTimeout(() => {
      console.log("Check form validity!");
      setFormIsValid(emailIsValid && PasswordIsValid);
    }, 500);

    return () => {
      console.log("CleanUP");
      clearTimeout(indentifier);
    };
  }, [emailIsValid, PasswordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "PASSWORD_INPUT", val: event.target.value});

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "PASSWORD_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogIn(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Email"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          isValid={PasswordIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validateEmailHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
