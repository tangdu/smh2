package com.ipe.module.core.web.controller;

import com.ipe.module.core.entity.DictVal;
import com.ipe.module.core.service.DictValService;
import com.ipe.module.core.web.util.BodyWrapper;
import com.ipe.module.core.web.util.RestRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 * Created with IntelliJ IDEA.
 * Role: tangdu
 * Date: 13-9-7
 * Time: 下午10:27
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping("/dictVal")
public class DictValController extends AbstractController {

    private static final Logger LOG= LoggerFactory.getLogger(DictValController.class);
    @Autowired
    private DictValService dictValService;

    @RequestMapping(value = {"/list"})
    public
    @ResponseBody
    BodyWrapper list(final String dictId, RestRequest rest) {
        try {
            int startRow = rest.getStart();
            int endRow = rest.getLimit();
            PageRequest pageres=new PageRequest(startRow,endRow,rest.getSorts());
            Page<DictVal> page = dictValService.findAll(new Specification<DictVal>() {
                @Override
                public Predicate toPredicate(Root<DictVal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                    return cb.equal(root.get("dictId").as(String.class),dictId);
                }
            },pageres);
            return success(page);
        } catch (Exception e) {
            LOG.error("query error",e);
            return failure(e);
        }
    }

    @RequestMapping(value = {"/edit"}, method = RequestMethod.POST)
    public
    @ResponseBody
    BodyWrapper edit(DictVal dictVal, RestRequest rest) {
        try {
            dictValService.save(dictVal);
            return success(dictVal);
        } catch (Exception e) {
            LOG.error("edit error",e);
            return failure(e);
        }
    }

    @RequestMapping(value = {"/add"}, method = RequestMethod.POST)
    public
    @ResponseBody
    BodyWrapper add(DictVal dictVal, RestRequest rest) {
        try {
            dictValService.save(dictVal);
            return success(dictVal);
        } catch (Exception e) {
            LOG.error("add error",e);
            return failure(e);
        }
    }

    @RequestMapping(value = {"/del"})
    public
    @ResponseBody
    BodyWrapper del(String[] ids, RestRequest rest) {
        try {
            dictValService.delete(ids);
            return success();
        } catch (Exception e) {
            LOG.error("del error",e);
            return failure(e);
        }
    }
}
