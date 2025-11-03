import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import App from './src';

export default function Root() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <App />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});