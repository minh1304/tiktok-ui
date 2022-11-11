import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
const cx = classNames.bind(styles);
function Discover({ label }) {
    //
    const data = [
        {   
            icon: <FontAwesomeIcon icon={faHashtag} />,
            title: 'suthatla',
        },
        {
            icon: <FontAwesomeIcon icon={faHashtag} />,
            title: 'mackedoi',
        },
        {
            icon: <FontAwesomeIcon icon={faHashtag} />,
            title: 'sansangthaydoi',
        },
        {
            icon: <FontAwesomeIcon icon={faMusic} />,
            title: 'Yêu Đơn Phương Là Gì(MEE REMIX)',
        },
        {
            icon: <FontAwesomeIcon icon={faMusic} />,
            title: 'Về Nghe Mẹ Ru - NSND Bach Tuyet',
        },
        {
            icon: <FontAwesomeIcon icon={faMusic} />,
            title: 'Thiên Thần Tình Yêu - RICSTAR',
        },
        {
            icon: <FontAwesomeIcon icon={faHashtag} />,
            title: '7749hieuung',
        },
        {
            icon: <FontAwesomeIcon icon={faHashtag} />,
            title: 'genzlife',
        },
        {
            icon: <FontAwesomeIcon icon={faMusic} />,
            title: 'Tình Đã Đầy Một Tim - Huyền Tâm Môn',
        },
        {
            icon: <FontAwesomeIcon icon={faMusic} />,
            title: 'Thằng Hầu (Thái Hoàng Remix)',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className = {cx('discover')}>
                {data.map((value, index) => (
                    <div key={index}>
                        <button className={cx('btn')}>
                            <div className={cx('icon')}>
                                {value.icon}
                            </div>  
                            <div className={cx('content')}>
                                {value.title}
                            </div> 
                        </button>
                    </div>
                ))}
           </div>
        </div>
    );
}
Discover.propTypes = {
    label: PropTypes.string.isRequired,
};
export default Discover;