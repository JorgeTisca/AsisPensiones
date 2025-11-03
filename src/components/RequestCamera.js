import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Loading from "./Loading";

export default ({ hasPermissions, requestPermissions, openAppSettings }) => {
    if (hasPermissions === 'loading') return <Loading />;

    const renderButton = () => {
        switch (hasPermissions) {
            case 'blocked':
                return (
                    <TouchableOpacity style={styles.button} onPress={openAppSettings}>
                        <Text style={styles.buttonText}>Abrir Configuración</Text>
                    </TouchableOpacity>
                );
            case 'granted':
                return (
                    <TouchableOpacity style={styles.button} onPress={requestPermissions}>
                        <Text style={styles.buttonText}>Empezar Scaner</Text>
                    </TouchableOpacity>
                );
            case 'denied':
            case 'error':
            default:
                return (
                    <TouchableOpacity style={styles.button} onPress={requestPermissions}>
                        <Text style={styles.buttonText}>Permitir Acceso</Text>
                    </TouchableOpacity>
                );
        }
    };

    return (
        hasPermissions !== 'granted' ?

            <View style={styles.container}>
                <Image source={require('../utils/camera-icon.png')} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>Necesitamos acceso a tu cámara</Text>
                <Text>Para continuar, por favor otorga acceso a la cámara.{hasPermissions}</Text>
                {renderButton()}
            </View>
            :
            <View style={styles.container}>
                <Image source={require('../utils/gob.png')} style={styles.image} resizeMode="stretch" />
                <Text style={styles.title}>Bienvenido a Asistencia Pensionados</Text>
                <Text>Empieza el Scanner.</Text>
                {renderButton()}
            </View>
    );
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
        height: '50%',
        width: '90%',
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
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        top: 5
    },
    buttonText: {
        fontStyle: 14,
        color: 'white',
        fontWeight: 'bold'
    }
});