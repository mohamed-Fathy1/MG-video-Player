import "./App.css";
import VideoPlayer from "./VideoPlayer";
import src from "./assets/Iphone.mp4";

function App() {
  const highlightTime = [
    {
      id: 1,
      start: 1,
      end: 5,
    },
    {
      id: 2,
      start: 10,
      end: 15,
    },
    {
      id: 3,
      start: 20,
      end: 25,
    },
  ];

  return (
    <>
      <div className="app">
        <h1>Custom Video Player</h1>
        <VideoPlayer src={src} highlightTime={highlightTime} />
      </div>
    </>
  );
}

export default App;
