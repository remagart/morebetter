import React from "react";
import { Platform, NativeModules, StatusBar } from "react-native";

const { StatusBarManager } = NativeModules;
const DEFAULT_HEIGHT = 20;

export function getStatusBarHeight() {
  if (Platform.OS === "ios") {
    return new Promise((resolve) => {
      StatusBarManager.getHeight(({ height }) => {
        resolve(height || DEFAULT_HEIGHT);
      });
    });
  }

  return StatusBar.currentHeight || DEFAULT_HEIGHT;
}