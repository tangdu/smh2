package com.ipe.module.core.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.Dict;
import com.ipe.module.core.repository.DictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class DictService extends BaseService<Dict,String> {
    @Autowired
    private DictRepository dictRepository;

    @Override
    protected CustomerRepository getRepository() {
        return dictRepository;
    }
}
