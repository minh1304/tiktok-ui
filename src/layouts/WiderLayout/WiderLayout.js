import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './WiderLayout.module.scss';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import OpenLogin from '~/components/OpenLogin/OpenLogin';
const cx = classNames.bind(styles);
function WiderLayout({ children }) {
    const [openLogin, setOpenLogin] = useState(false);
    const [close, setClose] = useState(false);
    const handleOpenLogin = () => {
        setOpenLogin(true);
        setClose(false);
    };
    const handleClose = () => {
        setClose(true);
        setOpenLogin(false);
    };
    return (
        <div className={cx('wrapper')}>
            {openLogin && !close && <OpenLogin onClose={handleClose} />}
            <Header wider={true} onOpenLogin={handleOpenLogin} />
            <div className={cx('container')}>
                <Sidebar wider={true} onOpenLogin={handleOpenLogin} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
WiderLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default WiderLayout;
