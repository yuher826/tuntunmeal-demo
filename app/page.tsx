'use client';
import BottomNav from './components/BottomNav';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const kst = new Date(now.getTime() + (9 * 60 - now.getTimezoneOffset()) * 60000);
      const deadline = new Date(kst);
      deadline.setHours(10, 0, 0, 0);
      if (kst >= deadline) deadline.setDate(deadline.getDate() + 1);
      const diff = deadline.getTime() - kst.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menus = [
    { id: 1, name: '불고기 덮밥', kcal: '520kcal', price: '9,500원', emoji: '🍖' },
    { id: 2, name: '닭가슴살 샐러드', kcal: '380kcal', price: '8,500원', emoji: '🥗' },
  ];

  const times = ['11:30', '12:00', '12:30', '13:00'];

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#2C3E1A', padding: '16px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>튼튼밀</div>
            <div style={{ fontSize: 9, color: '#9FE1CB', letterSpacing: 2 }}>TUNTUNMEAL</div>
          </div>
          <div style={{ background: '#3B6D11', borderRadius: 14, padding: '4px 12px', fontSize: 10, fontWeight: 700, color: '#fff' }}>
            AM 5:00 부터
          </div>
        </div>

        {/* 타이머 */}
        <div style={{ background: '#2C3E1A', padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#9FE1CB', marginBottom: 4 }}>오전 10:00 마감까지</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: 3 }}>{timeLeft || '--:--:--'}</div>
        </div>

        {/* 메뉴 선택 */}
        <div style={{ padding: '14px 14px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>오늘의 메뉴</span>
            <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 10 }}>2가지 선택</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {menus.map(menu => (
              <div key={menu.id} onClick={() => setSelectedMenu(menu.id)}
                style={{ background: '#fff', border: `2px solid ${selectedMenu === menu.id ? '#3B6D11' : '#eee'}`, borderRadius: 12, cursor: 'pointer', overflow: 'hidden' }}>
                <div style={{ height: 70, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  {menu.emoji}
                </div>
                <div style={{ padding: '8px 10px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{menu.name}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{menu.kcal}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginTop: 3 }}>{menu.price}</div>
                  {selectedMenu === menu.id && (
                    <div style={{ background: '#3B6D11', color: '#fff', fontSize: 9, fontWeight: 700, textAlign: 'center', borderRadius: 4, marginTop: 4, padding: '2px 0' }}>선택됨 ✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 픽업 시간 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>픽업 시간</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {times.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: selectedTime === t ? '2px solid #3B6D11' : '1px solid #ddd', background: selectedTime === t ? '#E8F5D8' : '#fff', color: selectedTime === t ? '#3B6D11' : '#555', fontSize: 12, fontWeight: selectedTime === t ? 700 : 400, cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 주문 버튼 */}
          <button
            onClick={() => { if (selectedMenu && selectedTime) router.push('/payment'); }}
            disabled={!selectedMenu || !selectedTime}
            style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: selectedMenu && selectedTime ? '#3B6D11' : '#ddd', color: '#fff', fontSize: 15, fontWeight: 800, cursor: selectedMenu && selectedTime ? 'pointer' : 'default', marginBottom: 14 }}>
            {selectedMenu && selectedTime ? '주문하기 →' : '메뉴와 시간을 선택하세요'}
          </button>

          {/* 메뉴 달력 */}
          <div onClick={() => router.push('/calendar')} style={{ background: '#fff', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, background: '#EAF3DE', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📅</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>메뉴 달력 미리보기</div>
                <div style={{ fontSize: 10, color: '#888' }}>내일~이번 달 전체 메뉴 확인</div>
              </div>
            </div>
            <span style={{ color: '#ccc' }}>›</span>
          </div>

          <div onClick={() => router.push('/subscription')} style={{ background: '#fff', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, background: '#EAF3DE', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📋</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>정기구독</div>
                <div style={{ fontSize: 10, color: '#888' }}>매일 자동 예약 · 5% 할인</div>
              </div>
            </div>
            <span style={{ color: '#ccc' }}>›</span>
          </div>

          <div onClick={() => router.push('/b2b')} style={{ background: '#fff', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, background: '#185FA5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏢</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>기업 단체계약 B2B</div>
                <div style={{ fontSize: 10, color: '#888' }}>10인 이상 · 매니저 담당</div>
              </div>
            </div>
            <span style={{ color: '#ccc' }}>›</span>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}