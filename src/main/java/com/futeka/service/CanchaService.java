package com.futeka.service;

import com.futeka.domain.Cancha;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Cancha.
 */
public interface CanchaService {

    /**
     * Save a cancha.
     *
     * @param cancha the entity to save
     * @return the persisted entity
     */
    Cancha save(Cancha cancha);

    /**
     * Get all the canchas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Cancha> findAll(Pageable pageable);

    /**
     * Get the "id" cancha.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Cancha findOne(Long id);

    /**
     * Delete the "id" cancha.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
