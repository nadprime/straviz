import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ComplexityChartProps {
  complexity: string;
  theme: "light" | "dark";
}

const generateData = (complexity: string) => {
  const data = [];
  const points = 10;
  
  for (let n = 1; n <= points; n++) {
    let val = 1;
    const cleanComplexity = complexity.toLowerCase();

    if (cleanComplexity.includes('log n')) {
      val = Math.log2(n + 1);
    } else if (cleanComplexity.includes('n²')) {
      val = n * n;
    } else if (cleanComplexity.includes('n log n')) {
      val = n * Math.log2(n + 1);
    } else if (cleanComplexity.includes('n')) {
      val = n;
    } else if (cleanComplexity.includes('1')) {
      val = 1;
    } else {
      // Fallback for others like O(V+E), just rough estimation
      val = n; 
    }

    data.push({
      n,
      ops: parseFloat(val.toFixed(2)),
    });
  }
  return data;
};

export const ComplexityChart: React.FC<ComplexityChartProps> = ({ complexity, theme }) => {
  const data = generateData(complexity);

  const isDark = theme === "dark";

  return (
    <div className="h-40 w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 overflow-hidden transition-colors duration-300 relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#27272a" : "#e4e4e7"} vertical={false} />
          <XAxis 
            dataKey="n" 
            hide 
          />
          <YAxis 
            hide 
            domain={[0, 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#09090b' : '#ffffff', 
              border: isDark ? '1px solid #27272a' : '1px solid #e4e4e7',
              borderRadius: '8px',
              fontSize: '10px'
            }}
            itemStyle={{ color: isDark ? '#ffffff' : '#000000' }}
            labelStyle={{ color: isDark ? '#a1a1aa' : '#71717a' }}
          />
          <Line 
            type="monotone" 
            dataKey="ops" 
            stroke={isDark ? "#d4d4d8" : "#3f3f46"} 
            strokeWidth={3} 
            dot={{ r: 4, fill: isDark ? '#d4d4d8' : '#3f3f46', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: isDark ? '#ffffff' : '#000000', stroke: isDark ? '#000000' : '#ffffff', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
        Growth Curve
      </div>
    </div>
  );
};
