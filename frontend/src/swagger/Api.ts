/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { BaseResponseObject, FoodTruckReq, MenuReq } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags food-truck-query-controller
   * @name RegisterFoodTruck
   * @request POST:/api/v1/foodtrucks
   * @secure
   */
  registerFoodTruck = (data: FoodTruckReq, params: RequestParams = {}) =>
    this.request<BaseResponseObject, any>({
      path: `/api/v1/foodtrucks`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags menu-query-controller
   * @name RegisterMenu
   * @request POST:/api/v1/foodtrucks/menu
   * @secure
   */
  registerMenu = (
    data: {
      menu: MenuReq;
      /** @format binary */
      image: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<BaseResponseObject, any>({
      path: `/api/v1/foodtrucks/menu`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags menu-query-controller
   * @name UpdateMenu
   * @request PATCH:/api/v1/foodtrucks/menu/update
   * @secure
   */
  updateMenu = (
    data: {
      /** @format int64 */
      menuId: number;
      menu: MenuReq;
      /** @format binary */
      image?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<BaseResponseObject, any>({
      path: `/api/v1/foodtrucks/menu/update`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
}
