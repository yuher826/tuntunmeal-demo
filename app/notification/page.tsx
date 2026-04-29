'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../components/BottomNav';

const initialNotifications = [
  { id: 1, type: 'pickup', title: '픽업 시간 알림', desc: '12:00 픽업 30분 전이에요! 🍱', time: '11:30', read: false },
  { id: 2, type: 'deadline', title: '주문 마감 임박!', desc: '오전 10:00 마감 10분 전이에요!', time: '09:50', read: false },
  { id: 3, type: 'event', title: '이벤트 알림', desc: '오늘 불고기 덮밥 100원 할인! 🎉', time: '08:00', read: true },
  { id: 4, type: 'pickup', title: '픽업 완료', desc: '불고기 덮밥 픽업이 확인됐어요 ✅', time: '어제', read: true },
  { id: 5, type: 'event', title: '정기구독 혜택', desc: '이번 달 구독 5% 할인 적용됐어요 💚', time: '어제', read: true },
];

const typeColor: Record<string, { bg: string; color: string; icon: string }> = {
  pickup: { bg: '#E8F5D8', color: '#3B6D11', icon: '🍱' },
  deadline: { bg: '#FFF3E0', color: '#e67e22', icon: '⏰' },
  event: { bg: '#EBF5FB', color: '#185FA5', icon: '🎁' },
};

export default function NotificationPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [settings, setSettings] = useState({
    pickup: true,
    deadline: true,
    event: true,
    marketing: false,
  });
  const [activeTab, setActiveTab] = useState<'list' | 'settings'>('list');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 390, background: '#F0F4EC', fontFamily: 'sans-serif' }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', color: '#fff', padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', padding: 0 }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              알림
              {unreadCount > 0 && (
                <span style={{ marginLeft: 8, background: '#e74c3c', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>{unreadCount}</span>
              )}
            </div>
          </div>
          {activeTab === 'list' && unreadCount > 0 && (
            <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 12, cursor: 'pointer' }}>
              모두 읽음
            </button>
          )}
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', background: '#fff', borderBottom: '2px solid #eee' }}>
          {[
            { id: 'list', label: '🔔 알림 목록' },
            { id: 'settings', label: '⚙️ 알림 설정' },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              style={{ flex: 1, padding: '12px 0', border: 'none', background: 'none', fontSize: 13, fontWeight: activeTab === t.id ? 700 : 400, color: activeTab === t.id ? '#3B6D11' : '#999', borderBottom: activeTab === t.id ? '2px solid #3B6D11' : '2px solid transparent', cursor: 'pointer' }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '12px 16px' }}>

          {/* 알림 목록 */}
          {activeTab === 'list' && (
            <div>
              {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#bbb', fontSize: 13 }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔕</div>
                  알림이 없어요
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {notifications.map(n => {
                    const style = typeColor[n.type];
                    return (
                      <div key={n.id} onClick={() => markRead(n.id)}
                        style={{ background: n.read ? '#fff' : '#F0F9E8', borderRadius: 12, padding: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: n.read ? 'none' : '1px solid #d5e8c4', cursor: 'pointer', position: 'relative' }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: style.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                            {style.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</div>
                              <div style={{ fontSize: 10, color: '#bbb' }}>{n.time}</div>
                            </div>
                            <div style={{ fontSize: 12, color: '#555', marginTop: 3 }}>{n.desc}</div>
                          </div>
                        </div>
                        {!n.read && (
                          <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: '#e74c3c' }} />
                        )}
                        <button onClick={e => { e.stopPropagation(); deleteNotification(n.id); }}
                          style={{ position: 'absolute', bottom: 10, right: 12, background: 'none', border: 'none', fontSize: 11, color: '#ccc', cursor: 'pointer' }}>
                          삭제
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 알림 설정 */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, color: '#888', background: '#f9f9f9' }}>알림 종류</div>
                {[
                  { key: 'pickup', icon: '🍱', label: '픽업 알림', desc: '픽업 30분 전 알림' },
                  { key: 'deadline', icon: '⏰', label: '마감 임박 알림', desc: '주문 마감 10분 전 알림' },
                  { key: 'event', icon: '🎁', label: '이벤트 알림', desc: '할인/이벤트 소식 알림' },
                  { key: 'marketing', icon: '📢', label: '마케팅 알림', desc: '새 메뉴/프로모션 알림' },
                ].map((item, i) => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderTop: i === 0 ? 'none' : '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: 20, marginRight: 12 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <div onClick={() => toggleSetting(item.key as any)}
                      style={{ width: 44, height: 24, borderRadius: 12, background: (settings as any)[item.key] ? '#3B6D11' : '#ddd', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                      <div style={{ position: 'absolute', top: 2, left: (settings as any)[item.key] ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#E8F5D8', borderRadius: 12, padding: '14px', fontSize: 12, color: '#3B6D11' }}>
                💡 알림은 카카오 알림톡으로 전송돼요. 수신 동의 시 중요 알림을 놓치지 않아요!
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}