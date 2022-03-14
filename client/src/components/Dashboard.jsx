import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Ion from "./images/logo.png";
import { MdDashboard} from "react-icons/md";
import {FiLogOut} from "react-icons/fi";
import { useHistory} from "react-router-dom";
import AI from "./Ai.jsx";

const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
    height: "110vh",
    overflow: "hidden",
  },
  header: {
    background: "#fff",
    height: "7.3vh",
    width: "99vw",
    overflow: "hidden",
  },
  sidenav: {
    height: "200vh",
    width: "14.6412vw",
    background: "#fff",
    border: "1px solid #DFE1E6",
    transform: "translate(2px,-7.3vh)",
    zIndex: "4",
    overflow: "hidden",
  },
  icon: {
    height: "50px",
    width: "50px",
  },
  head: {
    transform: "translate(-30px,0)",
    fontWeight: "600",
  },
  sidenavlink: {
    color: "#5B5B61",
    fontWeight: "600",
    cursor: "pointer",
    paddingTop: "3%",
    "&:hover": {
      background: "#EEEAF9",
    },
    height: "5vh",
    width: "90%",
    marginLeft: "10%",
    transition: "all 0.4s",
  },
  sidelinkative: {
    fontWeight: "600",
    cursor: "pointer",
    paddingTop: "3%",
    background: "#EEEAF9",
    color: "#8759F2",
    height: "5vh",
    width: "90%",
    marginLeft: "10%",
    transition: "all 0.4s",
  },
  money: {
    position: "absolute",
    left: "35.5vw",
    top: "6vh",
  },
  prio: {
    position: "absolute",
    left: "20.5vw",
    top: "25vh",
  },
  user: {
    background: "#F7F5FC",
    width: "10vw",
    borderRadius: "1000px",
    height: "5vh",
    verticalAlign: "middle",
  },
  headercont: {
    width: "30vw",
    transform: "translate(68vw,1vh)",
  },
  logout: {
    transform: "translate(13vw,0vh)",
    fontSize: "1.5rem",
    cursor: "pointer"
  }

}));

function Dashboard() {
  // const [user,setUser]=useState(null);
  // useEffect(()=>{
  //   setUser(localStorage.getItem("name"));
  //   if(user===null){
  //     history.push("/");
  //   }
  // });
  let history = useHistory();
  const handleLogOut=()=>{
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    history.replace("/");
  }
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.headercont}>
          <div className={classes.logout} onClick={handleLogOut}>
          <FiLogOut/>
          </div>
        </div>
      </div>
      <div className={classes.sidenav}>
        <Container>
          <Row>
            <Col className="pt-1">
              <img src={Ion} className={classes.icon} />
            </Col>
            <Col className="pt-3 text-start">
              <Typography variant="h5" className={classes.head}>
                Emotion
              </Typography>
            </Col>
          </Row>
          <br />
          <Row className="mb-2 text-start mt-2">
            <Typography variant="body1" className={classes.sidelinkative}>
              <MdDashboard /> &nbsp;Dashboard
            </Typography>
          </Row>
        </Container>
      </div>
      <div className={classes.money}>
        <AI />
      </div>
    </div>
  );
}

export default Dashboard;
