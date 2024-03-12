
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

### [출입문 입출이력]
- 조회할 출입문 이력 선택옵션, 옵션 선택시 그에 맞는 모든 출입문 입출이력이 표시됩니다.
- 관리자별 담당하는 출입문의 입출이력을 조회할 수 있고, 최고 관리자는 모든 입출이력을 조회할 수 있습니다.
- 엑셀 아이콘을 클릭하여 출입 기록을 csv파일로 다운받을 수 있습니다.
### [방문자 예약승인]
- 관리 건물 도어의 예약 방문자들의 승인을 할 수 있습니다.
- 날짜, 시간을 선택하여 필터링 할 수 있습니다.
- 엑셀 아이콘을 클릭하여 출입 기록을 csv파일로 다운받을 수 있습니다.
### [비상도어 개방]
- 전체 개방 : 최고관리자는 모든 시설의 도어를 개방, 일반관리자는 담당도어들을 전체 개방
- 관리시설 선택 : 최고관리자는 모든 시설 선택 가능, 일반관리자는 담당도어의 시설만 선택가능
- 개방여부 체크시 해당 도어의 문이 열리게 됩니다.

| 출입문 입출이력 | 방문자 예약승인 | 비상도어 개방 |
|----------|----------|-용
    


