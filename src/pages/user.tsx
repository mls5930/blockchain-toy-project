import { useEffect, useState } from 'react';


export const User = ({ props }) => {
    const badgeNames = ["Normal", 'GOOD', 'BEST', 'EXCELLENT'];

    const { STK, account, setAccount, connectWallet, input, setInput, inputTitel, setinputTitel, tokenMint, reward, viewAllPost, postList
        , myNftToken, myNft, joinMember, message, signUp, member, memderCheck, ClassList, classImg, postNumber,
        postCount } = props


    return (
        <div>
            <div>
                <div>
                    <button>관리자 화면 가기</button>
                    <div>어서오세요{account}님!</div>
                    <div>
                        {myNft ? (
                            <div>
                                <img src={myNft} alt="등급" style={{ width: '100px', height: '100px' }} />
                            </div>
                        ) : (<div>이미지가 없습니다.</div>)}
                    </div>
                    {member ? (
                        <div>
                            <div>멤버입니다</div>
                            <div>내가 작성한 글 갯수 {postCount}</div>
                        </div>
                    ) : (<div>멤버가 아닙니다</div>
                    )}
                </div>
            </div>
            <div>
                <button onClick={connectWallet}>지갑 연결하기</button>
                <button onClick={() => joinMember(account)}>멤버 승급하기</button>
            </div>
            <div>
                <div>
                    <button onClick={myNftToken}>내가 가진 뱃지갯수</button>
                    <div>
                        {ClassList?.map((count, index) => (
                            <div key={index - 1}>
                                {badgeNames[index]} 뱃지: {count.toString()} 개
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={reward}>내가 가진 STK</button>
                <div>{STK}</div>
            </div>
            <div>
                <div>
                    <div>글을 입력해주세용</div>
                    <p>작성시 0.5 eth가 소요됩니다.</p>
                </div>
                <input
                    type="text"
                    placeholder="타이틀을 입력해주세용"
                    value={inputTitel}
                    onChange={(e) => setinputTitel(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="본문 입력해주세용"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={tokenMint}>작성완료</button>
            </div>

            <div>
                <div>유저 작성글 List</div>
                {postList.map((post, index) => (
                    <div key={index} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '0.5rem' }}>
                        <div><strong>제목:</strong> {post.title}</div>
                        <div><strong>주소:</strong> {post.writer}</div>
                        <div><strong>내용:</strong> {post.content}</div>
                        <div><strong>작성일:</strong> {new Date(Number(post.timestamp) * 1000).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}














// 1. useReducer(reducer, getInit()) 실행
//   ↳ 초기 상태: 로컬스토리지 있으면 그 값, 없으면 init 객체
//   ↳ 반환값: [state, dispatch]

// 2. <AppContext.Provider value={[state, dispatch]}>
//   ↳ 하위 컴포넌트에서 이걸 useContext(AppContext)로 받아서 사용

// 3. const [state, dispatch] = useContext(AppContext)
//   ↳ 전역 상태(state) 읽고, dispatch로 액션 보냄