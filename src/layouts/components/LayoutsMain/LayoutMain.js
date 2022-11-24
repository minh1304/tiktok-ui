import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Card from './Card';
import styles from './LayoutMain.module.scss';
const cx = classNames.bind(styles);
function LayoutMain({ listVideos }) {
    console.log(listVideos);


    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-feed-tab')}>
                <p className={cx('video-tab')}>
                    <span>Videos</span>
                </p>
            </div>
            <div className={cx('container')} style={{ width: '100%' }}>
                <div className={cx('item-list')}>
                    {/* {listVideos.map((video) => <Card data={video}/>)} */}
                    {
                        listVideos?.map((video) => <Card key={video.id} data={video}/>)
                    }

                </div>
            </div>
        </div>
    );
}

export default LayoutMain;
