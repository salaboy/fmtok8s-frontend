package com.salaboy.conferences.site;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.stubrunner.spring.AutoConfigureStubRunner;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerPort;
import org.springframework.cloud.contract.stubrunner.spring.StubRunnerProperties;
import org.springframework.cloud.contract.verifier.util.ContentType;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@AutoConfigureJsonTesters
@AutoConfigureStubRunner(stubsMode = StubRunnerProperties.StubsMode.LOCAL, ids = "com.salaboy.conferences:fmtok8s-c4p")
@DirtiesContext
public class C4PApisTests {

    @StubRunnerPort("fmtok8s-c4p")
    int producerPort;

    @Before
    public void setupPort() {
        System.out.println("Port from stub:  " + producerPort);
    }

    @Test
    public void shouldReturnTheC4PInfoWhenIRequestIt() {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(RequestEntity
                        .get(URI.create("http://localhost:" + this.producerPort + "/info"))
                        .header("Content-Type", ContentType.JSON.getMimeType())
                        .build(),
                String.class);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().startsWith("C4P v"));

    }
}
