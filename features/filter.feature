Feature: Filter Google Books Results
# As a User I want to filter the amount of results displayed after a Google Books
# search so I can customize my results.

  Scenario Outline: Filter Google Books - Filter Results
  # This scenario validates I can filter the Google Books search results
    Given I navigate to the Angular Google Books page
    And I input "<number>" on the "Number of books to show:" field
    And I select the "Update" button
    Then I will see a result list
    And the result list will contain "<number>" books
    Examples:
    |number |
    |1      |
    |5      |
    |9      |
    |10     |


  Scenario Outline: Filter Google Books - Negative - Invalid Data
  # This scenario validates error handling for invalid data on the filter
    Given I navigate to the Angular Google Books page
    And I input "<data>" on the "Number of books to show:" field
    And I select the "Update" button
    Then I will see a result list
    And the result list will contain "<number>" books
    Examples:
    |data |number   |
    |0    |No books |
    |abcd |No books |
    |     |10       |
    |2+5  |No books |
