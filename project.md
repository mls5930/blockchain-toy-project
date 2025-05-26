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



**flor** 

1. ERC 20 배포 owner 에게 STK 토큰 100만개 발급
2. 권한 위임 CA와 postWarld CA에게 
3. 1155 배포 url 과  postWarld CA에게 권한위임
4. 권한을 넘겨받은 postWarld 는 토큰 발급권한이 생김
5. 사용자가 이더 충전  1 eth 당 * 10 해서 10개의 STK 발급
6. 사용자가 글쓰기시 1 STK 차감 하는형식
7. 글쓸떄마다 사용자의 글 갯수와 STK를 판단하여 class 지급
8. 글을 작성한 유저는 user[] 에 저장이되며 중복으로 들어갈수 없음 (user 조회는 관리자만)
9. 작성한글은 Post[] 형태로 작성시간 작성자 작성글 이 들어감 (조회는 관리자만)
10. 멤버승인 함수 멤버는 오직 관리자만이 지정할 수 있다.
11. user class 조회 ex) silver gold dia 모든유저가 조회가능
