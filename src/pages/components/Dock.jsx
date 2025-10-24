import "../Home.css";


const Dock = ({dock, showDiv}) => {
  

  return (
    <div className="apps">
        <div id="app-container">
          {dock.map(app => (
            <span key={app.id} onClick={app.function} className={`app-items magic-lamp`}>
              <img src={app.icon} alt="" width="50" height="50" />
              {(showDiv[app.id]) ? <img src="/icon/circle.png" alt="" width="5" height="5" style={{ position: "absolute" }} /> : null}
            </span>
          ))}
        </div>
      </div>
  );
};

export default Dock;
