import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import * as userService from '~/services/userService';
import { AuthUserContext } from '~/App';
import { useContext, useState } from 'react';
const cx = classNames.bind(styles);

function AccountPreview({ data}) {
    const authUser = useContext(AuthUserContext);
    const [followed, setFollowed] = useState(data.is_followed);
    const handleFollow = (e) => {
        e.preventDefault();
        if (!authUser || !authUser.meta.token) {
            alert('Please Login!');
        } else {
            if (followed) {
                userService
                    .unfollowAnUser({ userId: data.id, accessToken: authUser.meta.token })
                    .then((res) => {
                        setFollowed(res.data.is_followed);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                userService
                    .followAnUser({ userId: data.id, accessToken: authUser.meta.token })
                    .then((res) => {
                        setFollowed(res.data.is_followed);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.avatar} alt="" />
                {!followed && (
                    <Button className={cx('follow-btn')} primary onClick={handleFollow}>
                        Follow
                    </Button>
                )}
                {followed && (
                    <Button className={cx('follow-btn')} round onClick={handleFollow}>
                        Following
                    </Button>
                )}
                {/* <Button className={cx('follow-btn')} primary>
                    Follow
                </Button> */}
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>
                    {data.first_name} {data.last_name}
                </p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
