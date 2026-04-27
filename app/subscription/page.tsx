'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Subscription() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly'>('weekly');
  const [menuType, setMenuType] = useState<'auto' | 'manual'>('auto');

  const plans = {
    weekly: { name: '주간 구독', desc: '월~금 5일 / 매주 자동 갱신', price: '45,125원', original: '47,500원', badges: ['자동결제', '우선슬롯', '2주 일시정지'], hot: true },
    monthly: { name: '월간 구독', desc: '월~금 20일 / 매월 1일 자동결제', price: '180,500원', original: '190,000원', badges: ['자동결제', '우선슬롯', '최대 할인'], hot: false },
  };

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F7F5EF', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: 15, fontWeight: 700 }}>정기구독</div>

        <div style={{ padding: '14px 14px 80px' }}>

          {/* 혜택 배너 */}
          <div style={{ background: 'linear-gradient(135deg, #2C3E1A, #3B6D11)', borderRadius: 14, padding: '18px 16px', textAlign: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: '#9FE1CB', marginBottom: 4 }}>구독하면</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>
              매일 자동 예약 + <span style={{ color: '#C0DD97' }}>5% 할인</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>우선 픽업 슬롯 · 2주 일시정지 포함</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14 }}>
              {[['🍱', '자동예약'], ['💰', '5% 할인'], ['⚡', '우선픽업']].map(([icon, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20 }}>{icon}</div>
                  <div style={{ fontSize: 9, color: '#9FE1CB', marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 플랜 선택 */}
          {(['weekly', 'monthly'] as const).map(plan => (
            <div key={plan} onClick={() => setSelectedPlan(plan)}
              style={{ border: `2px solid ${selectedPlan === plan ? '#3B6D11' : '#eee'}`, background: selectedPlan === plan ? '#EAF3DE' : '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 10, cursor: 'pointer', position: 'relative', transition: 'all .15s' }}>
              {plans[plan].hot && (
                <div style={{ position: 'absolute', top: -1, right: 14, background: '#3B6D11', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 10px', borderRadius: '0 0 8px 8px' }}>인기</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{plans[plan].name}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{plans[plan].desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3B6D11' }}>{plans[plan].price}</div>
                  <div style={{ fontSize: 10, color: '#aaa', textDecoration: 'line-through' }}>{plans[plan].original}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {plans[plan].badges.map(b => (
                  <span key={b} style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 7 }}>{b}</span>
                ))}
              </div>
            </div>
          ))}

          {/* 메뉴 선택 방식 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '13px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>메뉴 선택 방식</div>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13, marginBottom: 6 }}>
              <input type="radio" checked={menuType === 'auto'} onChange={() => setMenuType('auto')} style={{ accentColor: '#3B6D11' }} />
              <div>
                <div style={{ fontWeight: menuType === 'auto' ? 700 : 400 }}>자동 — 매일 편하게</div>
                <div style={{ fontSize: 10, color: '#888' }}>관리자가 등록한 메뉴로 자동 예약</div>
              </div>
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13 }}>
              <input type="radio" checked={menuType === 'manual'} onChange={() => setMenuType('manual')} style={{ accentColor: '#3B6D11' }} />
              <div>
                <div style={{ fontWeight: menuType === 'manual' ? 700 : 400 }}>직접 선택 — 내가 고르기</div>
                <div style={{ fontSize: 10, color: '#888' }}>달력에서 날짜별로 직접 선택</div>
              </div>
            </label>
          </div>

          {/* 픽업 시간 기본 설정 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '13px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>기본 픽업 시간</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['11:30', '12:00', '12:30', '13:00'].map(t => (
                <div key={t} style={{ flex: 1, padding: '8px 0', border: t === '12:00' ? '1.5px solid #3B6D11' : '1.5px solid #eee', borderRadius: 18, fontSize: 11, textAlign: 'center', cursor: 'pointer', background: t === '12:00' ? '#3B6D11' : '#fff', color: t === '12:00' ? '#fff' : '#333', fontWeight: t === '12:00' ? 700 : 400 }}>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* 시작 버튼 */}
          <button onClick={() => router.push('/subscription/manage')}
            style={{ width: '100%', padding: 14, background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif", marginBottom: 6 }}>
            {plans[selectedPlan].name} 시작하기
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa' }}>언제든 해지 가능 · 14일 무료 체험</div>

        </div>

        {/* 하단 탭바 */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
          {[['🏠','홈',false,'/'],[' 📅','메뉴달력',false,'/calendar'],['🔄','구독',true,'/subscription'],['👤','마이',false,'/mypage'],['☰','더보기',false,'/more']].map(([icon, label, active, path]) => (
            <div key={String(label)} onClick={() => router.push(String(path))}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
              <div style={{ fontSize: 18 }}>{icon}</div>
              <div style={{ fontSize: 9, color: active ? '#3B6D11' : '#B4B2A9', fontWeight: active ? 700 : 400 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}