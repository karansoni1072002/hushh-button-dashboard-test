'use client';
import { ReactMediaRecorder } from "react-media-recorder";
import { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";

const VideoPreview = (props) => {
  const stream = props.stream;
  console.log(stream)
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream])
  if (!stream) {
    return null;
  }
  return (
    <div className="text-white h-full">
      <video id="livePreview" ref={videoRef} className="w-full h-full mt-5" autoPlay />
    </div>
  );

}
function liveStream(stream) {
  const previewStream = stream;
  if (previewStream != null) {
    return <VideoPreview stream={previewStream} />
  }
}
function download(mediaBlobUrl) {
  if (mediaBlobUrl != null) {
    return (
      <a href={mediaBlobUrl} download="apoorv.mp4">
        <button id="mediaDownload" className="bg-white" >
          download
        </button>
      </a>
    )
  }

}
function Dwn() {

  useEffect(() => {
    const a = document.getElementById("mediaDownload")
    if (a) {
      a.click()
    }
  })
  return <></>
}

function liveStreamWrapper(previewStream, fn, status) {
  //console.log(status)
  if (status != 'stopped') {
    return fn(previewStream)
  }
}
function recordedVideo(mediaBlob, status) {
  console.log(mediaBlob)
  console.log('Here is media blob')
  if (status == 'stopped') {
    return <div className=""><video className="w-full h-full" src={mediaBlob} controls></video></div>
  }
}

function VideoRecorder({ videoSaveHandler }) {
  let [audioOnOff, setAudio] = useState('true')

  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false)
  const recordingButtonHandler = (startRecording) => {
    startRecording()
    setIsRecording(true)
  }
  function stopRecordingWrapper(stopRecording) {

    //document.getElementById("livePreview").style.display='hidden'
    stopRecording()
    setIsRecording(false)
    setRecorded(true)
  }
  const [profileVideoPresent, setProfileVideoPresent] = useState(false)
  const getUserVideos = async () => {
    const hushh_id = localStorage.getItem('hushh_id')

    if (hushh_id) {
      const postData = new URLSearchParams({
        'UID': hushh_id
      })
      const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/get_user_all_videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: postData
      })

      const response = await res.json()
      // console.log(response)
      if (res.ok) {
        const UserVideos = response.userVideos
        if (UserVideos.profileVideo.profileVideo) {
          setProfileVideoPresent(true)
        }
      } else {
        toast.error('Something went wrong, please try again!')
      }
    } else {
      router.push('/user/login')
    }
  }


  const saveVideoLocal = async (mediaBlobUrl) => {
    console.log(mediaBlobUrl)
    localStorage.setItem('profileVideo', mediaBlobUrl)
    const hushh_id = localStorage.getItem('hushh_id')
    if (hushh_id) {
      const postData = new FormData()
      postData.append("video", mediaBlobUrl)
      postData.append("UID", hushh_id)
      let link;
      if (profileVideoPresent) {
        link = 'https://hushhdevenv.hushh.ai/user/v1/save_user_videos'
      } else {
        link = 'https://hushhdevenv.hushh.ai/user/v1/add_profile_video'
      }

      const res = await fetch(`${link}`, {
        method: 'POST',
        body: postData
      })

      const response = await res.json()
      console.log(response)
      videoSaveHandler()
    }

  }
  const router = useRouter()
  const skipHandler = () => {
    router.push('/user/dashboard')
  }

  return (
    <div className="App">
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
          <div className='h-[35.25rem] flex flex-col items-center'>

            <div className='flex flex-col items-center h-full'>
              {/* <div className="text-white">Status : {status}</div>
              <div className="text-white">Keep Mic On: {'' + audioOnOff} </div> */}

              {!isRecording && <h1 className="text-lg font-semibold text-white pt-12 flex flex-col justify-center">{recorded ? '' : 'Record a video explaining yourself'}</h1>}

              {liveStreamWrapper(previewStream, liveStream, status)}
              {recordedVideo(mediaBlobUrl, status)}
              <div className={`${recorded ? 'absolute bottom-3 flex flex-col gap-4' : 'h-full flex flex-col justify-center'}`}>
                {
                  isRecording ?
                    <button onClick={() => stopRecordingWrapper(stopRecording)} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">Stop Recording</button>
                    :
                    <div className="flex flex-col gap-10">
                      <button onClick={() => recordingButtonHandler(startRecording)} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">{recorded ? 'Record again' : 'Start Recording'}</button>
                      <button onClick={skipHandler} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">Skip</button>
                    </div>
                }
                {
                  recorded && <button onClick={() => saveVideoLocal(mediaBlobUrl)} className="py-4 bg-gradient-to-r from-gradientColor2 to-gradientColor1 text-white px-6 rounded-lg">Save</button>
                }
              </div>


              {/* {download(mediaBlobUrl)} */}
            </div>




            {/* {Dwn()} */}



          </div>
        )}
      />
    </div>
  );
}

export default VideoRecorder;