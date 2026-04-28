'use client';
import { useRouter } from 'next/navigation';

export default function ConfirmPage() {
  const router = useRouter();

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>

        {/* 성공 아이콘 */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F5D8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 24 }}>
          ✅
        </div>

        <div style={{ fontSize: 22, fontWeight: 900, color: '#3B6D11', marginBottom: 8 }}>결제 완료!</div>
        <div style={{ fontSize: 14, color: '#888', marginBottom: 32, lineHeight: 1.7 }}>주문이 완료됐어요{'\n'}픽업 시간에 맞춰 준비해드릴게요 😊</div>

        {/* 주문 요약 */}
        <div style={{ width: '100%', background: '#fff', borderRadius: 12, padding: '20px', marginBottom: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
            <span style={{ color: '#888' }}>메뉴</span>
            <span style={{ fontWeight: 700 }}>불고기 덮밥</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
            <span style={{ color: '#888' }}>픽업 시간</span>
            <span style={{ fontWeight: 700 }}>12:00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
            <span style={{ color: '#888' }}>결제 금액</span>
            <span style={{ fontWeight: 700, color: '#3B6D11' }}>9,500원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: '#888' }}>결제 수단</span>
            <span style={{ fontWeight: 700 }}>신용/체크카드</span>
          </div>
        </div>

        {/* 버튼 */}
        <div style={{ width: '100%', display: 'flex', gap: 8 }}>
          <button onClick={() => router.push('/calendar')}
            style={{ flex: 1, background: '#f5f5f5', color: '#555', border: 'none', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            내일 메뉴 보기
          </button>
          <button onClick={() => router.push('/mypage')}
            style={{ flex: 1, background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            마이페이지 →
          </button>
        </div>

      </div>
    </div>
  );
}