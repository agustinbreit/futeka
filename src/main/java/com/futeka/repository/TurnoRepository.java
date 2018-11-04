package com.futeka.repository;

import com.futeka.domain.Turno;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Turno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {

}
