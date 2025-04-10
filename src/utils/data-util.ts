import { faker } from "@faker-js/faker";

export class DataUtils {
  // Method to generate a random last name
  public static generateLastName(): string {
    return faker.person.lastName();
  }

  // Method to generate a random first name
  public static generateFirstName(): string {
    return faker.person.firstName();
  }

  // Method to generate a random alphanumeric string
  public static generateRandomString(): string {
    return faker.string.alphanumeric();
  }

  // Method to generate a random email
  public static generateRandomEmail(): string {
    return faker.internet.email();
  }
}