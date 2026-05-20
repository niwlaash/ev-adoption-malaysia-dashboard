import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { useSummaryStats } from '../../hooks/useMetricsData';

export default function VehicleTypeTreemap() {
  const { data: summaryData } = useSummaryStats();

  const data = summaryData?.category_dist?.map((item: any) => ({
    name: item.type,
    size: item.count
  })) || [];

  return (
    <div className="h-[500px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8b5cf6"
          content={<CustomizedContent />}
        >
          <Tooltip
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => [value.toLocaleString(), 'Registrations']}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}

const CustomizedContent = (props: any) => {
  const { depth, x, y, width, height, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? `rgba(139, 92, 246, ${1 / (depth + 1)})` : 'none',
          stroke: '#171717',
          strokeWidth: 2 / (depth + 1),
          strokeOpacity: 1 / (depth + 1),
        }}
      />
      {width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 5}
          textAnchor="middle"
          fill="#fff"
          fontSize={10}
          className="font-bold pointer-events-none"
        >
          {name}
        </text>
      )}
    </g>
  );
};
