/** All backend paths the FE talks to. Centralised so refactors are one-file changes. */
export const endpoints = {
  auth: {
    requestOtp: "/v1/auth/login/otp",
    verifyOtp: "/v1/auth/verify-otp",
    refresh: "/v1/auth/refresh",
    me: "/v1/auth/me",
    logout: "/v1/auth/logout",
  },
  bookings: {
    slots: "/v1/bookings/slots",
    slotsByDate: (dateIso: string) => `/v1/bookings/slots/${dateIso}`,
    create: "/v1/bookings/book",
    my: "/v1/bookings/my",
    byId: (id: string) => `/v1/bookings/${id}`,
    cancel: (id: string) => `/v1/bookings/${id}/cancel`,
  },
  payments: {
    createOrder: "/v1/payments/orders",
    verify: "/v1/payments/verify",
    byId: (id: string) => `/v1/payments/${id}`,
  },
} as const;
