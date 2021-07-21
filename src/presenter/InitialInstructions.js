import './InitialInstructions.css';

export default function InitialInstructions() {
    return (
        <>
        <h3>Welcome</h3>
        <hr/>
        <div className="welcome-msg">
            <p className="about">Archivepelago is a project modeling the transmission of notions of sexuality and gender by mapping networks of 19<sup>th</sup> and 20<sup>th</sup> century queer writers and artists.</p>
            <p className="instructions" id="initial-instructions">Start exploring by selecting an artist, writer, or a correspondence icon linking them. You can also rearrange the map by dragging an artist or writer's node.</p>
            <p className="instructions" id="touch-instructions">You can move the map around by dragging; pinch to zoom.</p>
            <p className="instructions" id="orientation-instructions">To use this app, please rotate to landscape mode or view on a Mac/PC/Laptop.</p>
        </div>
        </>
    )
}