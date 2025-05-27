import { useEffect, useState } from 'react';
// import getContract from './getContract';
import Web3 from 'web3';
import axios from 'axios';


declare global {
    interface Window {
        ethereum?: any;
    }
}

const Board = () => {
    const [account, setAccount] = useState(""); // 현재 접속한 주소 
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
}