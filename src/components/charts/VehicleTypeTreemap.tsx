import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

const data = [
  {
    name: 'Passenger Cars',
    children: [
      { name: 'Sedan', size: 45000 },
      { name: 'Hatchback', size: 32000 },
      { name: 'SUV', size: 58000 },
      { name: 'MPV', size: 12000 },
    ],
  },
  {
    name: 'Commercial',
    children: [
      { name: 'Van', size: 8000 },
      { name: 'Pickup', size: 25000 },
      { name: 'Lorry', size: 15000 },
    ],
  },
  {
    name: 'Motorcycles',
    children: [
      { name: 'Scooter', size: 42000 },
      { name: 'Street', size: 18000 },
    ],
  },
];

export default function VehicleTypeTreemap() {
  return (
    <div className="h-[500px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8b5cf6"
        >
          <Tooltip 
             contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
             itemStyle={{ color: '#fff' }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
