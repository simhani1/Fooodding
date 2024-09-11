package com.fooding.api.owner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.owner.domain.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

}
