'use client';
import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const initialMenus = [
  { id: 1, name: '불고기 덮밥', price: 9500, stock: 50, soldOut: false },
  { id: 2, name: '닭가슴살 샐러드', price: 8500, stock: 30, soldOut: false },
  { id: 3, name: '된장국 정식', price: 8000, stock: 20, soldOut: true },
];

export default function AdminPage() {
  const [menus, setMenus] = useState(initialMenus);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
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

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>관리자 — 메뉴 관리</div>
          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>오늘 메뉴 품절 처리</div>
        </div>

        {/* 토스트 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            {toast}
          </div>
        )}

        {/* 메뉴 목록 */}
        <div style={{ margin: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {menus.map(menu => (
            <div key={menu.id} style={{ background: '#fff', borderRadius: 12, padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', opacity: menu.soldOut ? 0.6 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{menu.name}</div>
                    {menu.soldOut && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: '#FFE8E8', color: '#C0392B', padding: '2px 7px', borderRadius: 10 }}>품절</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{menu.price.toLocaleString()}원 · 잔여 {menu.stock}개</div>
                </div>
                <button
                  onClick={() => toggleSoldOut(menu.id)}
                  style={{
                    padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    background: menu.soldOut ? '#E8F5D8' : '#FFE8E8',
                    color: menu.soldOut ? '#3B6D11' : '#C0392B',
                  }}>
                  {menu.soldOut ? '품절해제' : '품절처리'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}