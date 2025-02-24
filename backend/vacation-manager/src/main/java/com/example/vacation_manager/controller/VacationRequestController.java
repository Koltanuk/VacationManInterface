package com.example.vacation_manager.controller;

import com.example.vacation_manager.dto.VacationRequestDTO;
import com.example.vacation_manager.dto.VacationRequestUpdateDTO;
import com.example.vacation_manager.model.RequestStatus;
import com.example.vacation_manager.model.User;
import com.example.vacation_manager.model.VacationRequest;
import com.example.vacation_manager.repository.UserRepository;
import com.example.vacation_manager.service.VacationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/vacation-requests")
@RequiredArgsConstructor
public class VacationRequestController {

    private final VacationRequestService vacationRequestService;
    private final UserRepository userRepository; // To fetch the authenticated user

    // Requesters can submit vacation requests
    @PreAuthorize("hasRole('REQUESTER')")
    @PostMapping
    public ResponseEntity<VacationRequest> submitRequest(@RequestBody VacationRequestDTO requestDTO) {
        // Get the authenticated user's username
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Retrieve the User entity from the database
        User requester = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalStateException("User not found: " + username));

        // Create a new VacationRequest and set its fields
        VacationRequest request = new VacationRequest();
        request.setRequester(requester);
        request.setStartDate(requestDTO.getStartDate());
        request.setEndDate(requestDTO.getEndDate());
        request.setReason(requestDTO.getReason());
        request.setStatus(RequestStatus.PENDING);

        VacationRequest savedRequest = vacationRequestService.submitRequest(request);
        return ResponseEntity.ok(savedRequest);
    }

    // Validators and requesters can retrieve vacation requests.
    @PreAuthorize("hasAnyRole('VALIDATOR', 'REQUESTER')")
    @GetMapping
    public ResponseEntity<List<VacationRequest>> getRequests(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) RequestStatus status) {
        List<VacationRequest> requests = vacationRequestService.getRequests(userId, status);
        return ResponseEntity.ok(requests);
    }

    // Validators can approve or reject requests.
    @PreAuthorize("hasRole('VALIDATOR')")
    @PutMapping("/{id}")
    public ResponseEntity<VacationRequest> updateRequest(@PathVariable Long id, @RequestBody VacationRequestUpdateDTO updateDTO) {
        VacationRequest updatedRequest = vacationRequestService.updateRequest(id, updateDTO);
        return ResponseEntity.ok(updatedRequest);
    }
}
