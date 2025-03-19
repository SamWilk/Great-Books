const getURLConfig = () => {
  switch (import.meta.env.MODE) {
    case "production":
      return {
        SiteUrl: "http://localhost:80/",
        APIUrl: "http://localhost:80/api",
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
