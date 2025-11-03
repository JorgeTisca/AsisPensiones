
import { useEffect, useState } from "react";
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { isIOS } from "../utils/constants";

export default function useCameraPermissions() {
    const [hasPermissions, setHasPermission] = useState('loading');

    const getPermissionType = () =>
        isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

    const checkPermissions = async () => {
        try {
            const result = await check(getPermissionType());
            setHasPermission(result);
        } catch (err) {
            console.log('check error:', err);
            setHasPermission('ERROR');
        }
    };

    const requestPermissions = async () => {
        try {
            const result = await request(getPermissionType());
            if (result === RESULTS.GRANTED) {
                setHasPermission('GRANTED');
            } else if (result === RESULTS.BLOCKED) {
                setHasPermission('BLOCKED');
            } else if (result === RESULTS.DENIED) {
                setHasPermission('DENIED');
            } else {
                setHasPermission('ERROR');
            }
        } catch (err) {
            console.log('request error:', err);
            setHasPermission('ERROR');
        }
    };

    const openAppSettings = () => {
        openSettings().catch(() => console.warn('No se pudo abrir configuraciones'));
    };

    useEffect(() => {
        checkPermissions();
    }, []);

    return {
        hasPermissions,
        requestPermissions,
        openAppSettings,
    };
}