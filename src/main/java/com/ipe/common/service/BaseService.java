package com.ipe.common.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ipe.common.dao.CustomerRepository;
import com.ipe.common.entity.IDEntity;
import com.ipe.module.core.web.util.RestRequest;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-8-25
 * Time: 下午10:44
 * To change this template use File | Settings | File Templates.
 */
public abstract class BaseService<M extends IDEntity, PK extends Serializable> {

    protected abstract CustomerRepository<M, PK> getRepository();

    public M save(M m) {
        return (M) getRepository().save(m);
    }

    public List<M> findAll() {
        return getRepository().findAll();
    }

    public void delete(M m) {
        getRepository().delete(m);
    }

    public void deleteById(PK pk) {
        getRepository().delete(pk);
    }

    public void delete(PK[] pk) {
        if (pk != null) {
            for (PK p : pk) {
                getRepository().delete(p);
            }
        }
    }

    public void flush() {
        getRepository().flush();
    }

    public void saveAndFlush(M m) {
        getRepository().saveAndFlush(m);
    }

    public M get(PK pk){
        return getRepository().findOne(pk);
    }

    public Page<M> findAll(Pageable pageable) {
        return getRepository().findAll(pageable);
    }

    public List<M> findAll( Sort orders) {
        return getRepository().findAll(orders);
    }

    public List<M> findAll(Specification<M> tSpecification) {
        return getRepository().findAll(tSpecification);
    }

    public Page<M> findAll(Specification<M> tSpecification, Pageable pageable) {
        return getRepository().findAll(tSpecification, pageable);
    }

    public Page<M> findEntity(final RestRequest rest) {
        PageRequest pageable=new PageRequest(rest.getStart(), rest.getLimit(),rest.getSorts());

        return getRepository().findAll(new Specification<M>() {
            @Override
            public Predicate toPredicate(Root<M> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                if(StringUtils.isNotBlank(rest.getQueryParams())){
                    JSONObject jsonObject= JSON.parseObject(rest.getQueryParams());
                    List<Predicate> list = new ArrayList<Predicate>();
                    for(Map.Entry<String,Object> key:jsonObject.entrySet()){
                        if(key.getValue()!=null && !"".equals(key.getValue().toString()))
                            list.add(cb.like(root.get(key.getKey()).as(String.class),key.getValue().toString()));
                    }
                    return cb.and(list.toArray(new Predicate[list.size()]));
                }
                return null;
            }
        }, pageable);
    }

    public List<M> findAll(Specification<M> tSpecification, Sort orders) {
        return getRepository().findAll(tSpecification, orders);
    }

    public long count(Specification<M> tSpecification) {
        return getRepository().count(tSpecification);
    }

    public M findOne(Specification<M> tSpecification) {
        return getRepository().findOne(tSpecification);
    }
}