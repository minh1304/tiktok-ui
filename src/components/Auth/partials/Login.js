import { useContext } from 'react';
import {
    QRCodeIcon,
    UserGroupIcon,
    FacebookIcon,
    GoogleIcon,
    InstagramIcon,
    LineIcon,
    KakaoTalkIcon,
    TwitterIcon,
    AppleIcon,
} from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from '../Modal.module.scss';
import { ModalBodyNameContext } from '~/components/OpenLogin/OpenLogin';

const cx = classNames.bind(styles);

function Login() {
    const value = useContext(ModalBodyNameContext);

    const buttons = [
        {
            icon: <QRCodeIcon width={20} height={20} />,
            text: 'Use QR code',
        },
        {
            href: '/login/phone-or-email',
            icon: <UserGroupIcon width={20} height={20} />,
            text: 'Use phone / email / username',
        },
        {
            icon: <FacebookIcon width={20} height={20} />,
            text: 'Continue with Facebook',
        },
        {
            icon: <GoogleIcon width={20} height={20} />,
            text: 'Continue with Google',
        },
        {
            icon: <LineIcon width={20} height={20} />,
            text: 'Continue with Line',
        },
        {
            icon: <TwitterIcon width={20} height={20} />,
            text: 'Continue with Twitter',
        },
        {
            icon: <KakaoTalkIcon width={20} height={20} />,
            text: 'Continue with KakaoTalk',
        },
        {
            icon: <AppleIcon width={20} height={20} />,
            text: 'Continue with Apple',
        },
        {
            icon: <InstagramIcon width={20} height={20} />,
            text: 'Continue with Instagram',
        },
    ];
    const renderButtons = () => {
        return buttons.map((button, key) => {
            return button.href ? (
                <a
                    href={button.href}
                    key={key}
                    onClick={(event) => {
                        event.preventDefault();
                        value.handleModalBodyName('login-with-email');
                    }}
                >
                    <div className={cx('Box-container')}>
                        <div className={cx('Icon-container')}>{button.icon}</div>
                        {button.text}
                    </div>
                </a>
            ) : (
                <div key={key}>
                    <div className={cx('Box-container')}>
                        <div className={cx('Icon-container')}>{button.icon}</div>
                        {button.text}
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className={cx('login-modal')}>
                <div className={cx('login-container')}>
                    <div className={cx('home-container')}>
                        <div className={cx('title')}>Log in to TikTok</div>
                        {renderButtons()}
                        <div className={cx('signup')}>
                            Don't have ac account?
                            <a
                                className={cx('sign-up-btn')}
                                href="/signup"
                                onClick={(event) => {
                                    event.preventDefault();
                                    value.handleModalBodyName('signup');
                                }}
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
