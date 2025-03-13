const getURLConfig = () => {
  switch (import.meta.env.MODE) {
    case "production":
      return {
        SiteUrl: "",
        APIUrl: "",
      };
    case "development":
      return {
        SiteUrl: "http://localhost:3000",
        APIUrl: "http://localhost:4000/api",
      };
    default:
      return {};
  }
};
export default getURLConfig;
