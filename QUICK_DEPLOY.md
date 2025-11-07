# 🚀 빠른 배포 가이드

## ⚡ 방법 1: Netlify Drop (가장 빠름! 30초)

1. 브라우저에서 https://app.netlify.com/drop 접속
2. 이 폴더의 3개 파일을 드래그 앤 드롭:
   - index.html
   - style.css  
   - script.js
3. 완료! 자동으로 공개 URL이 생성됩니다.
   예: https://amazing-game-123.netlify.app

---

## 📦 방법 2: GitHub Pages (5분)

### 1단계: GitHub 저장소 생성
1. https://github.com/new 접속
2. 저장소 이름 입력 (예: color-click-game)
3. "Public" 선택
4. "Create repository" 클릭

### 2단계: 파일 업로드
아래 명령어들을 실행하세요:

```bash
git remote add origin https://github.com/[사용자명]/[저장소명].git
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 활성화
1. 저장소 페이지에서 Settings 클릭
2. 왼쪽 메뉴에서 Pages 클릭
3. Source에서 "main" 브랜치 선택
4. Save 클릭
5. 2분 후 https://[사용자명].github.io/[저장소명] 접속

---

**추천: Netlify Drop이 가장 빠르고 간단합니다!**

