package com.ipe.module.core.service;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.service.BaseService;
import com.ipe.module.core.entity.Resource;
import com.ipe.module.core.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
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
public class ResourceService extends BaseService<Resource,String> {
    @Autowired
    private ResourceRepository resourceRepository;

    @Override
    protected CustomerRepository getRepository() {
        return resourceRepository;
    }

    public List<Resource> getResources(final String pid){
        List<Resource> all = resourceRepository.findAll(new Specification<Resource>() {
            @Override
            public Predicate toPredicate(Root<Resource> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                List<Predicate> list = new ArrayList<Predicate>();
               /* if (StringUtils.isNotBlank(pid)) {
                    list.add(cb.equal(root.get("parent").get("id"),pid));
                } else {
                    list.add(cb.isNull(root.get("parent")));
                }*/
                list.add(cb.isNull(root.get("parent")));
                return cb.and(list.toArray(new Predicate[list.size()]));
            }
        });
        return all;
    }

    public Resource saveResource(Resource resource){
        Resource parent=resourceRepository.findOne(resource.getParent().getId());
        resource.setParent(parent);
        resource.setSno(resourceRepository.getMaxSno());
        resource.setCreatedDate(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        return resourceRepository.save(resource);
    }
}
