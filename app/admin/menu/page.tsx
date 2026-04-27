'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminMenu() {
  const router = useRouter();
  const [menuName1, setMenuName1] = useState('불고기 덮밥');
  const [menuName2, setMenuName2] = useState('닭가슴살 샐러드');
  const [price1, setPrice1] = useState('9,500');
  const [price2, setPrice2] = useState('8,500');
  const [kcal1, setKcal1] = useState('520');
  const [kcal2, setKcal2] = useState('380');
  const [qty, setQty] = useState('80');
  const [date, setDate] = useState('2026-04-29');
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [uploadCount, setUploadCount] = useState(14);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>, which: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    which === 1 ? setImg1(url) : setImg2(url);
  };

  const handleSave = () => {
    setSaved(true);
    setUploadCount(prev => prev + 1);
    setTimeout(() => setSaved(false), 2000);
  };

  const pct = Math.min((uploadCount / 60) * 100, 100);
  const inp: React.CSSProperties = {
    width: '100%', background: '#F5F3ED', border: '1px solid #E8E6DE',
    borderRadius: 8, padding: '10px 12px', fontSize: 13,
    fontFamily: "'Malgun Gothic', sans-serif", outline: 'none'
  };

  return (
    <div style={{ background: '#E8E6E0', minHeight: '100vh', display: 'flex', justifyContent: 'center', fontFamily: "'Malgun Gothic', sans-serif" }}>
      <div style={{ background: '#F2F2F2', minHeight: '100vh', width: '100%', maxWidth: 430 }}>

        {/* 헤더 */}
        <div style={{ background: '#3B6D11', padding: '10px 14px 12px' }}>
          <div onClick={() => router.push('/admin')} style={{ color: '#9FE1CB', fontSize: 11, marginBottom: 3, cursor: 'pointer' }}>← 대시보드</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>메뉴 사전 등록</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)' }}>등록한 날짜까지 고객에게 공개됩니다</div>
        </div>

        <div style={{ padding: '10px 12px 80px' }}>

          {/* 등록 현황 진행바 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#888' }}>현재 등록 현황</span>
              {/* 실시간 카운터 */}
              <span style={{ background: uploadCount >= 30 ? '#EAF3DE' : '#FAEEDA', color: uploadCount >= 30 ? '#3B6D11' : '#854F0B', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                {uploadCount}일 등록됨
              </span>
            </div>
            <div style={{ display: 'flex', marginBottom: 10 }}>
              {[[`${uploadCount}일`, '등록 완료', '#3B6D11'], ['30일', '권장', '#EF9F27'], ['60일', '최대', '#B4B2A9']].map(([val, lbl, color]) => (
                <div key={lbl} style={{ flex: 1, textAlign: 'center', borderRight: lbl !== '최대' ? '1px solid #eee' : 'none' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color }}>{val}</div>
                  <div style={{ fontSize: 9, color: '#888' }}>{lbl}</div>
                </div>
              ))}
            </div>
            {/* 진행바 */}
            <div style={{ background: '#eee', height: 8, borderRadius: 4, overflow: 'hidden', position: 'relative', marginBottom: 4 }}>
              <div style={{ background: uploadCount >= 30 ? '#3B6D11' : '#EF9F27', height: '100%', width: `${pct}%`, borderRadius: 4, transition: 'width .5s ease' }}></div>
              <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', borderLeft: '2px dashed #EF9F27' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#888', marginBottom: 6 }}>
              <span style={{ color: uploadCount >= 30 ? '#3B6D11' : '#EF9F27', fontWeight: 700 }}>현재 {uploadCount}일</span>
              <span style={{ color: '#EF9F27' }}>권장 30일</span>
              <span>최대 60일</span>
            </div>
            {/* 상태 메시지 */}
            {uploadCount >= 30 ? (
              <div style={{ background: '#EAF3DE', borderRadius: 7, padding: '7px 10px', fontSize: 10, color: '#3B6D11', fontWeight: 600 }}>
                ✅ 권장 기준 달성! {uploadCount >= 60 ? '최대 등록 완료!' : `${60 - uploadCount}일 더 등록하면 최대!`}
              </div>
            ) : (
              <div style={{ background: '#FAEEDA', borderRadius: 7, padding: '7px 10px', fontSize: 10, color: '#854F0B', fontWeight: 600 }}>
                ⚠ {30 - uploadCount}일 더 등록하면 권장 기준 충족!
              </div>
            )}
          </div>

          {/* 날짜 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>등록 날짜</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inp }} />
          </div>

          {/* 메뉴 1 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#3B6D11', marginBottom: 10 }}>메뉴 1 — 한식</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 5 }}>메뉴 사진</div>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={e => handleImg(e, 1)} style={{ display: 'none' }} />
                {img1 ? (
                  <div style={{ position: 'relative' }}>
                    <img src={img1} alt="메뉴1" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                    <div style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,.5)', color: '#fff', fontSize: 10, padding: '3px 8px', borderRadius: 6 }}>변경</div>
                  </div>
                ) : (
                  <div style={{ border: '2px dashed #ddd', borderRadius: 8, height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#F9F9F9' }}>
                    <div style={{ fontSize: 28 }}>📸</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>사진 업로드 (탭하여 선택)</div>
                  </div>
                )}
              </label>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>메뉴명</div>
              <input value={menuName1} onChange={e => setMenuName1(e.target.value)} style={{ ...inp }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>가격 (원)</div><input value={price1} onChange={e => setPrice1(e.target.value)} style={{ ...inp }} /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>칼로리</div><input value={kcal1} onChange={e => setKcal1(e.target.value)} style={{ ...inp }} /></div>
            </div>
          </div>

          {/* 메뉴 2 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#3B6D11', marginBottom: 10 }}>메뉴 2 — 샐러드/가벼운</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 5 }}>메뉴 사진</div>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={e => handleImg(e, 2)} style={{ display: 'none' }} />
                {img2 ? (
                  <div style={{ position: 'relative' }}>
                    <img src={img2} alt="메뉴2" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                    <div style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,.5)', color: '#fff', fontSize: 10, padding: '3px 8px', borderRadius: 6 }}>변경</div>
                  </div>
                ) : (
                  <div style={{ border: '2px dashed #ddd', borderRadius: 8, height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#F9F9F9' }}>
                    <div style={{ fontSize: 28 }}>📸</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>사진 업로드 (탭하여 선택)</div>
                  </div>
                )}
              </label>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>메뉴명</div>
              <input value={menuName2} onChange={e => setMenuName2(e.target.value)} style={{ ...inp }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>가격 (원)</div><input value={price2} onChange={e => setPrice2(e.target.value)} style={{ ...inp }} /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>칼로리</div><input value={kcal2} onChange={e => setKcal2(e.target.value)} style={{ ...inp }} /></div>
            </div>
          </div>

          {/* 수량 */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: '12px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>총 수량</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setQty(String(Math.max(10, Number(qty) - 10)))}
                style={{ width: 36, height: 36, border: '1px solid #eee', borderRadius: 8, fontSize: 18, cursor: 'pointer', background: '#f5f5f5', fontFamily: "'Malgun Gothic', sans-serif" }}>-</button>
              <input value={qty} onChange={e => setQty(e.target.value)}
                style={{ ...inp, textAlign: 'center', flex: 1, fontWeight: 700, fontSize: 16 }} />
              <button onClick={() => setQty(String(Number(qty) + 10))}
                style={{ width: 36, height: 36, border: '1px solid #eee', borderRadius: 8, fontSize: 18, cursor: 'pointer', background: '#f5f5f5', fontFamily: "'Malgun Gothic', sans-serif" }}>+</button>
            </div>
          </div>

          {/* 저장 버튼 */}
          <button onClick={handleSave}
            style={{ width: '100%', padding: 14, background: saved ? '#27500A' : '#3B6D11', color: '#fff', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif", marginBottom: 8, transition: 'background .3s' }}>
            {saved ? `✓ ${uploadCount}일째 저장 완료! 고객에게 즉시 공개` : '저장 → 고객에게 즉시 공개'}
          </button>

          {/* 엑셀 일괄 업로드 */}
          <div style={{ background: '#EAF3DE', borderRadius: 12, border: '1px solid #C0DD97', padding: '12px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#27500A', marginBottom: 4 }}>한달치 일괄 등록</div>
            <div style={{ fontSize: 10, color: '#555', marginBottom: 8, lineHeight: 1.6 }}>키즈밀처럼 전월 말에 엑셀로 익월 한달치를 한 번에 업로드!</div>
            <button style={{ width: '100%', background: '#27500A', color: '#C0DD97', border: 'none', borderRadius: 8, padding: '10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Malgun Gothic', sans-serif" }}>
              📊 엑셀로 한달치 일괄 업로드
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}