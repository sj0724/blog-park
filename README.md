# Blog-Park
- 소개 : 공원(Park)같이 여러 사람이 모여있는 공간으로 여러 유저들의 포스트를 구경해보세요!

## 목표
1. 블로그 활동(포스트, 댓글, 좋아요) 기록을 빠르고 쉽게 확인
2. 기존 블로그 포스트와 성능에서 부족함 없는 기능
3. 내가 원하는 디자인으로 서비스 구현
4. 커밋 로그 확인

## 개발 기간
  전체 개발 기간 : 2024-09-24 ~ <br>
  기획 : 2024-09-24 ~ 2024-09.25 <br>
  기능 구현 : 2024-09.25 ~ <br>

## 기술 스택
- HTML, CSS, JavaScript, TypeScript, Next.js, react-hook-form, zod, Auth.js, Tailwind, supabase

## 기능 설명 및 구현 이슈

### 로그인, 회원가입
- react-hook-form과, zod를 활용해 회원 가입시 이메일 형식확인, 패스워드 형식 검사, 패스워드 2중 확인 과정을 거치고 있습니다.
- Auth.js의 세션을 통해 접속 유저 데이터를 관리하고 있습니다. 인증 세션 데이터와 미들웨어를 통해 유저 전용 페이지의 접근을 제한하고 있습니다.
- Auth.js의 OAuth를 활용해 Github계정으로 로그인 가능합니다. OAuth로그인시 db에서 해당 유저의 이메일을 조회하여 가입 여부를 확인해 미가입 유저의 경우 db에 유저 데이터를 생성하고 있습니다.
- Auth.js session에 OAuth여부를 추가로 저장하여 OAuth 로그인 유저를 구분하고 있습니다.

### 포스트 작성, 수정, 삭제
- Markdown으로 포스트를 작성하고 미리보기 창을 통해 렌더링 결과를 확인할 수 있습니다.
- 드래그 앤 드롭으로 이미지 파일을 supabase 버킷에 저장하고 저장한 url값을 반환받아 textarea에 삽입하고 있습니다.
- `react-markdown`라이브러리를 활용해 마크다운으로 작성된 데이터를 파싱하여 html태그로 변환하고 있고 해당 라이브러리에서사용되는 `rehype-sanitize`를 통해 xss 공격을 방지하고 있습니다. 또한 html 이미지 태그를 Next.js 이미지 태그로 변환하여 이미지 렌더링 최적화를 하고 있습니다.
- toolbar를 통해 markdown문법을 빠르게 기입할 수 있습니다.

### 유저 활동 로그
- 포스트 작성, 댓글, 좋아요와 같은 블로그 활동을 수집해 캘린더에 표시하고 있습니다. 로그는 db에 별도로 저장되며 최초에 한번 생성후 같은 날짜에 로그가 추가될 경우 데이터가 업데이트 됩니다.
- 개별 날짜를 클릭시 팝업으로 블로그 작성 갯수, 댓글 작성 갯수, 좋아요 갯수, 커밋 갯수를 확인할 수 있습니다.
- svg를 활용하여 작성한 글, 작성한 댓글, 좋아요를 도넛 차트로 구현하였습니다. 각 영역에 마우스 호버시 해당 영역의 데이터를 확인할 수 있습니다.
- Github API를 활용하여 Auth.js의 OAuth를 사용해 Github로그인시 public repository의 커밋을 연동할 수 있습니다.

### 댓글 등록, 수정, 삭제

### 유저 팔로우

### 포스트 좋아요, 공유

### 알림
- 댓글, 좋아요, 팔로우 시 해당 유저에게 알림을 생성합니다.
- supabase의 subscribe 기능을 활용해 알림 채널을 생성해 사용하고 있습니다. 알림 테이블에 해당 유저 데이터가 추가되면 실시간으로 nav에 새로운 알림을 확인할 수 있습니다.
- 알림을 읽음과 읽지 않음 상태로 지정할 수 있습니다. 모든 알림을 읽으면 새로운 알림 표시가 사라집니다.
- 알림에 접속 링크 경로를 포함하여 알림 클릭시 게시물, 유저 페이지로 이동합니다.

## 코드 실행 가이드

`npm run build`를 사용해 코드를 실행해주시면 됩니다.<br/>

>환경변수(.env) 안내<br/>
>```
>NEXT_PUBLIC_BASE_URL=""
>DATABASE_URL=""
>AUTH_SECRET=""
>NEXT_PUBLIC_SUPABASE_URL=""
>NEXT_PUBLIC_SUPABASE_ANON_KEY=""
>```
