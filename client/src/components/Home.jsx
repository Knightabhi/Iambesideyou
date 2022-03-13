import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Card,
} from "@material-ui/core";
import * as api from "../api/index.js";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from "react-router-dom";
import Input from "./Input";
import Phone from "./images/phone.jpg";
import Ion from "./images/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "10px",
  },
  media: {
    width: "100vw",
    height: "100vh",
  },
  paper: {
    width: "843px",
    height: "87vh",
    marginTop: "35px",
    marginLeft: "-15vw",
    borderRadius: "16px",
  },
  form: {
    width: "90%",
    marginTop: "10px",
  },
  card: {
    height: "100%",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  simg: {
    display: "inline-block",
    width: "300px",
    transform: "translate(250px,-61vh)",
    position: "relative",
  },
  imgCont: {
    margin: "40px",
    display: "inlineblock",
    height: "89%",
    width: "51%",
    marginTop: "30px",
    marginBottom: "auto",
  },
  head: {
    position: "absolute",
    width: "121px",
    height: "21.45px",
    left: "20px",
    top: "-115px",
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "100%",
  },
  icon: {
    height: "30px",
    width: "40px",
    position: "absolute",
    left: "-15px",
    top: "-120px",
  },
  shead: {
    position: "absolute",
    width: "121px",
    height: "21.45px",
    left: "-40px",
    top: "-60px",
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "100%",
  },
  submit: {
    background: "#8759F2",
    marginTop: "25px",
    position: "absolute",
    left: "0px",
  },
  switch: {
    color: "#8759F2",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    transform: "translate(-30px,38px)",
  },
  textOne: {
    position: "absolute",
    right: "0px",
    bottom: "-12px",
    color: "#828282",
  },
  googleButton: {
    background: "#F3F7FF",
    color: "#5E6C84",
    position: "absolute",
    width: "109px",
    bottom: "-90px",
    borderRadius: "48px",
    left: "150px",
    fontWeight: 500,
    ":hover": {
      color: "#fff",
    },
  },
  textTwo: {
    width: "150px",
    height: "16px",
    position: "absolute",
    left: "-13px",
    bottom: "-80px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "100%",
    color: "#828282",
  },
  textThree: {
    position: "fixed",
    bottom: "2%",
    width: "100%",
    color: "#9DA7BD",
  },
}));

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Home() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState(initialState);
  let history = useHistory();
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = async(e) => {
    console.log(formData);
    e.preventDefault();
    if (!isSignup) {
      await api
        .signIn(formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("name",res.data.result.name);
          history.push("/next");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await api
        .signUp(formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("name",res.data.result.name);
          history.push("/next");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <div className="App">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={10}>
          <Card className={classes.card}>
            <div className={classes.imgCont}>
              <img src={Phone} className={classes.img} />{" "}
            </div>
            <div className={classes.simg}>
              <img src={Ion} className={classes.icon} />
              <p className={classes.head}>Emotion</p>
              <p className={classes.shead}>
                {isSignup ? "Register" : "Signin"}
              </p>
              <form className={classes.form} onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                  {isSignup && (
                    <>
                      <Typography variant="caption">Name</Typography>
                      <Input
                        name="name"
                        label=""
                        Placeholder="Enter Name"
                        handleChange={handleChange}
                        autoFocus
                      />
                      <br />
                      <br />
                      <br />
                    </>
                  )}
                  <Typography variant="caption">Email</Typography>
                  <Input
                    name="email"
                    label=""
                    Placeholder="Enter Email"
                    handleChange={handleChange}
                    type="email"
                  />
                  <br />
                  <br />
                  <br />
                  <Typography variant="caption">Password</Typography>
                  <Input
                    name="password"
                    label=""
                    Placeholder="Enter Passowrd"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                  />

                  {isSignup && (
                    <>
                      <br />
                      <br />
                      <br />
                      <Typography variant="caption">
                        Confirm Password
                      </Typography>
                      <Input
                        name="confirmPassword"
                        label=""
                        handleChange={handleChange}
                        Placeholder="Enter Passowrd"
                        type="password"
                      />
                    </>
                  )}
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign {isSignup ? "Up" : "In"} &nbsp;
                  <IoIosArrowForward />
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Typography className={classes.textOne} variant="caption">
                      {isSignup
                        ? "Already have an account?"
                        : "Don't have an account"}
                    </Typography>
                    <Button
                      onClick={() => {
                        switchMode();
                      }}
                      className={classes.switch}
                    >
                      <Typography variant="caption">
                        {isSignup ? " Login Here" : "Sign Up"}
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Card>
        </Paper>
      </Container>
      <Typography variant="body2" className={classes.textThree}>
        Privacy Policy &nbsp;&nbsp;
        <GoPrimitiveDot />
        &nbsp; &nbsp; Terms and Conditions
      </Typography>
    </div>
  );
}
