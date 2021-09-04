package com.salaboy.conferences.site.it;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class ProposalSubmittedDefsIntegrationTest extends ProposalSubmittedIntegrationTest {

    @When("^the user submits a proposal$")
    public void the_user_submits_a_proposal() {
        createAProposal();
    }

    @And("^go to the backoffice page$")
    public void go_to_the_backoffice_page() {

    }

    @Then("^the admin can see an proposal to be approved$")
    public void the_admin_can_see_an_proposal_to_be_approved() {

    }
}
