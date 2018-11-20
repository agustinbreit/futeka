package com.futeka.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.futeka.domain.enumeration.EstadoTurnoEnum;

/**
 * A Turno.
 */
@Entity
@Table(name = "turno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Turno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "fecha_turno")
    private LocalDateTime fechaTurno;

    @Column(name = "dia_de_semana")
    private Integer diaDeSemana;

    @Column(name = "turno_fijo")
    private Boolean turnoFijo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoTurnoEnum estado;

    @ManyToOne
    private Cancha cancha;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Turno nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public Turno telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public LocalDateTime getFechaTurno() {
        return fechaTurno;
    }

    public Turno fechaTurno(LocalDateTime fechaTurno) {
        this.fechaTurno = fechaTurno;
        return this;
    }

    public void setFechaTurno(LocalDateTime fechaTurno) {
        this.fechaTurno = fechaTurno;
    }

    public Integer getDiaDeSemana() {
        return diaDeSemana;
    }

    public Turno diaDeSemana(Integer diaDeSemana) {
        this.diaDeSemana = diaDeSemana;
        return this;
    }

    public void setDiaDeSemana(Integer diaDeSemana) {
        this.diaDeSemana = diaDeSemana;
    }

    public Boolean isTurnoFijo() {
        return turnoFijo;
    }

    public Turno turnoFijo(Boolean turnoFijo) {
        this.turnoFijo = turnoFijo;
        return this;
    }

    public void setTurnoFijo(Boolean turnoFijo) {
        this.turnoFijo = turnoFijo;
    }

    public EstadoTurnoEnum getEstado() {
        return estado;
    }

    public Turno estado(EstadoTurnoEnum estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoTurnoEnum estado) {
        this.estado = estado;
    }

    public Cancha getCancha() {
        return cancha;
    }

    public Turno cancha(Cancha cancha) {
        this.cancha = cancha;
        return this;
    }

    public void setCancha(Cancha cancha) {
        this.cancha = cancha;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Turno turno = (Turno) o;
        if (turno.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), turno.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Turno{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", fechaTurno='" + getFechaTurno() + "'" +
            ", diaDeSemana=" + getDiaDeSemana() +
            ", turnoFijo='" + isTurnoFijo() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
