# React 챌린지

react.dev의 "챌린지 도전하기"처럼 코드를 고치면서 바로 실행 결과를 보는 연습장입니다.
에디터와 미리보기는 [Sandpack](https://sandpack.codesandbox.io/)(react.dev가 쓰는 것과 같은 도구)을 씁니다.

## 실행

```
npm install
npm run dev
```

## 문제 추가하기

`challenges/` 아래에 폴더를 하나 만들면 바로 목록에 뜹니다. 개발 서버를 다시 켤 필요는 없습니다.

```
challenges/
  05-props-to-state/        폴더 이름 순(숫자 인식)으로 정렬된다
    README.md               문제 설명. 첫 줄의 `# 제목`이 목록 제목이 된다
    App.js                  진입 파일 (export default 컴포넌트). 필수
    Letter.js               그 밖의 파일은 에디터 탭으로 뜬다
    data.js
    styles.css              (선택) 미리보기에 적용할 스타일
    solution/               (선택) 정답. 있으면 "정답 보기" 버튼이 생긴다
      App.js                바뀐 파일만 넣으면 나머지는 문제 파일을 그대로 쓴다
```

- 파일끼리는 `import Letter from './Letter.js'`처럼 불러옵니다.
- 수정한 코드는 저장되지 않습니다. 다른 문제로 가거나 새로고침하면 처음 상태로 돌아갑니다.
- 미리보기 번들링은 CodeSandbox 서버를 쓰므로 인터넷 연결이 필요합니다.
