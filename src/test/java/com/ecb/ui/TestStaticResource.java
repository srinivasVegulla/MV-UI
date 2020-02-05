package com.ecb.ui;


import com.ericsson.ecb.ui.ECBUIApplication;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.AnnotationConfigWebContextLoader;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes=ECBUIApplication.class, loader=AnnotationConfigWebContextLoader.class)
@WebAppConfiguration
@PropertySource(value = { "classpath:application.properties" })
public class TestStaticResource {

  private MockMvc mvc;

  @Autowired
  protected WebApplicationContext webApplicationContext;

  @Before
  public void setUp() {
    mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
  }


  @Test
  public void getStaticResource() throws Exception {
    MvcResult result =
      mvc.perform(
        MockMvcRequestBuilders.get("/resources/payment.html")).andReturn();

    String content = result.getResponse().getContentAsString();
    int status = result.getResponse().getStatus();
    Assert.assertEquals("Success - expected HTTP status 200", 200, status);

  }

  @Test
  public void getNoStaticResource() throws Exception {
    MvcResult result =
      mvc.perform(
        MockMvcRequestBuilders.get("/resources/Hello1.html")).andReturn();

    int status = result.getResponse().getStatus();
    Assert.assertEquals("Success - expected HTTP status 404", 404, status);

  }

}
