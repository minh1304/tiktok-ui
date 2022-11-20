import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FollowedAccounts.module.scss';
import * as userService from '~/services/userService';
import AccountItem from './AccountItem';
import AccountPreview from './AccountPreview';
import { AuthUserContext } from '~/App';
const cx = classNames.bind(styles);
const INIT_PAGE = 1;
const PER_PAGE = 5;
function FollowedAccounts({ label }) {
    const [followedUser, setFollowedUser] = useState([]);
    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token ? authUser.meta.token : ' ';
    const [perPage, setPerPage] = useState(1);

    const [seeAll, setSeeAll] = useState(false);
    useEffect(() => {
        if (accessToken) {
            if (!seeAll) {
                userService
                    .getFollowed({ page: perPage, accessToken: accessToken })
                    .then((data) => {
                        if (Array.isArray(data)) {
                            if (perPage === INIT_PAGE) {
                                setFollowedUser(data);
                            } else {
                                setFollowedUser((prev) => [...prev, ...data]);
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setFollowedUser([]);
        }
    }, [accessToken, perPage, seeAll]);

    function moreUser() {
        //stop call API (get 20 user)
        if (followedUser.length === 15 || followedUser.length > 15) {
            setPerPage(INIT_PAGE);
            setSeeAll(true);
        } else {
            console.log(followedUser.length);
            setPerPage((prevPage) => prevPage + 1);
        }
    }
    function lessUser() {
        setFollowedUser([]);
    }
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {followedUser.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}
            {seeAll && (
                <p
                    onClick={() => {
                        setSeeAll(false);
                        lessUser();
                    }}
                    className={cx('more-btn')}
                >
                    See less
                </p>
            )}
            {!seeAll && (
                <p onClick={moreUser} className={cx('more-btn')}>
                    See more
                </p>
            )}
        </div>
    );
}

export default FollowedAccounts;
