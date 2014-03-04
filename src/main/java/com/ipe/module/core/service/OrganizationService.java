package com.ipe.module.core.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.Organization;
import com.ipe.module.core.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-14
 * Time: 下午11:00
 * To change this template use File | Settings | File Templates.
 */
@Service
@Transactional
public class OrganizationService extends BaseService<Organization,String> {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    protected CustomerRepository getRepository() {
        return organizationRepository;
    }

    public List<Organization> getTree(final String pid){
        List<Organization> all = organizationRepository.findAll(new Specification<Organization>() {
            @Override
            public Predicate toPredicate(Root<Organization> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                List<Predicate> list = new ArrayList<Predicate>();
                /*if (StringUtils.isNotBlank(pid)) {
                    list.add(cb.equal(root.get("pid").as(String.class),pid));
                } else {
                    list.add(cb.isNull(root.get("pid")));
                }*/
                list.add(cb.isNull(root.get("parent")));
                return cb.and(list.toArray(new Predicate[list.size()]));
            }
        });
        return all;
    }
}
