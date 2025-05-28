import { useEffect, useState } from 'react';
// import getContract from './getContract';
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

const Board = () => {

    const [account, setAccount] = useState(""); // 현재 접속한 주소 지갑연결
    const [web3, setWeb3] = useState<Web3>(); // web3 연결 
    const [myNft, setMynft] = useState<{ tokenId: string; image: string }[]>(
        []
    ); //  NFT 조회 
    const [STK, setSTK] = useState(0); // STK 확인(리워드)
    const [Class, setClass] = useState(String); //클레스 확인
    const [Post, setPost] = useState() // 작성 글 확인 
    const [member, setMember] = useState(Boolean); // 멤버 확인 
    const [allPosts, setallposts] = useState([])  // 전체 작성글 목록 (관리자)
    const [userList, setuserList] = useState([]) // 유저 목록 (관리자)

    useEffect(() => {
        if (window.ethereum) {
            const instance = new Web3(window.ethereum);
            setWeb3(instance);
        } else {
            alert('Metamask가 설치되어 있지 않습니다.');
        }
    }, []);

    // 멤버 상태를 확인하고 화면을 변환시킬 useEffect
    useEffect(() => {

    }, [member]);

    //지갑연결 함수
    const connectWallet = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        const selectedAddress = accounts[0];
        setAccount(selectedAddress);
        memderCheck()
        classImg(account)
    };
    // 멤버 확인함수 
    const memderCheck = async () => {
        const memder = await boardSol.methods.isMember()
        setMember(memder)
    }
    // 내 NFT 불러오기 
    const myNftToken = async (address: string) => {
        if (!web3 || !account) return;
        const myNft = await boardSol.methods.getBadgeCounts(account);
        console.log(myNft);

    }
    // 이미지 불러오기 
    const classImg = async (address: string) => {
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
        } else {
            const imageUrl = null;
        }
    };
    const reward = async () => {
        const yourSTK = await boardSol.methods.getrewardTotal().call() as string;
        console.log(yourSTK);

    }

}