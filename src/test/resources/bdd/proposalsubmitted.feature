Feature: An user can create a proposal on application
  Scenario: Use create a proposal
    When the user submits a proposal
    And go to the backoffice page
    Then the admin can see an proposal to be approved