import { useEffect, useState } from 'react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { marked } from 'marked';
import { challenges } from './challenges.js';

const EDITOR_HEIGHT = 480;

function idFromHash() {
  return decodeURIComponent(window.location.hash.slice(1));
}

function useSelectedId() {
  const [id, setId] = useState(idFromHash);
  useEffect(() => {
    const onHashChange = () => setId(idFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return id;
}

function ResetButton() {
  const { sandpack } = useSandpack();
  return (
    <button type="button" onClick={() => sandpack.resetAllFiles()}>
      초기화
    </button>
  );
}

function ChallengeList({ selectedId }) {
  return (
    <nav className="list">
      <h1>챌린지</h1>
      {challenges.length === 0 && <p className="muted">challenges/ 폴더에 문제를 추가하세요.</p>}
      <ol>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <a href={`#${encodeURIComponent(challenge.id)}`} aria-current={challenge.id === selectedId}>
              {challenge.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ChallengeView({ challenge }) {
  const [showSolution, setShowSolution] = useState(false);
  const files = showSolution ? { ...challenge.files, ...challenge.solution } : challenge.files;

  return (
    <main className="view">
      <article className="readme" dangerouslySetInnerHTML={{ __html: marked.parse(challenge.readme) }} />
      <SandpackProvider
        key={`${challenge.id}:${showSolution}`}
        template="react"
        theme="auto"
        files={files}
        options={{ activeFile: challenge.activeFile, visibleFiles: Object.keys(files) }}
      >
        <div className="toolbar">
          <ResetButton />
          {challenge.hasSolution && (
            <button type="button" onClick={() => setShowSolution((value) => !value)}>
              {showSolution ? '문제로 돌아가기' : '정답 보기'}
            </button>
          )}
        </div>
        <SandpackLayout>
          <SandpackCodeEditor showLineNumbers showTabs style={{ height: EDITOR_HEIGHT }} />
          <SandpackPreview style={{ height: EDITOR_HEIGHT }} />
        </SandpackLayout>
      </SandpackProvider>
    </main>
  );
}

export function App() {
  const selectedId = useSelectedId();
  const challenge = challenges.find((item) => item.id === selectedId) ?? challenges[0];

  return (
    <div className="app">
      <ChallengeList selectedId={challenge?.id} />
      {challenge && <ChallengeView key={challenge.id} challenge={challenge} />}
    </div>
  );
}
