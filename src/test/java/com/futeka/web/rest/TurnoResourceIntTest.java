package com.futeka.web.rest;

import com.futeka.FutekaApp;

import com.futeka.domain.Turno;
import com.futeka.repository.TurnoRepository;
import com.futeka.service.TurnoService;
import com.futeka.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.futeka.web.rest.TestUtil.sameInstant;
import static com.futeka.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.futeka.domain.enumeration.EstadoTurnoEnum;
/**
 * Test class for the TurnoResource REST controller.
 *
 * @see TurnoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FutekaApp.class)
public class TurnoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_TURNO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_TURNO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_DIA_DE_SEMANA = 1;
    private static final Integer UPDATED_DIA_DE_SEMANA = 2;

    private static final Boolean DEFAULT_TURNO_FIJO = false;
    private static final Boolean UPDATED_TURNO_FIJO = true;

    private static final EstadoTurnoEnum DEFAULT_ESTADO = EstadoTurnoEnum.LIBRE;
    private static final EstadoTurnoEnum UPDATED_ESTADO = EstadoTurnoEnum.RESERVADO;

    @Autowired
    private TurnoRepository turnoRepository;

    @Autowired
    private TurnoService turnoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTurnoMockMvc;

    private Turno turno;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TurnoResource turnoResource = new TurnoResource(turnoService);
        this.restTurnoMockMvc = MockMvcBuilders.standaloneSetup(turnoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Turno createEntity(EntityManager em) {
        Turno turno = new Turno()
            .nombre(DEFAULT_NOMBRE)
            .telefono(DEFAULT_TELEFONO)
            .fechaTurno(DEFAULT_FECHA_TURNO)
            .diaDeSemana(DEFAULT_DIA_DE_SEMANA)
            .turnoFijo(DEFAULT_TURNO_FIJO)
            .estado(DEFAULT_ESTADO);
        return turno;
    }

    @Before
    public void initTest() {
        turno = createEntity(em);
    }

    @Test
    @Transactional
    public void createTurno() throws Exception {
        int databaseSizeBeforeCreate = turnoRepository.findAll().size();

        // Create the Turno
        restTurnoMockMvc.perform(post("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turno)))
            .andExpect(status().isCreated());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeCreate + 1);
        Turno testTurno = turnoList.get(turnoList.size() - 1);
        assertThat(testTurno.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTurno.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testTurno.getFechaTurno()).isEqualTo(DEFAULT_FECHA_TURNO);
        assertThat(testTurno.getDiaDeSemana()).isEqualTo(DEFAULT_DIA_DE_SEMANA);
        assertThat(testTurno.isTurnoFijo()).isEqualTo(DEFAULT_TURNO_FIJO);
        assertThat(testTurno.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createTurnoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = turnoRepository.findAll().size();

        // Create the Turno with an existing ID
        turno.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTurnoMockMvc.perform(post("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turno)))
            .andExpect(status().isBadRequest());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTurnos() throws Exception {
        // Initialize the database
        turnoRepository.saveAndFlush(turno);

        // Get all the turnoList
        restTurnoMockMvc.perform(get("/api/turnos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(turno.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].fechaTurno").value(hasItem(sameInstant(DEFAULT_FECHA_TURNO))))
            .andExpect(jsonPath("$.[*].diaDeSemana").value(hasItem(DEFAULT_DIA_DE_SEMANA)))
            .andExpect(jsonPath("$.[*].turnoFijo").value(hasItem(DEFAULT_TURNO_FIJO.booleanValue())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getTurno() throws Exception {
        // Initialize the database
        turnoRepository.saveAndFlush(turno);

        // Get the turno
        restTurnoMockMvc.perform(get("/api/turnos/{id}", turno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(turno.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.fechaTurno").value(sameInstant(DEFAULT_FECHA_TURNO)))
            .andExpect(jsonPath("$.diaDeSemana").value(DEFAULT_DIA_DE_SEMANA))
            .andExpect(jsonPath("$.turnoFijo").value(DEFAULT_TURNO_FIJO.booleanValue()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTurno() throws Exception {
        // Get the turno
        restTurnoMockMvc.perform(get("/api/turnos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTurno() throws Exception {
        // Initialize the database
        turnoService.save(turno);

        int databaseSizeBeforeUpdate = turnoRepository.findAll().size();

        // Update the turno
        Turno updatedTurno = turnoRepository.findOne(turno.getId());
        // Disconnect from session so that the updates on updatedTurno are not directly saved in db
        em.detach(updatedTurno);
        updatedTurno
            .nombre(UPDATED_NOMBRE)
            .telefono(UPDATED_TELEFONO)
            .fechaTurno(UPDATED_FECHA_TURNO)
            .diaDeSemana(UPDATED_DIA_DE_SEMANA)
            .turnoFijo(UPDATED_TURNO_FIJO)
            .estado(UPDATED_ESTADO);

        restTurnoMockMvc.perform(put("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTurno)))
            .andExpect(status().isOk());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeUpdate);
        Turno testTurno = turnoList.get(turnoList.size() - 1);
        assertThat(testTurno.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTurno.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testTurno.getFechaTurno()).isEqualTo(UPDATED_FECHA_TURNO);
        assertThat(testTurno.getDiaDeSemana()).isEqualTo(UPDATED_DIA_DE_SEMANA);
        assertThat(testTurno.isTurnoFijo()).isEqualTo(UPDATED_TURNO_FIJO);
        assertThat(testTurno.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingTurno() throws Exception {
        int databaseSizeBeforeUpdate = turnoRepository.findAll().size();

        // Create the Turno

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTurnoMockMvc.perform(put("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turno)))
            .andExpect(status().isCreated());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTurno() throws Exception {
        // Initialize the database
        turnoService.save(turno);

        int databaseSizeBeforeDelete = turnoRepository.findAll().size();

        // Get the turno
        restTurnoMockMvc.perform(delete("/api/turnos/{id}", turno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Turno.class);
        Turno turno1 = new Turno();
        turno1.setId(1L);
        Turno turno2 = new Turno();
        turno2.setId(turno1.getId());
        assertThat(turno1).isEqualTo(turno2);
        turno2.setId(2L);
        assertThat(turno1).isNotEqualTo(turno2);
        turno1.setId(null);
        assertThat(turno1).isNotEqualTo(turno2);
    }
}
