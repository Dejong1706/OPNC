
# 실시간 채팅 서비스 웹 

![README logo](https://user-images.githubusercontent.com/32566767/201516950-1ba2ce35-2be3-4840-bc2f-ff436d4a3602.png)

- 배포 URL : X

<br>

## 프로젝트 소개

- 해당 프로젝트는 한남대학교 컴퓨터공학과 연구팀이 회사의 외주를 받아 제작하게 된 프로젝트입니다.
- 관리저용 웹 서비스, 사용자용 앱 서비스, 백엔드, 비콘을 이용한 출입시스템을 제작하였습니다.

<br>

## 팀원 구성

<div align="center">

| **박병근** | **최형순** | **김민성** | **최재훈** | **손정헌** |
| :------: |  :------: |  :------: |  :------: |  :------: |
| [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/dc9fa281-1359-4c2c-866b-f426b258ee0a" height=150 width=150> <br/> @Dejong1706](https://github.com/Dejong1706) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/af7226a4-6147-4e99-a617-63acbf05708b" height=150 width=150> <br/> @HS980924](https://github.com/HS980924) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/65b14814-ed4a-48f2-8054-8e48e8120b7e" height=150 width=150> <br/> @MinsungKimDev](https://github.com/MinsungKimDev) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/dd69b0cd-ad84-4eff-abfe-22367dd51daa" height=150 width=150> <br/> @ash-hun](https://github.com/ash-hun) | [<img src="https://github.com/Dejong1706/MyBlog/assets/75114974/c838c364-86da-4fae-a1e4-0f5c6727b2cc" height=150 width=150> <br/> @Bluewak](https://github.com/Bluewak) |

</div>

<br>

## 1. 개발 환경

- Front : NextJs, Tailwindcss, typescript, jwt, socket.io, dayjs, react-calendar
- Back-end : express.js, typescript, bcrypt, jwt
- 버전 및 이슈관리 : Github
- 협업 툴 : Discord
 
<br>

## 2. 역할 분담

### 🍊박병근(Front)

- **UI**
    - 페이지 : 관리자용 웹(출입문 현황, 출입문 관리설정, 출입문 입출이력, 출입자 관리, 출입 관리자, 경보 이력, 문자발생 이력) 페이지 

### 👻최형순(Back)

- **기능**
    - 서버 API 제작
### ✈️김민성(Hardware)

- **기능**
    - 비콘을 이용한 출입시스템 제작
### 🍀최재훈(App)

- **기능**
    - 사용자용 App제작 및, UI/UX 디자인
### 🐈손정헌(Hardware)

- **기능**
    - 비콘을 이용한 출입시스템 제작
<br>

## 3. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2022-08 ~ 2022-10

<br>

### 작업 관리

- Git을 사용하여 코드관리를 진행하였습니다.
- 주 3~4회씩 연구실에서 회의를 통해 현 상황을 공유하며 개발 진행을 함께 하였고, 3주마다 회사에 진행 상황을 보고하며 새로운 요청사항등을 수렴하고 진행하였습니다.

<br>

## 4. 페이지별 기능

### [로그인]
- 관리자 계정으로 로그인을 시도하는 페이지입니다.
- ID,PW의 유효성 검사가 존재합니다.

| 로그인화면 |
|----------|
|![스크린샷(1)](https://github.com/Dejong1706/MyBlog/assets/75114974/589098ed-7d39-4b16-9fc8-3a8c10669044)|

<br>

### [출입문 현황]
- 상단배너
    - 현재 날짜, 요일, 시각을 알 수 있습니다.
    - 로그아웃 기능이 존재합니다.
- 등록된 모든 건물, 출입문, 비콘센서의 감시현황을 보여줍니다.
- 지정된 시간마다 데이터가 로드되어 현황이 업데이트 됩니다.    

| 출입문 현황 |
|----------|
|![스크린샷(2)](https://github.com/Dejong1706/MyBlog/assets/75114974/3d4ebb92-be92-4fa9-9ca1-56a4cc882629)|

### [출입문 관리설정]
- 현재 관리되고 있는 건물 및 출입문의 현황을 보여줍니다.
- 새로운 출입문 등록이 가능합니다.
- 모달창에서는는 관리자 이름, 건물명, 건물 ID, 도어명, 도어 ID, 감시여부, 개방 날짜 선택을 입력받습니다.

| 출입문 관리설정 | 관리설정 모달 |
|----------|----------|
|![스크린샷(3)](https://github.com/Dejong1706/MyBlog/assets/75114974/8b799430-806e-4d0d-b51a-6681eb5309e1)|![스크린샷(4)](https://github.com/Dejong1706/MyBlog/assets/75114974/6137b2ef-f900-4735-8ef2-031175633605)|

<br>

### [로그아웃]
- 친구목록 페이지 좌측하단에 나기기 버튼을 클릭하면 로그아웃 됩니다.
- 로그아웃시 로컬 저장소의 토큰 값과 사용자 정보를 삭제하고 초기화면으로 이동합니다.

<br>

### [친구 목록]
- 상단 배너
    - 검색 : 이름, 이메일이 일치하는 경우 해당 사용자를 보여줍니다.
    - 친구 추가 : 사용자 고유 ID와 이메일을 통해서 친구 추가를 할 수 있습니다.
- 좌측 탭 메뉴 : 친구 목록, 채팅방 페이지로 이동합니다, 로그아웃
- 친구 추가가 되어있는 친구들의 목록이 표시됩니다.
- 친구 클릭시 상세 정보가 담겨져 있는 모달이 표시됩니다.
- 추천 친구를 클릭하여 나와 친구 추가가 되어있지 않은 유저들의 목록이 표시됩니다.

| 친구 목록 |
|----------|
|![친구페이지](https://github.com/Dejong1706/MyBlog/assets/75114974/2f4229a7-bd37-4616-aaef-8f906fb3e9a6)|
|![친구초대](https://github.com/Dejong1706/MyBlog/assets/75114974/59b8e201-5604-4ea6-b871-14e5695c5d7b)|

<br>

### [채팅방 목록]
- 상단 배너
    - 검색 : 채팅방 제목 혹은 채팅방 인원에 이름이 일치하는 경우 해당 채팅방을 보여줍니다.
    - 채팅방 생성 : 원하는 수 만큼의 친구를 선택하여 초대할 수 있습니다.(한 명 클릭시 해당 채팅방의 제목은 상대방 이름이 되고 두 명 이상 초대시 채팅방 이름을 정할 수 있습니다.)
- 자신이 초대되어있는 채팅방들을 확인 할 수 있습니다.
- 우측 버튼을 클릭하여 채팅방 나가기 버튼을 확인 후 클릭시 해당 채팅방을 나가게 됩니다.
- 읽지 않은 메시지는 누적되어 가장 마지막 메시지가 채팅방 목록에 보여지게 됩니다, 또한 읽지 않은 메시지 수 만큼의 숫자를 확인 할 수 있습니다.
  
### [채팅방]
- 실시간으로 채팅방 인원들과 메시지를 송수신 할 수 있습니다.
- 하루가 지날 경우 날짜 표시선이 나타납니다.
- 채팅 읽음, 읽지 않음 표시가 처리되었습니다.
- 채팅방을 선택하지 않아있으면 채팅방을 선택해 달라는 컴포넌트가 보이게 됩니다.

| 채팅방 목록 | 채팅방 |
|----------|----------|
|![유저1](https://github.com/Dejong1706/MyBlog/assets/75114974/03ab3804-3902-42b2-873e-826c9ce7bfc9)|![유저2](https://github.com/Dejong1706/MyBlog/assets/75114974/f7b67a2b-0bfe-48eb-b9ae-67ea3a1ef8fb)|

### [반응형]
- 크게 스마트폰, 태블릿, 데스크탑의 사이즈로 구분하여 반응형 디자인으로 표시하였습니다.
- 너무 작은 스마트폰에서는 레이아웃이 꺠져 보일 수 있습니다.

| 메인 | 채팅방목록 | 채팅방방 |
|----------|----------|----------|
|![모바일-메인](https://github.com/Dejong1706/MyBlog/assets/75114974/061f3d31-b0f2-403d-8d1d-6f565cf68e73)|![모바일-채팅방](https://github.com/Dejong1706/MyBlog/assets/75114974/6f732cf7-3c3a-4873-9846-697b9716a4f0)|![모바일-채팅방2](https://github.com/Dejong1706/MyBlog/assets/75114974/a015bc39-ccd2-4783-bb2c-973f8b876914)|

<br>

## 5. 개선 목표

- API 모듈화 : API를 불러오는 코드의 반복이 많아 모듈화
- 상태끌어올리기를 통한 props 전달을 redux를 사용하여 상태관리
    


