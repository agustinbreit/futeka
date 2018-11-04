package com.futeka.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.futeka.domain.enumeration.TipoCanchaEnum;

/**
 * A Cancha.
 */
@Entity
@Table(name = "cancha")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cancha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoCanchaEnum tipo;

    @Column(name = "precio", precision=10, scale=2)
    private BigDecimal precio;

    @OneToMany(mappedBy = "cancha")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Turno> turnos = new HashSet<>();

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

    public Cancha nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoCanchaEnum getTipo() {
        return tipo;
    }

    public Cancha tipo(TipoCanchaEnum tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoCanchaEnum tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public Cancha precio(BigDecimal precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Set<Turno> getTurnos() {
        return turnos;
    }

    public Cancha turnos(Set<Turno> turnos) {
        this.turnos = turnos;
        return this;
    }

    public Cancha addTurnos(Turno turno) {
        this.turnos.add(turno);
        turno.setCancha(this);
        return this;
    }

    public Cancha removeTurnos(Turno turno) {
        this.turnos.remove(turno);
        turno.setCancha(null);
        return this;
    }

    public void setTurnos(Set<Turno> turnos) {
        this.turnos = turnos;
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
        Cancha cancha = (Cancha) o;
        if (cancha.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cancha.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cancha{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", precio=" + getPrecio() +
            "}";
    }
}
