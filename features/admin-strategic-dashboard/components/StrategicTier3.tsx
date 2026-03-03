import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path, Polyline, Circle as SvgCircle } from "react-native-svg";
import {
  COST_VS_VALUE_MOCK,
  MEMBER_SOURCE_QUALITY_MOCK,
  OPERATIONAL_BALANCE_MOCK,
} from "../services/strategic-dashboard.mock";

// ─── Shared ─────────────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return <View style={shared.card}>{children}</View>;
}
function CardHeader({ title }: { title: string }) {
  return (
    <View style={shared.cardHeaderRow}>
      <Text style={shared.cardTitle}>{title}</Text>
      <TouchableOpacity
        onPress={() => Alert.alert("Thông tin", `Chi tiết về ${title}`)}
        activeOpacity={0.7}
      >
        <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
}
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={shared.progressTrack}>
      <View
        style={[
          shared.progressFill,
          { width: `${value}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

// ─── Dual-series Mini Area Chart (replaces recharts) ─────────────────────────

interface DualChartPoint {
  cost: number;
  value: number;
}
interface DualMiniChartProps {
  data: DualChartPoint[];
  colorA?: string;
  colorB?: string;
  height?: number;
  width?: number;
}

function DualMiniAreaChart({
  data,
  colorA = "#EF4444",
  colorB = "#10B981",
  height = 90,
  width = 200,
}: DualMiniChartProps) {
  const allVals = data.flatMap((d) => [d.cost, d.value]);
  const minVal = Math.min(...allVals);
  const maxVal = Math.max(...allVals);
  const range = maxVal - minVal || 1;
  const pad = 4;

  const toX = (i: number) => pad + (i / (data.length - 1)) * (width - pad * 2);
  const toY = (v: number) =>
    height - pad - ((v - minVal) / range) * (height - pad * 2);

  const pathFor = (key: keyof DualChartPoint) =>
    `M${toX(0)},${height} ${data.map((d, i) => `L${toX(i)},${toY(d[key])}`).join(" ")} L${toX(data.length - 1)},${height} Z`;
  const lineFor = (key: keyof DualChartPoint) =>
    data.map((d, i) => `${toX(i)},${toY(d[key])}`).join(" ");

  return (
    <Svg width={width} height={height}>
      <Path d={pathFor("cost")} fill={colorA} fillOpacity={0.1} />
      <Polyline
        points={lineFor("cost")}
        fill="none"
        stroke={colorA}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path d={pathFor("value")} fill={colorB} fillOpacity={0.1} />
      <Polyline
        points={lineFor("value")}
        fill="none"
        stroke={colorB}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Card 1: Chất Lượng Nguồn Hội Viên ──────────────────────────────────────

function MemberSourceQuality() {
  const d = MEMBER_SOURCE_QUALITY_MOCK;
  return (
    <Card>
      <CardHeader title="Chất Lượng Nguồn Hội Viên" />
      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#1E3A5F" }]} />
          <Text style={styles.legendText}>Kích hoạt</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "#B8860B" }]} />
          <Text style={styles.legendText}>Dự án</Text>
        </View>
      </View>
      <View style={styles.sourceList}>
        {d.sources.map((s) => (
          <View key={s.label} style={styles.sourceItem}>
            <View style={styles.sourceTitleRow}>
              <Text style={styles.sourceLabel}>{s.label}</Text>
              <Text style={styles.sourceTotal}>
                {s.total} {s.unit}
              </Text>
            </View>
            <View style={styles.dualBarRow}>
              <View style={styles.dualBarGroup}>
                <ProgressBar value={s.activation} color="#1E3A5F" />
                <Text style={styles.barPct}>{s.activation}%</Text>
              </View>
              <View style={styles.dualBarGroup}>
                <ProgressBar value={s.projectRate} color="#B8860B" />
                <Text style={styles.barPct}>{s.projectRate}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

// ─── Card 2: Chi Phí vs Giá Trị Tạo Ra ──────────────────────────────────────

function CostVsValueChart() {
  const d = COST_VS_VALUE_MOCK;
  const months = d.chartData.map((p) => p.month);

  return (
    <Card>
      <CardHeader title="Chi Phí vs Giá Trị Tạo Ra" />
      <View style={styles.kpiRow}>
        {/* Cost */}
        <View style={[styles.kpiCard, styles.kpiCost]}>
          <Text style={styles.kpiTag}>CHI PHÍ / HV</Text>
          <Text style={styles.kpiValue}>{d.costPerMonth}</Text>
        </View>
        {/* Value */}
        <View style={[styles.kpiCard, styles.kpiValue2]}>
          <Text style={styles.kpiTagGreen}>GIÁ TRỊ GDS</Text>
          <Text style={styles.kpiValue}>{d.valueCreated}</Text>
        </View>
        {/* ROI */}
        <View style={[styles.kpiCard, styles.kpiROI]}>
          <Text style={styles.kpiTagWhite}>TỶ LỆ ROI</Text>
          <Text style={styles.kpiROIValue}>{d.roiRatio}x</Text>
        </View>
      </View>
      {/* Chart */}
      <View style={styles.chartWrap}>
        <View style={{ width: "100%", height: 90 }}>
          <DualMiniAreaChart
            data={d.chartData}
            colorA="#EF4444"
            colorB="#10B981"
            height={90}
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
      <View style={styles.summaryNote}>
        <Ionicons name="checkmark-circle" size={16} color="#059669" />
        <Text style={styles.summaryText}>
          Tháng này <Text style={styles.summaryGreen}>giá trị tạo ra</Text> đạt
          đỉnh, trong khi <Text style={styles.summaryRed}>chi phí</Text> duy trì
          ổn định.
        </Text>
      </View>
    </Card>
  );
}

// ─── Card 3: Chỉ Số Cân Bằng Hoạt Động (SVG donut) ──────────────────────────

function OperationalBalanceIndex() {
  const d = OPERATIONAL_BALANCE_MOCK;
  const R = 40;
  const CIRCUM = 2 * Math.PI * R;
  const dashFill = (d.score / d.maxScore) * CIRCUM;

  return (
    <Card>
      <CardHeader title="Chỉ Số Cân Bằng Hoạt Động" />
      {/* Donut */}
      <View style={styles.donutWrap}>
        <Svg width={110} height={110} viewBox="0 0 100 100">
          <SvgCircle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="9"
          />
          <SvgCircle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="9"
            strokeDasharray={`${dashFill} ${CIRCUM}`}
            strokeLinecap="round"
            rotation="-90"
            origin="50,50"
          />
        </Svg>
        <View style={styles.donutLabel}>
          <Text style={styles.donutScore}>{d.score}</Text>
          <Text style={styles.donutMax}>/{d.maxScore}</Text>
        </View>
      </View>
      {/* Segments */}
      <View style={styles.segmentList}>
        {d.segments.map((seg) => (
          <View key={seg.label} style={styles.segmentRow}>
            <View style={styles.segmentLeft}>
              <View
                style={[styles.segmentDot, { backgroundColor: seg.color }]}
              />
              <Text style={styles.segmentLabel}>{seg.label}</Text>
            </View>
            <Text style={styles.segmentValue}>
              <Text style={styles.segmentValueBold}>{seg.value}</Text>
              <Text style={styles.segmentTarget}> /{seg.target}</Text>
            </Text>
          </View>
        ))}
      </View>
      {/* Health note */}
      <View style={styles.healthNote}>
        <View style={styles.healthCheckBadge}>
          <Ionicons name="checkmark" size={11} color="#FFFFFF" />
        </View>
        <Text style={styles.healthNoteText}>{d.healthNote}</Text>
      </View>
    </Card>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function StrategicTier3() {
  return (
    <View style={styles.tier}>
      <View style={shared.sectionLabel}>
        <View style={shared.sectionBar} />
        <Text style={shared.sectionTitle}>TẦNG 3 – PHÁT TRIỂN & CÂN BẰNG</Text>
      </View>
      <View style={styles.cardList}>
        <MemberSourceQuality />
        <CostVsValueChart />
        <OperationalBalanceIndex />
      </View>
    </View>
  );
}

// ─── Shared Styles ───────────────────────────────────────────────────────────

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
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  progressTrack: {
    flex: 1,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#F3F4F6",
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 4 },
});

const styles = StyleSheet.create({
  tier: { gap: 12 },
  cardList: { gap: 12 },
  legendRow: { flexDirection: "row", gap: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: "#6B7280" },
  sourceList: { gap: 14 },
  sourceItem: { gap: 6 },
  sourceTitleRow: { flexDirection: "row", justifyContent: "space-between" },
  sourceLabel: { fontSize: 13, fontWeight: "600", color: "#111827" },
  sourceTotal: { fontSize: 12, color: "#6B7280" },
  dualBarRow: { flexDirection: "row", gap: 10 },
  dualBarGroup: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
  barPct: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    width: 32,
    textAlign: "right",
  },
  kpiRow: { flexDirection: "row", gap: 8 },
  kpiCard: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 4,
  },
  kpiCost: {
    backgroundColor: "#FFF1F2",
    borderLeftColor: "#EF4444",
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  kpiValue2: {
    backgroundColor: "#ECFDF5",
    borderLeftColor: "#10B981",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  kpiROI: {
    backgroundColor: "#1E3A5F",
    borderLeftColor: "#F59E0B",
    borderWidth: 1,
    borderColor: "#1E3A5F",
  },
  kpiTag: {
    fontSize: 10,
    fontWeight: "700",
    color: "#DC2626",
    letterSpacing: 0.5,
  },
  kpiTagGreen: {
    fontSize: 10,
    fontWeight: "700",
    color: "#059669",
    letterSpacing: 0.5,
  },
  kpiTagWhite: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  kpiValue: { fontSize: 17, fontWeight: "800", color: "#111827", marginTop: 2 },
  kpiROIValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 2,
  },
  chartWrap: { gap: 4 },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  xLabel: { fontSize: 11, color: "#9CA3AF" },
  summaryNote: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  summaryText: { flex: 1, fontSize: 12, color: "#6B7280", lineHeight: 18 },
  summaryGreen: { color: "#059669", fontWeight: "600" },
  summaryRed: { color: "#DC2626", fontWeight: "600" },
  donutWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    alignSelf: "center",
  },
  donutLabel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  donutScore: { fontSize: 22, fontWeight: "800", color: "#111827" },
  donutMax: { fontSize: 12, color: "#9CA3AF" },
  segmentList: { gap: 8 },
  segmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  segmentLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6, paddingRight: 8 },
  segmentDot: { width: 8, height: 8, borderRadius: 4 },
  segmentLabel: { fontSize: 12, color: "#6B7280" },
  segmentValue: { fontSize: 12 },
  segmentValueBold: { fontWeight: "700", color: "#111827" },
  segmentTarget: { color: "#9CA3AF" },
  healthNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 8,
    padding: 10,
    flexWrap: "wrap",
  },
  healthCheckBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  healthNoteText: {
    fontSize: 12,
    color: "#065F46",
    fontWeight: "500",
    flex: 1,
  },
});
