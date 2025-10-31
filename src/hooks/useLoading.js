import { useEffect } from "react"
import { Easing } from "react-native"
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"

export default ({ color }) => {
    const rotation = useSharedValue(0)
    const handleAnimated = () => {
        rotation.value = withRepeat(
            withTiming(1, {
                duration: 1000,
                easing: Easing.linear
            }), 1
        )
    }
    useEffect(() => {
        handleAnimated()
    },);

    const loadingStyles = useAnimatedStyle(() => ({
        borderColor: color,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderRightWidth: 3,
        borderBottomWidth: [{
            rotate: `${interpolate(
                rotation.value,
                [0, 1],
                [0, 300],
                Extrapolation.EXTEND
            )}deg`
        }]
    }))
    return {
        loadingStyles
    }
}
