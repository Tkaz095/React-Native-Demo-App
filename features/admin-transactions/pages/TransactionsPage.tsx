import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EventFeesTab } from "../components/EventFeesTab";
import { MembershipFeesTab } from "../components/MembershipFeesTab";
import { TransactionsTab } from "../components/TransactionsTab";

const TABS = [
  { key: "giao-dich", label: "Giao dịch" },
  { key: "phi-hoi-vien", label: "Phí hội viên" },
  { key: "phi-su-kien", label: "Phí sự kiện" },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("giao-dich");

  return (
    <View style={styles.container}>
      {/* Tab Bar — giống EventsPage */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === "giao-dich" && <TransactionsTab />}
        {activeTab === "phi-hoi-vien" && <MembershipFeesTab />}
        {activeTab === "phi-su-kien" && <EventFeesTab />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: "#1976D2",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#1976D2",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
});
