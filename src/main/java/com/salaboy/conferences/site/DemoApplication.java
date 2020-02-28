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
import org.springframework.web.bind.annotation.RequestParam;
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

    @Value("${C4P_SERVICE:http://fmtok8s-c4p}")
    private String C4P_SERVICE;

    @Value("${EMAIL_SERVICE:http://fmtok8s-email}")
    private String EMAIL_SERVICE;

    @Value("${AGENDA_SERVICE:http://fmtok8s-agenda}")
    private String AGENDA_SERVICE;

    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/")
    public String index(@RequestParam(name = "submitted", required = false, defaultValue = "false") boolean submitted,
                        @RequestParam(name = "errorMsg", required = false, defaultValue = "") String errorMsg,
                        Model model) {

        String requiredFields = "The following fields are required: ";
        if (!errorMsg.equals("")) {
            requiredFields += errorMsg.substring(0, errorMsg.length()-1);
            model.addAttribute("required", requiredFields);
        }

        String agendaInfo = "N/A";
        String c4pInfo = "N/A";

        try {
            ResponseEntity<String> agenda = restTemplate.getForEntity(AGENDA_SERVICE + "/info", String.class);
            agendaInfo = agenda.getBody();

        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            ResponseEntity<String> sponsors = restTemplate.getForEntity(C4P_SERVICE + "/info", String.class);
            c4pInfo = sponsors.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<List<AgendaItem>> agendaItems = null;

        try {
            agendaItems = restTemplate.exchange(AGENDA_SERVICE, HttpMethod.GET, null, new ParameterizedTypeReference<List<AgendaItem>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }


        model.addAttribute("version", version);
        model.addAttribute("agenda", agendaInfo);
        model.addAttribute("c4pURL", C4P_SERVICE);
        model.addAttribute("agendaURL", AGENDA_SERVICE);
        model.addAttribute("c4p", c4pInfo);
        model.addAttribute("submitted", submitted);




        if (agendaItems != null) {
            model.addAttribute("agendaItems", agendaItems.getBody());
        }


        return "index";
    }

    @GetMapping("/backoffice")
    public String backoffice(@RequestParam(name = "sent", required = false, defaultValue = "false") boolean sent, Model model) {
        String emailInfo = "N/A";
        String c4pInfo = "N/A";

        try {
            ResponseEntity<String> email = restTemplate.getForEntity(EMAIL_SERVICE + "/info", String.class);
            emailInfo = email.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        ResponseEntity<List<Proposal>> proposals = null;

        try {
            proposals = restTemplate.exchange(C4P_SERVICE, HttpMethod.GET, null, new ParameterizedTypeReference<List<Proposal>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            ResponseEntity<String> sponsors = restTemplate.getForEntity(C4P_SERVICE + "/info", String.class);
            c4pInfo = sponsors.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("version", version);
        model.addAttribute("c4pURL", C4P_SERVICE);
        model.addAttribute("email", emailInfo);
        model.addAttribute("c4p", c4pInfo);
        model.addAttribute("sent", sent);

        if (proposals != null) {
            model.addAttribute("proposals", proposals.getBody());
        }

        return "backoffice";
    }

}
