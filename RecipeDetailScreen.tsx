import { useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { detailStyles as styles } from './assets/recipes/styles/RecipeDetailStyles';

export type Ingredient = {
  id: string;
  name: string;
  amount: number;
  unit?: string;
};


function formatAmount(value: number): string {
  const quarters = Math.round(value * 4);
  const whole = Math.floor(quarters / 4);
  const remainder = quarters % 4;
  const fractionText = { 1: '¼', 2: '½', 3: '¾' }[remainder] ?? '';

  if (whole === 0 && fractionText) return fractionText;
  if (!fractionText) return `${whole}`;
  return `${whole} ${fractionText}`;
}

export type RecipeDetail = {
  id: string;
  title: string;
  author: string;
  servings: number;
  minutes: number;
  calories: number;
  rating: number; // out of 5
  ingredients: Ingredient[];
  directions: string[];
  image?: ImageSourcePropType;
};

type Props = {
  recipe: RecipeDetail;
  onClose: () => void;
};

const brokenImage = require('./assets/broken-image.png');

export default function RecipeDetailScreen({ recipe, onClose }: Props) {
  const [tab, setTab] = useState<'ingredients' | 'directions'>('ingredients');
  const [servings, setServings] = useState(recipe.servings);
  const [favorited, setFavorited] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // recipe.servings is the base
  const scale = servings / recipe.servings;

  const toggleIngredient = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const addToList = () => Alert.alert('Added', 'Ingredients added to your list.');

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        {/* RECIPE HEADER */}
        <View style={styles.hero}>
          <Image source={recipe.image ?? brokenImage} style={styles.heroImage} resizeMode="cover" />
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close recipe"
            style={[styles.roundButton, styles.closeButton]}
          >
            <Text style={styles.roundButtonText}>✕</Text>
          </Pressable>
          <Pressable
            onPress={() => setFavorited((f) => !f)}
            accessibilityRole="button"
            accessibilityLabel={favorited ? 'Remove from favorites' : 'Add to favorites'}
            style={[styles.roundButton, styles.favoriteButton]}
          >
            <Text style={styles.roundButtonText}>{favorited ? '♥' : '♡'}</Text>
          </Pressable>
        </View>

        {/* RECIPE INFO */}
        <View style={styles.sheet}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.author}>{recipe.author}</Text>

          <View style={styles.statsRow}>
            <View style={styles.servingsControl}>
              <Pressable
                onPress={() => setServings((s) => Math.max(1, s - 1))}
                accessibilityRole="button"
                accessibilityLabel="Decrease servings"
                style={styles.servingsButton}
              >
                <Text style={styles.servingsButtonText}>−</Text>
              </Pressable>
              <Text style={styles.servingsText}>{servings} servings</Text>
              <Pressable
                onPress={() => setServings((s) => s + 1)}
                accessibilityRole="button"
                accessibilityLabel="Increase servings"
                style={styles.servingsButton}
              >
                <Text style={styles.servingsButtonText}>+</Text>
              </Pressable>
            </View>

            <View style={styles.badgeGroup}>
              <View style={styles.badge}>
                <Text style={styles.badgeIcon}>⏱</Text>
                <Text style={styles.badgeText}>{recipe.minutes}m</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeIcon}>🔥</Text>
                <Text style={styles.badgeText}>{recipe.calories}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeIcon}>★</Text>
                <Text style={styles.badgeText}>{recipe.rating}/5</Text>
              </View>
            </View>
          </View>

          <View style={styles.tabRow}>
            <Pressable
              onPress={() => setTab('ingredients')}
              style={[styles.tab, tab === 'ingredients' && styles.tabActive]}
            >
              <Text style={[styles.tabText, tab === 'ingredients' && styles.tabTextActive]}>
                Ingredients
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab('directions')}
              style={[styles.tab, tab === 'directions' && styles.tabActive]}
            >
              <Text style={[styles.tabText, tab === 'directions' && styles.tabTextActive]}>
                Directions
              </Text>
            </Pressable>
          </View>

          {tab === 'ingredients' ? (
            <View style={styles.listContent}>
              {recipe.ingredients.map((item) => {
                const isChecked = !!checked[item.id];
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => toggleIngredient(item.id)}
                    style={styles.ingredientRow}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isChecked }}
                  >
                    <Text style={styles.ingredientHandle}>≡</Text>
                    <Text style={styles.ingredientName}>{item.name}</Text>
                    <Text style={styles.ingredientAmount}>
                      {formatAmount(item.amount * scale)}
                      {item.unit ? ` ${item.unit}` : ''}
                    </Text>
                    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                      {isChecked && <Text style={styles.checkboxMark}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <View style={styles.listContent}>
              {recipe.directions.map((step, i) => (
                <View key={i} style={styles.directionStep}>
                  <Text style={styles.directionNumber}>{i + 1}</Text>
                  <Text style={styles.directionText}>{step}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={addToList}
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
        >
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Add to List</Text>
        </Pressable>
      </View>
    </View>
  );
}