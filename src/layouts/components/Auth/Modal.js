import { useContext } from 'react';
import { CloseButtonIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { ModalBodyNameContext } from '~/layouts/components/Header/Header';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);
function Modal({ children, onClose }) {
    const value = useContext(ModalBodyNameContext);
    return (
        <div className={cx('Modal-container')}>
            <div className={cx('Modal-mask')}></div>
            <div className={cx('Modal-content-container')}>
                <div className={cx('Modal-header')}>
                    {value.navigateBack && (
                        <div
                            className={cx('Back-btn')}
                            onClick={(event) => {
                                event.preventDefault();
                                value.handleModalBodyName(value.navigateBack);
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                    )}
                    <div className={cx('Close-wrapper')} onClick={onClose} style={{ transform: 'scale(1.7)' }}>
                        <CloseButtonIcon width={15} height={15} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
