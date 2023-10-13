# wanted-pre-boarding-backend 선발과제_박준익

## 목차
[1. 요구사항 분석](#요구사항-분석)<br/>
[2. 프로젝트 상세설명](#프로젝트-상세-설명)<br/>
[3. 프로젝트 설치&실행방법](#프로젝트-설치--실행-방법)<br/>

## 요구사항 분석

### 서비스 개요
- 기업의 채용을 위한 서비스
- 회사는 채용공고를 생성하고, 사용자가 지원할 수 있음

### 기능 분석

1. 채용공고 등록
    - 생성한 회사의 id와 함께 채용공고를 등록함
2. 채용공고 수정
    - 등록되어있는 채용공고의 id를 통해 데이터를 수정
3. 채용공고 삭제
    - 등록되어있는 채용공고의 id를 통해 데이터 삭제
4. 채용공고 목록 조회
    - 현재 등록되어있는 모든 채용공고 목록 조회
    - 회사명, 국가, 지역이 포함돼야 함
5. 채용공고 검색 기능
    - keyword를 통해 해당 keyword를 포함한 채용공고를 가져옴
6. 채용 상세 페이지 조회
    - 채용공고 id를 통해 해당 채용공고의 상세내용을 조회
    - 해당 채용공고를 올린 회사가 다른 채용공고도 함께 반환
7. 채용공고 지원
    - 사용자는 1회만 한 채용공고에 지원가능

## 개발 환경
- 사용언어 : `Javascript`
- 프레임워크 : `node.js`
- 데이터베이스 : `Postgresql`
- ORM : `sequelize`
- IDE : `vscode`

## 프로젝트 상세 설명

### ERD
![ERD image](./erd.png)
- 테이블 : 회사, 채용공고, 지원자, 지원내역
- 관계
  - 채용공고 table은 회사id와 관계 형성
  - 지원내역 table은 채용공고id/유저id와 관계 형성

### 요구기능 구현
1. 회사 생성
- 채용공고를 생성하기 위해서는 회사id를 받아와야하기 때문에 회사를 가장 먼저 생성해야함
- 요구 데이터 : id, 회사이름, 국가, 지역
2. 채용공고 생성
- 요구 데이터 : 회사id, 포지션, 보상금, 내용, 기술
- id는 1부터 자동생성
3. 채용공고 수정
- 요구 데이터 : 포지션, 보상금, 내용, 기술 중 수정하고자 하는 data
- 회사id를 포함시켜서 보내도 해당 정보는 무시됨
4. 채용공고 삭제
- 요구 데이터 : 채용공고id(url에 명시)
5. 채용공고 목록 조회
- 채용공고로 GET요청을 보내면 채용공고 목록 전체 반환
6. 채용공고 검색
- ?search=keyword를 이용해서 보내면 해당 keyword를 포함한 채용공고 반환
- 검색 범위는 회사명, 지역, 포지션, 스킬로 설정함
7. 채용공고 상세 페이지 조회
- 채용 상세 내용과, 해당 채용공고를 올린 회사의 다른 채용공고까지 함께 반환
8. 유저 생성
- 요구 데이터 : id, 유저이름
- 채용공고에 지원을 하기 위해서는 사용자id가 필요하기 때문에 사용자를 먼저 생성
9. 채용공고 지원
- 요구 데이터 : user_id, notice_id
- 1회만 지원가능, 지원id는 1부터 자동생성

### API 명세서
|index|method|URL|body|description|
|------|---|---|---|---|
|1|POST|/company|{<br/>&nbsp;"id":int,<br/>&nbsp;"name":string,<br/>&nbsp;"country":string,<br/>&nbsp;"region":string<br/>}|회사생성|
|2|POST|/notice|{<br/>&nbsp;"companyId":int,<br/>&nbsp;"position":string,<br/>&nbsp;"reward":int,<br/>&nbsp;"detail":string<br/>&nbsp;"skill":string<br/>}|채용공고생성|
|3|PUT|/notice/:id|{<br/>&nbsp;"position":string,<br/>&nbsp;"reward":int,<br/>&nbsp;"detail":string<br/>&nbsp;"skill":string<br/>}|채용공고 수정<br/>회사id는 포함해서 요청해도 업데이트되지않음, 변경하고자 하는 data만 포함시켜서 보내도 변경됨|
|4|DELETE|/notice/:id|-|채용공고 삭제
|5|GET|/notice|-|채용공고 목록 전체 조회
|6|GET|/notice?search=keyword|-|채용공고 검색<br/>keyword에 찾고자하는 정보 입력
|7|GET|/notice/:id|-|채용공고 상세 조회<br/>회사가 올린 다른 채용공고도 함께 확인 가능
|8|POST|/user|{<br/>&nbsp;"id":int,<br/>&nbsp;"name":string<br/>}|유저 생성
|9|POST|/apply|{<br/>&nbsp;"user_id":int,<br/>&nbsp;"notice_id":int<br/>}|채용공고에 지원<br/>중복지원 or 없는 채용공고id or 없는 사용자id일 경우 에러 발생


## 프로젝트 설치 & 실행 방법
### 프로젝트 클론
```
git clone https://github.com/cod2048/wanted-pre-onboarding-backend.git
```
### 의존성 설치
```
npm install
```
### 환경 설정
- 프로젝트 루트 경로에 `.env`파일 생성 후 아래내용 입력(본인 db에 맞는 내용으로 입력)
```
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=localhost
DB_DIALECT=postgres
```
- postgresql이 없다면 해주세요.
### 데이터베이스 마이그레이션
```
npx sequelize-cli db:migrate
```

### 서버 실행
```
npm run dev
```

### test code 실행
```
npm test
```