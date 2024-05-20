import './hashtag.css';
import { Link } from 'react-router-dom';

const hashtag = [
    { band: '밴드' },
    { game: '게임' },
    { picture: '사진' },
    { programming: '개발' },
    { language: '언어' },
    { sports: '운동' },
    { cooking: '요리' },
    { news: '시사' },
    { dancing: '댄스' },
    { volunteer: '봉사' },
    { religion: '종교' },
];

export default function HashTag() {
    return (
        <>
            {hashtag.map((item, index) => {
                const tagName = Object.keys(item)[0];
                const tagVal = item[tagName];
                return (
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <div className="tag_container">
                            <img
                                src={`/main/hashtag/${tagName}_icon.png`}
                                alt={`${tagName} icon`}
                                width={48}
                                height={45}
                            />
                            <p className="tag_text"># {tagVal}</p>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}
