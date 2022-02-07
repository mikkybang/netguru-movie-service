const MovieService = require("../../services/movies");
const Movie = require("../../models/movies");
const mongoose = require("mongoose");

require("../../config");
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
  beforeEach(async () => {
    await Movie.deleteMany({});
  });
  afterAll(async () => {
    await Movie.deleteMany({});
    mongoose.disconnect();
  });
  it("should create a new movie given the title", async () => {
    const data = {
      title: "Merlin",
    };
    const movie = await MovieService.create(data, basicUser);
    expect(movie).toBeDefined();
    expect(movie.userId).toEqual(basicUser.userId);
    expect(movie.title).toBeDefined();
    expect(movie.released).toBeDefined();
    expect(movie.title).toBeDefined();
  });

  it("should fetch all user's movies", async () => {
    const data = {
      title: "Merlin",
    };
    await MovieService.create(data, premiumUser);
    const movies = await MovieService.get(premiumUser);
    expect(movies.length).toEqual(1);
  });

  it("should throw error if title is not provided", async () => {
    const data = {};
    try {
      await MovieService.create(data, basicUser);
    } catch (error) {
      expect(error.message).toBe("Title is required");
    }
  });

  it("should throw error if limit passed", async () => {
    const data = {
      title: "Merlin",
    };
    try {
      await MovieService.create(data, basicUser);
      await MovieService.create(data, basicUser);
      await MovieService.create(data, basicUser);
      await MovieService.create(data, basicUser);
      await MovieService.create(data, basicUser);
      await MovieService.create(data, basicUser);
    } catch (error) {
      expect(error.message).toBe(
        "You have exceeded your limit of 5 movies per month, upgrade to premium to get unlimited access"
      );
    }
  });
});
