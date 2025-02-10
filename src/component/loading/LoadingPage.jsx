import './loadingPage.css';

export default function LoadingPage() {
    return (
        <div className="loading_wrapper">
            <img className="loading_spinner" src="/loading.png" alt="loading" />
            <p className="loading_text">Loading...</p>
        </div>
    )
}