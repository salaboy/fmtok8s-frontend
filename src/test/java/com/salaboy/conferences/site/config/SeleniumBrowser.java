package com.salaboy.conferences.site.config;

import org.openqa.selenium.By;

public class SeleniumBrowser {

    private SeleniumConfig seleniumConfig;

    public SeleniumBrowser(String url, int port) {
        this.seleniumConfig = new SeleniumConfig(url, port);
    }

    public void closeWindow() {
        this.seleniumConfig.getWebDriver().close();
    }

    public void clickOnMainButton() {
        this.seleniumConfig.getWebDriver()
                .findElement(By.linkText("Submit Proposal"))
                .click();
    }

    public void fillProposalFields() {

        this.seleniumConfig.getWebDriver()
                .findElement(By.id("title"))
                .sendKeys("How I can use SOLID?");

        this.seleniumConfig.getWebDriver()
                .findElement(By.id("author"))
                .sendKeys("John Dow");

        this.seleniumConfig.getWebDriver()
                .findElement(By.id("email"))
                .sendKeys("john.doe@email.com");

        this.seleniumConfig.getWebDriver()
                .findElement(By.id("description"))
                .sendKeys("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
    }

    public void sendProposal() {
        this.seleniumConfig.getWebDriver()
                .findElement(By.xpath("xpath=//a[contains(text(),'Send')]"))
                .click();
    }
}