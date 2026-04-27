'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function B2B() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [manager, setManager] = useState('');
  const [phone, setPhone] = useState('');
  const [bizNum, setBizNum] = useState('');
  const [people, setPeople] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const inp: React.CSSProperties = {
    width: '100%', background: '#F5F3ED', border: '1px solid #E8E6DE',
    borderRadius: 8, padding: '11px 12px', fontSize: 13,
    fontFamily: "'Malgun Gothic', sans-serif", outline: 'none'
  };

  const handleSubmit = () => {
    if (!company || !manager || !phone || !people) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
        <div style={{ background: '#F7F5EF', minHeight: '100vh', width: '100%', maxWidth: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>상담 신청 완료!</div>
          <div style={{ fontSize: 13, color: '#888', lineHeight: 1.8, marginBottom: 32 }}>
            영업일 1~2일 내 담당자가 연락드립니다.<br />
            <span style={{ color: '#3B6D11', fontWeight: 600 }}>{company}</span> 감사합니다 😊
          </div>
          <button onClick={() => router.push('/')}
            style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F7F5EF', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#fff', padding: '12px 14px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div onClick={() => router.push('/more')} style={{ width: 30, height: 30, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14 }}>←</div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>기업 단체계약 신청</span>
        </div>

        <div style={{ padding: '14px 14px 80px' }}>

          {/* 혜택 배너 */}
          <div style={{ background: 'linear-gradient(135deg, #0C3A7C, #185FA5)', borderRadius: 14, padding: '18px 16px', marginBottom: 16, color: '#fff' }}>
            <div style={{ fontSize: 11, color: '#B5D4F4', marginBottom: 4 }}>TUNTUNMEAL B2B</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>임직원 식사를 한번에</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginBottom: 14 }}>10인 이상 · 월말 정산 · 세금계산서 발행</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['📋', '세금계산서'], ['💳', '월말 정산'], ['🚀', '우선 픽업'], ['📊', '식사 통계']].map(([icon, label]) => (
                <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,.15)', borderRadius: 8, padding: '8px 4px', textAlign: 'center' }}>
                  <div style={{ fontSize: 16 }}>{icon}</div>
                  <div style={{ fontSize: 8.5, color: '#B5D4F4', marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 폼 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '14px', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 12 }}>기업 정보</div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>회사명 *</div>
              <input value={company} onChange={e => setCompany(e.target.value)} style={{ ...inp }} placeholder="(주)안양테크" />
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>사업자등록번호</div>
              <input value={bizNum} onChange={e => setBizNum(e.target.value)} style={{ ...inp }} placeholder="000-00-00000" />
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>담당자명 *</div>
                <input value={manager} onChange={e => setManager(e.target.value)} style={{ ...inp }} placeholder="김담당" />
              </div>
              <div style={{ flex: 1.4 }}>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>연락처 *</div>
                <input value={phone} onChange={e => setPhone(e.target.value)} style={{ ...inp }} placeholder="010-xxxx-xxxx" />
              </div>
            </div>
          </div>

          {/* 예상 인원 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '14px', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 10 }}>예상 인원 *</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['10~30명', '소규모'], ['31~100명', '중규모'], ['101명↑', '대규모']].map(([label, sub]) => (
                <div key={label} onClick={() => setPeople(label)}
                  style={{ flex: 1, border: `1.5px solid ${people === label ? '#185FA5' : '#eee'}`, background: people === label ? '#E6F1FB' : '#fff', borderRadius: 10, padding: '10px 6px', textAlign: 'center', cursor: 'pointer', transition: 'all .15s' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: people === label ? '#185FA5' : '#333' }}>{label}</div>
                  <div style={{ fontSize: 9, color: people === label ? '#185FA5' : '#aaa', marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 요청사항 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '14px', marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 6 }}>요청사항 (선택)</div>
            <textarea style={{ ...inp, height: 80, resize: 'none' as const, verticalAlign: 'top' }} placeholder="픽업 장소, 특이사항 등을 자유롭게 적어주세요" />
          </div>

          {/* 신청 버튼 */}
          <button onClick={handleSubmit}
            style={{ width: '100%', padding: 14, background: company && manager && phone && people ? '#185FA5' : '#B4B2A9', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: company && manager && phone && people ? 'pointer' : 'default', fontFamily: "'Malgun Gothic', sans-serif", marginBottom: 8, transition: 'background .2s' }}>
            계약 상담 신청하기
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#aaa' }}>영업일 1~2일 내 담당자 연락 · 무료 컨설팅</div>

        </div>
      </div>
    </div>
  );
}