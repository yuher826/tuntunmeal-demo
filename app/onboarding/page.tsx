'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const slides = [
  {
    emoji: '🍱',
    bg: '#1A2E0A',
    accent: '#9FE1CB',
    title: '매일 11시\n건강한 한끼',
    desc: '새벽 5시부터 준비하는 HACCP 인증\n안양·평촌 직장인 프리미엄 도시락',
  },
  {
    emoji: '📅',
    bg: '#0A2030',
    accent: '#B5D4F4',
    title: '한달치 메뉴\n미리 확인',
    desc: '관리자 등록분까지 달력 미리보기\n구독 시 5% 할인!',
  },
  {
    emoji: '⚡',
    bg: '#1A1A2E',
    accent: '#C0DD97',
    title: '3번 탭으로\n예약 완료',
    desc: '메뉴 → 픽업시간 → 결제\nQR 코드 하나로 픽업!',
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goNext = () => {
    if (animating) return;
    if (current < slides.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => prev + 1);
        setAnimating(false);
      }, 200);
    } else {
      router.push('/login');
    }
  };

  const goSkip = () => router.push('/login');

  const s = slides[current];

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ minHeight: '100vh', width: '100%', maxWidth: 430, background: s.bg, display: 'flex', flexDirection: 'column', transition: 'background .4s ease', position: 'relative', overflow: 'hidden' }}>

        {/* 배경 원형 장식 */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,.03)' }}></div>
        <div style={{ position: 'absolute', bottom: 120, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.03)' }}></div>

        {/* 건너뛰기 */}
        <div style={{ padding: '52px 20px 0', display: 'flex', justifyContent: 'flex-end' }}>
          {current < slides.length - 1 && (
            <div onClick={goSkip} style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', cursor: 'pointer', padding: '4px 8px' }}>건너뛰기</div>
          )}
        </div>

        {/* 메인 콘텐츠 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)', transition: 'all .2s ease', textAlign: 'center' }}>

          {/* 이모지 아이콘 */}
          <div style={{ width: 100, height: 100, borderRadius: 28, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 32, border: '1px solid rgba(255,255,255,.1)' }}>
            {s.emoji}
          </div>

          {/* 제목 */}
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 16, whiteSpace: 'pre-line' }}>
            {s.title}
          </div>

          {/* 설명 */}
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {s.desc}
          </div>

          {/* 강조 배지 */}
          <div style={{ marginTop: 28, background: 'rgba(255,255,255,.1)', borderRadius: 20, padding: '6px 16px', border: `1px solid ${s.accent}33` }}>
            <span style={{ fontSize: 12, color: s.accent, fontWeight: 600 }}>
              {current === 0 ? '✓ HACCP 인증 · 친환경 식재료' : current === 1 ? '✓ 최대 60일 미리보기' : '✓ 평균 예약시간 23초'}
            </span>
          </div>
        </div>

        {/* 하단 */}
        <div style={{ padding: '0 24px 52px' }}>

          {/* 점 인디케이터 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setCurrent(i)}
                style={{ height: 5, width: i === current ? 24 : 5, borderRadius: 3, background: i === current ? s.accent : 'rgba(255,255,255,.2)', transition: 'all .3s ease', cursor: 'pointer' }}>
              </div>
            ))}
          </div>

          {/* 버튼 */}
          <button onClick={goNext}
            style={{ width: '100%', padding: '15px', background: s.accent, color: '#1A1A1A', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif', transition: 'all .2s'" }}>
            {current < slides.length - 1 ? '다음' : '튼튼밀 시작하기 🍱'}
          </button>

          {/* 로그인 이미 있는 경우 */}
          {current === slides.length - 1 && (
            <div onClick={goSkip} style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>
              이미 계정이 있어요
            </div>
          )}
        </div>

      </div>
    </div>
  );
}