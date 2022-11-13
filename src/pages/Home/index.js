import classNames from "classnames/bind";
import Video from "~/layouts/components/Video";
import styles from './Home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <Video></Video>
            </div>
        </div>
    )
}

export default Home;