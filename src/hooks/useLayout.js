import { useState } from "react"

export default () => {
    const [layout, setLayout] = useState({ width: 0, height: 0 })
    const onLayout = ({ nativeEvent: { layout } }) => {
        setLayout(layout)
    }

    return {
        layout, onLayout
    }


}