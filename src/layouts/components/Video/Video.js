import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function Video({ video }) {
    const renderPreview = (prop) => {
        return (
            <div tabIndex="-1" {...prop}>
                <PopperWrapper>
                    <AccountPreview data={video} />
                </PopperWrapper>
            </div>
        );
    };
    const [like, setLike] = useState(false);
    const [following, setFollowing] = useState(false);
    const handleLike = () => {
        if (like) {
            setLike(false);
        } else {
            setLike(true);
        }
    };
    const handleFollow = () => {
        if (following) {
            setFollowing(false);
        } else {
            setFollowing(true);
        }
    };
    return (
        <div className={cx('container')}>
            <Link to={config.routes.following}>
                <Tippy interactive delay={[800, 500]} offset={[-10, 5]} placement="bottom-start" render={renderPreview}>
                    <Image className={cx('avatar')} src={video.user.avatar} alt={video.user.nickname} />
                </Tippy>
            </Link>
            <div>
                <Link to={config.routes.following} className={cx('item-info')}>
                    <Tippy
                        interactive
                        delay={[800, 500]}
                        offset={[-10, 5]}
                        placement="bottom-start"
                        render={renderPreview}
                    >
                        <p className={cx('nickname')}>
                            <strong>{video.user.nickname}</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                    </Tippy>
                    <Tippy
                        interactive
                        delay={[800, 500]}
                        offset={[-10, 5]}
                        placement="bottom-start"
                        render={renderPreview}
                    >
                        <p className={cx('name')}>
                            {video.user.first_name} {video.user.last_name}
                        </p>
                    </Tippy>
                </Link>

                <div className={cx('description')}>{video.description}</div>
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
                        <source src={video.file_url} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                    <div className={cx('action')}>
                        <button className={cx('button')} onClick={handleLike}>
                            <div className={cx('icon')}>
                                <p>
                                    <FontAwesomeIcon
                                        className={like ? cx('span-icon-wrapper-like') : cx('span-icon-wrapper')}
                                        icon={faHeart}
                                    />
                                </p>
                            </div>
                            <strong className={cx('count')}>{video.likes_count}</strong>
                        </button>
                        <button className={cx('button')}>
                            <div className={cx('icon')}>
                                <p className="icon-wrapper">
                                    <FontAwesomeIcon className={cx('span-icon-wrapper')} icon={faCommentDots} />
                                </p>
                            </div>
                            <strong className={cx('count')}>{video.comments_count}</strong>
                        </button>
                        <button className={cx('button')}>
                            <div className={cx('icon')}>
                                <p className="icon-wrapper">
                                    <FontAwesomeIcon className={cx('span-icon-wrapper')} icon={faShare} />
                                </p>
                            </div>
                            <strong className={cx('count')}>{video.shares_count}</strong>
                        </button>
                    </div>
                </div>
            </div>
            {!following && (
                <Button onClick={handleFollow} outline className={cx('follow-btn')}>
                    Follow
                </Button>
            )}
            {following && (
                <Button onClick={handleFollow} round className={cx('following-btn')}>
                    Following
                </Button>
            )}

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
