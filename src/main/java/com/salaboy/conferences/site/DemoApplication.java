package com.salaboy.conferences.site;

import com.salaboy.conferences.site.models.AgendaItem;
import com.salaboy.conferences.site.models.Proposal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}

@Controller
class ConferenceSiteController {
    @Value("${version:0}")
    private String version;

    @GetMapping("/info")
    public String infoWithVersion() {
        return "Site v" + version;
    }

    private static final String CONFERENCE_C4P = "http://fmtok8s-c4p";

    private static final String CONFERENCE_EMAIL = "http://fmtok8s-email";

    private static final String CONFERENCE_AGENDA = "http://fmtok8s-agenda";

    @GetMapping("/")
    public String index(Model model) {

        RestTemplate restTemplate = new RestTemplate();

        String agendaInfo = "N/A";
        String c4pInfo = "N/A";

        try {
            ResponseEntity<String> agenda = restTemplate.getForEntity(CONFERENCE_AGENDA + "/info", String.class);
            agendaInfo = agenda.getBody();

        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            ResponseEntity<String> sponsors = restTemplate.getForEntity(CONFERENCE_C4P + "/info", String.class);
            c4pInfo = sponsors.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }


        ResponseEntity<List<AgendaItem>> agendaItems = null;

        try {
            agendaItems = restTemplate.exchange(CONFERENCE_AGENDA, HttpMethod.GET, null, new ParameterizedTypeReference<List<AgendaItem>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<List<Proposal>> proposals = null;

        try {
            proposals = restTemplate.exchange(CONFERENCE_C4P, HttpMethod.GET, null, new ParameterizedTypeReference<List<Proposal>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("version", version);
        model.addAttribute("agenda", agendaInfo);
        model.addAttribute("c4pURL", CONFERENCE_C4P);
        model.addAttribute("agendaURL", CONFERENCE_AGENDA);
        model.addAttribute("c4p", c4pInfo);


        if (agendaItems != null) {
            model.addAttribute("agendaItems", agendaItems.getBody());
        }


        return "index";
    }

    @GetMapping("/backoffice")
    public String backoffice(Model model) {
        RestTemplate restTemplate = new RestTemplate();


        String emailInfo = "N/A";
        String c4pInfo = "N/A";

        try {
            ResponseEntity<String> email = restTemplate.getForEntity(CONFERENCE_EMAIL + "/info", String.class);
            emailInfo = email.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<List<Proposal>> proposals = null;

        try {
            proposals = restTemplate.exchange(CONFERENCE_C4P, HttpMethod.GET, null, new ParameterizedTypeReference<List<Proposal>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            ResponseEntity<String> sponsors = restTemplate.getForEntity(CONFERENCE_C4P + "/info", String.class);
            c4pInfo = sponsors.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("version", version);
        model.addAttribute("c4pURL", CONFERENCE_C4P);
        model.addAttribute("email", emailInfo);
        model.addAttribute("c4p", c4pInfo);

        if (proposals != null) {
            model.addAttribute("proposals", proposals.getBody());
        }

        return "backoffice";
    }

}
