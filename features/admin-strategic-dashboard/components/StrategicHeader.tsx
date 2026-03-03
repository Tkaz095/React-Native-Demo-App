import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { StrategicFilterModal } from "./StrategicFilterModal";

const now = new Date();
const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;




export function StrategicHeader() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StrategicFilterModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onApply={() => setModalVisible(false)}
      />

      <View style={styles.topControls}>
        <TouchableOpacity
          style={styles.newFilterBtn}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="options-outline" size={18} color="#111827" />
          <Text style={styles.newFilterBtnText}>Bộ lọc kết quả</Text>
        </TouchableOpacity>

        <View style={styles.timestampRow}>
          <Ionicons name="time-outline" size={13} color="#6B7280" />
          <Text style={styles.timestampText}>
            Cập nhật lúc: <Text style={styles.timestampBold}>{formattedTime}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  topControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  newFilterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  newFilterBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  timestampRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timestampText: {
    fontSize: 12,
    color: "#6B7280",
  },
  timestampBold: {
    fontWeight: "600",
    color: "#4B5563",
  },
});
