import { useSharedValue } from "react-native-reanimated"
import { useCodeScanner } from "react-native-vision-camera"
import { isIOS } from "../../utils/constants"

// export default (onScan) => {
export default ({ progress, handleAddProgress = () => { }, firstQR, setFirstQR, layout }) => {
    // const scanFrame = useSharedValue({ width: 1, height: 1 }) //detecta dimenciones
    const scanFrame = useSharedValue({ width: 1, height: 1 }) //detecta dimenciones
    const codeHighlights = useSharedValue({ x: 0, y: 0, width: 0, height: 1 })

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes, frame) => {
            // if (codes.length > 0) {
            //     const value = codes[0].value
            //     console.log(" CÓDIGO DETECTADO:", value)
            //     onScan?.(value)
            // }
            scanFrame.value = frame
            if ((firstQR === codes[0].value) || firstQR === '') {
                if (progress.value < 7) handleAddProgress()
                if (firstQR === '') setFirstQR(codes[0].value)
            }

            codeHighlights.value =
                isIOS ?
                    {
                        height: codes[0].frame.width,
                        width: codes[0].frame.height,
                        x: codes[0].frame.y,
                        y: codes[0].frame.x
                    } : {
                        height: codes[0].frame.width,
                        width: codes[0].frame.height,
                        x: codes[0].frame.x < ((layout.width / 2) - 50) ? (codes[0].frame.x - 50) : codes[0].frame.x > ((layout.width / 2) + 100) ? (codes[0].frame.x + 50) : codes[0].frame.x - 15,
                        y: codes[0].frame.y
                    }
        }
    })

    return {
        codeScanner,
        scanFrame,
        codeHighlights
    }
}