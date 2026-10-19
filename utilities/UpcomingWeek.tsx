import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../RecipeCard';
import { RecipeDetail } from '../RecipeDetailScreen';
import { useAuth } from '../AuthContext';
import { darkColors, homeStyles } from '../assets/recipes/styles/HomeStyles';
import { PlanDay, clearMeal, fetchSaved, fetchWeek, setMeal } from '../data/MealPlan';

const brokenImage = require('../assets/broken-image.png');

type Props = {
  onOpenRecipe: (recipe: RecipeDetail) => void;
  onViewAll?: () => void;
};

// Only a week out, maybe do month for paid users (just an idea)
export default function UpcomingWeek({ onOpenRecipe, onViewAll }: Props) {
  const { session } = useAuth();
  const [days, setDays] = useState<PlanDay[]>([]);
  const [saved, setSaved] = useState<RecipeDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [pickingDate, setPickingDate] = useState<string | null>(null);

  const fail = (e: unknown) => Alert.alert('Error', e instanceof Error ? e.message : String(e));

  const load = useCallback(async () => {
    try {
      setDays(await fetchWeek());
    } catch (e) {
      fail(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateDay = (date: string, recipe: RecipeDetail | null) =>
    setDays((prev) => prev.map((d) => (d.date === date ? { ...d, recipe } : d)));

  const openPicker = async (date: string) => {
    setPickingDate(date);
    setLoadingSaved(true);
    try {
      setSaved(await fetchSaved());
    } catch (e) {
      fail(e);
    } finally {
      setLoadingSaved(false);
    }
  };

  const pick = async (recipe: RecipeDetail) => {
    if (!pickingDate || !session) return;
    const date = pickingDate;
    setPickingDate(null);
    updateDay(date, recipe);
    try {
      await setMeal(session.user.id, date, recipe.id);
    } catch (e) {
      fail(e);
      load();
    }
  };

  const remove = async () => {
    if (!pickingDate) return;
    const date = pickingDate;
    setPickingDate(null);
    updateDay(date, null);
    try {
      await clearMeal(date);
    } catch (e) {
      fail(e);
      load();
    }
  };

  if (loading) return <ActivityIndicator style={s.loader} color={darkColors.muted} />;

  const current = days.find((d) => d.date === pickingDate);
  const [today, ...upcoming] = days;

  const renderCard = (day: PlanDay) =>
    day.recipe ? (
      <RecipeCard
        recipe={day.recipe}
        onPress={() => onOpenRecipe(day.recipe!)}
        onLongPress={() => openPicker(day.date)}
      />
    ) : (
      <Pressable
        onPress={() => openPicker(day.date)}
        accessibilityRole="button"
        accessibilityLabel={`Add a meal for ${day.label}`}
        style={({ pressed }) => [homeStyles.card, s.emptyCard, pressed && homeStyles.cardPressed]}
      >
        <Ionicons name="add" size={28} color={darkColors.muted} />
        <Text style={s.emptyText}>Add meal</Text>
      </Pressable>
    );

  return (
    <>
      <View style={homeStyles.sectionHeader}>
        <Text style={homeStyles.sectionTitle}>Today's Pick</Text>
      </View>
      <View style={homeStyles.cardRow}>{today && renderCard(today)}</View>

      <View style={homeStyles.sectionHeader}>
        <Text style={homeStyles.sectionTitle}>Upcoming Meals</Text>
        {onViewAll && (
          <Pressable onPress={onViewAll}>
            <Text style={homeStyles.sectionAction}>View all</Text>
          </Pressable>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={homeStyles.cardRow}
      >
        {upcoming.map((day) => (
          <View key={day.date}>
            <Text style={s.dayLabel}>
              {day.label} <Text style={s.dayNum}>{day.dayNum}</Text>
            </Text>
            {renderCard(day)}
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={!!pickingDate}
        transparent
        animationType="slide"
        onRequestClose={() => setPickingDate(null)}
      >
        <Pressable style={homeStyles.commentsOverlay} onPress={() => setPickingDate(null)}>
          <Pressable style={homeStyles.commentsSheet} onPress={() => {}}>
            <View style={homeStyles.commentsHandle} />
            <View style={homeStyles.commentsHeaderRow}>
              <Text style={homeStyles.commentsTitle}>
                {current ? `${current.label} ${current.dayNum}` : 'Pick a meal'}
              </Text>
              <View style={s.headerActions}>
                {current?.recipe && (
                  <Pressable onPress={remove} style={s.removeButton}>
                    <Text style={s.removeText}>Remove</Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => setPickingDate(null)}
                  accessibilityLabel="Close"
                  style={homeStyles.commentsCloseButton}
                >
                  <Ionicons name="close" size={16} color={darkColors.text} />
                </Pressable>
              </View>
            </View>

            {loadingSaved ? (
              <ActivityIndicator style={s.loader} color={darkColors.muted} />
            ) : (
              <FlatList
                data={saved}
                keyExtractor={(r) => r.id}
                contentContainerStyle={homeStyles.commentsList}
                ListEmptyComponent={
                  <Text style={s.emptyList}>No saved recipes yet.</Text>
                }
                renderItem={({ item }) => {
                  const selected = current?.recipe?.id === item.id;
                  return (
                    <Pressable
                      onPress={() => pick(item)}
                      style={({ pressed }) => [s.row, pressed && homeStyles.cardPressed]}
                    >
                      <Image source={item.image ?? brokenImage} style={s.thumb} />
                      <View style={s.rowBody}>
                        <Text style={s.rowTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={s.rowAuthor} numberOfLines={1}>{item.author}</Text>
                      </View>
                      {selected && (
                        <Ionicons name="checkmark-circle" size={22} color={darkColors.accent} />
                      )}
                    </Pressable>
                  );
                }}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  loader: { paddingVertical: 40 },
  dayLabel: { fontSize: 13, fontWeight: '600', color: darkColors.muted, marginBottom: 6 },
  dayNum: { color: darkColors.text },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: darkColors.border,
    backgroundColor: 'transparent',
  },
  emptyText: { marginTop: 6, fontSize: 13, fontWeight: '600', color: darkColors.muted },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  removeButton: { marginRight: 12 },
  removeText: { fontSize: 13, fontWeight: '600', color: darkColors.accent },
  emptyList: { color: darkColors.muted, textAlign: 'center', marginTop: 32 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  thumb: { width: 48, height: 48, borderRadius: 10, backgroundColor: darkColors.cardAlt, marginRight: 12 },
  rowBody: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: '600', color: darkColors.text },
  rowAuthor: { fontSize: 12, color: darkColors.muted, marginTop: 2 },
});
