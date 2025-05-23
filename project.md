리스트 정리 


sol 파일 흐름                                                                  

1. solfile 작성 tuffle 필요 
2. solfile 은 ERC-20 ,1155 
    2.1 ERC-20
        - 토큰 심불 STK 
        - 최초 발행 오너 대략 100만 토큰
        - mint 는 오너만 가능
        - 오너는 모든 토큰 권한을 CA에게 위임 
        - 사용자가 글을 작성시이더(0.5 eth)를 받고 발급 CA는 사용자한테 오너에게 받은 권한으로 트렌스퍼 from  payload 는 오너에게 전달 후   토큰을  넘겨받는 방식 5 STK 
        - 글 삭제시 -2 STK 수정시 -1 STK

    2.2 ERC-1155   
        - 사용자에게 인증 배지 를 지급하기 위함 등급별 해택 
            | 일반 회원            | 진입 조건 없음                    | 1 STK  | 없음          |
            | 우수 회원 (GOOD)     | 글 ≥ 3개 AND 누적 보상 ≥ 10 STK   | 2 STK  | `badgeId = 0` |
            | 최우수 회원 (BEST)   | 글 ≥ 10개 AND 누적 보상 ≥ 30 STK  | 10 STK | `badgeId = 1` |
            | MVP 회원 (EXCELLENT) | 글 ≥ 20개 AND 누적 보상 ≥ 100 STK | 20 STK | `badgeId = 2` |
            
        - 누적발급이 가능하다
        - 발행은 오너만 가능 
        - 사용자의 글 작성 상태를 항상 확인 (react 상태변수)
        - 사용자의 STK 상태를 항상 확인 (react 상태변수)
        - 모두 부합해야만 토큰 발행

3. MultiTokenFactory 로 해당 토큰들을 관리 


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MyERC20.sol";
import "./MyERC721.sol";
import "./MyERC1155.sol";

contract MultiTokenFactory {
    enum TokenType { ERC20, ERC721, ERC1155 }

    struct TokenInfo {
        address tokenAddress;
        TokenType tokenType;
        string name;
    }

    TokenInfo[] public allTokens;

    event TokenCreated(address indexed tokenAddress, TokenType tokenType, string name);

    function createERC20(string memory name, string memory symbol, uint256 initialSupply) public {
        MyERC20 token = new MyERC20(name, symbol, initialSupply);
        allTokens.push(TokenInfo(address(token), TokenType.ERC20, name));
        emit TokenCreated(address(token), TokenType.ERC20, name);
    }

    function createERC721(string memory name, string memory symbol) public {
        MyERC721 token = new MyERC721(name, symbol);
        allTokens.push(TokenInfo(address(token), TokenType.ERC721, name));
        emit TokenCreated(address(token), TokenType.ERC721, name);
    }

    function createERC1155(string memory uri) public {
        MyERC1155 token = new MyERC1155(uri);
        allTokens.push(TokenInfo(address(token), TokenType.ERC1155, uri));
        emit TokenCreated(address(token), TokenType.ERC1155, uri);
    }

    function getAllTokens() public view returns (TokenInfo[] memory) {
        return allTokens;
    }
}