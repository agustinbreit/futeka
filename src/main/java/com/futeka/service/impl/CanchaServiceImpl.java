package com.futeka.service.impl;

import com.futeka.service.CanchaService;
import com.futeka.domain.Cancha;
import com.futeka.repository.CanchaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Cancha.
 */
@Service
@Transactional
public class CanchaServiceImpl implements CanchaService {

    private final Logger log = LoggerFactory.getLogger(CanchaServiceImpl.class);

    private final CanchaRepository canchaRepository;

    public CanchaServiceImpl(CanchaRepository canchaRepository) {
        this.canchaRepository = canchaRepository;
    }

    /**
     * Save a cancha.
     *
     * @param cancha the entity to save
     * @return the persisted entity
     */
    @Override
    public Cancha save(Cancha cancha) {
        log.debug("Request to save Cancha : {}", cancha);
        return canchaRepository.save(cancha);
    }

    /**
     * Get all the canchas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Cancha> findAll(Pageable pageable) {
        log.debug("Request to get all Canchas");
        return canchaRepository.findAll(pageable);
    }

    /**
     * Get one cancha by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Cancha findOne(Long id) {
        log.debug("Request to get Cancha : {}", id);
        return canchaRepository.findOne(id);
    }

    /**
     * Delete the cancha by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cancha : {}", id);
        canchaRepository.delete(id);
    }
}
