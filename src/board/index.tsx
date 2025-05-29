import { useEffect, useState } from 'react';
import { Admin } from '../pages/admin';
import { User } from '../pages/user'
import Web3 from 'web3';
import axios from 'axios';
import {
    CONTRACT_ADDRESS,
    boardSol
} from "./web3Connection"
import { log } from 'node:console';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export const Board = () => {
    type PostType = {
        title: string;
        content: string;
        writer: string;
        timestamp: number; // ✅ 소문자 number
    };
    // Zustand 공부하기
    const [account, setAccount] = useState(""); // 현재 접속한 주소 지갑연결
    const [web3, setWeb3] = useState<Web3>(); // web3 연결 
    const [myNft, setMynft] = useState<{ tokenId: string; image: string }[]>(
        []
    ); //  NFT 조회 
    const [STK, setSTK] = useState(0); // STK 확인(리워드)
    const [Class, setClass] = useState(String); //클레스 확인
    const [ClassList, setClassList] = useState<Number[]>();
    const [member, setMember] = useState(false); // 멤버 확인 
    const [postList, setPostList] = useState<PostType[]>([]); // 전체 작성글 목록 (관리자)
    const [userList, setuserList] = useState([]) // 유저 목록 (관리자)
    const [message, setMessage] = useState<{ address: string }[]>([]); // 멤버 요청 목록
    const [inputTitel, setinputTitel] = useState("")// 타이틀
    const [input, setInput] = useState("") // 본문 
    const [postCount, setPostCount] = useState(Number); //작성글 카운트 

    useEffect(() => {
        if (window.ethereum) {
            const instance = new Web3(window.ethereum);
            setWeb3(instance);
        } else {
            alert('Metamask가 설치되어 있지 않습니다.');
        }
    }, []);
    useEffect(() => {
        postNumber()
    }, [account]);

    // 멤버 상태를 확인하고 화면을 변환시킬 useEffect


    //지갑연결 함수
    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const selectedAddress = accounts[0];
            setAccount(selectedAddress);
            memderCheck()
            classImg(selectedAddress)
        } catch (error) {
            console.log(error);

        }
    };
    // 멤버 확인함수 
    const memderCheck = async () => {
        const memder = await boardSol.methods.isMember().call({ from: account }) as boolean;
        setMember(memder)

    }
    // 내 전체 NFT 불러오기 
    const myNftToken = async () => {
        if (!web3 || !account) return;
        try {
            const myNft = await boardSol.methods.getBadgeCounts(account).call({ from: account }) as Array<number>;
            console.log(myNft);
            setClassList(myNft);
            console.log(ClassList);

        } catch (error) {
            console.log(error);
        }
    }
    // 이미지 불러오기 
    const classImg = async (address: string) => {
        try {
            if (!web3 || !account) return;
            const yourClass = await boardSol.methods.viewClass(address).call() as string;
            let classId: number;

            if (yourClass === "Normal") {
                classId = -1;
            } else if (yourClass === "GOOD") {
                classId = 0;
            } else if (yourClass === "BEST") {
                classId = 1;
            } else if (yourClass === "EXCELLENT") {
                classId = 2;
            } else {
                classId = -1;
            }

            if (classId !== -1) {
                const metadataUrl = `https://ipfs.io/ipfs/bafybeigpwepumxlnre32hyc6ys7esbgij55wxqtd5edfmsj7ux3nypmdfq/${classId}.json`;
                const response = await axios(metadataUrl);
                const metadata = await response.data;
                const imageUrl = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                console.log("등급:", yourClass);
                console.log("이미지 주소:", imageUrl);
                setMynft(imageUrl);
            } else {
                const imageUrl = null;
            }
        } catch (error) {
            console.log(error);

        }
    };
    // STK 토큰 확인
    const reward = async () => {
        try {
            console.log(1);
            const yourSTK = await boardSol.methods.getrewardTotal(account).call({ from: account }) as number;
            setSTK(yourSTK)
            console.log(yourSTK);
        } catch (error) {
            console.log(error)
        }

    }
    // 작성한 글 갯수 count 
    const postNumber = async () => {
        try {
            const post = await boardSol.methods.getpostCount().call({ from: account }) as number;
            setPostCount(post)
        } catch (error) {
            console.log(error);
        }
    }

    const getClass = async () => {
        try {
            const yourClass = await boardSol.methods.viewClass(account).call({ from: account }) as string;
            console.log(yourClass);

            setClass(yourClass)
        } catch (error) {
            console.log(error);

        }
    }

    // class 기반 token 발급과 NFT 발급
    const tokenMint = async () => {
        if (!web3 || !account) return alert("지갑을연결해주세요");

        try {
            const value = web3.utils.toWei("0.5", "ether"); // 0.5 ETH 전송

            await boardSol.methods
                .CAtransfer(5, inputTitel, input) // STK 5개 요청, 제목+본문 전달
                .send({
                    from: account,
                    value: value, // 0.5 ETH
                });

            alert("리워드 지급");
        } catch (error) {
            console.error(error);
        }
    }
    // 멤버 승인요청 버튼 
    const joinMember = async (account: string) => {
        setMessage((prev) => [...prev, { address: account }]);
        console.log(1);

        alert("승급메시지가 전송되었습니다.")
    };
    // 맴버 가입 버튼 (관리자만 실행가능)
    const signUp = async () => {
        try {
            const memder = message.map((msg) => msg.address);
            console.log("가입 시도할 주소 목록:", memder);

            for (const addr of memder) {
                const isAlreadyMember = await boardSol.methods.isMember(addr).call({ from: account });
                if (isAlreadyMember) {
                    console.log(`이미 멤버입니다: ${addr}`);
                    continue; // 이미 멤버면 등록 안 함
                }

                await boardSol.methods.memberRegistration(addr).send({ from: account });
            }
            memderCheck();
        } catch (error) {
            console.error("멤버 등록 중 오류:", error);
        }
    };

    // 전체 글 조회함수 수정함
    const viewAllPost = async () => {
        try {
            const AllPost = await boardSol.methods.getAllPosts().call() as PostType[];
            setPostList(AllPost)
            console.log(postList);
        } catch (error) {
            console.log(error);

        }
    }
    // 유저 목록 조회 (관리자만)
    const viewUser = async () => {
        try {
            const userList = await boardSol.methods.getuser().call({ from: account }) as Array<string>;
            setuserList(userList);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Admin props={{
                account,
                setAccount,
                connectWallet,
                input,
                setInput,
                inputTitel,
                setinputTitel,
                tokenMint,
                reward,
                STK,
                viewAllPost,
                postList,
                myNftToken,
                myNft,
                joinMember,
                message,
                signUp,
                member,
                memderCheck,
                ClassList,
                classImg,
                viewUser,
                userList,
                getClass,
                Class
            }}></Admin>
            <User props={{
                account,
                setAccount,
                connectWallet,
                input,
                setInput,
                inputTitel,
                setinputTitel,
                tokenMint,
                reward,
                STK,
                viewAllPost,
                postList,
                myNftToken,
                myNft,
                joinMember,
                message,
                signUp,
                member,
                memderCheck,
                ClassList,
                classImg,
                getClass,
                Class,
                postNumber,
                postCount
            }}></User>
        </div>
    )

}