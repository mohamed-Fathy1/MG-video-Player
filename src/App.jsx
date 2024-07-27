import "./App.css";
import VideoPlayer from "./VideoPlayer";
import src from "./assets/Iphone.mp4";

function App() {
  return (
    <>
      <div className="app">
        <h1>Custom Video Player</h1>
        <VideoPlayer
          src={src}
          highlightTime={[
            [1, 5],
            [10, 15],
            [20, 25],
          ]}
        />
      </div>{" "}
    </>
  );
}

export default App;
