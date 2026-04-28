'use client';
import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const plans = [
  { id: 'daily', name: '일일권', price: 9500, desc: '오늘 하루만 주문', badge: '', color: '#888' },
  { id: 'weekly', name: '주간 구독', price: 8500, originalPrice: 9500, desc: '월~금 5일 자동 예약', badge: '10% 할인', color: '#3B6D11' },
  { id: 'monthly', name: '월간 구독', price: 8075, originalPrice: 9500, desc: '한 달 자동 예약 · 최대 혜택', badge: '15% 할인 🔥', color: '#E67E22' },
];

export default function SubscriptionPage() {
  const [selected, setSelected] = useState('weekly');
  const [subscribed, setSubscribed] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    showToast('구독이 시작됐어요! 🎉');
  };

  const handleCancelConfirm = () => {
    setSubscribed(false);
    setShowCancelPopup(false);
    showToast('구독이 해지됐어요');
  };

  const selectedPlan = plans.find(p => p.id === selected)!;

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>구독 플랜</div>
          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>정기구독으로 더 저렴하게!</div>
        </div>

        {/* 토스트 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}

        {/* 현재 구독 상태 */}
        {subscribed && (
          <div style={{ margin: '16px 16px 0', background: '#E8F5D8', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11' }}>✅ 구독 중 — {selectedPlan.name}</div>
              <div style={{ fontSize: 12, color: '#5A8A2A', marginTop: 2 }}>매일 자동 예약되고 있어요</div>
            </div>
            <button onClick={() => setShowCancelPopup(true)} style={{ fontSize: 11, color: '#C0392B', background: 'none', border: '1px solid #C0392B', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>해지</button>
          </div>
        )}

        {/* 플랜 선택 */}
        <div style={{ margin: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#3B6D11', marginBottom: 4 }}>📋 플랜 선택</div>
          {plans.map(plan => (
            <div key={plan.id} onClick={() => setSelected(plan.id)}
              style={{ background: '#fff', borderRadius: 12, padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: selected === plan.id ? `2px solid ${plan.color}` : '2px solid transparent', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{plan.name}</div>
                    {plan.badge && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: plan.color, color: '#fff', padding: '2px 7px', borderRadius: 10 }}>{plan.badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{plan.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {'originalPrice' in plan && (
                    <div style={{ fontSize: 11, color: '#bbb', textDecoration: 'line-through' }}>{(plan as any).originalPrice.toLocaleString()}원</div>
                  )}
                  <div style={{ fontSize: 16, fontWeight: 800, color: plan.color }}>{plan.price.toLocaleString()}원</div>
                </div>
              </div>
              {selected === plan.id && (
                <div style={{ marginTop: 10, width: 20, height: 20, borderRadius: '50%', background: plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' }}>
                  <div style={{ color: '#fff', fontSize: 12 }}>✓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 혜택 안내 */}
        <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🎁 구독 혜택</div>
          {['매일 자동 예약 — 주문 걱정 없어요', '정기구독 할인 최대 15%', '픽업 시간 언제든 변경 가능', '구독 언제든지 해지 가능'].map((benefit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, color: '#555' }}>
              <div style={{ color: '#3B6D11', fontWeight: 700 }}>✓</div>
              {benefit}
            </div>
          ))}
        </div>

        {/* 구독 버튼 */}
        {!subscribed && (
          <div style={{ margin: '0 16px 16px' }}>
            <button onClick={handleSubscribe} style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              {selectedPlan.name} 구독 시작하기
            </button>
          </div>
        )}

        {/* 해지 확인 팝업 */}
        {showCancelPopup && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px', margin: '0 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>구독을 해지할까요?</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>해지하면 자동 예약이 중단돼요</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>남은 기간은 계속 이용 가능해요</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setShowCancelPopup(false)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>돌아가기</button>
                <button onClick={handleCancelConfirm} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: '#C0392B', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>해지하기</button>
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
}