package com.futeka.service.dto;

import com.futeka.domain.Cancha;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class EstadisticasDTO {
    private ZonedDateTime fechaInicio;
    private ZonedDateTime fechaFin;
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

    public ZonedDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public ZonedDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(ZonedDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Cancha getCancha() {
        return cancha;
    }

    public void setCancha(Cancha cancha) {
        this.cancha = cancha;
    }
}
