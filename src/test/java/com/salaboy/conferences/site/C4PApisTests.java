package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.Proposal;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
//@AutoConfigureStubRunner(stubsMode = StubRunnerProperties.StubsMode.REMOTE, repositoryRoot = "http://nexus/repository/maven-group/", ids = "com.salaboy.conferences:fmtok8s-c4p")
@DirtiesContext
public class C4PApisTests {

//    @StubRunnerPort("fmtok8s-c4p")
//    int c4pServicePort;

    public JacksonTester<Proposal> json;

//    @Before
//    public void setupPort() {
//        System.out.println("Port from stub:  " + c4pServicePort);
//    }


    @Test
    public void shouldReturnProposalWithIdWhenAProposalIsCreated() throws IOException {
    }

//    @Test
//    public void shouldReturnProposalWithIdWhenAProposalIsCreated() throws IOException {
//
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<ProposalSubmission> proposalHttpEntity = new HttpEntity<>(
//                new ProposalSubmission( "test title", "test description",  "salaboy", "salaboy@mail.com" ),
//                headers);
//
//        ResponseEntity<ProposalSubmission> response = restTemplate.exchange("http://localhost:" + this.c4pServicePort + "/", HttpMethod.POST, proposalHttpEntity,
//                ProposalSubmission.class);
//
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody().getId());
//        assertNotNull(response.getBody().getTitle());
//        assertNotNull(response.getBody().getDescription());
//        assertNotNull(response.getBody().getAuthor());
//        assertNotNull(response.getBody().getEmail());
//
//    }


}
