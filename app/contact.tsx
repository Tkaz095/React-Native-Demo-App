import DrawerMenu from "@/components/DrawerMenu";
import { LandingHeader } from "@/components/LandingHeader";
import { useLandingAuth } from "@/hooks/useLandingAuth";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
   Alert,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";

const CONTACT_INFO = [
  {
    icon: "map-pin" as const,
    iconBg: "#EFF6FF",
    iconColor: "#1976D2",
    label: "Văn phòng chính",
    value: "Tầng 12, Bitexco, Q.1, TP.HCM",
  },
  {
    icon: "phone" as const,
    iconBg: "#F0FDF4",
    iconColor: "#16A34A",
    label: "Hotline hỗ trợ",
    value: "1900 6789 - (028) 3822 1234",
  },
  {
    icon: "mail" as const,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    label: "Email liên hệ",
    value: "contact@hoidoanhnghiep.vn",
  },
];

export default function ContactPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { openLogin, openRegister, AuthModalComponent } = useLandingAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      Alert.alert(
        "Thiếu thông tin",
        "Vui lòng điền đầy đủ các trường bắt buộc (*).",
      );
      return;
    }
    Alert.alert(
      "Gửi thành công!",
      "Chúng tôi đã nhận được lời nhắn và sẽ phản hồi trong 24 giờ.",
      [
        {
          text: "OK",
          onPress: () =>
            setForm({ name: "", phone: "", email: "", message: "" }),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <LandingHeader onMenuPress={() => setShowDrawer(true)} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.body}>
            {/* Compact Title */}
            <View style={styles.titleBlock}>
              <Text style={styles.mainTitle}>Liên Hệ Với Chúng Tôi</Text>
              <Text style={styles.description}>
                Cần hỗ trợ? Liên hệ với Ban thư ký Hội Doanh Nghiệp.
              </Text>
            </View>

            {/* Contact Info Cards — compact */}
            <View style={styles.infoCards}>
              {CONTACT_INFO.map((item) => (
                <View key={item.label} style={styles.infoCard}>
                  <View
                    style={[styles.infoIcon, { backgroundColor: item.iconBg }]}
                  >
                    <Feather
                      name={item.icon}
                      size={16}
                      color={item.iconColor}
                    />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoLabel}>{item.label}</Text>
                    <Text style={styles.infoValue}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Contact Form */}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Họ và tên *"
                placeholderTextColor="#9CA3AF"
                value={form.name}
                onChangeText={(v) => setForm((p) => ({ ...p, name: v }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại *"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(v) => setForm((p) => ({ ...p, phone: v }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Địa chỉ Email *"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(v) => setForm((p) => ({ ...p, email: v }))}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Lời nhắn của bạn..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={form.message}
                onChangeText={(v) => setForm((p) => ({ ...p, message: v }))}
              />
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.85}
                onPress={handleSubmit}
              >
                <Text style={styles.submitText}>Gửi lời nhắn ngay</Text>
                <Feather name="send" size={15} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DrawerMenu
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        onLogin={() => {
          setShowDrawer(false);
          setTimeout(openLogin, 200);
        }}
        onRegister={() => {
          setShowDrawer(false);
          setTimeout(openRegister, 200);
        }}
      />
      {AuthModalComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 20 },

  body: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 12,
  },

  // Compact title block
  titleBlock: {
    gap: 4,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0d1b2a",
    lineHeight: 28,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  // Contact info
  infoCards: {
    gap: 8,
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 17,
  },

  // Form
  form: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: "#1E293B",
    backgroundColor: "#FAFAFA",
  },
  textArea: {
    height: 72,
    paddingTop: 10,
  },
  submitButton: {
    backgroundColor: "#1976D2",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFF",
  },
});
