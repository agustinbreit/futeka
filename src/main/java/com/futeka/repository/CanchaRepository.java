package com.futeka.repository;

import com.futeka.domain.Cancha;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cancha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CanchaRepository extends JpaRepository<Cancha, Long> {

}
