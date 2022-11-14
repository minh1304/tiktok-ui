import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import config from '~/config';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

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
                <div className={cx('link-music')}>
                    <Link to={config.routes.following}>
                        <h4>
                            <FontAwesomeIcon className={cx('music')} icon={faMusic} /> Last Christmas x Hưng Hack remix
                            - Quang Huy ⚜️
                        </h4>
                    </Link>
                </div>

                <div className={cx('container-video')}>
                    <video
                        // ref={videoRef}
                        className={cx('video')}
                        // style={{ width: '336px', height:'600px'}}
                        controls
                        loop
                        muted
                        playsInline
                        // poster={video.thumb_url}
                    >
                        <source
                            src="https://v16-webapp.tiktok.com/fb6cee35667aa32e6bdb9c8a137691ec/63723855/video/tos/useast2a/tos-useast2a-pve-0037-aiso/8fcc9db990244b41808aab7f878b0863/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3614&bt=1807&cs=0&ds=3&ft=kLO5qy-gZmo0PjI5wBkVQiXBDiHKJdmC0&mime_type=video_mp4&qs=0&rc=ZTs1NDk5ZTNnZTw3NDs1NkBpamQzcWk6ZmlpZzMzZjgzM0AuLl8uMi01NTExNjRgLzEvYSNoMGtecjRncGxgLS1kL2Nzcw%3D%3D&l=2022111406445301024524424627052151&btag=80000"
                            type="video/mp4"
                        />
                        Your browser does not support HTML video.
                    </video>
                </div>
            </div>
            <Button outline className={cx('follow-btn')}>
                Follow
            </Button>
            {/* <div className="flex">
            <div className="mr-4">
              <video
                ref={videoRef}
                className="w-full rounded-lg overflow-hidden"
                style={{ width: '286px' }}
                controls
                loop
                muted
                playsInline
                poster={video.thumb_url}
              >
                <source src={video.file_url} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div> */}
        </div>
    );
}

export default Video;
