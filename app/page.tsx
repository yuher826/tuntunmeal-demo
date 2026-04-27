'use client';

import { useState, useEffect } from 'react';

export default function Home() {
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
  const canOrder = selectedMenu !== null && selectedTime !== null;

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F7F5EF', minHeight: '100vh', width: '100%', maxWidth: 430, position: 'relative' }}>

        {/* 헤더 */}
        <div style={{ background: '#1A1A1A', padding: '10px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>튼튼밀</div>
              <div style={{ fontSize: 9, color: '#9FE1CB', letterSpacing: 2 }}>TUNTUNMEAL</div>
            </div>
            <div style={{ background: '#3B6D11', borderRadius: 14, padding: '4px 12px', fontSize: 10, fontWeight: 700, color: '#C0DD97' }}>
              AM 5:00 부터
            </div>
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
            <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 8 }}>2가지 선택</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {menus.map(menu => (
              <div key={menu.id} onClick={() => setSelectedMenu(menu.id)}
                style={{ background: '#fff', border: `2px solid ${selectedMenu === menu.id ? '#3B6D11' : '#eee'}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 70, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{menu.emoji}</div>
                <div style={{ padding: '8px 10px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{menu.name}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{menu.kcal}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginTop: 3 }}>{menu.price}</div>
                  {selectedMenu === menu.id && (
                    <div style={{ background: '#3B6D11', color: '#fff', fontSize: 9, fontWeight: 700, textAlign: 'center', padding: 2, borderRadius: 4, marginTop: 4 }}>✓ 선택됨</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 픽업 시간 */}
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>픽업 시간</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {times.map(t => (
              <div key={t} onClick={() => setSelectedTime(t)}
                style={{ padding: '8px 14px', border: `1.5px solid ${selectedTime === t ? '#3B6D11' : '#ddd'}`, borderRadius: 20, fontSize: 12, cursor: 'pointer', background: selectedTime === t ? '#3B6D11' : '#fff', color: selectedTime === t ? '#fff' : '#333', fontWeight: selectedTime === t ? 700 : 400 }}>
                {t}
              </div>
            ))}
          </div>

          {/* 주문 버튼 */}
          <button disabled={!canOrder}
            style={{ width: '100%', padding: 14, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: canOrder ? 'pointer' : 'default', background: canOrder ? '#3B6D11' : '#B4B2A9', color: '#fff', marginBottom: 10 }}>
            {canOrder ? `${menus.find(m => m.id === selectedMenu)?.name} · ${selectedTime} 예약하기 →` : '메뉴와 시간을 선택하세요'}
          </button>

          {/* 바로가기 카드 */}
          <div style={{ background: '#EAF3DE', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: '1px solid #C0DD97', marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, background: '#3B6D11', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📅</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#27500A' }}>메뉴 달력 미리보기</div>
              <div style={{ fontSize: 9, color: '#639922' }}>내일~이번달 전체 메뉴 확인</div>
            </div>
            <div style={{ color: '#3B6D11' }}>›</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: '1px solid #eee', marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, background: '#27500A', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🔄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>정기구독</div>
              <div style={{ fontSize: 9, color: '#888' }}>매일 자동 예약 · 5% 할인</div>
            </div>
            <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 7 }}>5%↓</span>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: '1px solid #eee', marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, background: '#185FA5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏢</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>기업 단체계약 B2B</div>
              <div style={{ fontSize: 9, color: '#888' }}>10인 이상 · 더보기 탭</div>
            </div>
            <div style={{ color: '#aaa' }}>›</div>
          </div>
        </div>

        {/* 하단 탭바 */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
          {[['🏠','홈'], ['📅','메뉴달력'], ['🔄','구독'], ['👤','마이'], ['☰','더보기']].map(([icon, label], i) => (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
              <div style={{ fontSize: 18 }}>{icon}</div>
              <div style={{ fontSize: 9, color: i === 0 ? '#3B6D11' : '#B4B2A9', fontWeight: i === 0 ? 700 : 400 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}