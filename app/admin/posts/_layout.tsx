import { PostsProvider } from "@/features/admin-posts/contexts/PostsContext";
import { Stack } from "expo-router";

export default function PostsLayout() {
    return (
        <PostsProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="[id]/index" />
            </Stack>
        </PostsProvider>
    );
}
