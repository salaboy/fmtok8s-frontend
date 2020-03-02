package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.Proposal;
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
import org.springframework.cloud.contract.verifier.util.ContentType;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
@AutoConfigureStubRunner(stubsMode = StubRunnerProperties.StubsMode.REMOTE, repositoryRoot = "http://nexus-jx.35.195.82.183.nip.io/repository/maven-group/", ids = "com.salaboy.conferences:fmtok8s-c4p")
@DirtiesContext
public class C4PApisTests {

    @StubRunnerPort("fmtok8s-c4p")
    int producerPort;

    public JacksonTester<Proposal> json;

    @Before
    public void setupPort() {
        System.out.println("Port from stub:  " + producerPort);
    }
    

    @Test
    public void shouldReturnProposalWithIdWhenAProposalIsCreated() throws IOException {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> proposalHttpEntity = new HttpEntity<>("{ \"title\" : \"test title\", \"description\" : \"test description\", \"author\": \"salaboy\", \"email\": \"salaboy@mail.com\" }", headers);


        ResponseEntity<String> response = restTemplate.exchange("http://localhost:" + this.producerPort + "/", HttpMethod.POST, proposalHttpEntity,
                String.class);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().contains("\"id\":"));


    }


}
