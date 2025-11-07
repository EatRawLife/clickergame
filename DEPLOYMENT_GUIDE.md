# 🚀 배포 가이드 - 두 곳 모두 접속 가능!

## ✅ 해결 방법

기존 GitHub Pages와 충돌하지 않도록 **Netlify**에 별도로 배포합니다.

### 📍 방법 1: Netlify (추천 - 가장 간단)

#### 옵션 A: Netlify Drop (30초)
1. https://app.netlify.com/drop 접속
2. 다음 파일들을 드래그 앤 드롭:
   - `index.html`
   - `style.css`
   - `script.js`
   - `netlify.toml`
3. 완료! 자동으로 URL 생성
   - 예: `https://clickergame-123.netlify.app`

#### 옵션 B: GitHub 연동 (자동 배포)
1. https://app.netlify.com 접속
2. "Add new site" → "Import an existing project"
3. "GitHub" 선택 → 저장소 연결
4. 저장소: `EatRawLife/clickergame` 선택
5. 배포 설정:
   - Build command: (비워두기)
   - Publish directory: `.` (현재 폴더)
6. "Deploy site" 클릭
7. 완료! 자동 배포 URL 생성

### 📍 방법 2: GitHub Pages (서브폴더)

현재 저장소가 메인 페이지와 충돌한다면, 서브폴더로 배포:

1. GitHub 저장소에서 Settings → Pages
2. Source: "Deploy from a branch" 선택
3. Branch: `main` 선택
4. Folder: `/ (root)` 선택
5. 저장

접속 URL: `https://eatrawlife.github.io/clickergame`

---

## 🎯 최종 접속 URL

### Netlify (추천)
- `https://[프로젝트명].netlify.app`
- 기존 GitHub Pages와 완전히 독립적
- 자동 HTTPS
- 빠른 배포

### GitHub Pages
- `https://eatrawlife.github.io/clickergame`
- 기존 메인 페이지와 함께 사용 가능

---

## 💡 추천 설정

**Netlify를 사용하는 것을 추천합니다:**
- ✅ 기존 GitHub Pages와 완전히 독립
- ✅ 자동 HTTPS
- ✅ 빠른 CDN
- ✅ 커스텀 도메인 가능
- ✅ 자동 배포 (GitHub 푸시 시)

