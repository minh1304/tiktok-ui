import { useContext, useState } from 'react';
import { ModalBodyNameContext } from '~/components/OpenLogin/OpenLogin';
import classNames from 'classnames/bind';
import styles from '../Modal.module.scss';
import Button from '~/components/Button';
import * as authService from '~/services/authService';
const cx = classNames.bind(styles);

function Signup({ onClose }) {
    const value = useContext(ModalBodyNameContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //   const loginUser = () => {
    //     authService
    //       .login(username, password)
    //       .then((data) => {
    //         if (data.meta && data.meta.token) {
    //           localStorage.setItem('user', JSON.stringify(data))
    //           window.location.reload()
    //         } else {
    //           alert('Username or password is invalid! Please try again')
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }

    // const loginUser = () => {
    //   authService
    //     .login(username,password)
    //     .then((data) => {
    //       console.log(data);
    //     })
    // }
    // var raw = JSON.stringify({
    //     type: 'email',
    //     email: username,
    //     password: password,
    // });

    // console.log(raw);
    const [active, setActive] = useState(false);

    const registerUser = () => {
        // authService
        //     .register({ type: 'email', username: username, password: password })
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            type: 'email',
            email: username,
            password: password,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://tiktok.fullstack.edu.vn/api/auth/register', requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert('Đăn ký thành công ');
                onClose();
            })
            .catch((error) => console.log('error', error));
    };

    return (
        <>
            <div className={cx('login-modal')}>
                <div className={cx('login-container')}>
                    <div className={cx('home-container')}>
                        <div className={cx('title')}>Sign up for TikTok</div>
                        <div className={cx('description')}>Email</div>
                        <form>
                            <div className={cx('Div-input-container')}>
                                <input
                                    type={'text'}
                                    placeholder={'Email or username'}
                                    name={'email'}
                                    className={cx('input-signup')}
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setActive(true);
                                        if (e.target.value === '') {
                                            setActive(false);
                                        }
                                    }}
                                />
                            </div>
                            <div className={cx('Div-container')}>
                                <input
                                    type={'password'}
                                    placeholder={'Password'}
                                    className={cx('input-container')}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setActive(true);
                                        if (e.target.value === '') {
                                            setActive(false);
                                        }
                                    }}
                                />
                            </div>
                            <Button
                                primary={active}
                                className={!active ? cx('sigup-btn-none') : cx('Signup-btn')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // loginUser()
                                    registerUser();
                                }}
                            >
                                Sign up
                            </Button>
                        </form>
                    </div>
                </div>
                <div className={cx('login')}>
                    Already have an account?
                    <a
                        className={cx('login-btn')}
                        href="/login"
                        onClick={(event) => {
                            event.preventDefault();
                            value.handleModalBodyName('login');
                        }}
                    >
                        Login
                    </a>
                </div>
            </div>
        </>
    );
}

export default Signup;
