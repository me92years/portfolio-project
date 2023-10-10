package store.portfolio1.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MediadbApplication implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(MediadbApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    String password = passwordEncoder.encode("password1234");
    System.out.println("Password >>>>> " + password);
  }

}
