import React, { useEffect, useState,useRef } from 'react';
import * as faceApi from "face-api.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   video:{
     position:"relative"
   },
   detect:{
     position:"absolute",
     top: 5,
     left:0
   },
   button:{
    color: "#5B5B61",
    fontWeight: "600",
    cursor: "pointer",
    "&:hover": {
      background: "#8759F2",
      color: "#fff"
    },
    height: "5vh",
    width: "90%",
    transition: "all 0.4s",
   },
   loader:{
     marginTop: "3vh",
     color: "#8759F2",
     fontWeight: 600

   }
    }
));

function AI() {
	const [playing, setPlaying] = useState(false);
  const [disabled,setDisabled] =useState(false);
  const videoRef= useRef();
  const canvasRef=useRef();
  useEffect(()=>{
    if(localStorage.getItem("name")===null)
    {
      setPlaying(false);
    }
  },[])
	const HEIGHT = 600;
	const WIDTH = 600;

  useEffect(()=>{
    const LoadModels= async()=>{
      const Model_URL=process.env.PUBLIC_URL+'/models';
      await Promise.all([
        faceApi.nets.tinyFaceDetector.loadFromUri(Model_URL),
        faceApi.nets.faceLandmark68Net.loadFromUri(Model_URL),
        faceApi.nets.faceRecognitionNet.loadFromUri(Model_URL),
        faceApi.nets.faceExpressionNet.loadFromUri(Model_URL)
      ]).then((val) => {
        // console here gives an array of undefined
        console.log(val);
        startVideo();
        setDisabled(true);
    }).catch((err) => {
        console.log(err)
    });
    }
    LoadModels();
  },[]);

  const startVideo = async() => {
    console.log("yes");
    navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    videoRef.current.srcObject = stream;
    setPlaying(true);
  });
  };

	const stopVideo = () => {
		setPlaying(false);
    navigator.getUserMedia({audio: false, video: true},
      function(stream) {
          var track = stream.getTracks()[0];
          track.stop();
      },
      function(error){
          console.log('getUserMedia() error', error);
      });
      videoRef.current.srcObject = null;
	};
 
  const handleDetection=()=>{
    if(playing)
    {
    setInterval(async()=>{
      const Displaysize={
        width:WIDTH,
        height:HEIGHT
      }
      // if(videoRef.current!==undefined)
      // {
      const detection= await faceApi.detectAllFaces(videoRef.current, new faceApi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      console.log(detection);
      console.log(detection.expressions);
       canvasRef.current.innerHTML=faceApi.createCanvasFromMedia(videoRef.current);
        faceApi.matchDimensions(canvasRef.current,Displaysize);
      const resizedDetections= faceApi.resizeResults(detection,Displaysize);
      canvasRef.current.getContext('2d').clearRect('0','0',WIDTH,HEIGHT);
      faceApi.draw.drawDetections(canvasRef.current,resizedDetections);
      faceApi.draw.drawFaceLandmarks(canvasRef.current,resizedDetections);
      faceApi.draw.drawFaceExpressions(canvasRef.current,resizedDetections);
    },100)
  }
  }
  const classes = useStyles();
	return (
		<div >
			<div >
        {!disabled&&
          <div className={classes.loader}>
            Please wait Modal loading up....
          </div>
        }
        {disabled&&!playing&&
          <div className={classes.loader}>
           How is your mood today.....
           Lets find out
          </div>
        }
				<video
					height={HEIGHT}
					width={WIDTH}
					muted
					autoPlay
				  ref={videoRef}
          onPlay={handleDetection()}
				></video>
        <canvas  className={classes.detect} ref={canvasRef}></canvas>
			</div>
       {disabled&&
			<div>
				{playing ? (
					<button className={classes.button} onClick={stopVideo}>Stop</button>
				) : (
					<button  className={classes.button} onClick={startVideo}>Start</button>
				)}
			</div>
}
		</div>
	);
}

export default AI;