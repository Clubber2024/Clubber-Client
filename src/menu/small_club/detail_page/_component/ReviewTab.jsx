import ReviewContent from "./ReviewContent";
import ReviewStatics from "./ReviewStatics";
import "./reviewTab.css";

export default function ReviewTab() {
    return (
        <>
            <ReviewStatics />
            <div className="divider"></div>
            <ReviewContent />
        </>
    )
}