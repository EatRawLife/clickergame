// 색상 목록 (일반적인 색상들)
const quickColors = [
    { name: '빨강', value: '#FF0000' },
    { name: '주황', value: '#FFA500' },
    { name: '노랑', value: '#FFFF00' },
    { name: '초록', value: '#00FF00' },
    { name: '파랑', value: '#0000FF' },
    { name: '남색', value: '#000080' },
    { name: '보라', value: '#800080' },
    { name: '분홍', value: '#FFC0CB' },
    { name: '갈색', value: '#A52A2A' },
    { name: '회색', value: '#808080' },
    { name: '검정', value: '#000000' },
    { name: '청록', value: '#40E0D0' },
    { name: '금색', value: '#FFD700' },
    { name: '은색', value: '#C0C0C0' },
    { name: '라임', value: '#00FF00' },
    { name: '마젠타', value: '#FF00FF' }
];

// 모든 가능한 색상 (목표 색상을 제외한 다른 색상 생성용)
const allColors = [
    '#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#000080',
    '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000', '#40E0D0',
    '#FFD700', '#C0C0C0', '#FF00FF', '#00FFFF', '#808000', '#008080',
    '#FF6347', '#FF1493', '#00CED1', '#FF8C00', '#32CD32', '#1E90FF',
    '#9370DB', '#FF69B4', '#20B2AA', '#FF4500', '#8B008B', '#00FA9A',
    '#DC143C', '#FF00FF', '#00BFFF', '#FF1493', '#7FFF00', '#FF7F50'
];

// 게임 단계 설정
const STAGES = [
    { level: 1, probability: 1/20, label: '1/20' },
    { level: 2, probability: 1/50, label: '1/50' },
    { level: 3, probability: 1/100, label: '1/100' },
    { level: 4, probability: 1/500, label: '1/500' },
    { level: 5, probability: 1/1000, label: '1/1000' }
];

// 게임 상태
let targetColor = { name: '빨강', value: '#FF0000' };
let clickCount = 0;
let currentStage = 0; // 0부터 시작 (1단계)
let canInput = true; // 키 입력 제어 플래그
let isWaitingForNextStage = false; // 다음 단계 버튼 대기 중 플래그

// DOM 요소
const clickArea = document.getElementById('clickArea');
const gameOver = document.getElementById('gameOver');
const stageComplete = document.getElementById('stageComplete');
const stageCompleteMessage = document.getElementById('stageCompleteMessage');
const nextStageBtn = document.getElementById('nextStageBtn');
const successIndicator = document.getElementById('successIndicator');
const successColorBox = document.getElementById('successColorBox');
const restartBtn = document.getElementById('restartBtn');
const targetColorBox = document.getElementById('targetColorBox');
const targetColorName = document.getElementById('targetColorName');
const colorPicker = document.getElementById('colorPicker');
const colorGrid = document.getElementById('colorGrid');
const setTargetBtn = document.getElementById('setTargetBtn');
const stageDisplay = document.getElementById('stageDisplay');
const stageProgress = document.getElementById('stageProgress');

// 색상 이름 가져오기 (HEX 코드에서)
function getColorName(hex) {
    const found = quickColors.find(c => c.value.toUpperCase() === hex.toUpperCase());
    if (found) return found.name;
    
    // HEX 코드를 이름으로 변환
    return hex;
}

// 빠른 색상 그리드 생성
function createColorGrid() {
    colorGrid.innerHTML = '';
    quickColors.forEach(color => {
        const btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.backgroundColor = color.value;
        btn.title = color.name;
        btn.addEventListener('click', () => {
            colorPicker.value = color.value;
            setTargetColor(color.value, color.name);
        });
        colorGrid.appendChild(btn);
    });
}

// 목표 색상 설정
function setTargetColor(colorValue, colorName = null) {
    targetColor = {
        value: colorValue.toUpperCase(),
        name: colorName || getColorName(colorValue)
    };
    targetColorBox.style.backgroundColor = targetColor.value;
    targetColorName.textContent = targetColor.name;
    console.log('목표 색상 설정:', targetColor.name, targetColor.value);
}

// 게임 초기화
function initGame() {
    // 목표 색상 표시 (현재 설정된 색상 유지)
    targetColorBox.style.backgroundColor = targetColor.value;
    targetColorName.textContent = targetColor.name;
    
    // 화면을 하얀색으로 초기화
    clickArea.style.backgroundColor = '#FFFFFF';
    
    // 모든 오버레이 숨기기
    gameOver.classList.remove('show');
    stageComplete.classList.remove('show');
    successIndicator.classList.remove('show');
    
    // 클릭 카운트 및 단계 초기화
    clickCount = 0;
    currentStage = 0;
    canInput = true;
    isWaitingForNextStage = false;
    
    // 단계 표시 업데이트
    updateStageDisplay();
}

// 단계 표시 업데이트
function updateStageDisplay() {
    const stage = STAGES[currentStage];
    if (stageDisplay) {
        stageDisplay.textContent = `단계 ${stage.level}/5 - 확률: ${stage.label}`;
    }
    if (stageProgress) {
        stageProgress.textContent = `진행률: ${currentStage + 1}/5 단계`;
    }
}

// 다음 단계로 진행 (버튼 클릭 시 호출)
function proceedToNextStage() {
    if (currentStage < STAGES.length - 1) {
        currentStage++;
        updateStageDisplay();
        
        // 단계 완료 화면 숨기기
        stageComplete.classList.remove('show');
        successIndicator.classList.remove('show');
        
        // 입력 재활성화
        isWaitingForNextStage = false;
        canInput = true;
        
        // 화면을 하얀색으로 초기화
        clickArea.style.backgroundColor = '#FFFFFF';
    }
}

// 단계 완료 메시지 표시
function showStageComplete() {
    if (currentStage < STAGES.length - 1) {
        // 다음 단계가 있는 경우
        const completedStage = STAGES[currentStage];
        const nextStage = STAGES[currentStage + 1];
        stageCompleteMessage.textContent = `${completedStage.level}단계를 완료했습니다!\n다음 단계: ${nextStage.label} 확률`;
        stageComplete.classList.add('show');
        isWaitingForNextStage = true;
        canInput = false; // 입력 차단
    } else {
        // 5단계 완료 - 최종 축하 메시지
        showFinalCongratulations();
    }
}

// 랜덤 색상 생성
function getRandomColor() {
    const currentProbability = STAGES[currentStage].probability;
    
    // 현재 단계의 확률로 목표 색상 반환
    if (Math.random() < currentProbability) {
        return targetColor.value;
    }
    
    // 나머지 확률로 다른 랜덤 색상 반환
    // 목표 색상을 제외한 다른 색상들 중에서 선택
    const otherColors = allColors.filter(color => 
        color.toUpperCase() !== targetColor.value.toUpperCase()
    );
    const randomColor = otherColors[Math.floor(Math.random() * otherColors.length)];
    return randomColor;
}

// 최종 축하 메시지 표시
function showFinalCongratulations() {
    gameOver.classList.add('show');
    isWaitingForNextStage = false;
    canInput = false; // 게임 종료 후 입력 차단
}

// 색상 변경 함수
function changeColor() {
    // 입력 제어 확인
    if (!canInput || isWaitingForNextStage) {
        return;
    }
    
    // 게임 오버 화면이 표시되어 있으면 무시
    if (gameOver.classList.contains('show') || stageComplete.classList.contains('show')) {
        return;
    }
    
    // 입력 잠금 (0.1초)
    canInput = false;
    setTimeout(() => {
        if (!isWaitingForNextStage) {
            canInput = true;
        }
    }, 100);
    
    clickCount++;
    
    // 새로운 색상 가져오기
    const newColor = getRandomColor();
    
    // 배경색 변경
    clickArea.style.backgroundColor = newColor;
    
    // 목표 색상이 나왔는지 확인
    if (newColor.toUpperCase() === targetColor.value.toUpperCase()) {
        // 입력 완전 차단
        canInput = false;
        isWaitingForNextStage = true;
        
        // 성공 인디케이터 표시
        successColorBox.style.backgroundColor = newColor;
        successIndicator.classList.add('show');
        
        // 1초 후에 단계 완료 메시지 표시
        setTimeout(() => {
            successIndicator.classList.remove('show');
            showStageComplete();
        }, 1000);
    }
}

// 클릭 이벤트 처리
clickArea.addEventListener('click', function(e) {
    // 단계 완료 화면이나 게임 오버 화면이 표시되어 있으면 클릭 무시
    if (stageComplete.classList.contains('show') || gameOver.classList.contains('show')) {
        return;
    }
    changeColor();
});

// 키보드 이벤트 처리 (a, s, ;, ')
document.addEventListener('keydown', function(e) {
    // 게임 오버 화면이 표시되어 있으면 Enter만 허용
    if (gameOver.classList.contains('show')) {
        if (e.key === 'Enter') {
            // 다시 시작은 여전히 가능
            return;
        }
        return;
    }
    
    // 단계 완료 화면이 표시되어 있으면 입력 차단
    if (stageComplete.classList.contains('show')) {
        return;
    }
    
    // 허용된 키: a, s, ;, ' (대소문자 무관, 세미콜론과 작은따옴표는 특수문자)
    const allowedKeys = ['a', 'A', 's', 'S', ';', "'"];
    if (allowedKeys.includes(e.key)) {
        e.preventDefault();
        changeColor();
    }
});

// 컬러 피커 변경 이벤트
colorPicker.addEventListener('input', function(e) {
    // 실시간으로 미리보기는 하지만 게임에는 영향을 주지 않음
});

// 목표 색상 설정 버튼
setTargetBtn.addEventListener('click', function() {
    const selectedColor = colorPicker.value;
    setTargetColor(selectedColor);
    // 게임 재시작 (새로운 목표 색상으로)
    initGame();
});

// 다음 단계 버튼
nextStageBtn.addEventListener('click', function() {
    proceedToNextStage();
});

// 다시 시작 버튼
restartBtn.addEventListener('click', function() {
    initGame();
});

// 빠른 색상 그리드 생성
createColorGrid();

// 초기 목표 색상 설정
setTargetColor('#FF0000', '빨강');

// 게임 시작
initGame();
