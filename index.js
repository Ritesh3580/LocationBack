/**
 * @format
 */

import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { useEffect } from "react";
import RNLocation, { subscribeToHeadingUpdates } from 'react-native-location';




AppRegistry.registerComponent(appName, () => App);
    