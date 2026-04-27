'use client';

import { useRouter } from 'next/navigation';

export default function More() {
  const router = useRouter();

  const sections = [
    {
      title: '기업 서비스',
      items: [
        { icon: '🏢', label: '기업 단체계약 B2B', sub: '10인 이상 · 세금계산서', path: '/b2b', color: '#E6F1FB' },
      ]
    },
    {
      title: '고객 지원',
      items: [
        { icon: '📢', label: '공지사항', sub: '서비스 업데이트 안내', path: null, color: '#F5F3ED' },
        { icon: '💬', label: '1:1 문의', sub: '평일 09:00~18:00', path: null, color: '#F5F3ED' },
        { icon: '⭐', label: '리뷰 작성', sub: '오늘 식사 어떠셨나요?', path: null, color: '#FFF9E6' },
      ]
    },
    {
      title: '관리자',
      items: [
        { icon: '🔑', label: '관리자 페이지', sub: '이사·팀장·차장 전용', path: '/admin', color: '#1A1A1A', dark: true },
      ]
    },
    {
      title: '앱 정보',
      items: [
        { icon: 'ℹ️', label: '앱 버전 1.0.0', sub: '최신 버전입니다', path: null, color: '#F5F3ED' },
        { icon: '📋', label: '이용약관', sub: '', path: null, color: '#F5F3ED' },
        { icon: '🔒', label: '개인정보처리방침', sub: '', path: null, color: '#F5F3ED' },
      ]
    },
  ];

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: 15, fontWeight: 700 }}>더보기</div>

        <div style={{ padding: '8px 12px 80px' }}>
          {sections.map(section => (
            <div key={section.title}>
              <div style={{ fontSize: 10, color: '#888', fontWeight: 600, margin: '10px 0 5px', paddingLeft: 2 }}>{section.title}</div>
              <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', marginBottom: 8 }}>
                {section.items.map((item, i) => (
                  <div key={item.label}
                    onClick={() => item.path && router.push(item.path)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', borderBottom: i < section.items.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: item.path ? 'pointer' : 'default' }}>
                    <div style={{ width: 34, height: 34, background: item.color, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: (item as any).dark ? '#444' : '#1A1A1A' }}>{item.label}</div>
                      {item.sub && <div style={{ fontSize: 10, color: '#aaa', marginTop: 1 }}>{item.sub}</div>}
                    </div>
                    {item.path && <span style={{ color: '#ccc', fontSize: 16 }}>›</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 로그아웃 */}
          <div style={{ textAlign: 'center', padding: '16px', fontSize: 13, color: '#E24B4A', cursor: 'pointer' }}>로그아웃</div>
        </div>

        {/* 하단 탭바 */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
          {[['🏠','홈',false,'/'],[' 📅','메뉴달력',false,'/calendar'],['🔄','구독',false,'/subscription'],['👤','마이',false,'/mypage'],['☰','더보기',true,'/more']].map(([icon, label, active, path]) => (
            <div key={String(label)} onClick={() => router.push(String(path))}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
              <div style={{ fontSize: 18 }}>{icon}</div>
              <div style={{ fontSize: 9, color: active ? '#3B6D11' : '#B4B2A9', fontWeight: active ? 700 : 400 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}