import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { quantum } from 'ldrs'

function App() {
  const [caption, setCaption] = useState("brat generator and it's the same but there's no word limit on brat green backgrounds so it's not");
  const [fontSize, setFontSize] = useState(Math.min(window.innerWidth / 24, 44));
  const [normal, setNormal] = useState(false);
  const [color, setColor] = useState("#85C803");
  const [unique, setUnique] = useState(null);
  const [bratWall, setBratWall] = useState(null);
  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  quantum.register()

  const addEntry = (e) => {
    e.preventDefault();

    setUploading(true);

    fetch(`${process.env.REACT_APP_SHEETS_URL}?action=addEntry&text=${caption}`)
      .then(response => response.json())
      .catch(e => { })
      .then(d => {
        setUploading(false);
        window.location.reload();
      });
  }

  const handleSliderChange = (event) => {
    setFontSize(event.target.value);
  };

  function isSingleWord(str) {
    // Regular expression to match a single word
    const regex = /^\s*[^\s]+\s*$/;
    return regex.test(str);
  }

  useEffect(() => {
    if (!bratWall) {
      fetch(`${process.env.REACT_APP_SHEETS_URL}?action=selectEntries&max=100`)
        .then(response => response.json())
        .catch(e => { })
        .then(d => {
          setBratWall(d.data.rows);
          console.log(d.data.rows);
          setLoading(false);
        });
    }
    if (!unique) {
      fetch(`${process.env.REACT_APP_SHEETS_URL}?action=getUniqueCount`)
        .then(response => response.json())
        .catch(e => { })
        .then(d => {
          setUnique(d.data.rows);
        });
    }
  }, []);

  useEffect(() => {
    setNormal(window.innerWidth >= 660);
  }, []);

  function setTheColor(clr) {
    setColor(clr);
    document.body.style.backgroundColor = clr;
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="marquee">
          {bratWall && bratWall.map((text, index) => {
            return <p className="brat muted" key={index}>{text}</p>;
          })}
        </div>
      </div>
      <div className="center">
        <div className="content">
          <div className="glass form">
            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="type your caption here..." />
            <div className="flex vertical">
              <input
                type="range"
                min={20}
                max={normal ? 80 : 36}
                value={fontSize}
                onChange={handleSliderChange}
                className="slider"
              />
              <div className="list">
                <button className="color" onClick={() => setTheColor("#85C803")} style={{ backgroundColor: "#85C803" }} />
                <button className="color" onClick={() => setTheColor("#fff")} style={{ backgroundColor: "#fff" }} />
                <button className="color" onClick={() => setTheColor("#9B0000")} style={{ backgroundColor: "#9B0000" }} />
                <button className="color" onClick={() => setTheColor("#1001AC")} style={{ backgroundColor: "#1001AC" }} />
                <button className="color" onClick={() => setTheColor("#e1c903")} style={{ backgroundColor: "#e1c903" }} />
              </div>
            </div>
            <div className="flex">
              <p className="message">{loading ? "loading brat wall..." : ("upload to the brat wall!")}<b>{(unique ? ` (${unique} entries)` : "")}</b></p>
              {loading && <l-quantum size="45" speed="1.75" color="black"></l-quantum>}
              {!(loading) && <form className="flex vertical" onSubmit={addEntry}>
                {(uploading ? <input type="submit" value="redload..." disabled /> : <input type="submit" value="submit" />)}
              </form>}
            </div>
            <div className="flex vertical">
              <div className="list">
                <a href="https://github.com/ZoeyZoella" target="blank"><FaGithub /></a>
                <a href="https://www.instagram.com/zhaoli_xcx/" target="blank"><FaInstagram /></a>
                <p className="brat small">tag me on insta! @zhaoli_xcx</p>
              </div>
            </div>
          </div>
          {color && <p className={"label brat font-" + (isSingleWord(caption) ? "center" : "justify")} style={{
            fontSize: `${fontSize}px`,
            backgroundColor: color,
            border: "20px solid " + color,
            boxShadow: "0px 0px 10px " + color
          }}>
            {caption}
          </p>}
        </div>
      </div>
    </div>
  );
}

export default App;
