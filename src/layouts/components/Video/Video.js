import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import config from '~/config';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Video({video}) {
    return (
        <div className={cx('container')}>
            <Link to={config.routes.following}>
                <Image
                    className={cx('avatar')}
                    src={video.user.avatar}
                    alt="Ciin"
                />
            </Link>
            <div>
                <Link to={config.routes.following} className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{video.user.nickname}</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>{video.user.first_name} {video.user.last_name}</p>
                </Link>

                <div className={cx('description')}>
                    {video.description}
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
                        poster={video.thumb_url}
                    >
                        <source
                            src={video.file_url}
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
