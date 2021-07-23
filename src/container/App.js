import React from 'react';
import './App.css';
import { SITE_VERSION } from '../siteConfig';
import { INITIAL_INSTRUCTIONS, ARTIST, LETTERS } from '../presenter/presenters';
import InitialInstructions from '../presenter/InitialInstructions';
import ZoomSlider from '../applet/controls/ZoomSlider';
import LettersGraph from '../applet/LettersGraph';
import Artist from '../presenter/Artist';
import Letters from '../presenter/Letters';

function App() {
  const [presenter, setPresenter] = React.useState([INITIAL_INSTRUCTIONS, {}]);

  const zoomRef = React.useRef();
  const lettersGraphRef = React.useRef();

  const renderSidePresenter = () => {
    switch(presenter[0]){
      default:
      case INITIAL_INSTRUCTIONS:
        return <InitialInstructions />;
      case ARTIST:
        return <Artist artistDetails={presenter[1]} />
      case LETTERS:
        return <Letters letters={presenter[1]} />
    }
  }

  const setZoomSliderVal = (value) => {
    if(zoomRef.current) zoomRef.current.handleZoomVal(value);
  }

  const handleZoomValChange = (event, value) => {
    if(lettersGraphRef.current.setZoomVal(value));
  }

const selectNode = (presenter, data) => {
  setPresenter([presenter, data]);
}

  return (
    <div className="app">
      <header className="site-title">
        <h1 onClick={() => {setPresenter([INITIAL_INSTRUCTIONS, {}])}}>
          <span className="site-title-main">Archivepelago</span><span className="version">v{SITE_VERSION}</span>
        </h1>
        <h2>Networked Correspondence Map</h2>
      </header>
      <main>
        <section id="side-presenter">
          {renderSidePresenter()}
        </section>
        <ZoomSlider ref={zoomRef} handleZoomChange={handleZoomValChange} />
        <LettersGraph ref={lettersGraphRef} handleZoomChange={setZoomSliderVal} onSelectNode={selectNode} />
      </main>
    </div>
  );
}

export default App;