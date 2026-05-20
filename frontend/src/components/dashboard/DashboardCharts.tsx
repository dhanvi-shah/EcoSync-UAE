import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { motion } from "framer-motion";
import GlassPanel from "@/components/dashboard/GlassPanel";
import {
  MATERIAL_PIE,
  MONTHLY_RECYCLING,
} from "@/data/ecosyncDashboardMock";
import { sectionBlock } from "@/utils/motionVariants";

const TICK = { fill: "rgba(209, 250, 229, 0.5)", fontSize: 11 };
const AXIS_LINE = { stroke: "rgba(167, 233, 196, 0.22)" };

function BarTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value;
  return (
    <div className="rounded-xl border border-white/12 bg-[#04130f]/95 px-3 py-2 text-xs shadow-glass backdrop-blur-xl">
      <p className="font-semibold text-emerald-100">{label}</p>
      <p className="mt-1 tabular-nums text-emerald-300">
        {typeof v === "number" ? `${v.toLocaleString()} kg` : "—"}
      </p>
    </div>
  );
}

function PieTooltip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  const name = String(p.name ?? "");
  const val = p.value;
  return (
    <div className="rounded-xl border border-white/12 bg-[#04130f]/95 px-3 py-2 text-xs shadow-glass backdrop-blur-xl">
      <p className="font-semibold text-emerald-100">{name}</p>
      <p className="mt-1 tabular-nums text-emerald-300">
        {typeof val === "number" ? `${val.toLocaleString()} kg` : "—"}
      </p>
    </div>
  );
}

export default function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <motion.div
        className="lg:col-span-3"
        variants={sectionBlock}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <GlassPanel glow="teal" className="h-full p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/75">
            Trend
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
            Monthly recycling
          </h2>
          <p className="mt-1 text-sm text-emerald-100/55">
            Kilograms recovered · rolling window
          </p>
          <div className="mt-6 h-[280px] w-full min-w-0 sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MONTHLY_RECYCLING}
                margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="barEco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5eead4" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.85} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 6"
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={AXIS_LINE}
                  tickLine={false}
                  tick={TICK}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={TICK}
                  width={36}
                />
                <Tooltip
                  cursor={{ fill: "rgba(16,185,129,0.08)" }}
                  content={<BarTooltip />}
                />
                <Bar
                  dataKey="kg"
                  fill="url(#barEco)"
                  radius={[10, 10, 4, 4]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </motion.div>

      <motion.div
        className="lg:col-span-2"
        variants={sectionBlock}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <GlassPanel glow="violet" className="h-full p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400/75">
            Composition
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
            Material split
          </h2>
          <p className="mt-1 text-sm text-emerald-100/55">
            Share by stream
          </p>
          <div className="mt-2 h-[280px] w-full min-w-0 sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MATERIAL_PIE}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="82%"
                  paddingAngle={2}
                  stroke="rgba(4,19,15,0.9)"
                  strokeWidth={2}
                >
                  {MATERIAL_PIE.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-emerald-100/65">
            {MATERIAL_PIE.map((m) => (
              <li key={m.name} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: m.color,
                    boxShadow: `0 0 10px ${m.color}88`,
                  }}
                />
                {m.name}
              </li>
            ))}
          </ul>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
