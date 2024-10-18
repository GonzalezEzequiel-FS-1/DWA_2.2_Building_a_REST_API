
export const API_BASE =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/api/v1/"
        : import.meta.env.VITE_REACT_APP_BASE_URL;

