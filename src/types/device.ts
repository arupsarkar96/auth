

export interface DeviceResponse {
    status: number,
    data: DeviceError | DeviceSuccess
}

interface DeviceError {
    message: string
}

interface DeviceSuccess {
    access_token: string,
    refresh_token: string
}

export interface DeviceAuth {
    auth_id: number,
    user_id: number,
    username: string
}