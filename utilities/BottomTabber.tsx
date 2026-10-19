import { Pressable, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { darkColors, homeStyles as styles } from '../assets/recipes/styles/HomeStyles';

export type TabKey = 'home' | 'search' | 'saved' | 'favorites' | 'profile';

type Props = {
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
};

const tabs = [
  { key: 'home', icon: 'home', iconOutline: 'home-outline' },
  { key: 'search', icon: 'search', iconOutline: 'search-outline' },
  { key: 'saved', icon: 'bag', iconOutline: 'bag-outline' },
  { key: 'favorites', icon: 'heart', iconOutline: 'heart-outline' },
  { key: 'profile', icon: 'person', iconOutline: 'person-outline' },
] as const;

// NAV BAR
export default function BottomTabBar({ activeTab, onSelect }: Props) {
  return (
    <View style={styles.tabBarWrapper}>
      <BlurView intensity={55} tint="dark" style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onSelect(tab.key)}
              accessibilityRole="button"
              accessibilityLabel={tab.key}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
            >
              <Ionicons
                name={isActive ? tab.icon : tab.iconOutline}
                size={20}
                color={isActive ? '#FFFFFF' : darkColors.muted}
              />
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}