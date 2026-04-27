'use client';

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F7F5EF', minHeight: '100vh', width: '100%', maxWidth: 430, display: 'flex', flexDirection: 'column' }}>

        {/* 상단 로고 영역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px' }}>

          {/* 로고 */}
          <div style={{ width: 80, height: 80, background: '#3B6D11', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 16, boxShadow: '0 8px 24px rgba(59,109,17,.25)' }}>🍱</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', marginBottom: 4 }}>튼튼밀</div>
          <div style={{ fontSize: 11, color: '#888', letterSpacing: 2, marginBottom: 40 }}>TUNTUNMEAL</div>

          <div style={{ fontSize: 14, color: '#555', marginBottom: 28, textAlign: 'center', lineHeight: 1.7 }}>
            로그인하고 오늘의 메뉴를<br />확인해보세요 😊
          </div>

          {/* 카카오 로그인 */}
          <button onClick={() => router.push('/')}
            style={{ width: '100%', background: '#FEE500', border: 'none', borderRadius: 13, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', marginBottom: 10, fontFamily: "'Malgun Gothic', sans-serif" }}>
            <div style={{ width: 22, height: 22, background: '#3C1E1E', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#FEE500', flexShrink: 0 }}>K</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#3C1E1E' }}>카카오로 시작하기</span>
          </button>

          {/* 네이버 로그인 */}
          <button onClick={() => router.push('/')}
            style={{ width: '100%', background: '#03C75A', border: 'none', borderRadius: 13, padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', marginBottom: 10, fontFamily: "'Malgun Gothic', sans-serif" }}>
            <div style={{ width: 22, height: 22, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#03C75A', flexShrink: 0 }}>N</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>네이버로 시작하기</span>
          </button>

          {/* 전화번호 로그인 */}
          <button onClick={() => router.push('/')}
            style={{ width: '100%', background: '#fff', border: '1.5px solid #E8E6DE', borderRadius: 13, padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', marginBottom: 10, fontFamily: "'Malgun Gothic', sans-serif" }}>
            <span style={{ fontSize: 18 }}>📱</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#444' }}>전화번호로 시작하기</span>
          </button>
         
          {/* 구분선 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', margin: '6px 0 10px' }}>
            <div style={{ flex: 1, height: 1, background: '#E8E6DE' }}></div>
            <span style={{ fontSize: 11, color: '#aaa' }}>또는</span>
            <div style={{ flex: 1, height: 1, background: '#E8E6DE' }}></div>
          </div>

          {/* 게스트 */}
          <button onClick={() => router.push('/')}
            style={{ width: '100%', background: 'transparent', border: 'none', padding: '12px', cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
            <span style={{ fontSize: 13, color: '#aaa' }}>둘러보기 (로그인 없이)</span>
          </button>
        </div>

        {/* 하단 약관 */}
        <div style={{ padding: '0 28px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#bbb', lineHeight: 1.8 }}>
            로그인 시 <span style={{ color: '#888', textDecoration: 'underline', cursor: 'pointer' }}>이용약관</span> 및{' '}
            <span style={{ color: '#888', textDecoration: 'underline', cursor: 'pointer' }}>개인정보처리방침</span>에 동의합니다
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: '#ccc' }}>
            © 2026 TUNTUNMEAL · 안양 1호점
          </div>
        </div>

      </div>
    </div>
  );
}