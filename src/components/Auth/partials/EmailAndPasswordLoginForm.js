import { useContext, useState } from 'react';
import { ModalBodyNameContext } from '~/components/OpenLogin/OpenLogin';
import classNames from 'classnames/bind';
import styles from '../Modal.module.scss';
import Button from '~/components/Button';
import * as authService from '~/services/authService'
const cx = classNames.bind(styles);

function EmailAndPasswordLoginForm() {
    const value = useContext(ModalBodyNameContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

      const loginUser = () => {
        authService
          .login(username, password)
          .then((data) => {
            if (data.meta && data.meta.token) {
              localStorage.setItem('user', JSON.stringify(data))
              window.location.reload()
            } else {
              alert('Username or password is invalid! Please try again')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    // const loginUser = () => {
    //   authService
    //     .login(username,password)
    //     .then((data) => {
    //       console.log(data);
    //     })
    // }


    return (
        <>
            <div className={cx('login-modal')}>
                <div className={cx('login-container')}>
                    <div className={cx('home-container')}>
                        <div className={cx('title')}>Log in</div>
                        <div className={cx('description')}>Email or user name</div>
                        <form>
                            <div className={cx('Div-input-sigup')}>
                                <input
                                    type={'text'}
                                    placeholder={'Email or username'}
                                    name={'email'}
                                    value={username}
                                    className={cx('input-container')}
                                    onChange={(e)=> setUsername(e.target.value)}
                                />
                            </div>
                            <div className={cx('Div-container')}>
                                <input
                                    type={'password'}
                                    placeholder={'Password'}
                                    className={cx('input-container')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button 
                              primary 
                              className={cx('Submit-btn')} 
                              onClick={(e) => {
                                e.preventDefault()
                                loginUser()
                              }}

                            >Log in</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmailAndPasswordLoginForm;
