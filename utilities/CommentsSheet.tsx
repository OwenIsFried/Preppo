import { Alert, FlatList, Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { darkColors, homeStyles as styles } from '../assets/recipes/styles/HomeStyles';
import { ReelPost, sampleComments } from '../data/CommunityPosts';

type Props = {
  post: ReelPost | null;
  onClose: () => void;
};

// COMMENT BASE
export default function CommentsSheet({ post, onClose }: Props) {
  return (
    <Modal visible={!!post} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.commentsOverlay} onPress={onClose}>
        <Pressable style={styles.commentsSheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.commentsHandle} />
          <View style={styles.commentsHeaderRow}>
            <Text style={styles.commentsTitle}>
              {post ? `${post.comments} comments` : 'Comments'}
            </Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close comments"
              style={styles.commentsCloseButton}
            >
              <Ionicons name="close" size={16} color={darkColors.text} />
            </Pressable>
          </View>

          <FlatList
            data={sampleComments}
            keyExtractor={(c) => c.id}
            contentContainerStyle={styles.commentsList}
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                <View style={styles.commentAvatar}>
                  <Ionicons name="person" size={14} color={darkColors.text} />
                </View>
                <View style={styles.commentBody}>
                  <Text style={styles.commentUsername}>{item.username}</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              </View>
            )}
          />

          <View style={styles.commentInputBar}>
            <Text style={styles.commentInputPlaceholder}>Add a comment…</Text>
            <Pressable
              onPress={() => Alert.alert('Coming soon', 'Posting comments isn’t built yet.')}
              style={styles.commentSendButton}
            >
              <Ionicons name="send" size={16} color={darkColors.accent} />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}