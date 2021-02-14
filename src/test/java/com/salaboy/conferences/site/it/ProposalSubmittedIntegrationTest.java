package com.salaboy.conferences.site.it;

import com.salaboy.conferences.site.ApiGatewayService;
import com.salaboy.conferences.site.config.SeleniumBrowser;
import io.cucumber.spring.CucumberContextConfiguration;
import org.junit.BeforeClass;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = ApiGatewayService.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class ProposalSubmittedIntegrationTest {

    private static SeleniumBrowser seleniumBrowser;

    @BeforeClass
    public static void beforeClass() {
        seleniumBrowser = new SeleniumBrowser("http://localhost", 8585);
    }

    public void createAProposal() {
        seleniumBrowser.clickOnMainButton();
        seleniumBrowser.fillProposalFields();
        seleniumBrowser.sendProposal();
    }
}
