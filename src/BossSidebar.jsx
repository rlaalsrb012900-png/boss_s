// BossSidebar.jsx
import { useState } from "react";
import logo from "./assets/logo.png";

const CATEGORY_FILTERS = [
  { label: "전체", value: "전체" },
  { label: "그란디스", value: "GRANDIS" },
  { label: "아케인", value: "ARCANE" },
];

function BossSidebar({ bosses, selectedId, onSelect, isOpen, onClose }) {
  const [filter, setFilter] = useState("전체");
  const filteredBosses =
    filter === "전체" ? bosses : bosses.filter((boss) => boss.category === filter);

  const handleSelect = (id) => {
    onSelect(id);
    onClose?.();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-logo">
        <img src={logo} className="logo-image" alt="Maple Hub" />
        <button className="sidebar-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>

      <p className="sidebar-section-title">BOSS EXPLORER</p>
      <div className="category-filter">
        {CATEGORY_FILTERS.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`category-filter-item ${filter === item.value ? "active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="boss-list">
        {Object.entries(
          filteredBosses.reduce((groups, boss) => {
            (groups[boss.category] ??= []).push(boss);
            return groups;
          }, {})
        ).map(([category, group]) => (
          <div key={category} className="boss-category-group">
            <p className="boss-category-label">{category}</p>
            {group.map((boss) => (
              <div
                key={boss.id}
                onClick={() => handleSelect(boss.id)}
                className={`boss-list-item ${selectedId === boss.id ? "active" : ""}`}
              >
                <img src={boss.icon} className="boss-icon" alt={boss.name} />
                <span>{boss.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="tier-list-button">
        보스 난이도 한눈에 보기
        <br />
        <span className="tier-list-eng">BOSS TIER LIST</span>
      </button>
    </div>
  );
}

export default BossSidebar;

/* JS 구조 설명

   - props로 받는 것: bosses(전체 보스 목록), selectedId(지금 선택된 보스),
     onSelect(보스 클릭했을 때 App.jsx에 알려주는 함수),
     isOpen/onClose(모바일에서 드로어를 열고 닫는 용도, App.jsx가 관리)

   - filter state : "전체/그란디스/아케인" 중 어떤 걸 눌렀는지 저장.
     filteredBosses는 그 필터에 맞는 보스만 걸러낸 목록

   - Object.entries(...reduce...) 부분 :
     걸러진 보스 목록을 category(GRANDIS/ARCANE)별로 묶는 코드.
     reduce로 { GRANDIS: [...], ARCANE: [...] } 같은 객체를 만든 다음,
     Object.entries로 [["GRANDIS", [...]], ["ARCANE", [...]]] 형태로 바꿔서
     카테고리 이름 + 그 카테고리에 속한 보스 목록을 같이 map 돌림

   - handleSelect(id) : 보스를 클릭하면 onSelect(id)로 App.jsx에 알려준 다음,
     onClose()도 같이 호출해서 모바일에서는 보스 선택하자마자 드로어가 자동으로 닫히게 함 */
