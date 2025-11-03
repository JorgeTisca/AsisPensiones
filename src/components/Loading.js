import { StyleSheet, View } from 'react-native';

export default () => {
    return <View style={[styles.loading]} />
}

const styles = StyleSheet.create({
    loading: {
        width: 100,
        height: 100,
        backgroundColor: '#9b59b8',
        borderRadius: 50,
    }
});