package com.futeka.service.impl;

import com.futeka.service.TurnoService;
import com.futeka.domain.Turno;
import com.futeka.repository.TurnoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


/**
 * Service Implementation for managing Turno.
 */
@Service
@Transactional
public class TurnoServiceImpl implements TurnoService {

    private final Logger log = LoggerFactory.getLogger(TurnoServiceImpl.class);

    private final TurnoRepository turnoRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public TurnoServiceImpl(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    /**
     * Save a turno.
     *
     * @param turno the entity to save
     * @return the persisted entity
     */
    @Override
    public Turno save(Turno turno) {
        log.debug("Request to save Turno : {}", turno);
        return turnoRepository.save(turno);
    }

    /**
     * Get all the turnos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Turno> findAll(Pageable pageable) {
        log.debug("Request to get all Turnos");
        return turnoRepository.findAll(pageable);
    }

    /**
     * Get one turno by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Turno findOne(Long id) {
        log.debug("Request to get Turno : {}", id);
        return turnoRepository.findOne(id);
    }

    /**
     * Delete the turno by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Turno : {}", id);
        turnoRepository.delete(id);
    }

    @Override
    public Page<Turno> findTurnosByDate(Turno turno) {
        //JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
//        List<Linea> lineas = queryFactory.from(QLinea.linea)
        return null;
    }
}
