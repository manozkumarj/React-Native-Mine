import { StyleSheet } from "react-native";
export default StyleSheet.create({
  //Common Style
  appTitle: {
    fontSize: 23,
    color: "snow",
  },
  headerBackgroundColor: {
    backgroundColor: "#075E54",
  },
  // Tabs
  tabBarUnderLine: {
    height: 2,
  },
  badge: {
    backgroundColor: "#ECE5DD",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    height: 24,
  },
  badgeText: {
    color: "#075E54",
    fontSize: 12,
  },
  tabsText: { fontSize: 14, fontWeight: "bold" },
  //Chat Screen
  badgeChats: {
    backgroundColor: "#25D366",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    height: 24,
    marginTop: 4,
  },
  badgeTextChats: {
    color: "snow",
    fontSize: 12,
  },
  fabColor: {
    backgroundColor: "#25D366",
  },
  // Status Screen
  listItemDivider: { marginTop: 10, height: 10 },
  addStatusIcon: {
    color: "#25D366",
    alignSelf: "flex-end",
    position: "absolute",
    marginLeft: 40,
    bottom: -5,
    width: 20,
    fontSize: 20,
  },
  // Call Screen
  callIcon: {
    marginRight: 10,
    fontSize: 18,
  },
});
