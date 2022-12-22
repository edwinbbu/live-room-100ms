import { useVideo } from "@100mslive/react-sdk";

const roles = {
  host: "Host",
  guest: "Guest",
};

function Peer({ peer }) {
  console.log("peer:", peer);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.isLocal ? "You" : peer.name} ({roles[peer.roleName]})
      </div>
    </div>
  );
}

export default Peer;
