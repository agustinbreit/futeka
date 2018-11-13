package com.futeka.service.impl;

import com.futeka.domain.QTurno;
import com.futeka.domain.enumeration.EstadoTurnoEnum;
import com.futeka.service.TurnoService;
import com.futeka.domain.Turno;
import com.futeka.repository.TurnoRepository;
import com.futeka.service.dto.EstadisticasDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
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
    public Page<Turno> findTurnosByCancha(Turno turno, Pageable pageable) {
        ZoneId zone = ZoneId.of("America/Argentina/Buenos_Aires");
        ZonedDateTime startTime = turno.getFechaTurno().withZoneSameLocal(zone);
        ZonedDateTime endTime = startTime.withHour(23).withMinute(59).withSecond(59).withZoneSameLocal(zone);
        List<Turno> turnosToReturn = new ArrayList<Turno>();
        do {
            JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
            QTurno qTurno = QTurno.turno;
            BooleanBuilder booleanBuilder = new BooleanBuilder(qTurno.cancha().id.eq(turno.getCancha().getId()).and(qTurno.fechaTurno.eq(startTime)));
            booleanBuilder.or(new BooleanBuilder(qTurno.turnoFijo.isTrue().and(qTurno.cancha().id.eq(turno.getCancha().getId())).and(qTurno.diaDeSemana.eq(turno.getDiaDeSemana())).and(qTurno.fechaTurno.hour().eq(startTime.getHour()))));

            Turno _turno = queryFactory.from(qTurno)
                .select(qTurno).distinct()
                .where(booleanBuilder).fetchFirst();
            if(_turno!=null){
                if(_turno.getEstado().equals(EstadoTurnoEnum.RESERVADO)) {
                    if(_turno.getFechaTurno().isBefore(startTime)) {
                        _turno.setEstado(EstadoTurnoEnum.ASISTIDO);
                        _turno = turnoRepository.save(_turno);
                    }

                    Turno turnoToday = queryFactory.from(qTurno)
                        .select(qTurno).distinct()
                        .where(qTurno.fechaTurno.eq(startTime)).fetchFirst();
                    if(turnoToday!=null){
                        if(turnoToday.getFechaTurno().isBefore(ZonedDateTime.now())){
                            turnoToday.setEstado(EstadoTurnoEnum.ASISTIDO);
                            turnoToday = turnoRepository.save(turnoToday);
                        }
                        turnosToReturn.add(turnoToday);
                    }else {
                        Turno newTurno = new Turno();
                        newTurno.setFechaTurno(startTime);
                        newTurno.setEstado(EstadoTurnoEnum.RESERVADO);
                        newTurno.setTelefono(_turno.getTelefono());
                        newTurno.setNombre(_turno.getNombre());
                        newTurno.setTurnoFijo(_turno.isTurnoFijo());
                        newTurno.setDiaDeSemana(_turno.getDiaDeSemana());
                        newTurno.setCancha(_turno.getCancha());
                        newTurno = turnoRepository.save(newTurno);
                        turnosToReturn.add(newTurno);
                    }

                }else if(_turno.getEstado().equals(EstadoTurnoEnum.ASISTIDO) || _turno.getEstado().equals(EstadoTurnoEnum.CANCELADO)) {
                    Turno turnoToday = queryFactory.from(qTurno)
                        .select(qTurno).distinct()
                        .where(qTurno.fechaTurno.eq(startTime)).fetchFirst();
                    if(turnoToday!=null){
                        if(turnoToday.getFechaTurno().isBefore(ZonedDateTime.now())) {
                            turnoToday.setEstado(EstadoTurnoEnum.ASISTIDO);
                            turnoToday = turnoRepository.save(turnoToday);
                            turnosToReturn.add(turnoToday);
                        } else {
                            if(!turnoToday.getEstado().equals(EstadoTurnoEnum.CANCELADO)) {
                                turnoToday.setEstado(EstadoTurnoEnum.RESERVADO);
                                turnoToday = turnoRepository.save(turnoToday);
                            }
                            turnosToReturn.add(turnoToday);
                        }
                    }else {
                        Turno newTurno = new Turno();
                        newTurno.setFechaTurno(startTime);
                        if(startTime.isBefore(ZonedDateTime.now())) {
                            newTurno.setEstado(EstadoTurnoEnum.ASISTIDO);
                        }else {
                            newTurno.setEstado(EstadoTurnoEnum.RESERVADO);
                        }

                        newTurno.setTelefono(_turno.getTelefono());
                        newTurno.setNombre(_turno.getNombre());
                        newTurno.setTurnoFijo(_turno.isTurnoFijo());
                        newTurno.setDiaDeSemana(_turno.getDiaDeSemana());
                        newTurno.setCancha(_turno.getCancha());
                        newTurno = turnoRepository.save(newTurno);
                        turnosToReturn.add(newTurno);
                    }

                }else {
                    turnosToReturn.add(_turno);
                }
                startTime = startTime.plusHours(1);
            }else{
                Turno turnoToAdd = new Turno();
                turnoToAdd.setCancha(turno.getCancha());
                turnoToAdd.setEstado(EstadoTurnoEnum.LIBRE);
                turnoToAdd.setDiaDeSemana(turno.getDiaDeSemana());
                turnoToAdd.setFechaTurno(startTime.withZoneSameLocal(zone));
                turnosToReturn.add(turnoToAdd);
                startTime = startTime.plusHours(1);
            }

        }while (startTime.isBefore(endTime));

        Page<Turno> turnoPage =  new PageImpl<>(turnosToReturn,pageable,turnosToReturn.size());

        return turnoPage;
    }

    @Override
    public Turno findOneByDate(Turno turno) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QTurno qTurno = QTurno.turno;
        BooleanBuilder booleanBuilder = new BooleanBuilder(qTurno.cancha().id.eq(turno.getCancha().getId()).and(qTurno.fechaTurno.eq(turno.getFechaTurno())));
        Turno _turno = queryFactory.from(qTurno)
            .select(qTurno).distinct()
            .where(booleanBuilder).fetchFirst();
        return _turno;
    }

    @Override
    public EstadisticasDTO getEstadisticasByDates(EstadisticasDTO estadisticasDTO) {
        ZoneId zone = ZoneId.of("America/Argentina/Buenos_Aires");
        ZonedDateTime startTime = estadisticasDTO.getFechaInicio().withZoneSameLocal(zone);
        ZonedDateTime endTime = estadisticasDTO.getFechaFin().withHour(23).withMinute(59).withSecond(59).withZoneSameLocal(zone);
        JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
        QTurno qTurno = QTurno.turno;
        BooleanBuilder booleanBuilder = null;
        if(estadisticasDTO.getCancha()!=null) {
            booleanBuilder = new BooleanBuilder(qTurno.fechaTurno.between(startTime,endTime).and(qTurno.cancha().id.eq(estadisticasDTO.getCancha().getId())));
        }else {
            booleanBuilder = new BooleanBuilder(qTurno.fechaTurno.between(startTime,endTime));
        }

        Long turnosAsistidos = queryFactory.from(qTurno)
            .select(qTurno.count())
            .where(new BooleanBuilder(booleanBuilder).and(qTurno.estado.in(EstadoTurnoEnum.ASISTIDO, EstadoTurnoEnum.RESERVADO))).fetchOne();

        Long turnosCancelados = queryFactory.from(qTurno)
            .select(qTurno.count())
            .where(new BooleanBuilder(booleanBuilder).and(qTurno.estado.in(EstadoTurnoEnum.CANCELADO))).fetchOne();

        BigDecimal gananciaTotal = queryFactory.from(qTurno)
            .select(qTurno.cancha().precio.sum())
            .where(new BooleanBuilder(booleanBuilder).and(qTurno.estado.in(EstadoTurnoEnum.ASISTIDO, EstadoTurnoEnum.RESERVADO))).fetchOne();

        BigDecimal perdidaTotal = queryFactory.from(qTurno)
            .select(qTurno.cancha().precio.sum())
            .where(new BooleanBuilder(booleanBuilder).and(qTurno.estado.in(EstadoTurnoEnum.CANCELADO))).fetchOne();

        estadisticasDTO.setGananciaTotal(gananciaTotal!=null? gananciaTotal: BigDecimal.ZERO);
        estadisticasDTO.setPerdidaTotal(perdidaTotal!=null? perdidaTotal: BigDecimal.ZERO);
        estadisticasDTO.setReservasTotales(turnosAsistidos+turnosCancelados);
        estadisticasDTO.setTurnosAsistidos(turnosAsistidos);
        estadisticasDTO.setTurnosNoAsistidos(turnosCancelados);

        return estadisticasDTO;
    }
}
