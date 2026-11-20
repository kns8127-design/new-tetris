// 환경변수(SUPABASE_URL, SUPABASE_KEY)로 config.js를 만들고 dist/에 정적 파일을 모읍니다.
// Vercel: 프로젝트 환경변수 사용 / 로컬: npm run dev (.env 사용)
const fs = require('fs');
const path = require('path');

const { SUPABASE_URL, SUPABASE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('환경변수 SUPABASE_URL, SUPABASE_KEY가 필요합니다.');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'));
fs.writeFileSync(
  path.join(dist, 'config.js'),
  `window.TETRIS_CONFIG = ${JSON.stringify({ SUPABASE_URL, SUPABASE_KEY }, null, 2)};\n`
);
console.log('dist/ 생성 완료');
