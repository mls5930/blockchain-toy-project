// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC_1155.sol";
import "./ERC_20.sol";

contract board {
    ERC_20 public token_20;
    ERC_1155 public token_1155;
    address public owner;
    address public Admin;
    mapping(address => uint256) public postCount; //작성글 갯수 확인
    mapping(address => uint256) public rewardTotal; // 보상총액
    mapping(address => bool) public isUser; //유저 중복검사
    address[] private users; // user 리스트
    event BadgeIssued(address indexed user, uint256 badgeId, uint256 amount);
    mapping(address => bool) private member;

    struct Post {
        // 작성글 저장 객체
        string title;
        string content;
        address writer;
        uint256 timestamp;
    }

    Post[] private allPosts; // 작성글 전체 저장 배열

    constructor(address token_20address, address token_1155address) {
        owner = msg.sender;
        Admin = msg.sender;
        token_20 = ERC_20(token_20address);
        token_1155 = ERC_1155(token_1155address);
        token_20.approveForCA(address(this));
        token_1155.setApprovalForPostWarld(address(this));
    }

    modifier onlyOwner() {
        //오너
        require(msg.sender == owner, "onlyOwner");
        _;
    }
    modifier onlyMember() {
        //멤버
        require(member[msg.sender], "onlymember");
        _;
    }
    modifier onlyAdmin() {
        //메니저
        require(msg.sender == Admin, "Not admin");
        _;
    }

    // 맴버 승인 함수
    function memberRegistration(
        address _member
    ) public onlyAdmin returns (bool) {
        member[_member] = true;
        return true;
    }

    //  트렌잭션 ,글쓰기 함수
    function CAtransfer(
        address userAddress,
        uint256 value,
        string memory title,
        string memory content
    ) public payable onlyOwner {
        require(msg.value == 1 ether, "give 1 eth");
        require(token_20.balanceOf(owner) >= value, "Not enough STK");
        require(
            token_20.allowance(owner, address(this)) >= value,
            "Your balance is insufficient."
        );
        writePost(title, content);
        payable(owner).transfer(msg.value);
        token_20.transferFrom(owner, userAddress, value * 10);
    }

    // 글쓰기 함수
    function writePost(string memory title, string memory content) private {
        Post memory newPost = Post({
            title: title,
            content: content,
            writer: msg.sender,
            timestamp: block.timestamp
        });
        allPosts.push(newPost);
        postCount[msg.sender] += 1;
        if (!isUser[msg.sender]) {
            users.push(msg.sender);
            isUser[msg.sender] = true;
        }
        checkAndReward(msg.sender);
    }
    // 리워드 지급과 class 체크
    function checkAndReward(address user) internal {
        uint256 count = postCount[user];
        uint256 balance = token_20.balanceOf(user);
        uint256 class = token_1155.getClass(user);
        if (member[user]) {
            // NFT 토큰 발급은 멤버일경우만
            if ((count >= 3 && balance >= 3 && class < 1)) {
                token_1155.mintClass(user, 1, 1, "get silverClass Token");
                emit BadgeIssued(user, 1, 1);
                token_20.transferFrom(owner, user, 2); // 실버 보상
                rewardTotal[user] += 2;
            } else if (count >= 10 && balance >= 30 && balance < 100) {
                token_1155.mintClass(user, 2, 1, "get goldClass Token");
                emit BadgeIssued(user, 2, 1);
                token_20.transferFrom(owner, user, 10); // 골드 보상
                rewardTotal[user] += 10;
            } else if (count >= 20 && balance >= 100) {
                token_1155.mintClass(user, 3, 1, "get diamondClass Token");
                emit BadgeIssued(user, 3, 1);
                token_20.transferFrom(owner, user, 20); // 다이아 보상
                rewardTotal[user] += 20;
            }
        }
        rewardTotal[user] += 1;
        token_20.transferFrom(owner, user, 1); // 멤버 미가입 노말보상
    }
    // 작성 글 갯수 확인
    function getpostCount(address userAddress) public view returns (uint256) {
        return postCount[userAddress];
    }

    // 유저 class 조회
    function viewClass(
        address userAddress
    ) public view returns (string memory) {
        uint256 class = token_1155.getClass(userAddress);
        if (class == 0) return "Normal";
        if (class == 1) return "GOOD";
        if (class == 2) return "BEST";
        if (class == 3) return "EXCELLENT";
        return "Normal";
    }

    // 유저 조회목록(메니저만)
    function getuser() public view onlyAdmin returns (address[] memory) {
        return users;
    }
    // 유저 글작성 목록전체 조회(메니저만)
    function getAllPosts() public view onlyAdmin returns (Post[] memory) {
        return allPosts;
    }

    // 전체 리워드 함수;
    function getrewardTotal(address _address) public view returns (uint256) {
        return rewardTotal[_address];
    }

    // 전체 NFT 토큰 갯수 확인 함수
    function getBadgeCounts(
        address _address
    ) public view returns (uint256[4] memory) {
        return token_1155.getBadgeCounts(_address);
    }
    // 멤버 확인 함수.
    function isMember() public view returns (bool) {
        return member[msg.sender];
    }
}
