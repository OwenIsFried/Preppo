import { Platform, StatusBar, StyleSheet } from 'react-native';


export const darkColors = {
  background: '#0E0E10',
  card: '#1C1C1F',
  cardAlt: '#232327',
  text: '#FFFFFF',
  muted: '#A3A3A8',
  accent: '#FF6A3D',
  accentPressed: '#E0562C',
  border: '#2B2B30',
};

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkColors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
  },

  // HEADERS
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: darkColors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: darkColors.text,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: darkColors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // SECTION HEADERS
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: darkColors.text,
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: '600',
    color: darkColors.muted,
  },

  // UPCOMING MEALS
  cardRow: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  card: {
    width: 170,
    height: 220,
    borderRadius: 18,
    backgroundColor: darkColors.card,
    marginRight: 12,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardImageArea: {
    flex: 1,
    backgroundColor: darkColors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  cardAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: darkColors.border,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAuthor: {
    fontSize: 11,
    color: darkColors.muted,
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: darkColors.text,
  },

  // COMMUNITY POSTS
  reelsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  reelItem: {
    marginHorizontal: 20,
    marginBottom: 16,
    height: 380,
    borderRadius: 20,
    backgroundColor: darkColors.cardAlt,
    overflow: 'hidden',
  },
  reelImage: {
    width: 90,
    height: 90,
    opacity: 0.8,
  },
  feedFooter: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  reelTopBar: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reelUserPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  reelAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: darkColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  reelUsername: {
    fontSize: 13,
    fontWeight: '600',
    color: darkColors.text,
  },
  reelDatePill: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  reelDateText: {
    fontSize: 12,
    color: darkColors.muted,
  },
  reelActionRail: {
    position: 'absolute',
    right: 14,
    bottom: 56,
    alignItems: 'center',
  },
  reelActionButton: {
    alignItems: 'center',
    marginBottom: 18,
  },
  reelActionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: darkColors.text,
    marginTop: 4,
  },
  reelBottomBar: {
    position: 'absolute',
    left: 16,
    right: 70,
    bottom: 16,
  },
  reelDescriptionText: {
    fontSize: 13,
    color: darkColors.text,
    lineHeight: 18,
  },
  reelMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: darkColors.muted,
    marginTop: 2,
  },

  // COMMENTS
  commentsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  commentsSheet: {
    height: '65%',
    backgroundColor: darkColors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  commentsHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: darkColors.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  commentsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: darkColors.border,
  },
  commentsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: darkColors.text,
  },
  commentsCloseButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: darkColors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsList: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  commentRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: darkColors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  commentBody: {
    flex: 1,
  },
  commentUsername: {
    fontSize: 13,
    fontWeight: '600',
    color: darkColors.text,
  },
  commentText: {
    fontSize: 13,
    color: darkColors.muted,
    marginTop: 2,
    lineHeight: 17,
  },
  commentInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: darkColors.border,
  },
  commentInputPlaceholder: {
    flex: 1,
    backgroundColor: darkColors.cardAlt,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: darkColors.muted,
    fontSize: 13,
  },
  commentSendButton: {
    marginLeft: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // NAV BAR
  tabBarWrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(28,28,31,0.35)',
  },
  tabItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: darkColors.accent,
  },
});