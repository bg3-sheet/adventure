# 발더스 게이트 3 인터랙티브 시트: Adventure

> 본 홈페이지는 비공식 팬메이드로, 공식 게임, 계정 등과는 무관합니다.
> 
> **제작: [트위터/X 꾸구 (@bg3_sheet)](https://twitter.com/bg3_sheet)**
> **라이선스:** MIT 라이선스 (오픈 소스, 출처 표기 필수)

<br>

## 소개
* 데모 사이트: [구경하기](https://bg3sheet.web.app/)

![시트 미리보기](https://blog.kakaocdn.net/dn/qugoX/btsLSsJtwKL/pioSYS4MD5cy6O7U6ZMe01/img.png)

페어와 함께, 개인봇과 함께, 그리고 혼자서도 재미있게 쓸 수 있는 **홈페이지형 시트**입니다. React 타입스크립트와 Google Firebase를 사용하지만, **아래 시작 방법만 따라하면 관련 지식이 없어도** 손쉽게 나만의 인터랙티브 시트를 제작, 게시할 수 있습니다.

<br>

## 시작 방법

### 다운로드

1. 컴퓨터에 git이 없거나 git을 모를 경우
   1. node.js 설치법을 구글링 후 따라하세요.
   2. 초록색 `Code` 드롭다운 메뉴를 눌러 ZIP 파일 다운로드
   3. 압축 해제 후 해제한 폴더로 이동
   4. 현재 폴더에서 Windows Powershell, Windows Terminal, iTerm2 등 cmd 실행
   5. 아래 명령어를 한 줄씩 실행
   ```
   cd (복사한 폴더 경로)
   npm install
   ```
2. 컴퓨터에 git이 있는 경우
   ```
   git clone https://github.com/bg3-sheet/adventure.git
   cd adventure
   npm install
   ```

<br>

### Firebase 프로젝트 설정

**1. Firebase 콘솔 접속 및 프로젝트 생성**
   Firebase 호스팅 시작하는 법을 구글링 후 따라하세요.

<br>

**2. Firebase Authentication 설정**
   1. 왼쪽 메뉴에서 "Authentication" 선택
   2. "시작하기" 클릭
   ![Firebase Authentication 설정](./misc/md%20(9).png)
   3. "로그인 방법" 탭에서 "Twitter" 선택
   ![Firebase Authentication 트위터 설정](./misc/md%20(8).png)
   4. "사용 설정" 토글 활성화
   5. Twitter 앱 설정 항목은 비워두고 "저장" (Twitter 개발자 계정 설정 후 돌아올 예정)

<br>

**3. Firestore Database 설정**
   1. 왼쪽 메뉴에서 "Firestore Database" 선택
   ![Firestore Database 설정](./misc/md%20(4).png)
   2. "데이터베이스 만들기" 클릭
   3. 리전은 "asia-northeast3 (서울)" 선택
   ![Firestore Database 설정](./misc/md%20(3).png)
   4. 아래 사진처럼 컬렉션 저장 (`approvals`와 `values`는 복수형 그대로 입력 / 필드명은 **반드시** 영문 소문자 한 단어로 입력)
   ![Firestore Database 추가](./misc/md%20(2).png)
   5. "프로덕션 모드"로 시작 선택
   6. [이곳](https://circleboom.com/twitter-management-tool/twitter-search-tool/twitter-id-finder)에서 트위터 계정별 고유 숫자 ID 확인
   7. "규칙" 탭으로 이동해서 아래 규칙 붙여넣기 (트위터 숫자 ID 교체, 작은 따옴표 유지):

      ```
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

**4. Firebase 구성 정보 가져오기**
   1. 왼쪽 메뉴에서 "프로젝트 설정" (⚙️) 선택
   2. "일반" 탭에서 스크롤을 내려 "내 앱" 섹션으로 이동
   3. 웹 앱 아이콘 (`</>`) 클릭
   4. 앱 닉네임 입력
   5. "앱 등록" 클릭
   6. `firebaseConfig` 객체 정보 복사 후 메모장에 붙여넣기 (하단 '내 입맛대로 파일 수정' 단계에서 사용 예정)

<br>

### Twitter 개발자 계정 설정

**1. Twitter 개발자 계정 신청**

   1. [Twitter 개발자 포털](https://developer.twitter.com/en/portal/petition/essential/basic-info)에 접속
   2. "일반" 유형의 개발자 계정 신청
   3. 사용 목적 작성 예시:

      ```
      With Twitter's data and API, I'm going to:
      - authenticate my site's users to verify whether they have rights to use our service.
      - provide a really simple post service which only supports write and update for those in our site's list.
      No tweet is uploaded via our service. The API usage is restricted to authentication.
      ```

**2. Twitter 개발자 설정**

   1. 환경설정 아이콘 클릭 후 로그인 창에 뜰 이름 예쁘게 변경 (선택사항)
   ![트위터 개발자 설정 1](./misc/md%20(1).png)
   ![트위터 개발자 설정 2](./misc/md%20(11).png)
   2. App Details 하단 'User authentication settings' - Set up 버튼 클릭
   ![트위터 개발자 설정 3](./misc/md%20(6).png)
   3. 아래 사진처럼 입력 (다른 항목은 기본값)
      - Type of App: Web App
      - Callback URL: `https://[프로젝트ID].firebaseapp.com/__/auth/handler`
      - Website URL: `https://[프로젝트ID].web.app/`
   ![트위터 개발자 설정 4](./misc/md%20(5).png)
   4. "API Key and Secret" 저장 (메모장에 복사)

**3. Firebase Authentication에 Twitter 로그인 연동**
   1. Firebase 콘솔의 Authentication > 로그인 방법 > Twitter로 돌아가기
   2. API 키와 API 시크릿 키를 복사한 값으로 입력 후 저장
   ![트위터 로그인 연동](./misc/md%20(7).png)

<br>

### 내 입맛대로 파일 수정 (메모장 이용 가능)

1. `.env` 파일을 가이드 내용에 따라 수정
2. `index.html` 파일을 가이드 내용에 따라 수정
3. `firebase.ts` 파일을 가이드 내용에 따라 수정
4. `profileImage.tsx` 파일을 가이드 내용에 따라 수정
5. `Home.tsx` 파일을 가이드 내용에 따라 수정

<br>

### 배포 & 게시!!!

**1. Firebase CLI 설치**
   ```
   npm install -g firebase-tools
   ```

**2. Firebase 로그인**
   ```
   firebase login
   ```

**3. Firebase와 프로젝트 연결**
   ```
   firebase init
   ```

   - Hosting 선택
   - 빌드 디렉토리: `dist`
   - 단일 페이지 앱: Y
   - 다른 항목은 기본값을 사용하므로 엔터 누르기

**4. 빌드 및 배포**
   ```
   npm run build && firebase deploy
   ```

<br>

> 고생하셨습니다!
> 
> **모든 문의, 버그 제보: Issues / (트위터) 멘션, DM**
