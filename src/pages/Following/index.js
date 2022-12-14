import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';

import Video from '~/layouts/components/Video';
import Card from '~/layouts/components/Card';
import styles from './Following.module.scss';
import * as timelineService from '~/services/timelineService';
import * as userService from '~/services/userService';
import OpenLogin from '~/components/OpenLogin';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Following() {
    const [page, setPage] = useState(INIT_PAGE);
    const [videos, setVideos] = useState([]);
    const [suggestedUser, setSuggestedUser] = useState([]);
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
    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token;

    useEffect(() => {
        // timelineService
        //     .getVideos({ type: 'for-you', page, accessToken: accessToken })
        //     .then((data) => {
        //         setVideos((prev) => [...prev, ...data]);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        if (authUser) {
            timelineService
                .getVideos({ type: 'for-you', page, accessToken: accessToken })
                .then((data) => {
                    setVideos((prev) => [...prev, ...data]);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .getSuggested({ page: 1, perPage: 18 })
                .then((data) => {
                    setSuggestedUser(data);
                })
                .catch((error) => console.log(error));
        }
    }, [page, accessToken, authUser]);
    // useEffect(() => {
    //     userService
    //         .getSuggested({ page: 1, perPage: 18 })
    //         .then((data) => {
    //             setSuggestedUser(data);
    //         })
    //         .catch((error) => console.log(error));
    // });
    const handleSeeMore = () => {
        setPage(page + 1);
    };
    return (
        <div className={cx('wrapper')}>
            {openLogin && !close && <OpenLogin onClose={handleClose} />}
            <div className={cx('body')}>
                {authUser && (
                    <>
                        {videos.map(
                            (video) => video.user.is_followed && <Video key={video.id} video={video} isFollow={true} />,
                        )}
                        <p onClick={handleSeeMore} className={cx('see-more')}>
                            See more video
                        </p>
                    </>
                )}
                {!authUser && (
                    <>
                        {suggestedUser.map((account) => (
                            <Card key={account.id} data={account} onOpenLogin={handleOpenLogin} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Following;
