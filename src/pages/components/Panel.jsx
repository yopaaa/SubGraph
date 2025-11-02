import moment from "moment";
import styles from "./Panel.module.css"

const Panel = ({ data }) => {
    return (
        <div className={styles.appHeader}>
            <div className={styles.leftHeader}>
                <img src="/icon/linux.png" alt="" width="24" height="24" />
                <span className={styles.leftHeaderText}>
                    {
                        data.left.map(item => (
                            <span key={item.id}>
                                <a href={item.href}>{item.name}</a>
                            </span>
                        ))
                    }
                </span>
            </div>

            <div className={styles.centerHeader}>
                <span className={styles.clock}>{moment().format('LLLL')}</span>
            </div>

            <div className={styles.rightHeader}>
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
