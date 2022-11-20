import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import FollowedAccounts from '~/components/FollowedAccounts';
import Discover from '~/components/Discover';
import { AuthUserContext } from '~/App';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Sidebar() {
    const authUser = useContext(AuthUserContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <Menu>
                    <MenuItem
                        title="For You"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveActiveIcon />}
                    />
                </Menu>
                {!authUser && (
                    <div className={cx('frame-container')} style={{ width: '340px' }}>
                        <p className="login-hint">Log in to follow creators, like videos, and view comments.</p>
                        <Button
                            outline
                            className={cx('login-btn')}
                            onClick={() => {
                                alert('Please login!');
                            }}
                        >
                            Log in
                        </Button>
                    </div>
                )}
                {/* <OpenLogin  /> */}

                {/* Suggested  */}
                <SuggestedAccounts label="Suggested accounts" />
                {/* Follow */}
                {authUser &&
                    <FollowedAccounts label="Following accounts" />}
                <Discover label="Discover" />
            </div>
        </div>
    );
}

export default Sidebar;
