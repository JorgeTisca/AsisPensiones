import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import App from './src';
export default () => {
  return (
    <>
      <StatusBar barStyle={"light-content"}
        backgroundColor={'#f5f'} />
      <SafeAreaView style={styles.container} />
      <App />
      <SafeAreaView style={styles.container} />

    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff'
  },
});