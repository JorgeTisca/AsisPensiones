import { useSharedValue } from "react-native-reanimated"
import { useCodeScanner } from "react-native-vision-camera"

export default (onScan) => {
    const scanFrame = useSharedValue({ width: 1, height: 1 }) //detecta dimenciones
    const codeHiglights = useSharedValue({ x: 0, y: 0, width: 0, height: 1 })

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes, frame) => {
            if (codes.length > 0) {
                const value = codes[0].value
                console.log("✅ CÓDIGO DETECTADO:", value)
                onScan?.(value)
            }
            scanFrame.value = frame

        }
    })

    return {
        codeScanner
    }
}