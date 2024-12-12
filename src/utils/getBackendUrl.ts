export const getBackendUrl = () => {
	const env = process.env.NODE_ENV;
	if (env === "development") {
		return "http://localhost:8000";
	}
	return process.env.NEXT_PUBLIC_BACKEND_URL;
};
