import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { AuthUserContext } from '~/App';
import * as userService from '~/services/userService';
const cx = classNames.bind(styles);

function AccountPreview({ data, followed, setFollowed, onOpenLogin }) {
    const authUser = useContext(AuthUserContext);
    // const [following, setFollowing] = useState(data.user.is_followed);
    const handleFollow = (e) => {
        e.preventDefault();
        if (followed) {
            userService
                .unfollowAnUser({ userId: data.user.id, accessToken: authUser.meta.token })
                .then((res) => {
                    setFollowed(res.data.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .followAnUser({ userId: data.user.id, accessToken: authUser.meta.token })
                .then((res) => {
                    setFollowed(res.data.is_followed);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.user.avatar} alt="" />
                {authUser && !followed && (
                    <Button onClick={handleFollow} outline className={cx('follow-btn')}>
                        Follow
                    </Button>
                )}
                {authUser && followed && (
                    <Button onClick={handleFollow} round className={cx('following-btn')}>
                        Following
                    </Button>
                )}
                {!authUser && (
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            onOpenLogin();
                        }}
                        outline
                        className={cx('follow-btn')}
                    >
                        Follow
                    </Button>
                )}
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data.user.nickname}</strong>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>
                    {data.user.first_name} {data.user.last_name}
                </p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data.user.followers_count} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{data.user.likes_count} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
                <p className={cx('content-bio')}>
                    <span>{data.user.bio}</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
