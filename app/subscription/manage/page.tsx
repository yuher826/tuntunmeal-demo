'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubManage() {
  const router = useRouter();
  const [paused, setPaused] = useState(false);

  const thisWeek = [
    { day: '목', date: 23, menu: '불고기 덮밥', time: '12:00', status: '대기', done: false },
    { day: '금', date: 24, menu: '닭갈비 덮밥', time: '12:00', status: '예정', done: false },
  ];

  const nextWeek = [
    { day: '월', date: 27, menu: '제육볶음 덮밥', time: '픽업 시간 선택', status: '예약전', done: false },
    { day: '화', date: 28, menu: '된장국 정식', time: '픽업 시간 선택', status: '예약전', done: false },
    { day: '수', date: 29, menu: '비빔밥 정식', time: '픽업 시간 선택', status: '예약전', done: false },
  ];

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#27500A', padding: '10px 14px 12px' }}>
          <div style={{ fontSize: 10, color: '#9FE1CB', marginBottom: 2 }}>주간 구독 중</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>내 구독 메뉴 일정</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)' }}>자동 예약된 메뉴를 미리 확인하세요</div>
        </div>

        <div style={{ padding: '10px 12px 80px' }}>

          {/* 주간 요약 */}
          <div style={{ background: '#EAF3DE', borderRadius: 10, padding: '10px 12px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#27500A' }}>4월 4주차</div>
              <div style={{ fontSize: 10, color: '#3B6D11' }}>자동 예약 완료 5일</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#3B6D11' }}>45,125원</div>
          </div>

          {/* 일시정지 배너 */}
          {paused && (
            <div style={{ background: '#FAEEDA', borderRadius: 10, padding: '10px 12px', marginBottom: 10, border: '1px solid #EF9F27', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 12, color: '#854F0B', fontWeight: 600 }}>⏸ 구독 일시정지 중</div>
              <button onClick={() => setPaused(false)}
                style={{ background: '#EF9F27', color: '#fff', border: 'none', borderRadius: 8, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>재개</button>
            </div>
          )}

          {/* 이번 주 */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6 }}>이번 주 (자동 예약됨)</div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', marginBottom: 10 }}>
            {thisWeek.map((d, i) => (
              <div key={d.date} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: i < thisWeek.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div style={{ width: 34, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 9, color: '#888' }}>{d.day}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#3B6D11' }}>{d.date}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.menu}</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>픽업 {d.time}</div>
                </div>
                <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 8 }}>{d.status}</span>
              </div>
            ))}
          </div>

          {/* 다음 주 */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6 }}>다음 주 (관리자 등록됨 — 미리보기)</div>
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #C0DD97', marginBottom: 10 }}>
            {nextWeek.map((d, i) => (
              <div key={d.date} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: i < nextWeek.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer' }}>
                <div style={{ width: 34, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 9, color: '#888' }}>{d.day}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#97C459' }}>{d.date}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.menu}</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{d.time}</div>
                </div>
                <span style={{ background: '#F7FCF0', color: '#639922', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 7, border: '1px solid #C0DD97' }}>예약전</span>
              </div>
            ))}
          </div>

          {/* 미등록 구간 */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6 }}>미등록 구간</div>
          <div style={{ background: '#F5F5F5', borderRadius: 10, padding: '10px', textAlign: 'center', border: '1px dashed #ddd', marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: '#aaa' }}>4/30~ 관리자 등록 후 공개</div>
          </div>

          {/* 버튼 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button onClick={() => setPaused(!paused)}
              style={{ flex: 1, background: '#fff', color: '#3B6D11', border: '1.5px solid #3B6D11', borderRadius: 11, padding: '12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              {paused ? '▶ 구독 재개' : '⏸ 일시정지'}
            </button>
            <button style={{ flex: 1, background: '#fff', color: '#3B6D11', border: '1.5px solid #3B6D11', borderRadius: 11, padding: '12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              🔄 플랜 변경
            </button>
          </div>
          <button style={{ width: '100%', background: '#FDE8E8', color: '#E24B4A', border: 'none', borderRadius: 11, padding: '12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
            ✕ 구독 해지
          </button>

        </div>

        {/* 하단 탭바 */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
          {[['🏠','홈',false,'/'],[' 📅','메뉴달력',false,'/calendar'],['🔄','구독',true,'/subscription'],['👤','마이',false,'/mypage'],['☰','더보기',false,'/more']].map(([icon, label, active, path]) => (
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