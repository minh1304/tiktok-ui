import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useContext, useEffect, useRef, useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import config from '~/config';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import AccountPreview from './AccountPreview';
import { AuthUserContext } from '~/App';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Video({ video, isFollow, onOpenLogin }) {
    const renderPreview = (prop) => {
        return (
            <div tabIndex="-1" {...prop}>
                <PopperWrapper>
                    <AccountPreview
                        data={video}
                        followed={following}
                        setFollowed={setFollowing}
                        onOpenLogin={onOpenLogin}
                    />
                </PopperWrapper>
            </div>
        );
    };
    const [like, setLike] = useState(video.is_like); //api don't work
    const [following, setFollowing] = useState(video.user.is_followed);
    const authUser = useContext(AuthUserContext);
    const handleLike = () => {
        if (like) {
            setLike(false);
        } else {
            setLike(true);
        }
    };
    const handleFollow = () => {
        if (following & authUser) {
            userService
                .unfollowAnUser({ userId: video.user.id, accessToken: authUser.meta.token })
                .then((res) => {
                    setFollowing(res.data.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .followAnUser({ userId: video.user.id, accessToken: authUser.meta.token })
                .then((res) => {
                    setFollowing(res.data.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const [playing, setPlaying] = useState(true);
    const videoRef = useRef(null);
    useEffect(() => {
        let options = {
            rootMargin: '0px',
            threshold: [0.5, 0.85],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && playing) {
                    videoRef.current.play();
                    setPlaying(true);
                } else {
                    videoRef.current.pause();
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
    });

    const handleVideoPress = () => {
        if (playing) {
            console.log('click dừng');
            videoRef.current.pause();
            setPlaying(false);
        } else {
            console.log('click chạy');
            videoRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <div className={cx('container')}>
            <a href={`/@${video.user.nickname}`}>
                <Tippy interactive delay={[800, 500]} offset={[-10, 5]} placement="bottom-start" render={renderPreview}>
                    <Image className={cx('avatar')} src={video.user.avatar} alt={video.user.nickname} />
                </Tippy>
            </a>
            <div>
                <a href={`/@${video.user.nickname}`} className={cx('item-info')}>
                    <Tippy
                        interactive
                        delay={[800, 500]}
                        offset={[-80, 30]}
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
                        offset={[-220, 30]}
                        placement="bottom-start"
                        render={renderPreview}
                    >
                        <p className={cx('name')}>
                            {video.user.first_name} {video.user.last_name}
                        </p>
                    </Tippy>
                </a>

                <div className={cx('description')}>{video.description}</div>
                <div className={cx('link-music')}>
                    <Link to={config.routes.following}>
                        <h4>
                            <FontAwesomeIcon className={cx('music')} icon={faMusic} />
                            {video.music}
                        </h4>
                    </Link>
                </div>

                <div className={cx('container-video')}>
                    <div className={cx('feed-video')}>
                        <div className={cx('video-player-container')}>
                            <div className={cx('div-container')}>
                                <div className={cx('basic-player-wrapper')}>
                                    <div className={cx('container-video')}>
                                        <video
                                            ref={videoRef}
                                            onClick={handleVideoPress}
                                            className={cx('video')}
                                            controls
                                            loop
                                            muted
                                            playsInline
                                            poster={video.thumb_url}
                                        >
                                            <source src={video.file_url} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </div>

                            <div>video play</div>

                        </div>
                    </div>
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
            {/* isFollow in page Following 
                if isFollow = true then don't see Button
            */}
            {authUser && !following && !isFollow && (
                <Button onClick={handleFollow} outline className={cx('follow-btn')}>
                    Follow
                </Button>
            )}
            {authUser && following && !isFollow && (
                <Button onClick={handleFollow} round className={cx('following-btn')}>
                    Following
                </Button>
            )}
            {!authUser && (
                <Button onClick={onOpenLogin} outline className={cx('follow-btn')}>
                    Follow
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
