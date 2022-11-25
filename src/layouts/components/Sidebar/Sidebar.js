import { useContext, useState, useRef} from 'react';
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

function Sidebar({wider, onOpenLogin }) {
    const authUser = useContext(AuthUserContext);
    return (
        <div className={wider? cx('wrapper-profile') : cx('wrapper')}>
            <div className={ wider? cx('body-profile') : cx('body')}>
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
                    <div className={cx('frame-container')} style={ wider? {width:'232px'}: { width: '340px' }}>
                        <p className={cx('login-hint')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button
                            outline
                            className={wider? cx('login-btn-wider'): cx('login-btn')}
                            onClick={onOpenLogin}
                        >
                            Log in
                        </Button>
                    </div>
                )}
                {/* <OpenLogin  /> */}
                {/* Suggested  */}
                <SuggestedAccounts wider={wider} label="Suggested accounts" />
                {/* Follow */}
                {authUser &&
                    <FollowedAccounts label="Following accounts" />}
                <Discover wider={wider} label="Discover" />
            </div>
        </div>
    );
}

export default Sidebar;
