package com.futeka.service.dto;

import com.futeka.domain.Cancha;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class EstadisticasDTO {
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private Long turnosAsistidos;
    private Long turnosNoAsistidos;
    private Long reservasTotales;
    private BigDecimal gananciaTotal;
    private BigDecimal perdidaTotal;
    private Cancha cancha;

    public Long getTurnosAsistidos() {
        return turnosAsistidos;
    }

    public void setTurnosAsistidos(Long turnosAsistidos) {
        this.turnosAsistidos = turnosAsistidos;
    }

    public Long getTurnosNoAsistidos() {
        return turnosNoAsistidos;
    }

    public void setTurnosNoAsistidos(Long turnosNoAsistidos) {
        this.turnosNoAsistidos = turnosNoAsistidos;
    }

    public Long getReservasTotales() {
        return reservasTotales;
    }

    public void setReservasTotales(Long reservasTotales) {
        this.reservasTotales = reservasTotales;
    }

    public BigDecimal getGananciaTotal() {
        return gananciaTotal;
    }

    public void setGananciaTotal(BigDecimal gananciaTotal) {
        this.gananciaTotal = gananciaTotal;
    }

    public BigDecimal getPerdidaTotal() {
        return perdidaTotal;
    }

    public void setPerdidaTotal(BigDecimal perdidaTotal) {
        this.perdidaTotal = perdidaTotal;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Cancha getCancha() {
        return cancha;
    }

    public void setCancha(Cancha cancha) {
        this.cancha = cancha;
    }
}
