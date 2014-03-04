package com.ipe.module.core.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.DictVal;
import com.ipe.module.core.repository.DictValRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class DictValService extends BaseService<DictVal,String> {
    @Autowired
    private DictValRepository dictValRepository;

    @Override
    protected CustomerRepository getRepository() {
        return dictValRepository;
    }
}
