import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
const cx = classNames.bind(styles)
function Discover() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <h1>Discover Page</h1>
            </div>
        </div>
    )
}

export default Discover;