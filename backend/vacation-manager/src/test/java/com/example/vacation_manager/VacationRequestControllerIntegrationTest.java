package com.example.vacation_manager;

import com.example.vacation_manager.dto.VacationRequestDTO;
import com.example.vacation_manager.model.RequestStatus;
import com.example.vacation_manager.model.VacationRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class VacationRequestControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testSubmitVacationRequest() {
        VacationRequestDTO dto = new VacationRequestDTO();
        dto.setStartDate(LocalDate.now().plusDays(1));
        dto.setEndDate(LocalDate.now().plusDays(5));
        dto.setReason("Integration Test Vacation");

        ResponseEntity<VacationRequest> response = restTemplate
                .withBasicAuth("requester1", "password")
                .postForEntity("/api/vacation-requests", dto, VacationRequest.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        VacationRequest request = response.getBody();
        assertNotNull(request, "The returned vacation request should not be null");
        assertEquals(RequestStatus.PENDING, request.getStatus(), "The request status should be PENDING");
        assertNotNull(request.getRequester(), "The requester field should be set");
    }

    @Test
    public void testGetRequestsAsValidator() {

        ResponseEntity<VacationRequest[]> response = restTemplate
                .withBasicAuth("validator1", "password")
                .getForEntity("/api/vacation-requests", VacationRequest[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        VacationRequest[] requests = response.getBody();
        assertNotNull(requests, "The list of vacation requests should not be null");

    }
}