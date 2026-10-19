import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { supabase } from './Supabase';
import { styles } from './assets/recipes/styles/AuthStyles';
import { darkColors } from './assets/recipes/styles/HomeStyles';

export default function AuthScreen() {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === 'signUp';

  const submit = async () => {
    if (!email || !password || (isSignUp && !displayName.trim())) {
      Alert.alert(
        'Missing info',
        isSignUp ? 'Enter a username, email, and password.' : 'Enter an email and password.'
      );
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Check both password fields and try again.');
      return;
    }

    setLoading(true);
    const { error } = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName.trim() } },
        })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert(isSignUp ? 'Sign up failed' : 'Sign in failed', error.message);
      return;
    }

    if (isSignUp) {
      Alert.alert('Check your email', 'Confirm your address, then sign in.');
      setMode('signIn');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{isSignUp ? 'Create account' : 'Welcome back'}</Text>
        <Text style={styles.subtitle}>
          {isSignUp ? 'Sign up to start planning meals.' : 'Sign in to see your recipes.'}
        </Text>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={darkColors.muted}
            autoCapitalize="words"
            autoComplete="name"
            value={displayName}
            onChangeText={setDisplayName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={darkColors.muted}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={darkColors.muted}
          secureTextEntry
          autoCapitalize="none"
          autoComplete={isSignUp ? 'password-new' : 'password'}
          value={password}
          onChangeText={setPassword}
        />

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={darkColors.muted}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password-new"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}

        <Pressable
          onPress={submit}
          disabled={loading}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>{isSignUp ? 'Sign up' : 'Sign in'}</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setMode(isSignUp ? 'signIn' : 'signUp');
            setConfirmPassword('');
          }}
        >
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <Text style={styles.switchTextBold}>{isSignUp ? 'Sign in' : 'Sign up'}</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}