/* global React */
const { useState, useEffect, useMemo, useRef } = React;

// ========== Icons ==========
const Icon = {
  ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  ChevronDown: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  Close: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 12l5 5 11-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  Map: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6"/></svg>),
  List: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  Pin: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>),
  Heart: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 20s-7-4.5-7-10a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>),
  Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 4h3l2 5-2 1a12 12 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>),
  Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  Locate: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  // Tab icons
  TabCheckup: (p, active) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>),
  TabRecord: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 8h6M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  TabDaily: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  TabMy: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
};

// ========== Data ==========
const HOSPITALS = [
  { id: 1, name: "24시타임 동물 메디컬센터", addr: "경기도 하남시 미사강변대로 222 미사 중앙프리미엄 202호", dist: 3.2, tags: [{t:"2차동물병원", b:true},{t:"영상의학과전공의", b:true},{t:"척사·벡사"},{t:"공공예송"}], phone: "031-558-0000", hours: "24시간 운영", x: 0.32, y: 0.38 },
  { id: 2, name: "청담 동물 메디컬센터", addr: "서울특별시 강남구 도산대로 432 청담빌딩 3층", dist: 5.8, tags: [{t:"2차동물병원", b:true},{t:"영상의학과전공의", b:true},{t:"척사·벡사"},{t:"개별입원실"}], phone: "02-514-0000", hours: "평일 09–22", x: 0.58, y: 0.28 },
  { id: 3, name: "24시 HOPE 동물병원", addr: "경기도 성남시 분당구 판교역로 152 알파돔타워 B1", dist: 6.4, tags: [{t:"2차동물병원", b:true},{t:"영상의학과전공의", b:true},{t:"척사·벡사"}], phone: "031-726-0000", hours: "24시간 운영", x: 0.48, y: 0.58 },
  { id: 4, name: "스마일 동물 메디컬센터", addr: "서울특별시 송파구 올림픽로 300 롯데월드타워 지하 2층", dist: 7.2, tags: [{t:"2차동물병원", b:true},{t:"영상의학과전공의", b:true},{t:"척사·벡사"},{t:"개별입원실"}], phone: "02-414-0000", hours: "평일 09–20", x: 0.7, y: 0.48 },
  { id: 5, name: "라온 동물의료원", addr: "서울특별시 서초구 강남대로 401 미래에셋센터빌딩 4층", dist: 8.1, tags: [{t:"2차동물병원", b:true},{t:"영상의학과전공의", b:true},{t:"고양이친화병원"}], phone: "02-588-0000", hours: "평일 10–21", x: 0.62, y: 0.65 },
];

const REGIONS = {
  "서울시": ["전체","강남","강동","강서","강북","관악","광진","구로","금천","노원","도봉","동대문","동작","마포","서대문","서초","성동","성북","송파","양천","영등포","용산","은평","종로","중구","중랑"],
  "인천·부천": ["전체","남동","연수","미추홀","서구","계양","부평","중구","동구","강화","옹진","부천"],
  "경기": ["전체","수원","성남","고양","용인","부천","안산","안양","평택","시흥","파주","의정부","김포","광명","광주","군포","하남","오산","양주","이천","구리","안성","포천","의왕","양평","여주","동두천","과천","가평","연천"],
  "대전·세종": ["전체","유성","서구","중구","동구","대덕","세종"],
  "부산": ["전체","해운대","수영","남구","동래","연제","부산진","금정","북구","사상","사하","서구","중구","동구","영도","강서","기장"],
  "대구": ["전체","수성","중구","동구","서구","남구","북구","달서","달성","군위"],
};

const FILTER_CHIPS = [
  { id: "region", label: "여수·순천·광양", dropdown: true },
  { id: "t2", label: "2차병원" },
  { id: "xray", label: "척사·벡사" },
  { id: "rad", label: "영상전공의" },
  { id: "cat", label: "고양이학회" },
];

// ========== UI bits ==========
const StatusBar = () => (
  <div className="status-bar">
    <span>9:41</span>
    <div className="status-right">
      <svg viewBox="0 0 17 11" fill="currentColor"><rect y="7" width="3" height="4" rx=".5"/><rect x="4" y="5" width="3" height="6" rx=".5"/><rect x="8" y="3" width="3" height="8" rx=".5"/><rect x="12" y="0" width="3" height="11" rx=".5"/></svg>
      <svg viewBox="0 0 16 11" fill="none"><path d="M8 2c-2.5 0-4.8.9-6.5 2.5l.8.8A7.5 7.5 0 018 3.5c2.1 0 4 .8 5.7 2.3l.8-.8A8.5 8.5 0 008 2zm0 2.5a6 6 0 00-4.2 1.7l.8.8A4.7 4.7 0 018 5.7c1.3 0 2.5.5 3.4 1.3l.8-.8A6 6 0 008 4.5zm0 2.5a3.4 3.4 0 00-2.4 1l2.4 2.4 2.4-2.4A3.4 3.4 0 008 7z" fill="currentColor"/></svg>
      <svg viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="2.5" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="18" height="8" rx="1.2" fill="currentColor"/><rect x="22" y="3.5" width="1.5" height="5" rx=".5" fill="currentColor" opacity=".5"/></svg>
    </div>
  </div>
);

const HospitalCard = ({ h, onClick }) => (
  <button className="hcard" onClick={onClick} style={{textAlign:'left', width:'100%', border:'none', borderBottom:'1px solid var(--c-line)'}}>
    <div className="thumb"></div>
    <div className="hbody">
      <div className="hname">{h.name}</div>
      <div className="haddr">{h.addr}</div>
      <div className="hdist">{h.dist.toFixed(1)} km</div>
      <div className="htags">
        {h.tags.map((tag, i) => <span key={i} className={"tag-chip" + (tag.b ? " brand" : "")}>{tag.t}</span>)}
      </div>
    </div>
  </button>
);

const BottomTabs = ({ tab, setTab }) => (
  <div className="bottom-tabs">
    {[
      { id: "checkup", label: "검진", Icon: Icon.TabCheckup },
      { id: "record", label: "기록", Icon: Icon.TabRecord },
      { id: "daily", label: "일상", Icon: Icon.TabDaily },
      { id: "my", label: "마이", Icon: Icon.TabMy },
    ].map(t => (
      <button key={t.id} className={"tab" + (tab===t.id ? " active" : "")} onClick={() => setTab(t.id)}>
        <t.Icon />
        {t.label}
      </button>
    ))}
  </div>
);

// ========== Screens ==========
const ListScreen = ({ go, tab, setTab, openRegion, region }) => {
  const title = region ? `${region.prov} · ${region.dist}` : "영상의학과 전문 동물병원";
  const desc = region ? "선택한 지역에서 조건에 맞는 병원이에요" : "엑스레이, 초음파를 보다 더 자세히 보고 싶다면";
  return (
    <div className="screen">
      <StatusBar />
      <div className="nav-bar">
        <button className="back" onClick={() => {}} aria-label="back"><Icon.ChevronLeft style={{width:24,height:24}}/></button>
        <span className="title">지역별 병원 찾기</span>
        <span className="spacer"></span>
      </div>
      <div className="content">
        <div className="region-bar">
          <button className="region-pill" onClick={openRegion}>
            {region ? `${region.prov.split('·')[0]}/${region.dist}` : "성남·하남"}
            <Icon.ChevronDown />
          </button>
          <button className="to-map" onClick={() => go('map')}>
            <Icon.Map style={{width:12,height:12}}/> 지도로보기
          </button>
        </div>
        <div className="list-intro">
          <div className="title">{title}</div>
          <div className="desc">{desc}</div>
        </div>
        {HOSPITALS.map(h => <HospitalCard key={h.id} h={h} onClick={() => go('detail', h)} />)}
        <div style={{height: 24}}></div>
      </div>
      <BottomTabs tab={tab} setTab={setTab}/>
      <div className="home-indicator"></div>
    </div>
  );
};

const RegionSheet = ({ open, close, onConfirm, initial }) => {
  const [prov, setProv] = useState(initial?.prov || "서울시");
  const [dist, setDist] = useState(initial?.dist || "전체");
  useEffect(() => { if (open) { setProv(initial?.prov || "서울시"); setDist(initial?.dist || "전체"); } }, [open]);
  return (
    <>
      {open && <div className="backdrop" onClick={close}></div>}
      <div className={"sheet" + (open ? " open" : "")} style={{height: '70%', pointerEvents: open ? 'auto' : 'none'}}>
        <div className="grip"></div>
        <div className="sheet-head">
          <span className="title">지역선택</span>
          <button className="close" onClick={close}><Icon.Close style={{width:18,height:18}}/></button>
        </div>
        <div className="region-panes">
          <div className="pane left">
            {Object.keys(REGIONS).map(p => (
              <button key={p} className={"row" + (p===prov ? " active" : "")} onClick={() => { setProv(p); setDist("전체"); }}>
                <span>{p}</span>
              </button>
            ))}
          </div>
          <div className="pane right">
            {REGIONS[prov].map(d => (
              <button key={d} className={"row" + (d===dist ? " active" : "")} onClick={() => setDist(d)}>
                <span>{d}</span>
                {d===dist && <Icon.Check style={{width:16,height:16,color:'var(--c-brand)'}}/>}
              </button>
            ))}
          </div>
        </div>
        <div className="sheet-cta">
          <button className="btn-primary" onClick={() => onConfirm({ prov, dist })}>병원찾기</button>
        </div>
      </div>
    </>
  );
};

// Map SVG — schematic street grid
const MapSVG = () => (
  <svg viewBox="0 0 390 680" style={{width:'100%', height:'100%', display:'block'}} preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="blocks" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="#EFF1F3"/>
        <rect x="4" y="4" width="52" height="52" fill="#fff" rx="2"/>
      </pattern>
    </defs>
    <rect width="390" height="680" fill="url(#blocks)"/>
    {/* Roads */}
    <g stroke="#fff" strokeWidth="14" opacity="1">
      <line x1="0" y1="140" x2="390" y2="140"/>
      <line x1="0" y1="340" x2="390" y2="340"/>
      <line x1="0" y1="520" x2="390" y2="520"/>
      <line x1="80" y1="0" x2="80" y2="680"/>
      <line x1="220" y1="0" x2="220" y2="680"/>
      <line x1="330" y1="0" x2="330" y2="680"/>
    </g>
    <g stroke="#F5E6A8" strokeWidth="10">
      <line x1="0" y1="260" x2="390" y2="260"/>
      <line x1="150" y1="0" x2="150" y2="680"/>
    </g>
    <g stroke="#E6EEF5" strokeWidth="4">
      <line x1="0" y1="70" x2="390" y2="70"/>
      <line x1="0" y1="200" x2="390" y2="200"/>
      <line x1="0" y1="420" x2="390" y2="420"/>
      <line x1="0" y1="600" x2="390" y2="600"/>
      <line x1="40" y1="0" x2="40" y2="680"/>
      <line x1="120" y1="0" x2="120" y2="680"/>
      <line x1="180" y1="0" x2="180" y2="680"/>
      <line x1="270" y1="0" x2="270" y2="680"/>
      <line x1="360" y1="0" x2="360" y2="680"/>
    </g>
    {/* Park / waterway */}
    <path d="M 100 380 Q 200 360 310 400 L 330 460 Q 200 430 90 450 Z" fill="#E8F0E0" opacity=".7"/>
    <path d="M -20 560 Q 120 540 250 580 Q 340 600 410 580 L 410 680 L -20 680 Z" fill="#D9E8F0" opacity=".6"/>
    {/* Labels */}
    <g fill="#6B7584" fontSize="10" fontFamily="Pretendard Variable, sans-serif" fontWeight="500">
      <text x="30" y="88">현대프라자</text>
      <text x="160" y="120">한영빌딩</text>
      <text x="240" y="230">센트럴파크</text>
      <text x="40" y="250">스타벅스</text>
      <text x="170" y="320">코엑스몰</text>
      <text x="30" y="400">강남역</text>
      <text x="250" y="450">테헤란로</text>
      <text x="90" y="510">우리은행</text>
      <text x="230" y="570">선릉역</text>
      <text x="50" y="660">논현동</text>
    </g>
  </svg>
);

const MapScreen = ({ go, tab, setTab }) => {
  const [activeChip, setActiveChip] = useState("t2");
  const [selectedPin, setSelectedPin] = useState(1);
  return (
    <div className="screen">
      <StatusBar />
      <div className="nav-bar">
        <button className="back" onClick={() => go('list')} aria-label="back"><Icon.ChevronLeft style={{width:24,height:24}}/></button>
        <span className="title">지도에서 찾기</span>
        <span className="spacer"></span>
      </div>
      <div className="map-wrap">
        <div className="map-chips">
          {FILTER_CHIPS.map(c => (
            <button key={c.id} className={"map-chip" + (activeChip===c.id ? " active" : "")} onClick={() => setActiveChip(activeChip===c.id ? null : c.id)}>
              {c.label}
              {c.dropdown && <Icon.ChevronDown style={{width:10,height:10}}/>}
            </button>
          ))}
        </div>
        <button className="my-location" aria-label="내 위치"><Icon.Locate style={{width:22,height:22}}/></button>
        <MapSVG />
        {/* Pins */}
        {HOSPITALS.map(h => {
          const isSel = selectedPin === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setSelectedPin(h.id)}
              style={{
                position: 'absolute',
                left: `${h.x*100}%`, top: `${h.y*100}%`,
                transform: 'translate(-50%, -100%)',
                width: isSel ? 34 : 26, height: isSel ? 42 : 32,
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                color: isSel ? 'var(--c-ink-1)' : 'var(--c-brand)',
                transition: 'all .18s',
                filter: isSel ? 'drop-shadow(0 6px 10px rgba(15,23,42,.25))' : 'drop-shadow(0 2px 4px rgba(15,23,42,.2))',
                zIndex: isSel ? 3 : 2,
              }}
            >
              <svg viewBox="0 0 28 36" style={{width:'100%',height:'100%'}}><path d="M14 0C6.3 0 0 6.3 0 14c0 10 14 22 14 22s14-12 14-22C28 6.3 21.7 0 14 0z" fill="currentColor"/><circle cx="14" cy="14" r="5" fill="#fff"/></svg>
            </button>
          );
        })}
        {/* Selected pin peek card */}
        {selectedPin && (() => {
          const h = HOSPITALS.find(x => x.id === selectedPin);
          return (
            <div style={{
              position: 'absolute', left: 16, right: 16, bottom: 88,
              background: '#fff', borderRadius: 14, padding: 12, display: 'flex', gap: 10,
              boxShadow: 'var(--sh-float)', zIndex: 4, cursor: 'pointer'
            }} onClick={() => go('detail', h)}>
              <div style={{width: 56, height: 56, borderRadius: 8, flexShrink: 0}} className="thumb-mini"></div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 14, fontWeight: 700, marginBottom: 2, letterSpacing: '-0.01em'}}>{h.name}</div>
                <div style={{fontSize: 11, color: 'var(--c-ink-3)', marginBottom: 4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{h.addr}</div>
                <div style={{display: 'flex', gap: 4}}>
                  <span className="tag-chip brand">{h.dist.toFixed(1)} km</span>
                  {h.tags.slice(0,2).map((tag, i) => <span key={i} className={"tag-chip" + (tag.b ? " brand" : "")}>{tag.t}</span>)}
                </div>
              </div>
            </div>
          );
        })()}
        <button className="to-list-btn" onClick={() => go('list')}>
          <Icon.List /> 병원 목록
        </button>
      </div>
      <div className="home-indicator"></div>
    </div>
  );
};

const DetailScreen = ({ h, go }) => (
  <div className="screen">
    <div className="detail-hero">
      <div className="detail-header-float">
        <button className="icon-btn" onClick={() => go('list')}><Icon.ChevronLeft style={{width:20,height:20}}/></button>
        <button className="icon-btn"><Icon.Heart style={{width:18,height:18}}/></button>
      </div>
    </div>
    <div className="content">
      <div className="detail-body">
        <h1>{h.name}</h1>
        <div className="dist"><Icon.Pin style={{width:14,height:14}}/> {h.dist.toFixed(1)} km · {h.addr}</div>
        <div className="specs">
          {h.tags.map((tag, i) => <span key={i} className={"tag-chip" + (tag.b ? " brand" : "")}>{tag.t}</span>)}
        </div>
        <div className="detail-section">
          <h3>진료 정보</h3>
          <div className="info-row"><span className="label">운영시간</span><span className="val">{h.hours}</span></div>
          <div className="info-row"><span className="label">전화</span><span className="val">{h.phone}</span></div>
          <div className="info-row"><span className="label">주차</span><span className="val">건물 내 주차 가능 (2시간 무료)</span></div>
        </div>
        <div className="detail-section">
          <h3>영상의학과 장비</h3>
          <div className="info-row"><span className="label">CT</span><span className="val">GE Revolution ACT 16ch</span></div>
          <div className="info-row"><span className="label">MRI</span><span className="val">Siemens Magnetom Essenza 1.5T</span></div>
          <div className="info-row"><span className="label">초음파</span><span className="val">Samsung RS85 Prestige</span></div>
        </div>
        <div className="detail-section">
          <h3>최근 리뷰</h3>
          <div style={{fontSize: 13, color: 'var(--c-ink-2)', lineHeight: 1.6}}>
            "CT 결과를 바로 설명해주셔서 안심이 됐어요. 수의사 선생님이 아이 상태를 차분하게 짚어주셨습니다."
            <div style={{fontSize:11, color:'var(--c-ink-3)', marginTop: 6}}>— 보호자 김** · 2주 전</div>
          </div>
        </div>
      </div>
    </div>
    <div className="cta-bar">
      <button className="btn-secondary" aria-label="전화"><Icon.Phone style={{width:20,height:20}}/></button>
      <button className="btn-secondary" aria-label="지도"><Icon.Pin style={{width:20,height:20}}/></button>
      <button className="btn-primary">예약 문의</button>
    </div>
    <div className="home-indicator"></div>
  </div>
);

// ========== Tweaks ==========
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandColor": "#2563EB",
  "thumbSize": 76,
  "thumbRadius": 10,
  "titleSize": 20
}/*EDITMODE-END*/;

const BRAND_PRESETS = [
  { name: "Blue", color: "#2563EB", pressed: "#1D4ED8", bg: "#EEF4FF", bg2: "#DCE8FF" },
  { name: "Teal", color: "#0F9EA3", pressed: "#0A7C80", bg: "#E6F7F7", bg2: "#C8EDEE" },
  { name: "Coral", color: "#E4684F", pressed: "#C7543D", bg: "#FDECE7", bg2: "#F9D5CC" },
  { name: "Ink", color: "#0B1220", pressed: "#000000", bg: "#EDEFF3", bg2: "#D7DCE4" },
];

const TweaksPanel = ({ open, close, tweaks, setTweaks }) => {
  if (!open) return null;
  const applyBrand = (preset) => {
    document.documentElement.style.setProperty('--c-brand', preset.color);
    document.documentElement.style.setProperty('--c-brand-pressed', preset.pressed);
    document.documentElement.style.setProperty('--c-brand-50', preset.bg);
    document.documentElement.style.setProperty('--c-brand-100', preset.bg2);
    document.documentElement.style.setProperty('--c-tag-brand-bg', preset.bg);
    document.documentElement.style.setProperty('--c-tag-brand-ink', preset.color);
    setTweaks(t => ({ ...t, brandColor: preset.color }));
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: { brandColor: preset.color }}, '*');
  };
  const setSize = (k, v) => {
    setTweaks(t => ({ ...t, [k]: v }));
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: { [k]: v }}, '*');
  };
  return (
    <div className="tweaks-panel open">
      <h4>Tweaks <button className="close" onClick={close}>✕</button></h4>
      <div className="tweak-row">
        <label>Brand color</label>
        <div className="opts">
          {BRAND_PRESETS.map(p => (
            <button key={p.name} className={"opt" + (tweaks.brandColor === p.color ? " active" : "")} onClick={() => applyBrand(p)}>
              <span className="dot" style={{background: p.color}}></span>{p.name}
            </button>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Thumb size — {tweaks.thumbSize}px</label>
        <input type="range" min="60" max="96" step="2" value={tweaks.thumbSize} onChange={e => setSize('thumbSize', +e.target.value)}/>
      </div>
      <div className="tweak-row">
        <label>Thumb radius — {tweaks.thumbRadius}px</label>
        <input type="range" min="0" max="40" step="1" value={tweaks.thumbRadius} onChange={e => setSize('thumbRadius', +e.target.value)}/>
      </div>
      <div className="tweak-row">
        <label>Title size — {tweaks.titleSize}px</label>
        <input type="range" min="16" max="26" step="1" value={tweaks.titleSize} onChange={e => setSize('titleSize', +e.target.value)}/>
      </div>
    </div>
  );
};

// ========== App ==========
function App() {
  const [screen, setScreen] = useState(() => {
    try { return localStorage.getItem('hc360_screen') || 'list'; } catch(e) { return 'list'; }
  });
  const [detail, setDetail] = useState(HOSPITALS[0]);
  const [tab, setTab] = useState('checkup');
  const [regionOpen, setRegionOpen] = useState(false);
  const [region, setRegion] = useState(null);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  useEffect(() => { try { localStorage.setItem('hc360_screen', screen); } catch(e) {} }, [screen]);

  // Apply tweak CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty('--thumb-size', tweaks.thumbSize + 'px');
    document.documentElement.style.setProperty('--thumb-radius', tweaks.thumbRadius + 'px');
    document.documentElement.style.setProperty('--title-size', tweaks.titleSize + 'px');
  }, [tweaks]);

  // Initial brand apply
  useEffect(() => {
    const preset = BRAND_PRESETS.find(p => p.color === tweaks.brandColor);
    if (preset) {
      document.documentElement.style.setProperty('--c-brand', preset.color);
      document.documentElement.style.setProperty('--c-brand-pressed', preset.pressed);
      document.documentElement.style.setProperty('--c-brand-50', preset.bg);
      document.documentElement.style.setProperty('--c-brand-100', preset.bg2);
      document.documentElement.style.setProperty('--c-tag-brand-bg', preset.bg);
      document.documentElement.style.setProperty('--c-tag-brand-ink', preset.color);
    }
  }, []);

  // Edit mode listener
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({type: '__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const go = (s, data) => {
    if (s === 'detail') setDetail(data);
    setScreen(s);
  };

  return (
    <>
      <div className="app-shell" data-screen-label={screen}>
        {screen === 'list' && <ListScreen go={go} tab={tab} setTab={setTab} openRegion={() => setRegionOpen(true)} region={region}/>}
        {screen === 'map' && <MapScreen go={go} tab={tab} setTab={setTab}/>}
        {screen === 'detail' && <DetailScreen h={detail} go={go}/>}
        <RegionSheet open={regionOpen} close={() => setRegionOpen(false)} onConfirm={(r) => { setRegion(r); setRegionOpen(false); }} initial={region}/>
      </div>
      <TweaksPanel open={tweaksOpen} close={() => setTweaksOpen(false)} tweaks={tweaks} setTweaks={setTweaks}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
