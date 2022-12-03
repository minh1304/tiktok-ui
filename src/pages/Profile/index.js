import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import Image from '~/components/Image';
import styles from './Profile.module.scss';
import * as userService from '~/services/userService';
import { AuthUserContext } from '~/App';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import {
    BlockIcon,
    CopyIcon,
    FBIcon,
    HrefIcon,
    ReportIcon,
    ShareIcon,
    TwitterIcon2,
    UnFollowIcon,
    UserMoreIcon,
    WhatsApp,
} from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Share from './Share';
import More from './More';
import LayoutMain from '~/layouts/components/LayoutsMain';
import OpenLogin from '~/components/OpenLogin';
import OpenEditProfile from '~/components/OpenEditProfile';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        title: 'Embed',
        icon: <HrefIcon />,
    },
    {
        title: 'Share to Facebook',
        icon: <FBIcon />,
    },
    {
        title: 'Share to WhatsApp',
        icon: <WhatsApp />,
    },
    {
        title: 'Share to Twitter',
        icon: <TwitterIcon2 />,
    },
    {
        title: 'Copy link',
        icon: <CopyIcon />,
    },
];
const MORE_ITEMS = [
    {
        title: 'Report',
        icon: <ReportIcon />,
    },
    {
        title: 'Block',
        icon: <BlockIcon />,
    },
];

function Profile() {
    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token;
    const { nickname } = useParams(); // get nickname
    const [user, setUser] = useState([]);
    const [followed, setFollowed] = useState(user.is_followed);
    // const [videos, setVideos] = useState([])

    useEffect(() => {
        userService
            .getUserProfile({ nickname: nickname, accessToken: accessToken })
            .then((data) => {
                setUser(data);
                setFollowed(data.is_followed);
                // data.videos.map((video)=> )
                // setVideos(data.videos)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [nickname, accessToken]);

    const handleFollow = () => {
        if (followed) {
            userService
                .unfollowAnUser({ userId: user.id, accessToken: authUser.meta.token })
                .then((res) => {
                    setFollowed(res.data.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .followAnUser({ userId: user.id, accessToken: authUser.meta.token })
                .then((res) => {
                    setFollowed(res.data.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleOpenMess = () => {
        alert('This function has not been implemented yet');
    };
    const renderPreview = (prop) => {
        return (
            <div tabIndex="-1" {...prop}>
                <PopperWrapper>
                    <Share items={MENU_ITEMS} />
                </PopperWrapper>
            </div>
        );
    };
    const renderMore = (prop) => {
        return (
            <div tabIndex="-1" {...prop}>
                <PopperWrapper>
                    <More items={MORE_ITEMS} />
                </PopperWrapper>
            </div>
        );
    };
    const [openLogin, setOpenLogin] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [close, setClose] = useState(false);
    const handleOpenLogin = () => {
        setOpenLogin(true);
        setClose(false);
    };
    const handleClose = () => {
        if (!authUser) {
            setClose(true);
            setOpenLogin(false);
        } else {
            window.location.reload();
            setClose(true);
            setOpenLogin(false);
        }
    };
    const handleEditProfile = () => {
        setOpenProfile(true);
        setClose(false);
    };
    return (
        <div className={cx('content')}>
            {openLogin && !close && <OpenLogin onClose={handleClose} />}
            {openProfile && !close && <OpenEditProfile data={user} onClose={handleClose} />}
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('user-avatar')}>
                        <Image src={user.avatar} className={cx('img-avt')} />
                    </div>
                    <div className={cx('title-container')}>
                        <h2 className={cx('userName')}>
                            {user.nickname}
                            {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </h2>
                        <h1 className={cx('userFullName')}>
                            {user.first_name} {user.last_name}
                        </h1>
                        <div className={cx('followContainer')}>
                            {authUser && !followed && authUser.data.nickname !== nickname && (
                                <Button onClick={handleFollow} primary className={cx('btn-follow')}>
                                    Follow
                                </Button>
                            )}

                            {(authUser && authUser.data.nickname) === nickname && (
                                <Button onClick={handleEditProfile} round className={cx('btn-editProfile')}>
                                    {' '}
                                    <FontAwesomeIcon style={{ fontSize: '18px' }} icon={faPenToSquare} /> Edit profile
                                </Button>
                            )}

                            {!authUser && (
                                <Button onClick={handleOpenLogin} primary className={cx('btn-follow')}>
                                    Follow
                                </Button>
                            )}

                            <div className={cx('messages-container')}>
                                {followed && (
                                    <Button onClick={handleOpenMess} outline className={cx('btn-messages')}>
                                        Messages
                                    </Button>
                                )}
                                {followed && (
                                    <div onClick={handleFollow} className={cx('container-icon')}>
                                        <UnFollowIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className={cx('count-info')}>
                    <div className={cx('number')}>
                        <strong>{user.followings_count}</strong>
                        <span className={cx('text')}>Following</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{user.followers_count}</strong>
                        <span className={cx('text')}>Follower</span>
                    </div>
                    <div className={cx('number')}>
                        <strong>{user.likes_count}</strong>
                        <span className={cx('text')}>Likes</span>
                    </div>
                </h2>
                <h2 className={cx('bio')}>{user.bio}</h2>
                <Tippy interactive offset={[30, 0]} delay={[300, 300]} placement="bottom-end" render={renderPreview}>
                    <div className={cx('share-action')}>
                        <ShareIcon />
                    </div>
                </Tippy>

                <Tippy interactive offset={[0, 0]} delay={[300, 300]} placement="bottom-end" render={renderMore}>
                    <div className={cx('user-more')}>
                        <UserMoreIcon />
                    </div>
                </Tippy>
            </div>

            <LayoutMain listVideos={user.videos} />
        </div>
    );
}

export default Profile;
