import classNames from 'classnames/bind';
import styles from './WiderLayout.module.scss';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
const cx = classNames.bind(styles);
function WiderLayout({ children }) {
    return (
            <div className={cx('wrapper')}>
                <Header wider={true} />
                <div className={cx('container')}>
                    <Sidebar wider={true} />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
    );
}
WiderLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default WiderLayout;
