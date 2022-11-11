import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as userService from '~/services/userService';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label, data = [] }) {
    const [suggestedUser, setSuggestedUser] = useState([]);
    const [seeAll, setSeeAll] = useState(false);
    useEffect(() => {
        if (seeAll) {
            userService
                .getSuggested({ page: 1, perPage: 16 })
                .then((data) => {
                    setSuggestedUser(data);
                })
                .catch((error) => console.log(error));
        } else {
            userService
                .getSuggested({ page: 1, perPage: 5 })
                .then((data) => {
                    setSuggestedUser(data);
                })
                .catch((error) => console.log(error));
        }
    }, [seeAll]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {suggestedUser.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {!seeAll && (
                <p onClick={() => setSeeAll(true)} className={cx('more-btn')}>
                    See all
                </p>
            )}
            {seeAll && (
                <p onClick={() => setSeeAll(false)} className={cx('more-btn')}>
                    See less
                </p>
            )}
        </div>
    );
}
SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};
export default SuggestedAccounts;
