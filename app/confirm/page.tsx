'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Confirm() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => setChecked(true), 600);
  }, []);

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#fff', padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid #eee', fontSize: 15, fontWeight: 700 }}>예약 확정</div>

        {/* 체크 애니메이션 */}
        <div style={{ background: '#fff', padding: '24px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 12px' }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="34" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="2"/>
            </svg>
            <svg width="72" height="72" viewBox="0 0 72 72" style={{ position: 'absolute', top: 0, left: 0 }}>
              <path
                d="M20 37 L31 48 L52 26"
                fill="none" stroke="#3B6D11" strokeWidth="4.5"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset={checked ? 0 : 40}
                style={{ transition: 'stroke-dashoffset 0.4s ease 0.6s' }}
              />
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>예약이 완료되었습니다!</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>카카오 알림톡이 발송되었습니다</div>
        </div>

        <div style={{ padding: '0 12px 20px' }}>
          {/* 주문 정보 */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', marginBottom: 10 }}>
            <div style={{ background: '#3B6D11', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: '#9FE1CB' }}>주문번호</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>TT-20260427-0142</div>
              </div>
              <div style={{ background: '#2C5610', borderRadius: 6, padding: '3px 9px', fontSize: 10, color: '#C0DD97', fontWeight: 700 }}>대기중</div>
            </div>
            <div style={{ background: '#fff', padding: '10px 12px', fontSize: 11, lineHeight: 2.2, color: '#444' }}>
              <div><b>메뉴</b>　닭가슴살 샐러드</div>
              <div><b>픽업</b>　<span style={{ color: '#3B6D11', fontWeight: 700 }}>오늘 13:00</span></div>
              <div><b>장소</b>　안양 튼튼밀 1호점</div>
              <div><b>금액</b>　8,500원</div>
            </div>
          </div>

          {/* QR 코드 */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '14px', textAlign: 'center', border: '1px solid #eee', marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 10 }}>매장에서 아래 QR을 스캔해주세요</div>
            <svg width="100" height="100" viewBox="0 0 21 21" shapeRendering="crispEdges" style={{ display: 'block', margin: '0 auto' }}>
              <rect x="0" y="0" width="7" height="7" fill="#222"/><rect x="1" y="1" width="5" height="5" fill="#fff"/><rect x="2" y="2" width="3" height="3" fill="#222"/>
              <rect x="14" y="0" width="7" height="7" fill="#222"/><rect x="15" y="1" width="5" height="5" fill="#fff"/><rect x="16" y="2" width="3" height="3" fill="#222"/>
              <rect x="0" y="14" width="7" height="7" fill="#222"/><rect x="1" y="15" width="5" height="5" fill="#fff"/><rect x="2" y="16" width="3" height="3" fill="#222"/>
              <rect x="8" y="1" width="1" height="1" fill="#222"/><rect x="10" y="0" width="1" height="1" fill="#222"/>
              <rect x="0" y="9" width="1" height="1" fill="#222"/><rect x="3" y="9" width="1" height="1" fill="#222"/>
              <rect x="9" y="8" width="1" height="1" fill="#222"/><rect x="12" y="9" width="1" height="1" fill="#222"/>
              <rect x="8" y="14" width="1" height="1" fill="#222"/><rect x="10" y="15" width="1" height="1" fill="#222"/>
            </svg>
            <div style={{ fontSize: 10, color: '#aaa', marginTop: 8 }}>TT-20260427-0142</div>
          </div>

          {/* 버튼 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => router.push('/calendar')}
              style={{ flex: 1, background: '#f5f5f5', color: '#555', border: 'none', borderRadius: 10, padding: 12, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              내일 메뉴 보기
            </button>
            <button onClick={() => router.push('/mypage')}
              style={{ flex: 1, background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              마이페이지 →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}