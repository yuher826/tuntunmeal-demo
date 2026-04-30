'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month - 1, 1).getDay();
const getDayOfWeek = (year: number, month: number, day: number) => new Date(year, month - 1, day).getDay();

type DayMenu = { menu1: number | null; menu2: number | null };
type DayType = 'menu' | 'holiday';
type DayData = { type: DayType; menu?: DayMenu; reason?: string };
type MenuOption = { id: number; name: string; kcal: number };

export default function MenuCalendarPage() {
  const router = useRouter();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [saturdayOpen, setSaturdayOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [dayData, setDayData] = useState<Record<string, DayData>>({});
  const [mode, setMode] = useState<'menu' | 'holiday'>('menu');
  const [editMenu, setEditMenu] = useState<DayMenu>({ menu1: null, menu2: null });
  const [holidayReason, setHolidayReason] = useState('');
  const [toast, setToast] = useState('');
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenus = async () => {
      const { data } = await supabase.from('menus').select('id, name, kcal').order('id');
      if (data) setMenuOptions(data);
    };
    fetchMenus();
  }, []);

  useEffect(() => {
    const fetchCalendar = async () => {
      const { data } = await supabase
        .from('menu_calendar')
        .select('*')
        .like('date', `${year}-${String(month).padStart(2, '0')}-%`);
      if (data) {
        const mapped: Record<string, DayData> = {};
        data.forEach((row: any) => {
          mapped[row.date] = {
            type: row.type,
            menu: { menu1: row.menu1_id, menu2: row.menu2_id },
            reason: row.holiday_reason,
          };
        });
        setDayData(mapped);
      }
    };
    fetchCalendar();
  }, [year, month]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayDate = new Date();
  const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() + 1 === month;
  const today = isCurrentMonth ? todayDate.getDate() : -1;

  const getKey = (y: number, m: number, d: number) =>
    `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const isAutoHoliday = (day: number) => {
    const dow = getDayOfWeek(year, month, day);
    if (dow === 0) return true;
    if (dow === 6 && !saturdayOpen) return true;
    return false;
  };

  const handleDayClick = (day: number) => {
    if (isAutoHoliday(day)) return;
    const key = getKey(year, month, day);
    const existing = dayData[key];
    setSelectedDay(day);
    if (existing?.type === 'holiday') {
      setMode('holiday');
      setHolidayReason(existing.reason || '');
      setEditMenu({ menu1: null, menu2: null });
    } else {
      setMode('menu');
      setEditMenu(existing?.menu || { menu1: null, menu2: null });
      setHolidayReason('');
    }
  };

  const handleSave = async () => {
    if (!selectedDay) return;
    setLoading(true);
    const key = getKey(year, month, selectedDay);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

    if (mode === 'holiday') {
      await supabase.from('menu_calendar').upsert({
        date: dateStr, type: 'holiday',
        menu1_id: null, menu2_id: null,
        holiday_reason: holidayReason,
      }, { onConflict: 'date' });
      setDayData(prev => ({ ...prev, [key]: { type: 'holiday', reason: holidayReason } }));
      showToast('휴일로 지정됐어요! 🔴');
    } else {
      if (!editMenu.menu1 && !editMenu.menu2) {
        await supabase.from('menu_calendar').delete().eq('date', dateStr);
        setDayData(prev => { const next = { ...prev }; delete next[key]; return next; });
      } else {
        await supabase.from('menu_calendar').upsert({
          date: dateStr, type: 'menu',
          menu1_id: editMenu.menu1, menu2_id: editMenu.menu2,
          holiday_reason: '',
        }, { onConflict: 'date' });
        setDayData(prev => ({ ...prev, [key]: { type: 'menu', menu: editMenu } }));
      }
      showToast('메뉴가 저장됐어요! ✅');
    }
    setLoading(false);
    setSelectedDay(null);
  };

  const handleDeleteDay = async (dateStr: string, key: string) => {
    if (!confirm('삭제하시겠습니까?')) return;
    await supabase.from('menu_calendar').delete().eq('date', dateStr);
    setDayData(prev => { const next = { ...prev }; delete next[key]; return next; });
    showToast('삭제됐어요!');
  };

  const handleClear = async () => {
    if (!selectedDay) return;
    const key = getKey(year, month, selectedDay);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    await supabase.from('menu_calendar').delete().eq('date', dateStr);
    setDayData(prev => { const next = { ...prev }; delete next[key]; return next; });
    setSelectedDay(null);
    showToast('설정이 초기화됐어요!');
  };

  const getMenuName = (id: number | null) => {
    if (!id) return '-';
    return menuOptions.find(m => m.id === id)?.name || '-';
  };

  const currentMonthData = Object.entries(dayData)
    .filter(([key]) => key.startsWith(`${year}-${String(month).padStart(2, '0')}-`))
    .sort(([a], [b]) => Number(a.split('-')[2]) - Number(b.split('-')[2]));

  const menuCount = currentMonthData.filter(([, v]) => v.type === 'menu').length;
  const holidayCount = currentMonthData.filter(([, v]) => v.type === 'holiday').length;
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getDayStyle = (day: number) => {
    const dow = getDayOfWeek(year, month, day);
    const key = getKey(year, month, day);
    const data = dayData[key];
    const isToday = day === today;
    const autoHoliday = isAutoHoliday(day);
    if (autoHoliday) return { bg: '#F5F5F5', color: '#ccc', border: '1px solid #eee', cursor: 'not-allowed' };
    if (data?.type === 'holiday') return { bg: '#FFE5E5', color: '#D32F2F', border: '1px solid #ffcdd2', cursor: 'pointer' };
    if (data?.type === 'menu') return { bg: '#3B6D11', color: '#fff', border: '1px solid #3B6D11', cursor: 'pointer' };
    if (isToday) return { bg: '#E8F5D8', color: '#3B6D11', border: '2px solid #3B6D11', cursor: 'pointer' };
    return { bg: '#f9f9f9', color: dow === 0 ? '#e74c3c' : dow === 6 ? '#3498db' : '#333', border: '1px solid #eee', cursor: 'pointer' };
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif', background: '#F7F8FA' }}>

      {/* 헤더 */}
      <div style={{ background: '#1a3a5c', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: 0 }}>←</button>
          <div style={{ fontSize: 18, fontWeight: 700 }}>날짜별 메뉴 지정</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 16, cursor: 'pointer' }}>◀</button>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{year}년 {month}월</span>
          <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 16, cursor: 'pointer' }}>▶</button>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}

      {/* 토요일 운영 토글 */}
      <div style={{ background: '#fff', padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>🗓️ 토요일 운영</div>
          <div style={{ fontSize: 11, color: '#888' }}>{saturdayOpen ? '토요일 운영 중' : '토요일 휴무 중'}</div>
        </div>
        <div onClick={() => setSaturdayOpen(v => !v)}
          style={{ width: 48, height: 26, borderRadius: 13, background: saturdayOpen ? '#3B6D11' : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: saturdayOpen ? 24 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        </div>
      </div>

      {/* 범례 */}
      <div style={{ display: 'flex', gap: 10, padding: '10px 16px', background: '#fff', borderBottom: '1px solid #eee', fontSize: 11, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#3B6D11' }} />메뉴등록</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#FFE5E5', border: '1px solid #ffcdd2' }} />휴일</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#E8F5D8', border: '1px solid #3B6D11' }} />오늘</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: '#F5F5F5', border: '1px solid #eee' }} />자동휴무</div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* 달력 */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
            {weekDays.map((d, i) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: i === 0 ? '#e74c3c' : i === 6 ? '#3498db' : '#555', padding: '4px 0' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const s = getDayStyle(day);
              const key = getKey(year, month, day);
              const data = dayData[key];
              return (
                <div key={day} onClick={() => handleDayClick(day)}
                  style={{ aspectRatio: '1', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: s.border, background: s.bg, cursor: s.cursor }}>
                  <div style={{ fontSize: 12, fontWeight: day === today ? 700 : 400, color: s.color }}>{day}</div>
                  {data?.type === 'menu' && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', marginTop: 1 }} />}
                  {data?.type === 'holiday' && <div style={{ fontSize: 8, color: '#D32F2F', marginTop: 1 }}>휴</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 현황 */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '14px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📋 {month}월 현황</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
            <div style={{ background: '#E8F5D8', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#3B6D11' }}>{menuCount}</div>
              <div style={{ fontSize: 10, color: '#3B6D11' }}>메뉴등록</div>
            </div>
            <div style={{ background: '#FFE5E5', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#D32F2F' }}>{holidayCount}</div>
              <div style={{ fontSize: 10, color: '#D32F2F' }}>휴일지정</div>
            </div>
            <div style={{ background: '#FFF8E1', borderRadius: 8, padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#F59E0B' }}>{daysInMonth - menuCount - holidayCount}</div>
              <div style={{ fontSize: 10, color: '#F59E0B' }}>미등록</div>
            </div>
          </div>
          {currentMonthData.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '16px 0' }}>이번 달 등록된 내용이 없어요</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {currentMonthData.map(([key, data]) => {
                const day = key.split('-')[2];
                const dateStr = key;
                return (
                  <div key={key}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: data.type === 'holiday' ? '#FFF5F5' : '#f9f9f9', borderRadius: 8, border: data.type === 'holiday' ? '1px solid #ffcdd2' : '1px solid transparent' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => handleDayClick(Number(day))}>{month}/{day}</div>
                    {data.type === 'menu'
                      ? <div style={{ fontSize: 11, color: '#555', flex: 1, textAlign: 'center' }}>{getMenuName(data.menu?.menu1 ?? null)} / {getMenuName(data.menu?.menu2 ?? null)}</div>
                      : <div style={{ fontSize: 11, color: '#D32F2F', flex: 1, textAlign: 'center' }}>🔴 휴일 {data.reason ? `(${data.reason})` : ''}</div>
                    }
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div onClick={() => handleDayClick(Number(day))} style={{ fontSize: 11, color: '#3B6D11', cursor: 'pointer' }}>수정 ›</div>
                      <div onClick={() => handleDeleteDay(dateStr, key)} style={{ fontSize: 11, color: '#D32F2F', cursor: 'pointer' }}>삭제 🗑️</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 팝업 */}
      {selectedDay && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: 390, paddingBottom: 40, maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ width: 40, height: 4, background: '#eee', borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{month}월 {selectedDay}일 설정</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button onClick={() => setMode('menu')}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: mode === 'menu' ? '#3B6D11' : '#f0f0f0', color: mode === 'menu' ? '#fff' : '#555' }}>
                📋 메뉴 지정
              </button>
              <button onClick={() => setMode('holiday')}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: mode === 'holiday' ? '#D32F2F' : '#f0f0f0', color: mode === 'holiday' ? '#fff' : '#555' }}>
                🔴 휴일 지정
              </button>
            </div>

            {mode === 'menu' ? (
              <>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>메뉴 1</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {menuOptions.map(m => (
                      <div key={m.id} onClick={() => setEditMenu({ ...editMenu, menu1: m.id })}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 8, border: editMenu.menu1 === m.id ? '2px solid #3B6D11' : '1px solid #eee', background: editMenu.menu1 === m.id ? '#F0F9E8' : '#fff', cursor: 'pointer' }}>
                        <span style={{ fontSize: 13, fontWeight: editMenu.menu1 === m.id ? 700 : 400 }}>{m.name}</span>
                        <span style={{ fontSize: 11, color: '#888' }}>{m.kcal}kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>메뉴 2</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {menuOptions.map(m => (
                      <div key={m.id} onClick={() => setEditMenu({ ...editMenu, menu2: m.id })}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 8, border: editMenu.menu2 === m.id ? '2px solid #185FA5' : '1px solid #eee', background: editMenu.menu2 === m.id ? '#EBF5FB' : '#fff', cursor: 'pointer' }}>
                        <span style={{ fontSize: 13, fontWeight: editMenu.menu2 === m.id ? 700 : 400 }}>{m.name}</span>
                        <span style={{ fontSize: 11, color: '#888' }}>{m.kcal}kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: '#555' }}>휴일 사유 (선택)</div>
                <input placeholder="예: 추석 연휴, 임시 휴무 등" value={holidayReason} onChange={e => setHolidayReason(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, boxSizing: 'border-box' }} />
                <div style={{ marginTop: 10, padding: '10px', background: '#FFF5F5', borderRadius: 8, fontSize: 12, color: '#D32F2F' }}>
                  ⚠️ 휴일로 지정하면 이날 고객 주문이 불가능해요
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleClear} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#888' }}>초기화</button>
              <button onClick={() => setSelectedDay(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>취소</button>
              <button onClick={handleSave} disabled={loading}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: loading ? '#aaa' : mode === 'holiday' ? '#D32F2F' : '#1a3a5c', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {loading ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}