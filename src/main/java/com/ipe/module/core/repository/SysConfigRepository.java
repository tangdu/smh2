package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.SysConfig;
import org.springframework.stereotype.Repository;

/**
* Created with IntelliJ IDEA.
* User: tangdu
* Date: 13-9-7
* Time: 下午9:56
* To change this template use File | Settings | File Templates.
*/
public interface SysConfigRepository extends CustomerRepository<SysConfig,String> {
}
