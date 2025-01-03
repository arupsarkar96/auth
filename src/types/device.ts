

export interface DeviceResponse {
    status: number,
    data: DeviceError | DeviceSuccess
}

interface DeviceError {
    message: string,
    error: string
}

interface DeviceSuccess {
    user: {
        display_name: string|null
        username: string,
        photo: string,
        about: string,
        verified: boolean,
        is_private: boolean
    },
    access_token: string,
    refresh_token: string
}

export interface DeviceAuth {
    auth_id: number,
    user_id: number,
    username: string
}