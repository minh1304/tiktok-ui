import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data.user.avatar} alt="" />
                <Button className={cx('follow-btn')} outline>
                    Follow
                </Button>
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
                    <span >{data.user.bio}</span>
                </p>
            </div>
        </div>
    );
}
AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;
