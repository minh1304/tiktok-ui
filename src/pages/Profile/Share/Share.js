import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import styles from './Share.module.scss';

const cx = classNames.bind(styles);

function Share({ items }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>

                    {items.map((item, index) => (
                        <a href='/' key={index} className={cx('body')}>
                            <span className={cx('icon')}>{item.icon}</span>
                            <span className={cx('title')}>{item.title}</span>
                        </a>
                    ))}
            </div>
        </div>
    );
}
Share.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Share;
