import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './Supabase';
import { darkColors, homeStyles as styles } from './assets/recipes/styles/HomeStyles';
import RecipeDetailScreen, { RecipeDetail } from './RecipeDetailScreen';
import CommunityPost from './utilities/CommunityPost';
import CommentsSheet from './utilities/CommentsSheet';
import BottomTabBar, { TabKey } from './utilities/BottomTabber';
import UpcomingWeek from './utilities/UpcomingWeek';
import { ReelPost, makePost, INITIAL_POST_COUNT, PAGE_SIZE } from './data/CommunityPosts';

export default function HomeScreen() {
  const [openRecipe, setOpenRecipe] = useState<RecipeDetail | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [posts, setPosts] = useState<ReelPost[]>(() =>
    Array.from({ length: INITIAL_POST_COUNT }, (_, i) => makePost(i))
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [openCommentsFor, setOpenCommentsFor] = useState<ReelPost | null>(null);
  const nextIndex = useRef(INITIAL_POST_COUNT);
  const listRef = useRef<FlatList<ReelPost>>(null);

  const openProfile = () =>
    Alert.alert('Profile', 'Profile screen goes here.', [
      { text: 'Sign out', style: 'destructive', onPress: () => supabase.auth.signOut() },
      { text: 'Close', style: 'cancel' },
    ]);

  const selectTab = (tab: TabKey) => {
    if (tab === 'home') {
      setActiveTab('home');
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
      return;
    }
    setActiveTab(tab);
    if (tab === 'profile') {
      openProfile();
      setActiveTab('home');
      return;
    }
    Alert.alert('Coming soon', 'This section isn’t built yet.');
    setActiveTab('home');
  };

  // INFINITE POSTS - This is temp
  const loadMorePosts = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const start = nextIndex.current;
      const nextPosts = Array.from({ length: PAGE_SIZE }, (_, i) => makePost(start + i));
      nextIndex.current = start + PAGE_SIZE;
      setPosts((prev) => [...prev, ...nextPosts]);
      setLoadingMore(false);
    }, 500);
  }, [loadingMore]);

  const toggleDescription = (id: string) =>
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderPost = useCallback(
    ({ item }: { item: ReelPost }) => (
      <CommunityPost
        post={item}
        expanded={!!expandedIds[item.id]}
        onToggleDescription={() => toggleDescription(item.id)}
        onOpenComments={() => setOpenCommentsFor(item)}
      />
    ),
    [expandedIds]
  );

  const ListHeader = (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={18} color={darkColors.text} />
          </View>
          <Text style={styles.headerTitle}>Today</Text>
        </View>
        <Pressable
          onPress={openProfile}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          style={styles.menuButton}
        >
          <Ionicons name="ellipsis-horizontal" size={18} color={darkColors.text} />
        </Pressable>
      </View>

      <UpcomingWeek
        onOpenRecipe={setOpenRecipe}
        onViewAll={() => Alert.alert('Upcoming', 'This will open up the calendar.')}
      />

      <View style={styles.reelsHeader}>
        <Text style={styles.sectionTitle}>Community</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <FlatList
        ref={listRef}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.feedFooter}>
              <ActivityIndicator color={darkColors.muted} />
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />

      <BottomTabBar activeTab={activeTab} onSelect={selectTab} />

      <CommentsSheet post={openCommentsFor} onClose={() => setOpenCommentsFor(null)} />

      <Modal
        visible={!!openRecipe}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setOpenRecipe(null)}
      >
        {openRecipe && (
          <RecipeDetailScreen recipe={openRecipe} onClose={() => setOpenRecipe(null)} />
        )}
      </Modal>
    </SafeAreaView>
  );
}