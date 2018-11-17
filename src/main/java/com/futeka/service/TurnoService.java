package com.futeka.service;

import com.futeka.domain.Turno;
import com.futeka.service.dto.EstadisticasDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;

/**
 * Service Interface for managing Turno.
 */
public interface TurnoService {

    /**
     * Save a turno.
     *
     * @param turno the entity to save
     * @return the persisted entity
     */
    Turno save(Turno turno);

    /**
     * Get all the turnos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Turno> findAll(Pageable pageable);

    /**
     * Get the "id" turno.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Turno findOne(Long id);

    /**
     * Delete the "id" turno.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    Page<Turno> findTurnosByCancha(Turno turno, Pageable pageable);

    Turno findOneByDate(Turno turno);

    EstadisticasDTO getEstadisticasByDates(EstadisticasDTO estadisticasDTO);

    Turno cancelarTUrnosFuturos(Turno turno);
}
