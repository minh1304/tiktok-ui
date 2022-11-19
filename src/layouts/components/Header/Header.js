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
import AuthModal from '~/layouts/components/Auth/Modal';
import Login from '~/layouts/components/Auth/partials/Login';
import EmailAndPasswordLoginForm from '../Auth/partials/EmailAndPasswordLoginForm';
import PhoneAndCodeLoginForm from '../Auth/partials/EmailAndPasswordLoginForm';

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
function Header({ wider }) {
    const currentUser = useContext(AuthUserContext);

    //handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.to) {
            case '/logout':
              localStorage.removeItem('user')
              window.location.reload()
              break
            default:
                break
        }


    };
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [children, setChildren] = useState(<Login />);
    const [navigateBack, setNavigateBack] = useState(null);
    const [modalBodyName, setModalBodyName] = useState('login');
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@theanh28',
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
    const handleModalBodyName = (value) => {
        setModalBodyName(value ?? 'login');
    };

    const value = {
        modalBodyName,
        navigateBack,
        handleModalBodyName,
    };
    useEffect(() => {
        switch (modalBodyName) {
            case 'login':
                setChildren(<Login />);
                setNavigateBack(null);
                break;

            case 'login-with-email':
                setChildren(<EmailAndPasswordLoginForm />);
                setNavigateBack('login');
                break;
            default:
                setChildren(<Login />);
                break;
        }
    }, [modalBodyName]);
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
                            <Button outline className={cx('upload')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
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
                            <Button outline className={cx('upload')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                                Upload
                            </Button>
                            <Button
                                primary
                                onClick={() => {
                                    setShowAuthModal(true);
                                }}
                            >
                                Log in
                            </Button>
                        </>
                    )}

                    <ModalBodyNameContext.Provider value={value}>
                        {showAuthModal && (
                            <AuthModal
                                children={children}
                                onClose={() => {
                                    setShowAuthModal(false);
                                    setModalBodyName('');
                                    setNavigateBack(null);
                                }}
                            />
                        )}
                    </ModalBodyNameContext.Provider>

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                alt="Nguyen Van A"
                                // src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/229c49e6a5e7783b16b5e994ff2f6de1~c5_100x100.jpeg?x-expires=1666893600&x-signature=oxWlcnGZ8Hb2sW8%2FOrk33RZA0Y8%3D"
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1667368800&x-signature=7bJNrToy%2Bd%2BZOWj5msDadcrH4H4%3D"
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
