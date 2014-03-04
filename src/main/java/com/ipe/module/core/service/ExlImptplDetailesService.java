package com.ipe.module.core.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.ExlImptplDetailes;
import com.ipe.module.core.repository.ExlImptplDetailesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;



@Service
@Transactional
public class ExlImptplDetailesService extends BaseService<ExlImptplDetailes,String> {
    @Autowired
    private ExlImptplDetailesRepository exlImptplDetailesRepository;

    @Override
    protected CustomerRepository getRepository() {
        return exlImptplDetailesRepository;
    }
}
