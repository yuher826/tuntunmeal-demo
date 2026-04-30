'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Tab = 'menu' | 'order' | 'member' | 'pickup' | 'stats' | 'notice';

const tabs = [
  { id: 'menu' as Tab, label: '메뉴관리', icon: '🍱' },
  { id: 'order' as Tab, label: '주문관리', icon: '📋' },
  { id: 'member' as Tab, label: '회원관리', icon: '👥' },
  { id: 'pickup' as Tab, label: '픽업관리', icon: '📦' },
  { id: 'stats' as Tab, label: '매출통계', icon: '📊' },
  { id: 'notice' as Tab, label: '공지·이벤트', icon: '📢' },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', borderRadius: 8,
  border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box',
};

type Menu = { id: number; name: string; price: number; kcal: number; stock: number; sold_out: boolean; image: string };
type Order = { id: number; member_name: string; menu_name: string; pickup_time: string; status: string; price: number };
type Member = { id: number; name: string; phone: string; subscription: string; total_orders: number; last_order: string };
type Notice = { id: number; type: string; title: string; date: string; published: boolean };

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('menu');

  // 메뉴
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [menuForm, setMenuForm] = useState({ name: '', price: '', kcal: '', stock: '', image: '' });
  const [menuLoading, setMenuLoading] = useState(false);

  // 주문
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState('전체');

  // 회원
  const [members, setMembers] = useState<Member[]>([]);

  // 픽업
  const [qrInput, setQrInput] = useState('');
  const [pickupLog, setPickupLog] = useState<string[]>([]);

  // 공지
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ type: '공지', title: '', date: '' });

  // 데이터 로드
  useEffect(() => { fetchMenus(); }, []);
  useEffect(() => { if (tab === 'order') fetchOrders(); }, [tab]);
  useEffect(() => { if (tab === 'member') fetchMembers(); }, [tab]);
  useEffect(() => { if (tab === 'notice') fetchNotices(); }, [tab]);

  const fetchMenus = async () => {
    const { data } = await supabase.from('menus').select('*').order('id');
    if (data) setMenus(data);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const fetchMembers = async () => {
    const { data } = await supabase.from('members').select('*').order('id');
    if (data) setMembers(data);
  };

  const fetchNotices = async () => {
    const { data } = await supabase.from('notices').select('*').order('id', { ascending: false });
    if (data) setNotices(data);
  };

  // 메뉴 저장
  const handleMenuSave = async () => {
    if (!menuForm.name || !menuForm.price) return;
    setMenuLoading(true);
    if (editingMenu) {
      await supabase.from('menus').update({
        name: menuForm.name, price: Number(menuForm.price),
        kcal: Number(menuForm.kcal), stock: Number(menuForm.stock), image: menuForm.image,
      }).eq('id', editingMenu.id);
    } else {
      await supabase.from('menus').insert({
        name: menuForm.name, price: Number(menuForm.price),
        kcal: Number(menuForm.kcal), stock: Number(menuForm.stock), image: menuForm.image,
      });
    }
    setMenuForm({ name: '', price: '', kcal: '', stock: '', image: '' });
    setEditingMenu(null);
    setShowMenuForm(false);
    setMenuLoading(false);
    fetchMenus();
  };

  const handleMenuEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setMenuForm({ name: menu.name, price: String(menu.price), kcal: String(menu.kcal), stock: String(menu.stock), image: menu.image });
    setShowMenuForm(true);
  };

  const handleMenuDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await supabase.from('menus').delete().eq('id', id);
    fetchMenus();
  };

  const handleSoldOutToggle = async (menu: Menu) => {
    await supabase.from('menus').update({ sold_out: !menu.sold_out }).eq('id', menu.id);
    fetchMenus();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setMenuForm(prev => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  // 픽업
  const handlePickupScan = async () => {
    if (!qrInput.trim()) return;
    setPickupLog(prev => [`✅ [${new Date().toLocaleTimeString()}] "${qrInput}" 픽업 완료`, ...prev]);
    await supabase.from('orders').update({ status: '픽업완료' }).eq('id', Number(qrInput));
    setQrInput('');
    if (tab === 'pickup') fetchOrders();
  };

  // 공지 저장
  const handleNoticeSave = async () => {
    if (!noticeForm.title || !noticeForm.date) return;
    await supabase.from('notices').insert({ type: noticeForm.type, title: noticeForm.title, date: noticeForm.date });
    setNoticeForm({ type: '공지', title: '', date: '' });
    setShowNoticeForm(false);
    fetchNotices();
  };

  const handleNoticeToggle = async (notice: Notice) => {
    await supabase.from('notices').update({ published: !notice.published }).eq('id', notice.id);
    fetchNotices();
  };

  const handleNoticeDelete = async (id: number) => {
    if (!confirm('삭제하시겠습니까?')) return;
    await supabase.from('notices').delete().eq('id', id);
    fetchNotices();
  };

  const filteredOrders = orderFilter === '전체' ? orders : orders.filter(o => o.status === orderFilter);

  const statusColor = (s: string) => {
    if (s === '예약완료') return '#3B6D11';
    if (s === '픽업완료') return '#185FA5';
    if (s === '취소됨') return '#999';
    return '#333';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'Pretendard, -apple-system, sans-serif' }}>

      {/* 헤더 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E8E8E8', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>🥗</span>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#1A1A1A' }}>튼튼밀 관리자</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#888' }}>관리자님 환영합니다</span>
          <button onClick={() => router.push('/')} style={{ fontSize: 12, color: '#fff', background: '#3B6D11', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }}>홈으로</button>
        </div>
      </div>

      {/* 탭 */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E8E8E8', display: 'flex', overflowX: 'auto', padding: '0 8px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: '0 0 auto', padding: '14px 18px', border: 'none', background: 'none',
            fontSize: 13, fontWeight: tab === t.id ? 700 : 400,
            color: tab === t.id ? '#3B6D11' : '#666',
            borderBottom: tab === t.id ? '2px solid #3B6D11' : '2px solid transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
          }}>
            <span>{t.icon}</span><span>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: 16, maxWidth: 600, margin: '0 auto', boxSizing: 'border-box' }}>

        {/* ── 메뉴관리 ── */}
        {tab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>오늘의 메뉴 ({menus.length})</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span onClick={() => router.push('/admin/menu-calendar')} style={{ fontSize: 11, color: '#185FA5', cursor: 'pointer' }}>📅 날짜별 지정</span>
                <button onClick={() => { setEditingMenu(null); setMenuForm({ name: '', price: '', kcal: '', stock: '', image: '' }); setShowMenuForm(v => !v); }}
                  style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>
                  + 메뉴 등록
                </button>
              </div>
            </div>

            {showMenuForm && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #E8E8E8', boxSizing: 'border-box' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{editingMenu ? '메뉴 수정' : '새 메뉴 등록'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                  <input placeholder="메뉴명" value={menuForm.name} onChange={e => setMenuForm({ ...menuForm, name: e.target.value })} style={inputStyle} />
                  <input placeholder="가격 (원)" value={menuForm.price} onChange={e => setMenuForm({ ...menuForm, price: e.target.value })} type="number" style={inputStyle} />
                  <input placeholder="칼로리 (kcal)" value={menuForm.kcal} onChange={e => setMenuForm({ ...menuForm, kcal: e.target.value })} type="number" style={inputStyle} />
                  <input placeholder="재고 수량" value={menuForm.stock} onChange={e => setMenuForm({ ...menuForm, stock: e.target.value })} type="number" style={inputStyle} />
                  <div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>📷 메뉴 사진</div>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={inputStyle} />
                    {menuForm.image && <img src={menuForm.image} alt="미리보기" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginTop: 8, display: 'block' }} />}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleMenuSave} disabled={menuLoading} style={{ background: menuLoading ? '#aaa' : '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 13, cursor: 'pointer', flex: 1 }}>
                    {menuLoading ? '저장 중...' : '저장'}
                  </button>
                  <button onClick={() => setShowMenuForm(false)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer' }}>취소</button>
                </div>
              </div>
            )}

            {menus.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '40px 0' }}>등록된 메뉴가 없어요</div>
            ) : (
              menus.map(menu => (
                <div key={menu.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #E8E8E8', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', background: '#F0F5EC', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    {menu.image ? <img src={menu.image} alt={menu.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🍱'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{menu.name}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{menu.price.toLocaleString()}원 · {menu.kcal}kcal · 재고 {menu.stock}개</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                    <button onClick={() => handleSoldOutToggle(menu)} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 700, background: menu.sold_out ? '#FFE5E5' : '#E8F5E0', color: menu.sold_out ? '#D32F2F' : '#3B6D11' }}>
                      {menu.sold_out ? '품절' : '판매중'}
                    </button>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => handleMenuEdit(menu)} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>수정</button>
                      <button onClick={() => handleMenuDelete(menu.id)} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, border: 'none', background: '#FFE5E5', color: '#D32F2F', cursor: 'pointer' }}>삭제</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── 주문관리 ── */}
        {tab === 'order' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
              {[
                { label: '전체 주문', value: orders.length, color: '#185FA5' },
                { label: '픽업완료', value: orders.filter(o => o.status === '픽업완료').length, color: '#3B6D11' },
                { label: '취소', value: orders.filter(o => o.status === '취소됨').length, color: '#D32F2F' },
              ].map(card => (
                <div key={card.label} style={{ background: '#fff', borderRadius: 10, padding: 10, textAlign: 'center', border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: card.color }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{card.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
              {['전체', '예약완료', '픽업완료', '취소됨'].map(f => (
                <button key={f} onClick={() => setOrderFilter(f)} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: orderFilter === f ? '#3B6D11' : '#f0f0f0', color: orderFilter === f ? '#fff' : '#333' }}>{f}</button>
              ))}
              <button onClick={() => window.print()} style={{ marginLeft: 'auto', fontSize: 12, padding: '5px 12px', borderRadius: 20, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>🖨️ 출력</button>
            </div>
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '40px 0' }}>주문이 없어요</div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #E8E8E8', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{order.member_name}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{order.menu_name} · {order.pickup_time} · {order.price?.toLocaleString()}원</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: statusColor(order.status), background: `${statusColor(order.status)}18`, padding: '3px 10px', borderRadius: 20, flexShrink: 0 }}>{order.status}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── 회원관리 ── */}
        {tab === 'member' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
              {[
                { label: '전체 회원', value: members.length },
                { label: '구독 회원', value: members.filter(m => m.subscription !== '없음').length },
                { label: '단골 (10+)', value: members.filter(m => m.total_orders >= 10).length },
              ].map(card => (
                <div key={card.label} style={{ background: '#fff', borderRadius: 10, padding: 10, textAlign: 'center', border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#3B6D11' }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{card.label}</div>
                </div>
              ))}
            </div>
            {members.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '40px 0' }}>등록된 회원이 없어요</div>
            ) : (
              members.map(member => (
                <div key={member.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #E8E8E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{member.phone}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>총 {member.total_orders}회 · 최근 {member.last_order}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 700, background: member.subscription !== '없음' ? '#E8F5E0' : '#F5F5F5', color: member.subscription !== '없음' ? '#3B6D11' : '#999' }}>{member.subscription}</span>
                    {member.total_orders >= 10 && <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 700 }}>⭐ 단골</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── 픽업관리 ── */}
        {tab === 'pickup' && (
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #E8E8E8' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📷 QR 스캔 픽업 처리</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="QR 코드 또는 주문번호" value={qrInput} onChange={e => setQrInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handlePickupScan()}
                  style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box' }} />
                <button onClick={handlePickupScan} style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>확인</button>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E8E8E8', marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📋 픽업 이력</div>
              {pickupLog.length === 0
                ? <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '20px 0' }}>처리된 픽업이 없습니다</div>
                : pickupLog.map((log, i) => <div key={i} style={{ fontSize: 12, color: '#444', padding: '6px 0', borderBottom: i < pickupLog.length - 1 ? '1px solid #F0F0F0' : 'none' }}>{log}</div>)
              }
            </div>
            <div style={{ background: '#FFF8E1', borderRadius: 12, padding: 14, border: '1px solid #FFE082' }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚠️ 미픽업 알림 대상</div>
              {orders.filter(o => o.status === '예약완료').map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '6px 0', borderBottom: '1px solid #FFE082' }}>
                  <span>{o.member_name} ({o.menu_name})</span>
                  <button style={{ fontSize: 11, background: '#F59E0B', color: '#fff', border: 'none', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', flexShrink: 0 }}>알림톡 발송</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 매출통계 ── */}
        {tab === 'stats' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
              {[
                { label: '오늘 매출', value: `${orders.filter(o => o.status !== '취소됨').reduce((s, o) => s + (o.price || 0), 0).toLocaleString()}원`, sub: `${orders.length}건` },
                { label: '전체 주문', value: `${orders.length}건`, sub: '누적' },
                { label: '구독 회원', value: `${members.filter(m => m.subscription !== '없음').length}명`, sub: '활성' },
                { label: '전체 메뉴', value: `${menus.length}개`, sub: '등록됨' },
              ].map(card => (
                <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #E8E8E8' }}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{card.label}</div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: '#3B6D11', marginTop: 2 }}>{card.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 공지·이벤트 ── */}
        {tab === 'notice' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>공지 · 이벤트 목록</div>
              <button onClick={() => setShowNoticeForm(v => !v)} style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>+ 등록</button>
            </div>
            {showNoticeForm && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, border: '1px solid #E8E8E8', boxSizing: 'border-box' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>새 공지 등록</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <select value={noticeForm.type} onChange={e => setNoticeForm({ ...noticeForm, type: e.target.value })} style={{ padding: 8, borderRadius: 8, border: '1px solid #ddd', fontSize: 13, flexShrink: 0 }}>
                    <option>공지</option>
                    <option>이벤트</option>
                  </select>
                  <input placeholder="날짜 (2025-05-01)" value={noticeForm.date} onChange={e => setNoticeForm({ ...noticeForm, date: e.target.value })}
                    style={{ flex: 1, minWidth: 0, padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box' }} />
                </div>
                <input placeholder="제목" value={noticeForm.title} onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })} style={{ ...inputStyle, marginBottom: 8 }} />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={handleNoticeSave} style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 0', fontSize: 13, cursor: 'pointer', flex: 1 }}>저장</button>
                  <button onClick={() => setShowNoticeForm(false)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer' }}>취소</button>
                </div>
              </div>
            )}
            {notices.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '40px 0' }}>등록된 공지가 없어요</div>
            ) : (
              notices.map(notice => (
                <div key={notice.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #E8E8E8', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 11, padding: '2px 7px', borderRadius: 20, fontWeight: 700, background: notice.type === '공지' ? '#E8F5E0' : '#FFF3E0', color: notice.type === '공지' ? '#3B6D11' : '#F57C00', flexShrink: 0 }}>{notice.type}</span>
                      <span style={{ fontSize: 12, color: '#888' }}>{notice.date}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{notice.title}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                    <button onClick={() => handleNoticeToggle(notice)} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 700, background: notice.published ? '#E8F5E0' : '#F5F5F5', color: notice.published ? '#3B6D11' : '#999' }}>
                      {notice.published ? '게시중' : '미게시'}
                    </button>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#EBF4FF', color: '#185FA5', border: 'none', cursor: 'pointer' }}>📱 알림톡</button>
                      <button onClick={() => handleNoticeDelete(notice.id)} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#FFE5E5', color: '#D32F2F', border: 'none', cursor: 'pointer' }}>삭제</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}