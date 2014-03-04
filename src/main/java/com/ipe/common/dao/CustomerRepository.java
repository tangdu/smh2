package com.ipe.common.dao;

import com.ipe.common.entity.IDEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-14
 * Time: 下午6:50
 * To change this template use File | Settings | File Templates.
 */
@NoRepositoryBean
public interface CustomerRepository<T extends IDEntity,PK extends Serializable>
        extends JpaRepository<T,PK>, JpaSpecificationExecutor<T> {
}
