package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.Role;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-9-7
 * Time: 下午9:53
 * To change this template use File | Settings | File Templates.
 */
public interface RoleRepository extends CustomerRepository<Role,String> {
    @Modifying
    @Query("delete from UserRole t where t.user.id=:userId")
    public int delUserRole(@Param("userId") String userId);
}
