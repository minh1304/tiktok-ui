import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import Button from '../Button';
import { CloseButtonIcon } from '../Icons';
import Image from '../Image';
import styles from './OpenEditProfile.module.scss';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);
function OpenEditProfile({ onClose, data }) {
    // const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState([]);
    const [is_image, setIs_Image] = useState(false);
    const onSelectFiles = (event) => {
        const selectedFiles = event.target.files[0];
        formdata.append('avatar', selectedFiles);
        const selectedFileArray = Array(selectedFiles);
        const imageArray = selectedFileArray.map((file) => {
            return URL.createObjectURL(file);
        });
        if (setSelectedImage !== null) {
            setIs_Image(true);
            setSelectedImage(imageArray);
        }
    };
    const [firstname, setFirstname] = useState('');
    const [lastname, setLasttname] = useState('');
    const [bio, setBio] = useState('');
    const [entered, setEntered] = useState(false);

    const authUser = useContext(AuthUserContext);
    const accessToken = authUser && authUser.meta.token;


    var myHeaders = new Headers();
    var formdata = new FormData();
    formdata.append('first_name', firstname);
    formdata.append('last_name', lastname);
    formdata.append('bio', bio);

  
    const handleAPI = () => {
        myHeaders.append('Authorization', `Bearer ${accessToken}`);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };
        fetch('https://tiktok.fullstack.edu.vn/api/auth/me?_method=PATCH', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));

    };


    return (
        <div className={cx('Modal-container')}>
            <div className={cx('mask')}></div>
            <div className={cx('content-container')}>
                <div className={cx('header')}>
                    Edit profile
                    <div className={cx('Close-wrapper')} onClick={onClose} style={{ transform: 'scale(1.7)' }}>
                        <CloseButtonIcon width={15} height={15} />
                    </div>
                </div>
                <div className={cx('modal-editProfile')}>
                    <div className={cx('profile-photo')}>
                        <div className={cx('text-photo')}>Profile photo</div>
                        <div className={cx('avatar-content')}>
                            <div className={cx('styledAvatar')}>
                                <span className={cx('span-avatar-container')}>
                                    {!is_image && <Image className={cx('image')} src={data.avatar} />}

                                    {selectedImage &&
                                        is_image &&
                                        selectedImage.map((image, index) => {
                                            return <Image key={index} className={cx('image')} src={image} />;
                                        })}
                                </span>
                            </div>
                        </div>
                        <div className={cx('icon-edit')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faPencil} />
                            <input
                                className={cx('input')}
                                type={'file'}
                                name={'images'}
                                onChange={onSelectFiles}
                            ></input>
                        </div>
                    </div>
                    {/* <div className={cx('div-content-container')}>
                        <div className={cx('text-photo')}>Username</div>
                        <div className={cx('avatar-content')}>
                           
                        </div>
                    </div> */}
                    <div className={cx('div-content-container')}>
                        <div className={cx('text-photo')}>First Name</div>
                        <div className={cx('avatar-content')}>
                            <input
                                className={cx('input-text')}
                                type={'text'}
                                placeholder={data.first_name}
                                value={firstname}
                                onChange={(e) => {
                                    setFirstname(e.target.value);
                                    setEntered(true);
                                    if (e.target.value === '') setEntered(false);
                                }}
                            />
                            <p className={cx('text-decription')}>
                                Your nickname can only be changed once every 7 days.
                            </p>
                        </div>
                    </div>
                    <div className={cx('div-content-container')}>
                        <div className={cx('text-photo')}>Last Name</div>
                        <div className={cx('avatar-content')}>
                            <input
                                className={cx('input-text')}
                                type={'text'}
                                placeholder={data.last_name}
                                value={lastname}
                                onChange={(e) => {
                                    setLasttname(e.target.value);
                                    setEntered(true);
                                    if (e.target.value === '') setEntered(false);
                                }}
                            />
                            <p className={cx('text-decription')}>
                                Your nickname can only be changed once every 7 days.
                            </p>
                        </div>
                    </div>
                    <div className={cx('div-content-container-bio')}>
                        <div className={cx('text-photo')}>Bio</div>
                        <div className={cx('avatar-content')}>
                            <input
                                className={cx('input-text-bio')}
                                type={'text'}
                                placeholder={'Bio'}
                                value={bio}
                                onChange={(e) => {
                                    setBio(e.target.value);
                                    setEntered(true);
                                    if (e.target.value === '') setEntered(false);
                                }}
                            />

                            <p className={cx('text-decription')}>Max 80 characters</p>
                        </div>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <Button onClick={onClose} className={cx('btn-cancel')} round>
                        Cancel
                    </Button>
                    <Button onClick={handleAPI} className={!entered ? cx('btn-save') : cx('btn-save2')} primary>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OpenEditProfile;
