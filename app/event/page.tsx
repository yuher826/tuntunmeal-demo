'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../components/BottomNav';

const coupons = [
  { id: 1, title: '첫 주문 할인', desc: '첫 주문 시 1,000원 할인', expire: '2026.05.31', used: false, color: '#3B6D11' },
  { id: 2, title: '친구 초대 혜택', desc: '친구 초대 성공 시 500원 할인', expire: '2026.05.15', used: false, color: '#185FA5' },
  { id: 3, title: '생일 쿠폰', desc: '생일 달 10% 할인', expire: '2026.04.30', used: true, color: '#888' },
];

const events = [
  {
    id: 1, title: '🎉 오픈 기념 이벤트', badge: '진행중',
    desc: '튼튼밀 오픈 기념! 5월 한 달간 모든 메뉴 10% 할인',
    period: '2026.05.01 ~ 2026.05.31', color: '#3B6D11',
  },
  {
    id: 2, title: '👥 친구 초대 이벤트', badge: '진행중',
    desc: '친구 초대하면 나도 500P, 친구도 500P!',
    period: '2026.04.01 ~ 2026.06.30', color: '#185FA5',
  },
  {
    id: 3, title: '📅 출석체크 이벤트', badge: '진행중',
    desc: '매일 출석체크하고 포인트 받아가세요!',
    period: '2026.04.01 ~ 2026.12.31', color: '#8e44ad',
  },
  {
    id: 4, title: '🌸 봄맞이 샐러드 할인', badge: '종료',
    desc: '봄 시즌 닭가슴살 샐러드 500원 할인',
    period: '2026.03.01 ~ 2026.03.31', color: '#888',
  },
];

export default function EventPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'event' | 'coupon' | 'attend'>('event');
  const [attendance, setAttendance] = useState<number[]>([]);
  const [toast, setToast] = useState('');
  const [usedCoupons, setUsedCoupons] = useState<number[]>([3]);

  const today = new Date().getDate();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAttend = (day: number) => {
    if (attendance.includes(day)) return;
    if (day !== today) return;
    setAttendance([...attendance, day]);
    showToast('출석 완료! +50P 적립됐어요 🎉');
  };

  const handleCoupon = (id: number) => {
    if (usedCoupons.includes(id)) return;
    setUsedCoupons([...usedCoupons, id]);
    showToast('쿠폰이 사용됐어요! ✅');
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: 0 }}>←</button>
          <div style={{ fontSize: 18, fontWeight: 700 }}>이벤트 · 쿠폰</div>
        </div>

        {/* 토스트 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}

        {/* 탭 */}
        <div style={{ display: 'flex', background: '#fff', borderBottom: '2px solid #eee' }}>
          {[
            { id: 'event', label: '🎁 이벤트' },
            { id: 'coupon', label: '🎟️ 쿠폰함' },
            { id: 'attend', label: '📅 출석체크' },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              style={{ flex: 1, padding: '12px 0', border: 'none', background: 'none', fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? '#3B6D11' : '#999', borderBottom: activeTab === t.id ? '2px solid #3B6D11' : '2px solid transparent', cursor: 'pointer' }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '12px 16px' }}>

          {/* 이벤트 탭 */}
          {activeTab === 'event' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {events.map(ev => (
                <div key={ev.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: ev.badge === '종료' ? 0.6 : 1 }}>
                  <div style={{ background: ev.color, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{ev.title}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, background: ev.badge === '진행중' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>{ev.badge}</span>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 13, color: '#333', marginBottom: 6 }}>{ev.desc}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>📅 {ev.period}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 쿠폰함 탭 */}
          {activeTab === 'coupon' && (
            <div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
                사용 가능한 쿠폰 <span style={{ color: '#3B6D11', fontWeight: 700 }}>{coupons.filter(c => !usedCoupons.includes(c.id)).length}장</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {coupons.map(coupon => {
                  const isUsed = usedCoupons.includes(coupon.id);
                  return (
                    <div key={coupon.id} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: isUsed ? 0.5 : 1 }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: 8, background: isUsed ? '#ddd' : coupon.color }} />
                        <div style={{ flex: 1, padding: '14px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: isUsed ? '#999' : '#222' }}>{coupon.title}</div>
                              <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>{coupon.desc}</div>
                              <div style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>~{coupon.expire}</div>
                            </div>
                            <button onClick={() => handleCoupon(coupon.id)} disabled={isUsed}
                              style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: isUsed ? '#eee' : coupon.color, color: isUsed ? '#999' : '#fff', fontSize: 12, fontWeight: 700, cursor: isUsed ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                              {isUsed ? '사용완료' : '사용하기'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 친구 초대 */}
              <div style={{ marginTop: 16, background: '#E8F5D8', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginBottom: 4 }}>👥 친구 초대하고 쿠폰 받기</div>
                <div style={{ fontSize: 12, color: '#5A8A2A', marginBottom: 10 }}>초대 링크 공유 시 나도 500P, 친구도 500P!</div>
                <button style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => showToast('초대 링크가 복사됐어요! 📋')}>
                  초대 링크 복사하기
                </button>
              </div>
            </div>
          )}

          {/* 출석체크 탭 */}
          {activeTab === 'attend' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>📅 4월 출석체크</div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 14 }}>매일 출석체크하고 50P 받아가세요!</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                    const isDone = attendance.includes(day);
                    const isToday = day === today;
                    const isPast = day < today;
                    return (
                      <div key={day} onClick={() => handleAttend(day)}
                        style={{ aspectRatio: '1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: isToday ? 700 : 400, cursor: isToday && !isDone ? 'pointer' : 'default',
                          background: isDone ? '#3B6D11' : isToday ? '#E8F5D8' : '#f9f9f9',
                          color: isDone ? '#fff' : isToday ? '#3B6D11' : isPast ? '#ccc' : '#333',
                          border: isToday ? '2px solid #3B6D11' : '1px solid #eee' }}>
                        {isDone ? '✓' : day}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: '#E8F5D8', borderRadius: 12, padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11' }}>이번 달 출석</div>
                  <div style={{ fontSize: 12, color: '#5A8A2A', marginTop: 2 }}>{attendance.length}일 출석 · {attendance.length * 50}P 적립</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#3B6D11' }}>{attendance.length * 50}P</div>
              </div>
            </div>
          )}

        </div>

        <BottomNav />
      </div>
    </div>
  );
}