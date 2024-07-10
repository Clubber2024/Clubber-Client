import './reviewBox.css';

const KeywordBar = ({ text }) => {
    if (text === 'CULTURE') {
        text = '😃 "분위기가 좋아요"';
    } else if (text === 'FEE') {
        text = '💵 "회비가 적당해요"';
    } else if (text === 'ACTIVITY') {
        text = '🕺🏻 "활동 참여가 자유로워요"';
    } else if (text === 'CAREER') {
        text = '🏆 "대외활동에 좋아요"';
    } else if (text === 'MANAGE') {
        text = '👍🏻 "운영진이 일을 잘해요"';
    }
    return <div className="keyword_container">{text}</div>;
};

export default KeywordBar;

