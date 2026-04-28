'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleVerify = () => {
    if (code.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>

        {/* 상단 로고 */}
        <div style={{ background: '#3B6D11', padding: '60px 32px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>튼튼밀</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>TUNTUNMEAL</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>건강한 한 끼, 매일 제시간에</div>
        </div>

        {/* 로그인 폼 */}
        <div style={{ padding: '40px 24px', flex: 1 }}>

          {step === 'phone' ? (
            <>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>전화번호로 시작하기</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 28 }}>인증번호를 문자로 보내드려요</div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 6, fontWeight: 600 }}>전화번호</div>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                onClick={handleSendCode}
                disabled={phone.length < 10 || loading}
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: phone.length >= 10 ? '#3B6D11' : '#ddd', color: '#fff', fontSize: 16, fontWeight: 700, cursor: phone.length >= 10 ? 'pointer' : 'default', marginTop: 8 }}>
                {loading ? '전송 중...' : '인증번호 받기'}
              </button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>인증번호 입력</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 28 }}>{phone}로 전송된 인증번호를 입력해주세요</div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 6, fontWeight: 600 }}>인증번호</div>
                <input
                  type="number"
                  placeholder="숫자 6자리"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1.5px solid #ddd', fontSize: 20, outline: 'none', boxSizing: 'border-box', letterSpacing: 8, textAlign: 'center' }}
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={code.length < 4 || loading}
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: code.length >= 4 ? '#3B6D11' : '#ddd', color: '#fff', fontSize: 16, fontWeight: 700, cursor: code.length >= 4 ? 'pointer' : 'default', marginTop: 8 }}>
                {loading ? '확인 중...' : '로그인'}
              </button>

              <button
                onClick={() => setStep('phone')}
                style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: 'none', color: '#888', fontSize: 14, cursor: 'pointer', marginTop: 8 }}>
                ← 전화번호 다시 입력
              </button>
            </>
          )}

          {/* 소셜 로그인 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#eee' }} />
            <div style={{ fontSize: 12, color: '#aaa' }}>또는</div>
            <div style={{ flex: 1, height: 1, background: '#eee' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* 카카오 */}
            <button style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#FEE500', color: '#3A1D1D', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>💬</span> 카카오로 시작하기
            </button>

            {/* 네이버 */}
            <button style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', background: '#03C75A', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 900 }}>N</span> 네이버로 시작하기
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