package com.example.vacation_manager.service;

import com.example.vacation_manager.dto.VacationRequestUpdateDTO;
import com.example.vacation_manager.model.RequestStatus;
import com.example.vacation_manager.model.VacationRequest;
import com.example.vacation_manager.repository.VacationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VacationRequestService {
    private final VacationRequestRepository vacationRequestRepository;

    public VacationRequest submitRequest(VacationRequest request) {
        return vacationRequestRepository.save(request);
    }

    public List<VacationRequest> getRequests(Long userId, RequestStatus status) {
        List<VacationRequest> requests = vacationRequestRepository.findAll();

        if (userId != null) {
            requests = requests.stream()
                    .filter(r -> r.getRequester().getId().equals(userId))
                    .collect(Collectors.toList());
        }
        if (status != null) {
            requests = requests.stream()
                    .filter(r -> r.getStatus() == status)
                    .collect(Collectors.toList());
        }
        return requests;
    }

    public VacationRequest updateRequest(Long id, VacationRequestUpdateDTO updateDTO) {
        VacationRequest request = vacationRequestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vacation request not found"));
        request.setStatus(updateDTO.getStatus());
        // Only set comments if provided (usually for rejections)
        if (updateDTO.getComments() != null) {
            request.setComments(updateDTO.getComments());
        }
        return vacationRequestRepository.save(request);
    }
}
