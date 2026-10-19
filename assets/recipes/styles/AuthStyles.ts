import { StyleSheet } from 'react-native';
import { darkColors, homeStyles } from './HomeStyles';

export const styles = StyleSheet.create({
  safeArea: homeStyles.safeArea,
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: darkColors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: darkColors.muted,
    marginBottom: 28,
  },
  input: {
    backgroundColor: darkColors.card,
    borderWidth: 1,
    borderColor: darkColors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: darkColors.text,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: darkColors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonPressed: {
    backgroundColor: darkColors.accentPressed,
  },
  primaryButtonText: {
    color: darkColors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: darkColors.muted,
  },
  switchTextBold: {
    color: darkColors.accent,
    fontWeight: '600',
  },
});
