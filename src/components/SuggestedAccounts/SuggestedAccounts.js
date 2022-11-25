import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import * as userService from '~/services/userService';
import { AuthUserContext } from '~/App';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label, wider, onOpenLogin }) {
    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token ? authUser.meta.token : '';
    const [suggestedUser, setSuggestedUser] = useState([]);
    const [seeAll, setSeeAll] = useState(false);
    useEffect(() => {
        if (seeAll) {
            userService
                .getSuggested({ page: 1, perPage: 20, accessToken: accessToken })
                .then((data) => {
                    setSuggestedUser(data);
                })
                .catch((error) => console.log(error));
        } else {
            userService
                .getSuggested({ page: 1, perPage: 15, accessToken: accessToken })
                .then((data) => {
                    data.map((acc) => acc.is_followed)
                    //get 5 object first
                    let data2 = data.filter(acc => !acc.is_followed)
                    data2.splice(5)
                    setSuggestedUser(data2);
                })
                .catch((error) => console.log(error));
        }
    }, [seeAll, accessToken]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {
                //if followed then don't view
                suggestedUser.map((account) => 
                    !account.is_followed && 
                        <AccountItem wider={wider} key={account.id} data={account} onOpenLogin={onOpenLogin}/>
                )
            }

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
