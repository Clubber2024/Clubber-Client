import "./reviewBox.css";

// const keywordData = [
//     {
//         id: 1,
//         contents: [
//             { text: '😃 "분위기가 좋아요"'},
//             { text: '💵 "회비가 적당해요"'},
//             { text: '🕺🏻 "활동 참여가 자유로워요"'},
//         ]
//     },
//     {
//         id: 2,
//         contents: [
//             { text: '😃 "분위기가 좋아요"'},
//             { text: '💵 "회비가 적당해요"'},
//             { text: '🕺🏻 "활동 참여가 자유로워요"'},
//             { text: '🏆 "대외활동에 좋아요"'},
//             { text: '👍🏻 "운영진이 일을 잘해요"'}
//         ]
//     }
// ];

const KeywordBar = ({ text }) => {
    return (
      <div className="keyword_container">
        {text}
      </div>  
    );
}

export default function ReviewBox({ keywordData }) {
    return (
        <>
            <div className="review_box_container">
                <div className="review_box_header">
                    <p>익명 1</p>
                    <span>2024.04.01</span>
                </div>
                {/* map을 2번 써야될듯 : box_contents, keywordBar */}
                <div className="review_box_contents">
                    <KeywordBar text='😃 "분위기가 좋아요"' />
                    <KeywordBar text='😃 "분위기가 좋아요"' />
                    <KeywordBar text='😃 "분위기가 좋아요"' />
                    <KeywordBar text='😃 "분위기가 좋아요"' />
                    {/* {keywordData.map((item) => (
                        <KeywordBar 
                            // key -> 각 리뷰 식별할 수 있는 변수
                            id={item.id}
                            text={item.contents.text} 
                        />
                    ))} */}
                </div>
            </div>
        </>
    );
}