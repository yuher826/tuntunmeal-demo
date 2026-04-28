'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const slides = [
  {
    emoji: '🍱',
    title: '매일 새로운\n건강한 한 끼',
    desc: '매일 아침 10시까지 주문하면\n점심 픽업 도시락이 준비돼요',
    bg: '#3B6D11',
  },
  {
    emoji: '⏰',
    title: '원하는 시간에\n픽업하세요',
    desc: '11:30 / 12:00 / 12:30 / 13:00\n4가지 픽업 시간 중 선택 가능해요',
    bg: '#4A8A1A',
  },
  {
    emoji: '📅',
    title: '정기구독으로\n5% 할인',
    desc: '매일 자동 예약되고\n월 정기구독 시 5% 할인 혜택',
    bg: '#2D5A0E',
  },
  {
    emoji: '🏢',
    title: '기업 단체계약\nB2B 서비스',
    desc: '10인 이상 단체 계약 시\n전담 매니저가 관리해드려요',
    bg: '#1E4A08',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const slide = slides[current];

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, minHeight: '100vh', background: slide.bg, fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', transition: 'background 0.4s', position: 'relative' }}>

        {/* 건너뛰기 */}
        {current < slides.length - 1 && (
          <div style={{ padding: '20px 24px', textAlign: 'right' }}>
            <button onClick={handleSkip} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>
              건너뛰기
            </button>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 32 }}>{slide.emoji}</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 16, whiteSpace: 'pre-line' }}>{slide.title}</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{slide.desc}</div>
        </div>

        {/* 하단 */}
        <div style={{ padding: '32px 24px 48px' }}>
          {/* 점 표시 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            {slides.map((_, i) => (
              <div key={i} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'width 0.3s' }} />
            ))}
          </div>

          {/* 버튼 */}
          <button
            onClick={handleNext}
            style={{ width: '100%', padding: '18px', borderRadius: 14, border: 'none', background: '#fff', color: slide.bg, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
            {current < slides.length - 1 ? '다음 →' : '시작하기 🚀'}
          </button>
        </div>

      </div>
    </div>
  );
}