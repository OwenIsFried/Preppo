import { Alert, Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { darkColors, homeStyles as styles } from '../assets/recipes/styles/HomeStyles';
import { ReelPost } from '../data/CommunityPosts';

const brokenImage = require('../assets/broken-image.png');

type Props = {
  post: ReelPost;
  expanded: boolean;
  onToggleDescription: () => void;
  onOpenComments: () => void;
};

export default function CommunityPost({ post, expanded, onToggleDescription, onOpenComments }: Props) {
  return (
    <View style={styles.reelItem}>
      <View style={[styles.cardImageArea, { flex: 1 }]}>
        <Image source={brokenImage} style={styles.reelImage} resizeMode="contain" />
      </View>

      {/* POST TOP BAR (USERNAME & DATE) */}
      <View style={styles.reelTopBar}>
        <View style={styles.reelUserPill}>
          <View style={styles.reelAvatar}>
            <Ionicons name="person" size={12} color={darkColors.text} />
          </View>
          <Text style={styles.reelUsername}>{post.username}</Text>
        </View>
        <View style={styles.reelDatePill}>
          <Text style={styles.reelDateText}>{post.postedAt}</Text>
        </View>
      </View>

      {/* POST SIDEBAR (HEART, COMMENT, SAVE) */}
      <View style={styles.reelActionRail}>
        <Pressable
          onPress={() => Alert.alert('Coming soon', 'Liking posts isn’t built yet.')}
          style={styles.reelActionButton}
        >
          <Ionicons name="heart-outline" size={24} color={darkColors.text} />
          <Text style={styles.reelActionCount}>{post.hearts}</Text>
        </Pressable>
        <Pressable onPress={onOpenComments} style={styles.reelActionButton}>
          <Ionicons name="chatbubble-outline" size={22} color={darkColors.text} />
          <Text style={styles.reelActionCount}>{post.comments}</Text>
        </Pressable>
        <Pressable
          onPress={() => Alert.alert('Coming soon', 'Saving posts isn’t built yet.')}
          style={styles.reelActionButton}
        >
          <Ionicons name="bookmark-outline" size={22} color={darkColors.text} />
          <Text style={styles.reelActionCount}>{post.saves}</Text>
        </Pressable>
      </View>

      {/* POST DESCRIPTION */}
      <View style={styles.reelBottomBar}>
        <Pressable onPress={onToggleDescription}>
          <Text style={styles.reelDescriptionText} numberOfLines={expanded ? undefined : 2}>
            {post.description}
          </Text>
          <Text style={styles.reelMoreText}>{expanded ? 'less' : 'more'}</Text>
        </Pressable>
      </View>
    </View>
  );
}