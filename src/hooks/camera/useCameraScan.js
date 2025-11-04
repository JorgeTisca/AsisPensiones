
import { Alert } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { useCodeScanner } from "react-native-vision-camera"
import { isIOS } from "../../utils/constants"

export default ({ progress, handleAddProgress = () => { }, firstQR, setFirstQR, layout }) => {
    const scanFrame = useSharedValue({ width: 1, height: 1 })
    const codeHighlights = useSharedValue({ x: 0, y: 0, width: 0, height: 1 })
    const sendToApi = async (value) => {
        try {
            console.log("Enviando QR:", value)
            const res = await fetch("https://api-qr-iota.vercel.app/api/insertQR", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ INTERNO: value.toUpperCase().replace('HTTPS://WWW.ISSSSPENET.GOB.MX/PENSIONADO/', '') }),
            })

            const json = await res.json()
            console.log("Respuesta del servidor:", json)

            if (res.ok) {
                Alert.alert("QR registrado", `INTERNO: ${value.toUpperCase().replace('HTTPS://WWW.ISSSSPENET.GOB.MX/PENSIONADO/', '')}`)
            } else {
                Alert.alert("Error", json?.error || "No se pudo registrar el QR")
            }
        } catch (err) {
            console.error("Error al enviar QR:", err)
            Alert.alert("Error de conexión", "No se pudo conectar al servidor")
        }
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes, frame) => {
            if (!codes.length) return

            const value = codes[0].value
            if (!value) return

            scanFrame.value = frame
            if (firstQR === '' || firstQR === value) {
                if (progress.value < 7) handleAddProgress()
                if (firstQR === '') {
                    setFirstQR(value)
                    sendToApi(value)
                }
            }

            codeHighlights.value =
                isIOS
                    ? {
                        height: codes[0].frame.width,
                        width: codes[0].frame.height,
                        x: codes[0].frame.y,
                        y: codes[0].frame.x,
                    }
                    : {
                        height: codes[0].frame.width,
                        width: codes[0].frame.height,
                        x:
                            codes[0].frame.x < layout.width / 2 - 50
                                ? codes[0].frame.x - 50
                                : codes[0].frame.x > layout.width / 2 + 100
                                    ? codes[0].frame.x + 50
                                    : codes[0].frame.x - 15,
                        y: codes[0].frame.y,
                    }
        },
    })

    return {
        codeScanner,
        scanFrame,
        codeHighlights,
    }
}