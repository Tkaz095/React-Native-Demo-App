import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { usePosts } from "../contexts/PostsContext";
import { PostApprovalList } from "./PostApprovalList";
import { PostFilterState, PostsFilterBar } from "./PostsFilterBar";

export function PostApprovalCenter() {
  const { posts } = usePosts();
  const [filters, setFilters] = useState<PostFilterState>({
    query: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
  });

  const parseDate = (dString: string) => {
    const parts = (dString ?? "").split("/");
    if (parts.length === 3) {
      return new Date(
        Number(parts[2]),
        Number(parts[1]) - 1,
        Number(parts[0]),
      ).getTime();
    }
    return 0;
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // 1. Lọc theo search
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !post.title.toLowerCase().includes(q) &&
          !post.company.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      // 2. Lọc theo trạng thái
      if (filters.status !== "all" && post.status !== filters.status) {
        return false;
      }

      // 3. Lọc theo ngày
      if (filters.dateFrom || filters.dateTo) {
        const postDate = parseDate(post.createdDate ?? "");
        if (!postDate) return false;

        if (filters.dateFrom) {
          const parts = filters.dateFrom.split("/");
          const from =
            parts.length === 3
              ? new Date(
                  Number(parts[2]),
                  Number(parts[1]) - 1,
                  Number(parts[0]),
                ).getTime()
              : new Date(filters.dateFrom).getTime();
          if (postDate < from) return false;
        }
        if (filters.dateTo) {
          const parts = filters.dateTo.split("/");
          const to =
            parts.length === 3
              ? new Date(
                  Number(parts[2]),
                  Number(parts[1]) - 1,
                  Number(parts[0]),
                ).getTime()
              : new Date(filters.dateTo).getTime();
          if (postDate > to + 86400000) return false;
        }
      }

      return true;
    });
  }, [filters, posts]);

  return (
    <View style={styles.container}>
      <View style={styles.filterWrapper}>
        <PostsFilterBar filters={filters} onFilterChange={setFilters} />
      </View>
      <View style={styles.listWrapper}>
        <PostApprovalList initialPosts={filteredPosts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterWrapper: {
    marginBottom: 12,
  },
  listWrapper: {
    flex: 1,
  },
});
