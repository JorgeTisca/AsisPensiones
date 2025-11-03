import { useEffect } from "react";
import { Easing } from "react-native";
import {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";

export default function useLoadingSpinner({ color = '#00f' }) {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(1, {
                duration: 1000,
                easing: Easing.linear,
            }),
            -1,
            false
        );
    }, [rotation]);

    const loadingStyles = useAnimatedStyle(() => ({
        borderColor: color,
        borderRightColor: 'transparent',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        transform: [
            {
                rotate: `${interpolate(
                    rotation.value,
                    [0, 1],
                    [0, 360],
                    Extrapolation.CLAMP
                )}deg`,
            },
        ],
    }));

    return { loadingStyles };
}