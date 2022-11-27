import { useEffect, useState, createContext, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faGear,
    faCoins,
    faVideoCamera,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import 'tippy.js/dist/tippy.css';
import { InboxIcon, MessageIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';

// import PhoneAndCodeLoginForm from '../Auth/partials/EmailAndPasswordLoginForm';

import { AuthUserContext } from '~/App'; 
 
const cx = classNames.bind(styles);
export const ModalBodyNameContext = createContext();
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];
function Header({ wider, onOpenLogin }) {
    const currentUser = useContext(AuthUserContext);

    //handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case '/logout':
              localStorage.removeItem('user')
              window.location.reload()
              break
            case '/@profile': 
                window.location.href =`/@${currentUser.data.nickname}`
                break
            default:
                break
        }


    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faVideoCamera} />,
            title: 'LIVE Studio',
            to: '/Live',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    
    return (
        <header className={cx('wrapper')}>
            <div className={wider ? cx('ahihi') : cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search wider={wider} />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button onClick={()=> alert('Wait API')} outline className={cx('upload')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                                <button className={cx('action-btn1')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn2')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button onClick={onOpenLogin} outline className={cx('upload')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button
                                primary
                                onClick={onOpenLogin}
                            >
                                Log in
                            </Button>
                        </>
                    )}

                

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                alt={currentUser.data.nickname}
                                src={currentUser.data.avatar}
                            ></Image>
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}
export default Header;
