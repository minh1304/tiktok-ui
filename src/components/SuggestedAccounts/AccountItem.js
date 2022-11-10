import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);
function AccountItem({ data }) {
    const renderPreview = (prop) => {
        return (
            <div tabIndex="-1" {...prop}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };
    return (
        // Lát đổi thành link to như search
        <Link to={`/@${data.nickname}`}>
            <Tippy interactive delay={[800, 500]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <img className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>
                            {data.first_name} {data.last_name}
                        </p>
                    </div>
                </div>
            </Tippy>
        </Link>
    );
}
AccountItem.propTypes = {
data: PropTypes.object.isRequired,
};
export default AccountItem;
