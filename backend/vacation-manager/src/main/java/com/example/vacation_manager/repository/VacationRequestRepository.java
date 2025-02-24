package com.example.vacation_manager.repository;

import com.example.vacation_manager.model.VacationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacationRequestRepository extends JpaRepository<VacationRequest, Long> {
}
