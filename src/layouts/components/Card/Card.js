import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Card({ data }) {
    const [play, setPlay] = useState(false);
    const handleFollow = (e) => {
        e.preventDefault();
        alert('Please Login!');
    };
    const handlePlayCard = () => {
        setPlay(true);
    };
    const handleStopPlayCard = () => {
        setPlay(false)
    }
    return (
        <div className={cx('userCard')}>
            <a href={`/@${data.nickname}`} className={cx('aUserCard')}>
                <div className={cx('divContainer')} onMouseOver={handlePlayCard} onMouseOut={handleStopPlayCard}>
                    {play &&
                        <video
                            autoPlay
                            loop
                            muted
                            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                        >
                            <source src={data.popular_video.file_url} type="video/mp4" />
                        </video>
                    }
                    <Image className={cx('imgPoster')} src={data.popular_video.thumb_url} alt={data.nickname} />
                </div>
                <div className={cx('divInfoContainer')}>
                    <span className={cx('avtContainer')}>
                        <Image className={cx('img-avatar')} src={data.avatar} alt={data.nickname} />
                    </span>
                    <h5 className={cx('name')}>
                        {data.first_name} {data.last_name}
                    </h5>
                    <h6 className={cx('nickname')}>{data.nickname}</h6>
                    <div className={cx('buttonContainer')}>
                        <Button onClick={handleFollow} primary className={cx('buttonFollow')}>
                            Follow
                        </Button>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Card;
