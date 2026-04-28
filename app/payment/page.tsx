'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../components/BottomNav';

export default function PaymentPage() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const menu = { name: '불고기 덮밥', price: 9500, cal: 620 };
  const timeSlots = ['11:30', '12:00', '12:30', '13:00'];

  const handlePay = () => {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/confirm');
    }, 1500);
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: 0 }}>←</button>
          <div style={{ fontSize: 18, fontWeight: 700 }}>주문 결제</div>
        </div>

        {/* 주문 메뉴 */}
        <div style={{ margin: '16px', background: '#fff', borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginBottom: 12 }}>🍱 주문 메뉴</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{menu.name}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{menu.cal}kcal</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#3B6D11' }}>{menu.price.toLocaleString()}원</div>
          </div>
        </div>

        {/* 픽업 시간 */}
        <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginBottom: 12 }}>⏰ 픽업 시간 선택</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {timeSlots.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: selectedTime === t ? '2px solid #3B6D11' : '1px solid #ddd', background: selectedTime === t ? '#E8F5D8' : '#fff', color: selectedTime === t ? '#3B6D11' : '#555', fontSize: 13, fontWeight: selectedTime === t ? 700 : 400, cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 결제 수단 */}
        <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginBottom: 12 }}>💳 결제 수단</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { id: 'card', label: '신용/체크카드', icon: '💳' },
              { id: 'kakao', label: '카카오페이', icon: '💛' },
              { id: 'naver', label: '네이버페이', icon: '💚' },
              { id: 'toss', label: '토스페이', icon: '💙' },
            ].map(pay => (
              <div key={pay.id} onClick={() => setSelectedPayment(pay.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 10, border: selectedPayment === pay.id ? '2px solid #3B6D11' : '1px solid #eee', background: selectedPayment === pay.id ? '#F0F9E8' : '#fff', cursor: 'pointer' }}>
                <span style={{ fontSize: 20 }}>{pay.icon}</span>
                <span style={{ fontSize: 14, fontWeight: selectedPayment === pay.id ? 700 : 400 }}>{pay.label}</span>
                {selectedPayment === pay.id && <span style={{ marginLeft: 'auto', color: '#3B6D11', fontWeight: 700 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* 결제 금액 */}
        <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, padding: '16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginBottom: 12 }}>💰 결제 금액</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#555' }}>
            <span>메뉴 금액</span>
            <span>{menu.price.toLocaleString()}원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#555' }}>
            <span>배달비</span>
            <span style={{ color: '#3B6D11', fontWeight: 700 }}>무료</span>
          </div>
          <div style={{ height: 1, background: '#eee', margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800 }}>
            <span>총 결제금액</span>
            <span style={{ color: '#3B6D11' }}>{menu.price.toLocaleString()}원</span>
          </div>
        </div>

        {/* 동의 */}
        <div style={{ margin: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div onClick={() => setAgreed(!agreed)}
            style={{ width: 20, height: 20, borderRadius: 4, border: agreed ? 'none' : '2px solid #ddd', background: agreed ? '#3B6D11' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            {agreed && <span style={{ color: '#fff', fontSize: 13 }}>✓</span>}
          </div>
          <span style={{ fontSize: 12, color: '#888' }}>주문 내용을 확인했으며 결제에 동의합니다</span>
        </div>

        {/* 결제 버튼 */}
        <div style={{ margin: '0 16px 32px' }}>
          <button onClick={handlePay} disabled={!agreed || loading}
            style={{ width: '100%', padding: '18px', borderRadius: 12, border: 'none', background: agreed ? '#3B6D11' : '#ddd', color: '#fff', fontSize: 16, fontWeight: 800, cursor: agreed ? 'pointer' : 'default' }}>
            {loading ? '결제 처리 중...' : `${menu.price.toLocaleString()}원 결제하기`}
          </button>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}