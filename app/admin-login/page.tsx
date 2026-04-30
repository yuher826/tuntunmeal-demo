'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password) return;
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error || '오류가 발생했습니다');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 360, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', boxSizing: 'border-box', margin: '0 16px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔒</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: '#1A1A1A' }}>관리자 로그인</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>튼튼밀 관리자 전용</div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: error ? '1.5px solid #D32F2F' : '1.5px solid #ddd', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
          />
          {error && (
            <div style={{ color: '#D32F2F', fontSize: 12, marginTop: 6 }}>⚠️ {error}</div>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: loading ? '#aaa' : '#3B6D11', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? '확인 중...' : '로그인'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span onClick={() => router.push('/')} style={{ fontSize: 12, color: '#888', cursor: 'pointer' }}>← 홈으로 돌아가기</span>
        </div>
      </div>
    </div>
  );
}