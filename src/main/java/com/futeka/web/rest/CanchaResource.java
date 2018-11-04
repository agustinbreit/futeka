package com.futeka.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.futeka.domain.Cancha;
import com.futeka.service.CanchaService;
import com.futeka.web.rest.errors.BadRequestAlertException;
import com.futeka.web.rest.util.HeaderUtil;
import com.futeka.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
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
 * REST controller for managing Cancha.
 */
@RestController
@RequestMapping("/api")
public class CanchaResource {

    private final Logger log = LoggerFactory.getLogger(CanchaResource.class);

    private static final String ENTITY_NAME = "cancha";

    private final CanchaService canchaService;

    public CanchaResource(CanchaService canchaService) {
        this.canchaService = canchaService;
    }

    /**
     * POST  /canchas : Create a new cancha.
     *
     * @param cancha the cancha to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cancha, or with status 400 (Bad Request) if the cancha has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/canchas")
    @Timed
    public ResponseEntity<Cancha> createCancha(@RequestBody Cancha cancha) throws URISyntaxException {
        log.debug("REST request to save Cancha : {}", cancha);
        if (cancha.getId() != null) {
            throw new BadRequestAlertException("A new cancha cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cancha result = canchaService.save(cancha);
        return ResponseEntity.created(new URI("/api/canchas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /canchas : Updates an existing cancha.
     *
     * @param cancha the cancha to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cancha,
     * or with status 400 (Bad Request) if the cancha is not valid,
     * or with status 500 (Internal Server Error) if the cancha couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/canchas")
    @Timed
    public ResponseEntity<Cancha> updateCancha(@RequestBody Cancha cancha) throws URISyntaxException {
        log.debug("REST request to update Cancha : {}", cancha);
        if (cancha.getId() == null) {
            return createCancha(cancha);
        }
        Cancha result = canchaService.save(cancha);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cancha.getId().toString()))
            .body(result);
    }

    /**
     * GET  /canchas : get all the canchas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of canchas in body
     */
    @GetMapping("/canchas")
    @Timed
    public ResponseEntity<List<Cancha>> getAllCanchas(Pageable pageable) {
        log.debug("REST request to get a page of Canchas");
        Page<Cancha> page = canchaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/canchas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /canchas/:id : get the "id" cancha.
     *
     * @param id the id of the cancha to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cancha, or with status 404 (Not Found)
     */
    @GetMapping("/canchas/{id}")
    @Timed
    public ResponseEntity<Cancha> getCancha(@PathVariable Long id) {
        log.debug("REST request to get Cancha : {}", id);
        Cancha cancha = canchaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cancha));
    }

    /**
     * DELETE  /canchas/:id : delete the "id" cancha.
     *
     * @param id the id of the cancha to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/canchas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCancha(@PathVariable Long id) {
        log.debug("REST request to delete Cancha : {}", id);
        canchaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
