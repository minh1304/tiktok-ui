import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';

import Video from '~/layouts/components/Video';
import styles from './Home.module.scss';
import * as timelineService from '~/services/timelineService';
import { AuthUserContext } from '~/App';
import OpenLogin from '~/components/OpenLogin/OpenLogin';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [videos, setVideos] = useState([]);
    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token;
    useEffect(() => {
        timelineService
            .getVideos({ type: 'for-you', page, accessToken: accessToken })
            .then((data) => {
                setVideos((prev) => [...prev, ...data]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page, accessToken]);
    const handleSeeMore = () => {
        setPage(page + 1);
    };
    const [openLogin, setOpenLogin] = useState(false);
    const [close, setClose] = useState(false);
    const handleOpenLogin = () => {
        setClose(false);
    };
    const handleClose = () => {
        setClose(true);
        setOpenLogin(false);
    };

    return (
        <div className={cx('wrapper')}>
            {(openLogin && !close) && (
                <OpenLogin onClose={handleClose} />
            ) 
            }
            <div className={cx('body')}>
                {videos.map((video) => (
                    <Video key={video.id} video={video} onOpenLogin={handleOpenLogin}/>
                ))}
                <p onClick={handleSeeMore} className={cx('see-more')}>
                    See more video
                </p>
            </div>
        </div>
    );
}

export default Home;
