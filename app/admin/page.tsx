'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDash() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const kpis = [
    { val: '47', label: '총 주문', color: '#1A1A1A' },
    { val: '31', label: '픽업 완료', color: '#3B6D11' },
    { val: '16', label: '대기중', color: '#EF9F27' },
    { val: '2', label: '취소', color: '#E24B4A' },
  ];

  const timeSlots = [
    { time: '11:30', done: 12, total: 12, pct: 100 },
    { time: '12:00', done: 11, total: 14, pct: 79 },
    { time: '12:30', done: 8, total: 14, pct: 57 },
    { time: '13:00', done: 0, total: 7, pct: 0 },
  ];

  const orders = [
    { id: 'TT-0142', name: '김직장', menu: '닭가슴살 샐러드', time: '13:00', status: '대기', statusBg: '#FFF3E0', statusColor: '#EF9F27' },
    { id: 'TT-0141', name: '이오피스', menu: '불고기 덮밥', time: '12:30', status: '완료', statusBg: '#EAF3DE', statusColor: '#3B6D11' },
    { id: 'TT-0140', name: '박점심', menu: '닭가슴살 샐러드', time: '12:30', status: '완료', statusBg: '#EAF3DE', statusColor: '#3B6D11' },
    { id: 'TT-0139', name: '최밥심', menu: '불고기 덮밥', time: '12:00', status: '완료', statusBg: '#EAF3DE', statusColor: '#3B6D11' },
  ];

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', padding: '10px 14px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, color: '#9FE1CB' }}>관리자 대시보드</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>오늘 운영 현황</div>
            </div>
            <div style={{ background: '#2C5610', borderRadius: 8, padding: '4px 10px', fontSize: 10, color: '#C0DD97', fontWeight: 600 }}>2026.04.27</div>
          </div>
        </div>

        <div style={{ padding: '10px 12px 80px' }}>

          {/* KPI 4개 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            {kpis.map(k => (
              <div key={k.label} style={{ background: '#fff', borderRadius: 10, padding: '12px', textAlign: 'center', border: '1px solid #eee' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: k.color }}>{k.val}</div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{k.label}</div>
              </div>
            ))}
          </div>

          {/* 오늘 매출 */}
          <div style={{ background: '#1A1A1A', borderRadius: 10, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: '#888' }}>오늘 매출</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#9FE1CB' }}>427,500원</span>
          </div>

          {/* 시간대별 현황 */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 8 }}>시간대별 픽업 현황</div>
            {timeSlots.map(s => (
              <div key={s.time} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: '#888', width: 36 }}>{s.time}</span>
                <div style={{ flex: 1, background: '#eee', height: 16, borderRadius: 4, overflow: 'hidden' }}>
                  {s.pct > 0 && (
                    <div style={{ background: s.pct === 100 ? '#3B6D11' : '#EF9F27', width: `${s.pct}%`, height: '100%', display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                      <span style={{ fontSize: 9, color: '#fff', fontWeight: 600 }}>{s.done}/{s.total}</span>
                    </div>
                  )}
                </div>
                {s.pct === 0 && <span style={{ fontSize: 9, color: '#aaa' }}>0/{s.total}</span>}
              </div>
            ))}
          </div>

          {/* 주문 목록 */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #eee', overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ padding: '10px 14px', background: '#F5F3ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700 }}>주문 목록</span>
              <button onClick={() => router.push('/admin/qr')}
                style={{ background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
                📷 QR 스캔
              </button>
            </div>
            {orders.map((o, i) => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', borderBottom: i < orders.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{o.id} {o.name}</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{o.menu} · {o.time}</div>
                </div>
                <span style={{ background: o.statusBg, color: o.statusColor, fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 8 }}>{o.status}</span>
              </div>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => router.push('/admin/menu')}
              style={{ flex: 1, background: '#3B6D11', color: '#fff', border: 'none', borderRadius: 11, padding: '13px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              🍱 메뉴 등록
            </button>
            <button style={{ flex: 1, background: '#fff', color: '#3B6D11', border: '1.5px solid #3B6D11', borderRadius: 11, padding: '13px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              📊 정산 내역
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}