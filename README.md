# 발더스 게이트 3 꾸구 인터랙티브 시트: Adventure

> 본 홈페이지는 비공식 팬메이드로, 공식 게임, 계정 등과는 무관합니다.
> 
> **제작: [트위터: 꾸구 (@bg3_sheet)](https://twitter.com/bg3_sheet)**
> 
> **(2025. 01. 18) 메인트 트친소 중입니다💞 저에게도 많관부. 좋은 트친이 될 수 잇서...!**
> 
> **라이선스:** MIT 라이선스 (오픈 소스, 출처 표기 필수)

<br>

## 소개
### 데모 사이트: [구경하러 가기](https://bg3sheet.web.app/)

![시트 미리보기](https://blog.kakaocdn.net/dn/qugoX/btsLSsJtwKL/pioSYS4MD5cy6O7U6ZMe01/img.png)

페어와 함께, 개인봇과 함께, 그리고 혼자서도 재미있게 쓸 수 있는 **홈페이지형 시트**입니다. React 타입스크립트와 Google Firebase를 사용하지만, **아래 `시작하기`만 따라하면 관련 지식이 없어도** 나만의 개인홈형 인터랙티브 시트를 제작, 게시할 수 있습니다.

<br>

## 시작하기

### 다운로드

#### 컴퓨터에 git이 없거나 git을 모를 경우
1. [Node.js (LTS)](https://nodejs.org/ko)를 설치합니다.
2. 초록색 `Code` 드롭다운 메뉴를 눌러 ZIP 파일을 다운로드 후 압축을 풉니다.
3. 압축 해제한 폴더로 이동해 Windows Powershell, Windows Terminal, iTerm2 등 cmd(터미널)를 실행합니다.
5. 아래 명령어를 실행합니다.
```bash
npm install
```

#### 컴퓨터에 git이 있는 경우
Node.js가 없다면 설치 후 아래 명령어를 실행합니다.
```bash
git clone https://github.com/bg3-sheet/adventure.git
cd adventure
npm install
```

<br>

### 트위터 개발자 계정 발급받기
> 홈페이지를 전체 공개해도 정해진 사람만 게시물을 수정하고 특별한 경고 메시지를 볼 수 있도록 트위터를 통해 사용자를 인증합니다.
> 이미 개발자 계정이 있다면 이 부분은 넘어가도 좋습니다.

<br>

1. [Twitter 개발자 포털](https://developer.twitter.com/en/portal/petition/essential/basic-info)에 접속합니다.
2. 최하단 `Sign up for Free Account` 버튼을 클릭합니다.
![최하단 `Sign up for Free Account` 버튼을 클릭합니다.](./misc/1.png)
3. 사용 목적을 아래 예시처럼 작성하고 이용약관에 동의한 뒤 `Submit` 버튼을 클릭합니다.
```plaintext
With Twitter's data and API, I'm going to:
- authenticate my site's users to verify whether they have rights to use our service.
- provide a really simple post service which only supports write and update for those in our site's list.
No tweet is uploaded via our service. The API usage is restricted to authentication.
```
4. 아래와 같은 화면에서 열쇠 아이콘을 클릭합니다.
![Twitter 개발자 포털에서 열쇠 아이콘을 클릭합니다.](./misc/md%20(1).png)
5. `API Key and Secret` 메뉴의 `Regenerate` 버튼을 클릭한 뒤 재발급 확인 팝업창에 동의합니다.
6. 아래 화면에서 API Key와 API Key Secret을 복사하고 확인 버튼을 누릅니다.
   
![API Key와 API Key Secret을 복사합니다.](./misc/2.png)

<br>

### Firebase 시작
> 개인홈형 인터랙티브 시트를 무료로 호스팅하기 위해, 그리고 호감도 수치와 영감 데이터를 저장하기 위해 구글 Firebase를 이용합니다.

<br>

[이 블로그 글](https://velog.io/@hippohami/Firebase-%EC%9B%B9-%ED%98%B8%EC%8A%A4%ED%8C%85-%EC%84%A4%EC%A0%95-%EB%B0%B0%ED%8F%AC-%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)의 `프로젝트 생성`, `추가하기` 부분을 따라 하세요.
> **⚠️ 나중을 위해 `추가하기` 파트 진행 중 아래와 같은 코드가 나오면 메모장에 복사해 주세요.**
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUED06CCwWddyx44irFTGVWNqOmPayZBM",
  authDomain: "bg3sheet.firebaseapp.com",
  projectId: "bg3sheet",
  storageBucket: "bg3sheet.firebasestorage.app",
  messagingSenderId: "709789217488",
  appId: "1:709789217488:web:7103daba005ed3721ba4d5",
  measurementId: "G-C0Q78Q44KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

<br>

### 트위터 인증 설정
1. 사이드바에서 `빌드 > Authentication` 메뉴를 클릭한 뒤 `시작하기` 버튼을 클릭합니다.
2. `로그인 방법` 탭에 들어가 추가 제공업체 중 Twitter를 선택합니다.
3. 아래와 같은 화면이 나오면 `사용 설정` 토글을 켜고, 복사한 트위터 API Key와 Key Secret을 각각 입력한 뒤 콜백 URL을 복사해 주세요.
![콜백 URL을 복사해 주세요.](./misc/md%20(7).png)
4. [Twitter 개발자 포털](https://developer.twitter.com/en/portal/petition/essential/basic-info)로 돌아가 열쇠 아이콘 왼쪽에 있는 환경설정 아이콘을 클릭합니다.
5. 하단 `User authentication settings` 메뉴에서 `Set up` 버튼을 클릭하고, 각 항목에 아래처럼 대답한 뒤 저장합니다.
   
   * **App permissions:** Read (기본값)
   * **Type of App:** Web App, Automated App or Bot
   * **App info**
      * **Callback URI / Redirect URL:** `(3에서 복사했던 콜백 URL)` (예: https://bg3sheet.firebaseapp.com/__/auth/handler)
      * **Website URL:** `Firebase를 연결하며 메모장에 복사해 놓았던 내용 중 authDomain 내용` (예: https://bg3sheet.firebaseapp.com 또는 https://bg3sheet.web.app)
        
7. (선택) App Details 메뉴의 `Edit` 버튼을 클릭하고, App name에 알아보기 어려운 이름 대신 트위터 로그인 팝업창에 뜰 홈페이지 이름을 적어서 저장합니다.

<br>

### Firestore Database 설정
1. [Firebase 콘솔](https://console.firebase.google.com)로 돌아와 사이드바에서 `빌드 > Firestore Database` 메뉴를 클릭한 뒤 `데이터베이스 만들기` 버튼을 클릭합니다.
2. 팝업창에서 아래처럼 선택합니다:
   
   * **보안 규칙:** 프로덕션 모드에서 시작
   * **리전:** asia-northeast3 (서울)
     
4. `데이터 > 패널 뷰` 화면에서 `+ 컬렉션 시작` 버튼을 클릭합니다.
5. 팝업창에서 **반드시** 아래처럼 입력합니다:
   
   * **컬렉션 ID:** approvals
   * **문서 ID:** values
   * **필드 1**
      * **필드:** (캐릭터 1의 이름을 영문 소문자 한 단어로 입력해 주세요 / 예: astarion)
      * **유형:** number
      * **값:** 0
   * **필드 2**
      * **필드:** (캐릭터 2의 이름을 영문 소문자 한 단어로 입력해 주세요 / 예: tav)
      * **유형:** number
      * **값:** 0
     
![팝업창에서 반드시 아래처럼 입력합니다](./misc/md%20(2).png)
   
6. [이곳](https://circleboom.com/twitter-management-tool/twitter-search-tool/twitter-id-finder)에서 수정을 허용할 트위터 계정의 고유 숫자 ID를 확인합니다.
7. 데이터 탭 옆 `규칙` 탭으로 이동해 아래 규칙을 붙여넣기 합니다. 이때, `트위터 숫자 ID`에는 6에서 확인한 값이 들어가야 하며, 작은 따옴표는 유지합니다.
```js
rules_version = '2';
   
service cloud.firestore {
   match /databases/{database}/documents {
      match /{document=**} {
         allow read: if true;
         allow write: if request.auth != null && (request.auth.token.firebase.identities['twitter.com'][0] == '트위터 숫자 ID' || request.auth.token.firebase.identities['twitter.com'][0] == '트위터 숫자 ID');
      }
   }
}
```

<br>

### 템플릿 파일 커스터마이즈
> 편집기로 VS Code를 추천하지만, 메모장으로도 충분히 가능합니다.
>
> 주석에 따라 다음 파일을 수정합니다. 커스터마이징을 위해 파일 전체를 수정해야 하는 .env 파일을 제외하고, `가이드` 단어를 검색하면 바꿀 부분을 쉽게 찾을 수 있습니다.

<br>

* .env
* index.html
* src 폴더 - firebase.ts
* src 폴더 - components 폴더 - pages 폴더 - Home.tsx

<br>

### 🎉 마지막: 나만의 개인홈형 인터랙티브 시트 게시!!!
> 실행하는 데 오래 걸리는 명령어들이 있으나 에러 메시지가 없는 한 정상적으로 실행되고 있는 상태입니다.

<br>

1. 압축 해제한 프로젝트 폴더로 이동해 터미널을 실행합니다.
2. 아래 코드를 순서대로 실행합니다.
```bash
firebase login
firebase init
# 화살표 방향키로 움직여서 'Hosting' 항목을 선택합니다. Spacebar로 선택하고 Enter를 누르세요.
```
3. 질문에 아래 답변을 순서대로 선택하거나 입력합니다.
  
   * Please select an option: **`Use an existing project`** 선택
   * Select a default Firebase project for this directory: **위에서 만들었던 Firebase 프로젝트** 입력
   * What do you want to use as your public directory: **`dist`** 입력
   * Configure as a single-page app (rewrite all urls to /index.html): **`Y`**
   * Set up automatic builds and deploys with GitHub: **`N`**

4. 설정이 완료됐으면 아래 코드를 실행하고 기다립니다.
```
npm run build && firebase deploy
```

<br>

## 고생하셨습니다!

설치나 개조 중 궁금한 사항, 기능 추가 요청, 버그 제보 등 각종 문의는 [GitHub의 Issues 탭](https://github.com/bg3-sheet/adventure/issues)이나 [트위터 계정](https://twitter.com/bg3_sheet) 멘션, DM에 보내 주세요.
