import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import config from '~/config';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Video() {
    return (
        <div className={cx('container')}>
            <Link to={config.routes.following}>
                <Image
                    className={cx('avatar')}
                    src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/fbbb4325ea38b04c639c3aa392208fe6~c5_100x100.jpeg?x-expires=1668495600&x-signature=yxwDzrflDcQTphnOxkqKDF9IuLQ%3D"
                    alt="Ciin"
                />
            </Link>
            <div>
                <Link to={config.routes.following} className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>ciinnn</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>CiiN</p>
                </Link>
                <div className={cx('description')}>
                    Vẫn là biết nhảy thì nhảy hông biết nhảy thì bấm đèn chơi bong bóng =)))){' '}
                </div>
                <Link to={config.routes.following} >
                    <h4>
                        <FontAwesomeIcon className={cx('music')} icon={faMusic} /> Last Christmas x Hưng Hack remix -
                        Quang Huy ⚜️
                    </h4>
                </Link>
            </div>
        </div>
    );
}

export default Video;
