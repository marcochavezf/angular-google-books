Feature: Search Google Books
# As a User I want to search for books on Google so I can see details about
# specific books

  Scenario Outline: Search Google Books - Simple search
  # This scenario validates the search function on the page
    Given I navigate to the Angular Google Books page
    And I input "<search_criteria>" on the Search Box
    When I select the "Update" button
    Then I will see a result list
    And the result list will contain 10 books
    And I will see a title for each book
    And I will see a cover picture for each book
    And I will see a description for each book
    Examples:
    |search_criteria   |
    |gardening         |
    |second world war  |
    |car               |
