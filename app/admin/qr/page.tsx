'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QRScan() {
  const router = useRouter();
  const [scanned, setScanned] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => router.push('/admin'), 1500);
  };

  return (
    <div style={{ background: '#111', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#111', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#111', padding: '10px 14px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div onClick={() => router.push('/admin')} style={{ color: '#9FE1CB', fontSize: 16, cursor: 'pointer' }}>←</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>QR 스캔 모드</span>
          <div style={{ marginLeft: 'auto', background: 'rgba(59,109,17,.3)', color: '#9FE1CB', fontSize: 10, padding: '3px 9px', borderRadius: 6 }}>대기 16건</div>
        </div>

        {/* 스캐너 영역 */}
        <div style={{ margin: '14px', borderRadius: 14, overflow: 'hidden', height: 220, background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)' }}></div>

          {/* 스캔 프레임 */}
          <div style={{ position: 'relative', width: 150, height: 150 }}>
            {/* 모서리 4개 */}
            {[{top:0,left:0,borderTop:'3px solid #3B6D11',borderLeft:'3px solid #3B6D11',borderRadius:'4px 0 0 0'},
              {top:0,right:0,borderTop:'3px solid #3B6D11',borderRight:'3px solid #3B6D11',borderRadius:'0 4px 0 0'},
              {bottom:0,left:0,borderBottom:'3px solid #3B6D11',borderLeft:'3px solid #3B6D11',borderRadius:'0 0 0 4px'},
              {bottom:0,right:0,borderBottom:'3px solid #3B6D11',borderRight:'3px solid #3B6D11',borderRadius:'0 0 4px 0'}
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 28, height: 28, ...s }}></div>
            ))}

            {/* 스캔 라인 애니메이션 */}
            <div style={{
              position: 'absolute', left: 8, right: 8, height: 2,
              background: 'rgba(59,109,17,.8)',
              animation: 'scanLine 2s ease-in-out infinite',
            }}></div>

            {/* QR 미리보기 */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .25 }}>
              <svg width="90" height="90" viewBox="0 0 21 21" shapeRendering="crispEdges">
                <rect x="0" y="0" width="7" height="7" fill="#9FE1CB"/><rect x="1" y="1" width="5" height="5" fill="#000"/><rect x="2" y="2" width="3" height="3" fill="#9FE1CB"/>
                <rect x="14" y="0" width="7" height="7" fill="#9FE1CB"/><rect x="15" y="1" width="5" height="5" fill="#000"/><rect x="16" y="2" width="3" height="3" fill="#9FE1CB"/>
                <rect x="0" y="14" width="7" height="7" fill="#9FE1CB"/><rect x="1" y="15" width="5" height="5" fill="#000"/><rect x="2" y="16" width="3" height="3" fill="#9FE1CB"/>
              </svg>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 10, fontSize: 10, color: 'rgba(255,255,255,.5)' }}>고객 QR을 이 안에 맞추세요</div>
        </div>

        <style>{`
          @keyframes scanLine {
            0%, 100% { top: 15%; }
            50% { top: 80%; }
          }
        `}</style>

        {/* 주문 확인 카드 */}
        {!completed ? (
          <div style={{ background: '#fff', margin: '0 14px', borderRadius: 14, padding: '14px', border: '2px solid #3B6D11' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, background: '#EAF3DE', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🥗</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>TT-20260427-0142</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>김직장 · 닭가슴살 샐러드</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11' }}>13:00</div>
            </div>
            <button onClick={handleComplete}
              style={{ width: '100%', padding: '13px', background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 11, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              ✓ 픽업 완료 처리
            </button>
          </div>
        ) : (
          <div style={{ background: '#fff', margin: '0 14px', borderRadius: 14, padding: '24px', textAlign: 'center', border: '2px solid #3B6D11' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#3B6D11' }}>픽업 완료!</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>TT-20260427-0142 · 김직장</div>
          </div>
        )}

        {/* 수동 입력 */}
        <div style={{ padding: '12px 14px', textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: '#444', cursor: 'pointer' }}>
            QR 인식 실패? <span style={{ color: '#3B6D11', textDecoration: 'underline' }}>주문번호 직접 입력</span>
          </span>
        </div>

      </div>
    </div>
  );
}