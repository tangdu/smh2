package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.Resource;
import org.springframework.data.jpa.repository.Query;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-7
 * Time: 下午9:54
 * To change this template use File | Settings | File Templates.
 */
public interface ResourceRepository extends CustomerRepository<Resource,String> {
    @Query("select max(sno)+1 from Resource")
    public Integer getMaxSno();
}
