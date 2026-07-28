const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.REACT_APP_BACKEND_URL ??
  "http://localhost:8080/api";

const env = {
  apiUrl,
  nodeEnv: process.env.NODE_ENV,
  fxRate: Number(process.env.NEXT_PUBLIC_FX_RATE ?? process.env.REACT_APP_FX_RATE ?? "106"),
  deliveryCharge: Number(
    process.env.NEXT_PUBLIC_DELIVERY_CHARGE ?? process.env.REACT_APP_DELIVERY_CHARGE ?? "20",
  ),
  googleClientId:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
    "116640610459-l774ctmgedtp501cjkvfrrklbrl4v2aj.apps.googleusercontent.com",
  // DUMMY_DATA: remove when backend is ready
  isDummyData:
    process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true" ||
    process.env.REACT_APP_USE_DUMMY_DATA === "true",
} as const;

export default env;
