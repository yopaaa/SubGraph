import "../Home.css";
import moment from "moment";

const Panel = ({ data }) => {
    return (
        <div className="app-header">
            <div className="left-header">
                <img src="/icon/linux.png" alt="" width="24" height="24" />
                <span className="left-header-text">
                    {
                        data.left.map(item => (
                            <span key={item.id}>
                                {/* <img src={item.icon} alt={item.name} width="20" height="20" onClick={item.function} /> */}
                                <a href={item.href}>{item.name}</a>
                            </span>
                        ))
                    }
                </span>
            </div>

            <div className="center-header">
                <span id="clock">{moment().format('LLLL')}</span>
            </div>

            <div className="right-header">
                {data.right.map((item, i) => (
                    <span key={i} className="flex-center">
                        <img src={item.icon} alt={item.name} width="20" height="20" onClick={item.function} />
                    </span>
                ))}
            </div>
        </div>

    );
};

export default Panel;
