import React from "react";
import { StyleSheet, View } from "react-native";
import { StrategicHeader } from "./StrategicHeader";
import { StrategicInsights } from "./StrategicInsights";
import { StrategicTier1 } from "./StrategicTier1";
import { StrategicTier2 } from "./StrategicTier2";
import { StrategicTier3 } from "./StrategicTier3";

export function StrategicDashboard() {
  return (
    <View style={styles.container}>
      <StrategicHeader />
      <StrategicTier1 />
      <StrategicTier2 />
      <StrategicTier3 />
      <StrategicInsights />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
