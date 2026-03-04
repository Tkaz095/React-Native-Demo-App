import DrawerMenu from "@/components/DrawerMenu";
import { LandingHeader } from "@/components/LandingHeader";
import { useLandingAuth } from "@/hooks/useLandingAuth";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const NEWS_ITEMS = [
  {
    id: "1",
    image: require("@/assets/images/DN.jpg"),
    featured: true,
    date: "05/02/2026",
    author: "Ban Truyền Thông",
    title: "Diễn đàn Doanh nghiệp 2026: Chuyển đổi số là chìa khóa vàng",
    excerpt:
      "Tại diễn đàn, các chuyên gia đã thảo luận về vai trò của công nghệ AI và Blockchain trong việc tối ưu hóa quy trình sản xuất.",
  },
  {
    id: "2",
    image: require("@/assets/images/DN02.jpg"),
    featured: true,
    date: "28/01/2026",
    author: "Ban Sự Kiện",
    title: "Lễ ký kết hợp tác chiến lược với 12 doanh nghiệp đối tác mới",
    excerpt:
      "Hội Doanh Nghiệp chính thức mở rộng mạng lưới đối tác, kết nối thêm hàng trăm cơ hội kinh doanh cho hội viên.",
  },
  {
    id: "3",
    image: require("@/assets/images/doanhNghiep.jpg"),
    featured: false,
    date: "20/01/2026",
    author: "Phòng Đào Tạo",
    title:
      "Workshop thực chiến: Xây dựng thương hiệu cá nhân trong thời đại số",
    excerpt:
      "Hơn 200 doanh nhân tham dự buổi workshop chuyên sâu với các bài thực hành và case study thực tế.",
  },
];

export default function NewsPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const { openLogin, openRegister, AuthModalComponent } = useLandingAuth();

  return (
    <View style={styles.container}>
      <LandingHeader onMenuPress={() => setShowDrawer(true)} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.mainTitle}>Tin Tức & Sự Kiện</Text>
          <Text style={styles.description}>
            Cập nhật những thông tin mới nhất về thị trường, chính sách và các
            hoạt động của Hội.
          </Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            activeOpacity={0.7}
            onPress={() => Alert.alert("Danh sách", "Đang phát triển...")}
          >
            <Text style={styles.viewAllText}>Xem tất cả bài viết</Text>
          </TouchableOpacity>
        </View>

        {/* News Cards */}
        <View style={styles.newsList}>
          {NEWS_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => Alert.alert("Bài viết", item.title)}
            >
              {/* Image */}
              <View style={styles.imageWrap}>
                <Image
                  source={item.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                {item.featured && (
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredText}>TIN NỔI BẬT</Text>
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={styles.cardBody}>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <MaterialIcons
                      name="calendar-today"
                      size={12}
                      color="#9CA3AF"
                    />
                    <Text style={styles.metaText}>{item.date}</Text>
                  </View>
                  <View style={styles.metaDot} />
                  <View style={styles.metaItem}>
                    <MaterialIcons
                      name="person-outline"
                      size={12}
                      color="#9CA3AF"
                    />
                    <Text style={styles.metaText}>{item.author}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardExcerpt} numberOfLines={3}>
                  {item.excerpt}
                </Text>
                <View style={styles.readMore}>
                  <Text style={styles.readMoreText}>Đọc tiếp</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={14}
                    color="#1976D2"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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

  pageHeader: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0d1b2a",
    marginBottom: 10,
    lineHeight: 36,
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 20,
  },
  viewAllButton: {
    borderWidth: 1.5,
    borderColor: "#1976D2",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976D2",
  },

  newsList: {
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  imageWrap: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  featuredBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#1976D2",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  featuredText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  cardBody: {
    padding: 20,
    gap: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0d1b2a",
    lineHeight: 26,
  },
  cardExcerpt: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1976D2",
  },
});
