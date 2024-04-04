export default function MainPage() {
    return (
        <>
            {/* 메인 페이지 */}
            {/* 
            <Header />
            <MenuBar />
            <MainBanner />
            <MainNotice />
            <MainLank />
            <MainFooter />
            */}
            <Header />
            <MainBanner />
            <div className="notice_lank_container">
                <MainNotice />
                <MainLank />
            </div>
        </>
    )
}