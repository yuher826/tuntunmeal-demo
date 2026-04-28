'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { icon: '🏠', label: '홈', path: '/' },
    { icon: '📅', label: '메뉴달력', path: '/calendar' },
    { icon: '📋', label: '구독', path: '/subscription' },
    { icon: '👤', label: '마이', path: '/mypage' },
    { icon: '≡', label: '더보기', path: '/more' },
  ];

  return (
    <>
      <div style={{ height: 60 }} />
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: '#fff', borderTop: '1px solid #eee', display: 'flex', padding: '6px 0 8px' }}>
        {tabs.map(({ icon, label, path }) => (
          <div key={path} onClick={() => router.push(path)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            <div style={{ fontSize: 18 }}>{icon}</div>
            <div style={{ fontSize: 9, color: pathname === path ? '#3B6D11' : '#B4B2A9', fontWeight: pathname === path ? 700 : 400 }}>{label}</div>
          </div>
        ))}
      </div>
    </>
  );
}