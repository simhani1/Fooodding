package com.fooding.api.foodtruck.repository.jdbc;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.fooding.api.foodtruck.service.dto.FoodTruckDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class FoodTruckRepositoryJdbc {

	private final JdbcTemplate jdbcTemplate;

	public List<FoodTruckDto> findAllIsOpened(Double latitude, Double longitude) {
		String sql = """
			    SELECT ft.foodtruck_id                                            as foodTruckId,
			           ft.license_number                                          as licenseNumber,
			           ft.name                                                    as name,
			           ft.introduction                                            as introduction,
			           ft.category                                                as category,
			           MAX(CASE WHEN m.row_num = 1 THEN m.img END)                as mainMenuImg,
			           GROUP_CONCAT(m.name ORDER BY m.menu_id DESC SEPARATOR '/') as menus
			    FROM foodtruck ft
			             LEFT JOIN (SELECT m.*,
			                               ROW_NUMBER() OVER (PARTITION BY m.foodtruck_id ORDER BY m.menu_id DESC) AS row_num
			                        FROM menu m) m ON ft.foodtruck_id = m.foodtruck_id AND m.row_num <= 2
			    WHERE ft.open_status = 'OPENED'
			      AND (
			              6371 * ACOS(
			                      COS(RADIANS(?)) * COS(RADIANS(ft.latitude)) *
			                      COS(RADIANS(ft.longitude) - RADIANS(?)) +
			                      SIN(RADIANS(?)) * SIN(RADIANS(ft.latitude))
			                     )
			              ) <= 1 -- 반경 1km
			    GROUP BY ft.foodtruck_id;
			""";
		return jdbcTemplate.query(sql, foodTruckRowMapper(), latitude, longitude, latitude);
	}

	private RowMapper<FoodTruckDto> foodTruckRowMapper() {
		return (rs, rowNum) -> FoodTruckDto.builder()
			.foodTruckId(rs.getLong("foodTruckId"))
			.licenseNumber(rs.getString("licenseNumber"))
			.name(rs.getString("name"))
			.introduction(rs.getString("introduction"))
			.category(rs.getString("category"))
			.mainMenuImg(rs.getString("mainMenuImg"))
			.menus(rs.getString("menus"))
			.build();
	}

}
