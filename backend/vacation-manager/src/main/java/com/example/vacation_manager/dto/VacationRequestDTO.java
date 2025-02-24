package com.example.vacation_manager.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Data
public class VacationRequestDTO {
    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    private String reason;
}