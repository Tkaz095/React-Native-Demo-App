import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path, Polyline, Circle as SvgCircle } from "react-native-svg";
import {
    CONTENT_EFFICIENCY_MOCK,
    INTERACTION_QUALITY_MOCK,
    NEW_MEMBER_PERFORMANCE_MOCK,
    PROJECT_FORMATION_MOCK,
} from "../services/strategic-dashboard.mock";

// ─── Shared ─────────────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return <View style={shared.card}>{children}</View>;
}

function CardHeader({ title }: { title: string }) {
  return (
    <View style={shared.cardHeaderRow}>
      <Text style={shared.cardTitle}>{title}</Text>
      <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
    </View>
  );
}

function TrendBadge({ trend, up }: { trend: string; up: boolean }) {
  return (
    <View style={[shared.badge, up ? shared.badgeUp : shared.badgeDown]}>
      <Ionicons
        name="trending-up"
        size={11}
        color={up ? "#059669" : "#DC2626"}
      />
      <Text
        style={[
          shared.badgeText,
          up ? shared.badgeTextUp : shared.badgeTextDown,
        ]}
      >
        {trend}
      </Text>
    </View>
  );
}

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  return (
    <View style={shared.progressTrack}>
      <View
        style={[
          shared.progressFill,
          { width: `${(value / max) * 100}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

// ─── Mini Area Chart (replaces recharts AreaChart) ────────────────────────────

interface MiniAreaChartProps {
  data: { value: number }[];
  color?: string;
  height?: number;
  width?: number;
}

function MiniAreaChart({
  data,
  color = "#1E3A5F",
  height = 80,
  width = 240,
}: MiniAreaChartProps) {
  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const pad = 4;

  const toX = (i: number) => pad + (i / (data.length - 1)) * (width - pad * 2);
  const toY = (v: number) =>
    height - pad - ((v - minVal) / range) * (height - pad * 2);

  const points = data.map((d, i) => `${toX(i)},${toY(d.value)}`).join(" ");
  const areaPath = `M${toX(0)},${height} ${data.map((d, i) => `L${toX(i)},${toY(d.value)}`).join(" ")} L${toX(data.length - 1)},${height} Z`;

  return (
    <Svg width={width} height={height}>
      <Path d={areaPath} fill={color} fillOpacity={0.12} />
      <Polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Card 1: Tỷ Lệ Hình Thành Dự Án ─────────────────────────────────────────

function ProjectFormationChart() {
  const d = PROJECT_FORMATION_MOCK;
  const months = d.chartData.map((p) => p.month);

  return (
    <Card>
      <CardHeader title="Tỷ Lệ Hình Thành Dự Án" />
      <View style={styles.bigValueRow}>
        <Text style={styles.bigValue}>{d.rate}</Text>
        <Text style={styles.bigValueUnit}>{d.unit}</Text>
        <TrendBadge trend={d.trend} up={d.trendUp} />
      </View>
      <View style={styles.chartWrap}>
        <View style={{ width: "100%", height: 80 }}>
          <MiniAreaChart
            data={d.chartData}
            color="#1E3A5F"
            height={80}
            width={320}
          />
        </View>
        <View style={styles.xAxis}>
          {months.map((m) => (
            <Text key={m} style={styles.xLabel}>
              {m}
            </Text>
          ))}
        </View>
      </View>
    </Card>
  );
}

// ─── Card 2: Hiệu Quả Nội Dung (horizontal bar, no recharts needed) ──────────

function ContentEfficiencyChart() {
  const d = CONTENT_EFFICIENCY_MOCK;
  const maxVal = Math.max(...d.items.map((i) => i.actual));

  return (
    <Card>
      <CardHeader title="Hiệu Quả Nội Dung" />
      <View style={styles.barList}>
        {d.items.map((item) => (
          <View key={item.label} style={styles.barRow}>
            <Text style={styles.barLabel} numberOfLines={2}>
              {item.label}
            </Text>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${(item.actual / maxVal) * 100}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.barValue}>{item.actual}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

// ─── Card 3: Chỉ Số Chất Lượng Tương Tác ─────────────────────────────────────

function InteractionQualityIndex() {
  const d = INTERACTION_QUALITY_MOCK;
  return (
    <Card>
      <CardHeader title="Chỉ Số Chất Lượng Tương Tác" />
      <View style={styles.bigValueRow}>
        <Text style={styles.bigValue}>{d.score}</Text>
        <Text style={styles.bigValueUnit}>/{d.maxScore}</Text>
        <TrendBadge trend={d.trend} up={d.trendUp} />
      </View>
      <View style={styles.metricList}>
        {d.metrics.map((m) => (
          <View key={m.label} style={styles.metricItem}>
            <View style={styles.metricLabelRow}>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text style={styles.metricValue}>
                {m.value}/{d.maxScore}
              </Text>
            </View>
            <ProgressBar value={m.value} max={d.maxScore} color={m.color} />
          </View>
        ))}
      </View>
    </Card>
  );
}

// ─── Card 4: Hiệu Suất Hội Viên Mới (SVG donut rings) ────────────────────────

const RING_R = 16;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

function RingMetric({
  value,
  unit,
  label,
  color,
}: {
  value: number;
  unit: string;
  label: string;
  color: string;
}) {
  const dashFill = (value / 100) * RING_CIRCUMFERENCE;
  return (
    <View style={styles.ringItem}>
      <Svg width={48} height={48} viewBox="0 0 40 40">
        <SvgCircle
          cx="20"
          cy="20"
          r={RING_R}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <SvgCircle
          cx="20"
          cy="20"
          r={RING_R}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${dashFill} ${RING_CIRCUMFERENCE}`}
          strokeLinecap="round"
          rotation="-90"
          origin="20,20"
        />
      </Svg>
      <Text style={styles.ringValue}>
        {value}
        {unit}
      </Text>
      <Text style={styles.ringLabel}>{label}</Text>
    </View>
  );
}

function NewMemberPerformance() {
  const d = NEW_MEMBER_PERFORMANCE_MOCK;
  return (
    <Card>
      <CardHeader title="Hiệu Suất Hội Viên Mới" />
      <View style={styles.ringRow}>
        {d.metrics.map((m) => (
          <RingMetric
            key={m.label}
            value={m.value}
            unit={m.unit}
            label={m.label}
            color={m.color}
          />
        ))}
      </View>
      <View style={styles.timelineList}>
        {d.timeline.map((t) => (
          <View key={t.label} style={styles.timelineRow}>
            <Text style={styles.timelineLabel}>{t.label}</Text>
            <Text style={styles.timelineValue}>{t.value}%</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function StrategicTier2() {
  return (
    <View style={styles.tier}>
      <View style={shared.sectionLabel}>
        <View style={shared.sectionBar} />
        <Text style={shared.sectionTitle}>TẦNG 2 – TƯƠNG TÁC & CHUYỂN ĐỔI</Text>
      </View>
      <View style={styles.cardList}>
        <View style={styles.row}>
          <View style={styles.half}>
            <ProjectFormationChart />
          </View>
          <View style={styles.half}>
            <ContentEfficiencyChart />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.half}>
            <InteractionQualityIndex />
          </View>
          <View style={styles.half}>
            <NewMemberPerformance />
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const shared = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginRight: 6,
  },
  sectionLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionBar: {
    width: 4,
    height: 22,
    borderRadius: 2,
    backgroundColor: "#1E3A5F",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeUp: { backgroundColor: "#D1FAE5" },
  badgeDown: { backgroundColor: "#FEE2E2" },
  badgeText: { fontSize: 12, fontWeight: "600" },
  badgeTextUp: { color: "#059669" },
  badgeTextDown: { color: "#DC2626" },
  progressTrack: {
    width: "100%",
    height: 7,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});

const styles = StyleSheet.create({
  tier: { gap: 12 },
  cardList: { gap: 10 },
  row: { flexDirection: "row", gap: 10 },
  half: { flex: 1 },
  bigValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    flexWrap: "wrap",
  },
  bigValue: { fontSize: 30, fontWeight: "800", color: "#111827" },
  bigValueUnit: { fontSize: 16, color: "#9CA3AF", fontWeight: "500" },
  chartWrap: { gap: 4 },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  xLabel: { fontSize: 11, color: "#9CA3AF" },
  barList: { gap: 10 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  barLabel: { fontSize: 11, color: "#6B7280", width: 72, lineHeight: 14 },
  barTrack: {
    flex: 1,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 4 },
  barValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    width: 24,
    textAlign: "right",
  },
  metricList: { gap: 12 },
  metricItem: { gap: 6 },
  metricLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricLabel: { fontSize: 12, color: "#6B7280", flex: 1 },
  metricValue: { fontSize: 12, fontWeight: "600", color: "#111827" },
  ringRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  ringItem: { alignItems: "center", gap: 4 },
  ringValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginTop: -2,
  },
  ringLabel: { fontSize: 11, color: "#6B7280" },
  timelineList: { gap: 6 },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timelineLabel: { fontSize: 12, color: "#6B7280" },
  timelineValue: { fontSize: 13, fontWeight: "600", color: "#111827" },
});
