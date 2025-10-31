import { useEffect, useState } from "react"
import { PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { isIOS } from "../utils/constants"

export default () => {
    const [hasPermissions, setHasPermission] = useState('LOADING')
    const requestAndroidPermisssions = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.CAMERA)
            if (result === RESULTS.GRANTED) setHasPermission('GRANTED')
            else setHasPermission('DENIED')
        }
        catch (err) {
            console.log('err: ', err)
            setHasPermission('ERROR')
        }
    }
    const requestIOSidPermisssions = async () => {
        try {
            const result = await request(PERMISSIONS.IOS.CAMERA)
            if (result === RESULTS.GRANTED) setHasPermission('GRANTED')
            else if (result === RESULTS.DENIED) setHasPermission('DENIED')
            else if (result === RESULTS.BLOCKED) setHasPermission('BLOCKED')
        }
        catch (err) {
            console.log('err: ', err)
            setHasPermission('ERROR')
        }
    }
    const requestPermissions = () => {
        if (isIOS) requestIOSidPermisssions()
        else requestAndroidPermisssions()
    }

    useEffect(() => {
        setTimeout(() => {
            requestPermissions()
        }, 1500)
    },)

    return (
        hasPermissions,
        requestPermissions
    )

}