import { useEffect, useState } from 'react';


export const Admin = ({ props }) => {
    const { STK, account, setAccount, connectWallet, input, setInput, inputTitel, setinputTitel, tokenMint, reward, viewAllPost, postList
        , myNftToken, myNft, joinMember, message, signUp, member, memderCheck, ClassList, classImg, viewUser, userList, getClass,
        Class } = props
    useEffect(() => {
        console.log("최종 ClassList:", ClassList);
    }, [ClassList]);
    useEffect(() => {
        if (myNft) {
            getClass();
        }
    }, [myNft]);
    return (
        <div>
            <div>
                <div>
                    <button>일반 화면 가기</button>
                    <div>
                        <div>- 관리자 - {account}님</div>
                        <div>
                            {myNft ? (
                                <div>
                                    <img src={myNft} alt="등급" style={{ width: '100px', height: '100px' }} />
                                    <div>{Class}</div>
                                </div>
                            ) : (<div>이미지가 없습니다.</div>)}
                        </div>
                        {member ? (
                            <div>멤버입니다</div>) : (<div>멤버가 아닙니다</div>
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={connectWallet}>지갑 연결하기</button>
                    <button onClick={() => joinMember(account)}>멤버 승급하기</button>
                    <button onClick={signUp}>멤버 승인받기</button>
                    <button onClick={viewUser}>가입된 유저 확인</button>
                    <div>{userList}</div>
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
        </div>
    )
}