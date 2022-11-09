// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);
function AccountItem() {
    const renderPreview = (prop) => {
        return (
            <div tabIndex='-1' {...prop}>
                <PopperWrapper>
                    <AccountPreview/>
                </PopperWrapper>

            </div>
        )


    }
    return (
        <div>
            <Tippy interactive delay={[800, 500]} offset={[-20,0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/f4376eb4a748eb7e2eb7d961a0c2e5d2.jpeg?x-expires=1668139200&x-signature=gIjnISS12dezXsWJmq0ku95dcrE%3D"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>yeah1.trending</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Yeah1 Trending</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}
// AccountItem.propTypes = {};
export default AccountItem;
