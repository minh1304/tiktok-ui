import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
const cx = classNames.bind(styles);
function SuggestedAccounts({ label }) {
    const [account, setAccount] = useState([]);
    const [seeAll, setSeeAll] = useState(false);

    useEffect(() => {
        if (seeAll) {
            fetch('https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&per_page=16')
                .then((res) => res.json())
                .then((res) => setAccount(res.data));
        } else {
            fetch('https://tiktok.fullstack.edu.vn/api/users/suggested?page=1&per_page=5')
                .then((res) => res.json())
                .then((res) => setAccount(res.data));
        }
    }, [seeAll]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {account.map((result) => (
                <AccountItem key={result.id} data={result} />
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
};
export default SuggestedAccounts;
