package com.salaboy.conferences.site.config;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumConfig {

    private WebDriver webDriver;

    static {
        System.setProperty("webdriver.chrome.driver", "C:/Users/matheus.cruz/Documents/geckodriver/chromedriver.exe");
    }

    public SeleniumConfig(String url, int port) {
        webDriver = new ChromeDriver();
        webDriver.get(String.format("%s:%i", url, port));
    }

    public WebDriver getWebDriver() {
        return webDriver;
    }
}
