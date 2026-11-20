// challenges/<문제 폴더>/ 아래 파일을 모두 읽어 문제 목록으로 만든다.
//   README.md      → 문제 설명 (첫 `# 제목` 줄이 목록 제목)
//   solution/*     → 정답 파일 (있으면 "정답 보기" 버튼이 생긴다)
//   그 밖의 파일   → 에디터에 뜨는 문제 코드
const rawFiles = import.meta.glob('/challenges/*/**/*', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const README = 'README.md';
const SOLUTION_DIR = 'solution/';
const ENTRY_FILE = '/App.js';

function titleOf(readme, fallback) {
  const heading = readme.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

function toChallenges() {
  const byId = new Map();

  for (const [path, code] of Object.entries(rawFiles)) {
    const [, , id, ...rest] = path.split('/');
    const relative = rest.join('/');
    const challenge = byId.get(id) ?? { id, readme: '', files: {}, solution: {} };
    byId.set(id, challenge);

    if (relative === README) challenge.readme = code;
    else if (relative.startsWith(SOLUTION_DIR)) challenge.solution[`/${relative.slice(SOLUTION_DIR.length)}`] = code;
    else challenge.files[`/${relative}`] = code;
  }

  return [...byId.values()]
    .sort((a, b) => a.id.localeCompare(b.id, 'ko', { numeric: true }))
    .map((challenge) => ({
      ...challenge,
      title: titleOf(challenge.readme, challenge.id),
      activeFile: ENTRY_FILE in challenge.files ? ENTRY_FILE : Object.keys(challenge.files)[0],
      hasSolution: Object.keys(challenge.solution).length > 0,
    }));
}

export const challenges = toChallenges();
