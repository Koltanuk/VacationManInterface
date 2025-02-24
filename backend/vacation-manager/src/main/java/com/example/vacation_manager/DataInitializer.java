package com.example.vacation_manager;


import com.example.vacation_manager.model.RequestStatus;
import com.example.vacation_manager.model.User;
import com.example.vacation_manager.model.VacationRequest;
import com.example.vacation_manager.repository.UserRepository;
import com.example.vacation_manager.repository.VacationRequestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VacationRequestRepository vacationRequestRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           VacationRequestRepository vacationRequestRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.vacationRequestRepository = vacationRequestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed sample data only if the database is empty
        if (userRepository.count() == 0) {
            // Create a requester user
            User requester = new User();
            requester.setUsername("requester1");
            requester.setPassword(passwordEncoder.encode("password")); // Password is stored hashed
            requester.setRole("REQUESTER");
            userRepository.save(requester);

            // Create a validator user
            User validator = new User();
            validator.setUsername("validator1");
            validator.setPassword(passwordEncoder.encode("password"));
            validator.setRole("VALIDATOR");
            userRepository.save(validator);

            // Create a sample vacation request for the requester
            VacationRequest request = new VacationRequest();
            request.setRequester(requester);
            request.setStartDate(LocalDate.now().plusDays(1)); // starts tomorrow
            request.setEndDate(LocalDate.now().plusDays(10));  // ends in 10 days
            request.setReason("Family trip");
            request.setStatus(RequestStatus.PENDING);
            vacationRequestRepository.save(request);

            VacationRequest request2 = new VacationRequest();
            request2.setRequester(requester);
            request2.setStartDate(LocalDate.now().plusDays(10));
            request2.setEndDate(LocalDate.now().plusDays(15));
            request2.setReason("Medical leave");
            request2.setStatus(RequestStatus.APPROVED);
            vacationRequestRepository.save(request2);

            VacationRequest request3 = new VacationRequest();
            request3.setRequester(requester);
            request3.setStartDate(LocalDate.now().plusDays(20));
            request3.setEndDate(LocalDate.now().plusDays(25));
            request3.setReason("Travel");
            request3.setStatus(RequestStatus.REJECTED);
            request3.setComments("Insufficient staffing during this period");
            vacationRequestRepository.save(request3);
        }
    }
}
