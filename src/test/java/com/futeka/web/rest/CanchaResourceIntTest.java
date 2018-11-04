package com.futeka.web.rest;

import com.futeka.FutekaApp;

import com.futeka.domain.Cancha;
import com.futeka.repository.CanchaRepository;
import com.futeka.service.CanchaService;
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
import java.math.BigDecimal;
import java.util.List;

import static com.futeka.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.futeka.domain.enumeration.TipoCanchaEnum;
/**
 * Test class for the CanchaResource REST controller.
 *
 * @see CanchaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FutekaApp.class)
public class CanchaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final TipoCanchaEnum DEFAULT_TIPO = TipoCanchaEnum.CINCO;
    private static final TipoCanchaEnum UPDATED_TIPO = TipoCanchaEnum.SEIS;

    private static final BigDecimal DEFAULT_PRECIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECIO = new BigDecimal(2);

    @Autowired
    private CanchaRepository canchaRepository;

    @Autowired
    private CanchaService canchaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCanchaMockMvc;

    private Cancha cancha;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CanchaResource canchaResource = new CanchaResource(canchaService);
        this.restCanchaMockMvc = MockMvcBuilders.standaloneSetup(canchaResource)
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
    public static Cancha createEntity(EntityManager em) {
        Cancha cancha = new Cancha()
            .nombre(DEFAULT_NOMBRE)
            .tipo(DEFAULT_TIPO)
            .precio(DEFAULT_PRECIO);
        return cancha;
    }

    @Before
    public void initTest() {
        cancha = createEntity(em);
    }

    @Test
    @Transactional
    public void createCancha() throws Exception {
        int databaseSizeBeforeCreate = canchaRepository.findAll().size();

        // Create the Cancha
        restCanchaMockMvc.perform(post("/api/canchas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancha)))
            .andExpect(status().isCreated());

        // Validate the Cancha in the database
        List<Cancha> canchaList = canchaRepository.findAll();
        assertThat(canchaList).hasSize(databaseSizeBeforeCreate + 1);
        Cancha testCancha = canchaList.get(canchaList.size() - 1);
        assertThat(testCancha.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCancha.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testCancha.getPrecio()).isEqualTo(DEFAULT_PRECIO);
    }

    @Test
    @Transactional
    public void createCanchaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = canchaRepository.findAll().size();

        // Create the Cancha with an existing ID
        cancha.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCanchaMockMvc.perform(post("/api/canchas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancha)))
            .andExpect(status().isBadRequest());

        // Validate the Cancha in the database
        List<Cancha> canchaList = canchaRepository.findAll();
        assertThat(canchaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCanchas() throws Exception {
        // Initialize the database
        canchaRepository.saveAndFlush(cancha);

        // Get all the canchaList
        restCanchaMockMvc.perform(get("/api/canchas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cancha.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.intValue())));
    }

    @Test
    @Transactional
    public void getCancha() throws Exception {
        // Initialize the database
        canchaRepository.saveAndFlush(cancha);

        // Get the cancha
        restCanchaMockMvc.perform(get("/api/canchas/{id}", cancha.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cancha.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCancha() throws Exception {
        // Get the cancha
        restCanchaMockMvc.perform(get("/api/canchas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCancha() throws Exception {
        // Initialize the database
        canchaService.save(cancha);

        int databaseSizeBeforeUpdate = canchaRepository.findAll().size();

        // Update the cancha
        Cancha updatedCancha = canchaRepository.findOne(cancha.getId());
        // Disconnect from session so that the updates on updatedCancha are not directly saved in db
        em.detach(updatedCancha);
        updatedCancha
            .nombre(UPDATED_NOMBRE)
            .tipo(UPDATED_TIPO)
            .precio(UPDATED_PRECIO);

        restCanchaMockMvc.perform(put("/api/canchas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCancha)))
            .andExpect(status().isOk());

        // Validate the Cancha in the database
        List<Cancha> canchaList = canchaRepository.findAll();
        assertThat(canchaList).hasSize(databaseSizeBeforeUpdate);
        Cancha testCancha = canchaList.get(canchaList.size() - 1);
        assertThat(testCancha.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCancha.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testCancha.getPrecio()).isEqualTo(UPDATED_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingCancha() throws Exception {
        int databaseSizeBeforeUpdate = canchaRepository.findAll().size();

        // Create the Cancha

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCanchaMockMvc.perform(put("/api/canchas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cancha)))
            .andExpect(status().isCreated());

        // Validate the Cancha in the database
        List<Cancha> canchaList = canchaRepository.findAll();
        assertThat(canchaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCancha() throws Exception {
        // Initialize the database
        canchaService.save(cancha);

        int databaseSizeBeforeDelete = canchaRepository.findAll().size();

        // Get the cancha
        restCanchaMockMvc.perform(delete("/api/canchas/{id}", cancha.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cancha> canchaList = canchaRepository.findAll();
        assertThat(canchaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cancha.class);
        Cancha cancha1 = new Cancha();
        cancha1.setId(1L);
        Cancha cancha2 = new Cancha();
        cancha2.setId(cancha1.getId());
        assertThat(cancha1).isEqualTo(cancha2);
        cancha2.setId(2L);
        assertThat(cancha1).isNotEqualTo(cancha2);
        cancha1.setId(null);
        assertThat(cancha1).isNotEqualTo(cancha2);
    }
}
