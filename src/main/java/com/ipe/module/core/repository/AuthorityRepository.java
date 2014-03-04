package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.Authority;
import com.ipe.module.core.entity.Resource;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-14
 * Time: 下午10:58
 * To change this template use File | Settings | File Templates.
 */
public interface AuthorityRepository extends CustomerRepository<Authority,String> {

    @Modifying
    @Query("delete from Authority t where t.role.id=:roleId")
    public int delRoleAuthority(@Param("roleId") String roleId);

    @Query("select t.resource from Authority t where t.role.id=:roleId")
    public Set<Resource> getRoleByAuthority(@Param("roleId") String roleId);
}

