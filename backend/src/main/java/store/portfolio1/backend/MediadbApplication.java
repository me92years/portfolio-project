package store.portfolio1.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MediadbApplication {

  public static void main(String[] args) {
    SpringApplication.run(MediadbApplication.class, args);
  }

//  @Override
//  public void run(String... args) throws Exception {
//    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//    String password = passwordEncoder.encode("password1234");
//    System.out.println("Password >>>>> " + password);
//  }

}
