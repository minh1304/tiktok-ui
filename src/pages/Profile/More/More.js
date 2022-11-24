import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import styles from './More.module.scss';

const cx = classNames.bind(styles);

function More({ items }) {
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
More.propTypes = {
    items: PropTypes.array.isRequired,
};

export default More;
