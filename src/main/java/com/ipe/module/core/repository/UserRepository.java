package com.ipe.module.core.repository;

import com.ipe.common.dao.CustomerRepository;
import com.ipe.module.core.entity.Role;
import com.ipe.module.core.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: tangdu
 * Date: 13-8-25
 * Time: 下午10:31
 * To change this template use File | Settings | File Templates.
 */
public interface  UserRepository extends CustomerRepository<User,String> {

    @Query( "from User u where u.userAccount=:account and u.userPwd=:pwd and u.enabled='1'")
    public List<User> login(@Param("account") String account,@Param("pwd") String pwd);

    @Query( "from User u where u.userAccount=:account  and u.enabled='1'")
    public List<User> findUserByAccount(@Param("account") String account);

    @Modifying
    @Query( "update User u set u.userPwd=:userPwd where u.id=:id and u.userPwd=:ouserPwd")
    public int updatePwd(@Param("id") String id,@Param("userPwd") String userPwd,@Param("ouserPwd") String ouserPwd);

    @Query("select t.role from UserRole t where t.user.id=:userId")
    public List<Role> getUserRole(@Param("userId") String userId);

    @Query("select t.role.id from UserRole t where t.user.id=:userId")
    public List<String> getUserRoleIds(@Param("userId") String userId);

    @Query("from Role t0 where t0.id not in(select t.role from UserRole t where t.user.id=:userId)")
    public List<Role> getUserNotRole(@Param("userId") String userId);
}