import { StyleSheet, View } from "react-native";
import { Camera, RequestCamera } from './components';
import useCameraPermissions from './permissions/cameraPermissionsReq'; // renombré para que sea un hook

export default () => {
    const { hasPermissions, requestPermissions, openAppSettings } = useCameraPermissions();

    return (
        <View style={styles.container} >
            {hasPermissions !== 'GRANTED'
                ? <RequestCamera hasPermissions={hasPermissions} requestPermissions={requestPermissions} openAppSettings={openAppSettings} />
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
        backgroundColor: '#fff'
    },
});