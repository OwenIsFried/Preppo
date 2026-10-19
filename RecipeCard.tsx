import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { darkColors, homeStyles as styles } from './assets/recipes/styles/HomeStyles';
import { RecipeDetail } from './RecipeDetailScreen';

const brokenImage = require('./assets/broken-image.png');

type Props = {
  recipe: RecipeDetail;
  onPress: () => void;
  onLongPress?: () => void;
};

export default function RecipeCard({ recipe, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={300}
      accessibilityRole="button"
      accessibilityLabel={`Open ${recipe.title} by ${recipe.author}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardImageArea}>
        <Image source={recipe.image ?? brokenImage} style={styles.cardImage} resizeMode="cover" />
      </View>
      <View style={styles.cardOverlay}>
        <View style={styles.cardAuthorRow}>
          <View style={styles.cardAvatar}>
            <Ionicons name="person" size={9} color={darkColors.text} />
          </View>
          <Text style={styles.cardAuthor} numberOfLines={1}>
            {recipe.author}
          </Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {recipe.title}
        </Text>
      </View>
    </Pressable>
  );
}