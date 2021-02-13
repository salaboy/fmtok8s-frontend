Feature: Admin user can approve or reject a proposal
  Scenario: Admin approve a proposal
    When Admin click on approve button to approve a proposal
    And Admin go to main page
    Then should see an agenda item on page