import React from "react";
import { StyleSheet, View } from "react-native";
import { PostApprovalCenter } from "../components/PostApprovalCenter";

export default function PostsPage() {
  return (
    <View style={styles.container}>
      <PostApprovalCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
