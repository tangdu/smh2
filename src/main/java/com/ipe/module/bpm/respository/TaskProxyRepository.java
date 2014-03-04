package com.ipe.module.bpm.respository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.bpm.entity.TaskProxy;
import org.springframework.stereotype.Repository;

/**
* Created with IntelliJ IDEA.
* User: tangdu
* Date: 13-9-7
* Time: 下午9:56
* To change this template use File | Settings | File Templates.
*/
@Repository
public interface TaskProxyRepository extends CustomerRepository<TaskProxy,String> {
}
