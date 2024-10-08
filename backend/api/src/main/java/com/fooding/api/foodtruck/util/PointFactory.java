package com.fooding.api.foodtruck.util;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

public class PointFactory {

	private static final GeometryFactory geometryFactory = new GeometryFactory();
	private static final int SRID = 4326;

	public static Point create(double latitude, double longitude) {
		Point point = geometryFactory.createPoint(new Coordinate(longitude, latitude));
		point.setSRID(SRID);
		return point;
	}

	public static double getLatitude(Point point) {
		return point.getY();
	}

	public static double getLongitude(Point point) {
		return point.getX();
	}

}
