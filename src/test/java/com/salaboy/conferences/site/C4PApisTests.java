package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.Proposal;
import com.salaboy.conferences.site.models.ProposalSubmission;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerPort;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerProperties;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
@AutoConfigureStubRunner(stubsMode = StubRunnerProperties.StubsMode.REMOTE, repositoryRoot = "http://nexus/repository/maven-group/", ids = "com.salaboy.conferences:fmtok8s-c4p")
@DirtiesContext
public class C4PApisTests {

    @StubRunnerPort("fmtok8s-c4p")
    int c4pServicePort;

    public JacksonTester<Proposal> json;

    @Before
    public void setupPort() {
        System.out.println("Port from stub:  " + c4pServicePort);
    }


    @Test
    public void shouldReturnProposalWithIdWhenAProposalIsCreated() throws IOException {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ProposalSubmission> proposalHttpEntity = new HttpEntity<>(
                new ProposalSubmission( "test title", "test description",  "salaboy", "salaboy@mail.com" ),
                headers);

        ResponseEntity<ProposalSubmission> response = restTemplate.exchange("http://localhost:" + this.c4pServicePort + "/", HttpMethod.POST, proposalHttpEntity,
                ProposalSubmission.class);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody().getId());
        assertNotEquals(response.getBody().getId(), "");
        assertEquals(response.getBody().getTitle(), "test title");
        assertEquals(response.getBody().getDescription(), "test description");
        assertEquals(response.getBody().getAuthor(), "salaboy");
        assertEquals(response.getBody().getEmail(), "salaboy@mail.com");


    }


}
