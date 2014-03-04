package com.ipe.module.core.web.util;

import com.alibaba.fastjson.JSON;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntegerelliJ IDEA.
 * User: tangdu
 * Date: 13-9-7
 * Time: 下午10:43
 * To change this template use File | Settings | File Templates.
 */
public class RestRequest {
    private Integer start = 0;
    private Integer limit = 20;
    private String sort;
    private String queryParams;

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getQueryParams() {
        return queryParams;
    }

    public void setQueryParams(String queryParams) {
        this.queryParams = queryParams;
    }

    public org.springframework.data.domain.Sort getSorts() {
        if (this.getSort() != null && !"".equals(this.getSort())) {
            List<Sort> sorts = JSON.parseArray(this.getSort(), Sort.class);
            List<org.springframework.data.domain.Sort.Order> orders = new ArrayList<>();
            for (Sort sort1 : sorts) {
                orders.add(new org.springframework.data.domain.Sort.Order(
                        org.springframework.data.domain.Sort.Direction.fromString(sort1.getDirection()
                        ), sort1.getProperty()));
            }
            return new org.springframework.data.domain.Sort(orders);
        }
        return null;
    }

    static class Sort {
        private String property;
        private String direction;

        public String getProperty() {
            return property;
        }

        public void setProperty(String property) {
            this.property = property;
        }

        public String getDirection() {
            return direction;
        }

        public void setDirection(String direction) {
            this.direction = direction;
        }
    }
}
