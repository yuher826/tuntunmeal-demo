'use client';
import { useState } from 'react';

type Tab = 'menu' | 'order' | 'member' | 'pickup' | 'stats' | 'notice';

const initialMenus = [
  { id: 1, name: '불고기 덮밥', price: 9500, kcal: 520, stock: 50, soldOut: false },
  { id: 2, name: '닭가슴살 샐러드', price: 8500, kcal: 380, stock: 30, soldOut: false },
  { id: 3, name: '된장국 정식', price: 8000, kcal: 450, stock: 20, soldOut: true },
];

const initialOrders = [
  { id: 1, name: '홍길동', menu: '불고기 덮밥', time: '12:00', status: '예약완료', price: 9500 },
  { id: 2, name: '김철수', menu: '닭가슴살 샐러드', time: '12:30', status: '예약완료', price: 8500 },
  { id: 3, name: '이영희', menu: '불고기 덮밥', time: '11:30', status: '픽업완료', price: 9500 },
  { id: 4, name: '박민준', menu: '된장국 정식', time: '13:00', status: '취소됨', price: 8000 },
];

const initialMembers = [
  { id: 1, name: '홍길동', phone: '010-1234-5678', sub: '주간구독', orders: 12, last: '4/23' },
  { id: 2, name: '김철수', phone: '010-2345-6789', sub: '없음', orders: 3, last: '4/22' },
  { id: 3, name: '이영희', phone: '010-3456-7890', sub: '월간구독', orders: 28, last: '4/23' },
  { id: 4, name: '박민준', phone: '010-4567-8901', sub: '없음', orders: 1, last: '4/20' },
];

const UNDO_SECONDS = 7;

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('menu');
  const [menus, setMenus] = useState(initialMenus);
  const [orders, setOrders] = useState(initialOrders);
  const [toast, setToast] = useState('');
  const [undoInfo, setUndoInfo] = useState<{ id: number; prevStatus: string; countdown: number } | null>(null);
  const [undoTimer, setUndoTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [newMenu, setNewMenu] = useState({ name: '', price: '', kcal: '', stock: '' });
  const [notice, setNotice] = useState('');
  const [notices, setNotices] = useState(['오늘 메뉴: 불고기 덮밥 / 닭가슴살 샐러드', '4/30(목) 메뉴 등록 예정입니다.']);
  const [qrInput, setQrInput] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const startUndo = (id: number, prevStatus: string, newStatus: string) => {
    // 이전 타이머 정리
    if (undoTimer) clearInterval(undoTimer);

    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    setUndoInfo({ id, prevStatus, countdown: UNDO_SECONDS });

    const timer = setInterval(() => {
      setUndoInfo(prev => {
        if (!prev) return null;
        if (prev.countdown <= 1) {
          clearInterval(timer);
          return null;
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);

    setUndoTimer(timer);
  };

  const handleUndo = () => {
    if (!undoInfo) return;
    if (undoTimer) clearInterval(undoTimer);
    setOrders(prev => prev.map(o => o.id === undoInfo.id ? { ...o, status: undoInfo.prevStatus } : o));
    setUndoInfo(null);
    showToast('되돌렸어요! ↩️');
  };

  const toggleSoldOut = (id: number) => {
    setMenus(menus.map(m => {
      if (m.id === id) {
        const next = !m.soldOut;
        showToast(next ? `${m.name} 품절 처리됐어요` : `${m.name} 품절 해제됐어요 ✅`);
        return { ...m, soldOut: next };
      }
      return m;
    }));
  };

  const deleteMenu = (id: number) => {
    setMenus(menus.filter(m => m.id !== id));
    showToast('메뉴가 삭제됐어요');
  };

  const addMenu = () => {
    if (!newMenu.name || !newMenu.price) return;
    setMenus([...menus, {
      id: Date.now(), name: newMenu.name,
      price: Number(newMenu.price), kcal: Number(newMenu.kcal),
      stock: Number(newMenu.stock), soldOut: false
    }]);
    setNewMenu({ name: '', price: '', kcal: '', stock: '' });
    setShowMenuForm(false);
    showToast('메뉴가 등록됐어요! ✅');
  };

  const handleQrScan = () => {
    if (!qrInput) return;
    showToast(`주문번호 ${qrInput} 픽업 완료 처리됐어요! ✅`);
    setQrInput('');
  };

  const addNotice = () => {
    if (!notice.trim()) return;
    setNotices([notice, ...notices]);
    setNotice('');
    showToast('공지사항이 등록됐어요 ✅');
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'menu', label: '메뉴관리', icon: '🍱' },
    { id: 'order', label: '주문관리', icon: '📋' },
    { id: 'member', label: '회원관리', icon: '👥' },
    { id: 'pickup', label: '픽업관리', icon: '📦' },
    { id: 'stats', label: '매출통계', icon: '📈' },
    { id: 'notice', label: '공지/이벤트', icon: '📢' },
  ];

  const totalRevenue = orders.filter(o => o.status !== '취소됨').reduce((sum, o) => sum + o.price, 0);
  const completedCount = orders.filter(o => o.status === '픽업완료').length;
  const reservedCount = orders.filter(o => o.status === '예약완료').length;

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480, background: '#fff', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#1a3a5c', color: '#fff', padding: '16px' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>🏢 튼튼밀 관리자</div>
          <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>2026년 4월 29일 (수) · 오늘 주문 {orders.filter(o => o.status !== '취소됨').length}건</div>
        </div>

        {/* 되돌리기 배너 */}
        {undoInfo && (
          <div style={{ background: '#2c3e50', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 13 }}>
              처리됐어요 · <span style={{ color: '#f39c12', fontWeight: 700 }}>{undoInfo.countdown}초</span> 안에 되돌리기 가능
            </div>
            <button onClick={handleUndo}
              style={{ background: '#f39c12', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              ↩️ 되돌리기
            </button>
          </div>
        )}

        {/* 토스트 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}

        {/* 탭 */}
        <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '2px solid #eee', background: '#fff' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: '0 0 auto', padding: '10px 14px', border: 'none', background: 'none', fontSize: 11, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? '#1a3a5c' : '#999', borderBottom: tab === t.id ? '2px solid #1a3a5c' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '16px' }}>

          {/* ── 메뉴관리 ── */}
          {tab === 'menu' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>오늘의 메뉴</div>
                <button onClick={() => setShowMenuForm(!showMenuForm)}
                  style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  + 메뉴 등록
                </button>
              </div>

              {showMenuForm && (
                <div style={{ background: '#f9fdf5', border: '1px solid #d5e8c4', borderRadius: 12, padding: '14px', marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#3B6D11' }}>새 메뉴 등록</div>
                  {[
                    { label: '메뉴 이름', key: 'name', placeholder: '예) 제육볶음 덮밥' },
                    { label: '가격 (원)', key: 'price', placeholder: '예) 9500' },
                    { label: '칼로리 (kcal)', key: 'kcal', placeholder: '예) 520' },
                    { label: '수량', key: 'stock', placeholder: '예) 50' },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: '#555', marginBottom: 3 }}>{f.label}</div>
                      <input value={(newMenu as any)[f.key]} onChange={e => setNewMenu({ ...newMenu, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button onClick={() => setShowMenuForm(false)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>취소</button>
                    <button onClick={addMenu} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>등록하기</button>
                  </div>
                </div>
              )}

              {menus.map(menu => (
                <div key={menu.id} style={{ background: '#f9f9f9', borderRadius: 12, padding: '14px', marginBottom: 10, opacity: menu.soldOut ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{menu.name}</div>
                        {menu.soldOut && <span style={{ fontSize: 9, background: '#FFE8E8', color: '#C0392B', padding: '2px 6px', borderRadius: 8, fontWeight: 700 }}>품절</span>}
                      </div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{menu.price.toLocaleString()}원 · {menu.kcal}kcal · 잔여 {menu.stock}개</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => toggleSoldOut(menu.id)}
                        style={{ padding: '6px 10px', borderRadius: 7, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: menu.soldOut ? '#E8F5D8' : '#FFE8E8', color: menu.soldOut ? '#3B6D11' : '#C0392B' }}>
                        {menu.soldOut ? '해제' : '품절'}
                      </button>
                      <button onClick={() => deleteMenu(menu.id)}
                        style={{ padding: '6px 10px', borderRadius: 7, border: '1px solid #ddd', background: '#fff', fontSize: 11, cursor: 'pointer', color: '#888' }}>
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 주문관리 ── */}
          {tab === 'order' && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[
                  { label: '예약완료', count: reservedCount, color: '#3B6D11', bg: '#E8F5D8' },
                  { label: '픽업완료', count: completedCount, color: '#1a5276', bg: '#EBF5FB' },
                  { label: '총 매출', count: `${totalRevenue.toLocaleString()}원`, color: '#6c3483', bg: '#F5EEF8' },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, background: s.bg, borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: s.color }}>{s.count}</div>
                    <div style={{ fontSize: 10, color: s.color, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {orders.map(order => (
                <div key={order.id} style={{ background: '#f9f9f9', borderRadius: 12, padding: '12px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{order.name}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{order.menu} · 픽업 {order.time}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                        background: order.status === '예약완료' ? '#E8F5D8' : order.status === '픽업완료' ? '#EBF5FB' : '#FFE8E8',
                        color: order.status === '예약완료' ? '#3B6D11' : order.status === '픽업완료' ? '#1a5276' : '#C0392B' }}>
                        {order.status}
                      </span>
                      {order.status === '예약완료' && (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button onClick={() => startUndo(order.id, '예약완료', '픽업완료')}
                            style={{ fontSize: 10, background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 5, padding: '3px 7px', cursor: 'pointer' }}>픽업완료</button>
                          <button onClick={() => startUndo(order.id, '예약완료', '취소됨')}
                            style={{ fontSize: 10, color: '#C0392B', background: 'none', border: '1px solid #C0392B', borderRadius: 5, padding: '3px 7px', cursor: 'pointer' }}>취소</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 회원관리 ── */}
          {tab === 'member' && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>회원 목록 ({initialMembers.length}명)</div>
              {initialMembers.map(m => (
                <div key={m.id} style={{ background: '#f9f9f9', borderRadius: 12, padding: '12px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{m.phone}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>총 {m.orders}건 · 마지막 {m.last}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 10,
                      background: m.sub !== '없음' ? '#E8F5D8' : '#f5f5f5',
                      color: m.sub !== '없음' ? '#3B6D11' : '#999' }}>
                      {m.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 픽업관리 ── */}
          {tab === 'pickup' && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>QR 픽업 처리</div>
              <div style={{ background: '#f9fdf5', border: '1px solid #d5e8c4', borderRadius: 12, padding: '16px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>주문번호 입력 (QR 스캔 시 자동입력)</div>
                <input value={qrInput} onChange={e => setQrInput(e.target.value)}
                  placeholder="주문번호 입력"
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box', marginBottom: 8 }} />
                <button onClick={handleQrScan}
                  style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  픽업 완료 처리 ✅
                </button>
              </div>

              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>오늘 픽업 현황</div>
              {[
                { time: '11:30', total: 3, done: 3 },
                { time: '12:00', total: 8, done: 5 },
                { time: '12:30', total: 6, done: 2 },
                { time: '13:00', total: 2, done: 0 },
              ].map(t => (
                <div key={t.time} style={{ background: '#f9f9f9', borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.time}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{t.done}/{t.total}명 픽업완료</div>
                  </div>
                  <div style={{ marginTop: 8, height: 6, background: '#eee', borderRadius: 3 }}>
                    <div style={{ width: `${(t.done/t.total)*100}%`, height: '100%', background: '#3B6D11', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 매출통계 ── */}
          {tab === 'stats' && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>오늘 매출 요약</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {[
                  { label: '총 매출', value: `${totalRevenue.toLocaleString()}원`, color: '#3B6D11' },
                  { label: '총 주문', value: `${orders.filter(o=>o.status!=='취소됨').length}건`, color: '#1a5276' },
                  { label: '픽업완료', value: `${completedCount}건`, color: '#6c3483' },
                  { label: '취소', value: `${orders.filter(o=>o.status==='취소됨').length}건`, color: '#C0392B' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#f9f9f9', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>인기 메뉴 순위</div>
              {[
                { rank: 1, name: '불고기 덮밥', count: 18, rate: 90 },
                { rank: 2, name: '닭가슴살 샐러드', count: 12, rate: 60 },
                { rank: 3, name: '된장국 정식', count: 8, rate: 40 },
              ].map(m => (
                <div key={m.rank} style={{ background: '#f9f9f9', borderRadius: 10, padding: '12px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>#{m.rank} {m.name}</div>
                    <div style={{ fontSize: 12, color: '#3B6D11', fontWeight: 700 }}>{m.count}건</div>
                  </div>
                  <div style={{ height: 6, background: '#eee', borderRadius: 3 }}>
                    <div style={{ width: `${m.rate}%`, height: '100%', background: '#3B6D11', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── 공지/이벤트 ── */}
          {tab === 'notice' && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>공지사항 등록</div>
              <div style={{ background: '#f9fdf5', border: '1px solid #d5e8c4', borderRadius: 12, padding: '14px', marginBottom: 16 }}>
                <textarea value={notice} onChange={e => setNotice(e.target.value)}
                  placeholder="공지 내용을 입력하세요"
                  rows={3}
                  style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box', resize: 'none', marginBottom: 8 }} />
                <button onClick={addNotice}
                  style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  📢 공지 등록하기
                </button>
              </div>

              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>등록된 공지</div>
              {notices.map((n, i) => (
                <div key={i} style={{ background: '#f9f9f9', borderRadius: 10, padding: '12px 14px', marginBottom: 8, fontSize: 13, color: '#333', borderLeft: '3px solid #3B6D11' }}>
                  {n}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}