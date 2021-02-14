package com.salaboy.conferences.site.config;

import com.salaboy.conferences.site.it.ProposalSubmittedIntegrationTest;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@CucumberOptions(features = "src/test/resources/bdd")
@RunWith(Cucumber.class)
public class CucumberIntegrationTest extends ProposalSubmittedIntegrationTest { }
