package com.fooding.api.foodtruck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fooding.api.foodtruck.domain.menu.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {

}
