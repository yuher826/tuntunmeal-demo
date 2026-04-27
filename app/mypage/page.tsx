'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const tabs = ['내 정보', '주문내역', '설정'];

  const orders = [
    { id: 'TT-0142', menu: '닭가슴살 샐러드', date: '4/27 · 13:00', status: '대기중', statusColor: '#3B6D11', statusBg: '#EAF3DE' },
    { id: 'TT-0141', menu: '불고기 덮밥', date: '4/26 · 12:00', status: '완료', statusColor: '#888', statusBg: '#F5F5F5' },
    { id: 'TT-0140', menu: '닭가슴살 샐러드', date: '4/25 · 12:30', status: '완료', statusColor: '#888', statusBg: '#F5F5F5' },
    { id: 'TT-0139', menu: '불고기 덮밥', date: '4/24 · 12:00', status: '완료', statusColor: '#888', statusBg: '#F5F5F5' },
  ];

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430, position: 'relative' }}>

        {/* 상태바 */}
        <div style={{ background: '#1A1A1A', height: 44 }}></div>

        {/* 탭 */}
        <div style={{ background: '#fff', display: 'flex', borderBottom: '1px solid #eee' }}>
          {tabs.map((tab, i) => (
            <div key={tab} onClick={() => setActiveTab(i)}
              style={{ flex: 1, padding: '12px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: activeTab === i ? '#3B6D11' : '#aaa', borderBottom: `2px solid ${activeTab === i ? '#3B6D11' : 'transparent'}` }}>
              {tab}
            </div>
          ))}
        </div>

        {/* 내 정보 탭 */}
        {activeTab === 0 && (
          <div style={{ paddingBottom: 80 }}>
            {/* 프로필 */}
            <div style={{ background: '#1A1A1A', padding: '14px 14px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#3B6D11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#C0DD97', flexShrink: 0 }}>김</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>김직장 님</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>가입 3개월 · 일반회원</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['24', '총 주문'], ['8', '이번달'], ['불고기덮밥', '단골']].map(([val, lbl]) => (
                  <div key={lbl} style={{ flex: 1, background: '#2C2C2A', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: val.length > 3 ? 11 : 18, fontWeight: 700, color: lbl === '이번달' ? '#C0DD97' : lbl === '단골' ? '#EF9F27' : '#fff', lineHeight: 1.3 }}>{val}</div>
                    <div style={{ fontSize: 8.5, color: '#888', marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 오늘 예약 */}
            <div style={{ margin: '8px 12px', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #3B6D11' }}>
              <div style={{ background: '#EAF3DE', padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#3B6D11' }}>오늘 예약</div>
              <div style={{ background: '#fff', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>닭가슴살 샐러드</div>
                  <div style={{ fontSize: 10, color: '#3B6D11', marginTop: 2 }}>13:00 픽업</div>
                </div>
                <button onClick={() => router.push('/confirm')}
                  style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
                  QR 보기
                </button>
              </div>
            </div>

            {/* 크레딧 */}
            <div style={{ background: '#fff', margin: '0 12px 8px', borderRadius: 12, padding: '12px 14px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#888' }}>선불 크레딧 잔액</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>12,000원</div>
                </div>
                <button style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 18, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>충전</button>
              </div>
              <div style={{ background: '#eee', height: 5, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ background: '#3B6D11', height: '100%', width: '17%' }}></div>
              </div>
            </div>

            {/* 내일 메뉴 배너 */}
            <div onClick={() => router.push('/calendar')}
              style={{ background: '#EAF3DE', borderRadius: 10, margin: '0 12px', padding: '10px 12px', cursor: 'pointer', border: '1px solid #C0DD97', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#3B6D11' }}>내일 메뉴 공개됐어요!</div>
                <div style={{ fontSize: 10, color: '#639922' }}>닭갈비 덮밥 / 연어 샐러드</div>
              </div>
              <span style={{ color: '#3B6D11' }}>→</span>
            </div>
          </div>
        )}

        {/* 주문내역 탭 */}
        {activeTab === 1 && (
          <div style={{ paddingBottom: 80 }}>
            <div style={{ background: '#EAF3DE', margin: '8px 12px', borderRadius: 10, padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
              {[['8', '이번달'], ['68,000원', '사용금액'], ['0', '취소']].map(([val, lbl]) => (
                <div key={lbl} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: lbl === '사용금액' ? 14 : 16, fontWeight: 700, color: '#3B6D11' }}>{val}</div>
                  <div style={{ fontSize: 9, color: '#639922' }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', margin: '0 12px', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee' }}>
              {orders.map((o, i) => (
                <div key={o.id} onClick={() => o.status === '대기중' && router.push('/confirm')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderBottom: i < orders.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: o.status === '대기중' ? 'pointer' : 'default' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{o.menu}</div>
                    <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{o.date}</div>
                  </div>
                  <span style={{ background: o.statusBg, color: o.statusColor, fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 8 }}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 설정 탭 */}
        {activeTab === 2 && (
          <div style={{ paddingBottom: 80, padding: '8px 12px 80px' }}>
            {[
              { title: '계정', items: ['프로필 수정', '픽업 기본 장소', '결제 수단 관리'] },
              { title: '알림', items: ['내일 메뉴 알림 (오후 6시)', '픽업 리마인더'] },
            ].map(section => (
              <div key={section.title}>
                <div style={{ fontSize: 10, color: '#888', fontWeight: 600, margin: '10px 0 4px' }}>{section.title}</div>
                <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', marginBottom: 8 }}>
                  {section.items.map((item, i) => (
                    <div key={item} style={{ padding: '12px 14px', borderBottom: i < section.items.length - 1 ? '1px solid #f5f5f5' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: 13 }}>{item}</span>
                      {section.title === '알림' ? (
                        <div style={{ width: 34, height: 18, background: '#3B6D11', borderRadius: 9, position: 'relative' }}>
                          <div style={{ position: 'absolute', top: 2, right: 2, width: 14, height: 14, background: '#fff', borderRadius: '50%' }}></div>
                        </div>
                      ) : (
                        <span style={{ color: '#ccc' }}>›</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', padding: '12px', fontSize: 13, color: '#E24B4A', cursor: 'pointer' }}>로그아웃</div>
          </div>
        )}

        {/* 하단 탭바 */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
          {[['🏠','홈',false], ['📅','메뉴달력',false], ['🔄','구독',false], ['👤','마이',true], ['☰','더보기',false]].map(([icon, label, active]) => (
            <div key={String(label)} onClick={() => { if(label==='홈') router.push('/'); if(label==='메뉴달력') router.push('/calendar'); }}
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