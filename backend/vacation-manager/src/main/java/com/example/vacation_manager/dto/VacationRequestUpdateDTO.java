package com.example.vacation_manager.dto;

import com.example.vacation_manager.model.RequestStatus;
import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class VacationRequestUpdateDTO {
    @NotNull
    private RequestStatus status;

    private String comments;
}
