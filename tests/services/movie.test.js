const MovieService = require("../../services/movies");

const basicUser = {
  userId: 124,
  name: "Basic Kelvin",
  role: "basic",
  iat: 1606221838,
  exp: 1606223638,
  iss: "https://www.netguru.com/",
  sub: "123",
};

const premiumUser = {
  userId: 125,
  name: "Premium Kate",
  role: "premium",
  iat: 1606221834,
  exp: 1606223698,
  iss: "https://www.netguru.com/",
  sub: "125",
};
describe("Movie Service Test", () => {
  it("should create a new movie given the title", async () => {
    const data = {
      title: "The Kingsman",
    };
    const movie = await MovieService.create(data, basicUser);
  });
});