import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as userService from '~/services/userService';
import { AuthUserContext } from '~/App';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token ? authUser.meta.token: '';
    const [suggestedUser, setSuggestedUser] = useState([]);
    const [seeAll, setSeeAll] = useState(false);
    useEffect(() => {
        if (seeAll) {
            userService
                .getSuggested({ page: 1, perPage: 16, accessToken: accessToken })
                .then((data) => {
                    setSuggestedUser(data);
                })
                .catch((error) => console.log(error));
        } else {
            userService
                .getSuggested({ page: 1, perPage: 5, accessToken: accessToken })
                .then((data) => {
                    
                    setSuggestedUser(data);
                })
                .catch((error) => console.log(error));
        }
    }, [seeAll, accessToken]);
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
