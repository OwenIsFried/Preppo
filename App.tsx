import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { AuthProvider, useAuth } from './AuthContext';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';
import { darkColors, homeStyles } from './assets/recipes/styles/HomeStyles';

function Root() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView style={homeStyles.safeArea}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={darkColors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return session ? <HomeScreen /> : <AuthScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}