import ReviewContent from "./ReviewContent";
import ReviewStatics from "./ReviewStatics";
import "./reviewTab.css";

export default function ReviewTab() {
    return (
        <div className="review_body">
            <ReviewStatics />
            <div className="divider"></div>
            <ReviewContent />
        </div>
    )
}