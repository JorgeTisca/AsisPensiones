import { StyleSheet, View } from "react-native";
import { Camera, RequestCamera } from './components';
import cameraPermissions from './permissions/cameraPermissions';

export default () => {

    const { hasPermissions, requestPermissions } = cameraPermissions()
    return (
        <View style={styles.container} >
            {
                hasPermissions === 'LOADING' || hasPermissions === 'DENIED' || hasPermissions === 'ERROR'
                    ? <RequestCamera hasPermissions={hasPermissions} requestPermissions={requestPermissions} />
                    : <Camera />
            }

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff'
    },
});