import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar/Sidebar';
import OpenLogin from '~/components/OpenLogin/OpenLogin';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [openLogin, setOpenLogin] = useState(false)
    const [close, setClose] = useState(false)
    const handleOpenLogin = () => {
        setOpenLogin(true)
        setClose(false)
    };
    const handleClose = () => {
        setClose(true)
        setOpenLogin(false)
    }
    

    return (
        <div className={cx('wrapper')}>
            {(openLogin && !close) && (
                <OpenLogin onClose={handleClose} />
            ) 
            }
            <Header onOpenLogin={handleOpenLogin} /> 
            <div className={cx('container')}>
                <Sidebar onOpenLogin={handleOpenLogin} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
