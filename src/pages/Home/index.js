import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import Video from '~/layouts/components/Video';
import styles from './Home.module.scss';
import * as timelineService from '~/services/timelineService';

const cx = classNames.bind(styles);
const INIT_PAGE = 15;
function Home() {
    const [page, setPage] = useState(INIT_PAGE);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        timelineService
            .getVideos({ type: 'for-you', page: page })
            // .then((res) => {
            //     if (Array.isArray(res.data)) {
            //         setVideos((prev) => [...prev, ...res.data]);
            //     }
            // })
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                {videos.map((video) => (
                    <Video key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}

export default Home;
