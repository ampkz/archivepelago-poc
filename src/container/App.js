import './App.css';
import { SITE_VERSION } from '../siteConfig';
import SideApplet from '../applet/SideApplet';

function App() {
  return (
    <div className="app">
      <header className="site-title">
        <h1>
          <span className="site-title-main">Archivepelago</span><span className="version">v{SITE_VERSION}</span>
        </h1>
        <h2>Networked Correspondence Map</h2>
      </header>
      <main>
        <SideApplet />        
      </main>
    </div>
  );
}

export default App;
