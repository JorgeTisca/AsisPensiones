import { useAnimatedStyle, withSpring } from "react-native-reanimated"
import { isIOS } from "../../utils/constants"

export default ({ translateY, show, scanFrame, codeHighlights, layout }) => {
    const highlightStyle = useAnimatedStyle(() => {
        let styles = {
            top: withSpring(codeHighlights.value.y * (layout.height / scanFrame.width)),

            width: withSpring(codeHighlights.value.width * (layout.height / scanFrame.value.width)),
            height: withSpring(codeHighlights.value.width * (layout.height / scanFrame.value.width)),

            opacity: show ? 1 : 0,
        }

        if (isIOS) styles.right = withSpring(codeHighlights.value.x * (layout.width / scanFrame.value.height))
        else styles.leftt = withSpring(codeHighlights.value.x * (layout.width / scanFrame.value.height))
        return styles
    })

    const toastStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withSpring(translateY.value)
            }
        ]
    }))
    return {
        highlightStyle,
        toastStyle
    }
}