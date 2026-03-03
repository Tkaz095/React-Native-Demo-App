import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StrategicDashboard } from "../components/StrategicDashboard";

export default function StrategicDashboardPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StrategicDashboard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
});
