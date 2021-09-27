import ReactPlayer from "react-player/lazy";

type videoSourceProp = {
  videoSource?:string
}

export const Video = ({videoSource}:videoSourceProp) => {
  return <div
  style={{ backgroundColor: "gray", flex: 1, width:'100%', height:'100%'}}
>
  <ReactPlayer
    width="100%"
    style={{ padding: 10 }}
    height="100%"
    url={videoSource}
  />
</div>
}
