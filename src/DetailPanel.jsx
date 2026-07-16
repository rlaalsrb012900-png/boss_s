// DetailPanel.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import linkIcon01 from "./assets/KFHCLHOENE.png";
import linkIcon02 from "./assets/KFHCLHOBMB.png";
import linkIcon03 from "./assets/KFHCLHPAJF.png";
import linkIcon04 from "./assets/KFHCLHNBNF.png";
import linkIcon05 from "./assets/KFHCLHODKB.png";
import linkIcon06 from "./assets/KFHCLHOBJA.png";
import linkIcon07 from "./assets/KFHCLHOAEI.png";
import linkIcon08 from "./assets/KFHCLHMGKC.png";
import linkIcon09 from "./assets/KFHCLHMGLA.png";
import linkIcon10 from "./assets/KFHCLHOBIH.png";
import linkIcon11 from "./assets/lethe.png";
import linkIcon12 from "./assets/KFHCLHMGLE.png";
import dopingIcon1 from "./assets/list1.png";
import dopingIcon2 from "./assets/list2.png";
import dopingIcon3 from "./assets/list3.png";
import dopingIcon4 from "./assets/list4.png";
import dopingIcon5 from "./assets/list5.png";
import dopingIcon6 from "./assets/list6.png";
import dopingIcon7 from "./assets/list7.png";
import dopingIcon8 from "./assets/list8.png";
import dopingIcon9 from "./assets/list9.png";

const DOPING_ITEMS = [
  {
    icon: dopingIcon1,
    name: "마슈르의 선물 기상 효과",
    effect: "공/마 +30, 30분 지속",
  },
  {
    icon: dopingIcon2,
    name: "익스트림 레드/블루/그린",
    large: true,
    effect:
      "이스트림 레드: 공 +30, 30분 지속\n이스트림 블루: 마 +30, 30분 지속\n이스트림 그린: 공속 +1단계, 30분 지속",
  },
  {
    icon: dopingIcon3,
    name: "유니온의 힘 1~3단계",
    effect:
      "1단계: 공/마 +30, 10분 지속\n2단계: 공/마 +30, 20분 지속\n3단계: 공/마 +30, 30분 지속\n※ 중첩 불가",
  },
  {
    icon: dopingIcon4,
    name: "MVP 슈퍼파워 버프",
    effect: "공/마 +30, 30분 지속",
  },
  {
    icon: dopingIcon5,
    name: "캐시샵 기상효과 아이템",
    large: true,
    effect: "공/마 +30, 15분 지속",
  },
  {
    icon: dopingIcon6,
    name: "연금술 물약/알약 · 향상된 10단계(힘/민첩/지능/행운)의 물약/알약",
    large: true,
    effect: "힘/민첩/지능/행운 +30, 30분 지속",
  },
  {
    icon: dopingIcon7,
    name: "연금술 비약 (고급 보스 킬러의 비약/고급 관통의 비약/고급 대영웅의 비약/고급 대축복의 비약)",
    effect:
      "고급 보스 킬러의 비약: 보공 +20%, 40분 지속\n고급 관통의 비약: 방무 +20%, 40분 지속\n고급 대영웅의 비약: 데미지 +10%, 40분 지속\n고급 대축복의 비약: 모든 능력치 +10%, 40분 지속\n※ 중첩 불가",
  },
  {
    icon: dopingIcon8,
    name: "연금술 비약 (전설의 영웅 비약)",
    effect: "공/마 +30, 2시간 지속",
  },
  {
    icon: dopingIcon9,
    name: "반짝이는 (월간/파랑/황금) 별 물약",
    large: true,
    effect:
      "반짝이는 빨간 별 물약: 보공 +20%, 2시간 지속\n반짝이는 파란 별 물약: 방무 +20%, 2시간 지속\n반짝이는 황금 별 물약: 공/마 +20, 2시간 지속\n※ 중첩 불가",
  },
];

const LINK_SKILLS = [
  { icon: linkIcon01, name: "무아" },
  { icon: linkIcon02, name: "데몬스 퓨리" },
  { icon: linkIcon03, name: "소울 컨트렉트" },
  { icon: linkIcon04, name: "프라이어 프리퍼레이션" },
  { icon: linkIcon05, name: "인텐시브 인썰트" },
  { icon: linkIcon06, name: "와일드 레이지" },
  { icon: linkIcon07, name: "판단" },
  { icon: linkIcon08, name: "임피리컬 널리지" },
  { icon: linkIcon09, name: "시프 커닝" },
  { icon: linkIcon10, name: "하이브리드 로직" },
  { icon: linkIcon11, name: "커버넌트" },
  { icon: linkIcon12, name: "파이렛 블레스" },
];

function DetailPanel({ boss }) {
  const [activeTab, setActiveTab] = useState("HEXA 스탯");
  const [tooltip, setTooltip] = useState(null);

  const tabs = ["HEXA 스탯", "링크 & 유니온", "도핑체크"];

  const showTooltip = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top });
  };
  const hideTooltip = () => setTooltip(null);

  return (
    <div className="grid-card detail-panel">
      {/* 탭 메뉴 */}
      <div className="tab-menu">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="tab-content">
        {activeTab === "HEXA 스탯" && (
          <div className="hexa-stat-tab">
            <p className="gold-badge hexa-stat-note">메인스탯 7이상</p>
            <div className="hexa-stat-groups">
            {boss.hexaStats.map((group, i) => (
              <div key={i} className="hexa-stat-group">
                <span className="hexa-stat-number">{i + 1}</span>
                <div className="hexa-stat-rows">
                  {[
                    ["메인", group.main],
                    ["에디셔널1", group.additional1],
                    ["에디셔널2", group.additional2],
                  ].map(([slot, { stat, value }]) => (
                    <div key={slot} className="hexa-stat-row">
                      <span className="hexa-stat-slot">{slot}</span>
                      <span className="hexa-stat-name">{stat}</span>
                      <span className="hexa-stat-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {activeTab === "링크 & 유니온" && (
          <div className="link-union-info">
            <div className="link-union-item full">
              <p className="info-label">링크 스킬</p>
              <div className="link-skill-grid">
                {LINK_SKILLS.map((skill, i) => (
                  <div key={i} className="link-skill-item" data-name={skill.name}>
                    <img src={skill.icon} alt={skill.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="link-union-item">
              <p className="info-label">유니온</p>
              {boss.linkUnion.union !== "-" && (
                <p className="gold-badge">{boss.linkUnion.union}</p>
              )}
            </div>
            {boss.linkUnion.unionStats && (
              <div className="union-stats">
                {Object.entries(boss.linkUnion.unionStats).map(([label, value]) => (
                  <div key={label} className="union-stat-row">
                    <span className="union-stat-label">{label}</span>
                    <span className="union-stat-value">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "도핑체크" && (
          <div className="doping-grid">
            {DOPING_ITEMS.map((item, i) => (
              <div
                key={i}
                className="doping-item"
                onMouseEnter={(e) => showTooltip(e, item.effect)}
                onMouseLeave={hideTooltip}
              >
                <div className={`doping-item-inner ${item.large ? "large" : ""}`}>
                  <img src={item.icon} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {tooltip &&
        createPortal(
          <div
            className="doping-tooltip"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>,
          document.body
        )}
    </div>
  );
}

export default DetailPanel;

/* JS 구조 설명

   이 파일은 3분할 카드 중 마지막 카드(HEXA 스탯 / 링크 & 유니온 / 도핑체크 탭)를 그림.

   1. LINK_SKILLS / DOPING_ITEMS : 아이콘 이미지 + 이름(+효과 설명)을 미리 정리해둔 목록.
      링크스킬 12개, 도핑 아이템 9개는 모든 보스가 공통으로 사용하기 때문에
      boss 데이터가 아니라 여기 이 파일에 직접 상수로 박아둠

   2. activeTab state : 지금 "HEXA 스탯" / "링크 & 유니온" / "도핑체크" 중 어떤 탭이
      켜져있는지 저장. 탭 버튼을 누르면 이 값만 바뀌고, 그 값에 따라 아래
      {activeTab === "HEXA 스탯" && (...)} 처럼 조건부로 내용이 바뀌어 보임

   3. tooltip state + showTooltip/hideTooltip :
      도핑 아이템에 마우스를 올리면 그 위에 효과 설명 말풍선이 뜨는 기능.
      마우스를 올린 요소의 화면 좌표를 getBoundingClientRect로 구해서 tooltip에 저장하고,
      createPortal로 document.body에 직접 그려서 카드 밖으로도 삐져나와 보이게 함
      (App.jsx의 드롭 아이템 툴팁이랑 똑같은 방식)

   4. 탭 내용
      - HEXA 스탯 : boss.hexaStats(그룹 1~3, 각각 메인/에디셔널1/에디셔널2)를 그대로 나열
      - 링크 & 유니온 : LINK_SKILLS 12개 아이콘 + boss.linkUnion.union 뱃지 +
        boss.linkUnion.unionStats(있으면) 나열
      - 도핑체크 : DOPING_ITEMS 9개를 3x3 그리드로 나열, item.large가 true면
        아이콘을 좀 더 크게 보여줌 */