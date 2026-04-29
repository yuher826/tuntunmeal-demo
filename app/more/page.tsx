'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../components/BottomNav';

const faqs = [
  { q: '픽업 장소는 어디인가요?', a: '건물 1층 로비 픽업존에서 수령하시면 돼요.' },
  { q: '주문 마감 시간은 언제인가요?', a: '매일 오전 10시까지 주문 가능해요.' },
  { q: '당일 취소는 가능한가요?', a: '오전 10시 이전까지 취소 가능해요.' },
  { q: '알레르기 정보는 어디서 확인하나요?', a: '각 메뉴 상세 페이지에서 확인 가능해요.' },
  { q: '영수증 발급이 가능한가요?', a: '마이페이지 주문내역에서 발급 가능해요.' },
];

export default function MorePage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleLogout = () => {
    setShowLogout(false);
    showToast('로그아웃 됐어요');
    setTimeout(() => router.push('/login'), 1500);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* 헤더 */}
      <div style={{ background: '#3B6D11', color: '#fff', padding: '16px' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>더보기</div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}

      {/* 서비스 */}
      <div style={{ margin: '16px', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#888', background: '#f9f9f9' }}>서비스</div>
        {[
          { icon: '📢', label: '공지사항', path: '/notification' },
          { icon: '🎁', label: '이벤트 · 쿠폰', path: '/event' },
          { icon: '🔔', label: '알림', path: '/notification' },
          { icon: '📤', label: '친구에게 공유하기', path: null },
        ].map((item, i) => (
          <div key={i} onClick={() => item.path ? router.push(item.path) : showToast('링크가 복사됐어요! 📋')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderTop: i === 0 ? 'none' : '1px solid #f0f0f0', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 14 }}>{item.label}</span>
            </div>
            <span style={{ color: '#ccc', fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>

      {/* 고객센터 */}
      <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#888', background: '#f9f9f9' }}>고객센터</div>
        {[
          { icon: '💬', label: '1:1 문의하기' },
          { icon: '📞', label: '전화 문의 · 031-000-0000' },
        ].map((item, i) => (
          <div key={i} onClick={() => showToast('준비 중이에요 😊')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderTop: i === 0 ? 'none' : '1px solid #f0f0f0', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 14 }}>{item.label}</span>
            </div>
            <span style={{ color: '#ccc', fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#888', background: '#f9f9f9' }}>자주 묻는 질문</div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid #f0f0f0' }}>
            <div onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Q. {faq.q}</span>
              <span style={{ color: '#aaa', fontSize: 14, transition: '0.2s', transform: openFaq === i ? 'rotate(90deg)' : 'none' }}>›</span>
            </div>
            {openFaq === i && (
              <div style={{ padding: '0 16px 14px', fontSize: 13, color: '#555', lineHeight: 1.6, background: '#F9FBF6' }}>
                A. {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 설정 */}
      <div style={{ margin: '0 16px 16px', background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#888', background: '#f9f9f9' }}>설정</div>
        {[
          { icon: '🔔', label: '알림 설정', path: '/notification' },
          { icon: '🔒', label: '개인정보처리방침', path: null },
          { icon: '📄', label: '이용약관', path: null },
          { icon: '📱', label: '앱 버전 · v1.0.0', path: null },
        ].map((item, i) => (
          <div key={i} onClick={() => item.path ? router.push(item.path) : showToast('준비 중이에요 😊')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderTop: i === 0 ? 'none' : '1px solid #f0f0f0', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 14 }}>{item.label}</span>
            </div>
            <span style={{ color: '#ccc', fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>

      {/* 로그아웃 */}
      <div style={{ margin: '0 16px 32px' }}>
        <button onClick={() => setShowLogout(true)}
          style={{ width: '100%', padding: '16px', borderRadius: 12, border: '1px solid #ddd', background: '#fff', color: '#C0392B', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
          로그아웃
        </button>
      </div>

      {/* 로그아웃 팝업 */}
      {showLogout && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px', margin: '0 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>로그아웃 할까요?</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>다음에 다시 로그인하면 돼요</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowLogout(false)} style={{ flex: 1, padding: '12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>돌아가기</button>
              <button onClick={handleLogout} style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: '#C0392B', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>로그아웃</button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}