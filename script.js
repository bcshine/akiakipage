// 자바스크립트 파일 - 웹페이지에 움직임을 만드는 코드들

// 예약하기 버튼을 눌렀을 때 실행되는 함수 (헤더 버튼용)
function openReservation() {
    // 사용자에게 예약 안내 메시지를 보여줍니다
    alert('예약 문의는 전화로 연락주세요!\n📞 전화번호: 043-123-4567\n⏰ 영업시간: 오전 11시 ~ 오후 10시');
    
    // 나중에 실제 예약 시스템과 연결할 수 있습니다
    // 예: 예약 페이지로 이동하거나 팝업창 띄우기
    // window.open('reservation.html', '_blank'); // 새 창에서 예약 페이지 열기
    // window.location.href = 'tel:043-123-4567'; // 전화 걸기
}

// 네이버 예약 페이지로 이동하는 함수 (히어로 섹션 버튼용)
function openNaverReservation() {
    // 네이버 스마트플레이스 예약 페이지를 새 창에서 엽니다
    const naverUrl = 'https://map.naver.com/p/search/%EC%95%84%ED%82%A4%EC%95%84%ED%82%A4/place/12027905?c=15.00,0,0,0,dh&placePath=/home?entry=pll&from=map&fromPanelNum=2&timestamp=202507020221&locale=ko&svcName=map_pcv5&searchText=%EC%95%84%ED%82%A4%EC%95%84%ED%82%A4';
    window.open(naverUrl, '_blank');
    console.log('네이버 예약 페이지로 이동했습니다');
}

// ================== 히어로 캐러셀 기능들 ==================

// 현재 활성화된 슬라이드 번호를 저장하는 변수
let currentSlide = 0;

// 전체 슬라이드 개수 (4개)
const totalSlides = 4;

// 자동 슬라이드를 위한 타이머 변수
let autoSlideTimer;

// 다음 슬라이드로 넘어가는 함수
function nextSlide() {
    // 현재 슬라이드 번호를 1 증가시킵니다
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // 슬라이드를 변경합니다
    updateSlide();
    
    // 자동 슬라이드 타이머를 다시 시작합니다
    resetAutoSlide();
    
    console.log('다음 슬라이드로 이동: ' + (currentSlide + 1) + '번째');
}

// 이전 슬라이드로 돌아가는 함수
function prevSlide() {
    // 현재 슬라이드 번호를 1 감소시킵니다 (0보다 작아지면 마지막 슬라이드로)
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    
    // 슬라이드를 변경합니다
    updateSlide();
    
    // 자동 슬라이드 타이머를 다시 시작합니다
    resetAutoSlide();
    
    console.log('이전 슬라이드로 이동: ' + (currentSlide + 1) + '번째');
}

// 특정 슬라이드로 직접 이동하는 함수 (인디케이터 클릭 시 사용)
function goToSlide(slideIndex) {
    // 슬라이드 번호를 지정된 번호로 설정합니다
    currentSlide = slideIndex;
    
    // 슬라이드를 변경합니다
    updateSlide();
    
    // 자동 슬라이드 타이머를 다시 시작합니다
    resetAutoSlide();
    
    console.log('슬라이드 ' + (slideIndex + 1) + '번으로 이동했습니다');
}

// 슬라이드를 실제로 변경하는 함수
function updateSlide() {
    // 모든 슬라이드를 찾아서 저장합니다
    const slides = document.querySelectorAll('.slide');
    // 모든 인디케이터를 찾아서 저장합니다
    const indicators = document.querySelectorAll('.indicator');
    
    // 모든 슬라이드에서 'active' 클래스를 제거합니다 (숨김)
    slides.forEach(slide => slide.classList.remove('active'));
    
    // 모든 인디케이터에서 'active' 클래스를 제거합니다
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 현재 슬라이드에만 'active' 클래스를 추가합니다 (보임)
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    
    // 현재 인디케이터에만 'active' 클래스를 추가합니다
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

// 자동 슬라이드를 시작하는 함수
function startAutoSlide() {
    // 5초마다 다음 슬라이드로 자동 이동
    autoSlideTimer = setInterval(nextSlide, 5000);
    console.log('자동 슬라이드가 시작되었습니다 (5초 간격)');
}

// 자동 슬라이드를 멈추는 함수
function stopAutoSlide() {
    // 타이머를 삭제합니다
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        console.log('자동 슬라이드가 멈췄습니다');
    }
}

// 자동 슬라이드를 다시 시작하는 함수 (사용자 조작 후)
function resetAutoSlide() {
    // 기존 타이머를 멈추고 새로 시작합니다
    stopAutoSlide();
    startAutoSlide();
}

// ================== 오마카세 메뉴 더보기 기능들 ==================

// 메뉴 상세 정보를 펼치거나 접는 함수
function toggleMenuDetails(menuIndex, event) {
    // 기본 동작 방지 (페이지 이동 방지)
    if (event) {
        event.preventDefault();
    }
    
    // 클릭한 메뉴의 상세 정보 영역을 찾습니다
    const menuDetails = document.getElementById('menuDetails' + menuIndex);
    // 클릭한 더보기 버튼을 찾습니다
    const moreBtn = menuDetails.previousElementSibling;
    // 버튼 안의 텍스트와 아이콘을 찾습니다
    const btnText = moreBtn.querySelector('.btn-text');
    const btnIcon = moreBtn.querySelector('.btn-icon');
    
    // 현재 상세 정보가 열려있는지 확인합니다
    if (menuDetails.classList.contains('active')) {
        // 열려있다면 닫습니다
        menuDetails.classList.remove('active');
        moreBtn.classList.remove('active');
        btnText.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
        btnIcon.textContent = '▼'; // 아이콘을 아래쪽 화살표로 변경
        console.log('메뉴 ' + (menuIndex + 1) + '번 상세정보를 닫았습니다');
    } else {
        // 닫혀있다면 엽니다
        menuDetails.classList.add('active');
        moreBtn.classList.add('active');
        btnText.textContent = '닫기'; // 버튼 텍스트를 '닫기'로 변경
        btnIcon.textContent = '▲'; // 아이콘을 위쪽 화살표로 변경
        console.log('메뉴 ' + (menuIndex + 1) + '번 상세정보를 열었습니다');
        
        // 상세 정보가 열릴 때 해당 위치로 부드럽게 스크롤
        setTimeout(function() {
            menuDetails.scrollIntoView({
                behavior: 'smooth', // 부드러운 스크롤
                block: 'nearest' // 가장 가까운 위치로 스크롤
            });
        }, 200); // 0.2초 후에 스크롤 (애니메이션 시간 고려)
    }
}

// 모바일에서 햄버거 메뉴 버튼을 눌렀을 때 실행되는 함수
function toggleMobileMenu() {
    // 모바일 메뉴를 찾아서 변수에 저장합니다
    const mobileMenu = document.getElementById('mobileMenu');
    
    // 햄버거 메뉴 버튼을 찾아서 변수에 저장합니다
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // 현재 메뉴가 보이는지 안 보이는지 확인합니다
    if (mobileMenu.classList.contains('active')) {
        // 만약 메뉴가 보이고 있다면 숨깁니다
        mobileMenu.classList.remove('active');
        console.log('모바일 메뉴를 숨겼습니다'); // 개발자 도구에서 확인용 메시지
    } else {
        // 만약 메뉴가 숨겨져 있다면 보여줍니다
        mobileMenu.classList.add('active');
        console.log('모바일 메뉴를 보여줬습니다'); // 개발자 도구에서 확인용 메시지
    }
}

// 모바일 메뉴의 링크를 클릭했을 때 메뉴를 닫는 함수
function closeMobileMenu() {
    // 모바일 메뉴를 찾아서 변수에 저장합니다
    const mobileMenu = document.getElementById('mobileMenu');
    
    // 메뉴에서 'active' 클래스를 제거해서 메뉴를 숨깁니다
    mobileMenu.classList.remove('active');
    
    console.log('모바일 메뉴를 닫았습니다'); // 개발자 도구에서 확인용 메시지
}

// 페이지가 완전히 로드된 후에 실행되는 코드
document.addEventListener('DOMContentLoaded', function() {
    console.log('아키아키 웹페이지가 로드되었습니다!'); // 개발자 도구에서 확인용 메시지
    
    // 히어로 캐러셀 자동 슬라이드 시작
    startAutoSlide();
    
    // 히어로 섹션에 마우스가 올라갔을 때 자동 슬라이드 멈추기
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        // 마우스가 히어로 섹션에 올라갔을 때
        heroSection.addEventListener('mouseenter', function() {
            stopAutoSlide();
            console.log('마우스가 히어로 섹션에 올라가서 자동 슬라이드를 멈췄습니다');
        });
        
        // 마우스가 히어로 섹션에서 벗어났을 때
        heroSection.addEventListener('mouseleave', function() {
            startAutoSlide();
            console.log('마우스가 히어로 섹션에서 벗어나서 자동 슬라이드를 재시작했습니다');
        });
    }
    
    // 스크롤 이벤트 추가 - 스크롤할 때 헤더 그림자 효과 조정
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        // 스크롤 위치가 50px 이상이면 헤더에 그림자를 더 진하게 만듭니다
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            // 스크롤이 위쪽에 있으면 원래 그림자로 돌아갑니다
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 모든 메뉴 링크에 부드러운 스크롤 효과 추가
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // 기본 링크 동작을 막습니다
            e.preventDefault();
            
            // 링크의 href 속성에서 이동할 위치를 가져옵니다
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // 만약 이동할 위치가 존재한다면
            if (targetElement) {
                // 부드럽게 스크롤하여 해당 위치로 이동합니다
                targetElement.scrollIntoView({
                    behavior: 'smooth', // 부드러운 스크롤
                    block: 'start' // 요소의 시작 부분으로 이동
                });
                
                console.log(targetId + ' 섹션으로 이동했습니다'); // 개발자 도구에서 확인용 메시지
            }
        });
    });
    
    // 모바일에서 메뉴 외부를 클릭했을 때 메뉴 닫기
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        // 클릭한 곳이 메뉴나 메뉴 버튼이 아니고, 메뉴가 열려있다면 메뉴를 닫습니다
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

// ================== 프리미엄 오마카세 섹션 기능 ==================

// 프리미엄 메뉴 상세 정보 토글 함수 (펼치기/접기)
function togglePremiumMenuDetails(index, event) {
    // 기본 동작 방지 (페이지 이동 방지)
    if (event) {
        event.preventDefault();
    }
    
    // HTML에서 해당 인덱스의 상세 정보 요소를 찾기
    const detailsElement = document.getElementById(`premiumMenuDetails${index}`);
    // 해당 카드의 더보기 버튼 찾기
    const button = detailsElement.parentElement.querySelector('.premium-more-btn');
    // 버튼 내의 텍스트와 아이콘 요소 찾기
    const btnText = button.querySelector('.btn-text');
    const btnIcon = button.querySelector('.btn-icon');
    
    // 현재 상세 정보가 펼쳐져 있는지 확인하기
    const isActive = detailsElement.classList.contains('active');
    
    if (isActive) {
        // 이미 펼쳐져 있다면 접기
        detailsElement.classList.remove('active'); // 'active' 클래스 제거로 접기
        btnText.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
        btnIcon.textContent = '▼'; // 아이콘을 아래쪽 화살표로 변경
    } else {
        // 접혀있다면 펼치기
        detailsElement.classList.add('active'); // 'active' 클래스 추가로 펼치기
        btnText.textContent = '닫기'; // 버튼 텍스트를 '닫기'로 변경
        btnIcon.textContent = '▲'; // 아이콘을 위쪽 화살표로 변경
        
        // 상세 정보가 펼쳐질 때 부드럽게 스크롤 이동
        setTimeout(() => {
            // 0.1초 후에 해당 메뉴 카드 위치로 부드럽게 스크롤
            const menuCard = detailsElement.closest('.premium-menu-card');
            menuCard.scrollIntoView({
                behavior: 'smooth', // 부드러운 스크롤
                block: 'start' // 요소의 시작 부분이 보이도록
            });
        }, 100);
    }
}

// ================== 점심특선 섹션 기능 ==================

// 점심특선 메뉴 상세 정보 토글 함수 (펼치기/접기)
function toggleLunchMenuDetails(index, event) {
    // 기본 동작 방지 (페이지 이동 방지)
    if (event) {
        event.preventDefault();
    }
    
    // HTML에서 해당 인덱스의 상세 정보 요소를 찾기
    const detailsElement = document.getElementById(`lunchMenuDetails${index}`);
    // 해당 카드의 더보기 버튼 찾기
    const button = detailsElement.parentElement.querySelector('.lunch-more-btn');
    // 버튼 내의 텍스트와 아이콘 요소 찾기
    const btnText = button.querySelector('.btn-text');
    const btnIcon = button.querySelector('.btn-icon');
    
    // 현재 상세 정보가 펼쳐져 있는지 확인하기
    const isActive = detailsElement.classList.contains('active');
    
    if (isActive) {
        // 이미 펼쳐져 있다면 접기
        detailsElement.classList.remove('active'); // 'active' 클래스 제거로 접기
        btnText.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
        btnIcon.textContent = '▼'; // 아이콘을 아래쪽 화살표로 변경
        console.log('점심특선 메뉴 ' + (index + 1) + '번 상세정보를 닫았습니다');
    } else {
        // 접혀있다면 펼치기
        detailsElement.classList.add('active'); // 'active' 클래스 추가로 펼치기
        btnText.textContent = '닫기'; // 버튼 텍스트를 '닫기'로 변경
        btnIcon.textContent = '▲'; // 아이콘을 위쪽 화살표로 변경
        console.log('점심특선 메뉴 ' + (index + 1) + '번 상세정보를 열었습니다');
        
        // 상세 정보가 펼쳐질 때 부드럽게 스크롤 이동
        setTimeout(() => {
            // 0.15초 후에 해당 메뉴 카드 위치로 부드럽게 스크롤
            const menuCard = detailsElement.closest('.lunch-menu-card');
            menuCard.scrollIntoView({
                behavior: 'smooth', // 부드러운 스크롤
                block: 'start' // 요소의 시작 부분이 보이도록
            });
        }, 150);
    }
}

// 창 크기가 변경될 때 실행되는 함수
window.addEventListener('resize', function() {
    // 창 크기가 768px보다 커지면 모바일 메뉴를 자동으로 닫습니다
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.remove('active');
        console.log('화면이 커져서 모바일 메뉴를 닫았습니다');
    }
});

// 사용자가 다른 탭으로 이동했다가 돌아왔을 때 처리하는 코드
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 사용자가 다른 탭으로 이동했을 때 자동 슬라이드 멈춤
        stopAutoSlide();
        console.log('탭이 숨겨져서 자동 슬라이드를 멈췄습니다');
    } else {
        // 사용자가 탭으로 돌아왔을 때 자동 슬라이드 재시작
        startAutoSlide();
        console.log('탭으로 돌아와서 자동 슬라이드를 재시작했습니다');
    }
});

/* ========== 단품 메뉴 더보기 토글 함수 시작 ========== */

/**
 * 단품 메뉴의 더보기 버튼을 클릭했을 때 상세 정보를 보여주거나 숨기는 함수
 * @param {number} index - 카드의 인덱스 번호 (0부터 시작)
 * @param {Event} event - 클릭 이벤트 객체
 */
function toggleSingleMenuDetails(index, event) {
    // 기본 동작 방지 (페이지 이동 방지)
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // 선택된 카드의 상세 정보 영역을 찾습니다
    const detailsDiv = document.getElementById(`singleMenuDetails${index}`);
    
    // 상세 정보 영역이 없으면 함수를 종료합니다
    if (!detailsDiv) {
        console.log('단품 메뉴 요소를 찾을 수 없습니다:', index);
        return;
    }
    
    // 더보기 버튼을 찾습니다 (상세 정보의 이전 형제 요소)
    const moreBtn = detailsDiv.previousElementSibling;
    
    // 현재 상세 정보가 보이는지 확인합니다 (show 클래스가 있는지 체크)
    const isCurrentlyOpen = detailsDiv.classList.contains('show');
    
    if (isCurrentlyOpen) {
        // 현재 열려있다면 닫기
        detailsDiv.classList.remove('show'); // 상세 정보 숨기기
        if (moreBtn) {
            moreBtn.classList.remove('active'); // 버튼의 active 클래스 제거
            const btnText = moreBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
        }
        console.log(`단품 메뉴 ${index} 닫힘`);
    } else {
        // 현재 닫혀있다면 열기
        detailsDiv.classList.add('show'); // 상세 정보 보이기
        if (moreBtn) {
            moreBtn.classList.add('active'); // 버튼에 active 클래스 추가
            const btnText = moreBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = '접기'; // 버튼 텍스트를 '접기'로 변경
        }
        console.log(`단품 메뉴 ${index} 열림`);
        
        // 스크롤 이동 제거 - 그 자리에서만 펼쳐지도록 함
    }
}

/* ========== 단품 메뉴 더보기 토글 함수 끝 ========== */

/* ========== 기념일 서비스 더보기 토글 함수 시작 ========== */

/**
 * 기념일 서비스의 더보기 버튼을 클릭했을 때 상세 정보를 보여주거나 숨기는 함수
 * @param {number} index - 카드의 인덱스 번호 (0부터 시작)
 * @param {Event} event - 클릭 이벤트 객체
 */
function toggleAnniversaryDetails(index, event) {
    // 기본 동작 방지 (페이지 이동 방지)
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // 선택된 카드의 상세 정보 영역을 찾습니다
    const detailsDiv = document.getElementById(`anniversaryDetails${index}`);
    
    // 상세 정보 영역이 없으면 함수를 종료합니다
    if (!detailsDiv) {
        console.log('기념일 서비스 요소를 찾을 수 없습니다:', index);
        return;
    }
    
    // 더보기 버튼을 찾습니다 (상세 정보의 이전 형제 요소)
    const moreBtn = detailsDiv.previousElementSibling;
    
    // 현재 상세 정보가 보이는지 확인합니다 (show 클래스가 있는지 체크)
    const isCurrentlyOpen = detailsDiv.classList.contains('show');
    
    if (isCurrentlyOpen) {
        // 현재 열려있다면 닫기
        detailsDiv.classList.remove('show'); // 상세 정보 숨기기
        if (moreBtn) {
            moreBtn.classList.remove('active'); // 버튼의 active 클래스 제거
            const btnText = moreBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
        }
        console.log(`기념일 서비스 ${index} 닫힘`);
    } else {
        // 현재 닫혀있다면 열기
        detailsDiv.classList.add('show'); // 상세 정보 보이기
        if (moreBtn) {
            moreBtn.classList.add('active'); // 버튼에 active 클래스 추가
            const btnText = moreBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = '접기'; // 버튼 텍스트를 '접기'로 변경
        }
        console.log(`기념일 서비스 ${index} 열림`);
        
        // 스크롤 이동 제거 - 그 자리에서만 펼쳐지도록 함
    }
}

/* ========== 기념일 서비스 더보기 토글 함수 끝 ========== */

/* ========== Q&A 아코디언 토글 함수 시작 ========== */

/**
 * Q&A 질문을 클릭했을 때 답변을 보여주거나 숨기는 함수
 * @param {HTMLElement} questionElement - 클릭된 질문 요소
 */
function toggleQAAnswer(questionElement) {
    // 클릭된 질문의 부모 요소(qa-item) 찾기
    const qaItem = questionElement.closest('.qa-item');
    
    // 필요한 요소들이 없으면 함수 종료
    if (!qaItem) {
        console.log('Q&A 아이템을 찾을 수 없습니다');
        return;
    }
    
    // 답변 요소와 토글 아이콘 찾기
    const answerElement = qaItem.querySelector('.qa-answer');
    const toggleIcon = questionElement.querySelector('.toggle-icon');
    
    // 필요한 요소들이 없으면 함수 종료
    if (!answerElement || !toggleIcon) {
        console.log('Q&A 답변 또는 토글 아이콘을 찾을 수 없습니다');
        return;
    }
    
    // 현재 답변이 열려있는지 확인
    const isActive = answerElement.classList.contains('active');
    
    if (isActive) {
        // 답변이 열려있다면 닫기
        answerElement.classList.remove('active'); // 답변 숨기기
        qaItem.classList.remove('active'); // qa-item에서 active 클래스 제거
        toggleIcon.textContent = '+'; // 토글 아이콘을 + 로 변경
        console.log('Q&A 답변을 닫았습니다');
    } else {
        // 답변이 닫혀있다면 열기
        answerElement.classList.add('active'); // 답변 보이기
        qaItem.classList.add('active'); // qa-item에 active 클래스 추가
        toggleIcon.textContent = '−'; // 토글 아이콘을 − 로 변경 (minus 기호)
        console.log('Q&A 답변을 열었습니다');
        
        // 스크롤 이동 제거 - 그 자리에서만 펼쳐지도록 함
    }
}

/* ========== Q&A 아코디언 토글 함수 끝 ========== */

/* ========== 푸터 네비게이션 스크롤 함수 시작 ========== */

/**
 * 푸터에서 특정 섹션으로 부드럽게 스크롤하는 함수
 * @param {string} sectionId - 이동할 섹션의 ID
 */
function scrollToSection(sectionId) {
    // 섹션 ID로 요소 찾기
    const targetSection = document.getElementById(sectionId);
    
    // 요소가 없으면 함수 종료
    if (!targetSection) {
        console.log(`섹션을 찾을 수 없습니다: ${sectionId}`);
        return;
    }
    
    // 헤더 높이 계산 (고정 헤더가 있는 경우)
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80; // 기본값 80px
    
    // 섹션의 위치 계산
    const targetPosition = targetSection.offsetTop - headerHeight - 20; // 추가 여백 20px
    
    // 부드러운 스크롤로 이동
    window.scrollTo({
        top: Math.max(0, targetPosition), // 0보다 작지 않도록 제한
        behavior: 'smooth' // 부드러운 스크롤 효과
    });
    
    console.log(`${sectionId} 섹션으로 스크롤했습니다`);
    
    // 모바일 메뉴가 열려있다면 닫기
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        console.log('모바일 메뉴를 닫았습니다');
    }
}

/* ========== 푸터 네비게이션 스크롤 함수 끝 ========== */

// ================== 챗봇 기능 ==================

// 아키아키 GPT 챗봇을 여는 함수
function openAkiakiChatbot() {
    // 챗봇 URL 설정 (가이드에서 제공된 주소)
    const chatbotUrl = 'https://chatgpt.com/g/g-6845bd255bf88191a7d86291b3b04127-akiaki-ilsig-annaeseo';
    
    // 새 창에서 챗봇 페이지 열기
    window.open(chatbotUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    // 콘솔에 로그 출력 (개발자 도구에서 확인용)
    console.log('아키아키 GPT 챗봇이 열렸습니다');
    
    // 사용자에게 간단한 안내 메시지 (선택사항)
    // alert('아키아키 전용 GPT 챗봇이 새 창에서 열립니다!');
}

 