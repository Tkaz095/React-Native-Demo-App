import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    CONNECTION_RATE_MOCK,
    FUNNEL_MOCK,
    PERFORMANCE_SCORE_MOCK,
} from "../services/strategic-dashboard.mock";

// ─── Shared ─────────────────────────────────────────────────────────────────

function SectionLabel({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={shared.sectionLabel}>
      <View style={shared.sectionBar} />
      <Text style={shared.sectionTitle}>
        {title}
        {subtitle ? (
          <Text style={shared.sectionSubtitle}> {subtitle}</Text>
        ) : null}
      </Text>
    </View>
  );
}

function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <View style={[shared.card, style]}>{children}</View>;
}

function CardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <View style={shared.cardHeaderRow}>
      <Text style={shared.cardTitle}>{title}</Text>
      {description ? (
        <Ionicons name="information-circle-outline" size={16} color="#9CA3AF" />
      ) : null}
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
  color?: string;
}) {
  return (
    <View style={shared.progressTrack}>
      <View
        style={[
          shared.progressFill,
          {
            width: `${(value / max) * 100}%`,
            backgroundColor: color ?? "#1E3A5F",
          },
        ]}
      />
    </View>
  );
}

// ─── Card 1: Điểm Hoạt Động Hiệu Quả ────────────────────────────────────────

function PerformanceScoreCard() {
  const d = PERFORMANCE_SCORE_MOCK;
  return (
    <Card>
      <CardHeader title="Điểm Hoạt Động Hiệu Quả" description={d.description} />
      <View style={styles.bigValueRow}>
        <Text style={styles.bigValue}>{d.score}%</Text>
        <Text style={styles.bigValueSub}>
          ({d.score}/{d.maxScore})
        </Text>
        <TrendBadge trend={d.trend} up={d.trendUp} />
      </View>
      <View style={styles.categoryList}>
        {d.categories.map((cat) => (
          <View key={cat.label} style={styles.categoryItem}>
            <View style={styles.categoryLabelRow}>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categoryValue}>
                {Math.round((cat.value / cat.max) * 100)}%
                <Text style={styles.categoryValueSub}>
                  {" "}
                  ({cat.value}/{cat.max})
                </Text>
              </Text>
            </View>
            <ProgressBar value={cat.value} max={cat.max} color="#1E3A5F" />
          </View>
        ))}
      </View>
    </Card>
  );
}

// ─── Card 2: Tỷ Lệ Kết Nối Liên Thông ──────────────────────────────────────

function ConnectionRateCard() {
  const d = CONNECTION_RATE_MOCK;
  return (
    <Card>
      <CardHeader
        title="Tỷ Lệ Kết Nối Liên Thông"
        description={d.description}
      />
      <View style={styles.bigValueRow}>
        <Text style={styles.bigValue}>
          {d.rate}
          {d.unit}
        </Text>
        <Text style={styles.bigValueSub}>({d.rate}/100)</Text>
        <TrendBadge trend={d.trend} up={d.trendUp} />
      </View>
      <View style={styles.categoryList}>
        {d.connections.map((conn) => (
          <View key={conn.label} style={styles.categoryItem}>
            <View style={styles.categoryLabelRow}>
              <Text style={styles.categoryLabel}>{conn.label}</Text>
              <Text style={styles.categoryValue}>
                {conn.value}%
                <Text style={styles.categoryValueSub}> ({conn.value}/100)</Text>
              </Text>
            </View>
            <ProgressBar value={conn.value} max={100} color={conn.color} />
          </View>
        ))}
      </View>
    </Card>
  );
}

// ─── Card 3: Phễu Chuyển Đổi ─────────────────────────────────────────────────

function FunnelCard() {
  const d = FUNNEL_MOCK;
  const maxValue = d.steps[0].value;

  return (
    <Card>
      <CardHeader title={d.title} description={d.subtitle} />
      <View style={styles.funnelList}>
        {d.steps.map((step, idx) => (
          <View key={step.label}>
            <View style={styles.funnelRow}>
              <Text style={styles.funnelLabel}>{step.label}</Text>
              <View style={styles.funnelBarWrap}>
                <View
                  style={[
                    styles.funnelBar,
                    {
                      width: `${(step.value / maxValue) * 100}%`,
                      backgroundColor: step.color,
                    },
                  ]}
                >
                  <Text style={styles.funnelBarText}>
                    {step.value.toLocaleString()}
                  </Text>
                </View>
                {step.percent && (
                  <Text style={styles.funnelPercent}>({step.percent})</Text>
                )}
              </View>
            </View>
            {idx < d.steps.length - 1 && (
              <View style={styles.funnelArrowRow}>
                <Ionicons name="chevron-down" size={14} color="#D1D5DB" />
              </View>
            )}
          </View>
        ))}
      </View>
      <View style={styles.conversionNote}>
        <Text style={styles.conversionNoteText}>{d.conversionNote}</Text>
      </View>
    </Card>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function StrategicTier1() {
  return (
    <View style={styles.tier}>
      <SectionLabel
        title="TẦNG 1 – CHỈ SỐ DẪN DẮT"
        subtitle="(Quan trọng nhất)"
      />
      <View style={styles.cardList}>
        <PerformanceScoreCard />
        <ConnectionRateCard />
        <FunnelCard />
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
    marginRight: 8,
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
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#6B7280",
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
  cardList: { gap: 12 },
  bigValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    flexWrap: "wrap",
  },
  bigValue: { fontSize: 36, fontWeight: "800", color: "#111827" },
  bigValueSub: { fontSize: 15, color: "#9CA3AF", fontWeight: "500" },
  categoryList: { gap: 14 },
  categoryItem: { gap: 6 },
  categoryLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLabel: { fontSize: 13, color: "#6B7280", flex: 1 },
  categoryValue: { fontSize: 13, fontWeight: "600", color: "#111827" },
  categoryValueSub: { fontWeight: "400", color: "#9CA3AF" },
  funnelList: { gap: 2 },
  funnelRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  funnelLabel: { fontSize: 12, color: "#6B7280", width: 64 },
  funnelBarWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  funnelBar: {
    height: 32,
    borderRadius: 6,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
    minWidth: 40,
  },
  funnelBarText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
  funnelPercent: { fontSize: 12, color: "#6B7280", fontWeight: "500" },
  funnelArrowRow: { alignItems: "center", marginVertical: 1 },
  conversionNote: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 8,
    padding: 10,
  },
  conversionNoteText: {
    fontSize: 12,
    color: "#065F46",
    fontWeight: "500",
    textAlign: "center",
  },
});
