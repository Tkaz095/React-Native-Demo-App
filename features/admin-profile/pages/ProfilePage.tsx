import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { EditProfileModal } from "../components/EditProfileModal";
import { ProfileDetails } from "../components/ProfileDetails";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ADMIN_PROFILE_MOCK, AdminProfile } from "../data/admin-profile.data";

export default function ProfilePage() {
  const [profile, setProfile] = useState(ADMIN_PROFILE_MOCK);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const handleSaveProfile = (updatedData: AdminProfile) => {
    setProfile(updatedData);
    setIsEditModalVisible(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.layout}>
        {/* Trên mobile sẽ hiển thị Sidebar trước, rồi Details dưới */}
        <ProfileSidebar
          profile={profile}
          onEditPress={() => setIsEditModalVisible(true)}
        />
        <ProfileDetails
          profile={profile}
          onChangePasswordPress={() => setIsPasswordModalVisible(true)}
        />
      </View>

      <EditProfileModal
        visible={isEditModalVisible}
        profile={profile}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        visible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
      />
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
    paddingBottom: 40,
  },
  layout: {
    flexDirection: "column",
    gap: 16,
  },
});
