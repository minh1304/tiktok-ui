import classNames from 'classnames/bind';
import styles from './OpenLogin.module.scss';
import { useState, useContext, createContext, useEffect } from 'react';
import Login from '~/components/AuthTest/partials/Login';
import AuthModal from '~/components/AuthTest/Modal';
import EmailAndPasswordLoginForm from '~/components/AuthTest/partials/EmailAndPasswordLoginForm';
const cx = classNames.bind(styles);
export const ModalBodyNameContext = createContext();

function OpenLogin({onClose}) {
    const [children, setChildren] = useState(<Login />);
    const [navigateBack, setNavigateBack] = useState(null);
    const [modalBodyName, setModalBodyName] = useState('login');
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
        <div>
            <ModalBodyNameContext.Provider value={value}>
                    <AuthModal
                        children={children}
                        onClose={() => {
                            onClose();
                            console.log("ahihi");
                            setModalBodyName('');
                            setNavigateBack(null);
                        }}
                    />
            </ModalBodyNameContext.Provider>
        </div>
    );
}

export default OpenLogin;
