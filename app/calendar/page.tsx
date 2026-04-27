'use client';

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
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F7F5EF', minHeight: '100vh', width: '100%', maxWidth: 430, position: 'relative' }}>

        {/* 헤더 */}
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>메뉴 달력</span>
          <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8 }}>2026년 4월</span>
        </div>

        {/* 범례 */}
        <div style={{ padding: '10px 14px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[['#3B6D11','오늘'],['#97C459','예약가능'],['#C0DD97','미리보기'],['#eee','미등록']].map(([color, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, border: '1px solid #ddd' }}></div>
              <span style={{ fontSize: 10, color: '#555' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* 달력 목록 */}
        <div style={{ padding: '0 12px 80px' }}>
          {days.map(d => {
            const s = typeStyle[d.type];
            return (
              <div key={d.date} style={{ border: `${d.type === 'today' ? 2 : 1.5}px solid ${s.hd}`, borderRadius: 10, overflow: 'hidden', marginBottom: 6, cursor: d.type !== 'none' ? 'pointer' : 'default' }}>
                <div style={{ background: s.hd, padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.hdText }}>{d.date} ({d.day}){d.type === 'today' ? ' 오늘' : ''}</span>
                  <span style={{ fontSize: 10, color: s.hdText, opacity: .85 }}>{s.badge}</span>
                </div>
                {d.type === 'none' ? (
                  <div style={{ padding: '8px', textAlign: 'center', fontSize: 10, color: '#aaa', background: '#fff' }}>관리자 등록 후 공개</div>
                ) : (
                  <div style={{ padding: '7px 9px', display: 'flex', gap: 6, background: '#fff' }}>
                    <div style={{ flex: 1, background: d.type === 'preview' ? '#fff' : '#EAF3DE', border: d.type === 'preview' ? '1px solid #eee' : 'none', borderRadius: 5, padding: '5px 7px', fontSize: 9, fontWeight: 600, color: d.type === 'preview' ? '#444' : '#27500A' }}>{d.menu1}</div>
                    <div style={{ flex: 1, background: d.type === 'preview' ? '#fff' : '#EAF3DE', border: d.type === 'preview' ? '1px solid #eee' : 'none', borderRadius: 5, padding: '5px 7px', fontSize: 9, fontWeight: 600, color: d.type === 'preview' ? '#444' : '#27500A' }}>{d.menu2}</div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 구독 유도 배너 */}
          <div style={{ background: '#EAF3DE', borderRadius: 10, padding: '12px 14px', border: '1px solid #C0DD97', cursor: 'pointer', marginTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11' }}>구독하면 전체 메뉴 자동 예약</div>
            <div style={{ fontSize: 10, color: '#639922', marginTop: 2 }}>지금 구독 시작하기 →</div>
          </div>
        </div>

        {/* 하단 탭바 */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
          {[['🏠','홈',false], ['📅','메뉴달력',true], ['🔄','구독',false], ['👤','마이',false], ['☰','더보기',false]].map(([icon, label, active]) => (
            <div key={String(label)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
              <div style={{ fontSize: 18 }}>{icon}</div>
              <div style={{ fontSize: 9, color: active ? '#3B6D11' : '#B4B2A9', fontWeight: active ? 700 : 400 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}