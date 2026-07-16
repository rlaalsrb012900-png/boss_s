// BossDetail.jsx
const RADAR_AXES = [
  { key: "stack", label: "스택 요구도", angle: -90 },
  { key: "pattern", label: "패턴 난이도", angle: 0 },
  { key: "control", label: "조작 난이도", angle: 90 },
  { key: "timePressure", label: "시간 압박", angle: 180 },
];

function DifficultyRadar({ stats }) {
  const size = 160;
  const center = size / 2;
  const maxRadius = 62;
  const maxValue = 5;

  const toPoint = (angleDeg, value) => {
    const angle = (angleDeg * Math.PI) / 180;
    const r = (value / maxValue) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = RADAR_AXES.map((axis) => toPoint(axis.angle, stats[axis.key]));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="radar-container">
      <svg viewBox={`0 0 ${size} ${size}`} className="difficulty-radar">
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={RADAR_AXES.map((axis) => {
              const p = toPoint(axis.angle, maxValue * level);
              return `${p.x},${p.y}`;
            }).join(" ")}
            className="radar-grid"
          />
        ))}
        {RADAR_AXES.map((axis) => {
          const end = toPoint(axis.angle, maxValue);
          return (
            <line
              key={axis.key}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              className="radar-axis-line"
            />
          );
        })}
        <polygon points={dataPath} className="radar-data" />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} className="radar-dot" />
        ))}
      </svg>
      {RADAR_AXES.map((axis) => (
        <div key={axis.key} className={`radar-label radar-label-${axis.key}`}>
          <p className="radar-label-name">{axis.label}</p>
          <p className="radar-label-value">{stats[axis.key].toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
}

function getYoutubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    let videoId = parsed.searchParams.get("v");
    if (!videoId && parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    }
    if (!videoId) return null;
    const start = parsed.searchParams.get("t");
    const startSeconds = start ? parseInt(start, 10) : null;
    return `https://www.youtube.com/embed/${videoId}${startSeconds ? `?start=${startSeconds}` : ""}`;
  } catch {
    return null;
  }
}

function BossDetail({ boss }) {
  const embedUrl = boss.guideVideo.url ? getYoutubeEmbedUrl(boss.guideVideo.url) : null;
  return (
    <>
      {/* 1. 추천 공략 영상 */}
      <div className="grid-card">
        <div className="grid-card-header">
          <h3>추천 공략 영상</h3>
          {boss.guideVideo.url ? (
            <a
              className="more-link"
              href={boss.guideVideo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              더보기 &gt;
            </a>
          ) : (
            <span className="more-link">더보기 &gt;</span>
          )}
        </div>
        {embedUrl ? (
          <iframe
            className="video-thumbnail video-embed"
            src={embedUrl}
            title={boss.guideVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-thumbnail">
            <span className="play-icon">▶</span>
          </div>
        )}
        {boss.guideVideo.title !== "-" && (
          <p className="video-title">{boss.guideVideo.title}</p>
        )}
        {(boss.guideVideo.channel !== "-" || boss.guideVideo.date !== "-") && (
          <p className="video-meta">
            {boss.guideVideo.channel} · {boss.guideVideo.date}
          </p>
        )}
      </div>

      {/* 2. 보스 난이도 요약 */}
      <div className="grid-card">
        <div className="grid-card-header">
          <h3>보스 난이도 요약</h3>
        </div>
        <DifficultyRadar stats={boss.difficultyStats} />
        <div className="overall-difficulty">
          <span>종합 난이도</span>
          <span className="stars">
            {"★".repeat(boss.overallDifficulty)}
            {"☆".repeat(5 - boss.overallDifficulty)}
          </span>
        </div>
      </div>
    </>
  );
}

export default BossDetail;

/* JS 구조 설명

   이 파일은 3분할 카드 중 앞의 두 개(공략 영상 카드, 난이도 요약 카드)를 그림.

   1. DifficultyRadar(레이더 차트) : 스택요구도/패턴난이도/조작난이도/시간압박,
      4개 수치를 마름모 모양 그래프로 그려주는 부분
      - RADAR_AXES : 4개 축의 이름이랑 각도(위/오른쪽/아래/왼쪽 = -90/0/90/180도)를 미리 정해둠
      - toPoint(각도, 값) : "이 각도로 이 값만큼 뻗어나가면 좌표가 어디냐"를 계산하는 함수.
        고등학교 때 배우는 sin/cos으로 각도를 좌표로 바꾸는 것과 똑같음
      - dataPoints : 4개 축 각각에 실제 보스 수치를 넣어서 나온 4개 좌표 → 이걸 이어서
        polygon(다각형)을 그리면 그게 바로 골드색으로 채워진 레이더 모양이 됨
      - gridLevels : 배경에 깔리는 옅은 회색 그물망(25%/50%/75%/100% 지점) 라인

   2. getYoutubeEmbedUrl(url) : 유튜브 "시청" 링크(watch?v=...)를
      영상을 바로 재생할 수 있는 "embed" 링크로 바꿔주는 함수.
      링크에 t=1020초 같은 시작 시간이 있으면 그것도 같이 옮겨줌

   3. BossDetail 컴포넌트 : 위 두 개를 조합해서 실제 화면에 그림
      - 영상 카드 : guideVideo.url이 있으면 iframe으로 영상을 바로 재생,
        없으면 그냥 ▶ 아이콘만 있는 빈 박스를 보여줌
      - 난이도 카드 : DifficultyRadar + 별점(overallDifficulty만큼 ★, 나머지는 ☆) */