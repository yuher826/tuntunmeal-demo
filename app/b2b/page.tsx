'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../components/BottomNav';
import { supabase } from '@/lib/supabase';

export default function B2BPage() {
  const router = useRouter();
  const [form, setForm] = useState({ company: '', name: '', phone: '', email: '', count: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSubmit = async () => {
    if (!form.company || !form.name || !form.phone) {
      showToast('회사명, 담당자명, 연락처는 필수예요!');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('b2b_inquiries').insert({
      company: form.company,
      name: form.name,
      phone: form.phone,
      email: form.email,
      count: form.count,
      message: form.message,
      status: '신규',
    });
    setLoading(false);
    if (error) {
      showToast('오류가 발생했어요. 다시 시도해주세요.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#185FA5', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: 0 }}>←</button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>기업 단체계약 B2B</div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>10인 이상 단체 전용 서비스</div>
          </div>
        </div>

        {/* 토스트 */}
        {toast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
            {toast}
          </div>
        )}

        {!submitted ? (
          <div style={{ padding: '16px' }}>

            {/* 혜택 안내 */}
            <div style={{ background: '#EBF5FB', borderRadius: 12, padding: '16px', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#185FA5', marginBottom: 10 }}>🏢 B2B 단체계약 혜택</div>
              {[
                { icon: '💰', title: '10% 이상 할인', desc: '인원수에 따라 최대 15% 할인' },
                { icon: '👨‍💼', title: '전담 매니저 배정', desc: '전용 담당자가 모든 것을 관리' },
                { icon: '📅', title: '메뉴 사전 협의', desc: '회사 맞춤 메뉴 구성 가능' },
                { icon: '🧾', title: '세금계산서 발행', desc: '법인 경비 처리 가능' },
                { icon: '🚚', title: '정시 납품 보장', desc: '매일 지정 시간 정확히 납품' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: '#666' }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 요금 안내 */}
            <div style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>💳 요금 안내</div>
              {[
                { range: '10~19인', price: '인당 8,500원', discount: '10% 할인', color: '#3B6D11' },
                { range: '20~49인', price: '인당 8,075원', discount: '15% 할인', color: '#185FA5' },
                { range: '50인 이상', price: '별도 협의', discount: '최대 혜택', color: '#8e44ad' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{p.range}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{p.price}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10, background: `${p.color}20`, color: p.color }}>{p.discount}</span>
                </div>
              ))}
            </div>

            {/* 문의 폼 */}
            <div style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>📝 계약 문의</div>
              {[
                { label: '회사명 *', key: 'company', placeholder: '예) (주)튼튼밀' },
                { label: '담당자명 *', key: 'name', placeholder: '예) 홍길동' },
                { label: '연락처 *', key: 'phone', placeholder: '예) 010-1234-5678' },
                { label: '이메일', key: 'email', placeholder: '예) hong@company.com' },
                { label: '예상 인원', key: 'count', placeholder: '예) 30명' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#555', marginBottom: 4, fontWeight: 600 }}>{f.label}</div>
                  <input
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#555', marginBottom: 4, fontWeight: 600 }}>추가 문의사항</div>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="궁금한 점을 자유롭게 적어주세요"
                  rows={3}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box', resize: 'none' }} />
              </div>
              <button onClick={handleSubmit} disabled={loading}
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: loading ? '#aaa' : '#185FA5', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer' }}>
                {loading ? '전송 중...' : '문의 보내기 →'}
              </button>
            </div>

            {/* 전화 문의 */}
            <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>📞 전화 문의</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>평일 09:00 ~ 17:00</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#185FA5' }}>031-000-0000</div>
            </div>

          </div>
        ) : (

          /* 제출 완료 화면 */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#185FA5', marginBottom: 8 }}>문의가 접수됐어요!</div>
            <div style={{ fontSize: 14, color: '#888', lineHeight: 1.7, marginBottom: 32 }}>
              담당자가 확인 후<br />1~2 영업일 내에 연락드릴게요 😊
            </div>
            <div style={{ background: '#EBF5FB', borderRadius: 12, padding: '16px', width: '100%', marginBottom: 24, textAlign: 'left' }}>
              <div style={{ fontSize: 12, color: '#185FA5', fontWeight: 700, marginBottom: 8 }}>접수 내용</div>
              <div style={{ fontSize: 13, color: '#333' }}>회사명: {form.company}</div>
              <div style={{ fontSize: 13, color: '#333' }}>담당자: {form.name}</div>
              <div style={{ fontSize: 13, color: '#333' }}>연락처: {form.phone}</div>
              {form.count && <div style={{ fontSize: 13, color: '#333' }}>예상인원: {form.count}</div>}
            </div>
            <button onClick={() => router.push('/')}
              style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: '#185FA5', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              홈으로 돌아가기
            </button>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
}
