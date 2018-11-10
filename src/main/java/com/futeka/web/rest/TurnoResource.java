package com.futeka.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.futeka.domain.Turno;
import com.futeka.service.TurnoService;
import com.futeka.web.rest.errors.BadRequestAlertException;
import com.futeka.web.rest.util.HeaderUtil;
import com.futeka.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Turno.
 */
@RestController
@RequestMapping("/api")
public class TurnoResource {

    private final Logger log = LoggerFactory.getLogger(TurnoResource.class);

    private static final String ENTITY_NAME = "turno";

    private final TurnoService turnoService;

    public TurnoResource(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    /**
     * POST  /turnos : Create a new turno.
     *
     * @param turno the turno to create
     * @return the ResponseEntity with status 201 (Created) and with body the new turno, or with status 400 (Bad Request) if the turno has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/turnos")
    @Timed
    public ResponseEntity<Turno> createTurno(@RequestBody Turno turno) throws URISyntaxException {
        log.debug("REST request to save Turno : {}", turno);
        if (turno.getId() != null) {
            throw new BadRequestAlertException("A new turno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turno result = turnoService.save(turno);
        return ResponseEntity.created(new URI("/api/turnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /turnos : Updates an existing turno.
     *
     * @param turno the turno to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated turno,
     * or with status 400 (Bad Request) if the turno is not valid,
     * or with status 500 (Internal Server Error) if the turno couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/turnos")
    @Timed
    public ResponseEntity<Turno> updateTurno(@RequestBody Turno turno) throws URISyntaxException {
        log.debug("REST request to update Turno : {}", turno);
        if (turno.getId() == null) {
            return createTurno(turno);
        }
        Turno result = turnoService.save(turno);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, turno.getId().toString()))
            .body(result);
    }

    /**
     * GET  /turnos : get all the turnos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of turnos in body
     */
    @GetMapping("/turnos")
    @Timed
    public ResponseEntity<List<Turno>> getAllTurnos(Pageable pageable) {
        log.debug("REST request to get a page of Turnos");
        Page<Turno> page = turnoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/turnos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /turnos/:id : get the "id" turno.
     *
     * @param id the id of the turno to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the turno, or with status 404 (Not Found)
     */
    @GetMapping("/turnos/{id}")
    @Timed
    public ResponseEntity<Turno> getTurno(@PathVariable Long id) {
        log.debug("REST request to get Turno : {}", id);
        Turno turno = turnoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(turno));
    }

    /**
     * DELETE  /turnos/:id : delete the "id" turno.
     *
     * @param id the id of the turno to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/turnos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTurno(@PathVariable Long id) {
        log.debug("REST request to delete Turno : {}", id);
        turnoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * POST  /turnos : Create a new turno.
     *
     * @param turno the turno to create
     * @return the ResponseEntity with status 201 (Created) and with body the new turno, or with status 400 (Bad Request) if the turno has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/turnos/findTurnosByCancha")
    @Timed
    public ResponseEntity<List<Turno>> findTurnosByCancha(@RequestBody Turno turno, @ApiParam Pageable pageable) throws URISyntaxException {
        log.debug("REST request to get a page of Turnos");
        Page<Turno> page = turnoService.findTurnosByCancha(turno, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/turnos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /turnos/:id : get the "id" turno.
     *
     * @param turno the id of the turno to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the turno, or with status 404 (Not Found)
     */
    @PostMapping("/turnos/findByDate")
    @Timed
    public ResponseEntity<Turno> getTurno(@RequestBody Turno turno) {
        Turno _turno = turnoService.findOneByDate(turno);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(turno));
    }
}
