const REGEX = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[<>\*_\-\(\)\[\]\+]).{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^[6-9]\d{9}$/, // Indian mobile numbers
}

export default REGEX