'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Payment() {
  const [selectedPay, setSelectedPay] = useState(1);
  const router = useRouter();

  const menu = { name: '닭가슴살 샐러드', time: '13:00', price: '8,500원', emoji: '🥗' };

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430, position: 'relative' }}>

        {/* 헤더 */}
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div onClick={() => router.back()} style={{ width: 30, height: 30, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>←</div>
          <span style={{ fontSize: 15, fontWeight: 700 }}>결제</span>
        </div>

        <div style={{ padding: '10px 12px 80px' }}>

          {/* 주문 내역 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E6DE', overflow: 'hidden', marginBottom: 9 }}>
            <div style={{ background: '#EAF3DE', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#3B6D11' }}>주문 내역</div>
            <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 44, height: 44, background: '#EAF3DE', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{menu.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{menu.name}</div>
                <div style={{ fontSize: 11, color: '#3B6D11', marginTop: 2 }}>{menu.time} 픽업 · 안양 1호점</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{menu.price}</div>
            </div>
          </div>

          {/* 결제 수단 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E6DE', padding: '12px 14px', marginBottom: 9 }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 600, marginBottom: 8 }}>결제 수단</div>

            {[
              { id: 1, name: '신용·체크카드', sub: 'Toss Payments', badge: '간편결제', badgeColor: '#E6F1FB', badgeText: '#185FA5' },
              { id: 2, name: '선불 크레딧', sub: '잔액 12,000원', badge: '잔액충분', badgeColor: '#EAF3DE', badgeText: '#3B6D11' },
              { id: 3, name: '카카오페이', sub: '', badge: '카카오', badgeColor: '#FAEEDA', badgeText: '#854F0B' },
            ].map(p => (
              <div key={p.id} onClick={() => setSelectedPay(p.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${selectedPay === p.id ? '#3B6D11' : '#eee'}`, background: selectedPay === p.id ? '#EAF3DE' : '#fff', marginBottom: 7 }}>
                <div style={{ width: 17, height: 17, borderRadius: '50%', border: `2px solid ${selectedPay === p.id ? '#3B6D11' : '#ccc'}`, background: selectedPay === p.id ? '#3B6D11' : '#fff', boxShadow: selectedPay === p.id ? 'inset 0 0 0 3px #fff' : 'none', flexShrink: 0 }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</div>
                  {p.sub && <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{p.sub}</div>}
                </div>
                <span style={{ background: p.badgeColor, color: p.badgeText, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 7 }}>{p.badge}</span>
              </div>
            ))}
          </div>

          {/* 결제 금액 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E8E6DE', padding: '12px 14px', marginBottom: 9 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 12, color: '#888' }}>메뉴 금액</span>
              <span style={{ fontSize: 12 }}>{menu.price}</span>
            </div>
            <div style={{ borderTop: '1px solid #eee', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>최종 결제</span>
              <span style={{ fontSize: 20, fontWeight: 700 }}>{menu.price}</span>
            </div>
          </div>

          {/* 결제 버튼 */}
          <button
            onClick={() => router.push('/confirm')}
            style={{ width: '100%', padding: 14, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: '#3B6D11', color: '#fff', marginBottom: 6 }}>
            {menu.price} 결제하기
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa' }}>결제 완료 즉시 카카오 알림톡 발송</div>

        </div>
      </div>
    </div>
  );
}