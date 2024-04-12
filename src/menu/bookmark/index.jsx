import React from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import BookMark from './component/bookmark';

function BookMarkPage() {
    return (
        <>
            <div>
                <Header />
            </div>
            <BookMark />

            <div>
                <Footer />
            </div>
        </>
    );
}
export default BookMarkPage;
