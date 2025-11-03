import { useEffect, useState } from "react"
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Hyperlink from "react-native-hyperlink"
import Animated, { runOnJS, useDerivedValue, useSharedValue, withSpring } from "react-native-reanimated"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Camera, useCameraDevice } from "react-native-vision-camera"
import { useAnimatedCamera, useCameraScan, useLayout } from "../hooks"

// PANTALLA DE LA CAMARA  MODFICAR AQUI PARA CAMBIAR VISUALIZACION DE CAMAR Y BOTONES
export default () => {

    // const [firstQR, setFirstQR] = useState("QR")
    const [firstQR, setFirstQR] = useState("")

    const [show, setShow] = useState(true)

    const [flashActived, setflashActived] = useState(false)
    const [flashDisabled, setflashDisabled] = useState(true)
    const { layout, onLayout } = useLayout()
    const [cameraType, setCameraType] = useState('back'/*'back'*/)
    const device = useCameraDevice(cameraType)

    const progress = useSharedValue(0)
    const isShow = useSharedValue(false)
    const translateY = useSharedValue(300)
    // const translateYa = useSharedValue(300)



    const { codeScanner, scanFrame, codeHighlights } = useCameraScan({ progress, handleAddProgress: () => progress.value = progress.value + 1, firstQR, setFirstQR, layout })
    const { highlightStyle, toastStyle } = useAnimatedCamera({ translateY, show, scanFrame, codeHighlights, layout })
    // const { codeScanner } = useCameraScan((value) => {
    //     setfirstQR(value)
    // })

    useEffect(() => {
        setflashDisabled(cameraType === 'front' ? true : false)
        setflashActived(false)
    }, [cameraType])

    useEffect(() => {
        setflashDisabled(cameraType === 'front' ? true : false)
        progress.value = 0
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraType])

    useDerivedValue(() => {
        if (translateY.value === 300) {

            runOnJS(setFirstQR)('')
        }
    })

    const handleRestart = () => {
        setTimeout(() => {
            progress.value = 0
            translateY.value = withSpring(300)
            setShow(false)
            isShow.value = false
        }, 2000)
    }

    useDerivedValue(() => {
        if (translateY.value === 0 && isShow.value) {
            runOnJS(handleRestart)()

        }
    })

    useDerivedValue(() => {
        if (progress.value === 7 && !isShow.value) {
            runOnJS(setShow)(true)
            isShow.value = true
            translateY.value = withSpring(0)
        }
    })
    return (
        <>{device
            ?
            <>

                <Camera style={StyleSheet.absoluteFill} device={device} isActive={true}
                    onLayout={onLayout}
                    torch={flashActived ? "on" : "off"}
                    codeScanner={codeScanner}
                />

                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            borderWidth: 1.5,
                            borderColor: '#0006bcff'
                        },
                        highlightStyle
                    ]}
                />

                <Animated.View style={[styles.containerAlert, toastStyle]}>
                    <View style={[styles.alertBody]}>
                        <MaterialIcons name={"qr-code-scanner"} size={32} color={'#ffff00'} />
                        <Hyperlink linkStyle={{ color: '#ffff00', fontSize: 14, textDecorationColor: '#ffff00', textDecorationLine: 'underline', textDecorationStyle: 'solid' }}
                            onPress={async (url, text) => await Linking.openURL(url)}
                        >
                            <Text style={{ fontSize: 14, color: '#ffff00', marginLeft: 12, fontWeight: '500' }}>{firstQR?.toUpperCase().replace('HTTPS://WWW.ISSSSPENET.GOB.MX/PENSIONADO/', '')}</Text>
                        </Hyperlink>
                    </View>
                </Animated.View>

                <View style={[styles.container]}>
                    <TouchableOpacity style={styles.button} disabled={flashDisabled}
                        onPress={() => {
                            setflashActived(!flashActived)
                        }}>
                        <MaterialIcons name={flashActived ? "flash-off" : "flash-on"} size={28} color={flashDisabled ? '#808080' : '#fff'} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.button} onPress={() => {
                        setCameraType(cameraType === 'back' ? 'front' : 'back')
                    }}>
                        <MaterialIcons name={"cameraswitch"} size={28} color='#fff' />
                    </TouchableOpacity> */}

                </View>
            </>

            : null
        }
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 80,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#000'
    },
    containerAlert: {
        position: 'absolute',
        bottom: 100,
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'lime'
    },
    alertBody: {
        flexDirection: 'row',
        paddingVertical: 0,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '80%',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
