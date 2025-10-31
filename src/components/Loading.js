import Animated from 'react-native-reanimated'
import useLoading from "../hooks/useLoading"

export default () => {
    const { loadingStyles } = useLoading({ color: '#9b59b8' })
    return (
        <Animated.View style={loadingStyles} />
    )
}