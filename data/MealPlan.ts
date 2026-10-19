import { supabase } from '../Supabase';
import { RecipeDetail } from '../RecipeDetailScreen';
import { resolveImageUrl } from './Storage';

type RecipeRow = {
  id: string;
  author_name: string;
  title: string;
  servings: number;
  minutes: number;
  calories: number | null;
  rating: number | null;
  image_url: string | null;
  ingredients: RecipeDetail['ingredients'] | null;
  directions: string[] | null;
};

export type PlanDay = {
  date: string; // YYYY-MM-DD (local)
  label: string; // "Today", "Mon", etc
  dayNum: number;
  recipe: RecipeDetail | null;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const pad = (n: number) => String(n).padStart(2, '0');
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const toRecipe = (r: RecipeRow): RecipeDetail => {
  const url = resolveImageUrl(r.image_url);
  return {
  id: r.id,
  title: r.title,
  author: r.author_name,
  servings: r.servings,
  minutes: r.minutes,
  calories: r.calories ?? 0,
  rating: Number(r.rating ?? 0),
  ingredients: r.ingredients ?? [],
  directions: r.directions ?? [],
  image: url ? { uri: url } : undefined,
  };
};

export function upcomingDates(count = 7): Omit<PlanDay, 'recipe'>[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    return { date: toISO(d), label: i === 0 ? 'Today' : WEEKDAYS[d.getDay()], dayNum: d.getDate() };
  });
}

export async function fetchWeek(): Promise<PlanDay[]> {
  const days = upcomingDates(8); // today + next 7
  const { data, error } = await supabase
    .from('meal_plans')
    .select('plan_date, recipe:recipes(*)')
    .gte('plan_date', days[0].date)
    .lte('plan_date', days[days.length - 1].date);
  if (error) throw error;

  const rows = data as unknown as { plan_date: string; recipe: RecipeRow }[];
  const byDate = new Map(rows.map((r) => [r.plan_date, toRecipe(r.recipe)]));
  return days.map((d) => ({ ...d, recipe: byDate.get(d.date) ?? null }));
}

export async function fetchSaved(): Promise<RecipeDetail[]> {
  const { data, error } = await supabase
    .from('saved_recipes')
    .select('recipe:recipes(*)')
    .order('saved_at', { ascending: false });
  if (error) throw error;
  return (data as unknown as { recipe: RecipeRow }[]).map((r) => toRecipe(r.recipe));
}

export async function setMeal(userId: string, date: string, recipeId: string) {
  const { error } = await supabase
    .from('meal_plans')
    .upsert(
      { user_id: userId, plan_date: date, recipe_id: recipeId },
      { onConflict: 'user_id,plan_date' }
    );
  if (error) throw error;
}

export async function clearMeal(date: string) {
  const { error } = await supabase.from('meal_plans').delete().eq('plan_date', date);
  if (error) throw error;
}
