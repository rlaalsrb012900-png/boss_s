// App.jsx
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import BossSidebar from "./BossSidebar";
import BossDetail from "./BossDetail";
import DetailPanel from "./DetailPanel";
import "./App.css";

//정보 바 아이콘
import attackIcon from "./assets/attack-icon.png";
import rarityIcon from "./assets/rarity-icon.png";
import mesoIcon from "./assets/meso-icon.png";
import timeIcon from "./assets/time-icon.png";
import dropItemIcon from "./assets/drop-item-icon.png";

//배너
import bannerSeren from "./assets/banner_seren.png";
import bannerDemian from "./assets/banner_demian.png";
import bannerSwu from "./assets/banner_swu.png";
import bannerLucid from "./assets/banner_lucid.png";
import bannerWill from "./assets/banner_will.png";
import bannerDusk from "./assets/banner_dusk.png";
import bannerDark from "./assets/banner_dark.png";
import bannerKalos from "./assets/banner_kalos.png";
import bannerKaring from "./assets/banner_karing.png";
import bannerAngel from "./assets/banner_angel.png";
import bannerChanran from "./assets/banner_chanran.png";
import bannerFirstEnemy from "./assets/banner_firstenemy.png";
import bannerJupeter from "./assets/banner_jupeter.png";
import bannerLimbo from "./assets/banner_limbo.png";
import bannerValderigs from "./assets/banner_valderigs.png";
import bannerCel from "./assets/banner_cel.png";

//보스 리스트 아이콘
import iconSeren from "./assets/seren.png";
import iconDemian from "./assets/demian.png";
import iconSwu from "./assets/swu.png";
import iconLucid from "./assets/lucid.png";
import iconWill from "./assets/will.png";
import iconHilla from "./assets/hilla.png";
import bannerHilla from "./assets/banner_hilla.png";
import iconDusk from "./assets/dusk.png";
import iconDark from "./assets/dark.png";
import iconKalos from "./assets/kalos.png";
import iconKaring from "./assets/karing.png";
import iconAngel from "./assets/angel.png";
import iconChanran from "./assets/chanran.png";
import iconFirstEnemy from "./assets/firstenemy.png";
import iconJupeter from "./assets/jupeter.png";
import iconLimbo from "./assets/limbo.png";
import iconValderigs from "./assets/valderigs.png";
import iconCel from "./assets/cel.png";
import dropRingBoxRed from "./assets/boss_ring_box_red.png";
import dropFaceAcc from "./assets/dark_boss_face_acc.png";
import dropWeeklyCrystal from "./assets/weekly_crystal.png";
import dropRingBoxWhite from "./assets/boss_ring_box_white.png";
import dropCompleteHeart from "./assets/dark_boss_complete_heart.png";
import dropDarkFaceAcc from "./assets/dark_boss_face_acc.png";
import dropDarkEyeAcc from "./assets/dark_boss_eye_acc.png";
import dropDarkBelt from "./assets/dark_boss_belt.png";
import dropDawnFaceAcc from "./assets/dawn_boss_face_acc.png";
import dropDarkPocket from "./assets/dark_boss_pocket.png";
import dropRingBoxBlack from "./assets/boss_ring_box_black.png";
import dropDawnRing from "./assets/dawn_boss_ring.png";
import dropDarkRing from "./assets/dark_boss_ring.png";
import dropDawnEarring from "./assets/dawn_boss_earring.png";
import dropDarkEarring from "./assets/dark_boss_earring.png";
import dropDarkPendant from "./assets/dark_boss_pendant.png";
import dropDawnPendant from "./assets/dawn_boss_pendant.png";
import dropDarkBadge from "./assets/dark_boss_badge.png";
import dropMonthlyCrystal from "./assets/monthly_crystal.png";
import dropDarkEmblem from "./assets/dark_boss_emblem.png";
import dropKalingFragment from "./assets/frag_eternel_kaling_half.png";
import dropWhetstoneLife from "./assets/whetstone_life.png";
import dropKalosFragment from "./assets/frag_eternel_kalos_half.png";
import dropAdversaryFragment from "./assets/frag_eternel_adversary_half.png";
import dropDarkBox from "./assets/dark_boss_box.png";
import dropMaleficStarFragment from "./assets/frag_eternel_maleficStar_half.png";
import dropBoxEternelKalos from "./assets/box_eternel_kalos.png";
import dropRingBoxLife from "./assets/boss_ring_box_life.png";
import dropKalosFragmentFull from "./assets/frag_eternel_kalos.png";
import dropWhetstoneFaith from "./assets/whetstone_faith.png";
import dropLimboFragment from "./assets/frag_eternel_limbo.png";
import dropExceptBelt from "./assets/except_belt.png";
import dropExceptFaceAcc from "./assets/except_face_acc.png";
import dropBardrixFragment from "./assets/frag_eternel_bardrix.png";
import dropBoxEternelKaling from "./assets/box_eternel_kaling.png";
import dropKalingFragmentFull from "./assets/frag_eternel_kaling.png";
import dropBrightMerit from "./assets/bright_boss_merit.png";
import dropBoxEternelAdversary from "./assets/box_eternel_adversary.png";
import dropAdversaryFragmentFull from "./assets/frag_eternel_adversary.png";
import dropJupiterFragment from "./assets/frag_eternel_jupiter.png";
import dropBrightRing from "./assets/bright_boss_ring.png";
import dropBoxEternelLimbo from "./assets/box_eternel_limbo.png";
import dropBrightRing2 from "./assets/bright_boss_ring2.png";
import dropMaleficStarFragmentFull from "./assets/frag_eternel_maleficStar.png";
import dropBrightPendant from "./assets/bright_boss_pendant.png";
import dropBoxEternelBardrix from "./assets/box_eternel_bardrix.png";
import dropExceptEyeAcc from "./assets/except_eye_acc.png";
import dropExceptMerit from "./assets/except_merit.png";
import dropExceptEarring from "./assets/except_earring.png";
import dropBrightFaceAcc from "./assets/bright_boss_face_acc.png";
import dropBoxEternelJupiter from "./assets/box_eternel_jupiter.png";

const DEFAULT_HEXA_STATS = [
  {
    main: { stat: "주스탯", value: 10 },
    additional1: { stat: "보공", value: 4 },
    additional2: { stat: "크뎀", value: 6 },
  },
  {
    main: { stat: "보공", value: 10 },
    additional1: { stat: "주스탯", value: 3 },
    additional2: { stat: "크뎀", value: 7 },
  },
  {
    main: { stat: "크뎀", value: 10 },
    additional1: { stat: "보공", value: 6 },
    additional2: { stat: "주스탯", value: 4 },
  },
];

const bosses = [
  {
    id: 2,
    category: "ARCANE",
    name: "스우",
    engName: "SWU",
    level: 190,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "700만",
        minCombat: "560만",
        estimatedCost: "2.3억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "HARD",
        recommendCombat: "1900만",
        minCombat: "1520만",
        estimatedCost: "6.2억",
        clearTime: "15분",
        dropItems: [
          { icon: dropRingBoxRed, name: "홍옥의 보스 반지상자\n1~4레벨 반지 획득 가능\n4레벨 10%" },
          { icon: dropFaceAcc, name: "루즈 컨트롤 머신 마크" },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
      {
        level: "EXTREME",
        recommendCombat: "3.4억",
        minCombat: "2.7억",
        estimatedCost: "110억",
        clearTime: "20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropCompleteHeart, name: "컴플리트 언더컨트롤" },
          { icon: dropDarkFaceAcc, name: "루즈 컨트롤 머신 마크" },
        ],
      },
    ],
    defaultDifficulty: "EXTREME",
    quote: "번개가 춤추는 순간, 세계는 다시 쓰인다.",
    banner: bannerSwu,
    icon: iconSwu,
    guideVideo: {
      title: "스우 익스트림 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.03.14",
      url: "https://www.youtube.com/watch?v=CVsKm_-8nzs&t=1020s",
    },
    difficultyStats: { stack: 3.5, timePressure: 3.0, pattern: 3.5, control: 3.0 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 3,
    category: "ARCANE",
    name: "데미안",
    engName: "DAMIEN",
    level: 190,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "800만",
        minCombat: "640만",
        estimatedCost: "2.4억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "HARD",
        recommendCombat: "2000만",
        minCombat: "1600만",
        estimatedCost: "6억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropDarkEyeAcc, name: "마력이 깃든 안대" },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "붉은 달 아래, 심판은 이미 시작되었다.",
    banner: bannerDemian,
    icon: iconDemian,
    guideVideo: {
      title: "데미안 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.02.08",
      url: "https://www.youtube.com/watch?v=rnuQM0rJF4I",
    },
    difficultyStats: { stack: 2.5, timePressure: 2.0, pattern: 2.5, control: 2.0 },
    overallDifficulty: 2,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 4,
    category: "ARCANE",
    name: "루시드",
    engName: "LUCID",
    level: 220,
    difficulties: [
      {
        level: "EASY",
        recommendCombat: "1200만",
        minCombat: "960만",
        estimatedCost: "3.9억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "NORMAL",
        recommendCombat: "2000만",
        minCombat: "1600만",
        estimatedCost: "6.5억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "HARD",
        recommendCombat: "4000만",
        minCombat: "3200만",
        estimatedCost: "13억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropDarkBelt, name: "몽환의 벨트" },
          { icon: dropDawnFaceAcc, name: "트와일라이트 마크" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "꿈은 달콤하지만, 깨어나면 악몽이지.",
    banner: bannerLucid,
    icon: iconLucid,
    guideVideo: {
      title: "루시드 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.04.22",
      url: "https://www.youtube.com/watch?v=xLxgqBGlFao",
    },
    difficultyStats: { stack: 3.0, timePressure: 2.5, pattern: 3.0, control: 2.5 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 5,
    category: "ARCANE",
    name: "윌",
    engName: "WILL",
    level: 235,
    difficulties: [
      {
        level: "EASY",
        recommendCombat: "1200만",
        minCombat: "960만",
        estimatedCost: "3.9억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "NORMAL",
        recommendCombat: "2500만",
        minCombat: "2000만",
        estimatedCost: "8.1억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "HARD",
        recommendCombat: "4000만",
        minCombat: "3200만",
        estimatedCost: "13억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          {
            icon: dropDarkPocket,
            name: "저주받은 마도서 선택 상자\n적/녹/황/청 마도서 선택 가능",
          },
          { icon: dropDawnFaceAcc, name: "트와일라이트 마크" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "시간의 뒤편에서, 나는 이미 승리를 보았다.",
    banner: bannerWill,
    icon: iconWill,
    guideVideo: {
      title: "윌 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.05.30",
      url: "https://www.youtube.com/watch?v=beduAoTvknY",
    },
    difficultyStats: { stack: 3.0, timePressure: 3.0, pattern: 3.0, control: 2.5 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 15,
    category: "ARCANE",
    name: "가디언 엔젤 슬라임",
    engName: "GUARDIAN ANGEL SLIME",
    level: 210,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "800만",
        minCombat: "640만",
        estimatedCost: "2.5억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "CHAOS",
        recommendCombat: "4500만",
        minCombat: "3600만",
        estimatedCost: "14억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxBlack,
            name: "흑옥의 반지상자\n1~4레벨 반지 획득 가능\n4레벨 20%\n하급 반지 등장하지않음",
          },
          { icon: dropDawnRing, name: "가디언 엔젤 링" },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
    ],
    defaultDifficulty: "NORMAL",
    quote: "작다고 얕보지 마라, 나는 이 성역의 수호자다.",
    banner: bannerAngel,
    icon: iconAngel,
    guideVideo: {
      title: "가디언 엔젤 슬라임 노말 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.01.19",
      url: "https://www.youtube.com/watch?v=sGj7K3sCBpg",
    },
    difficultyStats: { stack: 1.0, timePressure: 1.0, pattern: 1.5, control: 1.0 },
    overallDifficulty: 1,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 7,
    category: "ARCANE",
    name: "더스크",
    engName: "DUSK",
    level: 245,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "1600만",
        minCombat: "1280만",
        estimatedCost: "5.2억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "CHAOS",
        recommendCombat: "4000만",
        minCombat: "3200만",
        estimatedCost: "13억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxBlack,
            name: "흑옥의 반지상자\n1~4레벨 반지 획득 가능\n4레벨 20%\n하급 반지 등장하지않음",
          },
          { icon: dropDarkRing, name: "거대한 공포" },
          { icon: dropDawnEarring, name: "에스텔라 이어링" },
        ],
      },
    ],
    defaultDifficulty: "CHAOS",
    quote: "사슬에 묶인 눈동자가, 그대를 지켜보고 있다.",
    banner: bannerDusk,
    icon: iconDusk,
    guideVideo: {
      title: "더스크 카오스 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.06.11",
      url: "https://www.youtube.com/watch?v=pktzJ77Lv9c",
    },
    difficultyStats: { stack: 3.5, timePressure: 3.0, pattern: 3.5, control: 3.0 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 18,
    category: "ARCANE",
    name: "듄켈",
    engName: "DUNKEL",
    level: 255,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "1800만",
        minCombat: "1440만",
        estimatedCost: "5.9억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "HARD",
        recommendCombat: "4000만",
        minCombat: "3200만",
        estimatedCost: "13억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxBlack,
            name: "흑옥의 반지상자\n1~4레벨 반지 획득 가능\n4레벨 20%\n하급 반지 등장하지않음",
          },
          { icon: dropDarkEarring, name: "커맨더 포스 이어링" },
          { icon: dropDawnEarring, name: "에스텔라 이어링" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "어둠 속을 걷는 자, 두려움조차 그림자로 삼는다.",
    banner: bannerCel,
    icon: iconCel,
    guideVideo: {
      title: "듄켈 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.07.03",
      url: "https://www.youtube.com/watch?v=oonIdn5Je3I",
    },
    difficultyStats: { stack: 3.5, timePressure: 3.0, pattern: 3.0, control: 3.0 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 6,
    category: "ARCANE",
    name: "진 힐라",
    engName: "VERUS HILLA",
    level: 250,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "3000만",
        minCombat: "2400만",
        estimatedCost: "9.6억",
        clearTime: "15분",
        dropItems: [{ icon: dropWeeklyCrystal, name: "결정석" }],
      },
      {
        level: "HARD",
        recommendCombat: "5000만",
        minCombat: "4000만",
        estimatedCost: "16억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxBlack,
            name: "흑옥의 반지상자\n1~4레벨 반지 획득 가능\n4레벨 20%\n하급 반지 등장하지않음",
          },
          { icon: dropDarkPendant, name: "고통의 근원" },
          { icon: dropDawnPendant, name: "데이브레이크 팬던트" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "진실을 마주할 용기가 있는가, 이 검 앞에서.",
    banner: bannerHilla,
    icon: iconHilla,
    guideVideo: {
      title: "진 힐라 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.08.17",
      url: "https://www.youtube.com/watch?v=Ijsc1A6gfO8",
    },
    difficultyStats: { stack: 3.5, timePressure: 3.5, pattern: 3.5, control: 3.5 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 1,
    category: "GRANDIS",
    name: "선택받은 세렌",
    engName: "SEREN",
    level: 260,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "8000만",
        minCombat: "6400만",
        estimatedCost: "25.8억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxBlack,
            name: "흑옥의 반지상자\n1~4레벨 반지 획득 가능\n4레벨 20%\n하급 반지 등장하지않음",
          },
          { icon: dropDawnPendant, name: "데이브레이크 팬던트" },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "1.3억",
        minCombat: "1억",
        estimatedCost: "42억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropDarkEmblem, name: "미트라의 분노 선택 상자\n전사/도적/마법사/궁수/해적 선택 가능" },
          { icon: dropDawnPendant, name: "데이브레이크 팬던트" },
        ],
      },
      {
        level: "EXTREME",
        recommendCombat: "11억",
        minCombat: "8.8억",
        estimatedCost: "35.5조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropExceptFaceAcc, name: "익셉셔널 해머(얼굴장식)" },
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropDarkEmblem, name: "미트라의 분노 선택 상자\n전사/도적/마법사/궁수/해적 선택 가능" },
          { icon: dropDawnPendant, name: "데이브레이크 팬던트" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "태양을 품은 신, 우리는 하나가 되리라.",
    banner: bannerSeren,
    icon: iconSeren,
    guideVideo: {
      title: "세렌 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "125,643회",
      date: "2024.05.12",
      url: "https://www.youtube.com/watch?v=QVZxsZaizFg",
    },
    difficultyStats: {
      stack: 5.0,
      timePressure: 4.5,
      pattern: 4.0,
      control: 3.5,
    },
    overallDifficulty: 4,
    equipment: {
      weaponName: "아케인셰이드 윕",
      potential: "유니크 (보스 데미지 +40%)",
      additional: "에디셔널 잠재: 마력 +9%",
      price: "22억 메소",
    },
    hexa: ["오리진", "마스터리 코어", "강화 코어", "공용 코어"],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "16개 권장",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: ["보스 킬러 30분", "엑스트림 레조 15분", "길드 스킬 30분", "VIP 버프 15분"],
  },
  {
    id: 8,
    category: "ARCANE",
    name: "검은 마법사",
    engName: "BLACK MAGE",
    level: 255,
    difficulties: [
      {
        level: "HARD",
        recommendCombat: "1.2억",
        minCombat: "9600만",
        estimatedCost: "37.5억",
        clearTime: "15분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropDarkBadge, name: "창세의 뱃지" },
          { icon: dropMonthlyCrystal, name: "월간 결정석" },
        ],
      },
      {
        level: "EXTREME",
        recommendCombat: "8억",
        minCombat: "6.4억",
        estimatedCost: "25조",
        clearTime: "15분",
        dropItems: [
          { icon: dropExceptBelt, name: "익셉셔널 해머(벨트)" },
          { icon: dropDarkBadge, name: "창세의 뱃지" },
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
        ],
      },
    ],
    defaultDifficulty: "EXTREME",
    quote: "세계의 종막은, 내 손끝에서 시작된다.",
    banner: bannerDark,
    icon: iconDark,
    guideVideo: {
      title: "검은 마법사 익스트림 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.09.25",
      url: "https://www.youtube.com/watch?v=1QZgZiZ4f-E",
    },
    difficultyStats: { stack: 5.0, timePressure: 4.5, pattern: 4.5, control: 4.5 },
    overallDifficulty: 5,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 9,
    category: "GRANDIS",
    name: "감시자 칼로스",
    engName: "WATCHER KALOS",
    level: 265,
    difficulties: [
      {
        level: "EASY",
        recommendCombat: "1.2억",
        minCombat: "9600만",
        estimatedCost: "37.7억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
      {
        level: "NORMAL",
        recommendCombat: "2.5억",
        minCombat: "2억",
        estimatedCost: "78.6억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
          { icon: dropKalosFragment, name: "남겨진 칼로스의 의지 조각" },
        ],
      },
      {
        level: "CHAOS",
        recommendCombat: "7억",
        minCombat: "5.6억",
        estimatedCost: "220억",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropBoxEternelKalos, name: "의지의 에테르넬 방어구 상자" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropKalosFragmentFull, name: "남겨진 칼로스의 의지" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
        ],
      },
      {
        level: "EXTREME",
        recommendCombat: "16억",
        minCombat: "12.8억",
        estimatedCost: "50.3조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropExceptEyeAcc, name: "익셉셔널 해머(눈장식)" },
          { icon: dropBoxEternelLimbo, name: "욕망의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropKalosFragmentFull, name: "남겨진 칼로스의 의지" },
        ],
      },
    ],
    defaultDifficulty: "CHAOS",
    quote: "감시는 곧 심판이다, 나의 눈을 피할 수 없다.",
    banner: bannerKalos,
    icon: iconKalos,
    guideVideo: {
      title: "감시자 칼로스 카오스 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.10.02",
      url: "https://www.youtube.com/watch?v=n2yiQsxwPL8",
    },
    difficultyStats: { stack: 4.0, timePressure: 4.0, pattern: 4.0, control: 3.5 },
    overallDifficulty: 4,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 14,
    category: "GRANDIS",
    name: "최초의 대적자",
    engName: "FIRST ENEMY",
    level: 270,
    difficulties: [
      {
        level: "EASY",
        recommendCombat: "9000만",
        minCombat: "7200만",
        estimatedCost: "28.5억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
      {
        level: "NORMAL",
        recommendCombat: "3.0억",
        minCombat: "2.4억",
        estimatedCost: "95억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropAdversaryFragment, name: "이어진 고대의 결의 조각" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "12억",
        minCombat: "9.6억",
        estimatedCost: "38조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropBrightMerit, name: "불멸의 유산" },
          { icon: dropBoxEternelAdversary, name: "고대의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropAdversaryFragmentFull, name: "이어진 고대의 결의" },
        ],
      },
      {
        level: "EXTREME",
        recommendCombat: "30억",
        minCombat: "24억",
        estimatedCost: "95조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropExceptMerit, name: "익셉셔널 해머(훈장)" },
          { icon: dropBrightMerit, name: "불멸의 유산" },
          { icon: dropBoxEternelAdversary, name: "고대의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropAdversaryFragmentFull, name: "이어진 고대의 결의" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "태초부터 존재한 적의, 그 앞에 마주 서라.",
    banner: bannerFirstEnemy,
    icon: iconFirstEnemy,
    guideVideo: {
      title: "최초의 대적자 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.11.14",
      url: "https://www.youtube.com/watch?v=Iz61Ffolwt0",
    },
    difficultyStats: { stack: 4.0, timePressure: 3.5, pattern: 4.0, control: 3.5 },
    overallDifficulty: 4,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 10,
    category: "GRANDIS",
    name: "카링",
    engName: "KARING",
    level: 275,
    difficulties: [
      {
        level: "EASY",
        recommendCombat: "2.5억",
        minCombat: "2억",
        estimatedCost: "80억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropKalingFragment, name: "뒤엉킨 흉수의 고리 조각" },
          { icon: dropWeeklyCrystal, name: "결정석" },
        ],
      },
      {
        level: "NORMAL",
        recommendCombat: "6억",
        minCombat: "4.8억",
        estimatedCost: "192억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropKalingFragment, name: "뒤엉킨 흉수의 고리 조각" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "10억",
        minCombat: "8억",
        estimatedCost: "32조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropBoxEternelKaling, name: "흉수의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropKalingFragmentFull, name: "뒤엉킨 흉수의 고리" },
        ],
      },
      {
        level: "EXTREME",
        recommendCombat: "25억",
        minCombat: "20억",
        estimatedCost: "80조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropExceptEarring, name: "익셉셔널 해머(귀고리)" },
          { icon: dropBoxEternelKaling, name: "흉수의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropKalingFragmentFull, name: "뒤엉킨 흉수의 고리" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "두 개의 눈으로, 나는 너의 운명을 본다.",
    banner: bannerKaring,
    icon: iconKaring,
    guideVideo: {
      title: "카링 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2024.12.06",
      url: "https://www.youtube.com/watch?v=9w8sYMmWnT0",
    },
    difficultyStats: { stack: 4.5, timePressure: 4.0, pattern: 4.5, control: 4.0 },
    overallDifficulty: 4,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 16,
    category: "GRANDIS",
    name: "림보",
    engName: "LIMBO",
    level: 285,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "7억",
        minCombat: "5.6억",
        estimatedCost: "225억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropLimboFragment, name: "왜곡된 욕망의 결정" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "14억",
        minCombat: "11.2억",
        estimatedCost: "45조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropBrightRing, name: "근원의 속삭임" },
          { icon: dropBoxEternelLimbo, name: "욕망의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropLimboFragment, name: "왜곡된 욕망의 결정" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "웃어라, 이곳이 바로 네 마지막 경계이니.",
    banner: bannerLimbo,
    icon: iconLimbo,
    guideVideo: {
      title: "림보 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2025.01.20",
      url: "https://www.youtube.com/watch?v=pwy-UX3QCag",
    },
    difficultyStats: { stack: 4.5, timePressure: 4.0, pattern: 4.0, control: 4.0 },
    overallDifficulty: 4,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 17,
    category: "GRANDIS",
    name: "발드릭스",
    engName: "VALDERIGS",
    level: 290,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "8억",
        minCombat: "6.4억",
        estimatedCost: "25.4조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropBardrixFragment, name: "영원한 충성의 흔적" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "17억",
        minCombat: "13.6억",
        estimatedCost: "54조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropBrightPendant, name: "죽음의 맹세" },
          { icon: dropBoxEternelBardrix, name: "맹세의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropBardrixFragment, name: "영원한 충성의 흔적" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "차가운 불꽃이 타오를 때, 심연이 깨어난다.",
    banner: bannerValderigs,
    icon: iconValderigs,
    guideVideo: {
      title: "발드릭스 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2025.02.11",
      url: "https://www.youtube.com/watch?v=DSFcEandd4M",
    },
    difficultyStats: { stack: 4.5, timePressure: 4.5, pattern: 4.5, control: 4.0 },
    overallDifficulty: 4,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 12,
    category: "GRANDIS",
    name: "유피테르",
    engName: "JUPITER",
    level: 295,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "10억",
        minCombat: "8억",
        estimatedCost: "30조",
        clearTime: "15분~20분",
        dropItems: [
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropJupiterFragment, name: "뒤틀린 갈망의 편린" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "솔플불가",
        minCombat: "솔플불가",
        estimatedCost: "무제한",
        clearTime: "-",
        dropItems: [
          { icon: dropBrightFaceAcc, name: "오만의 원죄" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropBoxEternelJupiter, name: "갈망의 에테르넬 방어구 상자" },
          { icon: dropJupiterFragment, name: "뒤틀린 갈망의 편린" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "에메랄드의 맹세, 그 누구도 거스르지 못한다.",
    banner: bannerJupeter,
    icon: iconJupeter,
    guideVideo: {
      title: "유피테르 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2025.03.05",
      url: "https://www.youtube.com/watch?v=DSFcEandd4M",
    },
    difficultyStats: { stack: 5.0, timePressure: 4.5, pattern: 5.0, control: 4.5 },
    overallDifficulty: 5,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
  {
    id: 13,
    category: "GRANDIS",
    name: "찬란한 흉성",
    engName: "CHANRAN",
    level: 280,
    difficulties: [
      {
        level: "NORMAL",
        recommendCombat: "1억",
        minCombat: "8000만",
        estimatedCost: "100억",
        clearTime: "15분~20분",
        dropItems: [
          {
            icon: dropRingBoxWhite,
            name: "백옥의 보스 반지 상자\n3~4레벨 보스 반지 획득 가능\n4레벨 35%\n리레/컨티 확률 소폭 상향",
          },
          { icon: dropMaleficStarFragment, name: "황홀한 환상의 단편 조각" },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropWhetstoneLife, name: "생명의 연마석" },
        ],
      },
      {
        level: "HARD",
        recommendCombat: "솔플불가",
        minCombat: "솔플불가",
        estimatedCost: "무제한",
        clearTime: "-",
        dropItems: [
          { icon: dropBrightRing2, name: "황홀한 악몽" },
          { icon: dropBoxEternelAdversary, name: "환상의 에테르넬 방어구 상자" },
          { icon: dropWhetstoneFaith, name: "신념의 연마석" },
          {
            icon: dropRingBoxLife,
            name: "생명의 보스 반지 상자\n3~4레벨 반지 획득 가능\n4레벨 70%\n생명의 연마석 획득 가능",
          },
          { icon: dropDarkBox, name: "혼돈의 칠흑 장신구 상자" },
          { icon: dropMaleficStarFragmentFull, name: "황홀한 환상의 단편" },
        ],
      },
    ],
    defaultDifficulty: "HARD",
    quote: "찬란함 속에 숨겨진 흉조, 그대는 눈치챘는가.",
    banner: bannerChanran,
    icon: iconChanran,
    guideVideo: {
      title: "찬란한 흉성 하드 솔플 완벽 공략 (패턴 분석 & 주의사항)",
      channel: "Maple Universe",
      views: "-",
      date: "2025.04.18",
      url: "https://www.youtube.com/watch?v=pRYgbU1hu7k",
    },
    difficultyStats: { stack: 3.0, timePressure: 3.0, pattern: 3.5, control: 3.0 },
    overallDifficulty: 3,
    equipment: { weaponName: "-", potential: "-", additional: "-", price: "-" },
    hexa: [],
    hexaStats: DEFAULT_HEXA_STATS,
    linkUnion: {
      linkSkill: "-",
      union: "유니온 9000 이상",
      unionStats: {
        주스탯: 15,
        부스탯: 0,
        크확: 11,
        크뎀: 40,
        방무: 40,
        보공: 40,
        공마: 15,
        벞지: 28,
      },
    },
    checklist: [],
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(2);
  const selectedBoss = bosses.find((boss) => boss.id === selectedId);
  const [selectedLevel, setSelectedLevel] = useState(selectedBoss.defaultDifficulty);

  useEffect(() => {
    setSelectedLevel(selectedBoss.defaultDifficulty);
  }, [selectedBoss.id, selectedBoss.defaultDifficulty]);

  const currentDifficulty =
    selectedBoss.difficulties.find((d) => d.level === selectedLevel) ??
    selectedBoss.difficulties[0] ?? { level: "-", recommendCombat: "-", minCombat: "-", estimatedCost: "-", clearTime: "-" };

  const currentIndex = bosses.findIndex((boss) => boss.id === selectedId);
  const prevBoss = bosses[currentIndex - 1];
  const nextBoss = bosses[currentIndex + 1];

  const [navDirection, setNavDirection] = useState(0);
  const goToBoss = (id) => {
    const newIndex = bosses.findIndex((boss) => boss.id === id);
    setNavDirection(newIndex > currentIndex ? 1 : newIndex < currentIndex ? -1 : 0);
    setSelectedId(id);
  };

  const mainContentRef = useRef(null);
  useEffect(() => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedId]);

  const [dropTooltip, setDropTooltip] = useState(null);
  const showDropTooltip = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropTooltip({ text, x: rect.left + rect.width / 2, y: rect.top });
  };
  const hideDropTooltip = () => setDropTooltip(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <button
        className="mobile-menu-button"
        onClick={() => setSidebarOpen(true)}
        aria-label="메뉴 열기"
      >
        ☰
      </button>

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}

      <BossSidebar
        bosses={bosses}
        selectedId={selectedId}
        onSelect={goToBoss}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <div className="main-scroll-area" ref={mainContentRef}>
        <div
          key={selectedBoss.id}
          className={`boss-page slide-${navDirection === 1 ? "next" : navDirection === -1 ? "prev" : "fade"}`}
        >
        {/* 배너: 여백 없이 꽉 차게 */}
        <div
          className="hero-banner"
          style={{ backgroundImage: `url(${selectedBoss.banner})` }}
        >
          <div className="hero-content">
            <p className="hero-category">+ {selectedBoss.category} →</p>
            <h1 className="hero-name">{selectedBoss.name}</h1>
            <p className="hero-eng-name">{selectedBoss.engName}</p>
            <p className="hero-quote">"{selectedBoss.quote}"</p>
            <div className="hero-badges">
              <span className="badge-level">Lv.{selectedBoss.level}</span>
              <span className={`badge-difficulty diff-${currentDifficulty.level.toLowerCase()}`}>
                {currentDifficulty.level}
              </span>
            </div>
            {selectedBoss.difficulties.length > 1 && (
              <div className="difficulty-selector">
                {selectedBoss.difficulties.map((d) => (
                  <button
                    key={d.level}
                    onClick={() => setSelectedLevel(d.level)}
                    className={`difficulty-pill diff-${d.level.toLowerCase()} ${d.level === selectedLevel ? "active" : ""}`}
                  >
                    {d.level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 나머지 콘텐츠: 여백 있게 */}
        <div className="content-padding">
          <div className="info-bar">
            <div className="info-item">
              <img src={attackIcon} className="info-icon" alt="" />
              <p className="info-label">최소 솔플 전투력</p>
              <p className="info-value">{currentDifficulty.minCombat}</p>
            </div>
            <div className="info-item">
              <img src={rarityIcon} className="info-icon" alt="" />
              <p className="info-label">권장 솔플 전투력</p>
              <p className="info-value">{currentDifficulty.recommendCombat}</p>
            </div>
            <div className="info-item">
              <img src={mesoIcon} className="info-icon" alt="" />
              <p className="info-label">예상 준비 비용</p>
              <p className="info-value">
                {currentDifficulty.level === "EXTREME" ? "무제한" : currentDifficulty.estimatedCost}
              </p>
            </div>
            <div className="info-item">
              <img src={timeIcon} className="info-icon" alt="" />
              <p className="info-label">평균 클리어 시간</p>
              <p className="info-value">{currentDifficulty.clearTime}</p>
            </div>

            {/* 주요 드롭 아이템 3개 */}
            <div className="info-drop-section">
              <img src={dropItemIcon} className="info-icon" alt="" />
              <p className="info-label">주요 드롭 아이템</p>
              <div className="info-drop-items">
                {currentDifficulty.dropItems && currentDifficulty.dropItems.length > 0
                  ? currentDifficulty.dropItems.map((item, i) => (
                      <div
                        key={i}
                        className="info-drop-box"
                        onMouseEnter={(e) => showDropTooltip(e, item.name)}
                        onMouseLeave={hideDropTooltip}
                      >
                        <img src={item.icon} alt={item.name} />
                      </div>
                    ))
                  : Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="info-drop-box"></div>
                    ))}
              </div>
            </div>
          </div>

          {/* 공략영상 / 난이도요약 / 상세정보 3개를 한 줄에 */}
          <div className="triple-grid">
            <BossDetail boss={selectedBoss} />
            <DetailPanel boss={selectedBoss} />
          </div>
        </div>
        </div>

        {/* 이전/현재/다음 보스 내비게이션 (콘텐츠 짧으면 바로 붙고, 길면 하단에 붙어있음) */}
        <div className="boss-nav">
            <button
              className="boss-nav-arrow"
              disabled={!prevBoss}
              onClick={() => prevBoss && goToBoss(prevBoss.id)}
            >
              ‹
            </button>
            <div className="boss-nav-cards">
              <div
                className={`boss-nav-card ${!prevBoss ? "empty" : ""}`}
                style={prevBoss ? { "--card-face": `url(${prevBoss.banner})` } : undefined}
                onClick={() => prevBoss && goToBoss(prevBoss.id)}
              >
                {prevBoss && (
                  <>
                    <p className="boss-nav-label">이전 보스</p>
                    <p className="boss-nav-name">{prevBoss.name}</p>
                  </>
                )}
              </div>
              <div
                className="boss-nav-card current"
                style={{ "--card-face": `url(${selectedBoss.banner})` }}
              >
                <p className="boss-nav-label">현재 보스</p>
                <p className="boss-nav-name">{selectedBoss.name}</p>
              </div>
              <div
                className={`boss-nav-card ${!nextBoss ? "empty" : ""}`}
                style={nextBoss ? { "--card-face": `url(${nextBoss.banner})` } : undefined}
                onClick={() => nextBoss && goToBoss(nextBoss.id)}
              >
                {nextBoss && (
                  <>
                    <p className="boss-nav-label">다음 보스</p>
                    <p className="boss-nav-name">{nextBoss.name}</p>
                  </>
                )}
              </div>
            </div>
            <button
              className="boss-nav-arrow"
              disabled={!nextBoss}
              onClick={() => nextBoss && goToBoss(nextBoss.id)}
            >
              ›
            </button>
        </div>
        </div>
      </div>
      {dropTooltip &&
        createPortal(
          <div
            className="doping-tooltip"
            style={{ left: dropTooltip.x, top: dropTooltip.y }}
          >
            {dropTooltip.text}
          </div>,
          document.body
        )}
    </div>
  );
}

export default App;

/* JS 구조 설명 


   1. 이 파일에 뭐가 들어있나
      - 파일 위쪽 절반 : bosses 라는 큰 배열 하나. 보스 17마리 정보가 전부 여기 들어있음
        (이름, 배너 이미지, 난이도별 스탯, 드롭 아이템, 공략 영상 등)
      - 파일 아래쪽 : App() 컴포넌트. 실제 화면을 그리는 부분

   2. bosses 배열 안에 보스 하나(객체)는 이런 모양임
      {
        id, category, name, engName, level,       // 기본 정보
        difficulties: [ {level, recommendCombat, minCombat,
                          estimatedCost, clearTime, dropItems}, ... ], // 난이도별 정보 (이지~익스트림)
        defaultDifficulty,                          // 처음 보여줄 난이도
        quote, banner, icon,                        // 문구 / 배너 이미지 / 사이드바용 작은 아이콘
        guideVideo: {title, channel, date, url},     // 추천 공략 영상
        difficultyStats: {stack, pattern, control, timePressure}, // 레이더 차트용 4개 수치
        overallDifficulty,                           // 별점 (5점 만점)
        hexaStats, linkUnion                         // HEXA 스탯 / 링크·유니온 탭 내용
      }
      → 즉 "보스를 하나 추가하고 싶으면 이 배열에 객체 하나만 더 넣으면 된다"는 구조

   3. App() 컴포넌트 안의 state(=화면이 기억하고 있는 값들)
      - selectedId    : 지금 보고 있는 보스의 id (사이드바에서 보스를 클릭하면 바뀜)
      - selectedLevel : 지금 선택된 난이도 (이지/노말/하드/카오스/익스트림 버튼 누르면 바뀜)
                        → 보스를 바꾸면 useEffect가 그 보스의 기본 난이도로 자동 리셋해줌
      - navDirection  : 방금 "이전 보스"로 갔는지 "다음 보스"로 갔는지 (-1 / 0 / 1)
                        → 이 값에 따라 슬라이드 애니메이션이 왼쪽/오른쪽 중 어디서 들어올지 정해짐
      - dropTooltip   : 드롭 아이템에 마우스를 올렸을 때 뜨는 말풍선의 위치·내용
      - sidebarOpen   : 모바일에서 햄버거 버튼으로 여는 사이드바가 열려있는지 여부

   4. selectedId만 있으면 나머지는 전부 "계산해서" 얻어냄 (따로 저장 안 함)
      - selectedBoss     : bosses 배열에서 selectedId랑 id가 같은 보스를 찾은 것
      - currentDifficulty: selectedBoss.difficulties 중에서 selectedLevel이랑 맞는 것
      - currentIndex     : 지금 보스가 배열에서 몇 번째인지
      - prevBoss / nextBoss : currentIndex 기준 바로 앞/뒤 보스 (배열 끝이면 undefined → 빈 카드로 표시됨)

   5. 주요 함수
      - goToBoss(id)   : 사이드바나 이전/다음 카드를 클릭했을 때 실행.
                         새 보스가 지금 보스보다 배열 뒤에 있으면 navDirection을 1(다음),
                         앞에 있으면 -1(이전)로 설정한 다음 selectedId를 바꿈
      - showDropTooltip / hideDropTooltip : 드롭 아이템에 마우스를 올리고 뗄 때 툴팁을 켜고 끔.
                         마우스를 올린 요소의 화면상 좌표(getBoundingClientRect)를 구해서
                         그 좌표에 툴팁을 띄우고, createPortal로 document.body에 직접 그림
                         (카드 안에 그리면 애니메이션 때문에 위치가 틀어져서 body로 뺀 것)

   6. 화면(JSX)이 위에서부터 어떤 순서로 그려지는지
      1) 햄버거 버튼 + 사이드바 배경(모바일에서만 보임)
      2) <BossSidebar> : 왼쪽 보스 목록
      3) 히어로 배너 : 보스 이름/문구/난이도 선택 버튼
      4) 정보 바 : 전투력/비용/시간/드롭 아이템 4~5칸
      5) 3분할 카드 : <BossDetail>(영상+레이더차트) + <DetailPanel>(HEXA/링크/도핑 탭)
      6) 보스 내비게이션 : 이전/현재/다음 보스 카드 (화면 하단 고정)
      7) 드롭 아이템 툴팁 (평소엔 안 보이다가 dropTooltip 값이 생기면 나타남)

   ※ BossSidebar.jsx / BossDetail.jsx / DetailPanel.jsx 는 각 파일 맨 아래에
      같은 형식으로 짧은 설명을 따로 적어뒀음
   ============================================================ */