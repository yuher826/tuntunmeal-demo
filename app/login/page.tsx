'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) { showToast('이메일과 비밀번호를 입력해주세요!'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { showToast('이메일 또는 비밀번호가 틀렸어요!'); return; }
    router.push('/');
  };

  const handleSignUp = async () => {
    if (!email || !password || !name || !phone) { showToast('모든 항목을 입력해주세요!'); return; }
    if (password.length < 6) { showToast('비밀번호는 6자리 이상이에요!'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } }
    });
    setLoading(false);
    if (error) { showToast('이미 사용중인 이메일이에요!'); return; }
    showToast('가입 완료! 이메일을 확인해주세요 📧');
    setIsSignUp(false);
  };

  const handleComingSoon = () => showToast('서비스 준비중이에요! 조금만 기다려주세요 😊');

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>

        {/* 토스트 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}

        {/* 상단 로고 */}
        <div style={{ background: '#3B6D11', padding: '60px 32px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>튼튼밀</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>TUNTUNMEAL</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>건강한 한 끼, 매일 제시간에</div>
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          <button onClick={() => setIsSignUp(false)}
            style={{ flex: 1, padding: '14px', border: 'none', background: 'none', fontSize: 14, fontWeight: isSignUp ? 400 : 700, color: isSignUp ? '#aaa' : '#3B6D11', borderBottom: isSignUp ? 'none' : '2px solid #3B6D11', cursor: 'pointer' }}>
            로그인
          </button>
          <button onClick={() => setIsSignUp(true)}
            style={{ flex: 1, padding: '14px', border: 'none', background: 'none', fontSize: 14, fontWeight: isSignUp ? 700 : 400, color: isSignUp ? '#3B6D11' : '#aaa', borderBottom: isSignUp ? '2px solid #3B6D11' : 'none', cursor: 'pointer' }}>
            회원가입
          </button>
        </div>

        <div style={{ padding: '32px 24px', flex: 1 }}>

          {!isSignUp ? (
            /* 로그인 */
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 6, fontWeight: 600 }}>이메일</div>
                <input
                  type="email"
                  placeholder="이메일 입력"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 6, fontWeight: 600 }}>비밀번호</div>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleEmailLogin()}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={handleEmailLogin} disabled={loading}
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
                {loading ? '로그인 중...' : '이메일로 로그인'}
              </button>
            </>
          ) : (
            /* 회원가입 */
            <>
              {[
                { label: '이름 *', key: 'name', placeholder: '홍길동', type: 'text', value: name, set: setName },
                { label: '전화번호 *', key: 'phone', placeholder: '010-0000-0000', type: 'tel', value: phone, set: setPhone },
                { label: '이메일 *', key: 'email', placeholder: '이메일 입력', type: 'email', value: email, set: setEmail },
                { label: '비밀번호 * (6자리 이상)', key: 'password', placeholder: '비밀번호 입력', type: 'password', value: password, set: setPassword },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 6, fontWeight: 600 }}>{f.label}</div>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <button onClick={handleSignUp} disabled={loading}
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8, marginBottom: 8 }}>
                {loading ? '가입 중...' : '회원가입'}
              </button>
            </>
          )}

          {/* 소셜 로그인 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#eee' }} />
            <div style={{ fontSize: 12, color: '#aaa' }}>또는</div>
            <div style={{ flex: 1, height: 1, background: '#eee' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* 전화번호 */}
            <button onClick={handleComingSoon}
              style={{ width: '100%', padding: '15px', borderRadius: 12, border: '1.5px solid #ddd', background: '#fff', color: '#555', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>📱</span> 전화번호로 시작하기
              <span style={{ fontSize: 10, color: '#aaa', marginLeft: 4 }}>준비중</span>
            </button>

            {/* 카카오 */}
            <button onClick={handleComingSoon}
              style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#FEE500', color: '#3A1D1D', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>💬</span> 카카오로 시작하기
              <span style={{ fontSize: 10, color: '#888', marginLeft: 4 }}>준비중</span>
            </button>

            {/* 네이버 */}
            <button onClick={handleComingSoon}
              style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#03C75A', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 900 }}>N</span> 네이버로 시작하기
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginLeft: 4 }}>준비중</span>
            </button>
          </div>
        </div>

        {/* 하단 */}
        <div style={{ padding: '20px 24px', textAlign: 'center', fontSize: 11, color: '#bbb' }}>
          로그인 시 서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </div>

      </div>
    </div>
  );
}
