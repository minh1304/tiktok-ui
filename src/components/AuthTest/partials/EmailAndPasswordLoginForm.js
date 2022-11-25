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
            {/* <div className="overflow-auto" style={{ flex: '1 1 0%' }}>
        <div className="m-auto w-4/5">
          <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold my-4 mx-auto">Log in</h3>

          <form>
            <div className="text-base font-semibold flex justify-between mb-2">
              <label>Email or username</label>
              <a
                href="#"
                className="font-semibold text-xs hover:underline text-black/60"
                onClick={(event) => {
                  event.preventDefault()
                  value.handleModalBodyName('login-with-phone')
                }}
              >
                Log in with phone
              </a>
            </div>
            <div className="mb-2">
              <input
                className="rounded text-base h-11 w-full border border-solid border-black/10 bg-black/5 caret-primary"
                style={{ paddingInlineStart: '12px', paddingInlineEnd: '12px' }}
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username or email"
              />
            </div>
            <div className="mb-2">
              <input
                className="rounded text-base h-11 w-full border border-solid border-black/10 bg-black/5 caret-primary"
                style={{ paddingInlineStart: '12px', paddingInlineEnd: '12px' }}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <a
              href="#"
              className="font-semibold text-xs hover:underline text-black/60"
              onClick={(event) => {
                event.preventDefault()
                value.handleModalBodyName('reset-password-with-email')
              }}
            >
              Forget password?
            </a>
            <button
              className="mt-8 border-none bg-primary text-white text-base leading-5 font-bold font-primary rounded flex items-center justify-center w-full cursor-pointer py-1.5 px-2"
              style={{
                minWidth: '120px',
                minHeight: '46px',
              }}
              onClick={(e) => {
                e.preventDefault()
                loginUser()
              }}
            >
              Log in
            </button>
          </form>
        </div>
      </div> */}

            <div className={cx('login-modal')}>
                <div className={cx('login-container')}>
                    <div className={cx('home-container')}>
                        <div className={cx('title')}>Log in</div>
                        <div className={cx('description')}>Email or user name</div>
                        <form>
                            <div className={cx('Div-input-container')}>
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
                            <a href='/login/email/forget-password' className={cx('forget-pass')}>
                                Forgot password?
                            </a>
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
