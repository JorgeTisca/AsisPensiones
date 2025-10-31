import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from "./Loading";

export default ({ hasPermissions, requestPermissions }) => {
    return (
        hasPermissions === 'LOADING'
            ? <Loading />
            :
            // hasPermissions === 'DENIED'
            <View style={styles.container}>
                {/* <Image source={{ uri: { Image: '../utils/camera-icon.png' } }} style={styles.image} resizeMode={'contain'}
                /> */}
                <Text style={styles.title}>Necesitamos acceso a tu camara</Text>
                <Text>Para continuar, por favor otorga acceso a la camara.</Text>
                <TouchableOpacity style={styles.button}
                    onPress={requestPermissions}
                >
                    <Text style={styles.buttonText}>Permitir Acceso</Text>

                </TouchableOpacity>
            </View>

        // faltaria el DENIED y el BLOCKED
    )
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 20
    },
    image: {
        height: 300,
        width: 200,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#4caf50',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontStyle: 14,
        color: 'white',
        fontWeight: 'bold'
    }
});