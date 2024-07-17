import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function App() {
  const [caption, setCaption] = useState("brat generator and it's the same but there's no word limit on brat green backgrounds so it's not");
  const [fontSize, setFontSize] = useState(Math.min(window.innerWidth / 24, 44));
  const [normal, setNormal] = useState(false);

  const handleSliderChange = (event) => {
    setFontSize(event.target.value);
  };

  function isSingleWord(str) {
    // Regular expression to match a single word
    const regex = /^\s*[^\s]+\s*$/;
    return regex.test(str);
  }

  useEffect(() => {
    setNormal(window.innerWidth >= 660);
  }, [window.innerWidth, normal]);

  function setColor(color) {
    document.body.style.backgroundColor = color;
  }

  return (
    <div className="App">
      <div className="center">
        <div className="content">
          <div className="glass form">
            <div className="flex">
              <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="type your caption here..." />
            </div>
            <div className="flex">
              <input
                type="range"
                min={20}
                max={normal ? 80 : 36}
                value={fontSize}
                onChange={handleSliderChange}
                className="slider"
              />
            </div>
            <div className="list">
              <button className="color" onClick={() => setColor("#85C803")} style={{ backgroundColor: "#85C803" }} />
              <button className="color" onClick={() => setColor("#fff")} style={{ backgroundColor: "#fff" }} />
              <button className="color" onClick={() => setColor("#9B0000")} style={{ backgroundColor: "#9B0000" }} />
              <button className="color" onClick={() => setColor("#1001AC")} style={{ backgroundColor: "#1001AC" }} />
              <button className="color" onClick={() => setColor("#e1c903")} style={{ backgroundColor: "#e1c903" }} />
            </div>
            <div className="list">
              <p className="brat small">follow me!</p>
              <a href="https://github.com/ZoeyZoella" target="blank"><FaGithub /></a>
              <a href="https://www.instagram.com/zhaoli_xcx/" target="blank"><FaInstagram /></a>
            </div>
          </div>
          <p className={"label brat font-" + (isSingleWord(caption) ? "center" : "justify")} style={{ fontSize: `${fontSize}px` }}>
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
