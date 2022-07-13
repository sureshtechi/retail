import React, { useState } from 'react'
import Webcam from "react-webcam";

const CameraModule = (props) => {

  const [videoConstraints, setvideoConstraints] = useState(
    {
      width: 1280,
      height: 720,
      facingMode: "environment"
    }
  );

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      props.AddLiveImage(webcamRef.current.getScreenshot()) ;
    },
    [webcamRef]
  );

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <span onClick={capture}>Capture photo</span>

    </>
  );
}

export default CameraModule