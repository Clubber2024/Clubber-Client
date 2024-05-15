import './tagScroll.css';
import HashTag from './hashtag/HashTag';

export default function TagScroll() {
    return (
        <div className="wrapper">
            <div className="tags_wrapper">
                <HashTag />
            </div>
        </div>
    );
}
