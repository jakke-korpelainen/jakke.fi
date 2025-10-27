const COLOR = "orange";
const STROKE_WIDTH = 4;
const SIZE = 64;

export function LoadingSpinner() {
  return (
    <svg className="animate-spin" height={SIZE} width={SIZE}>
      <polygon
        points={`1,${SIZE / 2} ${SIZE / 2},1 ${SIZE / 2},${SIZE / 2}`}
        style={{
          fill: "transparent",
          stroke: COLOR,
          strokeWidth: STROKE_WIDTH,
        }}
      ></polygon>
      <polygon
        points={`${SIZE / 2},${SIZE / 2}, ${SIZE / 2},${SIZE} ${SIZE},${SIZE / 2}`}
        style={{
          fill: "transparent",
          stroke: COLOR,
          strokeWidth: STROKE_WIDTH,
        }}
      ></polygon>
    </svg>
  );
}
