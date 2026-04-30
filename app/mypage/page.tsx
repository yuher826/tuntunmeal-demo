'use client';
import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const initialOrders = [
  { id: 1, date: '4/23 (목)', menu: '불고기 덮밥', time: '12:00', status: '예약완료', price: 9500 },
  { id: 2, date: '4/24 (금)', menu: '닭갈비 덮밥', time: '12:30', status: '예약완료', price: 9500 },
  { id: 3, date: '4/22 (화)', menu: '닭가슴살 샐러드', time: '11:30', status: '픽업완료', price: 8500 },
  { id: 4, date: '4/21 (월)', menu: '불고기 덮밥', time: '12:00', status: '픽업완료', price: 9500 },
  { id: 5, date: '4/20 (일)', menu: '된장국 정식', time: '12:00', status: '픽업완료', price: 8000 },
];

const timeSlots = ['11:30', '12:00', '12:30', '13:00'];

export default function MyPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [changeTimeId, setChangeTimeId] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'points' | 'reviews'>('orders');
  const [showReceipt, setShowReceipt] = useState<typeof initialOrders[0] | null>(null);
  const [reviewOrder, setReviewOrder] = useState<typeof initialOrders[0] | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<{ id: number; menu: string; rating: number; text: string; date: string }[]>([]);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profile, setProfile] = useState({ name: '홍길동', email: 'hong@example.com', phone: '010-1234-5678', allergy: '없음' });
  const [editProfile, setEditProfile] = useState(profile);

  const points = orders.filter(o => o.status === '픽업완료').length * 100;

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

  const handleReviewSubmit = () => {
    if (!reviewOrder || rating === 0) return;
    setReviews([...reviews, { id: Date.now(), menu: reviewOrder.menu, rating, text: reviewText, date: reviewOrder.date }]);
    setReviewOrder(null);
    setRating(0);
    setReviewText('');
    showToast('리뷰가 등록됐어요! ⭐');
  };

  const handleProfileSave = () => {
    setProfile(editProfile);
    setShowProfileEdit(false);
    showToast('프로필이 저장됐어요! ✅');
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* 헤더 */}
      <div style={{ background: '#3B6D11', color: '#fff', padding: '16px' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>마이페이지</div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}

      {/* 프로필 */}
      <div style={{ background: '#fff', margin: '12px 16px', borderRadius: 12, padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#3B6D11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{profile.name} 님</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{profile.email}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{profile.phone}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#3B6D11' }}>{points.toLocaleString()}P</div>
            <div style={{ fontSize: 10, color: '#888' }}>보유 포인트</div>
          </div>
          <button onClick={() => { setEditProfile(profile); setShowProfileEdit(true); }}
            style={{ fontSize: 11, color: '#3B6D11', background: 'none', border: '1px solid #3B6D11', borderRadius: 6, padding: '3px 8px', cursor: 'pointer' }}>
            프로필 수정
          </button>
        </div>
      </div>

      {/* 요약 */}
      <div style={{ margin: '0 16px 12px', display: 'flex', gap: 8 }}>
        {[
          { label: '총 주문', value: `${orders.filter(o => o.status !== '취소됨').length}건` },
          { label: '픽업완료', value: `${orders.filter(o => o.status === '픽업완료').length}건` },
          { label: '포인트', value: `${points}P` },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#3B6D11' }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 탭 */}
      <div style={{ display: 'flex', margin: '0 16px 12px', background: '#fff', borderRadius: 10, padding: 4, gap: 4 }}>
        {[
          { id: 'orders', label: '📋 주문내역' },
          { id: 'points', label: '💰 포인트' },
          { id: 'reviews', label: '⭐ 리뷰' },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', background: activeTab === t.id ? '#3B6D11' : 'none', color: activeTab === t.id ? '#fff' : '#888', fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400, cursor: 'pointer' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ margin: '0 16px' }}>

        {/* 주문내역 */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orders.map(order => (
              <div key={order.id} style={{ background: '#fff', borderRadius: 12, padding: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{order.menu}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{order.date} · 픽업 {order.time}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{order.price.toLocaleString()}원</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                      background: order.status === '예약완료' ? '#E8F5D8' : order.status === '픽업완료' ? '#E8EEF5' : '#FFE8E8',
                      color: order.status === '예약완료' ? '#3B6D11' : order.status === '픽업완료' ? '#3B5A8A' : '#C0392B' }}>
                      {order.status}
                    </span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {order.status === '픽업완료' && (
                        <>
                          <button onClick={() => setShowReceipt(order)} style={{ fontSize: 10, color: '#3B5A8A', background: 'none', border: '1px solid #3B5A8A', borderRadius: 5, padding: '2px 6px', cursor: 'pointer' }}>영수증</button>
                          <button onClick={() => setReviewOrder(order)} style={{ fontSize: 10, color: '#e67e22', background: 'none', border: '1px solid #e67e22', borderRadius: 5, padding: '2px 6px', cursor: 'pointer' }}>리뷰</button>
                        </>
                      )}
                      {order.status === '예약완료' && (
                        <>
                          <button onClick={() => setChangeTimeId(order.id)} style={{ fontSize: 10, color: '#3B6D11', background: 'none', border: '1px solid #3B6D11', borderRadius: 5, padding: '2px 6px', cursor: 'pointer' }}>시간변경</button>
                          <button onClick={() => setCancelId(order.id)} style={{ fontSize: 10, color: '#C0392B', background: 'none', border: '1px solid #C0392B', borderRadius: 5, padding: '2px 6px', cursor: 'pointer' }}>취소</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 포인트 */}
        {activeTab === 'points' && (
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '20px', textAlign: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>보유 포인트</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#3B6D11' }}>{points.toLocaleString()}P</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>픽업 1건당 100P 적립</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>포인트 내역</div>
              {orders.filter(o => o.status === '픽업완료').map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13 }}>
                  <span style={{ color: '#555' }}>{o.date} · {o.menu}</span>
                  <span style={{ color: '#3B6D11', fontWeight: 700 }}>+100P</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#E8F5D8', borderRadius: 12, padding: '14px', fontSize: 12, color: '#3B6D11' }}>
              💡 포인트는 결제 시 1P = 1원으로 사용 가능해요!
            </div>
          </div>
        )}

        {/* 리뷰 */}
        {activeTab === 'reviews' && (
          <div>
            {reviews.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: 12, padding: '40px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>
                아직 작성한 리뷰가 없어요<br />픽업완료 메뉴에서 리뷰를 작성해보세요!
              </div>
            ) : (
              reviews.map(r => (
                <div key={r.id} style={{ background: '#fff', borderRadius: 12, padding: '14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{r.menu}</div>
                    <div style={{ fontSize: 13, color: '#f39c12' }}>{'⭐'.repeat(r.rating)}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#555' }}>{r.text}</div>
                  <div style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>{r.date}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 프로필 수정 팝업 */}
      {showProfileEdit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: 390, paddingBottom: 40 }}>
            <div style={{ width: 40, height: 4, background: '#eee', borderRadius: 2, margin: '0 auto 20px' }} />
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>프로필 수정</div>
            {[
              { label: '이름', key: 'name', placeholder: '이름 입력' },
              { label: '이메일', key: 'email', placeholder: '이메일 입력' },
              { label: '전화번호', key: 'phone', placeholder: '010-0000-0000' },
              { label: '알레르기 정보', key: 'allergy', placeholder: '예) 땅콩, 우유' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 4, fontWeight: 600 }}>{f.label}</div>
                <input value={(editProfile as any)[f.key]}
                  onChange={e => setEditProfile({ ...editProfile, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button onClick={() => setShowProfileEdit(false)} style={{ flex: 1, padding: '14px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>취소</button>
              <button onClick={handleProfileSave} style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>저장하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 취소 팝업 */}
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
                <button key={t} onClick={() => handleTimeChange(changeTimeId, t)}
                  style={{ padding: '12px', borderRadius: 10, border: '1px solid #ddd', background: orders.find(o => o.id === changeTimeId)?.time === t ? '#3B6D11' : '#fff', color: orders.find(o => o.id === changeTimeId)?.time === t ? '#fff' : '#333', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={() => setChangeTimeId(null)} style={{ width: '100%', marginTop: 12, padding: '12px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>닫기</button>
          </div>
        </div>
      )}

      {/* 영수증 팝업 */}
      {showReceipt && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px', margin: '0 32px', width: '100%', maxWidth: 320 }}>
            <div style={{ fontSize: 16, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>🧾 영수증</div>
            <div style={{ borderTop: '1px dashed #ddd', borderBottom: '1px dashed #ddd', padding: '12px 0', marginBottom: 12 }}>
              {[
                { label: '메뉴', value: showReceipt.menu },
                { label: '날짜', value: showReceipt.date },
                { label: '픽업시간', value: showReceipt.time },
                { label: '결제금액', value: `${showReceipt.price.toLocaleString()}원` },
                { label: '결제수단', value: '신용카드' },
                { label: '적립포인트', value: '+100P' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: '#888' }}>{r.label}</span>
                  <span style={{ fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: 11, color: '#bbb', marginBottom: 16 }}>튼튼밀 TUNTUNMEAL · 031-000-0000</div>
            <button onClick={() => setShowReceipt(null)} style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>닫기</button>
          </div>
        </div>
      )}

      {/* 리뷰 팝업 */}
      {reviewOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: 390, paddingBottom: 40 }}>
            <div style={{ width: 40, height: 4, background: '#eee', borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>리뷰 작성</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>{reviewOrder.menu} · {reviewOrder.date}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRating(s)}
                  style={{ fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', opacity: s <= rating ? 1 : 0.3 }}>⭐</button>
              ))}
            </div>
            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)}
              placeholder="맛은 어떠셨나요? 솔직한 리뷰를 남겨주세요 😊"
              rows={3}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box', resize: 'none', marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setReviewOrder(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>취소</button>
              <button onClick={handleReviewSubmit} disabled={rating === 0}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: rating > 0 ? '#3B6D11' : '#ddd', color: '#fff', fontSize: 14, fontWeight: 700, cursor: rating > 0 ? 'pointer' : 'default' }}>등록하기</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}