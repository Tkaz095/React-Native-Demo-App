import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventFeesTab } from "../components/EventFeesTab";
import { MembershipFeesTab } from "../components/MembershipFeesTab";
import { TransactionsTab } from "../components/TransactionsTab";

const TABS = [
  { key: "giao-dich", label: "Giao dịch", icon: "swap-horizontal-outline" as const },
  { key: "phi-hoi-vien", label: "Phí hội viên", icon: "people-outline" as const },
  { key: "phi-su-kien", label: "Phí sự kiện", icon: "calendar-outline" as const },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("giao-dich");
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const tabScrollRef = useRef<ScrollView>(null);

  const handleTabChange = (key: TabKey, index: number) => {
    setActiveTab(key);
    Animated.spring(indicatorAnim, {
      toValue: index,
      useNativeDriver: false,
      speed: 20,
      bounciness: 2,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Page header */}
      <View style={styles.pageHeader}>
        <View style={styles.headerTitleRow}>
          <View style={styles.headerIcon}>
            <Ionicons name="receipt-outline" size={20} color="#F59E0B" />
          </View>
          <View>
            <Text style={styles.pageTitle}>Quản lý Giao dịch</Text>
            <Text style={styles.pageSubtitle}>Theo dõi toàn bộ giao dịch tài chính</Text>
          </View>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBarContainer}>
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
          {TABS.map((tab, index) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => handleTabChange(tab.key, index)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={tab.icon}
                  size={16}
                  color={isActive ? "#1E293B" : "#94A3B8"}
                  style={styles.tabIcon}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.tabBorder} />
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === "giao-dich" && <TransactionsTab />}
        {activeTab === "phi-hoi-vien" && <MembershipFeesTab />}
        {activeTab === "phi-su-kien" && <EventFeesTab />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  pageHeader: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  pageSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 1,
  },
  tabBarContainer: {
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  tabBarContent: {
    paddingHorizontal: 16,
    gap: 0,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    position: "relative",
  },
  tabIcon: {
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#94A3B8",
  },
  tabLabelActive: {
    color: "#1E293B",
    fontWeight: "700",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: "#1E293B",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  tabBorder: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  tabContent: {
    flex: 1,
  },
});
