'use client';
import BottomNav from './components/BottomNav';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const menus = [
  {
    id: 1, name: '불고기 덮밥', kcal: 520, price: 9500, emoji: '🍖',
    desc: '국내산 소불고기를 특제 양념에 재워 밥 위에 올린 대표 메뉴',
    allergy: '대두, 밀, 쇠고기',
    nutrition: { carb: 68, protein: 28, fat: 12 },
    badge: '인기 1위',
  },
  {
    id: 2, name: '닭가슴살 샐러드', kcal: 380, price: 8500, emoji: '🥗',
    desc: '저칼로리 닭가슴살과 신선한 채소로 구성된 건강 샐러드',
    allergy: '닭고기, 계란',
    nutrition: { carb: 22, protein: 38, fat: 8 },
    badge: '다이어트 추천',
  },
];

const WEATHER_CACHE_KEY = 'tuntunmeal_weather';
const CACHE_DURATION = 60 * 60 * 1000; // 1시간

export default function Home() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [detailMenu, setDetailMenu] = useState<typeof menus[0] | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [likeToast, setLikeToast] = useState('');
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon: string } | null>(null);

  // 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const kst = new Date(now.getTime() + (9 * 60 - now.getTimezoneOffset()) * 60000);
      const deadline = new Date(kst);
      deadline.setHours(10, 0, 0, 0);
      if (kst >= deadline) deadline.setDate(deadline.getDate() + 1);
      const diff = deadline.getTime() - kst.getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 날씨 (1시간 캐싱)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const cached = localStorage.getItem(WEATHER_CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setWeather(data);
            return;
          }
        }
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Anyang,KR&appid=${API_KEY}&units=metric&lang=kr`);
        const json = await res.json();
        const data = {
          temp: Math.round(json.main.temp),
          desc: json.weather[0].description,
          icon: json.weather[0].main,
        };
        localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        setWeather(data);
      } catch (e) {
        console.log('날씨 불러오기 실패', e);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherEmoji = (icon: string) => {
    const map: Record<string, string> = {
      Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️',
      Snow: '❄️', Thunderstorm: '⛈️', Mist: '🌫️', Fog: '🌫️',
    };
    return map[icon] || '🌤️';
  };

  const toggleLike = (menu: typeof menus[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = liked.includes(menu.id);
    setLiked(isLiked ? liked.filter(id => id !== menu.id) : [...liked, menu.id]);
    setLikeToast(isLiked ? `${menu.name} 찜 해제됐어요` : `${menu.name} 찜했어요! ❤️`);
    setTimeout(() => setLikeToast(''), 2000);
  };

  const times = ['11:30', '12:00', '12:30', '13:00'];

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#2C3E1A', padding: '16px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>튼튼밀</div>
            <div style={{ fontSize: 9, color: '#9FE1CB', letterSpacing: 2 }}>TUNTUNMEAL</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* 날씨 */}
            {weather && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '4px 10px' }}>
                <span style={{ fontSize: 16 }}>{getWeatherEmoji(weather.icon)}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{weather.temp}°</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{weather.desc}</span>
              </div>
            )}
            <div style={{ background: '#3B6D11', borderRadius: 14, padding: '4px 12px', fontSize: 10, fontWeight: 700, color: '#fff' }}>
              AM 5:00 부터
            </div>
          </div>
        </div>

        {/* 타이머 */}
        <div style={{ background: '#2C3E1A', padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#9FE1CB', marginBottom: 4 }}>오전 10:00 마감까지</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: 3 }}>{timeLeft || '--:--:--'}</div>
        </div>

        {/* 찜 토스트 */}
        {likeToast && (
          <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '12px 24px', borderRadius: 24, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>
            {likeToast}
          </div>
        )}

        {/* 메뉴 선택 */}
        <div style={{ padding: '14px 14px 8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>오늘의 메뉴</span>
            <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 10 }}>2가지 선택</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {menus.map(menu => (
              <div key={menu.id}
                style={{ background: '#fff', border: `2px solid ${selectedMenu === menu.id ? '#3B6D11' : '#eee'}`, borderRadius: 12, cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 6, left: 6, background: '#3B6D11', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 6, zIndex: 1 }}>
                  {menu.badge}
                </div>
                <div onClick={e => toggleLike(menu, e)}
                  style={{ position: 'absolute', top: 4, right: 4, fontSize: 20, cursor: 'pointer', zIndex: 2, filter: liked.includes(menu.id) ? 'none' : 'grayscale(100%)', opacity: liked.includes(menu.id) ? 1 : 0.5 }}>
                  ❤️
                </div>
                <div onClick={e => { e.stopPropagation(); setDetailMenu(menu); }}
                  style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.25)', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 6, cursor: 'pointer', zIndex: 2 }}>
                  상세 ℹ️
                </div>
                <div onClick={() => setSelectedMenu(menu.id)}
                  style={{ height: 70, background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  {menu.emoji}
                </div>
                <div onClick={() => setSelectedMenu(menu.id)} style={{ padding: '8px 10px 10px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{menu.name}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{menu.kcal}kcal</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#3B6D11', marginTop: 3 }}>{menu.price.toLocaleString()}원</div>
                  {selectedMenu === menu.id && (
                    <div style={{ background: '#3B6D11', color: '#fff', fontSize: 9, fontWeight: 700, textAlign: 'center', borderRadius: 4, marginTop: 4, padding: '2px 0' }}>선택됨 ✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 찜한 메뉴 */}
          {liked.length > 0 && (
            <div style={{ background: '#FFF0F0', borderRadius: 10, padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>❤️</span>
              <div style={{ fontSize: 12, color: '#C0392B', fontWeight: 600 }}>
                찜한 메뉴: {menus.filter(m => liked.includes(m.id)).map(m => m.name).join(', ')}
              </div>
            </div>
          )}

          {/* 픽업 시간 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>픽업 시간</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {times.map(t => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: selectedTime === t ? '2px solid #3B6D11' : '1px solid #ddd', background: selectedTime === t ? '#E8F5D8' : '#fff', color: selectedTime === t ? '#3B6D11' : '#555', fontSize: 12, fontWeight: selectedTime === t ? 700 : 400, cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 주문 버튼 */}
          <button
            onClick={() => { if (selectedMenu && selectedTime) router.push('/payment'); }}
            disabled={!selectedMenu || !selectedTime}
            style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: selectedMenu && selectedTime ? '#3B6D11' : '#ddd', color: '#fff', fontSize: 15, fontWeight: 800, cursor: selectedMenu && selectedTime ? 'pointer' : 'default', marginBottom: 14 }}>
            {selectedMenu && selectedTime ? '주문하기 →' : '메뉴와 시간을 선택하세요'}
          </button>

          {/* 하단 메뉴 */}
          {[
            { icon: '📅', bg: '#EAF3DE', title: '메뉴 달력 미리보기', desc: '내일~이번 달 전체 메뉴 확인', path: '/calendar' },
            { icon: '📋', bg: '#EAF3DE', title: '정기구독', desc: '매일 자동 예약 · 5% 할인', path: '/subscription' },
            { icon: '🏢', bg: '#185FA5', title: '기업 단체계약 B2B', desc: '10인 이상 · 매니저 담당', path: '/b2b' },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{ background: '#fff', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, background: item.bg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{item.title}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{item.desc}</div>
                </div>
              </div>
              <span style={{ color: '#ccc' }}>›</span>
            </div>
          ))}
        </div>

        {/* 메뉴 상세보기 팝업 */}
        {detailMenu && (
          <div onClick={() => setDetailMenu(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
            <div onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 390, background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px', paddingBottom: 40, position: 'relative' }}>
              <button onClick={() => setDetailMenu(null)}
                style={{ position: 'absolute', right: 20, top: 20, background: '#f5f5f5', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              <div style={{ width: 40, height: 4, background: '#eee', borderRadius: 2, margin: '0 auto 20px' }} />
              <div style={{ textAlign: 'center', marginBottom: 20, position: 'relative' }}>
                <div style={{ fontSize: 56, marginBottom: 8 }}>{detailMenu.emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{detailMenu.name}</div>
                <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{detailMenu.desc}</div>
                <button onClick={e => toggleLike(detailMenu, e)}
                  style={{ marginTop: 10, background: liked.includes(detailMenu.id) ? '#FFF0F0' : '#f9f9f9', border: liked.includes(detailMenu.id) ? '1px solid #ffb3b3' : '1px solid #eee', borderRadius: 20, padding: '6px 16px', fontSize: 13, cursor: 'pointer', color: liked.includes(detailMenu.id) ? '#C0392B' : '#888', fontWeight: 600 }}>
                  {liked.includes(detailMenu.id) ? '❤️ 찜됨' : '🤍 찜하기'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <div style={{ flex: 1, background: '#F0F9E8', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#3B6D11' }}>{detailMenu.price.toLocaleString()}원</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>가격</div>
                </div>
                <div style={{ flex: 1, background: '#FFF8E8', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#e67e22' }}>{detailMenu.kcal}kcal</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>칼로리</div>
                </div>
              </div>
              <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '12px', marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>영양성분</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: '탄수화물', value: detailMenu.nutrition.carb, color: '#3498db' },
                    { label: '단백질', value: detailMenu.nutrition.protein, color: '#e74c3c' },
                    { label: '지방', value: detailMenu.nutrition.fat, color: '#f39c12' },
                  ].map(n => (
                    <div key={n.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 14, fontWeight: 900, color: n.color }}>{n.value}g</div>
                      <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{n.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#FFF8E8', borderRadius: 10, padding: '10px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#e67e22' }}>알레르기 정보</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{detailMenu.allergy}</div>
                </div>
              </div>
              <button onClick={() => { setSelectedMenu(detailMenu.id); setDetailMenu(null); }}
                style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: '#3B6D11', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                이 메뉴 선택하기 ✓
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </div>
  );
}