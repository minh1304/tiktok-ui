import classNames from 'classnames/bind';
import { useState } from 'react';
import Image from '~/components/Image';
import styles from './Card.module.scss';
const cx = classNames.bind(styles);
function Card({ data }) {
    const [play, setPlay] = useState(false);
    const handlePlayCard = () => {
        setPlay(true);
    };
    const handleStopPlayCard = () => {
        setPlay(false);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('post-item')}  onMouseOver={handlePlayCard} onMouseOut={handleStopPlayCard}>
                {play && (
                    <video
                        autoPlay
                        loop
                        muted
                        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                        <source src={data.file_url} type="video/mp4" />
                    </video>
                )}

                <Image src={data.thumb_url} className={cx('img-poster')} alt={data.uuid} />
            </div>
            <div className={cx('tag-card')}>
                <a href="/">
                    <div className={cx('title-clip')}>
                        <span className={cx('text')}>{data.description}</span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Card;
