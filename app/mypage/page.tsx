'use client';
import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const initialOrders = [
  { id: 1, date: '4/23 (목)', menu: '불고기 덮밥', time: '12:00', status: '예약완료', price: 9500 },
  { id: 2, date: '4/24 (금)', menu: '닭갈비 덮밥', time: '12:30', status: '예약완료', price: 9500 },
  { id: 3, date: '4/22 (화)', menu: '닭가슴살 샐러드', time: '11:30', status: '픽업완료', price: 8500 },
];

const timeSlots = ['11:30', '12:00', '12:30', '13:00'];

export default function MyPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [changeTimeId, setChangeTimeId] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleCancel = (id: number) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: '취소됨' } : o));
    setCancelId(null);
    showToast('주문이 취소됐어요');
  };

  const handleTimeChange = (id: number, newTime: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, time: newTime } : o));
    setChangeTimeId(null);
    showToast(`픽업 시간이 ${newTime}으로 변경됐어요 ✅`);
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>마이페이지</div>
        </div>

        {/* 토스트 메시지 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            {toast}
          </div>
        )}

        {/* 프로필 */}
        <div style={{ background: '#fff', margin: '12px 16px', borderRadius: 12, padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#3B6D11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>홍길동 님</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>hong@example.com</div>
          </div>
        </div>

        {/* 주문 내역 */}
        <div style={{ margin: '0 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#3B6D11', marginBottom: 8 }}>📋 주문 내역</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orders.map(order => (
              <div key={order.id} style={{ background: '#fff', borderRadius: 12, padding: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{order.menu}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{order.date} · 픽업 {order.time}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{order.price.toLocaleString()}원</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                      background: order.status === '예약완료' ? '#E8F5D8' : order.status === '픽업완료' ? '#E8EEF5' : '#FFE8E8',
                      color: order.status === '예약완료' ? '#3B6D11' : order.status === '픽업완료' ? '#3B5A8A' : '#C0392B'
                    }}>{order.status}</span>
                    {order.status === '예약완료' && (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setChangeTimeId(order.id)} style={{ fontSize: 11, color: '#3B6D11', background: 'none', border: '1px solid #3B6D11', borderRadius: 6, padding: '3px 8px', cursor: 'pointer' }}>시간변경</button>
                        <button onClick={() => setCancelId(order.id)} style={{ fontSize: 11, color: '#C0392B', background: 'none', border: '1px solid #C0392B', borderRadius: 6, padding: '3px 8px', cursor: 'pointer' }}>취소</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 취소 확인 팝업 */}
        {cancelId && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px', margin: '0 32px', textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>주문을 취소할까요?</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>취소 후에는 되돌릴 수 없어요</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setCancelId(null)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>돌아가기</button>
                <button onClick={() => handleCancel(cancelId)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: '#C0392B', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>취소하기</button>
              </div>
            </div>
          </div>
        )}

        {/* 시간변경 팝업 */}
        {changeTimeId && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px', margin: '0 32px', maxWidth: 320 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>픽업 시간 변경</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 16, textAlign: 'center' }}>변경할 시간을 선택해주세요</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {timeSlots.map(t => (
                  <button key={t} onClick={() => handleTimeChange(changeTimeId, t)} style={{ padding: '12px', borderRadius: 10, border: '1px solid #ddd', background: orders.find(o => o.id === changeTimeId)?.time === t ? '#3B6D11' : '#fff', color: orders.find(o => o.id === changeTimeId)?.time === t ? '#fff' : '#333', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={() => setChangeTimeId(null)} style={{ width: '100%', marginTop: 12, padding: '12px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>닫기</button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
}