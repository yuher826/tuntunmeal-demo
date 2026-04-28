'use client';
import BottomNav from '../components/BottomNav';

export default function Calendar() {
  const days = [
    { date: '4/23', day: '목', type: 'today', menu1: '불고기 덮밥', menu2: '닭가슴살 샐러드' },
    { date: '4/24', day: '금', type: 'avail', menu1: '닭갈비 덮밥', menu2: '연어 샐러드' },
    { date: '4/27', day: '월', type: 'preview', menu1: '제육볶음 덮밥', menu2: '그릭 요거트 볼' },
    { date: '4/28', day: '화', type: 'preview', menu1: '된장국 정식', menu2: '닭가슴살 샐러드' },
    { date: '4/29', day: '수', type: 'preview', menu1: '비빔밥 정식', menu2: '연어 아보카도' },
    { date: '4/30', day: '목', type: 'none', menu1: '', menu2: '' },
  ];

  const typeStyle: Record<string, { hd: string; hdText: string; badge: string }> = {
    today:   { hd: '#3B6D11', hdText: '#fff',    badge: '오늘' },
    avail:   { hd: '#97C459', hdText: '#173404',  badge: '예약가능' },
    preview: { hd: '#C0DD97', hdText: '#27500A',  badge: '미리보기' },
    none:    { hd: '#F5F5F5', hdText: '#888',     badge: '미등록' },
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif', position: 'relative' }}>

        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>메뉴 달력</div>
          <div style={{ fontSize: 13 }}>2026년 4월</div>
        </div>

        <div style={{ display: 'flex', gap: 12, padding: '12px 16px', fontSize: 11, color: '#555' }}>
          {['오늘','예약가능','미리보기','미등록'].map((t,i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: ['#3B6D11','#97C459','#C0DD97','#F5F5F5'][i] }} />
              {t}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {days.map(({ date, day, type, menu1, menu2 }) => {
            const s = typeStyle[type];
            return (
              <div key={date} style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <div style={{ background: s.hd, color: s.hdText, padding: '6px 12px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                  <span>{date} ({day})</span>
                  <span>{s.badge}</span>
                </div>
                {type !== 'none' ? (
                  <div style={{ background: '#fff', padding: '10px 12px', display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, background: '#F9FBF6', borderRadius: 6, padding: '8px 10px', fontSize: 12, textAlign: 'center' }}>{menu1}</div>
                    <div style={{ flex: 1, background: '#F9FBF6', borderRadius: 6, padding: '8px 10px', fontSize: 12, textAlign: 'center' }}>{menu2}</div>
                  </div>
                ) : (
                  <div style={{ background: '#fff', padding: '10px 12px', fontSize: 12, color: '#aaa', textAlign: 'center' }}>관리자 등록 후 공개</div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ margin: '16px', background: '#E8F5D8', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#3B6D11' }}>구독하면 전체 메뉴 자동 예약</div>
          <div style={{ fontSize: 12, color: '#5A8A2A', marginTop: 4 }}>지금 구독 시작하기 →</div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}